import { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { useUser } from "../../context/userContext";
import userService from "../../utils/userService";
import type { Recipe } from "../../shared.types";

const BASE_URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:3000";

function Dashboard() {
  const { user } = useUser();
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMyRecipes = async () => {
      try {
        const response = await axios.get<Recipe[]>(`${BASE_URL}/api/recipes`);
        setRecipes(response.data.filter((r) => r.ownerId === user?._id));
      } catch (err) {
        console.error("Error fetching recipes:", err);
        setError("Could not load your recipes");
      } finally {
        setIsLoading(false);
      }
    };
    fetchMyRecipes();
  }, [user]);

  async function handleDelete(id: string) {
    const confirmed = window.confirm("Delete this recipe? This can't be undone.");
    if (!confirmed) return;

    try {
      await axios.delete(`${BASE_URL}/api/recipes/${id}`, {
        headers: { Authorization: `Bearer ${userService.getToken()}` },
      });
      setRecipes((prev) => prev.filter((r) => r._id !== id));
    } catch (err) {
      console.error("Error deleting recipe:", err);
      setError("Could not delete recipe");
    }
  }

  return (
    <div className="dashboard">
      <h1>My Recipes</h1>
      <Link to="/dashboard/new">+ New Recipe</Link>

      {isLoading && <p>Loading your recipes...</p>}
      {error && <p>{error}</p>}
      {!isLoading && recipes.length === 0 && <p>You haven't created any recipes yet.</p>}

      <div className="dashboard-list">
        {recipes.map((recipe) => (
          <div key={recipe._id} className="dashboard-item">
            <h3>{recipe.title}</h3>
            <button onClick={() => navigate(`/dashboard/edit/${recipe._id}`)}>Edit</button>
            <button onClick={() => handleDelete(recipe._id)}>Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Dashboard;
