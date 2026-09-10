import { render, screen, within } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { describe, expect, it } from "vitest";
import EcoRouteCaseStudyPage from "./EcoRouteCaseStudyPage";
import { ECO_ROUTE_CASE_STUDY_COPY } from "../lib/ecoRouteCaseStudyContent";
import { ROUTES } from "../lib/routes";

describe("EcoRouteCaseStudyPage", () => {
  it("renders the spec-driven fleet case study on the Commiters technical template", () => {
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
    expect(within(stack).getByText("React 18")).toBeInTheDocument();
    expect(within(stack).getByText("PostgreSQL / PostGIS")).toBeInTheDocument();

    const overview = screen.getByTestId("ecoroute-case-study-overview");
    expect(within(overview).getByText("24% Average Fuel & CO2 Savings")).toBeInTheDocument();
    expect(within(overview).getByText("<100ms Telemetry Response")).toBeInTheDocument();

    const architecture = screen.getByTestId("ecoroute-case-study-architecture");
    expect(within(architecture).getByRole("heading", { name: "High-Performance Geo-Spatial Engine" })).toBeInTheDocument();
    expect(within(architecture).getByText(/Row-Level Security/i)).toBeInTheDocument();

    const primary = screen.getAllByRole("link", { name: "Build Your Cloud Platform" });
    expect(primary[0]).toHaveAttribute("href", ROUTES.webApplications);
    expect(primary.some((link) => link.classList.contains("technical-case-study-cta--gold-blue"))).toBe(true);
    expect(screen.getAllByRole("link", { name: /View All Work/i })[0]).toHaveAttribute("href", ROUTES.caseStudies);
  });
});
