import { Link } from "react-router-dom";
import BrandWatermark from "../BrandWatermark";
import Reveal from "../motion/Reveal";
import type { ServiceDetail } from "../../lib/services/types";
import { NAV_CTA_LABEL, NAV_CTA_TO } from "../../lib/navSections";
import { ROUTES } from "../../lib/routes";
import { pageTitle } from "../../lib/siteMeta";

type Props = { service: ServiceDetail };

export default function ServiceDetailHero({ service }: Props) {
  return (
    <section className="svc-detail-hero" data-testid="service-detail-hero" aria-labelledby="service-detail-hero-title">
      <BrandWatermark />
      <Reveal className="svc-detail-hero-grid">
        <div className="svc-detail-hero-copy">
          <p className="svc-detail-kicker typography-kicker">Enterprise service</p>
          <h1 id="service-detail-hero-title" className="svc-detail-hero-title typography-display">
            {service.title}
          </h1>
          <p className="svc-detail-hero-tagline typography-body">{service.tagline}</p>
          <p className="svc-detail-hero-description typography-body">{service.description}</p>
          <div className="svc-detail-hero-actions">
            <Link className="btn btn-primary svc-detail-btn" to={NAV_CTA_TO} data-testid="service-detail-hero-primary-cta">
              {NAV_CTA_LABEL}
            </Link>
            <Link className="btn btn-secondary svc-detail-btn" to={ROUTES.contact}>
              Request Quote
            </Link>
          </div>
        </div>
        <div className={`svc-detail-hero-visual svc-detail-hero-visual--${service.heroVisual}`} aria-hidden />
      </Reveal>
    </section>
  );
}

export function serviceDocumentTitle(service: ServiceDetail): string {
  return pageTitle(service.seo.title);
}
