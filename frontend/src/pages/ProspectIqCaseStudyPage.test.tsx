import { render, screen, within } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { describe, expect, it } from "vitest";
import ProspectIqCaseStudyPage from "./ProspectIqCaseStudyPage";
import { PROSPECT_IQ_CASE_STUDY_COPY } from "../lib/prospectIqCaseStudyContent";
import { ROUTES } from "../lib/routes";

describe("ProspectIqCaseStudyPage", () => {
  it("renders the governed AI case study on the Commiters technical template", () => {
    render(
      <MemoryRouter>
        <ProspectIqCaseStudyPage />
      </MemoryRouter>,
    );

    const page = screen.getByTestId("prospectiq-case-study-page");
    expect(page).toHaveClass("commiters-case-study-page", "technical-case-study-page");
    expect(screen.getByText(PROSPECT_IQ_CASE_STUDY_COPY.kicker)).toBeInTheDocument();
    expect(screen.getByRole("heading", { level: 1, name: PROSPECT_IQ_CASE_STUDY_COPY.title })).toBeInTheDocument();
    expect(screen.getByText(PROSPECT_IQ_CASE_STUDY_COPY.subtitle)).toBeInTheDocument();
    expect(screen.getByTestId("prospectiq-case-study-hero-image")).toHaveAttribute(
      "src",
      PROSPECT_IQ_CASE_STUDY_COPY.heroImage?.src,
    );

    const stack = screen.getByTestId("prospectiq-case-study-core-stack");
    expect(stack).toHaveClass("commiters-case-study-core-stack--slate");
    expect(within(stack).getByText("Python 3.11")).toBeInTheDocument();
    expect(within(stack).getByText("MCP Protocol")).toBeInTheDocument();

    const overview = screen.getByTestId("prospectiq-case-study-overview");
    expect(within(overview).getByText("10x Faster")).toBeInTheDocument();
    expect(within(overview).getByText("100% Policy-Gated MCP Execution")).toBeInTheDocument();

    const architecture = screen.getByTestId("prospectiq-case-study-architecture");
    expect(within(architecture).getByRole("heading", { name: "Multi-Agent Lead Enrichment Engine" })).toBeInTheDocument();
    expect(within(architecture).getByRole("heading", { name: /Model Context Protocol/ })).toBeInTheDocument();

    const primary = screen.getByRole("link", { name: "Scope Your Custom AI Pipeline" });
    expect(primary).toHaveAttribute("href", ROUTES.aiSolutions);
    expect(primary).toHaveClass("technical-case-study-cta--cyan-glow");
    expect(screen.getByRole("link", { name: /View All Work/i })).toHaveAttribute("href", ROUTES.caseStudies);
  });
});
