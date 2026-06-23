import CommitersCaseStudyArchitectureSection from "../components/CommitersCaseStudyArchitectureSection";
import CommitersCaseStudyBottomCta from "../components/CommitersCaseStudyBottomCta";
import CommitersCaseStudyFeaturesSection from "../components/CommitersCaseStudyFeaturesSection";
import CommitersCaseStudyIntroSection from "../components/CommitersCaseStudyIntroSection";
import CommitersCaseStudyOverviewSection from "../components/CommitersCaseStudyOverviewSection";
import { useDocumentTitle } from "../hooks/useDocumentTitle";
import { COMMITERS_CASE_STUDY_COPY } from "../lib/commitersCaseStudyContent";
import { COMMITERS_CASE_STUDY_PAGE_CLASS } from "../lib/commitersCaseStudyLayout";
import { pageTitle } from "../lib/siteMeta";

export default function CommitersCaseStudyPage() {
  useDocumentTitle(pageTitle(COMMITERS_CASE_STUDY_COPY.documentTitle));

  return (
    <div className={COMMITERS_CASE_STUDY_PAGE_CLASS} data-testid="commiters-case-study-page">
      <CommitersCaseStudyIntroSection />
      <CommitersCaseStudyOverviewSection />
      <CommitersCaseStudyArchitectureSection />
      <CommitersCaseStudyFeaturesSection />
      <CommitersCaseStudyBottomCta />
    </div>
  );
}
