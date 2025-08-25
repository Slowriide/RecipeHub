import { useParams, Link } from "react-router";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Clock, Users, Heart, Star, CheckCircle } from "lucide-react";
import { useState } from "react";
import { useRecipeById } from "@/receipts/hooks/usRecipeById";
import { getUserFromLocal } from "@/firebase/auth";
import {
  useAddFavorite,
  useIsFavorite,
  useRemoveFavorite,
} from "@/receipts/hooks/useFavorites";
import type { RecipeWithFavorite } from "@/receipts/components/wrapper/RecipeCardWrapper";

export const RecipeDetailsPage = () => {
  const user = getUserFromLocal();
  const { id } = useParams<{ id: string }>();

  const [checkedIngredients, setCheckedIngredients] = useState<number[]>([]);
  const { data: recipe, isLoading, isError } = useRecipeById(id!);
  const recipeId = recipe?.idMeal ?? id!;

  const isFavoriteQuery = useIsFavorite(user.uid ?? null, recipeId);
  const isFavorite = isFavoriteQuery.data ?? false;

  const addFavMutation = useAddFavorite();
  const removeFavMutation = useRemoveFavorite();

  if (isLoading) return <p>Loading...</p>;

  if (isError || !recipe) {
    return (
      <div className="min-h-screen bg-gradient-subtle flex items-center justify-center">
        <Card className="p-8 text-center">
          <CardContent>
            <h1 className="text-2xl font-bold mb-4">Recipe Not Found</h1>
            <p className="text-muted-foreground mb-6">
              The recipe you're looking for doesn't exist.
            </p>
            <Button asChild>
              <Link to="/recipes">Browse All Recipes</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  const handleToggleFavorite = async () => {
    if (!user) return alert("Please log in to manage favorites");

    const recipeToSave: RecipeWithFavorite = {
      id: recipe.idMeal,
      title: recipe.strMeal,
      description: recipe.strInstructions || "",
      image: recipe.strMealThumb,
      cookTime: "25 Mins | 30 Mins",
      category: recipe.strCategory,
      whereFrom: recipe.strArea,
    };

    if (isFavorite) {
      removeFavMutation.mutate({ userId: user.uid, recipeId: recipeId });
    } else {
      addFavMutation.mutate({
        userId: user.uid,
        recipe: recipeToSave,
        recipeId: recipeId,
      });
    }
  };

  const toggleIngredient = (index: number) => {
    setCheckedIngredients((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    );
  };

  return (
    <div className="min-h-screen bg-gradient-subtle">
      {/* Hero Image */}
      <div className="relative h-64 md:h-96 overflow-hidden">
        <img
          src={recipe?.strMealThumb}
          alt={recipe?.strMeal}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/20"></div>

        {/* Favorite Button */}
        <Button
          variant="secondary"
          size="sm"
          className="absolute top-4 right-4 bg-white/90 hover:bg-white"
          onClick={handleToggleFavorite}
        >
          <Heart
            className={`h-4 w-4 ${
              isFavorite ? "fill-primary text-primary" : "text-muted-foreground"
            }`}
          />
        </Button>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Recipe Header */}
            <Card className="shadow-card">
              <CardContent className="p-6">
                <div className="flex flex-wrap gap-2 mb-4">
                  <Badge variant="secondary">{recipe?.strArea}</Badge>
                  <Badge className="bg-primario">{recipe?.strCategory}</Badge>
                  {recipe.tags.map((tag) => (
                    <Badge key={tag} variant="outline">
                      {tag}
                    </Badge>
                  ))}
                </div>

                <h1 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">
                  {recipe?.strMeal}
                </h1>

                <p className="text-lg text-muted-foreground mb-6">
                  {recipe?.strYoutube}
                </p>

                <div className="flex flex-wrap items-center gap-6">
                  <div className="flex items-center space-x-2">
                    <Clock className="h-5 w-5 text-muted-foreground" />
                    <span className="text-sm">
                      <strong>Prep:</strong> 25 Mins | <strong>Cook:</strong> 30
                      Mins
                    </span>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Users className="h-5 w-5 text-muted-foreground" />
                    <span className="text-sm">Serves 4</span>
                  </div>

                  <div className="flex items-center space-x-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star
                        key={star}
                        className="h-4 w-4 fill-primary text-primary"
                      />
                    ))}
                    <span className="text-sm text-muted-foreground ml-1">
                      4.8 (124 reviews)
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Instructions */}
            <Card className="shadow-card">
              <CardContent className="p-6">
                <h2 className="text-2xl font-bold mb-6 text-foreground">
                  Instructions
                </h2>
                <div className="space-y-6">
                  {recipe.instructions?.map((instruction, index) => (
                    <div key={index} className="flex gap-4">
                      <div className="flex-shrink-0 w-8 h-8 bg-primario text-primary-foreground rounded-full flex items-center justify-center font-semibold">
                        {index + 1}
                      </div>
                      <p className="text-foreground leading-relaxed flex-1 pt-1">
                        {instruction}
                      </p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Ingredients */}
            <Card className="shadow-card">
              <CardContent className="p-6">
                <h2 className="text-2xl font-bold mb-6 text-foreground">
                  Ingredients
                </h2>
                <div className="space-y-3">
                  {recipe.ingredients.map((ingredient, index) => (
                    <div key={index} className="flex items-center space-x-3">
                      <button
                        onClick={() => toggleIngredient(index)}
                        className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-colors ${
                          checkedIngredients.includes(index)
                            ? "bg-primario border-primario"
                            : "border-border hover:border-primario"
                        }`}
                      >
                        {checkedIngredients.includes(index) && (
                          <CheckCircle className="h-3 w-3 text-primary-foreground" />
                        )}
                      </button>
                      <span
                        className={`text-sm leading-relaxed ${
                          checkedIngredients.includes(index)
                            ? "line-through text-muted-foreground"
                            : "text-foreground"
                        }`}
                      >
                        {ingredient}
                      </span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Action Buttons */}
            <Card className="shadow-card">
              <CardContent className="p-6 space-y-3">
                <Button
                  onClick={handleToggleFavorite}
                  variant={isFavorite ? "default" : "outline"}
                  className="w-full"
                >
                  <Heart className="h-4 w-4 mr-2" />
                  {isFavorite ? "Remove from Favorites" : "Add to Favorites"}
                </Button>

                <Button variant="outline" className="w-full">
                  Share Recipe
                </Button>

                <Button variant="outline" className="w-full">
                  Print Recipe
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};
