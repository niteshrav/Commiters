import { render, screen, within } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { describe, expect, it } from "vitest";
import NearDropCaseStudyPage from "./NearDropCaseStudyPage";
import { NEARDROP_CASE_STUDY_COPY } from "../lib/neardropCaseStudyContent";
import { ROUTES } from "../lib/routes";

describe("NearDropCaseStudyPage", () => {
  it("renders the logistics deep-dive sections from the Stitch mockup", () => {
    render(
      <MemoryRouter>
        <NearDropCaseStudyPage />
      </MemoryRouter>,
    );

    const page = screen.getByTestId("neardrop-case-study-page");
    expect(page).toBeInTheDocument();
    expect(page).toHaveClass("neardrop-case-study-page");
    expect(screen.getByText(NEARDROP_CASE_STUDY_COPY.kicker)).toBeInTheDocument();
    expect(
      screen.getByRole("heading", {
        level: 1,
        name: `${NEARDROP_CASE_STUDY_COPY.titleLead}${NEARDROP_CASE_STUDY_COPY.titleAccent}${NEARDROP_CASE_STUDY_COPY.titleTrail}`,
      }),
    ).toBeInTheDocument();
    expect(screen.getByText(NEARDROP_CASE_STUDY_COPY.description)).toBeInTheDocument();

    const intro = screen.getByTestId("neardrop-case-study-intro");
    expect(intro).toHaveClass("neardrop-case-study-intro");
    expect(intro.querySelector(".neardrop-case-study-title-accent")).toHaveTextContent(
      NEARDROP_CASE_STUDY_COPY.titleAccent,
    );
    expect(within(intro).getByTestId("neardrop-case-study-intro-stack")).toBeInTheDocument();
    expect(screen.queryByTestId("neardrop-case-study-core-stack")).not.toBeInTheDocument();
    expect(screen.queryByRole("heading", { name: "CORE STACK" })).not.toBeInTheDocument();

    const architecture = screen.getByTestId("neardrop-case-study-architecture");
    expect(intro.compareDocumentPosition(architecture) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy();
    expect(within(architecture).getByText("TECHNICAL ARCHITECTURE")).toBeInTheDocument();
    expect(within(architecture).getByRole("heading", { name: "Engineering for Scalability" })).toBeInTheDocument();

    const functionalExcellence = screen.getByTestId("neardrop-case-study-functional-excellence");
    expect(architecture.compareDocumentPosition(functionalExcellence) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy();
    expect(
      within(functionalExcellence).getByRole("heading", {
        name: NEARDROP_CASE_STUDY_COPY.functionalExcellence.heading,
      }),
    ).toBeInTheDocument();
    expect(functionalExcellence.querySelector(".neardrop-case-study-feature-card--highlight")).toBeFalsy();
    expect(within(functionalExcellence).getByRole("heading", { name: "Role-based Access" })).toBeInTheDocument();
    expect(within(functionalExcellence).getByRole("heading", { name: "Real-time Tracking" })).toBeInTheDocument();
    expect(within(functionalExcellence).getByRole("heading", { name: "Normalized Schema" })).toBeInTheDocument();
    expect(within(functionalExcellence).getByRole("heading", { name: "Driver-Merchant Coordination" })).toBeInTheDocument();
    expect(within(functionalExcellence).getByText(/Sub-second WebSocket updates/i)).toBeInTheDocument();
    expect(within(functionalExcellence).queryByText("01")).not.toBeInTheDocument();

    const execution = screen.getByTestId("neardrop-case-study-execution");
    expect(functionalExcellence.compareDocumentPosition(execution) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy();
    expect(within(execution).getByText("PROCESS")).toBeInTheDocument();
    expect(within(execution).getByRole("heading", { name: "Built for Impact" })).toBeInTheDocument();
    expect(within(execution).getByRole("heading", { name: "Secure Access" })).toBeInTheDocument();
    expect(within(execution).getByRole("heading", { name: "Scalable Data" })).toBeInTheDocument();
    expect(within(execution).getByRole("heading", { name: "Reliable Operations" })).toBeInTheDocument();

    const cta = screen.getByTestId("neardrop-case-study-bottom-cta");
    expect(cta.querySelector(".neardrop-case-study-bottom-cta-panel")).toBeTruthy();
    expect(within(cta).getByRole("heading", { name: NEARDROP_CASE_STUDY_COPY.bottomCta.title })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /Discuss Your Project/i })).toHaveAttribute("href", ROUTES.contact);
    expect(screen.getByRole("link", { name: "View Portfolio" })).toHaveAttribute("href", ROUTES.caseStudies);
  });
});
