import { useCallback, useMemo, useState } from "react";
import CaseStudyProjectCard from "./CaseStudyProjectCard";
import { useCaseStudyProjects } from "../lib/cms/hooks";
import {
  CASE_STUDIES_PAGE_DESIGN,
  WORK_PAGE_GRID_ORDER,
  workPageFiltersWithProjects,
  workPageMatchesFilter,
  type WorkPageFilterId,
} from "../lib/caseStudiesPageDesign";
import {
  CASE_STUDIES_FEATURED_CLASS,
  CASE_STUDIES_GRID_CLASS,
  CASE_STUDIES_GRID_SECTION_CLASS,
} from "../lib/caseStudiesPageLayout";
import { asCompactWorkCard, asFeaturedWorkCard, splitWorkPageCaseStudies } from "../lib/caseStudiesWorkGridLayout";

function sortCompact<T extends { id: string }>(projects: T[]): T[] {
  return [...projects].sort((left, right) => {
    const leftIndex = (WORK_PAGE_GRID_ORDER as readonly string[]).indexOf(left.id);
    const rightIndex = (WORK_PAGE_GRID_ORDER as readonly string[]).indexOf(right.id);
    return (leftIndex === -1 ? 99 : leftIndex) - (rightIndex === -1 ? 99 : rightIndex);
  });
}

export default function CaseStudiesGridSection() {
  const projects = useCaseStudyProjects();
  const { featured, compact } = splitWorkPageCaseStudies(projects);
  const [filter, setFilter] = useState<WorkPageFilterId>("all");
  const [slide, setSlide] = useState(0);
  const slideCount = featured.length;

  const visibleFilters = useMemo(
    () => workPageFiltersWithProjects(projects.map((project) => project.id)),
    [projects],
  );

  const visibleCompact = useMemo(() => {
    const compactMatches = sortCompact(compact).filter((project) => workPageMatchesFilter(project.id, filter));
    if (filter === "all") return compactMatches;

    const featuredMatches = featured.filter((project) => workPageMatchesFilter(project.id, filter));
    return [...featuredMatches, ...compactMatches];
  }, [compact, featured, filter]);

  const goTo = useCallback(
    (next: number) => {
      if (!slideCount) return;
      setSlide(((next % slideCount) + slideCount) % slideCount);
    },
    [slideCount],
  );

  return (
    <section className={CASE_STUDIES_GRID_SECTION_CLASS} data-testid="case-studies-grid-section">
      <div className="case-studies-portfolio" data-testid="case-studies-grid">
        {featured.length ? (
          <div
            id="featured-case-studies"
            className="work-featured-block"
            role="region"
            aria-roledescription="carousel"
            aria-label={CASE_STUDIES_PAGE_DESIGN.featured.heading}
            tabIndex={0}
            onKeyDown={(event) => {
              if (event.key === "ArrowRight") {
                event.preventDefault();
                goTo(slide + 1);
              }
              if (event.key === "ArrowLeft") {
                event.preventDefault();
                goTo(slide - 1);
              }
            }}
          >
            <div className="work-featured-header">
              <div>
                <h2 className="work-section-heading">{CASE_STUDIES_PAGE_DESIGN.featured.heading}</h2>
                <p className="work-section-subtext">{CASE_STUDIES_PAGE_DESIGN.featured.subtext}</p>
              </div>
              {slideCount > 1 ? (
                <div className="work-featured-controls">
                  <button
                    type="button"
                    className="work-featured-nav"
                    aria-label="Previous featured project"
                    onClick={() => goTo(slide - 1)}
                  >
                    ‹
                  </button>
                  <button
                    type="button"
                    className="work-featured-nav"
                    aria-label="Next featured project"
                    onClick={() => goTo(slide + 1)}
                  >
                    ›
                  </button>
                </div>
              ) : null}
            </div>
            <p className="work-featured-status" aria-live="polite">
              {featured[slide]?.title} ({slide + 1} of {slideCount})
            </p>
            <div className={CASE_STUDIES_FEATURED_CLASS} data-testid="case-studies-featured">
              {featured.map((project, index) => (
                <div
                  key={project.id}
                  className={`work-featured-slide${index === slide ? " work-featured-slide--active" : ""}`}
                  hidden={index !== slide}
                >
                  <CaseStudyProjectCard
                    project={asFeaturedWorkCard(project)}
                    presentation="featured"
                    priority={index === 0}
                  />
                </div>
              ))}
            </div>
          </div>
        ) : null}

        <div className="work-grid-block">
          <h2 className="work-section-heading">{CASE_STUDIES_PAGE_DESIGN.grid.heading}</h2>
          <div className="work-filters" data-testid="work-filters" role="group" aria-label="Project filters">
            {visibleFilters.map((item) => (
              <button
                key={item.id}
                type="button"
                className={`work-filter${filter === item.id ? " work-filter--active" : ""}`}
                aria-pressed={filter === item.id}
                onClick={() => setFilter(item.id)}
              >
                {item.label}
              </button>
            ))}
          </div>

          {visibleCompact.length ? (
            <div className={CASE_STUDIES_GRID_CLASS} data-testid="case-studies-compact-grid">
              {visibleCompact.map((project) => (
                <CaseStudyProjectCard key={project.id} project={asCompactWorkCard(project)} presentation="compact" />
              ))}
            </div>
          ) : (
            <p className="work-grid-empty" data-testid="work-grid-empty">
              {CASE_STUDIES_PAGE_DESIGN.grid.empty}
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
