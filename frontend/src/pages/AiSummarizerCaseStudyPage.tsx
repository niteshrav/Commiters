import AiSummarizerCaseStudyArchitectureSection from "../components/AiSummarizerCaseStudyArchitectureSection";
import AiSummarizerCaseStudyExecutionSection from "../components/AiSummarizerCaseStudyExecutionSection";
import AiSummarizerCaseStudyIntroSection from "../components/AiSummarizerCaseStudyIntroSection";
import AiSummarizerCaseStudyTechStackSection from "../components/AiSummarizerCaseStudyTechStackSection";
import { usePageSeo } from "../hooks/usePageSeo";
import { AI_SUMMARIZER_CASE_STUDY_PAGE_CLASS } from "../lib/aiSummarizerCaseStudyLayout";
import { aiSummarizerCaseStudyPageSeo } from "../lib/sitePageSeo";

export default function AiSummarizerCaseStudyPage() {
  usePageSeo(aiSummarizerCaseStudyPageSeo());

  return (
    <div className={AI_SUMMARIZER_CASE_STUDY_PAGE_CLASS} data-testid="ai-summarizer-case-study-page">
      <AiSummarizerCaseStudyIntroSection />
      <AiSummarizerCaseStudyArchitectureSection />
      <AiSummarizerCaseStudyTechStackSection />
      <AiSummarizerCaseStudyExecutionSection />
    </div>
  );
}
