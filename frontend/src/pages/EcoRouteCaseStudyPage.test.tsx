import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { describe, expect, it } from "vitest";
import EcoRouteCaseStudyPage from "./EcoRouteCaseStudyPage";
import { ECOROUTE_LIVE_URL, ECO_ROUTE_CASE_STUDY_COPY } from "../lib/ecoRouteCaseStudyContent";

describe("EcoRouteCaseStudyPage", () => {
  it("follows the demo text arrangement with EcoRoute copy", () => {
    render(
      <MemoryRouter>
        <EcoRouteCaseStudyPage />
      </MemoryRouter>,
    );

    expect(screen.getByRole("heading", { level: 1, name: "Mobility data, turned into a decision." })).toBeInTheDocument();
    expect(screen.getByText(ECO_ROUTE_CASE_STUDY_COPY.subtitle)).toBeInTheDocument();
    expect(screen.getAllByRole("heading", { name: "Transit Analyst Agent" })[0]).toBeInTheDocument();
    expect(screen.getAllByRole("link", { name: /View live product/i })[0]).toHaveAttribute("href", ECOROUTE_LIVE_URL);
    expect(screen.getAllByRole("link", { name: /Live Demo/i })[0]).toHaveAttribute("href", ECOROUTE_LIVE_URL);
    expect(screen.getByRole("heading", { name: "Problem" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Solution" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "USP of the project" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Tech stack used" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Outcome" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Live demo" })).toBeInTheDocument();
  });
});
