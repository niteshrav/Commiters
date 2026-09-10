import { CASE_STUDIES_PAGE_DESIGN } from "../lib/caseStudiesPageDesign";
import {
  CASE_STUDIES_INTRO_INNER_CLASS,
  CASE_STUDIES_INTRO_KICKER_CLASS,
  CASE_STUDIES_INTRO_SECTION_CLASS,
  CASE_STUDIES_INTRO_SUBTEXT_CLASS,
  CASE_STUDIES_INTRO_TITLE_ACCENT_CLASS,
  CASE_STUDIES_INTRO_TITLE_CLASS,
} from "../lib/caseStudiesPageLayout";
import { IconArrowRight, IconCloud, IconLayers, IconRocket, IconWorkflow } from "./icons";

const HERO_ICONS = [IconWorkflow, IconCloud, IconLayers, IconRocket] as const;

export default function CaseStudiesIntroSection() {
  const { hero } = CASE_STUDIES_PAGE_DESIGN;

  return (
    <section
      className={`${CASE_STUDIES_INTRO_SECTION_CLASS} work-hero reveal-on-scroll`}
      data-testid="case-studies-intro-section"
      aria-labelledby="case-studies-intro-title"
    >
      <div className={`${CASE_STUDIES_INTRO_INNER_CLASS} work-hero-grid`}>
        <div className="work-hero-copy">
          <p className={CASE_STUDIES_INTRO_KICKER_CLASS}>{hero.kicker}</p>
          <h1 id="case-studies-intro-title" className={CASE_STUDIES_INTRO_TITLE_CLASS}>
            <span className="work-hero-title-lead">{hero.titleLead}</span>
            {" "}
            <span className={CASE_STUDIES_INTRO_TITLE_ACCENT_CLASS}>{hero.titleAccent}</span>
          </h1>
          <p className={CASE_STUDIES_INTRO_SUBTEXT_CLASS}>{hero.subtext}</p>
          <a className="btn btn-primary work-hero-cta" href={hero.ctaHref}>
            {hero.ctaLabel}
            <IconArrowRight width={16} height={16} aria-hidden />
          </a>
        </div>

        <div className="work-hero-visual" aria-hidden="true">
          <span className="work-hero-dots" />
          <div className="work-hero-stack">
            {hero.visual.map((item, index) => {
              const Icon = HERO_ICONS[index] ?? IconLayers;
              return (
                <p key={item.id} className={`work-hero-chip work-hero-chip--${index}`}>
                  <Icon width={16} height={16} />
                  {item.label}
                </p>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
