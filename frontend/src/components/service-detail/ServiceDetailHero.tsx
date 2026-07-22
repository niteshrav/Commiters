import { Link } from "react-router-dom";
import {
  IconAutomationSpark,
  IconBrowserWindow,
  IconDevicePhone,
  IconLayers,
  IconRobot,
  IconRocket,
  IconShoppingBag,
} from "../icons";
import Reveal from "../motion/Reveal";
import type { ServiceDetail } from "../../lib/services/types";
import { ROUTES } from "../../lib/routes";
import { buildDiscoveryCallCalendarUrl } from "../../lib/siteContact";
import { pageTitle } from "../../lib/siteMeta";

const HERO_ICONS = {
  website: IconBrowserWindow,
  ai: IconRobot,
  webapp: IconLayers,
  mobile: IconDevicePhone,
  automation: IconAutomationSpark,
  mvp: IconRocket,
  ecommerce: IconShoppingBag,
} as const;

type Props = { service: ServiceDetail };

export default function ServiceDetailHero({ service }: Props) {
  const HeroIcon = HERO_ICONS[service.heroVisual];

  return (
    <section className="svc-detail-hero" data-testid="service-detail-hero" aria-labelledby="service-detail-hero-title">
      <Reveal className="svc-detail-hero-grid">
        <div className="svc-detail-hero-copy">
          <p className="svc-detail-kicker">Service</p>
          <h1 id="service-detail-hero-title" className="svc-detail-hero-title">
            {service.title}
          </h1>
          <p className="svc-detail-hero-tagline">{service.tagline}</p>
          <p className="svc-detail-hero-description">{service.description}</p>
          <div className="svc-detail-hero-actions">
            <a
              className="btn btn-primary svc-detail-btn"
              href={buildDiscoveryCallCalendarUrl()}
              target="_blank"
              rel="noopener noreferrer"
            >
              Get Free Consultation
            </a>
            <Link className="btn svc-detail-btn svc-detail-btn--outline" to={ROUTES.contact}>
              Request Quote
            </Link>
          </div>
        </div>
        <div className={`svc-detail-hero-visual svc-detail-hero-visual--${service.heroVisual}`} aria-hidden>
          <HeroIcon width={72} height={72} />
        </div>
      </Reveal>
    </section>
  );
}

export function serviceDocumentTitle(service: ServiceDetail): string {
  return pageTitle(service.seo.title);
}
