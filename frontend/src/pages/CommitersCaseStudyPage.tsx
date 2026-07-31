import CommitersCaseStudyArchitectureSection from "../components/CommitersCaseStudyArchitectureSection";
import CommitersCaseStudyBottomCta from "../components/CommitersCaseStudyBottomCta";
import CommitersCaseStudyFeaturesSection from "../components/CommitersCaseStudyFeaturesSection";
import CommitersCaseStudyIntroSection from "../components/CommitersCaseStudyIntroSection";
import CommitersCaseStudyOverviewSection from "../components/CommitersCaseStudyOverviewSection";
import { usePageSeo } from "../hooks/usePageSeo";
import { COMMITERS_CASE_STUDY_PAGE_CLASS } from "../lib/commitersCaseStudyLayout";
import { commitersCaseStudyPageSeo } from "../lib/sitePageSeo";

export default function CommitersCaseStudyPage() {
  usePageSeo(commitersCaseStudyPageSeo());

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
