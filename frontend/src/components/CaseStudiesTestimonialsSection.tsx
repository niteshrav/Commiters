import TestimonialCard from "./TestimonialCard";
import { CASE_STUDIES_PAGE_DESIGN } from "../lib/caseStudiesPageDesign";
import { BROWSE_MY_VACATION_TESTIMONIAL } from "../lib/testimonialsPageContent";

export default function CaseStudiesTestimonialsSection() {
  return (
    <section className="work-testimonials" data-testid="work-testimonials" aria-labelledby="work-testimonials-heading">
      <p className="work-final-cta-kicker">{CASE_STUDIES_PAGE_DESIGN.testimonials.kicker}</p>
      <h2 id="work-testimonials-heading" className="work-section-heading">
        {CASE_STUDIES_PAGE_DESIGN.testimonials.heading}
      </h2>
      <div className="work-testimonials-grid work-testimonials-grid--single">
        <TestimonialCard testimonial={BROWSE_MY_VACATION_TESTIMONIAL} featured />
      </div>
    </section>
  );
}
