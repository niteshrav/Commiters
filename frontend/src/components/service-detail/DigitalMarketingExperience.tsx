import { useState } from "react";
import { Link } from "react-router-dom";
import {
  IconAutomationSpark,
  IconBolt,
  IconGauge,
  IconLayers,
  IconRocket,
  IconSearch,
  IconShieldCheck,
  IconTarget,
} from "../icons";
import Reveal from "../motion/Reveal";
import { resolveTechIconUrl } from "../../lib/homeTechStack";
import { NAV_CTA_TO } from "../../lib/navSections";
import { ROUTES } from "../../lib/routes";
import {
  DIGITAL_MARKETING_FUNNEL,
  DIGITAL_MARKETING_INDUSTRIES,
  DIGITAL_MARKETING_METRICS,
  DIGITAL_MARKETING_PILLARS,
  DIGITAL_MARKETING_PROCESS,
  DIGITAL_MARKETING_STACK,
  DIGITAL_MARKETING_WHY,
} from "../../lib/services/digitalMarketingPage";
import type { ServiceDetail, ServiceFeature } from "../../lib/services/types";
import { ServiceDetailFaqs } from "./ServiceDetailLandingSections";

const ICONS: Record<ServiceFeature["icon"], typeof IconTarget> = {
  responsive: IconLayers,
  performance: IconGauge,
  seo: IconSearch,
  secure: IconShieldCheck,
  maintain: IconTarget,
  scale: IconBolt,
  ai: IconRocket,
  mobile: IconLayers,
  automation: IconAutomationSpark,
  mvp: IconRocket,
};

function AnalyticsMark() {
  return (
    <svg className="dm-mark" viewBox="0 0 280 180" role="img" aria-label="Sample analytics chart">
      <rect x="16" y="24" width="248" height="140" rx="12" />
      <path d="M40 128h28v-36H40zm48 36h28V72H88zm48 56h28V96h-28zm48 0h28V48h-28z" />
      <path className="dm-mark-line" d="M36 120c28-8 40-40 68-44 24-4 36 16 60 8 22-8 40-28 72-36" />
    </svg>
  );
}

