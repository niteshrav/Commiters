import { useState } from "react";
import Reveal from "../motion/Reveal";
import { IconChevronDown } from "../icons";
import {
  FAQ_ACCORDION_CHEVRON_CLASS,
  FAQ_ACCORDION_ITEM_CLASS,
  FAQ_ACCORDION_ITEM_OPEN_CLASS,
  FAQ_ACCORDION_LIST_CLASS,
  FAQ_ACCORDION_PANEL_CLASS,
  FAQ_ACCORDION_TRIGGER_CLASS,
} from "../../lib/faqPageLayout";
import type { ServiceDetail } from "../../lib/services/types";

type Props = { service: ServiceDetail };

export function ServiceDetailProblem({ service }: Props) {
  if (!service.problem) return null;

  return (
    <section className="svc-detail-section svc-detail-section--muted" data-testid="service-detail-problem">
      <Reveal>
        <h2 className="svc-detail-section-title">{service.problem.title}</h2>
        <p className="svc-detail-about-prose">{service.problem.lead}</p>
        <ul className="svc-detail-plan-timeline-list" data-testid="service-detail-problem-points">
          {service.problem.points.map((point) => (
            <li key={point}>
              <span className="svc-detail-plan-timeline-label">{point}</span>
            </li>
          ))}
        </ul>
      </Reveal>
    </section>
  );
}

export function ServiceDetailProcess({ service }: Props) {
  if (!service.showProcess) return null;

  return (
    <section className="svc-detail-section" data-testid="service-detail-process">
      <Reveal>
        <h2 className="svc-detail-section-title">How We Work</h2>
        <ol className="svc-detail-plan-timeline-list">
          {service.processSteps.map((step, index) => (
            <li key={step}>
              <span className="svc-detail-plan-timeline-label">
                {String(index + 1).padStart(2, "0")}. {step}
              </span>
            </li>
          ))}
        </ol>
      </Reveal>
    </section>
  );
}

export function ServiceDetailFaqs({ service }: Props) {
  const faqs = service.faqs ?? [];
  const [openId, setOpenId] = useState<string | null>(null);

  if (faqs.length === 0) return null;

  return (
    <section className="svc-detail-section svc-detail-section--muted" data-testid="service-detail-faqs">
      <Reveal>
        <h2 className="svc-detail-section-title">FAQ</h2>
        <div className={FAQ_ACCORDION_LIST_CLASS}>
          {faqs.map((faq, index) => {
            const id = `svc-faq-${index}`;
            const isOpen = openId === id;
            return (
              <article
                key={faq.question}
                className={`${FAQ_ACCORDION_ITEM_CLASS}${isOpen ? ` ${FAQ_ACCORDION_ITEM_OPEN_CLASS}` : ""}`}
                data-testid={`service-detail-faq-item-${index}`}
              >
                <button
                  type="button"
                  className={FAQ_ACCORDION_TRIGGER_CLASS}
                  aria-expanded={isOpen}
                  onClick={() => setOpenId(isOpen ? null : id)}
                >
                  <span>{faq.question}</span>
                  <IconChevronDown className={FAQ_ACCORDION_CHEVRON_CLASS} width={22} height={22} aria-hidden />
                </button>
                <div className={FAQ_ACCORDION_PANEL_CLASS}>
                  <p>{faq.answer}</p>
                </div>
              </article>
            );
          })}
        </div>
      </Reveal>
    </section>
  );
}
