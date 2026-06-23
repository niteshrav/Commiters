import { CASE_STUDIES_PAGE_COPY } from "../lib/caseStudiesPageContent";
import {
  CASE_STUDIES_INTRO_INNER_CLASS,
  CASE_STUDIES_INTRO_KICKER_CLASS,
  CASE_STUDIES_INTRO_SECTION_CLASS,
  CASE_STUDIES_INTRO_SUBTEXT_CLASS,
  CASE_STUDIES_INTRO_TITLE_CLASS,
} from "../lib/caseStudiesPageLayout";

export default function CaseStudiesIntroSection() {
  const { intro } = CASE_STUDIES_PAGE_COPY;

  return (
    <section
      className={`${CASE_STUDIES_INTRO_SECTION_CLASS} reveal-on-scroll`}
      data-testid="case-studies-intro-section"
      aria-labelledby="case-studies-intro-title"
    >
      <div className={CASE_STUDIES_INTRO_INNER_CLASS}>
        <p className={CASE_STUDIES_INTRO_KICKER_CLASS}>{intro.kicker}</p>
        <h1 id="case-studies-intro-title" className={CASE_STUDIES_INTRO_TITLE_CLASS}>
          {intro.title}
        </h1>
        <p className={CASE_STUDIES_INTRO_SUBTEXT_CLASS}>{intro.subtext}</p>
      </div>
    </section>
  );
}
