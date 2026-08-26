import CaseStudyProjectCard from "./CaseStudyProjectCard";
import { useCaseStudyProjects } from "../lib/cms/hooks";
import { CASE_STUDIES_GRID_CLASS, CASE_STUDIES_GRID_SECTION_CLASS } from "../lib/caseStudiesPageLayout";

export default function CaseStudiesGridSection() {
  const projects = useCaseStudyProjects();

  return (
    <section className={CASE_STUDIES_GRID_SECTION_CLASS} data-testid="case-studies-grid-section">
      <div className={CASE_STUDIES_GRID_CLASS} data-testid="case-studies-grid">
        {projects.map((project) => (
          <CaseStudyProjectCard key={project.id} project={project} />
        ))}
      </div>
    </section>
  );
}
