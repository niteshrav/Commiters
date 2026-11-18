import { useState } from "react";
import { Link } from "react-router-dom";
import {
  IconAutomationSpark,
  IconBolt,
  IconClock,
  IconDocument,
  IconGauge,
  IconLayers,
  IconList,
  IconRocket,
  IconSearch,
  IconShieldCheck,
  IconTarget,
  IconUsers,
  IconWorkflow,
} from "../icons";
import Reveal from "../motion/Reveal";
import { resolveTechIconUrl } from "../../lib/homeTechStack";
import { ROUTES } from "../../lib/routes";
import {
  INSURANCE_TECH_AI,
  INSURANCE_TECH_DESK,
  INSURANCE_TECH_FLOW,
  INSURANCE_TECH_METRICS,
  INSURANCE_TECH_PILLARS,
  INSURANCE_TECH_SECURITY,
  INSURANCE_TECH_SECURITY_LEAD,
  INSURANCE_TECH_SEGMENTS,
  INSURANCE_TECH_STACK,
  INSURANCE_TECH_WHY,
  type InsuranceMetricIcon,
} from "../../lib/services/insuranceTechnologyPage";
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

const METRIC_ICONS: Record<InsuranceMetricIcon, typeof IconClock> = {
  clock: IconClock,
  calendar: IconWorkflow,
  shield: IconShieldCheck,
  checklist: IconList,
  document: IconDocument,
  users: IconUsers,
};

function AnalyticsMark() {
  return (
    <svg className="dm-mark" viewBox="0 0 280 180" role="img" aria-label="Sample insurance operations chart">
      <rect x="16" y="24" width="248" height="140" rx="12" />
      <path d="M40 128h28v-36H40zm48 36h28V72H88zm48 56h28V96h-28zm48 0h28V48h-28z" />
      <path className="dm-mark-line" d="M36 120c28-8 40-40 68-44 24-4 36 16 60 8 22-8 40-28 72-36" />
    </svg>
  );
}

export default function InsuranceTechnologyExperience({ service }: { service: ServiceDetail }) {
  const [stage, setStage] = useState(0);

  return (
    <div className="dm-studio" data-testid="insurance-technology-studio">
      <section className="svc-detail-section" id="ins-desk" data-testid="insurance-desk">
        <h2 className="svc-detail-section-title">Agency operations, when you need the desk run</h2>
        <p className="dm-lead">
          Software and administration sit in one offer. Producers stay on sales. The desk handles Personal and Commercial
          Lines servicing under an agreed workflow.
        </p>
        <div className="dm-card-grid">
          {INSURANCE_TECH_DESK.map((item) => (
            <article key={item.title}>
              <h3>{item.title}</h3>
              <p>{item.body}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="svc-detail-section" data-testid="service-detail-about">
        <div className="dm-overview">
          <div>
            <h2 className="svc-detail-section-title">Modernizing insurance through technology</h2>
            <p className="dm-lead">
              Insurance businesses need connected platforms that simplify operations, improve engagement, and support clearer
              decisions.
            </p>
            <ul className="dm-pillars">
              {INSURANCE_TECH_PILLARS.map((item) => (
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

      <section className="svc-detail-section" id="ins-services" data-testid="service-detail-features">
        <h2 className="svc-detail-section-title">Core insurance technology services</h2>
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

      <section className="svc-detail-section" data-testid="insurance-segments">
        <h2 className="svc-detail-section-title">Technology solutions across insurance segments</h2>
        <div className="dm-card-grid">
          {INSURANCE_TECH_SEGMENTS.map((item) => (
            <article key={item.title}>
              <h3>{item.title}</h3>
              <p>{item.body}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="svc-detail-section" data-testid="insurance-workflow">
        <h2 className="svc-detail-section-title">From policy creation to claims management</h2>
        <ol className="dm-funnel">
          {INSURANCE_TECH_FLOW.map((item, index) => (
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

      <section className="svc-detail-section" data-testid="insurance-ai">
        <div className="dm-why">
          <div>
            <h2 className="svc-detail-section-title">Making insurance operations smarter with AI</h2>
            <p className="dm-lead">
              Automation takes repetitive steps off the desk. A person still reviews exceptions, fraud signals, and claim
              decisions.
            </p>
            <div className="dm-card-grid">
              {INSURANCE_TECH_AI.map((item) => (
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

      <section className="svc-detail-section" data-testid="service-detail-technologies">
        <h2 className="svc-detail-section-title">Technology powering modern insurance platforms</h2>
        <div className="dm-stack">
          {INSURANCE_TECH_STACK.map((group) => (
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

      <section className="svc-detail-section" data-testid="insurance-why">
        <div className="dm-why">
          <div>
            <h2 className="svc-detail-section-title">Engineering better insurance experiences</h2>
            <div className="dm-card-grid">
              {INSURANCE_TECH_WHY.map((item) => (
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

      <section className="svc-detail-section" data-testid="insurance-security">
        <h2 className="svc-detail-section-title">Built for secure and connected insurance operations</h2>
        <p className="dm-lead">{INSURANCE_TECH_SECURITY_LEAD}</p>
        <ul className="dm-metrics">
          {INSURANCE_TECH_SECURITY.map((item) => (
            <li key={item}>
              <strong>{item}</strong>
              <small>Project capability</small>
            </li>
          ))}
        </ul>
      </section>

      <section className="svc-detail-section" data-testid="insurance-metrics" aria-labelledby="ins-metrics-title">
        <h2 id="ins-metrics-title" className="svc-detail-section-title">
          Complete visibility into insurance operations
        </h2>
        <p className="dm-lead">Operational SLA and workflow KPIs we run the agency desk against.</p>
        <ul className="dm-metrics">
          {INSURANCE_TECH_METRICS.map((metric) => {
            const Icon = METRIC_ICONS[metric.icon];
            return (
              <li key={metric.title}>
                <span className="svc-detail-feature-icon" aria-hidden>
                  <Icon width={22} height={22} />
                </span>
                <strong>{metric.title}</strong>
                <small>{metric.body}</small>
              </li>
            );
          })}
        </ul>
      </section>

      <ServiceDetailFaqs service={service} />

      <section className="svc-detail-final-cta" data-testid="service-detail-final-cta">
        <Reveal className="svc-detail-final-cta-inner">
          <h2>Ready to clear the servicing backlog?</h2>
          <p>
            Book a discovery call to map COI, endorsement, renewal, and portal workflows for your US P&C agency—Commit.
            Code. Connect.
          </p>
          <div className="svc-detail-hero-actions">
            <Link className="btn btn-primary svc-detail-btn" to={ROUTES.contact}>
              Book a Discovery Call
            </Link>
            <a className="btn btn-secondary svc-detail-btn" href="#ins-desk">
              Explore Our Capabilities
            </a>
          </div>
        </Reveal>
      </section>
    </div>
  );
}
