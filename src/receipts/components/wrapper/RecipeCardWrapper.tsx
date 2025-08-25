import { getUserFromLocal } from "@/firebase/auth";
import { RecipeCard } from "../RecipeCard";
import {
  useAddFavorite,
  useIsFavorite,
  useRemoveFavorite,
} from "@/receipts/hooks/useFavorites";

export interface RecipeWithFavorite {
  id: string;
  title: string;
  description: string;
  image: string;
  cookTime: string;
  category: string;
  whereFrom: string;
}

export const RecipeCardWrapper = (props: RecipeWithFavorite) => {
  const user = getUserFromLocal();

  const isFavoriteQuery = useIsFavorite(user.uid ?? null, props.id);
  const addFavMutation = useAddFavorite();
  const removeFavMutation = useRemoveFavorite();

  const isFavorite = isFavoriteQuery.data ?? false;

  const handleToggleFavorite = async () => {
    if (!user) return alert("Please log in to manage favorites");

    if (isFavorite) {
      removeFavMutation.mutate({ userId: user.uid, recipeId: props.id });
    } else {
      addFavMutation.mutate({
        userId: user.uid,
        recipe: props,
        recipeId: props.id,
      });
    }
  };

  return (
    <RecipeCard
      {...props}
      isFavorite={isFavorite}
      onToggleFavorite={handleToggleFavorite}
    />
  );
};
