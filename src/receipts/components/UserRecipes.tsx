import { Button } from "@/components/ui/button";
import { Link } from "react-router";
import { ArrowRight } from "lucide-react";
import { RecipeCardWrapper } from "./wrapper/RecipeCardWrapper";
import { getUserFromLocal } from "@/firebase/auth";
import { useUserRecipes } from "../hooks/useUserRecipes";

export const UserRecipes = () => {
  const user = getUserFromLocal();

  const { data: recipes, isLoading, isError } = useUserRecipes(user?.uid);

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error...</p>;

  return (
    <section className="py-16 lg:py-24">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold mb-4 text-foreground">
            User Recipes
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Your recipes!!!
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {recipes?.map((recipe) => (
            <div key={recipe.idMeal} className="animate-fade-in">
              <RecipeCardWrapper
                id={recipe!.idMeal}
                title={recipe!.strMeal}
                description={""}
                image="/placeholder.svg"
                cookTime={""}
                category={recipe!.strCategory}
                whereFrom={recipe.strArea}
              />
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <Button asChild size="lg">
            <Link to="/recipes">
              View All Recipes
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
};
