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
    expect(page).toHaveClass("commiters-case-study-page", "technical-case-study-page");
    expect(screen.getByText(ECO_ROUTE_CASE_STUDY_COPY.kicker)).toBeInTheDocument();
    expect(screen.getByRole("heading", { level: 1, name: ECO_ROUTE_CASE_STUDY_COPY.title })).toBeInTheDocument();
    expect(screen.getByText(ECO_ROUTE_CASE_STUDY_COPY.subtitle)).toBeInTheDocument();

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

    const primary = screen.getByRole("link", { name: "Build Your Cloud Platform" });
    expect(primary).toHaveAttribute("href", ROUTES.webApplications);
    expect(primary).toHaveClass("technical-case-study-cta--gold-blue");
    expect(screen.getByRole("link", { name: /View All Work/i })).toHaveAttribute("href", ROUTES.caseStudies);
  });
});
