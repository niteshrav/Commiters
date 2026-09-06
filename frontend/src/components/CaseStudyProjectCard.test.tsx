import { render, screen, within } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import CaseStudyProjectCard from "./CaseStudyProjectCard";
import { BRAND_CARD_HOVER_CLASSES, BRAND_TECH_BADGE_CLASSES } from "../lib/brandColorKit";
import { CASE_STUDY_PROJECTS } from "../lib/caseStudiesPageContent";
import { caseStudyImageAlt, caseStudyImageSrc } from "../lib/caseStudiesPageAssets";
import {
  CASE_STUDY_CARD_IMAGE_CLASS,
  CASE_STUDY_CARD_MEDIA_CLASS,
  CASE_STUDY_CARD_SHOWCASE_CLASS,
  CASE_STUDY_PROBLEM_SOLUTION_CLASS,
  CASE_STUDY_TAG_CYAN_CLASS,
} from "../lib/caseStudiesPageLayout";
import { ROUTES } from "../lib/routes";

describe("CaseStudyProjectCard", () => {
  it("renders the NearDrop card with cyan tags, impact, photography, and detail link", () => {
    const project = CASE_STUDY_PROJECTS.find((entry) => entry.id === "neardrop-mvp")!;

    render(
      <MemoryRouter>
        <CaseStudyProjectCard project={project} />
      </MemoryRouter>,
    );

    const card = screen.getByTestId("case-study-card");
    expect(card).toHaveClass("case-study-card--grid-wide", "case-study-card--horizontal");
    expect(card).not.toHaveClass(CASE_STUDY_CARD_SHOWCASE_CLASS);
    expect(card.className).toContain(BRAND_CARD_HOVER_CLASSES);
    expect(card).toHaveAttribute("data-case-study-id", "neardrop-mvp");

    expect(screen.getByRole("heading", { name: project.title })).toBeInTheDocument();
    expect(screen.getByText(/Problem:/i)).toBeInTheDocument();
    expect(screen.getByText(project.problem)).toBeInTheDocument();
    expect(screen.getByText(/Solution:/i)).toBeInTheDocument();
    expect(screen.getByText(project.solution)).toBeInTheDocument();
    expect(screen.getByText("Node.js")).toHaveClass(CASE_STUDY_TAG_CYAN_CLASS);
    expect(screen.getByText("Node.js").className).toContain(BRAND_TECH_BADGE_CLASSES);
    expect(screen.getByText("Real-Time GPS Tracking")).toBeInTheDocument();

    const media = within(card).getByTestId("case-study-card-media");
    expect(media).toHaveClass(CASE_STUDY_CARD_MEDIA_CLASS);
    expect(media).not.toHaveClass("case-study-card-media--showcase");

    const image = within(media).getByRole("img", { name: caseStudyImageAlt("neardrop-mvp") });
    expect(image).toHaveClass(CASE_STUDY_CARD_IMAGE_CLASS);
    expect(image).toHaveAttribute("src", caseStudyImageSrc("neardrop-mvp"));

    expect(screen.getByRole("link", { name: /View Project Details/i })).toHaveAttribute("href", ROUTES.neardropCaseStudy);
  });

  it("renders the governed AI card with header tags, stacked media, and problem-solution copy", () => {
    const project = CASE_STUDY_PROJECTS.find((entry) => entry.id === "governed-ai")!;

    render(
      <MemoryRouter>
        <CaseStudyProjectCard project={project} />
      </MemoryRouter>,
    );

    const card = screen.getByTestId("case-study-card");
    expect(card).toHaveClass("case-study-card--grid-narrow", "case-study-card--stacked");
    expect(card).toHaveAttribute("data-case-study-id", "governed-ai");

    const copy = within(card).getByText("Model Context Protocol (MCP)").closest(".case-study-card-copy") as HTMLElement;
    expect(copy).toBeTruthy();
    expect(copy.children[0]).toHaveClass("case-study-tag-row");
    expect(copy.children[1]).toHaveClass("case-study-card-title");
    expect(copy.querySelector(`.${CASE_STUDY_PROBLEM_SOLUTION_CLASS}`)).toBeTruthy();
    const media = within(card).getByTestId("case-study-card-media");
    expect(media).toHaveClass(CASE_STUDY_CARD_MEDIA_CLASS);
    expect(media).not.toHaveClass("case-study-card-media--showcase");
    expect(within(card).getByTestId("case-study-card-media").querySelector(".case-study-tag-row")).toBeNull();

    const image = within(media).getByRole("img", { name: caseStudyImageAlt("governed-ai") });
    expect(image).toHaveClass(CASE_STUDY_CARD_IMAGE_CLASS);
    expect(image).toHaveAttribute("src", caseStudyImageSrc("governed-ai"));
    expect(card.querySelector(`.${CASE_STUDY_PROBLEM_SOLUTION_CLASS}`)).toBeInTheDocument();
    expect(screen.getByText(project.problem)).toBeInTheDocument();
    expect(screen.getByText(project.solution)).toBeInTheDocument();
    expect(screen.getByText("Zero Security Leaks")).toBeInTheDocument();
  });

  it("renders stacked portfolio cards with visible project photography", () => {
    for (const projectId of ["governed-ai", "commiters"] as const) {
      const project = CASE_STUDY_PROJECTS.find((entry) => entry.id === projectId)!;

      const { unmount } = render(
        <MemoryRouter>
          <CaseStudyProjectCard project={project} />
        </MemoryRouter>,
      );

      const card = screen.getByTestId("case-study-card");
      expect(card).toHaveAttribute("data-case-study-id", projectId);
      expect(screen.getByRole("img", { name: caseStudyImageAlt(projectId) })).toHaveAttribute(
        "src",
        caseStudyImageSrc(projectId),
      );
      expect(screen.getByText(project.problem)).toBeInTheDocument();
      expect(screen.getByText(project.solution)).toBeInTheDocument();

      unmount();
    }
  });
});
