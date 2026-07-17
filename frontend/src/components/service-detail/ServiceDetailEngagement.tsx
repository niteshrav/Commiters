import { useCallback, useState } from "react";
import { IconChevronDown } from "../icons";
import Reveal from "../motion/Reveal";
import type { ServiceDetail } from "../../lib/services/types";

type Props = { service: ServiceDetail };

export default function ServiceDetailTestimonials({ service }: Props) {
  const [activeIndex, setActiveIndex] = useState(0);
  const total = service.testimonials.length;

  const goNext = useCallback(() => {
    setActiveIndex((current) => (current + 1) % total);
  }, [total]);

  const goPrev = useCallback(() => {
    setActiveIndex((current) => (current - 1 + total) % total);
  }, [total]);

  if (total === 0) return null;

  const active = service.testimonials[activeIndex];

  return (
    <section className="svc-detail-section svc-detail-section--muted" data-testid="service-detail-testimonials">
      <Reveal>
        <h2 className="svc-detail-section-title">Client Testimonials</h2>
        <div className="svc-detail-testimonial-carousel">
          <blockquote className="svc-detail-testimonial-quote">
            <p>&ldquo;{active.quote}&rdquo;</p>
            <footer>
              <strong>{active.name}</strong>
              <span>{active.company}</span>
            </footer>
          </blockquote>
          <div className="svc-detail-testimonial-controls">
            <button type="button" className="svc-detail-carousel-btn" onClick={goPrev} aria-label="Previous testimonial">
              ←
            </button>
            <span aria-live="polite">
              {activeIndex + 1} / {total}
            </span>
            <button type="button" className="svc-detail-carousel-btn" onClick={goNext} aria-label="Next testimonial">
              →
            </button>
          </div>
        </div>
      </Reveal>
    </section>
  );
}

export function ServiceDetailFaqs({ service }: Props) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="svc-detail-section" data-testid="service-detail-faqs">
      <Reveal>
        <h2 className="svc-detail-section-title">FAQs</h2>
        <div className="svc-detail-faq-list">
          {service.faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <article
                key={faq.question}
                className={`svc-detail-faq-item${isOpen ? " svc-detail-faq-item--open" : ""}`}
              >
                <button
                  type="button"
                  className="svc-detail-faq-trigger"
                  aria-expanded={isOpen}
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                >
                  <span>{faq.question}</span>
                  <IconChevronDown width={20} height={20} aria-hidden className="svc-detail-faq-chevron" />
                </button>
                <div className="svc-detail-faq-panel">
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
