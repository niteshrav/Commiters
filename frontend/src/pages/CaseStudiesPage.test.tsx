import { render, screen, within } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import CaseStudiesPage from "./CaseStudiesPage";
import { CASE_STUDIES_PAGE_COPY, CASE_STUDY_PROJECTS } from "../lib/caseStudiesPageContent";
import { CASE_STUDY_IMAGE_ASSETS } from "../lib/caseStudiesPageAssets";
import { ROUTES } from "../lib/routes";

describe("CaseStudiesPage", () => {
  it("renders the OUR WORK intro, six problem-solution project cards, and bottom CTAs", () => {
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
    expect(cards).toHaveLength(6);
    expect(cards[0]).toHaveClass("case-study-card--grid-wide", "case-study-card--horizontal", "case-study-card--showcase");
    expect(cards[1]).toHaveClass("case-study-card--grid-narrow", "case-study-card--stacked");
    expect(cards[3]).toHaveClass("case-study-card--grid-wide", "case-study-card--horizontal");

    for (const asset of CASE_STUDY_IMAGE_ASSETS) {
      const card = cards.find((entry) => entry.getAttribute("data-case-study-id") === asset.id);
      expect(card).toBeDefined();
      const image = within(card!).getByRole("img", { name: asset.alt });
      expect(image).toHaveAttribute("src", asset.src);
      if (asset.srcSet) {
        expect(image).toHaveAttribute("srcset", expect.stringContaining("@2x.png"));
      }
    }

    expect(screen.getAllByRole("img")).toHaveLength(6);

    for (const project of CASE_STUDY_PROJECTS) {
      expect(screen.getByRole("heading", { name: project.title })).toBeInTheDocument();
      expect(screen.getByText(project.problem)).toBeInTheDocument();
      expect(screen.getByText(project.solution)).toBeInTheDocument();
    }

    const detailLinks = screen.getAllByRole("link", { name: /View Project Details/i });
    expect(detailLinks).toHaveLength(5);

    const commitersCard = cards[0];
    expect(within(commitersCard).getByRole("link", { name: /View Project Details/i })).toHaveAttribute(
      "href",
      ROUTES.commitersCaseStudy,
    );

    const aiSummarizerCard = cards[1];
    expect(within(aiSummarizerCard).getByRole("link", { name: /View Project Details/i })).toHaveAttribute(
      "href",
      ROUTES.aiSummarizerCaseStudy,
    );

    const neardropCard = cards[3];
    expect(within(neardropCard).getByRole("link", { name: /View Project Details/i })).toHaveAttribute(
      "href",
      ROUTES.neardropCaseStudy,
    );

    const bmvCard = cards[4];
    expect(within(bmvCard).getByRole("link", { name: /View Project Details/i })).toHaveAttribute(
      "href",
      ROUTES.browseMyVacationCaseStudy,
    );

    const trustTapCard = cards[5];
    expect(within(trustTapCard).getByRole("link", { name: /View Product/i })).toHaveAttribute("href", ROUTES.trustTap);

    expect(screen.getByRole("link", { name: CASE_STUDIES_PAGE_COPY.bottomCta.primaryLabel })).toHaveAttribute(
      "href",
      ROUTES.contact,
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
