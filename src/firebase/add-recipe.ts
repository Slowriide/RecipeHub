import type { Recipe } from "@/interfaces/recipe.response";
import {
  addDoc,
  collection,
  getDocs,
  query,
  serverTimestamp,
  where,
} from "firebase/firestore";
import { db } from "./config";

export const addRecipe = async (userId: string, recipe: Recipe) => {
  const docRef = await addDoc(collection(db, "recipes"), {
    ...recipe,
    userId,
    createdAt: serverTimestamp(),
  });
  return docRef.id;
};

export const getUserRecipes = async (userId: string): Promise<Recipe[]> => {
  const q = query(collection(db, "recipes"), where("userId", "==", userId));
  const snapshot = await getDocs(q);

  return snapshot.docs.map((doc) => ({
    ...(doc.data() as Recipe),
    idMeal: doc.id,
  }));
};
