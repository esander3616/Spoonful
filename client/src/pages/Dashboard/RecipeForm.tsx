import { useState } from "react";
import type { FormEvent } from "react";
import type { Ingredient, Instruction, Recipe } from "../../shared.types";

type SubmitData = {
  title: string;
  description: string;
  image: string;
  ingredients: Ingredient[];
  instructions: Instruction[];
  tags: string[];
};

type RecipeFormProps = {
  initialData?: Recipe;
  onSubmit: (data: SubmitData) => void;
  submitLabel: string;
};

function RecipeForm({ initialData, onSubmit, submitLabel }: RecipeFormProps) {
  const [title, setTitle] = useState(initialData?.title || "");
  const [description, setDescription] = useState(initialData?.description || "");
  const [image, setImage] = useState(initialData?.image || "");
  const [tags, setTags] = useState(initialData?.tags?.join(", ") || "");
  const [ingredients, setIngredients] = useState<Ingredient[]>(
    initialData?.ingredients?.length ? initialData.ingredients : [{ name: "", quantity: "" }],
  );
  const [instructions, setInstructions] = useState<Instruction[]>(
    initialData?.instructions?.length
      ? initialData.instructions
      : [{ step: 1, description: "" }],
  );

  function updateIngredient(index: number, field: keyof Ingredient, value: string) {
    setIngredients((prev) => prev.map((ing, i) => (i === index ? { ...ing, [field]: value } : ing)));
  }

  function addIngredient() {
    setIngredients((prev) => [...prev, { name: "", quantity: "" }]);
  }

  function removeIngredient(index: number) {
    setIngredients((prev) => prev.filter((_, i) => i !== index));
  }

  function updateInstruction(index: number, value: string) {
    setInstructions((prev) =>
      prev.map((inst, i) => (i === index ? { ...inst, description: value } : inst)),
    );
  }

  function addInstruction() {
    setInstructions((prev) => [...prev, { step: prev.length + 1, description: "" }]);
  }

  function removeInstruction(index: number) {
    // renumber remaining steps so they stay sequential after a removal
    setInstructions((prev) =>
      prev.filter((_, i) => i !== index).map((inst, i) => ({ ...inst, step: i + 1 })),
    );
  }

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    onSubmit({
      title,
      description,
      image,
      ingredients: ingredients.filter((i) => i.name.trim()),
      instructions: instructions.filter((i) => i.description.trim()),
      tags: tags
        .split(",")
        .map((t) => t.trim())
        .filter(Boolean),
    });
  }

  return (
    <form onSubmit={handleSubmit} className="recipe-form">
      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Recipe title"
        required
      />
      <textarea
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Description"
      />
      <input
        value={image}
        onChange={(e) => setImage(e.target.value)}
        placeholder="Image URL (imgur, etc.)"
      />
      <input
        value={tags}
        onChange={(e) => setTags(e.target.value)}
        placeholder="Tags, comma separated (e.g. vegan, salad)"
      />

      <h3>Ingredients</h3>
      {ingredients.map((ing, i) => (
        <div key={i} className="form-row">
          <input
            value={ing.name}
            onChange={(e) => updateIngredient(i, "name", e.target.value)}
            placeholder="Ingredient name"
          />
          <input
            value={ing.quantity}
            onChange={(e) => updateIngredient(i, "quantity", e.target.value)}
            placeholder="Quantity"
          />
          <button type="button" onClick={() => removeIngredient(i)}>
            Remove
          </button>
        </div>
      ))}
      <button type="button" onClick={addIngredient}>
        + Add Ingredient
      </button>

      <h3>Instructions</h3>
      {instructions.map((inst, i) => (
        <div key={i} className="form-row">
          <span>Step {inst.step}</span>
          <textarea
            value={inst.description}
            onChange={(e) => updateInstruction(i, e.target.value)}
            placeholder="Describe this step"
          />
          <button type="button" onClick={() => removeInstruction(i)}>
            Remove
          </button>
        </div>
      ))}
      <button type="button" onClick={addInstruction}>
        + Add Step
      </button>

      <button type="submit">{submitLabel}</button>
    </form>
  );
}

export default RecipeForm;
