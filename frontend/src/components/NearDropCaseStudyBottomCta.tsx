import { Link } from "react-router-dom";
import { NEARDROP_CASE_STUDY_COPY } from "../lib/neardropCaseStudyContent";
import {
  NEARDROP_CASE_STUDY_BOTTOM_CTA_ACTIONS_CLASS,
  NEARDROP_CASE_STUDY_BOTTOM_CTA_BTN_CLASS,
  NEARDROP_CASE_STUDY_BOTTOM_CTA_COPY_CLASS,
  NEARDROP_CASE_STUDY_BOTTOM_CTA_INNER_CLASS,
  NEARDROP_CASE_STUDY_BOTTOM_CTA_KICKER_CLASS,
  NEARDROP_CASE_STUDY_BOTTOM_CTA_PANEL_CLASS,
  NEARDROP_CASE_STUDY_BOTTOM_CTA_PRIMARY_CLASS,
  NEARDROP_CASE_STUDY_BOTTOM_CTA_SECONDARY_CLASS,
  NEARDROP_CASE_STUDY_BOTTOM_CTA_SECTION_CLASS,
  NEARDROP_CASE_STUDY_BOTTOM_CTA_SUBTEXT_CLASS,
  NEARDROP_CASE_STUDY_BOTTOM_CTA_TITLE_CLASS,
  NEARDROP_CASE_STUDY_BOTTOM_CTA_VISUAL_CLASS,
} from "../lib/neardropCaseStudyLayout";
import { IconArrowRight, IconMapPin } from "./icons";

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
          <div className={NEARDROP_CASE_STUDY_BOTTOM_CTA_COPY_CLASS}>
            <p className={NEARDROP_CASE_STUDY_BOTTOM_CTA_KICKER_CLASS}>{bottomCta.kicker}</p>
            <h2 id="neardrop-case-study-bottom-cta-title" className={NEARDROP_CASE_STUDY_BOTTOM_CTA_TITLE_CLASS}>
              {bottomCta.title}
            </h2>
            <p className={NEARDROP_CASE_STUDY_BOTTOM_CTA_SUBTEXT_CLASS}>{bottomCta.subtext}</p>
            <div className={NEARDROP_CASE_STUDY_BOTTOM_CTA_ACTIONS_CLASS}>
              <Link
                className={`${NEARDROP_CASE_STUDY_BOTTOM_CTA_BTN_CLASS} ${NEARDROP_CASE_STUDY_BOTTOM_CTA_PRIMARY_CLASS}`}
                to={bottomCta.primaryTo}
              >
                {bottomCta.primaryLabel}
                <IconArrowRight width={16} height={16} />
              </Link>
              <Link
                className={`${NEARDROP_CASE_STUDY_BOTTOM_CTA_BTN_CLASS} ${NEARDROP_CASE_STUDY_BOTTOM_CTA_SECONDARY_CLASS}`}
                to={bottomCta.secondaryTo}
              >
                {bottomCta.secondaryLabel}
              </Link>
            </div>
          </div>
          <div className={NEARDROP_CASE_STUDY_BOTTOM_CTA_VISUAL_CLASS} aria-hidden>
            <IconMapPin width={88} height={88} />
          </div>
        </div>
      </div>
    </section>
  );
}
