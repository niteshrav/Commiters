import { Link } from "react-router-dom";
import { CASE_STUDIES_PAGE_COPY } from "../lib/caseStudiesPageContent";
import {
  CASE_STUDIES_BOTTOM_CTA_ACTIONS_CLASS,
  CASE_STUDIES_BOTTOM_CTA_PRIMARY_CLASS,
  CASE_STUDIES_BOTTOM_CTA_SECONDARY_CLASS,
  CASE_STUDIES_BOTTOM_CTA_SECTION_CLASS,
  CASE_STUDIES_BOTTOM_CTA_TITLE_CLASS,
} from "../lib/caseStudiesPageLayout";

export default function CaseStudiesBottomCta() {
  const { bottomCta } = CASE_STUDIES_PAGE_COPY;

  return (
    <section
      className={`${CASE_STUDIES_BOTTOM_CTA_SECTION_CLASS} reveal-on-scroll`}
      data-testid="case-studies-bottom-cta"
      aria-labelledby="case-studies-bottom-cta-title"
    >
      <div className="case-studies-bottom-cta-inner">
        <h2 id="case-studies-bottom-cta-title" className={CASE_STUDIES_BOTTOM_CTA_TITLE_CLASS}>
          {bottomCta.title}
        </h2>
        <div className={CASE_STUDIES_BOTTOM_CTA_ACTIONS_CLASS}>
          <Link
            className={`case-studies-bottom-cta-btn ${CASE_STUDIES_BOTTOM_CTA_PRIMARY_CLASS} btn btn-primary`}
            to={bottomCta.primaryTo}
          >
            {bottomCta.primaryLabel}
          </Link>
          <Link
            className={`case-studies-bottom-cta-btn ${CASE_STUDIES_BOTTOM_CTA_SECONDARY_CLASS} btn btn-secondary`}
            to={bottomCta.secondaryTo}
          >
            {bottomCta.secondaryLabel}
          </Link>
        </div>
      </div>
    </section>
  );
}
