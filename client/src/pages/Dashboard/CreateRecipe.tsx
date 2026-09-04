import axios from "axios";
import { useNavigate } from "react-router-dom";
import RecipeForm from "./RecipeForm";
import userService from "../../utils/userService";
import type { Ingredient, Instruction } from "../../shared.types";

const BASE_URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:3000";

type RecipeFormData = {
  title: string;
  description: string;
  image: string;
  ingredients: Ingredient[];
  instructions: Instruction[];
  tags: string[];
};

function CreateRecipe() {
  const navigate = useNavigate();

  async function handleCreate(data: RecipeFormData) {
    try {
      await axios.post(`${BASE_URL}/api/recipes`, data, {
        headers: { Authorization: `Bearer ${userService.getToken()}` },
      });
      navigate("/dashboard");
    } catch (err) {
      console.error("Error creating recipe:", err);
      alert("Could not create recipe");
    }
  }

  return (
    <div>
      <h1>New Recipe</h1>
      <RecipeForm onSubmit={handleCreate} submitLabel="Create Recipe" />
    </div>
  );
}

export default CreateRecipe;
