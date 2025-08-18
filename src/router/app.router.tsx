import { createBrowserRouter, Navigate } from "react-router";
import { ReceiptLayout } from "../receipts/layouts/ReceiptLayout";
import { HomePage } from "../receipts/pages/home/HomePage";
import { RecipesPage } from "../receipts/pages/recipes/ReceiptsPage";
import { RecipeDetailsPage } from "../receipts/pages/recipe/RecipeDetailsPage";
import { AuthLayout } from "../auth/layouts/AuthLayout";
import { LoginPage } from "../auth/pages/LoginPage";
import { RegisterPage } from "../auth/pages/RegisterPage";
import { AddRecipe } from "@/receipts/pages/addrecipe/AddRecipe";
import { FavoritesPage } from "@/receipts/pages/favorites/FavoritesPage";

export const appRouter = createBrowserRouter([
  //Main Routes
  {
    path: "/",
    element: <ReceiptLayout />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: "recipes",
        element: <RecipesPage />,
      },
      {
        path: "add-recipe",
        element: <AddRecipe />,
      },
      {
        path: "favorites",
        element: <FavoritesPage />,
      },
      {
        path: "recipe/:id",
        element: <RecipeDetailsPage />,
      },
    ],
  },

  //Auth Routes
  {
    path: "/auth",
    element: <AuthLayout />,
    children: [
      {
        index: true,
        element: <Navigate to={"auth/login"} />,
      },
      {
        path: "login",
        element: <LoginPage />,
      },
      {
        path: "register",
        element: <RegisterPage />,
      },
    ],
  },
]);
