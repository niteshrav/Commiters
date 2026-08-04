import TestimonialsIntroSection from "../components/TestimonialsIntroSection";
import TestimonialsListSection from "../components/TestimonialsListSection";
import { usePageSeo } from "../hooks/usePageSeo";
import { testimonialsPageSeo } from "../lib/sitePageSeo";
import { TESTIMONIALS_PAGE_CLASS } from "../lib/testimonialsPageLayout";

export default function TestimonialsPage() {
  usePageSeo(testimonialsPageSeo());

  return (
    <div className={TESTIMONIALS_PAGE_CLASS} data-testid="testimonials-page">
      <TestimonialsIntroSection />
      <TestimonialsListSection />
    </div>
  );
}
