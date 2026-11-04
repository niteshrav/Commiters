import WorkCaseStudyLayout from "../components/work-case-study/WorkCaseStudyLayout";
import { usePageSeo } from "../hooks/usePageSeo";
import { prospectIqCaseStudyPageSeo } from "../lib/sitePageSeo";
import { getWorkCaseStudy } from "../lib/workCaseStudyProjects";

export default function ProspectIqCaseStudyPage() {
  usePageSeo(prospectIqCaseStudyPageSeo());
  return <WorkCaseStudyLayout study={getWorkCaseStudy("prospectiq-ai")} />;
}
