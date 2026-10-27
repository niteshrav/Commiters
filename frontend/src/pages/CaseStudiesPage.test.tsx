import { fireEvent, render, screen, within } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import CaseStudiesPage from "./CaseStudiesPage";
import { allStaticWorkPageProjects } from "../lib/caseStudiesPageContent";
import { CASE_STUDY_IMAGE_ASSETS } from "../lib/caseStudiesPageAssets";
import { CASE_STUDIES_PAGE_DESIGN, WORK_PAGE_PROJECT_PRESENTATION } from "../lib/caseStudiesPageDesign";
import { BROWSE_MY_VACATION_LIVE_URL } from "../lib/browseMyVacationCaseStudyContent";
import { PROSPECTIQ_LIVE_URL } from "../lib/prospectIqCaseStudyContent";
import { SITE_ORIGIN } from "../hooks/usePageSeo";
import { AI_OPERATIONAL_AUDIT_BOOKING_HREF, ROUTES } from "../lib/routes";
const workProjects = allStaticWorkPageProjects();

describe("CaseStudiesPage", () => {
  it("renders the portfolio hero, featured slider, compact grid, and bottom CTA", () => {
    render(
      <MemoryRouter>
        <CaseStudiesPage />
      </MemoryRouter>,
    );

    expect(screen.getByTestId("case-studies-page")).toBeInTheDocument();
    expect(screen.getByText(CASE_STUDIES_PAGE_DESIGN.hero.kicker)).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Ideas to Real Impact." })).toBeInTheDocument();
    expect(screen.getByText(CASE_STUDIES_PAGE_DESIGN.hero.subtext)).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /Explore Case Studies/i })).toHaveAttribute("href", "#featured-case-studies");
    expect(screen.getByRole("link", { name: CASE_STUDIES_PAGE_DESIGN.hero.secondaryLabel })).toHaveAttribute(
      "href",
      CASE_STUDIES_PAGE_DESIGN.hero.secondaryTo,
    );
    expect(screen.getByRole("heading", { name: CASE_STUDIES_PAGE_DESIGN.featured.heading })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: CASE_STUDIES_PAGE_DESIGN.grid.heading })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "All Projects" })).toHaveAttribute("aria-pressed", "true");

    const grid = screen.getByTestId("case-studies-grid");
    const cards = within(grid).getAllByTestId("case-study-card");
    expect(cards).toHaveLength(workProjects.length);
    expect(cards[0]).toHaveAttribute("data-case-study-id", "commiters");
    expect(cards[0]).toHaveClass("case-study-card--grid-wide", "case-study-card--horizontal", "work-featured-card");
    expect(cards[1]).toHaveAttribute("data-case-study-id", "ai-summarizer");
    expect(cards[2]).toHaveAttribute("data-case-study-id", "browse-my-vacation");
    expect(cards[3]).toHaveClass("case-study-card--grid-narrow", "case-study-card--stacked", "work-project-card");

    const gridAssets = CASE_STUDY_IMAGE_ASSETS.filter((asset) => workProjects.some((project) => project.id === asset.id));
    for (const asset of gridAssets) {
      const card = cards.find((entry) => entry.getAttribute("data-case-study-id") === asset.id);
      expect(card).toBeDefined();
      const image = within(card!).getByRole("img", { name: asset.alt, hidden: true });
      expect(image).toHaveAttribute("src", asset.src);
    }

    expect(screen.queryByText("OpsFlow AI — PDF Ingestion Engine")).not.toBeInTheDocument();
    expect(screen.queryByText(/Problem:/i)).not.toBeInTheDocument();

    for (const project of workProjects) {
      expect(screen.getAllByText(WORK_PAGE_PROJECT_PRESENTATION[project.id].blurb).length).toBeGreaterThan(0);
      expect(screen.queryByText(project.problem)).not.toBeInTheDocument();
    }

    expect(screen.getAllByRole("link", { name: /View Case Study/i, hidden: true }).length).toBeGreaterThanOrEqual(
      workProjects.length,
    );

    const byId = (id: string) => cards.find((card) => card.getAttribute("data-case-study-id") === id)!;

    expect(within(byId("governed-ai")).getByRole("link", { name: /View Case Study/i })).toHaveAttribute(
      "href",
      ROUTES.aiSolutions,
    );
    expect(within(byId("neardrop-mvp")).getByRole("link", { name: /View Case Study/i })).toHaveAttribute(
      "href",
      ROUTES.neardropCaseStudy,
    );
    expect(within(byId("commiters")).getByRole("link", { name: /View Case Study/i })).toHaveAttribute(
      "href",
      ROUTES.commitersCaseStudy,
    );

    expect(within(byId("commiters")).getByRole("link", { name: /Live Demo/i })).toHaveAttribute("href", `${SITE_ORIGIN}/`);
    expect(within(byId("browse-my-vacation")).getByRole("link", { name: /Live Demo/i, hidden: true })).toHaveAttribute(
      "href",
      BROWSE_MY_VACATION_LIVE_URL,
    );
    expect(within(byId("prospectiq-ai")).getByRole("link", { name: /Live Demo/i, hidden: true })).toHaveAttribute(
      "href",
      PROSPECTIQ_LIVE_URL,
    );

    expect(screen.queryByTestId("work-flagship")).not.toBeInTheDocument();
    expect(screen.queryByRole("heading", { name: "Featured Case Study" })).not.toBeInTheDocument();
    expect(screen.queryByTestId("work-testimonials")).not.toBeInTheDocument();
    expect(screen.queryByRole("heading", { name: "What partners say" })).not.toBeInTheDocument();
    expect(screen.queryByText("Rahul Kumawat")).not.toBeInTheDocument();

    expect(screen.getByRole("link", { name: CASE_STUDIES_PAGE_DESIGN.cta.primaryLabel })).toHaveAttribute(
      "href",
      ROUTES.contact,
    );
    expect(screen.getByRole("link", { name: CASE_STUDIES_PAGE_DESIGN.cta.secondaryLabel })).toHaveAttribute(
      "href",
      AI_OPERATIONAL_AUDIT_BOOKING_HREF,
    );
  });

  it("advances the featured slider and filters compact cards", () => {
    render(
      <MemoryRouter>
        <CaseStudiesPage />
      </MemoryRouter>,
    );

    fireEvent.click(screen.getByRole("button", { name: "Next featured project" }));
    expect(screen.getByRole("heading", { name: "AI Summarizer" })).toBeInTheDocument();

    fireEvent.click(screen.getByRole("button", { name: "AI & Automation" }));
    expect(screen.getByRole("button", { name: "AI & Automation" })).toHaveAttribute("aria-pressed", "true");

    const compact = screen.getByTestId("case-studies-compact-grid");
    const compactIds = within(compact)
      .getAllByTestId("case-study-card")
      .map((card) => card.getAttribute("data-case-study-id"));
    expect(compactIds).toEqual(["ai-summarizer", "multi-role-crm", "prospectiq-ai", "ecoroute-intelligence", "governed-ai"]);

    fireEvent.click(screen.getByRole("button", { name: "Travel & Booking" }));
    expect(screen.getByRole("button", { name: "Travel & Booking" })).toHaveAttribute("aria-pressed", "true");
    expect(
      within(screen.getByTestId("case-studies-compact-grid"))
        .getAllByTestId("case-study-card")
        .map((card) => card.getAttribute("data-case-study-id")),
    ).toEqual(["browse-my-vacation"]);
    expect(within(screen.getByTestId("case-studies-compact-grid")).getByText("BrowseMyVacation")).toBeInTheDocument();

    fireEvent.click(screen.getByRole("button", { name: "SaaS Products" }));
    expect(
      within(screen.getByTestId("case-studies-compact-grid"))
        .getAllByTestId("case-study-card")
        .map((card) => card.getAttribute("data-case-study-id")),
    ).toEqual(["multi-role-crm", "neardrop-mvp"]);
    expect(within(screen.getByTestId("case-studies-compact-grid")).queryByText("BrowseMyVacation")).not.toBeInTheDocument();

    expect(screen.queryByRole("button", { name: "E-commerce" })).not.toBeInTheDocument();
    expect(screen.queryByRole("button", { name: "Restaurant Technology" })).not.toBeInTheDocument();

    fireEvent.click(screen.getByRole("button", { name: "All Projects" }));
    expect(screen.queryByTestId("work-grid-empty")).not.toBeInTheDocument();
    expect(within(screen.getByTestId("case-studies-compact-grid")).getAllByTestId("case-study-card")).toHaveLength(5);
  });
});
