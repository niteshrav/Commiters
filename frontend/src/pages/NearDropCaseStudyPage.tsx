import WorkCaseStudyLayout from "../components/work-case-study/WorkCaseStudyLayout";
import { usePageSeo } from "../hooks/usePageSeo";
import { neardropCaseStudyPageSeo } from "../lib/sitePageSeo";
import { getWorkCaseStudy } from "../lib/workCaseStudyProjects";

export default function NearDropCaseStudyPage() {
  usePageSeo(neardropCaseStudyPageSeo());
  return <WorkCaseStudyLayout study={getWorkCaseStudy("neardrop-mvp")} />;
}
