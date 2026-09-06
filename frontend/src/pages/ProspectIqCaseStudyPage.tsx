import TechnicalCaseStudyPage from "../components/TechnicalCaseStudyPage";
import { usePageSeo } from "../hooks/usePageSeo";
import { PROSPECT_IQ_CASE_STUDY_COPY } from "../lib/prospectIqCaseStudyContent";
import { prospectIqCaseStudyPageSeo } from "../lib/sitePageSeo";

export default function ProspectIqCaseStudyPage() {
  usePageSeo(prospectIqCaseStudyPageSeo());
  return <TechnicalCaseStudyPage copy={PROSPECT_IQ_CASE_STUDY_COPY} />;
}
