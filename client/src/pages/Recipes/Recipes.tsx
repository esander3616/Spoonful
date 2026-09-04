import { useState, useEffect } from "react";
import axios from "axios";
import type { Recipe } from "../../shared.types";
import RecipeList from "./RecipeList";

const BASE_URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:3000";

function Recipes() {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [search, setSearch] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const url = `${BASE_URL}/api/recipes${search ? `?q=${search}` : ""}`;
        const response = await axios.get<Recipe[]>(url);
        setRecipes(response.data);
      } catch (err) {
        console.error("Error fetching recipes:", err);
        setError("Could not load recipes");
      }
    };
    fetchRecipes();
  }, [search]);

  return (
    <div className="recipes-page">
      <input
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search by title, tag, or ingredient..."
      />
      {error && <p>{error}</p>}
      <RecipeList recipes={recipes} />
    </div>
  );
}

export default Recipes;