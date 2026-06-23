import NearDropCaseStudyBottomCta from "../components/NearDropCaseStudyBottomCta";
import NearDropCaseStudyExecutionSection from "../components/NearDropCaseStudyExecutionSection";
import NearDropCaseStudyFunctionalExcellenceSection from "../components/NearDropCaseStudyFunctionalExcellenceSection";
import NearDropCaseStudyIntroSection from "../components/NearDropCaseStudyIntroSection";
import { useDocumentTitle } from "../hooks/useDocumentTitle";
import { NEARDROP_CASE_STUDY_COPY } from "../lib/neardropCaseStudyContent";
import { NEARDROP_CASE_STUDY_PAGE_CLASS } from "../lib/neardropCaseStudyLayout";
import { pageTitle } from "../lib/siteMeta";

export default function NearDropCaseStudyPage() {
  useDocumentTitle(pageTitle(NEARDROP_CASE_STUDY_COPY.documentTitle));

  return (
    <div className={NEARDROP_CASE_STUDY_PAGE_CLASS} data-testid="neardrop-case-study-page">
      <NearDropCaseStudyIntroSection />
      <NearDropCaseStudyFunctionalExcellenceSection />
      <NearDropCaseStudyExecutionSection />
      <NearDropCaseStudyBottomCta />
    </div>
  );
}
