import { COMMITERS_CASE_STUDY_COPY } from "../lib/commitersCaseStudyContent";
import {
  COMMITERS_CASE_STUDY_ARCHITECTURE_GRID_CLASS,
  COMMITERS_CASE_STUDY_ARCHITECTURE_HEADING_BLOCK_CLASS,
  COMMITERS_CASE_STUDY_ARCHITECTURE_HEADING_CLASS,
  COMMITERS_CASE_STUDY_ARCHITECTURE_ITEM_BODY_CLASS,
  COMMITERS_CASE_STUDY_ARCHITECTURE_ITEM_CLASS,
  COMMITERS_CASE_STUDY_ARCHITECTURE_ITEM_ICON_CLASS,
  COMMITERS_CASE_STUDY_ARCHITECTURE_ITEM_TITLE_CLASS,
  COMMITERS_CASE_STUDY_ARCHITECTURE_KICKER_CLASS,
  COMMITERS_CASE_STUDY_ARCHITECTURE_LIST_CLASS,
  COMMITERS_CASE_STUDY_ARCHITECTURE_SECTION_CLASS,
} from "../lib/commitersCaseStudyLayout";
import { ArchitectureItemIcon } from "./ArchitectureItemIcon";

export default function CommitersCaseStudyArchitectureSection() {
  const { architecture } = COMMITERS_CASE_STUDY_COPY;

  return (
    <section
      className={COMMITERS_CASE_STUDY_ARCHITECTURE_SECTION_CLASS}
      data-testid="commiters-case-study-architecture"
      aria-labelledby="commiters-case-study-architecture-title"
    >
      <div className={COMMITERS_CASE_STUDY_ARCHITECTURE_GRID_CLASS}>
        <div className={COMMITERS_CASE_STUDY_ARCHITECTURE_HEADING_BLOCK_CLASS}>
          <p className={COMMITERS_CASE_STUDY_ARCHITECTURE_KICKER_CLASS}>{architecture.kicker}</p>
          <h2 id="commiters-case-study-architecture-title" className={COMMITERS_CASE_STUDY_ARCHITECTURE_HEADING_CLASS}>
            {architecture.heading}
          </h2>
        </div>
        <div className={COMMITERS_CASE_STUDY_ARCHITECTURE_LIST_CLASS}>
          {architecture.sections.map((section) => (
            <article key={section.id} className={COMMITERS_CASE_STUDY_ARCHITECTURE_ITEM_CLASS}>
              <span className={COMMITERS_CASE_STUDY_ARCHITECTURE_ITEM_ICON_CLASS} aria-hidden>
                <ArchitectureItemIcon id={section.id} title={section.title} />
              </span>
              <div>
                <h3 className={COMMITERS_CASE_STUDY_ARCHITECTURE_ITEM_TITLE_CLASS}>{section.title}</h3>
                <p className={COMMITERS_CASE_STUDY_ARCHITECTURE_ITEM_BODY_CLASS}>{section.body}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
