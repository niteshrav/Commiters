import AiSummarizerCaseStudyArchitectureSection from "../components/AiSummarizerCaseStudyArchitectureSection";
import AiSummarizerCaseStudyBottomCta from "../components/AiSummarizerCaseStudyBottomCta";
import AiSummarizerCaseStudyIntroSection from "../components/AiSummarizerCaseStudyIntroSection";
import AiSummarizerCaseStudyTechStackSection from "../components/AiSummarizerCaseStudyTechStackSection";
import { usePageSeo } from "../hooks/usePageSeo";
import { AI_SUMMARIZER_CASE_STUDY_PAGE_CLASS } from "../lib/aiSummarizerCaseStudyLayout";
import { withSiteCloudTheme } from "../lib/homeCloudTheme";
import { aiSummarizerCaseStudyPageSeo } from "../lib/sitePageSeo";

export default function AiSummarizerCaseStudyPage() {
  usePageSeo(aiSummarizerCaseStudyPageSeo());

  return (
    <div className={withSiteCloudTheme(AI_SUMMARIZER_CASE_STUDY_PAGE_CLASS)} data-testid="ai-summarizer-case-study-page">
      <AiSummarizerCaseStudyIntroSection />
      <AiSummarizerCaseStudyArchitectureSection />
      <AiSummarizerCaseStudyTechStackSection />
      <AiSummarizerCaseStudyBottomCta />
    </div>
  );
}
