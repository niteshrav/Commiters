import { fireEvent, render, screen, within } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import CaseStudiesPage from "./CaseStudiesPage";
import { allStaticWorkPageProjects, CASE_STUDY_PROJECTS } from "../lib/caseStudiesPageContent";
import { CASE_STUDY_IMAGE_ASSETS } from "../lib/caseStudiesPageAssets";
import { CASE_STUDIES_PAGE_DESIGN, WORK_PAGE_PROJECT_PRESENTATION } from "../lib/caseStudiesPageDesign";
import { ROUTES } from "../lib/routes";

const workProjects = allStaticWorkPageProjects();

describe("CaseStudiesPage", () => {
  it("renders the selected-work hero, featured studies, compact grid, and bottom CTA", () => {
    render(
      <MemoryRouter>
        <CaseStudiesPage />
      </MemoryRouter>,
    );

    expect(screen.getByTestId("case-studies-page")).toBeInTheDocument();
    expect(screen.getByText(CASE_STUDIES_PAGE_DESIGN.hero.kicker)).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Systems built for real operations." })).toBeInTheDocument();
    expect(screen.getByText(CASE_STUDIES_PAGE_DESIGN.hero.subtext)).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /Explore Case Studies/i })).toHaveAttribute("href", "#featured-case-studies");

    const grid = screen.getByTestId("case-studies-grid");
    const cards = within(grid).getAllByTestId("case-study-card");
    expect(cards).toHaveLength(workProjects.length);
    expect(cards[0]).toHaveAttribute("data-case-study-id", "commiters");
    expect(cards[0]).toHaveClass("case-study-card--grid-wide", "case-study-card--horizontal", "work-featured-card");
    expect(cards[1]).toHaveAttribute("data-case-study-id", "ai-summarizer");
    expect(cards[1]).toHaveClass("work-featured-card", "work-featured-card--reverse");
    expect(cards[2]).toHaveClass("case-study-card--grid-narrow", "case-study-card--stacked", "work-project-card");

    const gridAssets = CASE_STUDY_IMAGE_ASSETS.filter((asset) => workProjects.some((project) => project.id === asset.id));
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
    expect(screen.queryByText(/Problem:/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/Solution:/i)).not.toBeInTheDocument();

    for (const project of workProjects) {
      expect(screen.getByRole("heading", { name: project.title })).toBeInTheDocument();
      expect(screen.getByText(WORK_PAGE_PROJECT_PRESENTATION[project.id].blurb)).toBeInTheDocument();
      expect(screen.queryByText(project.problem)).not.toBeInTheDocument();
    }

    const detailLinks = screen.getAllByRole("link", { name: /View Case Study/i });
    expect(detailLinks).toHaveLength(workProjects.length);

    const byId = (id: string) => cards.find((card) => card.getAttribute("data-case-study-id") === id)!;

    expect(within(byId("governed-ai")).getByRole("link", { name: /View Case Study/i })).toHaveAttribute(
      "href",
      ROUTES.aiSolutions,
    );
    expect(within(byId("neardrop-mvp")).getByRole("link", { name: /View Case Study/i })).toHaveAttribute(
      "href",
      ROUTES.neardropCaseStudy,
    );
    expect(within(byId("prospectiq-ai")).getByRole("link", { name: /View Case Study/i })).toHaveAttribute(
      "href",
      ROUTES.prospectIqCaseStudy,
    );
    expect(within(byId("ecoroute-intelligence")).getByRole("link", { name: /View Case Study/i })).toHaveAttribute(
      "href",
      ROUTES.ecoRouteCaseStudy,
    );
    expect(within(byId("commiters")).getByRole("link", { name: /View Case Study/i })).toHaveAttribute(
      "href",
      ROUTES.commitersCaseStudy,
    );
    expect(within(byId("ai-summarizer")).getByRole("link", { name: /View Case Study/i })).toHaveAttribute(
      "href",
      ROUTES.aiSummarizerCaseStudy,
    );

    expect(screen.getAllByText("React").length).toBeGreaterThan(0);
    expect(screen.getByText("Cloud")).toBeInTheDocument();
    expect(screen.queryByRole("link", { name: /View Product/i })).not.toBeInTheDocument();
    expect(screen.queryByText(/coming soon/i)).not.toBeInTheDocument();

    expect(screen.getByRole("link", { name: CASE_STUDIES_PAGE_DESIGN.cta.primaryLabel })).toHaveAttribute(
      "href",
      ROUTES.contact,
    );
    expect(screen.queryByRole("link", { name: /Book Operational Audit/i })).not.toBeInTheDocument();

    const primaryBtn = screen.getByRole("link", { name: CASE_STUDIES_PAGE_DESIGN.cta.primaryLabel });
    expect(primaryBtn).toHaveClass("case-studies-bottom-cta-btn--primary", "btn", "btn-primary");
  });

  it("filters compact cards without removing featured case studies", () => {
    render(
      <MemoryRouter>
        <CaseStudiesPage />
      </MemoryRouter>,
    );

    fireEvent.click(screen.getByRole("tab", { name: "AI & Automation" }));

    const cards = screen.getAllByTestId("case-study-card");
    const ids = cards.map((card) => card.getAttribute("data-case-study-id"));
    expect(ids).toEqual(["commiters", "ai-summarizer", "multi-role-crm", "prospectiq-ai", "governed-ai"]);
    expect(ids).toContain(CASE_STUDY_PROJECTS[0].id);
  });
});
