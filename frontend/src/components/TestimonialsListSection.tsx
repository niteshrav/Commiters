import TestimonialCard from "./TestimonialCard";
import { useTestimonialsPageItems } from "../lib/cms/hooks";
import { TESTIMONIALS_LIST_SECTION_CLASS } from "../lib/testimonialsPageLayout";

export default function TestimonialsListSection() {
  const testimonials = useTestimonialsPageItems();

  return (
    <section
      className={`section ${TESTIMONIALS_LIST_SECTION_CLASS}`}
      data-testid="testimonials-list-section"
      aria-label="Client testimonials"
    >
      <div className="testimonials-stack">
        {testimonials.map((testimonial, index) => (
          <TestimonialCard
            key={`${testimonial.name}-${index}`}
            testimonial={testimonial}
            featured={testimonials.length === 1 || index === 0}
          />
        ))}
      </div>
    </section>
  );
}
