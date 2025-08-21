import { tesloApi } from "@/api/TheMealDBApi";
import type { Recipe } from "@/interfaces/recipe.response";

export const getRecipeByIdAction = async (
  id: string
): Promise<Recipe | undefined> => {
  const { data } = await tesloApi.get<{ meals: Recipe[] }>(
    `/lookup.php?i=${id}`
  );

  return data.meals[0];
};
