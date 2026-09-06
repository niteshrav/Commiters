import { Link } from "react-router-dom";
import { AI_SUMMARIZER_CASE_STUDY_COPY } from "../lib/aiSummarizerCaseStudyContent";
import { AI_SUMMARIZER_CASE_STUDY_BOTTOM_CTA_SECTION_CLASS } from "../lib/aiSummarizerCaseStudyLayout";

export default function AiSummarizerCaseStudyBottomCta() {
  const { bottomCta } = AI_SUMMARIZER_CASE_STUDY_COPY;

  return (
    <section
      className={`${AI_SUMMARIZER_CASE_STUDY_BOTTOM_CTA_SECTION_CLASS} reveal-on-scroll`}
      data-testid="ai-summarizer-case-study-bottom-cta"
      aria-labelledby="ai-summarizer-case-study-bottom-cta-title"
    >
      <h2 id="ai-summarizer-case-study-bottom-cta-title">{bottomCta.title}</h2>
      <p>{bottomCta.subtext}</p>
      <Link className="btn btn-primary" to={bottomCta.primaryTo}>
        {bottomCta.primaryLabel}
      </Link>
    </section>
  );
}
