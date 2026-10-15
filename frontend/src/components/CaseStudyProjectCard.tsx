import { Link } from "react-router-dom";
import type { CaseStudyProject, CaseStudyTagVariant } from "../lib/caseStudiesPageContent";
import {
  CASE_STUDIES_PAGE_DESIGN,
  workPageBadge,
  workPageBlurb,
  workPageLiveHref,
  workPageTags,
} from "../lib/caseStudiesPageDesign";
import { BRAND_CARD_HOVER_CLASSES, BRAND_TECH_BADGE_CLASSES } from "../lib/brandColorKit";
import {
  caseStudyHasImage,
  caseStudyImageAlt,
  caseStudyImageSizes,
  caseStudyImageSrc,
  caseStudyImageSrcSet,
} from "../lib/caseStudiesPageAssets";
import {
  CASE_STUDY_CARD_CLASS,
  CASE_STUDY_CARD_COPY_CLASS,
  CASE_STUDY_CARD_GRID_NARROW_CLASS,
  CASE_STUDY_CARD_GRID_WIDE_CLASS,
  CASE_STUDY_CARD_HORIZONTAL_CLASS,
  CASE_STUDY_CARD_NO_MEDIA_CLASS,
  CASE_STUDY_CARD_IMAGE_CLASS,
  CASE_STUDY_CARD_MEDIA_CLASS,
  CASE_STUDY_CARD_STACKED_CLASS,
  CASE_STUDY_CATEGORY_CLASS,
  CASE_STUDY_DETAILS_LINK_CLASS,
  CASE_STUDY_TAG_ACCENT_CLASS,
  CASE_STUDY_TAG_CLASS,
  CASE_STUDY_TAG_CYAN_CLASS,
  CASE_STUDY_TAG_OUTLINE_CLASS,
  CASE_STUDY_TAG_PILL_CLASS,
  CASE_STUDY_TITLE_CLASS,
} from "../lib/caseStudiesPageLayout";

type Props = {
  project: CaseStudyProject;
  presentation?: "featured" | "compact";
  reverse?: boolean;
  priority?: boolean;
};

function tagClass(variant: CaseStudyTagVariant = "pill"): string {
  if (variant === "outline") return `${CASE_STUDY_TAG_CLASS} ${CASE_STUDY_TAG_OUTLINE_CLASS}`;
  if (variant === "accent") return `${CASE_STUDY_TAG_CLASS} ${CASE_STUDY_TAG_ACCENT_CLASS}`;
  if (variant === "cyan") {
    return `${CASE_STUDY_TAG_CLASS} ${CASE_STUDY_TAG_CYAN_CLASS} ${BRAND_TECH_BADGE_CLASSES}`;
  }
  return `${CASE_STUDY_TAG_CLASS} ${CASE_STUDY_TAG_PILL_CLASS}`;
}

function CaseStudyTags({ project, limit }: Props & { limit: number }) {
  const tags = workPageTags(project, limit);
  if (!tags.length) return null;

  return (
    <div className="case-study-tag-row">
      {tags.map((tag) => (
        <span key={tag} className={tagClass(project.tagVariant)}>
          {tag}
        </span>
      ))}
    </div>
  );
}

function CaseStudyDetailsLink({ project }: Pick<Props, "project">) {
  const label = CASE_STUDIES_PAGE_DESIGN.detailsCta;

  if (project.external) {
    return (
      <a className={CASE_STUDY_DETAILS_LINK_CLASS} href={project.detailsHref} target="_blank" rel="noopener noreferrer">
        {label}
      </a>
    );
  }

  return (
    <Link className={CASE_STUDY_DETAILS_LINK_CLASS} to={project.detailsHref}>
      {label}
    </Link>
  );
}

function CaseStudyLiveLink({ projectId }: { projectId: string }) {
  const href = workPageLiveHref(projectId);
  if (!href) return null;

  return (
    <a className="work-card-live-link" href={href} target="_blank" rel="noopener noreferrer">
      {CASE_STUDIES_PAGE_DESIGN.liveDemoCta}
    </a>
  );
}

function CaseStudyMedia({
  project,
  layout,
  priority = false,
}: {
  project: CaseStudyProject;
  layout: CaseStudyProject["layout"];
  priority?: boolean;
}) {
  if (!caseStudyHasImage(project.id)) return null;

  const srcSet = caseStudyImageSrcSet(project.id);

  return (
    <div className={CASE_STUDY_CARD_MEDIA_CLASS} data-testid="case-study-card-media">
      <img
        className={CASE_STUDY_CARD_IMAGE_CLASS}
        src={caseStudyImageSrc(project.id)}
        srcSet={srcSet}
        sizes={caseStudyImageSizes(project.id, layout)}
        alt={caseStudyImageAlt(project.id)}
        loading={priority ? "eager" : "lazy"}
        decoding="async"
        fetchPriority={priority ? "high" : "auto"}
      />
    </div>
  );
}

function CaseStudyCopy({ project, tagLimit }: { project: CaseStudyProject; tagLimit: number }) {
  return (
    <div className={CASE_STUDY_CARD_COPY_CLASS}>
      <p className={CASE_STUDY_CATEGORY_CLASS}>{workPageBadge(project)}</p>
      <h3 className={CASE_STUDY_TITLE_CLASS}>{project.title}</h3>
      <p className="work-card-blurb">{workPageBlurb(project)}</p>
      <CaseStudyTags project={project} limit={tagLimit} />
      <div className="work-card-actions">
        <CaseStudyDetailsLink project={project} />
        <CaseStudyLiveLink projectId={project.id} />
      </div>
    </div>
  );
}

export default function CaseStudyProjectCard({
  project,
  presentation = "compact",
  reverse = false,
  priority = false,
}: Props) {
  const isFeatured = presentation === "featured";
  const gridClass = isFeatured ? CASE_STUDY_CARD_GRID_WIDE_CLASS : CASE_STUDY_CARD_GRID_NARROW_CLASS;
  const layoutClass = isFeatured ? CASE_STUDY_CARD_HORIZONTAL_CLASS : CASE_STUDY_CARD_STACKED_CLASS;
  const noMediaClass = caseStudyHasImage(project.id) ? "" : CASE_STUDY_CARD_NO_MEDIA_CLASS;
  const cardClassName = [
    CASE_STUDY_CARD_CLASS,
    gridClass,
    layoutClass,
    noMediaClass,
    isFeatured ? "work-featured-card" : "work-project-card",
    reverse ? "work-featured-card--reverse" : "",
    BRAND_CARD_HOVER_CLASSES,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <article className={cardClassName} data-testid="case-study-card" data-case-study-id={project.id}>
      {isFeatured && reverse ? (
        <>
          <CaseStudyCopy project={project} tagLimit={4} />
          <CaseStudyMedia project={project} layout="horizontal" priority={priority} />
        </>
      ) : isFeatured ? (
        <>
          <CaseStudyMedia project={project} layout="horizontal" priority={priority} />
          <CaseStudyCopy project={project} tagLimit={4} />
        </>
      ) : (
        <>
          <CaseStudyMedia project={project} layout="stacked" priority={priority} />
          <CaseStudyCopy project={project} tagLimit={3} />
        </>
      )}
    </article>
  );
}
