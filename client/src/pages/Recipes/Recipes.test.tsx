import { render, screen, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { vi } from "vitest";
import axios from "axios";
import Recipes from "./Recipes";

vi.mock("axios");
const mockedAxios = vi.mocked(axios, true);

describe("Recipes", () => {
  it("fetches and displays recipes", async () => {
    const mockRecipes = [
      {
        _id: "1",
        title: "Pancakes",
        description: "Fluffy",
        ingredients: [],
        instructions: [],
        tags: [],
        ownerId: "owner1",
      },
    ];
    mockedAxios.get.mockResolvedValue({ data: mockRecipes });

    render(
      <MemoryRouter>
        <Recipes />
      </MemoryRouter>,
    );

    await waitFor(() => {
      expect(screen.getByText("Pancakes")).toBeInTheDocument();
    });
  });
});