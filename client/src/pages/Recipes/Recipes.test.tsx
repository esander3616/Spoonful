import { render, screen, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { vi } from "vitest";
import axios from "axios";
import RecipesPage from "./RecipesPage";

vi.mock("axios");
const mockedAxios = vi.mocked(axios, true);

describe("RecipesPage", () => {
  it("fetches and displays recipes", async () => {
    const mockRecipes = [
      { _id: "1", title: "Pancakes", description: "Fluffy", ingredients: [], instructions: [], tags: [] },
    ];
    mockedAxios.get.mockResolvedValue({ data: mockRecipes });

    render(
      <MemoryRouter>
        <RecipesPage />
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(screen.getByText("Pancakes")).toBeInTheDocument();
    });
  });
});