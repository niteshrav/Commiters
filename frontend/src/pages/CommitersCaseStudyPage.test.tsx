import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { describe, expect, it } from "vitest";
import CommitersCaseStudyPage from "./CommitersCaseStudyPage";
import { COMMITERS_CASE_STUDY_COPY } from "../lib/commitersCaseStudyContent";
import { ROUTES } from "../lib/routes";

describe("CommitersCaseStudyPage", () => {
  it("follows the demo text arrangement with Commiters live-site copy", () => {
    render(
      <MemoryRouter>
        <CommitersCaseStudyPage />
      </MemoryRouter>,
    );

    expect(screen.getByRole("heading", { level: 1, name: "The studio, engineered as a product." })).toBeInTheDocument();
    expect(screen.getByText(COMMITERS_CASE_STUDY_COPY.subtitle)).toBeInTheDocument();
    expect(screen.getAllByRole("link", { name: /View live product/i })[0]).toHaveAttribute("href", ROUTES.home);
    expect(screen.getByRole("heading", { name: "Problem" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Solution" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "USP of the project" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Tech stack used" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Outcome" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Live demo" })).toBeInTheDocument();
  });
});
