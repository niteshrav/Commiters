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
    expect(screen.getByText(NEXTSAAS_CASE_STUDY_COPY.kicker)).toBeInTheDocument();
    expect(screen.getByRole("heading", { level: 1, name: NEXTSAAS_CASE_STUDY_COPY.title })).toBeInTheDocument();
    expect(screen.getByText(NEXTSAAS_CASE_STUDY_COPY.description)).toBeInTheDocument();

    const intro = screen.getByTestId("nextsaas-case-study-intro");
    expect(intro).toHaveClass("nextsaas-case-study-intro");
    expect(intro.querySelector(".nextsaas-case-study-intro-shell")).toBeTruthy();
    expect(intro.querySelector(".nextsaas-case-study-intro-brand")).toBeNull();
    expect(within(intro).queryByRole("img", { name: COMMITERS_HEADER_LOGO_ALT })).not.toBeInTheDocument();
    expect(intro.querySelector(".nextsaas-case-study-kicker")).toHaveTextContent(NEXTSAAS_CASE_STUDY_COPY.kicker);
    expect(intro.querySelector(".nextsaas-case-study-title")).toHaveTextContent(NEXTSAAS_CASE_STUDY_COPY.title);

    const introScopePipelines = within(intro).getByTestId("nextsaas-case-study-intro-scope-pipelines");
    expect(introScopePipelines.querySelector(".nextsaas-case-study-scope-pipelines-grid")).toBeTruthy();
    expect(within(introScopePipelines).getByRole("heading", { name: "Scope" })).toBeInTheDocument();
    expect(within(introScopePipelines).getByText(NEXTSAAS_CASE_STUDY_COPY.scope.description)).toBeInTheDocument();
    expect(within(introScopePipelines).getByText("Unit Testing")).toBeInTheDocument();
    expect(within(introScopePipelines).getByText("Integration Tests")).toBeInTheDocument();
    expect(within(introScopePipelines).getByText("CI/CD Hooks")).toBeInTheDocument();
    expect(introScopePipelines.querySelector(".nextsaas-case-study-scope-card")).toBeTruthy();
    expect(introScopePipelines.querySelector(".nextsaas-case-study-scope-icon")).toBeTruthy();
    expect(introScopePipelines.querySelectorAll(".nextsaas-case-study-scope-indicator")).toHaveLength(3);
    expect(within(introScopePipelines).getByRole("heading", { name: "Automated Pipelines" })).toBeInTheDocument();
    expect(within(introScopePipelines).getByText(/99\.9% uptime validation/i)).toBeInTheDocument();
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
    expect(within(capabilities).getByText("CROSS-PLATFORM")).toBeInTheDocument();
    expect(within(capabilities).getByText("REGRESSION")).toBeInTheDocument();
    expect(within(capabilities).getByText("BENCHMARKING")).toBeInTheDocument();
    expect(within(capabilities).getByText(/12\+ device resolutions/i)).toBeInTheDocument();
    expect(within(capabilities).getByText(/legacy features remain intact/i)).toBeInTheDocument();
    expect(within(capabilities).getByText(/optimize TTI and server response times/i)).toBeInTheDocument();
    expect(capabilities.querySelectorAll(".nextsaas-case-study-capability-icon")).toHaveLength(3);

    const infrastructure = within(features).getByTestId("nextsaas-case-study-infrastructure");
    expect(capabilities.compareDocumentPosition(infrastructure) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy();
    expect(infrastructure).toHaveClass("band-breakout");
    expect(infrastructure.querySelector(".nextsaas-case-study-infrastructure-layout")).toBeTruthy();
    expect(within(infrastructure).getByRole("heading", { name: "Precision Infrastructure." })).toBeInTheDocument();
    expect(within(infrastructure).getByText("01")).toBeInTheDocument();
    expect(within(infrastructure).getByText("02")).toBeInTheDocument();
    expect(within(infrastructure).getByRole("heading", { name: "Unit Calibration" })).toBeInTheDocument();
    expect(within(infrastructure).getByRole("heading", { name: "Load Simulation" })).toBeInTheDocument();
    expect(within(infrastructure).getByText(/Rigorous stress testing to identify system limits/i)).toBeInTheDocument();
    expect(within(infrastructure).getByRole("img", { name: NEXTSAAS_CASE_STUDY_COPY.visualBreak.image.alt })).toHaveAttribute(
      "src",
      NEXTSAAS_CASE_STUDY_COPY.visualBreak.image.src,
    );
    expect(within(infrastructure).getByText("PASS RATE")).toBeInTheDocument();
    expect(within(infrastructure).getByText("99.8%")).toBeInTheDocument();
    expect(infrastructure.querySelector(".nextsaas-case-study-visual-break-badge")).toBeTruthy();
    expect(screen.queryByTestId("nextsaas-case-study-visual-break")).not.toBeInTheDocument();

    const cta = screen.getByTestId("nextsaas-case-study-bottom-cta");
    expect(infrastructure.compareDocumentPosition(cta) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy();
    expect(within(cta).getByRole("heading", { name: "Ready for Production." })).toBeInTheDocument();
    expect(within(cta).getByText(/450 technical audit checkpoints/i)).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Review Full Audit" })).toHaveAttribute("href", ROUTES.caseStudies);
    expect(screen.getByRole("link", { name: "Contact Engineer" })).toHaveAttribute("href", ROUTES.contact);
  });
});
