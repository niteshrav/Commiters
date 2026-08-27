import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import AiSolutionsSection from "./AiSolutionsSection";
import {
  AI_SOLUTIONS_BOTTOM_CTA,
  AI_SOLUTIONS_CTA_LABEL,
  AI_SOLUTIONS_HERO,
  AI_SOLUTIONS_OFFERINGS,
  AI_SOLUTIONS_STACK,
} from "../lib/aiSolutionsPageContent";

describe("AiSolutionsSection", () => {
  it("renders hero, three offering cards, stack badges, and closing CTA", () => {
    render(
      <MemoryRouter>
        <AiSolutionsSection />
      </MemoryRouter>,
    );

    expect(screen.getByTestId("ai-solutions-section")).toBeInTheDocument();
    expect(screen.getByText(AI_SOLUTIONS_HERO.eyebrow)).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: AI_SOLUTIONS_HERO.headline, level: 1 })).toBeInTheDocument();
    expect(screen.getByText(AI_SOLUTIONS_HERO.subheadline)).toBeInTheDocument();
    expect(screen.getByRole("link", { name: AI_SOLUTIONS_CTA_LABEL })).toHaveAttribute("href", "#ai-offerings");

    const offerings = screen.getByTestId("ai-solutions-offerings");
    expect(offerings).toHaveClass("aisol-cards");
    for (const card of AI_SOLUTIONS_OFFERINGS) {
      expect(screen.getByRole("heading", { name: card.title, level: 2 })).toBeInTheDocument();
      expect(screen.getByText(card.body)).toBeInTheDocument();
    }

    const stack = screen.getByTestId("ai-solutions-stack");
    for (const item of AI_SOLUTIONS_STACK) {
      expect(stack).toHaveTextContent(item.label);
    }

    expect(screen.getByRole("heading", { name: AI_SOLUTIONS_BOTTOM_CTA.headline, level: 2 })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: AI_SOLUTIONS_BOTTOM_CTA.buttonLabel })).toHaveAttribute(
      "href",
      AI_SOLUTIONS_BOTTOM_CTA.to,
    );
  });
});
