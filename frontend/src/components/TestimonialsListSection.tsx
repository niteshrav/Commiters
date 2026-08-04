import TestimonialCard from "./TestimonialCard";
import { TESTIMONIALS_LIST_SECTION_CLASS } from "../lib/testimonialsPageLayout";
import { BROWSE_MY_VACATION_TESTIMONIAL } from "../lib/testimonialsPageContent";

export default function TestimonialsListSection() {
  return (
    <section
      className={`section ${TESTIMONIALS_LIST_SECTION_CLASS}`}
      data-testid="testimonials-list-section"
      aria-label="Client testimonials"
    >
      <div className="testimonials-stack">
        <TestimonialCard testimonial={BROWSE_MY_VACATION_TESTIMONIAL} featured />
      </div>
    </section>
  );
}
