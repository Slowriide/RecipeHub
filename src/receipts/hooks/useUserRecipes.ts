import { useQuery } from "@tanstack/react-query";
import { userRecipesKey } from "./useAddRecipe";

import { getUserRecipes } from "@/firebase/add-recipe";

export const useUserRecipes = (userId: string) => {
  return useQuery({
    queryKey: userRecipesKey(userId),
    queryFn: () => getUserRecipes(userId),
    enabled: !!userId,
  });
};
