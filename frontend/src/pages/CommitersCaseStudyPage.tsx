import WorkCaseStudyLayout from "../components/work-case-study/WorkCaseStudyLayout";
import { usePageSeo } from "../hooks/usePageSeo";
import { commitersCaseStudyPageSeo } from "../lib/sitePageSeo";
import { getWorkCaseStudy } from "../lib/workCaseStudyProjects";

export default function CommitersCaseStudyPage() {
  usePageSeo(commitersCaseStudyPageSeo());
  return <WorkCaseStudyLayout study={getWorkCaseStudy("commiters")} />;
}
