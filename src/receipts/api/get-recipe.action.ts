import { tesloApi } from "@/api/TheMealDBApi";
import type { RecipeResponse } from "@/interfaces/recipe.response";

export const getRandomRecipeAction = async () => {
  const { data } = await tesloApi.get<RecipeResponse>("/random.php");

  const meal = { ...data.meals[0] };

  return {
    recipe: { ...meal },
  };
};
