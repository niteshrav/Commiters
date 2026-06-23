import { AI_SUMMARIZER_CASE_STUDY_COPY } from "../lib/aiSummarizerCaseStudyContent";
import {
  AI_SUMMARIZER_CASE_STUDY_EXECUTION_HEADING_CLASS,
  AI_SUMMARIZER_CASE_STUDY_EXECUTION_ICON_CLASS,
  AI_SUMMARIZER_CASE_STUDY_EXECUTION_ITEM_BODY_CLASS,
  AI_SUMMARIZER_CASE_STUDY_EXECUTION_ITEM_CLASS,
  AI_SUMMARIZER_CASE_STUDY_EXECUTION_ITEM_COPY_CLASS,
  AI_SUMMARIZER_CASE_STUDY_EXECUTION_ITEM_TITLE_CLASS,
  AI_SUMMARIZER_CASE_STUDY_EXECUTION_LIST_CLASS,
  AI_SUMMARIZER_CASE_STUDY_EXECUTION_SECTION_CLASS,
} from "../lib/aiSummarizerCaseStudyLayout";
import { IconCheckCircle } from "./icons";

export default function AiSummarizerCaseStudyExecutionSection() {
  const { execution } = AI_SUMMARIZER_CASE_STUDY_COPY;

  return (
    <section
      className={`${AI_SUMMARIZER_CASE_STUDY_EXECUTION_SECTION_CLASS} reveal-on-scroll`}
      data-testid="ai-summarizer-case-study-execution"
      aria-labelledby="ai-summarizer-case-study-execution-title"
    >
      <h2 id="ai-summarizer-case-study-execution-title" className={AI_SUMMARIZER_CASE_STUDY_EXECUTION_HEADING_CLASS}>
        {execution.heading}
      </h2>
      <ul className={AI_SUMMARIZER_CASE_STUDY_EXECUTION_LIST_CLASS}>
        {execution.items.map((item) => (
          <li key={item.id} className={AI_SUMMARIZER_CASE_STUDY_EXECUTION_ITEM_CLASS}>
            <span className={AI_SUMMARIZER_CASE_STUDY_EXECUTION_ICON_CLASS} aria-hidden>
              <IconCheckCircle width={24} height={24} />
            </span>
            <div className={AI_SUMMARIZER_CASE_STUDY_EXECUTION_ITEM_COPY_CLASS}>
              <h3 className={AI_SUMMARIZER_CASE_STUDY_EXECUTION_ITEM_TITLE_CLASS}>{item.title}</h3>
              <p className={AI_SUMMARIZER_CASE_STUDY_EXECUTION_ITEM_BODY_CLASS}>{item.body}</p>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
