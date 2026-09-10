import { Link } from "react-router-dom";
import { CASE_STUDIES_PAGE_DESIGN } from "../lib/caseStudiesPageDesign";
import {
  CASE_STUDIES_BOTTOM_CTA_ACTIONS_CLASS,
  CASE_STUDIES_BOTTOM_CTA_PRIMARY_CLASS,
  CASE_STUDIES_BOTTOM_CTA_SECTION_CLASS,
  CASE_STUDIES_BOTTOM_CTA_SUBTEXT_CLASS,
  CASE_STUDIES_BOTTOM_CTA_TITLE_CLASS,
} from "../lib/caseStudiesPageLayout";
import { IconArrowRight } from "./icons";

export default function CaseStudiesBottomCta() {
  const { cta } = CASE_STUDIES_PAGE_DESIGN;

  return (
    <section
      className={`${CASE_STUDIES_BOTTOM_CTA_SECTION_CLASS} work-final-cta reveal-on-scroll`}
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
            <IconArrowRight width={18} height={18} aria-hidden />
          </Link>
        </div>
      </div>
    </section>
  );
}
