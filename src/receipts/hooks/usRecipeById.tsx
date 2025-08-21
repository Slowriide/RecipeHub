import { useQuery } from "@tanstack/react-query";
import { getRecipeByIdAction } from "../api/get-recipe-by-id.action";
import type { Recipe } from "@/interfaces/recipe.response";

export const useRecipeById = (id: string) => {
  return useQuery({
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
            .split(/\r\n|\n|\r/) // separar por saltos de línea
            .map((line) => line.trim()) // quitar espacios al inicio/final
            .filter((line) => line.length > 0) // eliminar líneas vacías
            .reduce<string[]>((acc, line) => {
              // si la línea empieza con un número + posible punto o espacio, es un nuevo paso
              if (/^\d+/.test(line)) {
                acc.push(line.replace(/^\d+\s*/, "")); // quitar el número
              } else {
                // si ya hay un paso, agregar a la última línea
                if (acc.length === 0) acc.push(line);
                else acc[acc.length - 1] += " " + line;
              }
              return acc;
            }, [])
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
