import { AI_SUMMARIZER_CASE_STUDY_COPY } from "../lib/aiSummarizerCaseStudyContent";
import {
  AI_SUMMARIZER_CASE_STUDY_TECH_STACK_CELL_BODY_CLASS,
  AI_SUMMARIZER_CASE_STUDY_TECH_STACK_CELL_CLASS,
  AI_SUMMARIZER_CASE_STUDY_TECH_STACK_CELL_LABEL_CLASS,
  AI_SUMMARIZER_CASE_STUDY_TECH_STACK_CELL_TITLE_CLASS,
  AI_SUMMARIZER_CASE_STUDY_TECH_STACK_COPY_CLASS,
  AI_SUMMARIZER_CASE_STUDY_TECH_STACK_DESCRIPTION_CLASS,
  AI_SUMMARIZER_CASE_STUDY_TECH_STACK_GRID_CLASS,
  AI_SUMMARIZER_CASE_STUDY_TECH_STACK_HEADING_CLASS,
  AI_SUMMARIZER_CASE_STUDY_TECH_STACK_LAYOUT_CLASS,
  AI_SUMMARIZER_CASE_STUDY_TECH_STACK_SECTION_CLASS,
} from "../lib/aiSummarizerCaseStudyLayout";

export default function AiSummarizerCaseStudyTechStackSection() {
  const { techStack } = AI_SUMMARIZER_CASE_STUDY_COPY;

  return (
    <section
      className={`${AI_SUMMARIZER_CASE_STUDY_TECH_STACK_SECTION_CLASS} reveal-on-scroll`}
      data-testid="ai-summarizer-case-study-tech-stack"
      aria-labelledby="ai-summarizer-case-study-tech-stack-title"
    >
      <div className={AI_SUMMARIZER_CASE_STUDY_TECH_STACK_LAYOUT_CLASS}>
        <div className={AI_SUMMARIZER_CASE_STUDY_TECH_STACK_COPY_CLASS}>
          <h2 id="ai-summarizer-case-study-tech-stack-title" className={AI_SUMMARIZER_CASE_STUDY_TECH_STACK_HEADING_CLASS}>
            {techStack.heading}
          </h2>
          <p className={AI_SUMMARIZER_CASE_STUDY_TECH_STACK_DESCRIPTION_CLASS}>{techStack.description}</p>
        </div>
        <div className={AI_SUMMARIZER_CASE_STUDY_TECH_STACK_GRID_CLASS}>
          {techStack.items.map((item) => (
            <article key={item.id} className={AI_SUMMARIZER_CASE_STUDY_TECH_STACK_CELL_CLASS}>
              <p className={AI_SUMMARIZER_CASE_STUDY_TECH_STACK_CELL_LABEL_CLASS}>{item.label}</p>
              <h3 className={AI_SUMMARIZER_CASE_STUDY_TECH_STACK_CELL_TITLE_CLASS}>{item.title}</h3>
              <p className={AI_SUMMARIZER_CASE_STUDY_TECH_STACK_CELL_BODY_CLASS}>{item.body}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
