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
      <div className="container">
        <div className={SERVICES_BOTTOM_CTA_INNER_CLASS}>
          <h2 id="services-bottom-cta-title" className={SERVICES_BOTTOM_CTA_TITLE_CLASS}>
            {SERVICES_BOTTOM_CTA.title}
          </h2>
          <p className={SERVICES_BOTTOM_CTA_SUBTEXT_CLASS}>{SERVICES_BOTTOM_CTA.subtext}</p>
          <div className={SERVICES_BOTTOM_CTA_ACTIONS_CLASS}>
            <a
              className={`btn btn-primary ${SERVICES_BOTTOM_CTA_PRIMARY_CLASS}`}
              href={SERVICES_BOTTOM_CTA.primaryHref}
              target="_blank"
              rel="noopener noreferrer"
            >
              {SERVICES_BOTTOM_CTA.primaryLabel}
            </a>
            <Link className={`btn ${SERVICES_BOTTOM_CTA_SECONDARY_CLASS}`} to={SERVICES_BOTTOM_CTA.secondaryHref}>
              {SERVICES_BOTTOM_CTA.secondaryLabel}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
