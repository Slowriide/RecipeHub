import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Heart, ArrowRight } from "lucide-react";
import { Link } from "react-router";
import { RecipeCardWrapper } from "@/receipts/components/wrapper/RecipeCardWrapper";
import { getUserFromLocal } from "@/firebase/auth";
import { useFavorites } from "@/receipts/hooks/useFavorites";

export const FavoritesPage = () => {
  const user = getUserFromLocal();

  const { data: favorites = [], isLoading } = useFavorites(user.uid || "");

  if (isLoading) return <p>Cargando favoritos...</p>;

  if (!user) {
    return (
      <p className="text-center mt-8">
        Debes iniciar sesión para ver tus favoritos.
      </p>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-subtle py-8">
      <div className="container mx-auto px-4">
        {/* Jumbotron */}
        <div className="mb-8">
          <div className="flex items-center space-x-3 mb-4">
            <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
              <Heart className="h-5 w-5 text-primary-foreground fill-current" />
            </div>
            <h1 className="text-4xl font-bold text-foreground">My Favorites</h1>
          </div>
          <p className="text-xl text-muted-foreground">
            {favorites.length > 0
              ? `You have ${favorites.length} favorite ${
                  favorites.length === 1 ? "recipe" : "recipes"
                }`
              : "Start building your collection of favorite recipes"}
          </p>
        </div>

        {/* Favorites Grid */}
        {favorites.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {favorites.map((recipe) => (
              <RecipeCardWrapper key={recipe.id} {...recipe} />
            ))}
          </div>
        ) : (
          // Empty State
          <Card className="text-center py-16 shadow-card">
            <CardContent>
              <div className="w-20 h-20 bg-muted rounded-full flex items-center justify-center mx-auto mb-6">
                <Heart className="h-10 w-10 text-muted-foreground" />
              </div>

              <h2 className="text-2xl font-bold mb-4 text-foreground">
                No Favorites Yet
              </h2>

              <p className="text-muted-foreground mb-8 max-w-md mx-auto">
                Start exploring our recipe collection and save your favorites by
                clicking the heart icon on any recipe card.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button asChild size="lg">
                  <Link to="/recipes">
                    Browse Recipes
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>

                <Button asChild variant="outline" size="lg">
                  <Link to="/add-recipe">Add Your Recipe</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Quick Actions */}
        {favorites.length > 0 && (
          <div className="mt-12 text-center">
            <Card className="p-6 bg-primary/5 border-primary/20">
              <CardContent className="space-y-4">
                <h3 className="text-xl font-semibold text-foreground">
                  Looking for more recipes?
                </h3>
                <p className="text-muted-foreground">
                  Discover new flavors and add them to your collection
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button asChild>
                    <Link to="/recipes">
                      Browse All Recipes
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                  <Button asChild variant="outline">
                    <Link to="/add-recipe">Share Your Recipe</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
};
