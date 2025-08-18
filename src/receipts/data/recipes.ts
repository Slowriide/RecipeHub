export interface Recipe {
  id: string;
  title: string;
  description: string;
  image: string;
  cookTime: string;
  prepTime: string;
  category: string;
  difficulty: "Easy" | "Medium" | "Hard";
  servings: number;
  ingredients: string[];
  instructions: string[];
  tags: string[];
}

export const sampleRecipes: Recipe[] = [
  {
    id: "1",
    title: "Classic Margherita Pizza",
    description:
      "A traditional Italian pizza with fresh basil, mozzarella, and tomato sauce",
    image:
      "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=400&h=300&fit=crop",
    cookTime: "15 mins",
    prepTime: "20 mins",
    category: "Italian",
    difficulty: "Medium",
    servings: 4,
    ingredients: [
      "1 pizza dough",
      "1/2 cup tomato sauce",
      "8 oz fresh mozzarella, sliced",
      "Fresh basil leaves",
      "2 tbsp olive oil",
      "Salt and pepper to taste",
    ],
    instructions: [
      "Preheat oven to 475°F (245°C)",
      "Roll out pizza dough on a floured surface",
      "Spread tomato sauce evenly over dough",
      "Add mozzarella slices and season with salt and pepper",
      "Bake for 12-15 minutes until crust is golden",
      "Top with fresh basil and drizzle with olive oil before serving",
    ],
    tags: ["vegetarian", "italian", "cheese"],
  },
  {
    id: "2",
    title: "Chicken Tikka Masala",
    description:
      "Creamy tomato-based curry with tender chicken pieces and aromatic spices",
    image:
      "https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=400&h=300&fit=crop",
    cookTime: "30 mins",
    prepTime: "25 mins",
    category: "Indian",
    difficulty: "Medium",
    servings: 6,
    ingredients: [
      "2 lbs chicken breast, cubed",
      "1 cup heavy cream",
      "1 can tomato sauce",
      "2 tbsp garam masala",
      "1 tbsp ginger-garlic paste",
      "1 onion, diced",
      "Basmati rice for serving",
    ],
    instructions: [
      "Marinate chicken with spices for 15 minutes",
      "Cook chicken in a large pan until golden",
      "Sauté onions until translucent",
      "Add tomato sauce and simmer for 10 minutes",
      "Stir in cream and cooked chicken",
      "Serve hot over basmati rice",
    ],
    tags: ["indian", "spicy", "curry", "chicken"],
  },
  {
    id: "3",
    title: "Chocolate Chip Cookies",
    description:
      "Soft and chewy homemade cookies with plenty of chocolate chips",
    image:
      "https://images.unsplash.com/photo-1499636136210-6f4ee915583e?w=400&h=300&fit=crop",
    cookTime: "12 mins",
    prepTime: "15 mins",
    category: "Dessert",
    difficulty: "Easy",
    servings: 24,
    ingredients: [
      "2 1/4 cups all-purpose flour",
      "1 cup butter, softened",
      "3/4 cup brown sugar",
      "1/2 cup white sugar",
      "2 large eggs",
      "2 cups chocolate chips",
      "1 tsp vanilla extract",
    ],
    instructions: [
      "Preheat oven to 375°F (190°C)",
      "Cream butter with both sugars until fluffy",
      "Beat in eggs and vanilla",
      "Gradually mix in flour",
      "Fold in chocolate chips",
      "Drop spoonfuls on baking sheet and bake 9-11 minutes",
    ],
    tags: ["dessert", "cookies", "chocolate", "baking"],
  },
  {
    id: "4",
    title: "Mediterranean Quinoa Salad",
    description:
      "Fresh and healthy salad with quinoa, vegetables, and feta cheese",
    image:
      "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400&h=300&fit=crop",
    cookTime: "0 mins",
    prepTime: "20 mins",
    category: "Salad",
    difficulty: "Easy",
    servings: 4,
    ingredients: [
      "1 cup quinoa, cooked",
      "1 cucumber, diced",
      "1 cup cherry tomatoes, halved",
      "1/2 red onion, sliced",
      "1/2 cup feta cheese",
      "1/4 cup olive oil",
      "2 tbsp lemon juice",
      "Fresh herbs",
    ],
    instructions: [
      "Cook quinoa according to package directions and let cool",
      "Dice cucumber and halve cherry tomatoes",
      "Thinly slice red onion",
      "Whisk olive oil with lemon juice",
      "Combine all ingredients in a large bowl",
      "Toss with dressing and refrigerate before serving",
    ],
    tags: ["healthy", "vegetarian", "mediterranean", "salad"],
  },
  {
    id: "5",
    title: "Beef Tacos",
    description: "Seasoned ground beef tacos with fresh toppings and lime",
    image:
      "https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=400&h=300&fit=crop",
    cookTime: "15 mins",
    prepTime: "10 mins",
    category: "Mexican",
    difficulty: "Hard",
    servings: 4,
    ingredients: [
      "1 lb ground beef",
      "8 taco shells",
      "1 packet taco seasoning",
      "1 cup lettuce, shredded",
      "1 cup cheese, shredded",
      "1 tomato, diced",
      "Sour cream and salsa",
    ],
    instructions: [
      "Brown ground beef in a large skillet",
      "Add taco seasoning and water as directed",
      "Simmer until sauce thickens",
      "Warm taco shells in oven",
      "Fill shells with beef mixture",
      "Top with lettuce, cheese, tomatoes, and desired toppings",
    ],
    tags: ["mexican", "beef", "quick", "family-friendly"],
  },
  {
    id: "6",
    title: "Banana Pancakes",
    description: "Fluffy pancakes with mashed banana and a touch of cinnamon",
    image:
      "https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=400&h=300&fit=crop",
    cookTime: "15 mins",
    prepTime: "10 mins",
    category: "Breakfast",
    difficulty: "Easy",
    servings: 4,
    ingredients: [
      "2 cups all-purpose flour",
      "2 ripe bananas, mashed",
      "2 cups milk",
      "2 eggs",
      "2 tbsp sugar",
      "1 tsp baking powder",
      "1/2 tsp cinnamon",
      "Butter for cooking",
    ],
    instructions: [
      "Mash bananas in a large bowl",
      "Whisk in milk, eggs, and sugar",
      "In another bowl, combine flour, baking powder, and cinnamon",
      "Fold dry ingredients into wet ingredients",
      "Heat butter in a pan over medium heat",
      "Pour batter and cook until bubbles form, then flip",
    ],
    tags: ["breakfast", "pancakes", "banana", "family-friendly"],
  },
];

export const categories = [
  "All",
  "Italian",
  "Indian",
  "Mexican",
  "Dessert",
  "Salad",
  "Breakfast",
] as const;

export const difficulties = ["All", "Easy", "Medium", "Hard"];

// Helper function to extract numeric cooking time from string
export const getCookTimeInMinutes = (cookTime: string): number => {
  const match = cookTime.match(/(\d+)/);
  return match ? parseInt(match[1]) : 0;
};
