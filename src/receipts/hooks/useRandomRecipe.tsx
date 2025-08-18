import { useQuery } from "@tanstack/react-query";
import { getRandomRecipeAction } from "../api/get-recipe.action";

const fetchMultipleRandomRecipes = async (count: number) => {
  const promises = Array.from({ length: count }, () => getRandomRecipeAction());
  const results = await Promise.all(promises);
  return results.map((r) => r.recipe);
};

export const useRandomRecipe = (count = 6) => {
  return useQuery({
    queryKey: ["recipe", count],
    queryFn: () => fetchMultipleRandomRecipes(count),
    retry: false,
    staleTime: 1000 * 60 * 5,
    refetchOnWindowFocus: false,
  });
};
