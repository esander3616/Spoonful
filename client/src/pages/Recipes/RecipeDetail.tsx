import { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import type { Recipe } from "../../shared.types";

const BASE_URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:3000";

function RecipeDetail() {
  const { id } = useParams();
  const [recipe, setRecipe] = useState<Recipe | null>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const response = await axios.get<Recipe>(`${BASE_URL}/api/recipes/${id}`);
        setRecipe(response.data);
      } catch (err) {
        console.error("Error fetching recipe:", err);
        setError("Recipe not found");
      }
    };
    fetchRecipe();
  }, [id]);

  if (error) return <p>{error}</p>;
  if (!recipe) return <p>Loading...</p>;

  return (
    <div className="recipe-detail">
      <h1>{recipe.title}</h1>
      {recipe.image && <img src={recipe.image} alt={recipe.title} />}
      <p>{recipe.description}</p>

      {recipe.tags.length > 0 && (
        <div className="recipe-tags">
          {recipe.tags.map((tag) => <span key={tag} className="tag">{tag}</span>)}
        </div>
      )}

      <h2>Ingredients</h2>
      <ul>
        {recipe.ingredients.map((ing, i) => <li key={i}>{ing.quantity} {ing.name}</li>)}
      </ul>

      <h2>Instructions</h2>
      <ol>
        {[...recipe.instructions].sort((a, b) => a.step - b.step).map((inst) => (
          <li key={inst.step}>{inst.description}</li>
        ))}
      </ol>
    </div>
  );
}

export default RecipeDetail;