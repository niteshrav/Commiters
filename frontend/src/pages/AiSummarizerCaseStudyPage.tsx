import AiSummarizerCaseStudyArchitectureSection from "../components/AiSummarizerCaseStudyArchitectureSection";
import AiSummarizerCaseStudyExecutionSection from "../components/AiSummarizerCaseStudyExecutionSection";
import AiSummarizerCaseStudyIntroSection from "../components/AiSummarizerCaseStudyIntroSection";
import AiSummarizerCaseStudyTechStackSection from "../components/AiSummarizerCaseStudyTechStackSection";
import { useDocumentTitle } from "../hooks/useDocumentTitle";
import { AI_SUMMARIZER_CASE_STUDY_COPY } from "../lib/aiSummarizerCaseStudyContent";
import { AI_SUMMARIZER_CASE_STUDY_PAGE_CLASS } from "../lib/aiSummarizerCaseStudyLayout";
import { pageTitle } from "../lib/siteMeta";

export default function AiSummarizerCaseStudyPage() {
  useDocumentTitle(pageTitle(AI_SUMMARIZER_CASE_STUDY_COPY.documentTitle));

  return (
    <div className={AI_SUMMARIZER_CASE_STUDY_PAGE_CLASS} data-testid="ai-summarizer-case-study-page">
      <AiSummarizerCaseStudyIntroSection />
      <AiSummarizerCaseStudyArchitectureSection />
      <AiSummarizerCaseStudyTechStackSection />
      <AiSummarizerCaseStudyExecutionSection />
    </div>
  );
}
