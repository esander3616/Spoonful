import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import RecipeForm from "./RecipeForm";
import userService from "../../utils/userService";
import type { Ingredient, Instruction, Recipe } from "../../shared.types";

const BASE_URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:3000";

type RecipeFormData = {
  title: string;
  description: string;
  image: string;
  ingredients: Ingredient[];
  instructions: Instruction[];
  tags: string[];
};

function EditRecipe() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [recipe, setRecipe] = useState<Recipe | null>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const response = await axios.get<Recipe>(`${BASE_URL}/api/recipes/${id}`);
        setRecipe(response.data);
      } catch (err) {
        console.error("Error fetching recipe:", err);
        setError("Could not load recipe");
      }
    };
    fetchRecipe();
  }, [id]);

  async function handleUpdate(data: RecipeFormData) {
    try {
      await axios.put(`${BASE_URL}/api/recipes/${id}`, data, {
        headers: { Authorization: `Bearer ${userService.getToken()}` },
      });
      navigate("/dashboard");
    } catch (err) {
      console.error("Error updating recipe:", err);
      alert("Could not update recipe");
    }
  }

  if (error) return <p>{error}</p>;
  if (!recipe) return <p>Loading...</p>;

  return (
    <div>
      <h1>Edit Recipe</h1>
      <RecipeForm initialData={recipe} onSubmit={handleUpdate} submitLabel="Save Changes" />
    </div>
  );
}

export default EditRecipe;
