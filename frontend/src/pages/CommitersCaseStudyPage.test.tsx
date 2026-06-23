import { render, screen, within } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { describe, expect, it } from "vitest";
import CommitersCaseStudyPage from "./CommitersCaseStudyPage";
import { COMMITERS_CASE_STUDY_COPY } from "../lib/commitersCaseStudyContent";
import { ROUTES } from "../lib/routes";
import { buildDiscoveryCallCalendarUrl } from "../lib/siteContact";

describe("CommitersCaseStudyPage", () => {
  it("renders the technical case study sections from the Stitch mockup", () => {
    render(
      <MemoryRouter>
        <CommitersCaseStudyPage />
      </MemoryRouter>,
    );

    const page = screen.getByTestId("commiters-case-study-page");
    expect(page).toBeInTheDocument();
    expect(page).toHaveClass("commiters-case-study-page");
    expect(screen.getByText(COMMITERS_CASE_STUDY_COPY.kicker)).toBeInTheDocument();
    expect(screen.getByRole("heading", { level: 1, name: COMMITERS_CASE_STUDY_COPY.title })).toBeInTheDocument();
    expect(screen.getByText(COMMITERS_CASE_STUDY_COPY.subtitle)).toBeInTheDocument();

    const intro = screen.getByTestId("commiters-case-study-intro");
    expect(intro).toHaveClass("commiters-case-study-intro");
    expect(intro.querySelector(".commiters-case-study-kicker")).toHaveTextContent(COMMITERS_CASE_STUDY_COPY.kicker);
    expect(intro.querySelector(".commiters-case-study-title")).toHaveTextContent(COMMITERS_CASE_STUDY_COPY.title);

    const overview = screen.getByTestId("commiters-case-study-overview");
    expect(within(overview).getByRole("heading", { name: "Project Overview" })).toBeInTheDocument();
    expect(within(overview).getByText(COMMITERS_CASE_STUDY_COPY.overview.body)).toBeInTheDocument();
    expect(within(overview).getByText(COMMITERS_CASE_STUDY_COPY.overview.objective.body)).toBeInTheDocument();
    expect(within(overview).getByText(COMMITERS_CASE_STUDY_COPY.overview.outcome.body)).toBeInTheDocument();
    expect(within(overview).getByText(/OBJECTIVE/i)).toBeInTheDocument();
    expect(within(overview).getByText(/OUTCOME/i)).toBeInTheDocument();

    const stack = screen.getByTestId("commiters-case-study-core-stack");
    expect(within(stack).getByRole("heading", { name: "CORE STACK" })).toBeInTheDocument();
    expect(within(stack).getByText("React 18")).toBeInTheDocument();
    expect(within(stack).getByText("Next.js")).toBeInTheDocument();
    expect(within(stack).getByText("PostgreSQL")).toBeInTheDocument();

    const objectiveCard = within(overview).getByText(/OBJECTIVE/i).closest("article");
    const outcomeCard = within(overview).getByText(/OUTCOME/i).closest("article");
    expect(objectiveCard).toHaveClass("commiters-case-study-highlight-card");
    expect(outcomeCard).toHaveClass("commiters-case-study-highlight-card");
    expect(stack).toHaveClass("commiters-case-study-core-stack");
    expect(stack.querySelectorAll(".commiters-case-study-core-stack-icon")).toHaveLength(3);

    expect(screen.queryByTestId("commiters-case-study-hero-image")).not.toBeInTheDocument();
    expect(screen.queryByRole("img", { name: /Commiters engineering stack/i })).not.toBeInTheDocument();

    const architecture = screen.getByTestId("commiters-case-study-architecture");
    expect(within(architecture).getByRole("heading", { name: "Technical Architecture" })).toBeInTheDocument();
    expect(within(architecture).getByRole("heading", { name: "Frontend Engineering" })).toBeInTheDocument();
    expect(within(architecture).getByRole("heading", { name: "Infrastructure & Backend" })).toBeInTheDocument();
    expect(within(architecture).getByRole("heading", { name: "SEO & Performance" })).toBeInTheDocument();
    expect(within(architecture).getByText(/zero-runtime CSS footprint/i)).toBeInTheDocument();
    expect(within(architecture).getByText(/TTFB \(Time to First Byte\)/i)).toBeInTheDocument();
    expect(within(architecture).getByText(/semantic HTML5 structure/i)).toBeInTheDocument();

    const bottomCta = screen.getByTestId("commiters-case-study-bottom-cta");
    expect(overview.compareDocumentPosition(architecture) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy();

    const features = screen.getByTestId("commiters-case-study-features");
    expect(within(features).getByRole("heading", { name: "High Performance" })).toBeInTheDocument();
    expect(within(features).getByRole("heading", { name: "SEO Optimization" })).toBeInTheDocument();
    expect(within(features).getByRole("heading", { name: "Minimalist UI" })).toBeInTheDocument();
    expect(within(features).getByText(/Sub-second page loads/i)).toBeInTheDocument();
    expect(within(features).getByText(/Automated metadata generation/i)).toBeInTheDocument();
    expect(within(features).getByText(/Void' principle/i)).toBeInTheDocument();
    expect(architecture.compareDocumentPosition(features) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy();
    expect(features.compareDocumentPosition(bottomCta) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy();

    expect(screen.getByRole("link", { name: COMMITERS_CASE_STUDY_COPY.bottomCta.primaryLabel })).toHaveAttribute(
      "href",
      buildDiscoveryCallCalendarUrl(),
    );
    expect(screen.getByRole("link", { name: COMMITERS_CASE_STUDY_COPY.bottomCta.secondaryLabel })).toHaveAttribute(
      "href",
      ROUTES.caseStudies,
    );
  });
});
