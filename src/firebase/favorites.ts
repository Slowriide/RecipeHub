import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { db } from "./config";

const favoritesCollection = collection(db, "favorites");

export const addFavorite = async (userId: string, recipe: any) => {
  const recipeData = {
    id: recipe.id,
    title: recipe.title,
    description: recipe.description || "",
    image: recipe.image || "",
    cookTime: recipe.cookTime || "",
    category: recipe.category || "",
    whereFrom: recipe.whereFrom || "",
  };

  await addDoc(favoritesCollection, {
    userId,
    recipeId: recipe.id,
    recipeData: recipeData,
  });
};

export const removeFavorite = async (userId: string, recipeId: string) => {
  const q = query(
    favoritesCollection,
    where("userId", "==", userId),
    where("recipeId", "==", recipeId)
  );
  const querySnapshot = await getDocs(q);

  querySnapshot.forEach(async (docSnap) => {
    await deleteDoc(doc(db, "favorites", docSnap.id));
  });
};

export const getFavorites = async (userId: string) => {
  const q = query(favoritesCollection, where("userId", "==", userId));
  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map((doc) => doc.data());
};

export const isRecipeFavorite = async (userId: string, recipeId: string) => {
  const q = query(
    favoritesCollection,
    where("userId", "==", userId),
    where("recipeId", "==", recipeId)
  );
  const querySnapshot = await getDocs(q);
  return !querySnapshot.empty;
};
