import { COMMITERS_CASE_STUDY_COPY } from "../lib/commitersCaseStudyContent";
import {
  COMMITERS_CASE_STUDY_INTRO_INNER_CLASS,
  COMMITERS_CASE_STUDY_INTRO_SECTION_CLASS,
  COMMITERS_CASE_STUDY_KICKER_CLASS,
  COMMITERS_CASE_STUDY_SUBTITLE_CLASS,
  COMMITERS_CASE_STUDY_TITLE_CLASS,
} from "../lib/commitersCaseStudyLayout";

export default function CommitersCaseStudyIntroSection() {
  const { kicker, title, subtitle } = COMMITERS_CASE_STUDY_COPY;

  return (
    <section
      className={`${COMMITERS_CASE_STUDY_INTRO_SECTION_CLASS} reveal-on-scroll`}
      data-testid="commiters-case-study-intro"
      aria-labelledby="commiters-case-study-title"
    >
      <div className={COMMITERS_CASE_STUDY_INTRO_INNER_CLASS}>
        <p className={COMMITERS_CASE_STUDY_KICKER_CLASS}>{kicker}</p>
        <h1 id="commiters-case-study-title" className={COMMITERS_CASE_STUDY_TITLE_CLASS}>
          {title}
        </h1>
        <p className={COMMITERS_CASE_STUDY_SUBTITLE_CLASS}>{subtitle}</p>
      </div>
    </section>
  );
}
