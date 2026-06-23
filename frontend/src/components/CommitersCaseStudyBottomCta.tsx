import { Link } from "react-router-dom";
import { COMMITERS_CASE_STUDY_COPY } from "../lib/commitersCaseStudyContent";
import {
  COMMITERS_CASE_STUDY_BOTTOM_CTA_ACTIONS_CLASS,
  COMMITERS_CASE_STUDY_BOTTOM_CTA_BTN_CLASS,
  COMMITERS_CASE_STUDY_BOTTOM_CTA_INNER_CLASS,
  COMMITERS_CASE_STUDY_BOTTOM_CTA_PRIMARY_CLASS,
  COMMITERS_CASE_STUDY_BOTTOM_CTA_SECONDARY_CLASS,
  COMMITERS_CASE_STUDY_BOTTOM_CTA_SECTION_CLASS,
  COMMITERS_CASE_STUDY_BOTTOM_CTA_SUBTEXT_CLASS,
  COMMITERS_CASE_STUDY_BOTTOM_CTA_TITLE_CLASS,
} from "../lib/commitersCaseStudyLayout";

export default function CommitersCaseStudyBottomCta() {
  const { bottomCta } = COMMITERS_CASE_STUDY_COPY;

  return (
    <section
      className={`${COMMITERS_CASE_STUDY_BOTTOM_CTA_SECTION_CLASS} reveal-on-scroll`}
      data-testid="commiters-case-study-bottom-cta"
      aria-labelledby="commiters-case-study-bottom-cta-title"
    >
      <div className={COMMITERS_CASE_STUDY_BOTTOM_CTA_INNER_CLASS}>
        <h2 id="commiters-case-study-bottom-cta-title" className={COMMITERS_CASE_STUDY_BOTTOM_CTA_TITLE_CLASS}>
          {bottomCta.title}
        </h2>
        <p className={COMMITERS_CASE_STUDY_BOTTOM_CTA_SUBTEXT_CLASS}>{bottomCta.subtext}</p>
        <div className={COMMITERS_CASE_STUDY_BOTTOM_CTA_ACTIONS_CLASS}>
          <a
            className={`${COMMITERS_CASE_STUDY_BOTTOM_CTA_BTN_CLASS} ${COMMITERS_CASE_STUDY_BOTTOM_CTA_PRIMARY_CLASS}`}
            href={bottomCta.primaryHref}
            target="_blank"
            rel="noopener noreferrer"
          >
            {bottomCta.primaryLabel}
          </a>
          <Link
            className={`${COMMITERS_CASE_STUDY_BOTTOM_CTA_BTN_CLASS} ${COMMITERS_CASE_STUDY_BOTTOM_CTA_SECONDARY_CLASS}`}
            to={bottomCta.secondaryTo}
          >
            {bottomCta.secondaryLabel}
          </Link>
        </div>
      </div>
    </section>
  );
}
