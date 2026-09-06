import TechnicalCaseStudyPage from "../components/TechnicalCaseStudyPage";
import { usePageSeo } from "../hooks/usePageSeo";
import { ECO_ROUTE_CASE_STUDY_COPY } from "../lib/ecoRouteCaseStudyContent";
import { ecoRouteCaseStudyPageSeo } from "../lib/sitePageSeo";

export default function EcoRouteCaseStudyPage() {
  usePageSeo(ecoRouteCaseStudyPageSeo());
  return <TechnicalCaseStudyPage copy={ECO_ROUTE_CASE_STUDY_COPY} />;
}
