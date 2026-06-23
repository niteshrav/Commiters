import CaseStudyProjectCard from "./CaseStudyProjectCard";
import { CASE_STUDY_PROJECTS } from "../lib/caseStudiesPageContent";
import { CASE_STUDIES_GRID_CLASS, CASE_STUDIES_GRID_SECTION_CLASS } from "../lib/caseStudiesPageLayout";

export default function CaseStudiesGridSection() {
  return (
    <section className={CASE_STUDIES_GRID_SECTION_CLASS} data-testid="case-studies-grid-section">
      <div className={CASE_STUDIES_GRID_CLASS} data-testid="case-studies-grid">
        {CASE_STUDY_PROJECTS.map((project) => (
          <CaseStudyProjectCard key={project.id} project={project} />
        ))}
      </div>
    </section>
  );
}
