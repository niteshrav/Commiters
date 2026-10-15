import CaseStudiesBottomCta from "../components/CaseStudiesBottomCta";
import CaseStudiesFlagshipSection from "../components/CaseStudiesFlagshipSection";
import CaseStudiesGridSection from "../components/CaseStudiesGridSection";
import CaseStudiesIntroSection from "../components/CaseStudiesIntroSection";
import CaseStudiesTestimonialsSection from "../components/CaseStudiesTestimonialsSection";
import { usePageSeo } from "../hooks/usePageSeo";
import { CASE_STUDIES_PAGE_CLASS } from "../lib/caseStudiesPageLayout";
import { withSiteCloudTheme } from "../lib/homeCloudTheme";
import { caseStudiesPageSeo } from "../lib/sitePageSeo";

export default function CaseStudiesPage() {
  usePageSeo(caseStudiesPageSeo());

  return (
    <div className={withSiteCloudTheme(CASE_STUDIES_PAGE_CLASS)} data-testid="case-studies-page">
      <CaseStudiesIntroSection />
      <CaseStudiesGridSection />
      <CaseStudiesFlagshipSection />
      <CaseStudiesTestimonialsSection />
      <CaseStudiesBottomCta />
    </div>
  );
}
