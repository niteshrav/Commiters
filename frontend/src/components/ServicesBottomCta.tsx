import { Link } from "react-router-dom";
import {
  SERVICES_BOTTOM_CTA_ACTIONS_CLASS,
  SERVICES_BOTTOM_CTA_INNER_CLASS,
  SERVICES_BOTTOM_CTA_PRIMARY_CLASS,
  SERVICES_BOTTOM_CTA_SECONDARY_CLASS,
  SERVICES_BOTTOM_CTA_SECTION_CLASS,
  SERVICES_BOTTOM_CTA_SUBTEXT_CLASS,
  SERVICES_BOTTOM_CTA_TITLE_CLASS,
} from "../lib/servicesPageBottomLayout";
import { SERVICES_BOTTOM_CTA } from "../lib/servicesPageBottomContent";

export default function ServicesBottomCta() {
  return (
    <section
      className={`${SERVICES_BOTTOM_CTA_SECTION_CLASS} reveal-on-scroll`}
      data-testid="services-bottom-cta"
      aria-labelledby="services-bottom-cta-title"
    >
      <div className={SERVICES_BOTTOM_CTA_INNER_CLASS}>
        <h2 id="services-bottom-cta-title" className={SERVICES_BOTTOM_CTA_TITLE_CLASS}>
          {SERVICES_BOTTOM_CTA.title}
        </h2>
        <p className={SERVICES_BOTTOM_CTA_SUBTEXT_CLASS}>{SERVICES_BOTTOM_CTA.subtext}</p>
        <div className={SERVICES_BOTTOM_CTA_ACTIONS_CLASS}>
          <Link className={`btn btn-primary ${SERVICES_BOTTOM_CTA_PRIMARY_CLASS}`} to={SERVICES_BOTTOM_CTA.primaryHref}>
            {SERVICES_BOTTOM_CTA.primaryLabel}
          </Link>
          <Link className={`btn btn-secondary ${SERVICES_BOTTOM_CTA_SECONDARY_CLASS}`} to={SERVICES_BOTTOM_CTA.secondaryHref}>
            {SERVICES_BOTTOM_CTA.secondaryLabel}
          </Link>
        </div>
      </div>
    </section>
  );
}
