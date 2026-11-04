import WorkCaseStudyLayout from "../components/work-case-study/WorkCaseStudyLayout";
import { usePageSeo } from "../hooks/usePageSeo";
import { ecoRouteCaseStudyPageSeo } from "../lib/sitePageSeo";
import { getWorkCaseStudy } from "../lib/workCaseStudyProjects";

export default function EcoRouteCaseStudyPage() {
  usePageSeo(ecoRouteCaseStudyPageSeo());
  return <WorkCaseStudyLayout study={getWorkCaseStudy("ecoroute-intelligence")} />;
}
