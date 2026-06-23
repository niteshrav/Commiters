import { Link } from "react-router-dom";
import { NEARDROP_CASE_STUDY_COPY } from "../lib/neardropCaseStudyContent";
import {
  NEARDROP_CASE_STUDY_BOTTOM_CTA_ACTIONS_CLASS,
  NEARDROP_CASE_STUDY_BOTTOM_CTA_BTN_CLASS,
  NEARDROP_CASE_STUDY_BOTTOM_CTA_INNER_CLASS,
  NEARDROP_CASE_STUDY_BOTTOM_CTA_PANEL_CLASS,
  NEARDROP_CASE_STUDY_BOTTOM_CTA_PRIMARY_CLASS,
  NEARDROP_CASE_STUDY_BOTTOM_CTA_SECONDARY_CLASS,
  NEARDROP_CASE_STUDY_BOTTOM_CTA_SECTION_CLASS,
  NEARDROP_CASE_STUDY_BOTTOM_CTA_SUBTEXT_CLASS,
  NEARDROP_CASE_STUDY_BOTTOM_CTA_TITLE_CLASS,
} from "../lib/neardropCaseStudyLayout";

export default function NearDropCaseStudyBottomCta() {
  const { bottomCta } = NEARDROP_CASE_STUDY_COPY;

  return (
    <section
      className={`${NEARDROP_CASE_STUDY_BOTTOM_CTA_SECTION_CLASS} reveal-on-scroll`}
      data-testid="neardrop-case-study-bottom-cta"
      aria-labelledby="neardrop-case-study-bottom-cta-title"
    >
      <div className={NEARDROP_CASE_STUDY_BOTTOM_CTA_PANEL_CLASS}>
        <div className={NEARDROP_CASE_STUDY_BOTTOM_CTA_INNER_CLASS}>
          <h2 id="neardrop-case-study-bottom-cta-title" className={NEARDROP_CASE_STUDY_BOTTOM_CTA_TITLE_CLASS}>
            {bottomCta.title}
          </h2>
          <p className={NEARDROP_CASE_STUDY_BOTTOM_CTA_SUBTEXT_CLASS}>{bottomCta.subtext}</p>
          <div className={NEARDROP_CASE_STUDY_BOTTOM_CTA_ACTIONS_CLASS}>
            <a
              className={`${NEARDROP_CASE_STUDY_BOTTOM_CTA_BTN_CLASS} ${NEARDROP_CASE_STUDY_BOTTOM_CTA_PRIMARY_CLASS}`}
              href={bottomCta.primaryHref}
              target="_blank"
              rel="noopener noreferrer"
            >
              {bottomCta.primaryLabel}
            </a>
            <Link
              className={`${NEARDROP_CASE_STUDY_BOTTOM_CTA_BTN_CLASS} ${NEARDROP_CASE_STUDY_BOTTOM_CTA_SECONDARY_CLASS}`}
              to={bottomCta.secondaryTo}
            >
              {bottomCta.secondaryLabel}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
