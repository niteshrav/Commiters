import { render, screen, within } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import CaseStudiesPage from "./CaseStudiesPage";
import { CASE_STUDIES_PAGE_COPY, CASE_STUDY_PROJECTS } from "../lib/caseStudiesPageContent";
import { CASE_STUDY_IMAGE_ASSETS } from "../lib/caseStudiesPageAssets";
import { ROUTES } from "../lib/routes";

describe("CaseStudiesPage", () => {
  it("renders the governed architecture intro, five case-study cards, and bottom CTAs", () => {
    render(
      <MemoryRouter>
        <CaseStudiesPage />
      </MemoryRouter>,
    );

    expect(screen.getByTestId("case-studies-page")).toBeInTheDocument();
    expect(screen.getByText(CASE_STUDIES_PAGE_COPY.intro.kicker)).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: CASE_STUDIES_PAGE_COPY.intro.title })).toBeInTheDocument();
    expect(screen.getByText(CASE_STUDIES_PAGE_COPY.intro.subtext)).toBeInTheDocument();

    const grid = screen.getByTestId("case-studies-grid");
    const cards = within(grid).getAllByTestId("case-study-card");
    expect(cards).toHaveLength(5);
    expect(cards[0]).toHaveClass("case-study-card--grid-narrow", "case-study-card--stacked");
    expect(cards[2]).toHaveClass("case-study-card--grid-wide", "case-study-card--horizontal");

    const gridAssets = CASE_STUDY_IMAGE_ASSETS.filter((asset) =>
      CASE_STUDY_PROJECTS.some((project) => project.id === asset.id),
    );
    for (const asset of gridAssets) {
      const card = cards.find((entry) => entry.getAttribute("data-case-study-id") === asset.id);
      expect(card).toBeDefined();
      const image = within(card!).getByRole("img", { name: asset.alt });
      expect(image).toHaveAttribute("src", asset.src);
      if (asset.srcSet) {
        expect(image).toHaveAttribute("srcset", expect.stringContaining("@2x.png"));
      }
    }

    expect(screen.getAllByRole("img")).toHaveLength(gridAssets.length);
    expect(screen.queryByText("OpsFlow AI — PDF Ingestion Engine")).not.toBeInTheDocument();

    for (const project of CASE_STUDY_PROJECTS) {
      expect(screen.getByRole("heading", { name: project.title })).toBeInTheDocument();
      expect(screen.getByText(project.problem)).toBeInTheDocument();
      expect(screen.getByText(project.solution)).toBeInTheDocument();
      for (const impact of project.impact ?? []) {
        expect(screen.getByText(impact)).toBeInTheDocument();
      }
    }

    const detailLinks = screen.getAllByRole("link", { name: /View Project Details/i });
    expect(detailLinks).toHaveLength(5);

    const governedAiCard = cards[0];
    expect(within(governedAiCard).getByRole("link", { name: /View Project Details/i })).toHaveAttribute(
      "href",
      ROUTES.aiSolutions,
    );

    const neardropCard = cards[2];
    expect(within(neardropCard).getByRole("link", { name: /View Project Details/i })).toHaveAttribute(
      "href",
      ROUTES.neardropCaseStudy,
    );

    const prospectIqCard = cards[3];
    expect(within(prospectIqCard).getByText("ENTERPRISE AI & WORKFLOW SYSTEM")).toBeInTheDocument();
    expect(within(prospectIqCard).getByRole("link", { name: /View Project Details/i })).toHaveAttribute(
      "href",
      ROUTES.prospectIqCaseStudy,
    );

    const ecoRouteCard = cards[4];
    expect(within(ecoRouteCard).getByText("SPEC-DRIVEN CLOUD PLATFORM")).toBeInTheDocument();
    expect(within(ecoRouteCard).getByRole("link", { name: /View Project Details/i })).toHaveAttribute(
      "href",
      ROUTES.ecoRouteCaseStudy,
    );

    expect(screen.queryByRole("link", { name: /View Product/i })).not.toBeInTheDocument();

    expect(screen.getByRole("link", { name: CASE_STUDIES_PAGE_COPY.bottomCta.primaryLabel })).toHaveAttribute(
      "href",
      ROUTES.aiOperationalAudit,
    );
    expect(screen.getByRole("link", { name: CASE_STUDIES_PAGE_COPY.bottomCta.secondaryLabel })).toHaveAttribute(
      "href",
      ROUTES.services,
    );

    const primaryBtn = screen.getByRole("link", { name: CASE_STUDIES_PAGE_COPY.bottomCta.primaryLabel });
    const secondaryBtn = screen.getByRole("link", { name: CASE_STUDIES_PAGE_COPY.bottomCta.secondaryLabel });
    expect(primaryBtn).toHaveClass("case-studies-bottom-cta-btn--primary", "btn", "btn-primary");
    expect(secondaryBtn).toHaveClass("case-studies-bottom-cta-btn--secondary", "btn", "btn-secondary");
  });
});
