import {
  addFavorite,
  getFavorites,
  isRecipeFavorite,
  removeFavorite,
} from "@/firebase/favorites";
import type { RecipeCardData } from "@/interfaces/recipe.response";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

interface AddFavoriteInput {
  userId: string;
  recipe: any;
  recipeId: string;
}
interface RemoveFavoriteInput {
  userId: string;
  recipeId: string;
}

export const useFavorites = (userId: string) => {
  return useQuery<RecipeCardData[]>({
    queryKey: ["favorites", userId],
    queryFn: async () => {
      const favs = await getFavorites(userId);
      return favs.map((f) => ({
        id: f.recipeId ?? f.recipeId,
        title: f.recipeData?.title ?? "",
        description: f.recipeData?.description ?? "",
        image: f.recipeData?.image ?? "",
        cookTime: f.recipeData?.cookTime ?? "",
        category: f.recipeData?.category ?? "",
        whereFrom: f.recipeData?.whereFrom ?? "",
      }));
    },
    enabled: !!userId,
    staleTime: 1000 * 60 * 10, // 10 minutos en caché
  });
};

export const useAddFavorite = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ userId, recipe }: AddFavoriteInput) =>
      addFavorite(userId, recipe),

    // Optimistic Update
    onMutate: async ({ userId, recipe }) => {
      await queryClient.cancelQueries({ queryKey: ["favorites", userId] });

      const previousFavorites = queryClient.getQueryData<RecipeCardData[]>([
        "favorites",
        userId,
      ]);

      queryClient.setQueryData<RecipeCardData[]>(
        ["favorites", userId],
        (old = []) => {
          if (old?.some((r) => r.id === recipe.id)) return old; // evita duplicados
          return [
            ...old,
            {
              id: recipe.id,
              title: recipe.title,
              description: recipe.description,
              image: recipe.image,
              cookTime: recipe.cookTime,
              category: recipe.category,
              whereFrom: recipe.whereFrom,
            },
          ];
        }
      );

      queryClient.setQueryData(["isFavorite", userId, recipe.id], true);

      return { previousFavorites };
    },
    onError: (_err, _variables, context) => {
      if (context?.previousFavorites) {
        queryClient.setQueryData(
          ["favorites", _variables.userId],
          context.previousFavorites
        );
      }
    },
    onSettled: (_data, _error, { userId, recipeId }) => {
      queryClient.invalidateQueries({ queryKey: ["favorites", userId] });
      queryClient.invalidateQueries({
        queryKey: ["isFavorite", userId, recipeId],
      });
    },
  });
};

export const useRemoveFavorite = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ userId, recipeId }: RemoveFavoriteInput) =>
      removeFavorite(userId, recipeId),
    onMutate: async ({ userId, recipeId }) => {
      await queryClient.cancelQueries({ queryKey: ["favorites", userId] });

      const previousFavorites = queryClient.getQueryData<RecipeCardData[]>([
        "favorites",
        userId,
      ]);

      queryClient.setQueryData<RecipeCardData[]>(
        ["favorites", userId],
        (old = []) => old.filter((r) => r.id !== recipeId)
      );
      queryClient.setQueryData(["isFavorite", userId, recipeId], false);
      return { previousFavorites };
    },
    onError: (_err, _variables, context) => {
      if (context?.previousFavorites) {
        queryClient.setQueryData(
          ["favorites", _variables.userId],
          context.previousFavorites
        );
      }
    },
    onSettled: (_data, _error, { userId, recipeId }) => {
      queryClient.invalidateQueries({ queryKey: ["favorites", userId] });
      queryClient.invalidateQueries({
        queryKey: ["isFavorite", userId, recipeId],
      });
    },
  });
};

export const useIsFavorite = (userId: string | null, recipeId: string) => {
  return useQuery({
    queryKey: ["isFavorite", userId, recipeId],
    queryFn: () => {
      if (!userId) return false;

      return isRecipeFavorite(userId, recipeId);
    },
    initialData: false,
    enabled: !!userId,
  });
};
