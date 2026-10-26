import { render, screen, within } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { describe, expect, it } from "vitest";
import ProspectIqCaseStudyPage from "./ProspectIqCaseStudyPage";
import { PROSPECT_IQ_CASE_STUDY_COPY } from "../lib/prospectIqCaseStudyContent";
import { ROUTES } from "../lib/routes";

describe("ProspectIqCaseStudyPage", () => {
  it("renders the lending decision-support case study on the Commiters technical template", () => {
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
    expect(within(stack).getByText("Python")).toBeInTheDocument();
    expect(within(stack).getByText("Google ADK")).toBeInTheDocument();
    expect(within(stack).getByText("Streamlit")).toBeInTheDocument();

    const overview = screen.getByTestId("prospectiq-case-study-overview");
    expect(within(overview).getByText("5 Sequential ADK Agents")).toBeInTheDocument();
    expect(within(overview).getByText("Human-in-the-Loop Underwriting")).toBeInTheDocument();

    const architecture = screen.getByTestId("prospectiq-case-study-architecture");
    expect(within(architecture).getByRole("heading", { name: "Deterministic Scoring Engine" })).toBeInTheDocument();
    expect(within(architecture).getByRole("heading", { name: "Sequential Google ADK Agents" })).toBeInTheDocument();
    expect(within(architecture).getByRole("heading", { name: "Human-in-the-Loop Underwriting" })).toBeInTheDocument();

    const primary = screen.getAllByRole("link", { name: "Start an AI Project" });
    expect(primary[0]).toHaveAttribute("href", ROUTES.contact);
    expect(primary.some((link) => link.classList.contains("technical-case-study-cta--cyan-glow"))).toBe(true);
    expect(screen.getAllByRole("link", { name: /View All Work/i })[0]).toHaveAttribute("href", ROUTES.caseStudies);
  });
});
