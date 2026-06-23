import type { Testimonial } from "../lib/siteTrustContent";
import { STITCH_COPY } from "../lib/stitchDesign";

type Props = { testimonials: Testimonial[] };

export default function TestimonialsSection({ testimonials }: Props) {
  return (
    <section className="section section-centered testimonials-section" data-testid="testimonials-section">
      <span className="section-kicker">CLIENT FEEDBACK</span>
      <h2 className="section-title testimonials-title">{STITCH_COPY.caseStudies.title}</h2>
      <div className="testimonials-stack margin-top-lg">
        {testimonials.map((t) => (
          <article key={t.name} className="card testimonial-card">
            <span className="testimonial-quote-mark" aria-hidden>
              “
            </span>
            <p className="testimonial-quote">{t.quote}</p>
            <div className="testimonial-meta">
              <span className={`testimonial-avatar testimonial-avatar--${t.accent}`} aria-hidden>
                {t.initials}
              </span>
              <div className="testimonial-meta-text">
                <strong>{t.name}</strong>
                <span className="muted">
                  {t.company} · {t.country}
                </span>
              </div>
              <span className="testimonial-country-code" aria-label={t.country}>
                [{t.countryCode}]
              </span>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
