import { IconCheckCircle } from "./icons";
import { MULTI_ROLE_CRM_CASE_STUDY_COPY } from "../lib/multiRoleCrmCaseStudyContent";
import {
  MULTI_ROLE_CRM_CASE_STUDY_HERO_IMAGE_HEIGHT,
  MULTI_ROLE_CRM_CASE_STUDY_HERO_IMAGE_WIDTH,
} from "../lib/multiRoleCrmCaseStudyHeroImage";
import {
  MULTI_ROLE_CRM_CASE_STUDY_HERO_IMAGE_CLASS,
  MULTI_ROLE_CRM_CASE_STUDY_INTRO_COPY_CLASS,
  MULTI_ROLE_CRM_CASE_STUDY_INTRO_INNER_CLASS,
  MULTI_ROLE_CRM_CASE_STUDY_INTRO_MEDIA_CLASS,
  MULTI_ROLE_CRM_CASE_STUDY_INTRO_SECTION_CLASS,
  MULTI_ROLE_CRM_CASE_STUDY_INTRO_STAGE_CLASS,
  MULTI_ROLE_CRM_CASE_STUDY_KICKER_CLASS,
  MULTI_ROLE_CRM_CASE_STUDY_KICKER_ICON_CLASS,
  MULTI_ROLE_CRM_CASE_STUDY_SUBHEADLINE_CLASS,
  MULTI_ROLE_CRM_CASE_STUDY_TITLE_ACCENT_CLASS,
  MULTI_ROLE_CRM_CASE_STUDY_TITLE_CLASS,
  MULTI_ROLE_CRM_CASE_STUDY_TITLE_LEAD_CLASS,
} from "../lib/multiRoleCrmCaseStudyLayout";

export default function MultiRoleCrmCaseStudyIntroSection() {
  const copy = MULTI_ROLE_CRM_CASE_STUDY_COPY;
  const { heroImage } = copy;

  return (
    <header
      className={`${MULTI_ROLE_CRM_CASE_STUDY_INTRO_SECTION_CLASS} band-breakout`}
      data-testid="multi-role-crm-case-study-intro"
    >
      <div className={MULTI_ROLE_CRM_CASE_STUDY_INTRO_INNER_CLASS}>
        <div className={MULTI_ROLE_CRM_CASE_STUDY_INTRO_COPY_CLASS}>
          <p className={MULTI_ROLE_CRM_CASE_STUDY_KICKER_CLASS}>
            <IconCheckCircle className={MULTI_ROLE_CRM_CASE_STUDY_KICKER_ICON_CLASS} width={14} height={14} />
            {copy.kicker}
          </p>
          <h1 className={MULTI_ROLE_CRM_CASE_STUDY_TITLE_CLASS}>
            <span className={MULTI_ROLE_CRM_CASE_STUDY_TITLE_LEAD_CLASS}>{copy.titleLead}</span>
            <span className={MULTI_ROLE_CRM_CASE_STUDY_TITLE_ACCENT_CLASS}>{copy.titleAccent}</span>
          </h1>
          <p className={MULTI_ROLE_CRM_CASE_STUDY_SUBHEADLINE_CLASS}>{copy.subheadline}</p>
        </div>
        <div className={MULTI_ROLE_CRM_CASE_STUDY_INTRO_MEDIA_CLASS}>
          <div className={MULTI_ROLE_CRM_CASE_STUDY_INTRO_STAGE_CLASS}>
            <img
              className={MULTI_ROLE_CRM_CASE_STUDY_HERO_IMAGE_CLASS}
              src={heroImage.src}
              srcSet={heroImage.srcSet}
              width={MULTI_ROLE_CRM_CASE_STUDY_HERO_IMAGE_WIDTH}
              height={MULTI_ROLE_CRM_CASE_STUDY_HERO_IMAGE_HEIGHT}
              alt={heroImage.alt}
            />
          </div>
        </div>
      </div>
    </header>
  );
}
