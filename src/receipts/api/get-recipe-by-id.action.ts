import { tesloApi } from "@/api/TheMealDBApi";
import { db } from "@/firebase/config";
import type { Recipe } from "@/interfaces/recipe.response";
import { doc, getDoc } from "firebase/firestore";

export const getRecipeByIdAction = async (
  id: string
): Promise<Recipe | null> => {
  const docRef = doc(db, "recipes", id);
  const snap = await getDoc(docRef);

  if (snap.exists()) {
    return { idMeal: snap.id, ...(snap.data() as Omit<Recipe, "idMeal">) };
  }

  const { data } = await tesloApi.get<{ meals: Recipe[] }>(
    `/lookup.php?i=${id}`
  );

  return data.meals ? data.meals[0] : null;
};
