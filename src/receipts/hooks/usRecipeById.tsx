import { useQuery } from "@tanstack/react-query";
import { getRecipeByIdAction } from "../api/get-recipe-by-id.action";
import type { Recipe } from "@/interfaces/recipe.response";

export interface NormalizedRecipe extends Recipe {
  tags: string[];
  instructions: string[];
  ingredients: string[];
}

export const useRecipeById = (id: string) => {
  return useQuery<Recipe | null, Error, NormalizedRecipe | null>({
    queryKey: ["recipe", id],
    queryFn: () => getRecipeByIdAction(id),
    retry: false,
    staleTime: 1000 * 60 * 5,
    enabled: !!id,
    select: (recipe) => {
      if (!recipe) return null;

      const tags = recipe.strTags ? recipe.strTags.split(",") : [];

      const instructions = recipe.strInstructions
        ? recipe.strInstructions
            .split(/\r\n|\n|\r/)
            .map((line) => line.trim())
            .filter((line) => line.length > 0)
        : [];

      function getIngredientsWithMeasures(recipe: Recipe) {
        return Array.from({ length: 20 }, (_, i) => {
          const ingredient = (recipe as any)[`strIngredient${i + 1}`];
          const measure = (recipe as any)[`strMeasure${i + 1}`];
          return ingredient && ingredient.trim() !== ""
            ? `${measure ?? ""} ${ingredient}`.trim()
            : null;
        }).filter((item): item is string => item !== null);
      }

      const ingredients = getIngredientsWithMeasures(recipe);

      return {
        ...recipe,
        tags,
        instructions,
        ingredients,
      };
    },
  });
};
