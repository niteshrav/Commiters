import { render, screen, within } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import CaseStudyProjectCard from "./CaseStudyProjectCard";
import { BRAND_CARD_HOVER_CLASSES, BRAND_TECH_BADGE_CLASSES } from "../lib/brandColorKit";
import { CASE_STUDY_PROJECTS } from "../lib/caseStudiesPageContent";
import { caseStudyImageAlt, caseStudyImageSrc } from "../lib/caseStudiesPageAssets";
import { WORK_PAGE_PROJECT_PRESENTATION } from "../lib/caseStudiesPageDesign";
import {
  CASE_STUDY_CARD_IMAGE_CLASS,
  CASE_STUDY_CARD_MEDIA_CLASS,
  CASE_STUDY_CARD_SHOWCASE_CLASS,
  CASE_STUDY_TAG_CYAN_CLASS,
} from "../lib/caseStudiesPageLayout";
import { ROUTES } from "../lib/routes";

describe("CaseStudyProjectCard", () => {
  it("renders the NearDrop compact card with a short blurb, photography, and case-study link", () => {
    const project = CASE_STUDY_PROJECTS.find((entry) => entry.id === "neardrop-mvp")!;

    render(
      <MemoryRouter>
        <CaseStudyProjectCard project={project} />
      </MemoryRouter>,
    );

    const card = screen.getByTestId("case-study-card");
    expect(card).toHaveClass("case-study-card--grid-narrow", "case-study-card--stacked", "work-project-card");
    expect(card).not.toHaveClass(CASE_STUDY_CARD_SHOWCASE_CLASS);
    expect(card.className).toContain(BRAND_CARD_HOVER_CLASSES);
    expect(card).toHaveAttribute("data-case-study-id", "neardrop-mvp");

    expect(screen.getByRole("heading", { name: project.title })).toBeInTheDocument();
    expect(screen.getByText(WORK_PAGE_PROJECT_PRESENTATION["neardrop-mvp"].blurb)).toBeInTheDocument();
    expect(screen.queryByText(/Problem:/i)).not.toBeInTheDocument();
    expect(screen.queryByText(project.problem)).not.toBeInTheDocument();
    expect(screen.getByText("Node.js")).toHaveClass(CASE_STUDY_TAG_CYAN_CLASS);
    expect(screen.getByText("Node.js").className).toContain(BRAND_TECH_BADGE_CLASSES);
    expect(screen.queryByText("Real-Time GPS Tracking")).not.toBeInTheDocument();

    const media = within(card).getByTestId("case-study-card-media");
    expect(media).toHaveClass(CASE_STUDY_CARD_MEDIA_CLASS);

    const image = within(media).getByRole("img", { name: caseStudyImageAlt("neardrop-mvp") });
    expect(image).toHaveClass(CASE_STUDY_CARD_IMAGE_CLASS);
    expect(image).toHaveAttribute("src", caseStudyImageSrc("neardrop-mvp"));

    expect(screen.getByRole("link", { name: /View Case Study/i })).toHaveAttribute("href", ROUTES.neardropCaseStudy);
  });

  it("renders the governed AI compact card without problem-solution copy", () => {
    const project = CASE_STUDY_PROJECTS.find((entry) => entry.id === "governed-ai")!;

    render(
      <MemoryRouter>
        <CaseStudyProjectCard project={project} />
      </MemoryRouter>,
    );

    const card = screen.getByTestId("case-study-card");
    expect(card).toHaveClass("case-study-card--grid-narrow", "case-study-card--stacked");
    expect(card).toHaveAttribute("data-case-study-id", "governed-ai");
    expect(screen.getByText("MCP")).toBeInTheDocument();
    expect(screen.getByText(WORK_PAGE_PROJECT_PRESENTATION["governed-ai"].blurb)).toBeInTheDocument();
    expect(screen.queryByText(project.problem)).not.toBeInTheDocument();
    expect(screen.queryByText("Zero Security Leaks")).not.toBeInTheDocument();

    const media = within(card).getByTestId("case-study-card-media");
    const image = within(media).getByRole("img", { name: caseStudyImageAlt("governed-ai") });
    expect(image).toHaveAttribute("src", caseStudyImageSrc("governed-ai"));
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
      expect(screen.getByText(WORK_PAGE_PROJECT_PRESENTATION[projectId].blurb)).toBeInTheDocument();
      expect(screen.queryByText(project.problem)).not.toBeInTheDocument();

      unmount();
    }
  });
});
