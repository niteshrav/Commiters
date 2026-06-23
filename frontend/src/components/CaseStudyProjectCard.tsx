import { Link } from "react-router-dom";
import type { CaseStudyProject, CaseStudyTagVariant } from "../lib/caseStudiesPageContent";
import {
  caseStudyHasImage,
  caseStudyImageAlt,
  caseStudyImageSrc,
  caseStudyImageSrcSet,
} from "../lib/caseStudiesPageAssets";
import {
  CASE_STUDY_CARD_CLASS,
  CASE_STUDY_CARD_COPY_CLASS,
  CASE_STUDY_CARD_COPY_SHOWCASE_CLASS,
  CASE_STUDY_CARD_CTA_ROW_CLASS,
  CASE_STUDY_CARD_SHOWCASE_CLASS,
  CASE_STUDY_CARD_GRID_NARROW_CLASS,
  CASE_STUDY_CARD_GRID_WIDE_CLASS,
  CASE_STUDY_CARD_HORIZONTAL_CLASS,
  CASE_STUDY_CARD_NO_MEDIA_CLASS,
  CASE_STUDY_CARD_IMAGE_CLASS,
  CASE_STUDY_CARD_MEDIA_CLASS,
  CASE_STUDY_CARD_MEDIA_SHOWCASE_CLASS,
  CASE_STUDY_CARD_STACKED_CLASS,
  CASE_STUDY_DETAILS_LINK_CLASS,
  CASE_STUDY_PROBLEM_LABEL_CLASS,
  CASE_STUDY_PROBLEM_SOLUTION_CLASS,
  CASE_STUDY_SOLUTION_LABEL_CLASS,
  isShowcaseHorizontalCard,
  CASE_STUDY_TAG_ACCENT_CLASS,
  CASE_STUDY_TAG_CLASS,
  CASE_STUDY_TAG_OUTLINE_CLASS,
  CASE_STUDY_TAG_PILL_CLASS,
  CASE_STUDY_TITLE_CLASS,
} from "../lib/caseStudiesPageLayout";

type Props = { project: CaseStudyProject };

function tagClass(variant: CaseStudyTagVariant = "pill"): string {
  if (variant === "outline") return `${CASE_STUDY_TAG_CLASS} ${CASE_STUDY_TAG_OUTLINE_CLASS}`;
  if (variant === "accent") return `${CASE_STUDY_TAG_CLASS} ${CASE_STUDY_TAG_ACCENT_CLASS}`;
  return `${CASE_STUDY_TAG_CLASS} ${CASE_STUDY_TAG_PILL_CLASS}`;
}

function CaseStudyTags({ project }: Props) {
  if (project.tags.length === 0) return null;

  return (
    <div className="case-study-tag-row">
      {project.tags.map((tag) => (
        <span key={tag} className={tagClass(project.tagVariant)}>
          {tag}
        </span>
      ))}
    </div>
  );
}

function CaseStudyDetailsLink({
  project,
  className,
}: Props & {
  className?: string;
}) {
  const label = `${project.detailsLabel} →`;
  const linkClassName = [CASE_STUDY_DETAILS_LINK_CLASS, className].filter(Boolean).join(" ");

  if (project.external) {
    return (
      <a className={linkClassName} href={project.detailsHref} target="_blank" rel="noopener noreferrer">
        {label}
      </a>
    );
  }

  return (
    <Link className={linkClassName} to={project.detailsHref}>
      {label}
    </Link>
  );
}

function CaseStudyProblemSolution({ project }: Props) {
  return (
    <div className={CASE_STUDY_PROBLEM_SOLUTION_CLASS}>
      <p>
        <span className={CASE_STUDY_PROBLEM_LABEL_CLASS}>Problem:</span> {project.problem}
      </p>
      <p>
        <span className={CASE_STUDY_SOLUTION_LABEL_CLASS}>Solution:</span> {project.solution}
      </p>
    </div>
  );
}

function CaseStudyCopy({
  project,
  includeDetailsLink = true,
}: Props & {
  includeDetailsLink?: boolean;
}) {
  const copyClass = [
    CASE_STUDY_CARD_COPY_CLASS,
    isShowcaseHorizontalCard(project.id) ? CASE_STUDY_CARD_COPY_SHOWCASE_CLASS : "",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div className={copyClass}>
      <CaseStudyTags project={project} />
      <h3 className={CASE_STUDY_TITLE_CLASS}>{project.title}</h3>
      <CaseStudyProblemSolution project={project} />
      {includeDetailsLink ? <CaseStudyDetailsLink project={project} /> : null}
    </div>
  );
}

function CaseStudyMedia({ project }: Props) {
  if (!caseStudyHasImage(project.id)) return null;

  const mediaClass = [
    CASE_STUDY_CARD_MEDIA_CLASS,
    isShowcaseHorizontalCard(project.id) ? CASE_STUDY_CARD_MEDIA_SHOWCASE_CLASS : "",
  ]
    .filter(Boolean)
    .join(" ");

  const srcSet = caseStudyImageSrcSet(project.id);

  return (
    <div className={mediaClass} data-testid="case-study-card-media">
      <img
        className={CASE_STUDY_CARD_IMAGE_CLASS}
        src={caseStudyImageSrc(project.id)}
        srcSet={srcSet}
        sizes={project.layout === "horizontal" ? "280px" : "360px"}
        alt={caseStudyImageAlt(project.id)}
        loading="lazy"
        decoding="async"
      />
    </div>
  );
}

export default function CaseStudyProjectCard({ project }: Props) {
  const gridClass = project.gridSpan === "wide" ? CASE_STUDY_CARD_GRID_WIDE_CLASS : CASE_STUDY_CARD_GRID_NARROW_CLASS;
  const layoutClass = project.layout === "horizontal" ? CASE_STUDY_CARD_HORIZONTAL_CLASS : CASE_STUDY_CARD_STACKED_CLASS;
  const noMediaClass = caseStudyHasImage(project.id) ? "" : CASE_STUDY_CARD_NO_MEDIA_CLASS;
  const showcaseClass = isShowcaseHorizontalCard(project.id) ? CASE_STUDY_CARD_SHOWCASE_CLASS : "";
  const cardClassName = [CASE_STUDY_CARD_CLASS, gridClass, layoutClass, showcaseClass, noMediaClass]
    .filter(Boolean)
    .join(" ");

  if (project.layout === "stacked") {
    return (
      <article
        className={cardClassName}
        data-testid="case-study-card"
        data-case-study-id={project.id}
      >
        <CaseStudyMedia project={project} />
        <CaseStudyCopy project={project} />
      </article>
    );
  }

  if (isShowcaseHorizontalCard(project.id)) {
    return (
      <article className={cardClassName} data-testid="case-study-card" data-case-study-id={project.id}>
        <CaseStudyCopy project={project} includeDetailsLink={false} />
        <CaseStudyMedia project={project} />
        <CaseStudyDetailsLink project={project} className={CASE_STUDY_CARD_CTA_ROW_CLASS} />
      </article>
    );
  }

  return (
    <article className={cardClassName} data-testid="case-study-card" data-case-study-id={project.id}>
      <CaseStudyCopy project={project} />
      <CaseStudyMedia project={project} />
    </article>
  );
}
