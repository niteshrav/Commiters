import { Link } from "react-router-dom";
import { MULTI_ROLE_CRM_CASE_STUDY_COPY } from "../lib/multiRoleCrmCaseStudyContent";
import {
  MULTI_ROLE_CRM_CASE_STUDY_BOTTOM_CTA_BTN_CLASS,
  MULTI_ROLE_CRM_CASE_STUDY_BOTTOM_CTA_INNER_CLASS,
  MULTI_ROLE_CRM_CASE_STUDY_BOTTOM_CTA_KICKER_CLASS,
  MULTI_ROLE_CRM_CASE_STUDY_BOTTOM_CTA_PRIMARY_CLASS,
  MULTI_ROLE_CRM_CASE_STUDY_BOTTOM_CTA_SECTION_CLASS,
  MULTI_ROLE_CRM_CASE_STUDY_BOTTOM_CTA_SUBTEXT_CLASS,
  MULTI_ROLE_CRM_CASE_STUDY_BOTTOM_CTA_TITLE_CLASS,
} from "../lib/multiRoleCrmCaseStudyLayout";
import { IconArrowRight } from "./icons";

export default function MultiRoleCrmCaseStudyBottomCta() {
  const { bottomCta } = MULTI_ROLE_CRM_CASE_STUDY_COPY;

  return (
    <section
      className={`${MULTI_ROLE_CRM_CASE_STUDY_BOTTOM_CTA_SECTION_CLASS} reveal-on-scroll`}
      data-testid="multi-role-crm-case-study-bottom-cta"
      aria-labelledby="multi-role-crm-case-study-bottom-cta-title"
    >
      <div className={MULTI_ROLE_CRM_CASE_STUDY_BOTTOM_CTA_INNER_CLASS}>
        <div>
          <p className={MULTI_ROLE_CRM_CASE_STUDY_BOTTOM_CTA_KICKER_CLASS}>{bottomCta.kicker}</p>
          <h2 id="multi-role-crm-case-study-bottom-cta-title" className={MULTI_ROLE_CRM_CASE_STUDY_BOTTOM_CTA_TITLE_CLASS}>
            {bottomCta.title}
          </h2>
          <p className={MULTI_ROLE_CRM_CASE_STUDY_BOTTOM_CTA_SUBTEXT_CLASS}>{bottomCta.subtext}</p>
        </div>
        <Link
          className={`${MULTI_ROLE_CRM_CASE_STUDY_BOTTOM_CTA_BTN_CLASS} ${MULTI_ROLE_CRM_CASE_STUDY_BOTTOM_CTA_PRIMARY_CLASS}`}
          to={bottomCta.primaryTo}
        >
          {bottomCta.primaryLabel}
          <IconArrowRight width={16} height={16} />
        </Link>
      </div>
    </section>
  );
}
