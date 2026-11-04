import WorkCaseStudyLayout from "../components/work-case-study/WorkCaseStudyLayout";
import { usePageSeo } from "../hooks/usePageSeo";
import { aiSummarizerCaseStudyPageSeo } from "../lib/sitePageSeo";
import { getWorkCaseStudy } from "../lib/workCaseStudyProjects";

export default function AiSummarizerCaseStudyPage() {
  usePageSeo(aiSummarizerCaseStudyPageSeo());
  return <WorkCaseStudyLayout study={getWorkCaseStudy("ai-summarizer")} />;
}
