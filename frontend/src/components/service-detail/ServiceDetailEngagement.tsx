import Reveal from "../motion/Reveal";
import type { ServiceDetail } from "../../lib/services/types";

type Props = { service: ServiceDetail };

/** Timeline and pricing in one scannable block (no per-service FAQs or testimonials). */
export function ServiceDetailPlan({ service }: Props) {
  return (
    <section className="svc-detail-section svc-detail-section--muted" data-testid="service-detail-plan">
      <Reveal>
        <h2 className="svc-detail-section-title">Timeline &amp; engagement</h2>
        <div className="svc-detail-plan-grid">
          <div className="svc-detail-plan-block">
            <h3 className="svc-detail-plan-subtitle">Typical timelines</h3>
            <ul className="svc-detail-plan-timeline-list">
              {service.timeline.map((entry) => (
                <li key={entry.label}>
                  <span className="svc-detail-plan-timeline-label">{entry.label}</span>
                  <span className="svc-detail-plan-timeline-duration">{entry.duration}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="svc-detail-plan-block">
            <h3 className="svc-detail-plan-subtitle">Engagement models</h3>
            <ul className="svc-detail-plan-pricing-list">
              {service.pricing.map((model) => (
                <li key={model.title} className="svc-detail-plan-pricing-item">
                  <strong>{model.title}</strong>
                  <span>{model.description}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
