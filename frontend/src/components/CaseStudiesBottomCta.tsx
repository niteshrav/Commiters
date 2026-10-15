import { Link } from "react-router-dom";
import { CASE_STUDIES_PAGE_DESIGN } from "../lib/caseStudiesPageDesign";
import {
  CASE_STUDIES_BOTTOM_CTA_ACTIONS_CLASS,
  CASE_STUDIES_BOTTOM_CTA_PRIMARY_CLASS,
  CASE_STUDIES_BOTTOM_CTA_SECONDARY_CLASS,
  CASE_STUDIES_BOTTOM_CTA_SECTION_CLASS,
  CASE_STUDIES_BOTTOM_CTA_SUBTEXT_CLASS,
  CASE_STUDIES_BOTTOM_CTA_TITLE_CLASS,
} from "../lib/caseStudiesPageLayout";

export default function CaseStudiesBottomCta() {
  const { cta } = CASE_STUDIES_PAGE_DESIGN;

  return (
    <section
      className={`${CASE_STUDIES_BOTTOM_CTA_SECTION_CLASS} work-final-cta`}
      data-testid="case-studies-bottom-cta"
      aria-labelledby="case-studies-bottom-cta-title"
    >
      <div className="case-studies-bottom-cta-inner work-final-cta-inner">
        <p className="work-final-cta-kicker">{cta.kicker}</p>
        <h2 id="case-studies-bottom-cta-title" className={CASE_STUDIES_BOTTOM_CTA_TITLE_CLASS}>
          {cta.title}
        </h2>
        <p className={CASE_STUDIES_BOTTOM_CTA_SUBTEXT_CLASS}>{cta.subtext}</p>
        <div className={CASE_STUDIES_BOTTOM_CTA_ACTIONS_CLASS}>
          <Link
            className={`case-studies-bottom-cta-btn ${CASE_STUDIES_BOTTOM_CTA_PRIMARY_CLASS} btn btn-primary`}
            to={cta.primaryTo}
          >
            {cta.primaryLabel}
          </Link>
          <Link
            className={`case-studies-bottom-cta-btn ${CASE_STUDIES_BOTTOM_CTA_SECONDARY_CLASS} btn btn-secondary`}
            to={cta.secondaryTo}
          >
            {cta.secondaryLabel}
          </Link>
        </div>
      </div>
    </section>
  );
}
