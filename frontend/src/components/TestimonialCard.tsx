import type { Testimonial } from "../lib/siteTrustContent";

type Props = {
  testimonial: Testimonial;
  featured?: boolean;
};

export default function TestimonialCard({ testimonial, featured = false }: Props) {
  return (
    <article
      className={`card testimonial-card${featured ? " testimonial-card--featured" : ""}`}
      data-testid={featured ? "testimonial-card-featured" : "testimonial-card"}
    >
      <span className="testimonial-quote-mark" aria-hidden>
        “
      </span>
      <p className="testimonial-quote typography-body">{testimonial.quote}</p>
      <div className="testimonial-meta">
        <span className={`testimonial-avatar testimonial-avatar--${testimonial.accent}`} aria-hidden>
          {testimonial.initials}
        </span>
        <div className="testimonial-meta-text">
          <strong>{testimonial.name}</strong>
          <span className="muted typography-body">
            {testimonial.company} · {testimonial.country}
          </span>
        </div>
        <span className="testimonial-country-code" aria-label={testimonial.country}>
          [{testimonial.countryCode}]
        </span>
      </div>
    </article>
  );
}
