import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import RecipeCard from "./RecipeCard";
import type { Recipe } from "../../shared.types";

const mockRecipe: Recipe = {
  _id: "1",
  title: "Pancakes",
  description: "Fluffy breakfast pancakes",
  ingredients: [],
  instructions: [],
  tags: [],
  ownerId: "owner1",
};

describe("RecipeCard", () => {
  it("renders the recipe title and description", () => {
    render(
      <MemoryRouter>
        <RecipeCard recipe={mockRecipe} />
      </MemoryRouter>,
    );
    expect(screen.getByText("Pancakes")).toBeInTheDocument();
    expect(screen.getByText("Fluffy breakfast pancakes")).toBeInTheDocument();
  });

  it("links to the recipe's detail page", () => {
    render(
      <MemoryRouter>
        <RecipeCard recipe={mockRecipe} />
      </MemoryRouter>,
    );
    expect(screen.getByRole("link")).toHaveAttribute("href", "/recipes/1");
  });
});