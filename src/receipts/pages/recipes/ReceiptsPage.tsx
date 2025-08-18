import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Slider } from "@/components/ui/slider";
import { Filter, Clock } from "lucide-react";
import { SearchBar } from "@/receipts/components/SearchBar";
import { useSearchParams } from "react-router";
import { usePaginatedRecipes } from "@/receipts/hooks/useAllRecipes";
import { CustomPagination } from "@/components/custom/CustomPagination";
import { regions } from "@/utils/regionList";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { categories } from "@/utils/categoryList";
import { RecipeCardWrapper } from "@/receipts/components/wrapper/RecipeCardWrapper";

export const RecipesPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get("query") || "";
  const selectedCategory = searchParams.get("category") || "All";
  const selectedRegion = searchParams.get("region") || "All";
  const selectedTime = Number(searchParams.get("time") || "120");
  const page = searchParams.get("page") || "1";

  const {
    data: recipes,
    isLoading,
    totalPages,
  } = usePaginatedRecipes({
    perPage: 8,
    search: query,
    page: page,
    category: selectedCategory,
    region: selectedRegion,
  });

  const handleCategoryChanged = (category: string) => {
    if (category === selectedCategory) {
      searchParams.set("category", "All");
      setSearchParams(searchParams);
      return;
    }

    searchParams.set("category", category);
    setSearchParams(searchParams);
  };

  const handleRegionChange = (region: string) => {
    searchParams.set("region", region);
    setSearchParams(searchParams);
  };

  const handleTimeChanged = (time: string) => {
    searchParams.set("time", time);
    setSearchParams(searchParams);
  };

  const handleSearch = (query: string) => {
    const newSearchParams = new URLSearchParams();

    if (!query.trim()) {
      newSearchParams.delete("query");
    } else {
      newSearchParams.set("query", query.trim());
    }

    setSearchParams(newSearchParams);
  };

  const [showFilters, setShowFilters] = useState(false);

  if (isLoading) return <p>Loading...</p>;

  return (
    <div className="min-h-screen bg-gradient-subtle py-8">
      <div className="container mx-auto px-4">
        {/* Jumbotron */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-4 text-foreground">
            All Recipes
          </h1>
          <p className="text-xl text-muted-foreground">
            Discover delicious recipes from around the world
          </p>
        </div>

        {/* Search and Filters */}
        <Card className="mb-8 shadow-card">
          <CardContent className="p-6">
            <div className="space-y-4">
              <SearchBar
                onSearch={handleSearch}
                placeholder="Search recipes, ingredients, or cuisines..."
              />

              <div className="flex items-center justify-between">
                <Button
                  variant="outline"
                  onClick={() => setShowFilters(!showFilters)}
                  className="md:hidden"
                >
                  <Filter className="h-4 w-4 mr-2" />
                  Filters
                </Button>

                <div className="hidden md:flex items-center space-x-4">
                  <span className="text-sm font-medium text-muted-foreground">
                    Showing {recipes.length} recipes
                  </span>
                </div>
              </div>

              {/* Filter Controls */}
              <div
                className={`space-y-4 ${
                  showFilters ? "block" : "hidden md:block"
                }`}
              >
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {/* Category Filter */}
                  <div>
                    <label className="text-sm font-medium text-foreground mb-2 block">
                      Category
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {categories.map((category) => (
                        <Badge
                          key={category}
                          variant={
                            selectedCategory === category
                              ? "default"
                              : "outline"
                          }
                          className="cursor-pointer transition-all hover:scale-105"
                          onClick={() => handleCategoryChanged(category)}
                        >
                          {category}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  {/* Region Filter */}
                  <div>
                    <label className="text-sm font-medium text-foreground mb-2 block">
                      Region
                    </label>
                    <Select onValueChange={handleRegionChange}>
                      <SelectTrigger className="w-[220px]">
                        <SelectValue placeholder="Select region" />
                      </SelectTrigger>
                      <SelectContent>
                        {regions.map((region) => (
                          <SelectItem key={region} value={region}>
                            {region}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Cooking Time Filter */}
                  <div className="lg:col-span-1">
                    <label className="text-sm font-medium text-foreground mb-2 block">
                      <Clock className="h-4 w-4 inline mr-1" />
                      Max Cooking Time: {selectedTime} minutes
                    </label>
                    <div className="px-2 py-1">
                      <Slider
                        defaultValue={[selectedTime]}
                        onValueChange={(value) =>
                          handleTimeChanged(value[0].toString())
                        }
                        max={120}
                        min={5}
                        step={5}
                        className="w-full"
                      />
                      <div className="flex justify-between text-xs text-muted-foreground mt-1">
                        <span>5 min</span>
                        <span>120 min</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Results */}
        <div className="mb-4 md:hidden">
          <span className="text-sm text-muted-foreground">
            Showing {recipes.length} recipes
          </span>
        </div>

        {/* Recipe Grid */}
        {recipes.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {recipes.map((recipe) => (
              <RecipeCardWrapper
                key={recipe!.idMeal}
                id={recipe!.idMeal}
                title={recipe!.strMeal}
                description={""}
                image={recipe!.strMealThumb}
                cookTime={""}
                category={recipe!.strCategory}
                whereFrom={recipe.strArea}
              />
            ))}
          </div>
        ) : (
          <Card className="text-center py-12">
            <CardContent>
              <p className="text-xl text-muted-foreground mb-4">
                No recipes found matching your criteria
              </p>
              <p className="text-muted-foreground mb-6">
                Try adjusting your search terms or filters
              </p>
              <Button
                onClick={() => {
                  setSearchParams({});
                }}
              >
                Clear All Filters
              </Button>
            </CardContent>
          </Card>
        )}
        <CustomPagination totalPages={totalPages}></CustomPagination>
      </div>
    </div>
  );
};
