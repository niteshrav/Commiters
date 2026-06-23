import { MULTI_ROLE_CRM_CASE_STUDY_COPY } from "../lib/multiRoleCrmCaseStudyContent";
import {
  MULTI_ROLE_CRM_CASE_STUDY_HERO_IMAGE_HEIGHT,
  MULTI_ROLE_CRM_CASE_STUDY_HERO_IMAGE_WIDTH,
} from "../lib/multiRoleCrmCaseStudyHeroImage";
import {
  MULTI_ROLE_CRM_CASE_STUDY_HERO_IMAGE_CLASS,
  MULTI_ROLE_CRM_CASE_STUDY_INTRO_COPY_CLASS,
  MULTI_ROLE_CRM_CASE_STUDY_INTRO_STAGE_CLASS,
  MULTI_ROLE_CRM_CASE_STUDY_INTRO_INNER_CLASS,
  MULTI_ROLE_CRM_CASE_STUDY_INTRO_MEDIA_CLASS,
  MULTI_ROLE_CRM_CASE_STUDY_INTRO_SECTION_CLASS,
  MULTI_ROLE_CRM_CASE_STUDY_KICKER_CLASS,
  MULTI_ROLE_CRM_CASE_STUDY_KICKER_ICON_CLASS,
  MULTI_ROLE_CRM_CASE_STUDY_SUBHEADLINE_CLASS,
  MULTI_ROLE_CRM_CASE_STUDY_TITLE_ACCENT_CLASS,
  MULTI_ROLE_CRM_CASE_STUDY_TITLE_CLASS,
  MULTI_ROLE_CRM_CASE_STUDY_TITLE_LEAD_CLASS,
} from "../lib/multiRoleCrmCaseStudyLayout";
import { IconCheckCircle } from "./icons";

export default function MultiRoleCrmCaseStudyIntroSection() {
  const { kicker, titleLead, titleAccent, subheadline, heroImage } = MULTI_ROLE_CRM_CASE_STUDY_COPY;

  return (
    <section
      className={`${MULTI_ROLE_CRM_CASE_STUDY_INTRO_SECTION_CLASS} band-breakout reveal-on-scroll`}
      data-testid="multi-role-crm-case-study-intro"
      aria-labelledby="multi-role-crm-case-study-title"
    >
      <div className={MULTI_ROLE_CRM_CASE_STUDY_INTRO_INNER_CLASS}>
        <div className={MULTI_ROLE_CRM_CASE_STUDY_INTRO_COPY_CLASS}>
          <p className={MULTI_ROLE_CRM_CASE_STUDY_KICKER_CLASS}>
            <span className={MULTI_ROLE_CRM_CASE_STUDY_KICKER_ICON_CLASS} aria-hidden>
              <IconCheckCircle width={16} height={16} />
            </span>
            {kicker}
          </p>
          <h1
            id="multi-role-crm-case-study-title"
            className={MULTI_ROLE_CRM_CASE_STUDY_TITLE_CLASS}
            aria-label={`${titleLead} ${titleAccent}`}
          >
            <span className={MULTI_ROLE_CRM_CASE_STUDY_TITLE_LEAD_CLASS}>{titleLead}</span>
            <span className={MULTI_ROLE_CRM_CASE_STUDY_TITLE_ACCENT_CLASS}>{titleAccent}</span>
          </h1>
          <p className={MULTI_ROLE_CRM_CASE_STUDY_SUBHEADLINE_CLASS}>{subheadline}</p>
        </div>
        <figure className={MULTI_ROLE_CRM_CASE_STUDY_INTRO_MEDIA_CLASS}>
          <div className={MULTI_ROLE_CRM_CASE_STUDY_INTRO_STAGE_CLASS}>
            <img
              className={MULTI_ROLE_CRM_CASE_STUDY_HERO_IMAGE_CLASS}
              src={heroImage.src}
              srcSet={heroImage.srcSet}
              alt={heroImage.alt}
              width={MULTI_ROLE_CRM_CASE_STUDY_HERO_IMAGE_WIDTH}
              height={MULTI_ROLE_CRM_CASE_STUDY_HERO_IMAGE_HEIGHT}
              loading="eager"
              decoding="async"
            />
          </div>
        </figure>
      </div>
    </section>
  );
}
