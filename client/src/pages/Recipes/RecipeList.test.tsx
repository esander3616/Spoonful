import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import RecipeList from "./RecipeList";
import type { Recipe } from "../../shared.types";

const mockRecipes: Recipe[] = [
  { _id: "1", title: "Pancakes", description: "", ingredients: [], instructions: [], tags: [], ownerId: "o1" },
  { _id: "2", title: "Waffles", description: "", ingredients: [], instructions: [], tags: [], ownerId: "o1" },
];

describe("RecipeList", () => {
  it("renders a card for each recipe", () => {
    render(
      <MemoryRouter>
        <RecipeList recipes={mockRecipes} />
      </MemoryRouter>,
    );
    expect(screen.getByText("Pancakes")).toBeInTheDocument();
    expect(screen.getByText("Waffles")).toBeInTheDocument();
  });

  it("shows a message when there are no recipes", () => {
    render(
      <MemoryRouter>
        <RecipeList recipes={[]} />
      </MemoryRouter>,
    );
    expect(screen.getByText("No matching recipes.")).toBeInTheDocument();
  });
});