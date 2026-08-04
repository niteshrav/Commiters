import NextSaasCaseStudyBottomCta from "../components/NextSaasCaseStudyBottomCta";
import NextSaasCaseStudyFeaturesSection from "../components/NextSaasCaseStudyFeaturesSection";
import NextSaasCaseStudyIntroSection from "../components/NextSaasCaseStudyIntroSection";
import { usePageSeo } from "../hooks/usePageSeo";
import { NEXTSAAS_CASE_STUDY_PAGE_CLASS } from "../lib/nextsaasCaseStudyLayout";
import { nextsaasCaseStudyPageSeo } from "../lib/sitePageSeo";

export default function NextSaasCaseStudyPage() {
  usePageSeo(nextsaasCaseStudyPageSeo());

  return (
    <div className={NEXTSAAS_CASE_STUDY_PAGE_CLASS} data-testid="nextsaas-case-study-page">
      <NextSaasCaseStudyIntroSection />
      <NextSaasCaseStudyFeaturesSection />
      <NextSaasCaseStudyBottomCta />
    </div>
  );
}
