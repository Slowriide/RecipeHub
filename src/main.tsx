import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { RecipeHubApp } from "./RecipeHubApp";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RecipeHubApp />
  </StrictMode>
);
