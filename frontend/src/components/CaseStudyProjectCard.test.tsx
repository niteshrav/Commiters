import { render, screen, within } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import CaseStudyProjectCard from "./CaseStudyProjectCard";
import { CASE_STUDY_PROJECTS } from "../lib/caseStudiesPageContent";
import { caseStudyImageAlt, caseStudyImageSrc } from "../lib/caseStudiesPageAssets";
import {
  CASE_STUDY_CARD_COPY_SHOWCASE_CLASS,
  CASE_STUDY_CARD_CTA_ROW_CLASS,
  CASE_STUDY_CARD_IMAGE_CLASS,
  CASE_STUDY_CARD_MEDIA_CLASS,
  CASE_STUDY_CARD_SHOWCASE_CLASS,
  CASE_STUDY_DETAILS_LINK_CLASS,
  CASE_STUDY_PROBLEM_SOLUTION_CLASS,
} from "../lib/caseStudiesPageLayout";
import { ROUTES } from "../lib/routes";

describe("CaseStudyProjectCard", () => {
  it("renders the Commiters card with equal inset media, problem-solution copy, and detail link", () => {
    const project = CASE_STUDY_PROJECTS[0];

    render(
      <MemoryRouter>
        <CaseStudyProjectCard project={project} />
      </MemoryRouter>,
    );

    const card = screen.getByTestId("case-study-card");
    expect(card).toHaveClass("case-study-card--grid-wide", "case-study-card--horizontal", CASE_STUDY_CARD_SHOWCASE_CLASS);
    expect(card).toHaveAttribute("data-case-study-id", "commiters");

    expect(screen.getByRole("heading", { name: "Commiters.com" })).toBeInTheDocument();
    expect(screen.getByText(/Problem:/i)).toBeInTheDocument();
    expect(screen.getByText(project.problem)).toBeInTheDocument();
    expect(screen.getByText(/Solution:/i)).toBeInTheDocument();
    expect(screen.getByText(project.solution)).toBeInTheDocument();
    expect(screen.getByText("Design Showcase")).toHaveClass("case-study-tag--pill");

    const copy = card.querySelector(`.${CASE_STUDY_CARD_COPY_SHOWCASE_CLASS}`) as HTMLElement;
    expect(copy).toBeTruthy();
    expect(copy.children[0]).toHaveClass("case-study-tag-row");
    expect(copy.children[1]).toHaveClass("case-study-card-title");
    expect(copy.querySelector(`.${CASE_STUDY_PROBLEM_SOLUTION_CLASS}`)).toBeTruthy();
    expect(copy.querySelector(`.${CASE_STUDY_DETAILS_LINK_CLASS}`)).toBeNull();

    const detailsLink = card.querySelector(`.${CASE_STUDY_CARD_CTA_ROW_CLASS}.${CASE_STUDY_DETAILS_LINK_CLASS}`) as HTMLElement;
    expect(detailsLink).toBeTruthy();
    expect(detailsLink.parentElement).toBe(card);

    const media = within(card).getByTestId("case-study-card-media");
    expect(media).toHaveClass(CASE_STUDY_CARD_MEDIA_CLASS, "case-study-card-media--showcase");

    const image = within(media).getByRole("img", { name: caseStudyImageAlt("commiters") });
    expect(image).toHaveClass(CASE_STUDY_CARD_IMAGE_CLASS);
    expect(image).toHaveAttribute("src", caseStudyImageSrc("commiters"));

    expect(screen.getByRole("link", { name: /View Project Details/i })).toHaveAttribute(
      "href",
      ROUTES.commitersCaseStudy,
    );
  });

  it("renders the AI Summarizer card with header tags, shorter image, and problem-solution copy", () => {
    const project = CASE_STUDY_PROJECTS[1];

    render(
      <MemoryRouter>
        <CaseStudyProjectCard project={project} />
      </MemoryRouter>,
    );

    const card = screen.getByTestId("case-study-card");
    expect(card).toHaveClass("case-study-card--grid-narrow", "case-study-card--stacked");
    expect(card).toHaveAttribute("data-case-study-id", "ai-summarizer");

    const copy = within(card).getByText("Python • Google ADK").closest(".case-study-card-copy") as HTMLElement;
    expect(copy).toBeTruthy();
    expect(copy.children[0]).toHaveClass("case-study-tag-row");
    expect(copy.children[1]).toHaveClass("case-study-card-title");
    expect(copy.querySelector(`.${CASE_STUDY_PROBLEM_SOLUTION_CLASS}`)).toBeTruthy();
    const media = within(card).getByTestId("case-study-card-media");
    expect(media).toHaveClass(CASE_STUDY_CARD_MEDIA_CLASS);
    expect(media).not.toHaveClass("case-study-card-media--showcase");
    expect(within(card).getByTestId("case-study-card-media").querySelector(".case-study-tag-row")).toBeNull();

    const image = within(media).getByRole("img", { name: caseStudyImageAlt("ai-summarizer") });
    expect(image).toHaveClass(CASE_STUDY_CARD_IMAGE_CLASS);
    expect(image).toHaveAttribute("src", caseStudyImageSrc("ai-summarizer"));
    expect(card.querySelector(`.${CASE_STUDY_PROBLEM_SOLUTION_CLASS}`)).toBeInTheDocument();
    expect(screen.getByText(project.problem)).toBeInTheDocument();
    expect(screen.getByText(project.solution)).toBeInTheDocument();
  });

  it("renders stacked portfolio cards with visible project photography", () => {
    for (const projectId of ["multi-role-crm", "nextsaas"] as const) {
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
