import {
  TESTIMONIALS_INTRO_BODY_CLASS,
  TESTIMONIALS_INTRO_INNER_CLASS,
  TESTIMONIALS_INTRO_SECTION_CLASS,
  TESTIMONIALS_INTRO_TITLE_CLASS,
} from "../lib/testimonialsPageLayout";
import { TESTIMONIALS_PAGE_COPY } from "../lib/testimonialsPageContent";

export default function TestimonialsIntroSection() {
  return (
    <section
      className={`${TESTIMONIALS_INTRO_SECTION_CLASS} reveal-on-scroll`}
      data-testid="testimonials-intro-section"
      aria-labelledby="testimonials-intro-title"
    >
      <div className={TESTIMONIALS_INTRO_INNER_CLASS}>
        <h1 id="testimonials-intro-title" className={`${TESTIMONIALS_INTRO_TITLE_CLASS} typography-display`}>
          {TESTIMONIALS_PAGE_COPY.title}
        </h1>
        <p className={`${TESTIMONIALS_INTRO_BODY_CLASS} typography-body`}>{TESTIMONIALS_PAGE_COPY.subtext}</p>
      </div>
    </section>
  );
}
