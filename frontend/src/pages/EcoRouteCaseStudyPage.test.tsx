import { render, screen, within } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { describe, expect, it } from "vitest";
import EcoRouteCaseStudyPage from "./EcoRouteCaseStudyPage";
import { ECO_ROUTE_CASE_STUDY_COPY } from "../lib/ecoRouteCaseStudyContent";
import { ROUTES } from "../lib/routes";

describe("EcoRouteCaseStudyPage", () => {
  it("renders the AI transportation decision case study on the Commiters technical template", () => {
    render(
      <MemoryRouter>
        <EcoRouteCaseStudyPage />
      </MemoryRouter>,
    );

    const page = screen.getByTestId("ecoroute-case-study-page");
    expect(page).toHaveClass("commiters-case-study-page", "technical-case-study-page", "ecoroute-case-study-page");
    expect(screen.getByText(ECO_ROUTE_CASE_STUDY_COPY.kicker)).toBeInTheDocument();
    expect(screen.getByRole("heading", { level: 1, name: ECO_ROUTE_CASE_STUDY_COPY.title })).toBeInTheDocument();
    expect(screen.getByText(ECO_ROUTE_CASE_STUDY_COPY.subtitle)).toBeInTheDocument();
    expect(screen.getByTestId("ecoroute-case-study-hero-image")).toHaveAttribute(
      "src",
      ECO_ROUTE_CASE_STUDY_COPY.heroImage?.src,
    );

    const stack = screen.getByTestId("ecoroute-case-study-core-stack");
    expect(stack).toHaveClass("commiters-case-study-core-stack--slate");
    expect(within(stack).getByText("Python")).toBeInTheDocument();
    expect(within(stack).getByText("Google ADK")).toBeInTheDocument();
    expect(within(stack).getByText("Gemini 2.5 Flash")).toBeInTheDocument();

    const overview = screen.getByTestId("ecoroute-case-study-overview");
    expect(within(overview).getByText("15 Sample Traffic Routes")).toBeInTheDocument();
    expect(within(overview).getByText("6 High-Risk Corridors")).toBeInTheDocument();

    const architecture = screen.getByTestId("ecoroute-case-study-architecture");
    expect(within(architecture).getByRole("heading", { name: "Transit Analyst Agent" })).toBeInTheDocument();
    expect(within(architecture).getByText(/Policy Director Agent/i)).toBeInTheDocument();

    const primary = screen.getAllByRole("link", { name: "Start an AI Project" });
    expect(primary[0]).toHaveAttribute("href", ROUTES.contact);
    expect(primary.some((link) => link.classList.contains("technical-case-study-cta--gold-blue"))).toBe(true);
    expect(screen.getAllByRole("link", { name: /View All Work/i })[0]).toHaveAttribute("href", ROUTES.caseStudies);
  });
});
