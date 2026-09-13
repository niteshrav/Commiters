import NearDropCaseStudyArchitectureSection from "../components/NearDropCaseStudyArchitectureSection";
import NearDropCaseStudyBottomCta from "../components/NearDropCaseStudyBottomCta";
import NearDropCaseStudyExecutionSection from "../components/NearDropCaseStudyExecutionSection";
import NearDropCaseStudyFunctionalExcellenceSection from "../components/NearDropCaseStudyFunctionalExcellenceSection";
import NearDropCaseStudyIntroSection from "../components/NearDropCaseStudyIntroSection";
import { usePageSeo } from "../hooks/usePageSeo";
import { withSiteCloudTheme } from "../lib/homeCloudTheme";
import { NEARDROP_CASE_STUDY_PAGE_CLASS } from "../lib/neardropCaseStudyLayout";
import { neardropCaseStudyPageSeo } from "../lib/sitePageSeo";

export default function NearDropCaseStudyPage() {
  usePageSeo(neardropCaseStudyPageSeo());

  return (
    <div className={withSiteCloudTheme(NEARDROP_CASE_STUDY_PAGE_CLASS)} data-testid="neardrop-case-study-page">
      <NearDropCaseStudyIntroSection />
      <NearDropCaseStudyArchitectureSection />
      <NearDropCaseStudyFunctionalExcellenceSection />
      <NearDropCaseStudyExecutionSection />
      <NearDropCaseStudyBottomCta />
    </div>
  );
}
