import { Link } from "react-router-dom";
import { CASE_STUDIES_PAGE_DESIGN, workPageBadge, workPageLiveHref, workPageTags } from "../lib/caseStudiesPageDesign";
import { COMMITERS_CASE_STUDY_COPY } from "../lib/commitersCaseStudyContent";
import { useCaseStudyProjects } from "../lib/cms/hooks";
import {
  caseStudyHasImage,
  caseStudyImageAlt,
  caseStudyImageSrc,
  caseStudyImageSrcSet,
} from "../lib/caseStudiesPageAssets";

export default function CaseStudiesFlagshipSection() {
  const projects = useCaseStudyProjects();
  const project = projects.find((entry) => entry.id === CASE_STUDIES_PAGE_DESIGN.flagship.projectId);
  if (!project) return null;

  const liveHref = workPageLiveHref(project.id);
  const tags = workPageTags(project, 4);

  return (
    <section className="work-flagship" data-testid="work-flagship" aria-labelledby="work-flagship-heading">
      <h2 id="work-flagship-heading" className="work-section-heading">
        {CASE_STUDIES_PAGE_DESIGN.flagship.heading}
      </h2>
      <div className="work-flagship-card">
        {caseStudyHasImage(project.id) ? (
          <div className="work-flagship-media">
            <img
              src={caseStudyImageSrc(project.id)}
              srcSet={caseStudyImageSrcSet(project.id)}
              alt={caseStudyImageAlt(project.id)}
              loading="lazy"
              decoding="async"
            />
          </div>
        ) : null}
        <div className="work-flagship-copy">
          <p className="case-study-category-badge">{workPageBadge(project)}</p>
          <h3 className="work-flagship-title">{project.title}</h3>
          <p className="work-card-blurb">{COMMITERS_CASE_STUDY_COPY.subtitle}</p>
          <ul className="work-flagship-features">
            {COMMITERS_CASE_STUDY_COPY.features.map((feature) => (
              <li key={feature.id}>
                <strong>{feature.title}</strong>
                <span>{feature.body}</span>
              </li>
            ))}
          </ul>
          <div className="work-flagship-tags">
            {tags.map((tag) => (
              <span key={tag} className="case-study-tag case-study-tag--cyan">
                {tag}
              </span>
            ))}
          </div>
          <div className="work-card-actions">
            <Link className="case-study-details-link" to={project.detailsHref}>
              {CASE_STUDIES_PAGE_DESIGN.detailsCta}
            </Link>
            {liveHref ? (
              <a className="work-card-live-link" href={liveHref} target="_blank" rel="noopener noreferrer">
                {CASE_STUDIES_PAGE_DESIGN.liveDemoCta}
              </a>
            ) : null}
          </div>
        </div>
      </div>
    </section>
  );
}
