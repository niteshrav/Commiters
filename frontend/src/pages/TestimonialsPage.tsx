import TestimonialsIntroSection from "../components/TestimonialsIntroSection";
import TestimonialsListSection from "../components/TestimonialsListSection";
import { usePageSeo } from "../hooks/usePageSeo";
import { withSiteCloudTheme } from "../lib/homeCloudTheme";
import { testimonialsPageSeo } from "../lib/sitePageSeo";
import { TESTIMONIALS_PAGE_CLASS } from "../lib/testimonialsPageLayout";

export default function TestimonialsPage() {
  usePageSeo(testimonialsPageSeo());

  return (
    <div className={withSiteCloudTheme(TESTIMONIALS_PAGE_CLASS)} data-testid="testimonials-page">
      <TestimonialsIntroSection />
      <TestimonialsListSection />
    </div>
  );
}
