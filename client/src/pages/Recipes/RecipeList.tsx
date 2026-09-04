import type { Recipe } from "../../shared.types";
import RecipeCard from "./RecipeCard";

function RecipeList({ recipes }: { recipes: Recipe[] }) {
  if (recipes.length === 0) return <p>No matching recipes.</p>;

  return (
    <div className="recipe-grid">
      {recipes.map((recipe) => (
        <RecipeCard key={recipe._id} recipe={recipe} />
      ))}
    </div>
  );
}

export default RecipeList;