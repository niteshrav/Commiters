import { NEARDROP_CASE_STUDY_COPY } from "../lib/neardropCaseStudyContent";
import {
  NEARDROP_CASE_STUDY_EXECUTION_COPY_CLASS,
  NEARDROP_CASE_STUDY_EXECUTION_DESCRIPTION_CLASS,
  NEARDROP_CASE_STUDY_EXECUTION_HEADING_CLASS,
  NEARDROP_CASE_STUDY_EXECUTION_ITEM_BODY_CLASS,
  NEARDROP_CASE_STUDY_EXECUTION_ITEM_CLASS,
  NEARDROP_CASE_STUDY_EXECUTION_ITEM_TITLE_CLASS,
  NEARDROP_CASE_STUDY_EXECUTION_KICKER_CLASS,
  NEARDROP_CASE_STUDY_EXECUTION_LAYOUT_CLASS,
  NEARDROP_CASE_STUDY_EXECUTION_LIST_CLASS,
  NEARDROP_CASE_STUDY_EXECUTION_NUMBER_CLASS,
  NEARDROP_CASE_STUDY_EXECUTION_SECTION_CLASS,
} from "../lib/neardropCaseStudyLayout";

export default function NearDropCaseStudyExecutionSection() {
  const { execution } = NEARDROP_CASE_STUDY_COPY;

  return (
    <section
      className={`${NEARDROP_CASE_STUDY_EXECUTION_SECTION_CLASS} band-breakout reveal-on-scroll`}
      data-testid="neardrop-case-study-execution"
      aria-labelledby="neardrop-case-study-execution-title"
    >
      <div className={NEARDROP_CASE_STUDY_EXECUTION_LAYOUT_CLASS}>
        <div className={NEARDROP_CASE_STUDY_EXECUTION_COPY_CLASS}>
          <p className={NEARDROP_CASE_STUDY_EXECUTION_KICKER_CLASS}>{execution.kicker}</p>
          <h2 id="neardrop-case-study-execution-title" className={NEARDROP_CASE_STUDY_EXECUTION_HEADING_CLASS}>
            {execution.heading}
          </h2>
          <p className={NEARDROP_CASE_STUDY_EXECUTION_DESCRIPTION_CLASS}>{execution.description}</p>
        </div>
        <ol className={NEARDROP_CASE_STUDY_EXECUTION_LIST_CLASS} data-testid="neardrop-case-study-execution-list">
          {execution.items.map((item) => (
            <li key={item.id} className={NEARDROP_CASE_STUDY_EXECUTION_ITEM_CLASS}>
              <span className={NEARDROP_CASE_STUDY_EXECUTION_NUMBER_CLASS} aria-hidden>
                {item.number}
              </span>
              <div>
                <h3 className={NEARDROP_CASE_STUDY_EXECUTION_ITEM_TITLE_CLASS}>{item.title}</h3>
                <p className={NEARDROP_CASE_STUDY_EXECUTION_ITEM_BODY_CLASS}>{item.body}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
