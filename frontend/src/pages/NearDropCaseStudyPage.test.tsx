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
        name: `${NEARDROP_CASE_STUDY_COPY.titleLead}${NEARDROP_CASE_STUDY_COPY.titleAccent} ${NEARDROP_CASE_STUDY_COPY.titleTrail}`,
      }),
    ).toBeInTheDocument();
    expect(screen.getByText(NEARDROP_CASE_STUDY_COPY.description)).toBeInTheDocument();

    const intro = screen.getByTestId("neardrop-case-study-intro");
    expect(intro).toHaveClass("neardrop-case-study-intro");
    expect(intro.querySelector(".neardrop-case-study-kicker-dot")).toBeTruthy();
    expect(intro.querySelector(".neardrop-case-study-title-accent")).toHaveTextContent(
      NEARDROP_CASE_STUDY_COPY.titleAccent,
    );

    const stack = within(intro).getByTestId("neardrop-case-study-intro-stack");
    expect(within(stack).getByText("FRONTEND")).toBeInTheDocument();
    expect(within(stack).getByText("DATABASE")).toBeInTheDocument();
    expect(within(stack).getByText("BACKEND")).toBeInTheDocument();
    expect(within(stack).getByText("REALTIME")).toBeInTheDocument();
    expect(within(stack).getByText("React / Next.js")).toBeInTheDocument();
    expect(within(stack).getByText("PostgreSQL")).toBeInTheDocument();
    expect(within(stack).getByText("Node.js")).toBeInTheDocument();
    expect(within(stack).getByText("WebSockets")).toBeInTheDocument();
    expect(stack.querySelectorAll(".neardrop-case-study-intro-stack-item")).toHaveLength(4);
    expect(screen.queryByTestId("neardrop-case-study-core-stack")).not.toBeInTheDocument();
    expect(screen.queryByRole("heading", { name: "CORE STACK" })).not.toBeInTheDocument();

    const functionalExcellence = screen.getByTestId("neardrop-case-study-functional-excellence");
    expect(intro.compareDocumentPosition(functionalExcellence) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy();
    expect(screen.queryByTestId("neardrop-case-study-hero")).not.toBeInTheDocument();
    expect(
      within(functionalExcellence).getByRole("heading", {
        name: NEARDROP_CASE_STUDY_COPY.functionalExcellence.heading,
      }),
    ).toBeInTheDocument();
    expect(within(functionalExcellence).getByText(NEARDROP_CASE_STUDY_COPY.functionalExcellence.countLabel)).toBeInTheDocument();
    expect(within(functionalExcellence).getByText(/Strategic features designed/i)).toBeInTheDocument();
    expect(functionalExcellence.querySelector(".neardrop-case-study-feature-card--highlight")).toBeTruthy();
    expect(within(functionalExcellence).getByRole("heading", { name: "Role-Isolated Portals" })).toBeInTheDocument();
    expect(within(functionalExcellence).getByRole("heading", { name: "Real-time Tracking" })).toBeInTheDocument();
    expect(within(functionalExcellence).getByRole("heading", { name: "Normalized Schema" })).toBeInTheDocument();
    expect(within(functionalExcellence).getByRole("heading", { name: "Driver-Merchant Coordination" })).toBeInTheDocument();
    expect(within(functionalExcellence).getByText(/Sub-second WebSocket updates/i)).toBeInTheDocument();
    expect(screen.queryByRole("heading", { name: "Key Features" })).not.toBeInTheDocument();
    expect(within(functionalExcellence).queryByText("01")).not.toBeInTheDocument();

    const execution = screen.getByTestId("neardrop-case-study-execution");
    expect(functionalExcellence.compareDocumentPosition(execution) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy();
    expect(execution.querySelector(".neardrop-case-study-execution-layout")).toBeTruthy();
    expect(within(execution).getByText("PROCESS")).toBeInTheDocument();
    expect(within(execution).getByRole("heading", { name: "The Precision Execution." })).toBeInTheDocument();
    expect(within(execution).getByText(/performant cloud-native ecosystem/i)).toBeInTheDocument();
    expect(screen.queryByRole("heading", { name: "The Execution" })).not.toBeInTheDocument();
    expect(within(execution).getByRole("heading", { name: "Architectural Integrity" })).toBeInTheDocument();
    expect(within(execution).getByRole("heading", { name: "Dedicated Portal Surfaces" })).toBeInTheDocument();
    expect(within(execution).getByRole("heading", { name: "Security First" })).toBeInTheDocument();
    expect(within(execution).getByText(/high-concurrency real-time location writes/i)).toBeInTheDocument();
    expect(within(execution).getByText(/Multi-factor authentication/i)).toBeInTheDocument();

    const cta = screen.getByTestId("neardrop-case-study-bottom-cta");
    expect(cta.querySelector(".neardrop-case-study-bottom-cta-panel")).toBeTruthy();
    expect(
      within(cta).getByRole("heading", { name: NEARDROP_CASE_STUDY_COPY.bottomCta.title }),
    ).toBeInTheDocument();
    expect(within(cta).getByText(/We specialize in high-performance cloud-native systems/i)).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Discuss Your Cloud Platform" })).toHaveAttribute(
      "href",
      ROUTES.contact,
    );
    expect(screen.getByRole("link", { name: "View Portfolio" })).toHaveAttribute("href", ROUTES.caseStudies);
  });
});
