import { NEXTSAAS_CASE_STUDY_COPY } from "../lib/nextsaasCaseStudyContent";
import {
  NEXTSAAS_CASE_STUDY_INFRASTRUCTURE_BODY_CLASS,
  NEXTSAAS_CASE_STUDY_INFRASTRUCTURE_COPY_CLASS,
  NEXTSAAS_CASE_STUDY_INFRASTRUCTURE_HEADING_CLASS,
  NEXTSAAS_CASE_STUDY_INFRASTRUCTURE_ITEM_CLASS,
  NEXTSAAS_CASE_STUDY_INFRASTRUCTURE_LAYOUT_CLASS,
  NEXTSAAS_CASE_STUDY_INFRASTRUCTURE_LIST_CLASS,
  NEXTSAAS_CASE_STUDY_INFRASTRUCTURE_NUMBER_CLASS,
  NEXTSAAS_CASE_STUDY_INFRASTRUCTURE_SECTION_CLASS,
  NEXTSAAS_CASE_STUDY_INFRASTRUCTURE_TITLE_CLASS,
  NEXTSAAS_CASE_STUDY_INFRASTRUCTURE_VISUAL_CLASS,
  NEXTSAAS_CASE_STUDY_VISUAL_BREAK_BADGE_CLASS,
  NEXTSAAS_CASE_STUDY_VISUAL_BREAK_BADGE_LABEL_CLASS,
  NEXTSAAS_CASE_STUDY_VISUAL_BREAK_BADGE_VALUE_CLASS,
  NEXTSAAS_CASE_STUDY_VISUAL_BREAK_FRAME_CLASS,
  NEXTSAAS_CASE_STUDY_VISUAL_BREAK_IMAGE_CLASS,
} from "../lib/nextsaasCaseStudyLayout";

export default function NextSaasCaseStudyInfrastructureSection() {
  const { infrastructure, visualBreak } = NEXTSAAS_CASE_STUDY_COPY;

  return (
    <section
      className={`${NEXTSAAS_CASE_STUDY_INFRASTRUCTURE_SECTION_CLASS} band-breakout reveal-on-scroll`}
      data-testid="nextsaas-case-study-infrastructure"
      aria-labelledby="nextsaas-case-study-infrastructure-title"
    >
      <div className={NEXTSAAS_CASE_STUDY_INFRASTRUCTURE_LAYOUT_CLASS}>
        <div className={NEXTSAAS_CASE_STUDY_INFRASTRUCTURE_COPY_CLASS}>
          <h2 id="nextsaas-case-study-infrastructure-title" className={NEXTSAAS_CASE_STUDY_INFRASTRUCTURE_HEADING_CLASS}>
            {infrastructure.heading}
          </h2>
          <ol className={NEXTSAAS_CASE_STUDY_INFRASTRUCTURE_LIST_CLASS}>
            {infrastructure.items.map((step) => (
              <li key={step.id} className={NEXTSAAS_CASE_STUDY_INFRASTRUCTURE_ITEM_CLASS}>
                <span className={NEXTSAAS_CASE_STUDY_INFRASTRUCTURE_NUMBER_CLASS} aria-hidden>
                  {step.number}
                </span>
                <div>
                  <h3 className={NEXTSAAS_CASE_STUDY_INFRASTRUCTURE_TITLE_CLASS}>{step.title}</h3>
                  <p className={NEXTSAAS_CASE_STUDY_INFRASTRUCTURE_BODY_CLASS}>{step.body}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
        <figure className={`${NEXTSAAS_CASE_STUDY_INFRASTRUCTURE_VISUAL_CLASS} ${NEXTSAAS_CASE_STUDY_VISUAL_BREAK_FRAME_CLASS}`}>
          <img
            className={NEXTSAAS_CASE_STUDY_VISUAL_BREAK_IMAGE_CLASS}
            src={visualBreak.image.src}
            srcSet={visualBreak.image.srcSet}
            alt={visualBreak.image.alt}
            loading="lazy"
            decoding="async"
          />
          <figcaption className={NEXTSAAS_CASE_STUDY_VISUAL_BREAK_BADGE_CLASS}>
            <span className={NEXTSAAS_CASE_STUDY_VISUAL_BREAK_BADGE_LABEL_CLASS}>{visualBreak.badgeLabel}</span>
            <span className={NEXTSAAS_CASE_STUDY_VISUAL_BREAK_BADGE_VALUE_CLASS}>{visualBreak.badgeValue}</span>
          </figcaption>
        </figure>
      </div>
    </section>
  );
}
