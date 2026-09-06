import { Link } from "react-router-dom";
import BrandWatermark from "./BrandWatermark";
import { SERVICES_OVERVIEW_HERO } from "../lib/servicesOverviewPageContent";
import {
  SERVICES_OVERVIEW_HERO_ACTIONS_CLASS,
  SERVICES_OVERVIEW_HERO_CLASS,
  SERVICES_OVERVIEW_HERO_CTA_CLASS,
  SERVICES_OVERVIEW_HERO_INNER_CLASS,
} from "../lib/servicesOverviewPageLayout";
import {
  SERVICES_EXPERTISE_BODY_CLASS,
  SERVICES_EXPERTISE_KICKER_CLASS,
  SERVICES_EXPERTISE_SEPARATOR_CLASS,
  SERVICES_EXPERTISE_SEPARATOR_TEST_ID,
  SERVICES_EXPERTISE_TITLE_CLASS,
} from "../lib/servicesIntroLayout";

export default function ServicesOverviewHero() {
  return (
    <section
      className={`${SERVICES_OVERVIEW_HERO_CLASS} reveal-on-scroll`}
      data-testid="services-overview-hero"
      aria-labelledby="services-overview-title"
    >
      <BrandWatermark />
      <div className={SERVICES_OVERVIEW_HERO_INNER_CLASS}>
        <p className={`${SERVICES_EXPERTISE_KICKER_CLASS} typography-kicker`}>{SERVICES_OVERVIEW_HERO.kicker}</p>
        <h1 id="services-overview-title" className={`${SERVICES_EXPERTISE_TITLE_CLASS} typography-display`}>
          {SERVICES_OVERVIEW_HERO.title}
        </h1>
        <p className={`${SERVICES_EXPERTISE_BODY_CLASS} typography-body`}>{SERVICES_OVERVIEW_HERO.subtitle}</p>
        <div className={SERVICES_OVERVIEW_HERO_ACTIONS_CLASS}>
          <Link className={`btn btn-secondary ${SERVICES_OVERVIEW_HERO_CTA_CLASS}`} to={SERVICES_OVERVIEW_HERO.productsCtaTo}>
            {SERVICES_OVERVIEW_HERO.productsCtaLabel}
          </Link>
          <Link className={`btn btn-primary ${SERVICES_OVERVIEW_HERO_CTA_CLASS}`} to={SERVICES_OVERVIEW_HERO.auditCtaTo}>
            {SERVICES_OVERVIEW_HERO.auditCtaLabel}
          </Link>
        </div>
      </div>
      <hr className={SERVICES_EXPERTISE_SEPARATOR_CLASS} data-testid={SERVICES_EXPERTISE_SEPARATOR_TEST_ID} />
    </section>
  );
}
