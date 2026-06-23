import { AI_SUMMARIZER_CASE_STUDY_COPY } from "../lib/aiSummarizerCaseStudyContent";
import {
  AI_SUMMARIZER_CASE_STUDY_DESCRIPTION_CLASS,
  AI_SUMMARIZER_CASE_STUDY_HERO_IMAGE_CLASS,
  AI_SUMMARIZER_CASE_STUDY_INTRO_COPY_CLASS,
  AI_SUMMARIZER_CASE_STUDY_INTRO_SECTION_CLASS,
  AI_SUMMARIZER_CASE_STUDY_INTRO_SPLIT_CLASS,
  AI_SUMMARIZER_CASE_STUDY_KICKER_CLASS,
  AI_SUMMARIZER_CASE_STUDY_METADATA_ITEM_CLASS,
  AI_SUMMARIZER_CASE_STUDY_METADATA_LABEL_CLASS,
  AI_SUMMARIZER_CASE_STUDY_METADATA_LIST_CLASS,
  AI_SUMMARIZER_CASE_STUDY_METADATA_PANEL_CLASS,
  AI_SUMMARIZER_CASE_STUDY_METADATA_VALUE_CLASS,
  AI_SUMMARIZER_CASE_STUDY_TITLE_CLASS,
} from "../lib/aiSummarizerCaseStudyLayout";

export default function AiSummarizerCaseStudyIntroSection() {
  const { kicker, title, description, metadata, heroImage } = AI_SUMMARIZER_CASE_STUDY_COPY;
  const metadataItems = [metadata.timeline, metadata.coreStack];

  return (
    <section
      className={`${AI_SUMMARIZER_CASE_STUDY_INTRO_SECTION_CLASS} reveal-on-scroll`}
      data-testid="ai-summarizer-case-study-intro"
      aria-labelledby="ai-summarizer-case-study-title"
    >
      <div className={AI_SUMMARIZER_CASE_STUDY_INTRO_SPLIT_CLASS}>
        <div className={AI_SUMMARIZER_CASE_STUDY_INTRO_COPY_CLASS}>
          <p className={AI_SUMMARIZER_CASE_STUDY_KICKER_CLASS}>{kicker}</p>
          <h1 id="ai-summarizer-case-study-title" className={AI_SUMMARIZER_CASE_STUDY_TITLE_CLASS}>
            {title}
          </h1>
          <p className={AI_SUMMARIZER_CASE_STUDY_DESCRIPTION_CLASS}>{description}</p>
        </div>
        <aside className={AI_SUMMARIZER_CASE_STUDY_METADATA_PANEL_CLASS} data-testid="ai-summarizer-case-study-metadata">
          <dl className={AI_SUMMARIZER_CASE_STUDY_METADATA_LIST_CLASS}>
            {metadataItems.map((item) => (
              <div key={item.label} className={AI_SUMMARIZER_CASE_STUDY_METADATA_ITEM_CLASS}>
                <dt className={AI_SUMMARIZER_CASE_STUDY_METADATA_LABEL_CLASS}>{item.label}</dt>
                <dd className={AI_SUMMARIZER_CASE_STUDY_METADATA_VALUE_CLASS}>{item.value}</dd>
              </div>
            ))}
          </dl>
        </aside>
      </div>
      <img
        className={AI_SUMMARIZER_CASE_STUDY_HERO_IMAGE_CLASS}
        src={heroImage.src}
        srcSet={heroImage.srcSet}
        alt={heroImage.alt}
        loading="eager"
        decoding="async"
      />
    </section>
  );
}
