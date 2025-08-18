// src/hooks/useAllRecipes.ts
import { useQuery } from "@tanstack/react-query";
import { getAllRecipesAction } from "../api/get-all-recipes.action";

import type { Recipe } from "@/interfaces/recipe.response";

interface UsePaginatedRecipesOptions {
  perPage?: number;
  search?: string;
  page?: number | string;
  category?: string;
  region?: string;
}

export const usePaginatedRecipes = ({
  perPage = 8,
  search = "",
  page = 1,
  category = "All",
  region = "All",
}: UsePaginatedRecipesOptions = {}) => {
  const { data, isLoading } = useQuery({
    queryKey: ["allRecipes"],
    queryFn: getAllRecipesAction,
    staleTime: 1000 * 60 * 10, // 10 minutos en caché
    refetchOnWindowFocus: false,
  });

  const allRecipes = data?.meals ?? [];

  const filteredRecipes = allRecipes.filter((recipe) => {
    //Category filter
    if (category !== "All" && recipe.strCategory !== category) {
      return false;
    }

    //Region filter
    if (region !== "All" && recipe.strArea !== region) {
      return false;
    }

    //Query filter
    const ingredients = Array.from({ length: 20 }, (_, i) => {
      const key = `strIngredient${i + 1}` as keyof Recipe;
      const value = recipe[key];
      return typeof value === "string" && value.trim() !== ""
        ? value.toLowerCase()
        : null;
    }).filter(Boolean) as string[];

    const searchTerm = search.toLowerCase();
    const titleMatch = recipe.strMeal.toLowerCase().includes(searchTerm);
    const ingedientMatch = ingredients.some((ing) => ing.includes(searchTerm));

    // Filtrar por título o por cualquier ingrediente
    return titleMatch || ingedientMatch;
  });

  const totalPages = Math.ceil(filteredRecipes.length / perPage);

  const paginatedData = filteredRecipes.slice(
    (Number(page) - 1) * perPage,
    Number(page) * perPage
  );

  return {
    data: paginatedData,
    isLoading,
    totalPages,
  };
};
