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
          About the Service
        </h2>
        <div className="svc-detail-about-grid">
          <article className="svc-detail-about-card">
            <h3>What it is</h3>
            <p>{service.about.what}</p>
          </article>
          <article className="svc-detail-about-card">
            <h3>Why you need it</h3>
            <p>{service.about.why}</p>
          </article>
          <article className="svc-detail-about-card">
            <h3>Who it&apos;s for</h3>
            <p>{service.about.who}</p>
          </article>
        </div>
      </Reveal>
    </section>
  );
}

export function ServiceDetailFeatures({ service }: Props) {
  return (
    <section className="svc-detail-section svc-detail-section--muted" data-testid="service-detail-features">
      <Reveal>
        <h2 className="svc-detail-section-title">Features</h2>
        <div className="svc-detail-features-grid">
          {service.features.map((feature, index) => {
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
  return (
    <section className="svc-detail-section" data-testid="service-detail-technologies">
      <Reveal>
        <h2 className="svc-detail-section-title">Technologies We Use</h2>
        <div className="svc-detail-tech-grid">
          {service.technologies.map((tech) => (
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

export function ServiceDetailProcess({ service }: Props) {
  return (
    <section className="svc-detail-section svc-detail-section--muted" data-testid="service-detail-process">
      <Reveal>
        <h2 className="svc-detail-section-title">Development Process</h2>
        <ol className="svc-detail-process-list">
          {service.processSteps.map((step, index) => (
            <li key={step}>
              <span className="svc-detail-process-index">{String(index + 1).padStart(2, "0")}</span>
              <span>{step}</span>
            </li>
          ))}
        </ol>
      </Reveal>
    </section>
  );
}

export function ServiceDetailTimeline({ service }: Props) {
  return (
    <section className="svc-detail-section" data-testid="service-detail-timeline">
      <Reveal>
        <h2 className="svc-detail-section-title">Estimated Timeline</h2>
        <div className="svc-detail-timeline-grid">
          {service.timeline.map((entry) => (
            <article key={entry.label} className="svc-detail-timeline-card">
              <h3>{entry.label}</h3>
              <p>{entry.duration}</p>
            </article>
          ))}
        </div>
      </Reveal>
    </section>
  );
}

export function ServiceDetailPricing({ service }: Props) {
  return (
    <section className="svc-detail-section svc-detail-section--muted" data-testid="service-detail-pricing">
      <Reveal>
        <h2 className="svc-detail-section-title">Pricing Models</h2>
        <div className="svc-detail-pricing-grid">
          {service.pricing.map((model) => (
            <article key={model.title} className="svc-detail-pricing-card">
              <h3>{model.title}</h3>
              <p>{model.description}</p>
              <p className="svc-detail-pricing-best-for">
                <strong>Best for:</strong> {model.bestFor}
              </p>
            </article>
          ))}
        </div>
      </Reveal>
    </section>
  );
}

export function ServiceDetailIndustries({ service }: Props) {
  return (
    <section className="svc-detail-section" data-testid="service-detail-industries">
      <Reveal>
        <h2 className="svc-detail-section-title">Industries We Serve</h2>
        <div className="svc-detail-industries-grid">
          {service.industries.map((industry) => (
            <span key={industry} className="svc-detail-industry-chip">
              {industry}
            </span>
          ))}
        </div>
      </Reveal>
    </section>
  );
}

export function ServiceDetailWhyChoose({ service }: Props) {
  return (
    <section className="svc-detail-section svc-detail-section--muted" data-testid="service-detail-why-choose">
      <Reveal>
        <h2 className="svc-detail-section-title">Why Choose Commiters?</h2>
        <div className="svc-detail-why-grid">
          {service.whyChoose.map((item, index) => (
            <Reveal key={item.title} delay={index * 0.04} className="svc-detail-why-card">
              <h3>{item.title}</h3>
              <p>{item.description}</p>
            </Reveal>
          ))}
        </div>
      </Reveal>
    </section>
  );
}
