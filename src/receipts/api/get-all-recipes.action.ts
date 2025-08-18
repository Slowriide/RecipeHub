import { tesloApi } from "@/api/TheMealDBApi";
import type { RecipeResponse } from "@/interfaces/recipe.response";

export const getAllRecipesAction = async () => {
  const { data } = await tesloApi.get<RecipeResponse>("/search.php?s=");

  const meals = data.meals ?? [];

  return { meals };
};
