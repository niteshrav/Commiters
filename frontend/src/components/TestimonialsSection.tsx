import TestimonialCard from "./TestimonialCard";
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
          <TestimonialCard key={t.name} testimonial={t} />
        ))}
      </div>
    </section>
  );
}
