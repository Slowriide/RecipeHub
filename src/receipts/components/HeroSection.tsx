import { Button } from "@/components/ui/button";
import { ArrowRight, ChefHat } from "lucide-react";
import { SearchBar } from "./SearchBar";
import heroFoodImage from "@/assets/heroFoodImage.png";
import { Link } from "react-router";

export const HeroSection = () => {
  const handleSearch = (query: string) => {
    console.log("Searching for:", query);
    // In a real app, this would filter recipes or navigate to search results
  };

  return (
    <section className="relative py-20 lg:py-32 overflow-hidden">
      <div className="absolute inset-0 z-0">
        <img
          src={heroFoodImage}
          alt="Cooking ingredients"
          className="w-full h-full object-cover opacity-20"
        />
        <div
          className="absolute inset-0 opacity-60"
          style={{
            background:
              "linear-gradient(135deg, hsl(25, 95%, 65%) 0%, hsl(15, 80%, 70%) 100%)",
          }}
        ></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-3xl mx-auto text-center text-white">
          <div className="flex justify-center mb-6">
            <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
              <ChefHat className="h-8 w-8" />
            </div>
          </div>

          <h1 className="text-4xl lg:text-6xl font-bold mb-6 animate-fade-in">
            Discover Your Next
            <span className="block text-primary-light">Favorite Recipe</span>
          </h1>

          <p className="text-xl lg:text-2xl mb-8 text-white/90 animate-fade-in">
            From quick weeknight dinners to special occasion treats, find the
            perfect recipe for every moment.
          </p>

          <div className="max-w-md mx-auto mb-8 animate-scale-in">
            <SearchBar
              onSearch={handleSearch}
              placeholder="Search for recipes, ingredients..."
              className="bg-white/10 backdrop-blur-sm rounded-lg p-1"
            />
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-fade-in">
            <Button
              asChild
              size="lg"
              className="bg-white text-primario hover:bg-white/90"
            >
              <Link to="/recipes">
                Browse All Recipes
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>

            <Button
              asChild
              variant="outline"
              size="lg"
              className="border-white text-primario hover:bg-white/10"
            >
              <Link to="/add-recipe">Add Your Recipe</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};
