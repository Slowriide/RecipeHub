// src/hooks/useAddRecipe.ts
import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { Recipe } from "@/interfaces/recipe.response";
import { addRecipe } from "@/firebase/add-recipe";

export const userRecipesKey = (userId: string) => ["userRecipes", userId];

export const useAddRecipe = (userId: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (recipe: Recipe) => addRecipe(userId, recipe),
    onSuccess: () => {
      // cuando se guarda, invalidamos la lista del usuario
      queryClient.invalidateQueries({ queryKey: userRecipesKey(userId) });
    },
    onError: (error) => {
      console.error("Error adding recipe:", error);
    },
  });
};
