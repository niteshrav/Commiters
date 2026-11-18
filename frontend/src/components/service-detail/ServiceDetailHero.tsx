import { Link } from "react-router-dom";
import BrandWatermark from "../BrandWatermark";
import Reveal from "../motion/Reveal";
import type { ServiceDetail } from "../../lib/services/types";
import { NAV_CTA_LABEL, NAV_CTA_TO } from "../../lib/navSections";
import { ROUTES } from "../../lib/routes";
import { serviceCardImageForDetail } from "../../lib/serviceCardImages";
import { pageTitle } from "../../lib/siteMeta";

type Props = { service: ServiceDetail };

export default function ServiceDetailHero({ service }: Props) {
  const image = serviceCardImageForDetail(service.slug);
  const primaryTo = service.primaryCtaTo ?? NAV_CTA_TO;
  const primaryLabel = service.primaryCtaLabel ?? NAV_CTA_LABEL;
  const secondaryTo = service.quoteCtaTo ?? ROUTES.contact;
  const secondaryLabel = service.quoteCtaLabel ?? "Request Quote";

  return (
    <section className="svc-detail-hero" data-testid="service-detail-hero" aria-labelledby="service-detail-hero-title">
      <BrandWatermark />
      <Reveal className="svc-detail-hero-grid">
        <div className="svc-detail-hero-copy">
          <p className="svc-detail-kicker typography-kicker">{service.heroKicker ?? "Enterprise service"}</p>
          <h1 id="service-detail-hero-title" className="svc-detail-hero-title typography-display">
            {service.heroHeadline ?? service.title}
          </h1>
          <p className="svc-detail-hero-tagline typography-body">{service.tagline}</p>
          {service.description ? (
            <p className="svc-detail-hero-description typography-body">{service.description}</p>
          ) : null}
          <div className="svc-detail-hero-actions">
            {primaryTo.startsWith("#") ? (
              <a className="btn btn-primary svc-detail-btn" href={primaryTo} data-testid="service-detail-hero-primary-cta">
                {primaryLabel}
              </a>
            ) : (
              <Link className="btn btn-primary svc-detail-btn" to={primaryTo} data-testid="service-detail-hero-primary-cta">
                {primaryLabel}
              </Link>
            )}
            {secondaryTo.startsWith("#") ? (
              <a className="btn btn-secondary svc-detail-btn" href={secondaryTo}>
                {secondaryLabel}
              </a>
            ) : (
              <Link className="btn btn-secondary svc-detail-btn" to={secondaryTo}>
                {secondaryLabel}
              </Link>
            )}
          </div>
        </div>
        <div className={`svc-detail-hero-visual svc-detail-hero-visual--${service.heroVisual}`}>
          <img className="svc-detail-hero-image" src={image.src} alt={image.alt} loading="eager" decoding="async" />
        </div>
      </Reveal>
    </section>
  );
}

export function serviceDocumentTitle(service: ServiceDetail): string {
  return pageTitle(service.seo.title);
}
