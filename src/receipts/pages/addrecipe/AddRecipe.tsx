import { useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";

import { Plus, X, Upload } from "lucide-react";
import { Link } from "react-router";
import { toast } from "sonner";
import { Controller, useForm, useFieldArray } from "react-hook-form";
import { areas, categories, type Recipe } from "@/interfaces/recipe.response";
import { cn } from "@/lib/utils";
import { getUserFromLocal } from "@/firebase/auth";
import { useAddRecipe } from "@/receipts/hooks/useAddRecipe";

interface Props {
  recipe: Recipe;
}
interface FormValues {
  strMeal: string;
  strYoutube: string | null;
  strMealThumb: string | null;
  strCategory: string;
  strArea: string;
  ingredients: { name: string }[];
  instructions: { step: string }[];
  tags: string[];
}
export const AddRecipe = ({ recipe }: Props) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const user = getUserFromLocal();

  const { mutate: addRecipe } = useAddRecipe(user.uid);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    getValues,
    setValue,
    watch,
    reset,
  } = useForm({
    defaultValues: {
      strMeal: recipe?.strMeal || "",
      strYoutube: recipe?.strYoutube || "",
      strMealThumb: recipe?.strMealThumb || "",
      strCategory: recipe?.strCategory || "",
      strArea: recipe?.strArea || "",
      ingredients: [{ name: "" }],
      instructions: [{ step: "" }],
      tags: [] as string[],
    },
  });

  const {
    fields: ingredientFields,
    append: appendIngredient,
    remove: removeIngredient,
  } = useFieldArray({ control, name: "ingredients" });

  const {
    fields: instructionFields,
    append: appendInstruction,
    remove: removeInstruction,
  } = useFieldArray({ control, name: "instructions" });

  const currentTags = watch("tags");

  const addTag = () => {
    const newTag = inputRef.current!.value;
    if (newTag === "") return;
    const tagSet = new Set(getValues("tags"));
    tagSet.add(newTag);
    setValue("tags", Array.from(tagSet));
    inputRef.current!.value = "";
  };

  const removeTag = (tag: string) => {
    const tagSet = new Set(getValues("tags"));
    tagSet.delete(tag);
    setValue("tags", Array.from(tagSet));
    inputRef.current!.value = "";
  };

  const onSubmit = async (data: FormValues) => {
    // Convertimos ingredients e instructions a Recipe si es necesario

    const recipeToSave: Recipe = {
      idMeal: "", // lo puedes generar o dejar vacío
      strMeal: data.strMeal,
      strMealAlternate: null,
      strCategory: data.strCategory,
      strArea: data.strArea,
      strInstructions: data.instructions.map((i) => i.step).join("\n"),
      strMealThumb: data.strMealThumb || "",
      strTags: data.tags.length ? data.tags.join(",") : null,
      strYoutube: data.strYoutube,
      // Map ingredients a strIngredient1..20
      strIngredient1: data.ingredients[0]?.name || null,
      strIngredient2: data.ingredients[1]?.name || null,
      strIngredient3: data.ingredients[2]?.name || null,
      strIngredient4: data.ingredients[3]?.name || null,
      strIngredient5: data.ingredients[4]?.name || null,
      strIngredient6: data.ingredients[5]?.name || null,
      strIngredient7: data.ingredients[6]?.name || null,
      strIngredient8: data.ingredients[7]?.name || null,
      strIngredient9: data.ingredients[8]?.name || null,
      strIngredient10: data.ingredients[9]?.name || null,
      strIngredient11: data.ingredients[10]?.name || null,
      strIngredient12: data.ingredients[11]?.name || null,
      strIngredient13: data.ingredients[12]?.name || null,
      strIngredient14: data.ingredients[13]?.name || null,
      strIngredient15: data.ingredients[14]?.name || null,
      strIngredient16: data.ingredients[15]?.name || null,
      strIngredient17: data.ingredients[16]?.name || null,
      strIngredient18: data.ingredients[17]?.name || null,
      strIngredient19: data.ingredients[18]?.name || null,
      strIngredient20: data.ingredients[19]?.name || null,
      strMeasure1: null,
      strMeasure2: null,
      strMeasure3: null,
      strMeasure4: null,
      strMeasure5: null,
      strMeasure6: null,
      strMeasure7: null,
      strMeasure8: null,
      strMeasure9: null,
      strMeasure10: null,
      strMeasure11: null,
      strMeasure12: null,
      strMeasure13: null,
      strMeasure14: null,
      strMeasure15: null,
      strMeasure16: null,
      strMeasure17: null,
      strMeasure18: null,
      strMeasure19: null,
      strMeasure20: null,
      strSource: null,
      strImageSource: null,
      strCreativeCommonsConfirmed: null,
      dateModified: null,
    };

    addRecipe(recipeToSave, {
      onSuccess: () => {
        toast.success("Recipe added!");
        reset();
      },
      onError: () => {
        toast.error("Error adding recipe");
      },
    });
  };

  return (
    <div className="min-h-screen bg-gradient-subtle py-8">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-4 text-foreground">
            Add New Recipe
          </h1>
          <p className="text-xl text-muted-foreground">
            Share your favorite recipe with the community
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8 ">
          {/* Basic Information */}
          <Card className="shadow-card py-6">
            <CardHeader>
              <CardTitle>Basic Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="md:col-span-2">
                  <Label htmlFor="title">Recipe Title *</Label>
                  <Input
                    id="title"
                    {...register("strMeal", {
                      required: true,
                    })}
                    placeholder="Enter recipe title"
                    className={cn(
                      "w-full px-4 py-3 mt-1 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200",
                      {
                        "border-red-500": errors.strMeal,
                      }
                    )}
                  />
                  {errors.strMeal && (
                    <p className="text-red-500 text-sm">Title required</p>
                  )}
                </div>

                <div className="md:col-span-2">
                  <Label htmlFor="description">Description *</Label>
                  <Textarea
                    id="description"
                    {...register("strYoutube", { required: true })}
                    placeholder="Youtube link or description"
                    rows={3}
                    className={cn(
                      "w-full px-4 py-3 mt-1 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200",
                      {
                        "border-red-500": errors.strMeal,
                      }
                    )}
                  />
                  {errors.strYoutube && (
                    <p className="text-red-500 text-sm">
                      Link or description required
                    </p>
                  )}
                </div>

                <div className="md:col-span-2">
                  <Label htmlFor="image">Recipe Image URL</Label>
                  <div className="flex gap-2 mt-1">
                    <Input
                      id="image"
                      {...register("strMealThumb")}
                      placeholder="https://example.com/image.jpg"
                    />
                    <Button type="button" variant="outline">
                      <Upload className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                <div>
                  <Label htmlFor="category">Category *</Label>
                  <Controller
                    name="strCategory"
                    control={control}
                    rules={{ required: "Category is required" }}
                    render={({ field }) => (
                      <Select
                        value={field.value}
                        onValueChange={field.onChange}
                      >
                        <SelectTrigger className="mt-1">
                          <SelectValue placeholder="Select category" />
                        </SelectTrigger>
                        <SelectContent>
                          {categories.map((category) => (
                            <SelectItem key={category} value={category}>
                              {category}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    )}
                  />
                  {errors.strCategory && (
                    <p className="text-red-500 text-sm">Category required</p>
                  )}
                </div>

                <div>
                  <Label htmlFor="Area">Area *</Label>
                  <Controller
                    name="strArea"
                    control={control}
                    rules={{ required: "Area is required" }}
                    render={({ field }) => (
                      <Select
                        value={field.value}
                        onValueChange={field.onChange}
                      >
                        <SelectTrigger className="mt-1">
                          <SelectValue placeholder="Select area" />
                        </SelectTrigger>
                        <SelectContent>
                          {areas.map((area) => (
                            <SelectItem key={area} value={area}>
                              {area}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    )}
                  />
                  {errors.strArea && (
                    <p className="text-red-500 text-sm">Area required</p>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Ingredients */}
          <Card className="shadow-card  py-6">
            <CardHeader>
              <CardTitle>Ingredients</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {ingredientFields.map((field, index) => (
                <div key={field.id} className="flex gap-2">
                  <Input
                    {...register(`ingredients.${index}.name` as const, {
                      required: true,
                    })}
                    placeholder={`Ingredient ${index + 1}`}
                    className="flex-1"
                  />
                  {ingredientFields.length > 1 && (
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => removeIngredient(index)}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  )}
                </div>
              ))}
              <Button
                type="button"
                variant="outline"
                onClick={() => appendIngredient({ name: "" })}
                className="w-full"
              >
                <Plus className="h-4 w-4 mr-2" />
                Add Ingredient
              </Button>
            </CardContent>
          </Card>

          {/* Instructions */}
          <Card className="shadow-card  py-6">
            <CardHeader>
              <CardTitle>Instructions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {instructionFields.map((field, index) => (
                <div key={field.id} className="flex gap-2">
                  <div className="flex-shrink-0 w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-semibold text-sm mt-1">
                    {index + 1}
                  </div>
                  <Textarea
                    {...register(`instructions.${index}.step` as const, {
                      required: true,
                    })}
                    placeholder={`Step ${index + 1} instructions`}
                    rows={2}
                    className="flex-1"
                  />
                  {instructionFields.length > 1 && (
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => removeInstruction(index)}
                      className="mt-1"
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  )}
                </div>
              ))}
              <Button
                type="button"
                variant="outline"
                onClick={() => appendInstruction({ step: "" })}
                className="w-full"
              >
                <Plus className="h-4 w-4 mr-2" />
                Add Step
              </Button>
            </CardContent>
          </Card>

          {/* Tags */}
          <Card className="shadow-card  py-6">
            <CardHeader>
              <CardTitle>Tags (Optional)</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex gap-2">
                <Input
                  placeholder="Add a tag"
                  ref={inputRef}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " " || e.key === ",") {
                      e.preventDefault();
                      addTag();
                    }
                  }}
                />
                <Button type="button" onClick={addTag}>
                  Add
                </Button>
              </div>
              {currentTags.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {currentTags.map((tag) => (
                    <Badge
                      key={tag}
                      variant="secondary"
                      className="cursor-pointer flex items-center gap-1"
                    >
                      <span>{tag}</span>
                      <button
                        onClick={() => removeTag(tag)}
                        className="hover:cursor-pointer ml-2 hover:text-red-500 transition-colors duration-200"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </Badge>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>

          {/* Submit Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-end">
            <Button type="button" variant="outline" asChild>
              <Link to="/recipes">Cancel</Link>
            </Button>
            <Button type="submit" size="lg">
              Add Recipe
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};
