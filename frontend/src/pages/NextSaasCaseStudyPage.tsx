import NextSaasCaseStudyBottomCta from "../components/NextSaasCaseStudyBottomCta";
import NextSaasCaseStudyFeaturesSection from "../components/NextSaasCaseStudyFeaturesSection";
import NextSaasCaseStudyIntroSection from "../components/NextSaasCaseStudyIntroSection";
import { useDocumentTitle } from "../hooks/useDocumentTitle";
import { NEXTSAAS_CASE_STUDY_COPY } from "../lib/nextsaasCaseStudyContent";
import { NEXTSAAS_CASE_STUDY_PAGE_CLASS } from "../lib/nextsaasCaseStudyLayout";
import { pageTitle } from "../lib/siteMeta";

export default function NextSaasCaseStudyPage() {
  useDocumentTitle(pageTitle(NEXTSAAS_CASE_STUDY_COPY.documentTitle));

  return (
    <div className={NEXTSAAS_CASE_STUDY_PAGE_CLASS} data-testid="nextsaas-case-study-page">
      <NextSaasCaseStudyIntroSection />
      <NextSaasCaseStudyFeaturesSection />
      <NextSaasCaseStudyBottomCta />
    </div>
  );
}
