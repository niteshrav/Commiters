import CaseStudiesBottomCta from "../components/CaseStudiesBottomCta";
import CaseStudiesGridSection from "../components/CaseStudiesGridSection";
import CaseStudiesIntroSection from "../components/CaseStudiesIntroSection";
import { usePageSeo } from "../hooks/usePageSeo";
import { CASE_STUDIES_PAGE_CLASS } from "../lib/caseStudiesPageLayout";
import { caseStudiesPageSeo } from "../lib/sitePageSeo";

export default function CaseStudiesPage() {
  usePageSeo(caseStudiesPageSeo());

  return (
    <div className={CASE_STUDIES_PAGE_CLASS} data-testid="case-studies-page">
      <CaseStudiesIntroSection />
      <CaseStudiesGridSection />
      <CaseStudiesBottomCta />
    </div>
  );
}
