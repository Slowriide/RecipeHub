import { useEffect, useState } from "react";
import { getUserFromLocal } from "@/firebase/auth";
import {
  addFavorite,
  removeFavorite,
  isRecipeFavorite,
} from "@/firebase/favorites";
import { RecipeCard } from "../RecipeCard";

interface RecipeWithFavorite {
  id: string;
  title: string;
  description: string;
  image: string;
  cookTime: string;
  category: string;
  whereFrom: string;
}

export const RecipeCardWrapper = (props: RecipeWithFavorite) => {
  const user = getUserFromLocal();
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    if (!user) return;
    const checkFavorite = async () => {
      const fav = await isRecipeFavorite(user.uid, props.id);
      setIsFavorite(fav);
    };
    checkFavorite();
  }, [user, props.id]);

  const handleToggleFavorite = async (id: string) => {
    if (!user) return alert("Please log in to manage favorites");

    if (isFavorite) {
      await removeFavorite(user.uid, id);
      setIsFavorite(false);
    } else {
      await addFavorite(user.uid, props);
      setIsFavorite(true);
    }
  };

  return (
    <RecipeCard
      {...props}
      isFavorite={isFavorite}
      onToggleFavorite={handleToggleFavorite}
    />
  );
};
