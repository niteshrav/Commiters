import { useMemo, useState } from "react";
import CaseStudyProjectCard from "./CaseStudyProjectCard";
import { IconCloud, IconLayers, IconRocket, IconShieldCheck } from "./icons";
import { useCaseStudyProjects } from "../lib/cms/hooks";
import {
  CASE_STUDIES_PAGE_DESIGN,
  WORK_PAGE_GRID_ORDER,
  workPageMatchesFilter,
  type WorkPageFilterId,
} from "../lib/caseStudiesPageDesign";
import {
  CASE_STUDIES_FEATURED_CLASS,
  CASE_STUDIES_GRID_CLASS,
  CASE_STUDIES_GRID_SECTION_CLASS,
} from "../lib/caseStudiesPageLayout";
import { asCompactWorkCard, asFeaturedWorkCard, splitWorkPageCaseStudies } from "../lib/caseStudiesWorkGridLayout";

const METRIC_ICONS = [IconLayers, IconCloud, IconRocket, IconShieldCheck] as const;

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

  const visibleCompact = useMemo(
    () => sortCompact(compact).filter((project) => workPageMatchesFilter(project.id, filter)),
    [compact, filter],
  );

  return (
    <section className={CASE_STUDIES_GRID_SECTION_CLASS} data-testid="case-studies-grid-section">
      <div className="case-studies-portfolio" data-testid="case-studies-grid">
        {featured.length ? (
          <div id="featured-case-studies" className="work-featured-block">
            <h2 className="work-section-heading">{CASE_STUDIES_PAGE_DESIGN.featured.heading}</h2>
            <div className={CASE_STUDIES_FEATURED_CLASS} data-testid="case-studies-featured">
              {featured.map((project, index) => (
                <CaseStudyProjectCard
                  key={project.id}
                  project={asFeaturedWorkCard(project)}
                  presentation="featured"
                  reverse={index % 2 === 1}
                />
              ))}
            </div>
          </div>
        ) : null}

        <div className="work-metrics" data-testid="work-metrics">
          {CASE_STUDIES_PAGE_DESIGN.metrics.map((metric, index) => {
            const Icon = METRIC_ICONS[index] ?? IconLayers;
            return (
              <div key={metric.label} className="work-metric">
                <Icon width={18} height={18} aria-hidden />
                <p className="work-metric-value">{metric.value}</p>
                <p className="work-metric-label">{metric.label}</p>
              </div>
            );
          })}
        </div>

        <div className="work-filters" data-testid="work-filters" role="tablist" aria-label="Project filters">
          {CASE_STUDIES_PAGE_DESIGN.filters.map((item) => (
            <button
              key={item.id}
              type="button"
              role="tab"
              className={`work-filter${filter === item.id ? " work-filter--active" : ""}`}
              aria-selected={filter === item.id}
              onClick={() => setFilter(item.id)}
            >
              {item.label}
            </button>
          ))}
        </div>

        <div className={CASE_STUDIES_GRID_CLASS} data-testid="case-studies-compact-grid">
          {visibleCompact.map((project) => (
            <CaseStudyProjectCard key={project.id} project={asCompactWorkCard(project)} presentation="compact" />
          ))}
        </div>
      </div>
    </section>
  );
}
