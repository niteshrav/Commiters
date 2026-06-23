import CaseStudiesBottomCta from "../components/CaseStudiesBottomCta";
import CaseStudiesGridSection from "../components/CaseStudiesGridSection";
import CaseStudiesIntroSection from "../components/CaseStudiesIntroSection";
import { useDocumentTitle } from "../hooks/useDocumentTitle";
import { CASE_STUDIES_PAGE_CLASS } from "../lib/caseStudiesPageLayout";
import { pageTitle } from "../lib/siteMeta";

export default function CaseStudiesPage() {
  useDocumentTitle(pageTitle("Case Studies"));

  return (
    <div className={CASE_STUDIES_PAGE_CLASS} data-testid="case-studies-page">
      <CaseStudiesIntroSection />
      <CaseStudiesGridSection />
      <CaseStudiesBottomCta />
    </div>
  );
}
