import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import AiSolutionsPage from "./AiSolutionsPage";
import { AI_SOLUTIONS_HERO, AI_SOLUTIONS_SEO } from "../lib/aiSolutionsPageContent";

describe("AiSolutionsPage", () => {
  it("renders the Gen AI service landing with product SEO", () => {
    render(
      <MemoryRouter>
        <AiSolutionsPage />
      </MemoryRouter>,
    );

    expect(screen.getByTestId("ai-solutions-page")).toBeInTheDocument();
    expect(screen.getByTestId("ai-solutions-section")).toBeInTheDocument();
    expect(document.title).toBe(AI_SOLUTIONS_SEO.title);
    expect(document.querySelector('meta[name="description"]')).toHaveAttribute("content", AI_SOLUTIONS_SEO.description);
    expect(screen.getByRole("heading", { name: AI_SOLUTIONS_HERO.headline, level: 1 })).toBeInTheDocument();
  });
});
