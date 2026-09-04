import { Link } from "react-router-dom";
import type { Recipe } from "../../shared.types";

function RecipeCard({ recipe }: { recipe: Recipe }) {
  return (
    <Link to={`/recipes/${recipe._id}`} className="recipe-card">
      {recipe.image && <img src={recipe.image} alt={recipe.title} />}
      <h3>{recipe.title}</h3>
      <p>{recipe.description}</p>
    </Link>
  );
}

export default RecipeCard;