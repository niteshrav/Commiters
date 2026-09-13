import { Link } from "react-router-dom";
import BrandHeroEyebrow from "./BrandHeroEyebrow";
import BrandWatermark from "./BrandWatermark";
import { IconBolt, IconCloud, IconShieldCheck } from "./icons";
import { SERVICES_OVERVIEW_DISPLAY } from "../lib/servicesOverviewPageDesign";
import { SERVICES_OVERVIEW_HERO } from "../lib/servicesOverviewPageContent";
import {
  SERVICES_OVERVIEW_HERO_ACTIONS_CLASS,
  SERVICES_OVERVIEW_HERO_CHIPS_CLASS,
  SERVICES_OVERVIEW_HERO_CLASS,
  SERVICES_OVERVIEW_HERO_COPY_CLASS,
  SERVICES_OVERVIEW_HERO_CTA_CLASS,
  SERVICES_OVERVIEW_HERO_INNER_CLASS,
  SERVICES_OVERVIEW_HERO_VISUAL_CLASS,
} from "../lib/servicesOverviewPageLayout";
import {
  SERVICES_EXPERTISE_BODY_CLASS,
  SERVICES_EXPERTISE_SEPARATOR_CLASS,
  SERVICES_EXPERTISE_SEPARATOR_TEST_ID,
  SERVICES_EXPERTISE_TITLE_CLASS,
} from "../lib/servicesIntroLayout";

const CHIP_ICONS = {
  scale: IconBolt,
  zero: IconShieldCheck,
  built: IconCloud,
} as const;

export default function ServicesOverviewHero() {
  return (
    <section
      className={`${SERVICES_OVERVIEW_HERO_CLASS} reveal-on-scroll`}
      data-testid="services-overview-hero"
      aria-labelledby="services-overview-title"
    >
      <BrandWatermark />
      <div className={SERVICES_OVERVIEW_HERO_INNER_CLASS}>
        <div className={SERVICES_OVERVIEW_HERO_COPY_CLASS}>
          <BrandHeroEyebrow text={SERVICES_OVERVIEW_HERO.kicker} />
          <h1 id="services-overview-title" className={`${SERVICES_EXPERTISE_TITLE_CLASS} typography-display`}>
            <span className="services-overview-headline-lead">{SERVICES_OVERVIEW_DISPLAY.headlineLead}</span>{" "}
            <span className="services-overview-headline-accent">{SERVICES_OVERVIEW_DISPLAY.headlineAccent}</span>
          </h1>
          <p className={`${SERVICES_EXPERTISE_BODY_CLASS} typography-body`}>{SERVICES_OVERVIEW_HERO.subtitle}</p>
          <div className={SERVICES_OVERVIEW_HERO_ACTIONS_CLASS}>
            <Link
              className={`btn btn-primary ${SERVICES_OVERVIEW_HERO_CTA_CLASS}`}
              to={SERVICES_OVERVIEW_HERO.productsCtaTo}
            >
              {SERVICES_OVERVIEW_HERO.productsCtaLabel}
            </Link>
            <Link
              className={`btn btn-secondary ${SERVICES_OVERVIEW_HERO_CTA_CLASS}`}
              to={SERVICES_OVERVIEW_HERO.auditCtaTo}
            >
              {SERVICES_OVERVIEW_HERO.auditCtaLabel}
            </Link>
          </div>
          <ul className={SERVICES_OVERVIEW_HERO_CHIPS_CLASS}>
            {SERVICES_OVERVIEW_DISPLAY.chips.map((chip) => {
              const Icon = CHIP_ICONS[chip.id];
              return (
                <li key={chip.id}>
                  <Icon />
                  <span>
                    <strong>{chip.title}</strong> {chip.body}
                  </span>
                </li>
              );
            })}
          </ul>
        </div>
        <div className={SERVICES_OVERVIEW_HERO_VISUAL_CLASS} aria-hidden="true">
          {SERVICES_OVERVIEW_DISPLAY.floats.map((item) => (
            <p key={item.id} className={`services-overview-float services-overview-float--${item.id}`}>
              {item.title}
            </p>
          ))}
          <div className="services-overview-stack">
            {SERVICES_OVERVIEW_DISPLAY.layers.map((layer) => (
              <span key={layer}>{layer}</span>
            ))}
          </div>
        </div>
      </div>
      <hr className={SERVICES_EXPERTISE_SEPARATOR_CLASS} data-testid={SERVICES_EXPERTISE_SEPARATOR_TEST_ID} />
    </section>
  );
}