export default function DigitalMarketingExperience({ service }: { service: ServiceDetail }) {
  const [stage, setStage] = useState(0);

  return (
    <div className="dm-studio" data-testid="digital-marketing-studio">
      <section className="svc-detail-section" data-testid="service-detail-about">
        <div className="dm-overview">
          <div>
            <h2 className="svc-detail-section-title">Digital marketing that drives real business growth</h2>
            <p className="dm-lead">We design and manage digital marketing systems that connect acquisition, conversion, and retention.</p>
            <ul className="dm-pillars">
              {DIGITAL_MARKETING_PILLARS.map((item) => (
                <li key={item.title}>
                  <h3>{item.title}</h3>
                  <p>{item.body}</p>
                </li>
              ))}
            </ul>
          </div>
          <AnalyticsMark />
        </div>
      </section>

      <section className="svc-detail-section" id="dm-services" data-testid="service-detail-features">
        <h2 className="svc-detail-section-title">Our digital marketing services</h2>
        <div className="dm-service-grid">
          {service.features.map((feature, index) => {
            const Icon = ICONS[feature.icon];
            return (
              <Reveal key={feature.title} delay={index * 0.04} className="dm-service-card">
                <div className="dm-service-head">
                  <span className="svc-detail-feature-icon" aria-hidden>
                    <Icon width={22} height={22} />
                  </span>
                  <span className="dm-index">{String(index + 1).padStart(2, "0")}</span>
                </div>
                <h3>{feature.title}</h3>
                <p>{feature.description}</p>
                {feature.points ? (
                  <ul>
                    {feature.points.map((point) => (
                      <li key={point}>{point}</li>
                    ))}
                  </ul>
                ) : null}
              </Reveal>
            );
          })}
        </div>
      </section>

      <section className="svc-detail-section" data-testid="digital-marketing-funnel">
        <h2 className="svc-detail-section-title">From first click to loyal customer</h2>
        <ol className="dm-funnel">
          {DIGITAL_MARKETING_FUNNEL.map((item, index) => (
            <li key={item.title}>
              <button
                type="button"
                className={stage === index ? "is-active" : undefined}
                aria-pressed={stage === index}
                onMouseEnter={() => setStage(index)}
                onFocus={() => setStage(index)}
                onClick={() => setStage(index)}
              >
                <span>{String(index + 1).padStart(2, "0")}</span>
                <strong>{item.title}</strong>
                <small>{item.body}</small>
              </button>
            </li>
          ))}
        </ol>
      </section>

      <section className="svc-detail-section" data-testid="service-detail-process">
        <h2 className="svc-detail-section-title">A smarter approach to digital growth</h2>
        <ol className="dm-process">
          {DIGITAL_MARKETING_PROCESS.map((step, index) => (
            <li key={step.title}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <h3>{step.title}</h3>
              <p>{step.body}</p>
            </li>
          ))}
        </ol>
      </section>

      <section className="svc-detail-section" data-testid="service-detail-technologies">
        <h2 className="svc-detail-section-title">Tools and platforms we work with</h2>
        <div className="dm-stack">
          {DIGITAL_MARKETING_STACK.map((group) => (
            <article key={group.label}>
              <h3>{group.label}</h3>
              <ul>
                {group.items.map((item) => (
                  <li key={item.name}>
                    {item.logo ? <img src={resolveTechIconUrl(item.logo)} alt="" width={22} height={22} /> : null}
                    <span>{item.name}</span>
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </section>

      <section className="svc-detail-section" data-testid="digital-marketing-industries">
        <h2 className="svc-detail-section-title">Digital growth across industries</h2>
        <div className="dm-card-grid">
          {DIGITAL_MARKETING_INDUSTRIES.map((item) => (
            <article key={item.title}>
              <h3>{item.title}</h3>
              <p>{item.body}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="svc-detail-section" data-testid="digital-marketing-why">
        <div className="dm-why">
          <div>
            <h2 className="svc-detail-section-title">Marketing built around business outcomes</h2>
            <div className="dm-card-grid">
              {DIGITAL_MARKETING_WHY.map((item) => (
                <article key={item.title}>
                  <h3>{item.title}</h3>
                  <p>{item.body}</p>
                </article>
              ))}
            </div>
          </div>
          <AnalyticsMark />
        </div>
      </section>

      <section className="svc-detail-section" data-testid="digital-marketing-metrics" aria-labelledby="dm-metrics-title">
        <h2 id="dm-metrics-title" className="svc-detail-section-title">Metrics we track</h2>
        <p className="dm-lead">Sample view. These charts show the shape of a report. They are not Commiters campaign results.</p>
        <ul className="dm-metrics">
          {DIGITAL_MARKETING_METRICS.map((metric) => (
            <li key={metric}>
              <span className="dm-bars" aria-hidden>
                <i /><i /><i /><i />
              </span>
              <strong>{metric}</strong>
              <small>Sample</small>
            </li>
          ))}
        </ul>
      </section>

      <ServiceDetailFaqs service={service} />

      <section className="svc-detail-final-cta" data-testid="service-detail-final-cta">
        <Reveal className="svc-detail-final-cta-inner">
          <h2>Ready to turn traffic into business growth?</h2>
          <p>Let&apos;s build a digital marketing strategy that attracts the right audience, converts visitors, and creates measurable business opportunities.</p>
          <div className="svc-detail-hero-actions">
            <Link className="btn btn-primary svc-detail-btn" to={NAV_CTA_TO}>
              Book an Operational Audit
            </Link>
            <Link className="btn btn-secondary svc-detail-btn" to={ROUTES.contact}>
              Request a Quote
            </Link>
          </div>
        </Reveal>
      </section>
    </div>
  );
}
