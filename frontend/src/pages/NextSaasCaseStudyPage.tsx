import WorkCaseStudyLayout from "../components/work-case-study/WorkCaseStudyLayout";
import { usePageSeo } from "../hooks/usePageSeo";
import { nextsaasCaseStudyPageSeo } from "../lib/sitePageSeo";
import { getWorkCaseStudy } from "../lib/workCaseStudyProjects";

export default function NextSaasCaseStudyPage() {
  usePageSeo(nextsaasCaseStudyPageSeo());
  return <WorkCaseStudyLayout study={getWorkCaseStudy("browse-my-vacation")} />;
}
