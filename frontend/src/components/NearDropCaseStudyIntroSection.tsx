import { Link } from "react-router-dom";
import { NEARDROP_CASE_STUDY_COPY } from "../lib/neardropCaseStudyContent";
import { resolveTechIconUrl } from "../lib/homeTechStack";
import {
  NEARDROP_CASE_STUDY_DESCRIPTION_CLASS,
  NEARDROP_CASE_STUDY_HERO_IMAGE_CLASS,
  NEARDROP_CASE_STUDY_INTRO_ACTIONS_CLASS,
  NEARDROP_CASE_STUDY_INTRO_COPY_CLASS,
  NEARDROP_CASE_STUDY_INTRO_INNER_CLASS,
  NEARDROP_CASE_STUDY_INTRO_MEDIA_CLASS,
  NEARDROP_CASE_STUDY_INTRO_SECTION_CLASS,
  NEARDROP_CASE_STUDY_INTRO_STACK_CLASS,
  NEARDROP_CASE_STUDY_INTRO_STACK_ITEM_CLASS,
  NEARDROP_CASE_STUDY_KICKER_CLASS,
  NEARDROP_CASE_STUDY_TITLE_ACCENT_CLASS,
  NEARDROP_CASE_STUDY_TITLE_CLASS,
  NEARDROP_CASE_STUDY_TITLE_LEAD_CLASS,
  NEARDROP_CASE_STUDY_TITLE_TRAIL_CLASS,
} from "../lib/neardropCaseStudyLayout";
import { IconArrowRight, IconGitHub } from "./icons";

export default function NearDropCaseStudyIntroSection() {
  const { kicker, titleLead, titleAccent, titleTrail, description, heroImage, heroActions, introStack } =
    NEARDROP_CASE_STUDY_COPY;

  return (
    <section
      className={`${NEARDROP_CASE_STUDY_INTRO_SECTION_CLASS} reveal-on-scroll`}
      data-testid="neardrop-case-study-intro"
      aria-labelledby="neardrop-case-study-title"
    >
      <div className={NEARDROP_CASE_STUDY_INTRO_INNER_CLASS}>
        <div className={NEARDROP_CASE_STUDY_INTRO_COPY_CLASS}>
          <p className={NEARDROP_CASE_STUDY_KICKER_CLASS}>{kicker}</p>
          <h1
            id="neardrop-case-study-title"
            className={NEARDROP_CASE_STUDY_TITLE_CLASS}
            aria-label={`${titleLead}${titleAccent}${titleTrail}`}
          >
            <span className={NEARDROP_CASE_STUDY_TITLE_LEAD_CLASS}>{titleLead}</span>
            <span className={NEARDROP_CASE_STUDY_TITLE_ACCENT_CLASS}>{titleAccent}</span>
            <span className={NEARDROP_CASE_STUDY_TITLE_TRAIL_CLASS}>{titleTrail}</span>
          </h1>
          <p className={NEARDROP_CASE_STUDY_DESCRIPTION_CLASS}>{description}</p>
          <ul className={NEARDROP_CASE_STUDY_INTRO_STACK_CLASS} data-testid="neardrop-case-study-intro-stack">
            {introStack.items.map((item) => (
              <li key={item.slug} className={NEARDROP_CASE_STUDY_INTRO_STACK_ITEM_CLASS}>
                <img src={resolveTechIconUrl(item)} alt="" width={18} height={18} />
                {item.alt}
              </li>
            ))}
          </ul>
          <div className={NEARDROP_CASE_STUDY_INTRO_ACTIONS_CLASS}>
            <Link className="neardrop-case-study-intro-primary" to={heroActions.primaryTo}>
              {heroActions.primaryLabel}
              <IconArrowRight width={16} height={16} />
            </Link>
            <a
              className="neardrop-case-study-intro-source"
              href={heroActions.sourceHref}
              target="_blank"
              rel="noreferrer"
            >
              <IconGitHub width={18} height={18} />
              {heroActions.sourceLabel}
            </a>
          </div>
        </div>
        <div className={NEARDROP_CASE_STUDY_INTRO_MEDIA_CLASS}>
          <img className={NEARDROP_CASE_STUDY_HERO_IMAGE_CLASS} src={heroImage.src} alt={heroImage.alt} />
        </div>
      </div>
    </section>
  );
}
