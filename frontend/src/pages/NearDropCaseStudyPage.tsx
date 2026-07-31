import NearDropCaseStudyBottomCta from "../components/NearDropCaseStudyBottomCta";
import NearDropCaseStudyExecutionSection from "../components/NearDropCaseStudyExecutionSection";
import NearDropCaseStudyFunctionalExcellenceSection from "../components/NearDropCaseStudyFunctionalExcellenceSection";
import NearDropCaseStudyIntroSection from "../components/NearDropCaseStudyIntroSection";
import { usePageSeo } from "../hooks/usePageSeo";
import { NEARDROP_CASE_STUDY_PAGE_CLASS } from "../lib/neardropCaseStudyLayout";
import { neardropCaseStudyPageSeo } from "../lib/sitePageSeo";

export default function NearDropCaseStudyPage() {
  usePageSeo(neardropCaseStudyPageSeo());

  return (
    <div className={NEARDROP_CASE_STUDY_PAGE_CLASS} data-testid="neardrop-case-study-page">
      <NearDropCaseStudyIntroSection />
      <NearDropCaseStudyFunctionalExcellenceSection />
      <NearDropCaseStudyExecutionSection />
      <NearDropCaseStudyBottomCta />
    </div>
  );
}
