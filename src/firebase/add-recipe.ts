import type { Recipe } from "@/interfaces/recipe.response";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db } from "./config";

export const addRecipe = async (userId: string, recipe: Recipe) => {
  const docRef = await addDoc(collection(db, "recipes"), {
    ...recipe,
    userId,
    createdAt: serverTimestamp(),
  });
  return docRef.id;
};
