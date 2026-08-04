import {
  IconAutomationSpark,
  IconBolt,
  IconGauge,
  IconLayers,
  IconRocket,
  IconRobot,
  IconSearch,
  IconShieldCheck,
  IconTarget,
} from "../icons";
import Reveal from "../motion/Reveal";
import { resolveTechIconUrl } from "../../lib/homeTechStack";
import type { ServiceDetail, ServiceFeature } from "../../lib/services/types";

const FEATURE_ICONS: Record<ServiceFeature["icon"], typeof IconTarget> = {
  responsive: IconLayers,
  performance: IconGauge,
  seo: IconSearch,
  secure: IconShieldCheck,
  maintain: IconTarget,
  scale: IconBolt,
  ai: IconRobot,
  mobile: IconLayers,
  automation: IconAutomationSpark,
  mvp: IconRocket,
};

type Props = { service: ServiceDetail };

export function ServiceDetailAbout({ service }: Props) {
  return (
    <section className="svc-detail-section" data-testid="service-detail-about" aria-labelledby="service-detail-about-title">
      <Reveal>
        <h2 id="service-detail-about-title" className="svc-detail-section-title">
          Overview
        </h2>
        <div className="svc-detail-about-prose">
          <p>{service.about.what}</p>
          <p>{service.about.why}</p>
          <p className="svc-detail-about-audience">
            <strong>Best for:</strong> {service.about.who}
          </p>
        </div>
      </Reveal>
    </section>
  );
}

const FEATURES_ON_PAGE = 4;

export function ServiceDetailFeatures({ service }: Props) {
  const features = service.features.slice(0, FEATURES_ON_PAGE);

  return (
    <section className="svc-detail-section svc-detail-section--muted" data-testid="service-detail-features">
      <Reveal>
        <h2 className="svc-detail-section-title">Features</h2>
        <div className="svc-detail-features-grid">
          {features.map((feature, index) => {
            const Icon = FEATURE_ICONS[feature.icon];
            return (
              <Reveal key={feature.title} delay={index * 0.05} className="svc-detail-feature-card">
                <span className="svc-detail-feature-icon" aria-hidden>
                  <Icon width={24} height={24} />
                </span>
                <h3>{feature.title}</h3>
                <p>{feature.description}</p>
              </Reveal>
            );
          })}
        </div>
      </Reveal>
    </section>
  );
}

export function ServiceDetailTechnologies({ service }: Props) {
  const technologies = service.technologies.slice(0, 6);

  return (
    <section className="svc-detail-section" data-testid="service-detail-technologies">
      <Reveal>
        <h2 className="svc-detail-section-title">Technologies We Use</h2>
        <div className="svc-detail-tech-grid">
          {technologies.map((tech) => (
            <div key={tech.alt} className="svc-detail-tech-card">
              <img src={resolveTechIconUrl(tech)} alt={tech.alt} loading="lazy" />
              <span>{tech.alt}</span>
            </div>
          ))}
        </div>
      </Reveal>
    </section>
  );
}
