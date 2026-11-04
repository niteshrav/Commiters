import WorkCaseStudyLayout from "../components/work-case-study/WorkCaseStudyLayout";
import { usePageSeo } from "../hooks/usePageSeo";
import { multiRoleCrmCaseStudyPageSeo } from "../lib/sitePageSeo";
import { getWorkCaseStudy } from "../lib/workCaseStudyProjects";

export default function MultiRoleCrmCaseStudyPage() {
  usePageSeo(multiRoleCrmCaseStudyPageSeo());
  return <WorkCaseStudyLayout study={getWorkCaseStudy("multi-role-crm")} />;
}
