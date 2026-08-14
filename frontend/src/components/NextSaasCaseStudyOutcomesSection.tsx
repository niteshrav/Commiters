import { NEXTSAAS_CASE_STUDY_COPY } from "../lib/nextsaasCaseStudyContent";
import {
  NEXTSAAS_CASE_STUDY_METADATA_ITEM_CLASS,
  NEXTSAAS_CASE_STUDY_METADATA_LABEL_CLASS,
  NEXTSAAS_CASE_STUDY_METADATA_LIST_CLASS,
  NEXTSAAS_CASE_STUDY_METADATA_PANEL_CLASS,
  NEXTSAAS_CASE_STUDY_METADATA_VALUE_CLASS,
  NEXTSAAS_CASE_STUDY_OUTCOME_BODY_CLASS,
  NEXTSAAS_CASE_STUDY_OUTCOME_CARD_CLASS,
  NEXTSAAS_CASE_STUDY_OUTCOME_LABEL_CLASS,
  NEXTSAAS_CASE_STUDY_OUTCOME_VALUE_CLASS,
  NEXTSAAS_CASE_STUDY_OUTCOMES_DESCRIPTION_CLASS,
  NEXTSAAS_CASE_STUDY_OUTCOMES_GRID_CLASS,
  NEXTSAAS_CASE_STUDY_OUTCOMES_HEADING_CLASS,
  NEXTSAAS_CASE_STUDY_OUTCOMES_LAYOUT_CLASS,
  NEXTSAAS_CASE_STUDY_OUTCOMES_SECTION_CLASS,
} from "../lib/nextsaasCaseStudyLayout";

export default function NextSaasCaseStudyOutcomesSection() {
  const { outcomes } = NEXTSAAS_CASE_STUDY_COPY;

  return (
    <section
      className={`${NEXTSAAS_CASE_STUDY_OUTCOMES_SECTION_CLASS} reveal-on-scroll`}
      data-testid="nextsaas-case-study-outcomes"
      aria-labelledby="nextsaas-case-study-outcomes-title"
    >
      <div className={NEXTSAAS_CASE_STUDY_OUTCOMES_LAYOUT_CLASS}>
        <div>
          <h2 id="nextsaas-case-study-outcomes-title" className={NEXTSAAS_CASE_STUDY_OUTCOMES_HEADING_CLASS}>
            {outcomes.heading}
          </h2>
          <p className={NEXTSAAS_CASE_STUDY_OUTCOMES_DESCRIPTION_CLASS}>{outcomes.description}</p>
        </div>
        <div className={NEXTSAAS_CASE_STUDY_OUTCOMES_GRID_CLASS}>
          {outcomes.items.map((item) => (
            <article key={item.id} className={NEXTSAAS_CASE_STUDY_OUTCOME_CARD_CLASS}>
              <p className={NEXTSAAS_CASE_STUDY_OUTCOME_LABEL_CLASS}>{item.label}</p>
              <p className={NEXTSAAS_CASE_STUDY_OUTCOME_VALUE_CLASS}>{item.value}</p>
              <p className={NEXTSAAS_CASE_STUDY_OUTCOME_BODY_CLASS}>{item.body}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export function NextSaasCaseStudyMetadataPanel() {
  const { metadata } = NEXTSAAS_CASE_STUDY_COPY;
  const metadataItems = [metadata.timeline, metadata.coreStack, metadata.client, metadata.liveSite];

  return (
    <aside className={NEXTSAAS_CASE_STUDY_METADATA_PANEL_CLASS} data-testid="nextsaas-case-study-metadata">
      <dl className={NEXTSAAS_CASE_STUDY_METADATA_LIST_CLASS}>
        {metadataItems.map((item) => (
          <div key={item.label} className={NEXTSAAS_CASE_STUDY_METADATA_ITEM_CLASS}>
            <dt className={NEXTSAAS_CASE_STUDY_METADATA_LABEL_CLASS}>{item.label}</dt>
            <dd className={NEXTSAAS_CASE_STUDY_METADATA_VALUE_CLASS}>
              {"href" in item && item.href ? (
                <a href={item.href} target="_blank" rel="noopener noreferrer">
                  {item.value}
                </a>
              ) : (
                item.value
              )}
            </dd>
          </div>
        ))}
      </dl>
    </aside>
  );
}
