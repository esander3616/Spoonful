import { render, screen, waitFor } from "@testing-library/react";
import { MemoryRouter, Routes, Route } from "react-router-dom";
import { vi } from "vitest";
import axios from "axios";
import RecipeDetail from "./RecipeDetail";

vi.mock("axios");
const mockedAxios = vi.mocked(axios, true);

describe("RecipeDetail", () => {
  it("fetches and displays the recipe matching the URL id", async () => {
    mockedAxios.get.mockResolvedValue({
      data: {
        _id: "1",
        title: "Pancakes",
        description: "Fluffy",
        ingredients: [{ name: "Flour", quantity: "2 cups" }],
        instructions: [{ step: 1, description: "Mix it all together" }],
        tags: ["breakfast"],
        ownerId: "o1",
      },
    });

    render(
      <MemoryRouter initialEntries={["/recipes/1"]}>
        <Routes>
          <Route path="/recipes/:id" element={<RecipeDetail />} />
        </Routes>
      </MemoryRouter>,
    );

    await waitFor(() => {
      expect(screen.getByText("Pancakes")).toBeInTheDocument();
    });
    expect(screen.getByText("2 cups Flour")).toBeInTheDocument();
    expect(screen.getByText("Mix it all together")).toBeInTheDocument();
  });

  it("shows an error message when the recipe isn't found", async () => {
    mockedAxios.get.mockRejectedValue(new Error("404"));

    render(
      <MemoryRouter initialEntries={["/recipes/bad-id"]}>
        <Routes>
          <Route path="/recipes/:id" element={<RecipeDetail />} />
        </Routes>
      </MemoryRouter>,
    );

    await waitFor(() => {
      expect(screen.getByText("Recipe not found")).toBeInTheDocument();
    });
  });
});