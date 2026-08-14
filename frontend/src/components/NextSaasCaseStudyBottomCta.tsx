import { Link } from "react-router-dom";
import { NEXTSAAS_CASE_STUDY_COPY } from "../lib/nextsaasCaseStudyContent";
import {
  NEXTSAAS_CASE_STUDY_BOTTOM_CTA_ACTIONS_CLASS,
  NEXTSAAS_CASE_STUDY_BOTTOM_CTA_BTN_CLASS,
  NEXTSAAS_CASE_STUDY_BOTTOM_CTA_DESCRIPTION_CLASS,
  NEXTSAAS_CASE_STUDY_BOTTOM_CTA_INNER_CLASS,
  NEXTSAAS_CASE_STUDY_BOTTOM_CTA_PRIMARY_CLASS,
  NEXTSAAS_CASE_STUDY_BOTTOM_CTA_SECONDARY_CLASS,
  NEXTSAAS_CASE_STUDY_BOTTOM_CTA_SECTION_CLASS,
  NEXTSAAS_CASE_STUDY_BOTTOM_CTA_TITLE_CLASS,
} from "../lib/nextsaasCaseStudyLayout";
import { IconArrowRight } from "./icons";

export default function NextSaasCaseStudyBottomCta() {
  const { bottomCta } = NEXTSAAS_CASE_STUDY_COPY;

  return (
    <section
      className={`${NEXTSAAS_CASE_STUDY_BOTTOM_CTA_SECTION_CLASS} reveal-on-scroll`}
      data-testid="nextsaas-case-study-bottom-cta"
      aria-labelledby="nextsaas-case-study-bottom-cta-title"
    >
      <div className={NEXTSAAS_CASE_STUDY_BOTTOM_CTA_INNER_CLASS}>
        <h2 id="nextsaas-case-study-bottom-cta-title" className={NEXTSAAS_CASE_STUDY_BOTTOM_CTA_TITLE_CLASS}>
          {bottomCta.title}
        </h2>
        <p className={NEXTSAAS_CASE_STUDY_BOTTOM_CTA_DESCRIPTION_CLASS}>{bottomCta.description}</p>
        <div className={NEXTSAAS_CASE_STUDY_BOTTOM_CTA_ACTIONS_CLASS}>
          <Link
            className={`${NEXTSAAS_CASE_STUDY_BOTTOM_CTA_BTN_CLASS} ${NEXTSAAS_CASE_STUDY_BOTTOM_CTA_PRIMARY_CLASS}`}
            to={bottomCta.primaryTo}
          >
            {bottomCta.primaryLabel}
            <IconArrowRight width={18} height={18} />
          </Link>
          {"secondaryHref" in bottomCta && bottomCta.secondaryHref ? (
            <a
              className={`${NEXTSAAS_CASE_STUDY_BOTTOM_CTA_BTN_CLASS} ${NEXTSAAS_CASE_STUDY_BOTTOM_CTA_SECONDARY_CLASS}`}
              href={bottomCta.secondaryHref}
              target="_blank"
              rel="noopener noreferrer"
            >
              {bottomCta.secondaryLabel}
            </a>
          ) : (
            <Link
              className={`${NEXTSAAS_CASE_STUDY_BOTTOM_CTA_BTN_CLASS} ${NEXTSAAS_CASE_STUDY_BOTTOM_CTA_SECONDARY_CLASS}`}
              to={bottomCta.secondaryTo}
            >
              {bottomCta.secondaryLabel}
            </Link>
          )}
          {"tertiaryTo" in bottomCta && bottomCta.tertiaryTo ? (
            <Link
              className={`${NEXTSAAS_CASE_STUDY_BOTTOM_CTA_BTN_CLASS} ${NEXTSAAS_CASE_STUDY_BOTTOM_CTA_SECONDARY_CLASS}`}
              to={bottomCta.tertiaryTo}
            >
              {bottomCta.tertiaryLabel}
            </Link>
          ) : null}
        </div>
      </div>
    </section>
  );
}
