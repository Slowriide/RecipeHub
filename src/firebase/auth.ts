import { GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";
import { auth } from "./config";

const provider = new GoogleAuthProvider();

export const loginWithGoogle = async () => {
  const result = await signInWithPopup(auth, provider);
  const user = result.user;

  localStorage.setItem(
    "user",
    JSON.stringify({
      uid: user.uid,
      name: user.displayName,
      email: user.email,
      photoUrl: user.photoURL,
    })
  );
  window.location.href = "/";
};

export const logout = async () => {
  signOut(auth);
  localStorage.removeItem("user");
};

export const getUserFromLocal = () => {
  const user = localStorage.getItem("user");
  return user ? JSON.parse(user) : null;
};
