import type { Recipe, RecipeCardData } from "@/interfaces/recipe.response";

export const toCardData = (meal: Recipe): RecipeCardData => ({
  id: meal.idMeal,
  title: meal.strMeal,
  description: meal.strInstructions ?? "",
  image: meal.strMealThumb ?? "",
  cookTime: "", // o calcula algo si lo tienes
  category: meal.strCategory ?? "",
  whereFrom: meal.strArea ?? "",
});
