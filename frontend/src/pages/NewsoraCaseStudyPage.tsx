import WorkCaseStudyLayout from "../components/work-case-study/WorkCaseStudyLayout";
import { usePageSeo } from "../hooks/usePageSeo";
import { newsoraCaseStudyPageSeo } from "../lib/sitePageSeo";
import { getWorkCaseStudy } from "../lib/workCaseStudyProjects";

export default function NewsoraCaseStudyPage() {
  usePageSeo(newsoraCaseStudyPageSeo());
  return <WorkCaseStudyLayout study={getWorkCaseStudy("newsora")} />;
}
