import { render, screen, within } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { describe, expect, it } from "vitest";
import NextSaasCaseStudyPage from "./NextSaasCaseStudyPage";
import { NEXTSAAS_CASE_STUDY_COPY } from "../lib/nextsaasCaseStudyContent";
import { ROUTES } from "../lib/routes";
import { COMMITERS_HEADER_LOGO_ALT } from "../lib/siteBrand";

describe("NextSaasCaseStudyPage", () => {
  it("renders the QA deep-dive sections from the Stitch mockup", () => {
    render(
      <MemoryRouter>
        <NextSaasCaseStudyPage />
      </MemoryRouter>,
    );

    const page = screen.getByTestId("nextsaas-case-study-page");
    expect(page).toBeInTheDocument();
    expect(page).toHaveClass("nextsaas-case-study-page");
    expect(page).toHaveClass("browse-my-vacation-case-study-page");
    expect(screen.getByText(NEXTSAAS_CASE_STUDY_COPY.kicker)).toBeInTheDocument();
    expect(screen.getByRole("heading", { level: 1, name: NEXTSAAS_CASE_STUDY_COPY.title })).toBeInTheDocument();
    expect(screen.getByText(NEXTSAAS_CASE_STUDY_COPY.description)).toBeInTheDocument();

    const intro = screen.getByTestId("nextsaas-case-study-intro");
    expect(intro).toHaveClass("nextsaas-case-study-intro");
    expect(intro.querySelector(".nextsaas-case-study-intro-shell")).toBeTruthy();
    expect(intro.querySelector(".nextsaas-case-study-intro-brand")).toBeNull();
    expect(within(intro).queryByRole("img", { name: COMMITERS_HEADER_LOGO_ALT })).not.toBeInTheDocument();
    expect(intro.querySelector(".nextsaas-case-study-kicker")).toHaveTextContent(NEXTSAAS_CASE_STUDY_COPY.kicker);
    expect(intro.querySelector(".nextsaas-case-study-title")).toHaveTextContent(/BrowseMyVacation/i);
    expect(within(intro).getByTestId("nextsaas-case-study-metadata")).toBeInTheDocument();
    expect(within(intro).getByText("8 Weeks to Production")).toBeInTheDocument();
    expect(within(intro).getByText(/React, Next.js, Node.js, PostgreSQL/i)).toBeInTheDocument();

    const introScopePipelines = within(intro).getByTestId("nextsaas-case-study-intro-scope-pipelines");
    expect(introScopePipelines.querySelector(".nextsaas-case-study-scope-pipelines-grid")).toBeTruthy();
    expect(within(introScopePipelines).getByRole("heading", { name: "Product scope" })).toBeInTheDocument();
    expect(within(introScopePipelines).getByText(NEXTSAAS_CASE_STUDY_COPY.scope.description)).toBeInTheDocument();
    expect(within(introScopePipelines).getByText("Travel discovery UX")).toBeInTheDocument();
    expect(within(introScopePipelines).getByText("Booking & checkout")).toBeInTheDocument();
    expect(within(introScopePipelines).getByText("Performance at scale")).toBeInTheDocument();
    expect(introScopePipelines.querySelector(".nextsaas-case-study-scope-card")).toBeTruthy();
    expect(introScopePipelines.querySelector(".nextsaas-case-study-scope-icon")).toBeTruthy();
    expect(introScopePipelines.querySelectorAll(".nextsaas-case-study-scope-indicator")).toHaveLength(3);
    expect(within(introScopePipelines).getByRole("heading", { name: "Built for travelers" })).toBeInTheDocument();
    expect(within(introScopePipelines).getByText(/Responsive UI, resilient APIs/i)).toBeInTheDocument();
    expect(within(introScopePipelines).getByRole("img", { name: NEXTSAAS_CASE_STUDY_COPY.introHeroImage.alt })).toHaveAttribute(
      "src",
      NEXTSAAS_CASE_STUDY_COPY.introHeroImage.src,
    );
    const pipelinesLayout = introScopePipelines.querySelector(".nextsaas-case-study-pipelines-layout");
    expect(pipelinesLayout).toBeTruthy();
    const pipelinesCopy = pipelinesLayout?.querySelector(".nextsaas-case-study-pipelines-copy");
    const pipelinesMedia = pipelinesLayout?.querySelector(".nextsaas-case-study-pipelines-media");
    expect(pipelinesCopy).toBeTruthy();
    expect(pipelinesMedia).toBeTruthy();
    if (pipelinesCopy && pipelinesMedia) {
      expect(pipelinesCopy.compareDocumentPosition(pipelinesMedia) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy();
    }
    expect(introScopePipelines.querySelector(".nextsaas-case-study-pipelines-caption")).toBeNull();
    expect(introScopePipelines.querySelector(".nextsaas-case-study-pipelines-overlay")).toBeNull();
    expect(screen.queryByTestId("nextsaas-case-study-scope-pipelines")).not.toBeInTheDocument();

    const features = screen.getByTestId("nextsaas-case-study-features");
    expect(intro.compareDocumentPosition(features) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy();
    expect(features).toHaveClass("nextsaas-case-study-features");

    const capabilities = within(features).getByTestId("nextsaas-case-study-capabilities");
    expect(features.compareDocumentPosition(capabilities) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy();
    expect(within(capabilities).getByText("USER EXPERIENCE")).toBeInTheDocument();
    expect(within(capabilities).getByText("RELIABILITY")).toBeInTheDocument();
    expect(within(capabilities).getByText("PERFORMANCE")).toBeInTheDocument();
    expect(within(capabilities).getByText(/leisure travelers/i)).toBeInTheDocument();
    expect(within(capabilities).getByText(/proactive communication/i)).toBeInTheDocument();
    expect(within(capabilities).getByText(/discovery and checkout/i)).toBeInTheDocument();
    expect(capabilities.querySelectorAll(".nextsaas-case-study-capability-icon")).toHaveLength(3);

    const techStack = within(features).getByTestId("nextsaas-case-study-tech-stack");
    expect(capabilities.compareDocumentPosition(techStack) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy();
    expect(within(techStack).getByRole("heading", { name: "The Tech Stack" })).toBeInTheDocument();
    expect(within(techStack).getByRole("heading", { name: "React & Next.js" })).toBeInTheDocument();
    expect(within(techStack).getByRole("heading", { name: "Node.js APIs" })).toBeInTheDocument();
    expect(within(techStack).getByText("React 18")).toBeInTheDocument();

    const outcomes = within(features).getByTestId("nextsaas-case-study-outcomes");
    expect(techStack.compareDocumentPosition(outcomes) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy();
    expect(within(outcomes).getByRole("heading", { name: "What we delivered" })).toBeInTheDocument();
    expect(within(outcomes).getByText("Production-ready")).toBeInTheDocument();

    const infrastructure = within(features).getByTestId("nextsaas-case-study-infrastructure");
    expect(outcomes.compareDocumentPosition(infrastructure) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy();
    expect(infrastructure).toHaveClass("band-breakout");
    expect(infrastructure.querySelector(".nextsaas-case-study-infrastructure-layout")).toBeTruthy();
    expect(within(infrastructure).getByRole("heading", { name: "How we shipped it." })).toBeInTheDocument();
    expect(within(infrastructure).getByRole("heading", { name: "Product foundation" })).toBeInTheDocument();
    expect(within(infrastructure).getByRole("heading", { name: "Launch & iterate" })).toBeInTheDocument();
    expect(within(infrastructure).getByRole("heading", { name: "Production engineering" })).toBeInTheDocument();
    expect(within(infrastructure).getByText(/Shipped core booking paths/i)).toBeInTheDocument();
    expect(within(infrastructure).getByRole("img", { name: NEXTSAAS_CASE_STUDY_COPY.visualBreak.image.alt })).toHaveAttribute(
      "src",
      NEXTSAAS_CASE_STUDY_COPY.visualBreak.image.src,
    );
    expect(within(infrastructure).getByText("FOUNDER")).toBeInTheDocument();
    expect(within(infrastructure).getByText("Rahul K.")).toBeInTheDocument();
    expect(infrastructure.querySelector(".nextsaas-case-study-visual-break-badge")).toBeTruthy();
    expect(screen.queryByTestId("nextsaas-case-study-visual-break")).not.toBeInTheDocument();

    const cta = screen.getByTestId("nextsaas-case-study-bottom-cta");
    expect(infrastructure.compareDocumentPosition(cta) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy();
    expect(within(cta).getByRole("heading", { name: /Building a travel or marketplace product/i })).toBeInTheDocument();
    expect(within(cta).getByText(/BrowseMyVacation shows how Commiters partners/i)).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "View our work" })).toHaveAttribute("href", ROUTES.caseStudies);
    expect(screen.getByRole("link", { name: "Start a project" })).toHaveAttribute("href", ROUTES.contact);
  });
});
