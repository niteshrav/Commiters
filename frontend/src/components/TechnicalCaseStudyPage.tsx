import { Link } from "react-router-dom";
import type { TechnicalCaseStudyCopy, TechnicalCaseStudyFeature } from "../lib/technicalCaseStudy";
import { resolveTechIconUrl } from "../lib/homeTechStack";
import {
  COMMITERS_CASE_STUDY_ARCHITECTURE_GRID_CLASS,
  COMMITERS_CASE_STUDY_ARCHITECTURE_HEADING_CLASS,
  COMMITERS_CASE_STUDY_ARCHITECTURE_ITEM_BODY_CLASS,
  COMMITERS_CASE_STUDY_ARCHITECTURE_ITEM_CLASS,
  COMMITERS_CASE_STUDY_ARCHITECTURE_ITEM_TITLE_CLASS,
  COMMITERS_CASE_STUDY_ARCHITECTURE_LIST_CLASS,
  COMMITERS_CASE_STUDY_ARCHITECTURE_SECTION_CLASS,
  COMMITERS_CASE_STUDY_BOTTOM_CTA_ACTIONS_CLASS,
  COMMITERS_CASE_STUDY_BOTTOM_CTA_BTN_CLASS,
  COMMITERS_CASE_STUDY_BOTTOM_CTA_INNER_CLASS,
  COMMITERS_CASE_STUDY_BOTTOM_CTA_PRIMARY_CLASS,
  COMMITERS_CASE_STUDY_BOTTOM_CTA_SECONDARY_CLASS,
  COMMITERS_CASE_STUDY_BOTTOM_CTA_SECTION_CLASS,
  COMMITERS_CASE_STUDY_BOTTOM_CTA_SUBTEXT_CLASS,
  COMMITERS_CASE_STUDY_BOTTOM_CTA_TITLE_CLASS,
  COMMITERS_CASE_STUDY_CORE_STACK_CLASS,
  COMMITERS_CASE_STUDY_CORE_STACK_HEADING_CLASS,
  COMMITERS_CASE_STUDY_CORE_STACK_ICON_CLASS,
  COMMITERS_CASE_STUDY_CORE_STACK_ITEM_CLASS,
  COMMITERS_CASE_STUDY_CORE_STACK_LIST_CLASS,
  COMMITERS_CASE_STUDY_FEATURE_BODY_CLASS,
  COMMITERS_CASE_STUDY_FEATURE_CARD_CLASS,
  COMMITERS_CASE_STUDY_FEATURE_GRID_CLASS,
  COMMITERS_CASE_STUDY_FEATURE_ICON_CLASS,
  COMMITERS_CASE_STUDY_FEATURE_TITLE_CLASS,
  COMMITERS_CASE_STUDY_FEATURES_SECTION_CLASS,
  COMMITERS_CASE_STUDY_HIGHLIGHT_BODY_CLASS,
  COMMITERS_CASE_STUDY_HIGHLIGHT_CARD_CLASS,
  COMMITERS_CASE_STUDY_HIGHLIGHT_GRID_CLASS,
  COMMITERS_CASE_STUDY_HIGHLIGHT_LABEL_CLASS,
  COMMITERS_CASE_STUDY_INTRO_INNER_CLASS,
  COMMITERS_CASE_STUDY_INTRO_SECTION_CLASS,
  COMMITERS_CASE_STUDY_KICKER_CLASS,
  COMMITERS_CASE_STUDY_OVERVIEW_BODY_CLASS,
  COMMITERS_CASE_STUDY_OVERVIEW_GRID_CLASS,
  COMMITERS_CASE_STUDY_OVERVIEW_HEADING_CLASS,
  COMMITERS_CASE_STUDY_OVERVIEW_MAIN_CLASS,
  COMMITERS_CASE_STUDY_OVERVIEW_SECTION_CLASS,
  COMMITERS_CASE_STUDY_PAGE_CLASS,
  COMMITERS_CASE_STUDY_SUBTITLE_CLASS,
  COMMITERS_CASE_STUDY_TITLE_CLASS,
} from "../lib/commitersCaseStudyLayout";
import { IconBolt, IconLayers, IconSearch } from "./icons";

type Props = {
  copy: TechnicalCaseStudyCopy;
};

function FeatureIcon({ icon }: { icon: TechnicalCaseStudyFeature["icon"] }) {
  if (icon === "seo") return <IconSearch width={28} height={28} />;
  if (icon === "minimalist") return <IconLayers width={28} height={28} />;
  return <IconBolt width={28} height={28} />;
}

function primaryCtaClass(variant: TechnicalCaseStudyCopy["bottomCta"]["primaryVariant"]): string {
  const tone = variant === "gold-blue" ? "technical-case-study-cta--gold-blue" : "technical-case-study-cta--cyan-glow";
  return `${COMMITERS_CASE_STUDY_BOTTOM_CTA_BTN_CLASS} ${COMMITERS_CASE_STUDY_BOTTOM_CTA_PRIMARY_CLASS} ${tone}`;
}

export default function TechnicalCaseStudyPage({ copy }: Props) {
  const { pageId, bottomCta } = copy;

  return (
    <div className={`${COMMITERS_CASE_STUDY_PAGE_CLASS} technical-case-study-page`} data-testid={`${pageId}-case-study-page`}>
      <section
        className={`${COMMITERS_CASE_STUDY_INTRO_SECTION_CLASS} reveal-on-scroll`}
        data-testid={`${pageId}-case-study-intro`}
        aria-labelledby={`${pageId}-case-study-title`}
      >
        <div className={COMMITERS_CASE_STUDY_INTRO_INNER_CLASS}>
          <p className={COMMITERS_CASE_STUDY_KICKER_CLASS}>{copy.kicker}</p>
          <h1 id={`${pageId}-case-study-title`} className={COMMITERS_CASE_STUDY_TITLE_CLASS}>
            {copy.title}
          </h1>
          <p className={COMMITERS_CASE_STUDY_SUBTITLE_CLASS}>{copy.subtitle}</p>
        </div>
      </section>

      <section className={COMMITERS_CASE_STUDY_OVERVIEW_SECTION_CLASS}>
        <div className={COMMITERS_CASE_STUDY_OVERVIEW_GRID_CLASS}>
          <div className={COMMITERS_CASE_STUDY_OVERVIEW_MAIN_CLASS} data-testid={`${pageId}-case-study-overview`}>
            <h2 className={COMMITERS_CASE_STUDY_OVERVIEW_HEADING_CLASS}>{copy.overview.heading}</h2>
            <p className={COMMITERS_CASE_STUDY_OVERVIEW_BODY_CLASS}>{copy.overview.body}</p>
            <div className={`${COMMITERS_CASE_STUDY_HIGHLIGHT_GRID_CLASS} commiters-case-study-highlight-grid--trio`}>
              {copy.metrics.map((metric) => (
                <article key={metric.id} className={COMMITERS_CASE_STUDY_HIGHLIGHT_CARD_CLASS}>
                  <p className={COMMITERS_CASE_STUDY_HIGHLIGHT_LABEL_CLASS}>{metric.label}</p>
                  <p className={COMMITERS_CASE_STUDY_HIGHLIGHT_BODY_CLASS}>{metric.value}</p>
                </article>
              ))}
            </div>
          </div>

          <aside
            className={`${COMMITERS_CASE_STUDY_CORE_STACK_CLASS} commiters-case-study-core-stack--slate`}
            data-testid={`${pageId}-case-study-core-stack`}
          >
            <h2 className={COMMITERS_CASE_STUDY_CORE_STACK_HEADING_CLASS}>{copy.coreStack.heading}</h2>
            <ul className={COMMITERS_CASE_STUDY_CORE_STACK_LIST_CLASS}>
              {copy.coreStack.items.map((item) => (
                <li key={item.slug + item.title} className={COMMITERS_CASE_STUDY_CORE_STACK_ITEM_CLASS}>
                  <span className={COMMITERS_CASE_STUDY_CORE_STACK_ICON_CLASS} aria-hidden>
                    <img
                      src={resolveTechIconUrl(item)}
                      alt={`${item.title} technology logo`}
                      width={28}
                      height={28}
                      loading="lazy"
                      decoding="async"
                    />
                  </span>
                  <span>
                    <strong>{item.title}</strong>
                    <span>{item.subtitle}</span>
                  </span>
                </li>
              ))}
            </ul>
          </aside>
        </div>
      </section>

      <section
        className={COMMITERS_CASE_STUDY_ARCHITECTURE_SECTION_CLASS}
        data-testid={`${pageId}-case-study-architecture`}
        aria-labelledby={`${pageId}-case-study-architecture-title`}
      >
        <div className={COMMITERS_CASE_STUDY_ARCHITECTURE_GRID_CLASS}>
          <h2 id={`${pageId}-case-study-architecture-title`} className={COMMITERS_CASE_STUDY_ARCHITECTURE_HEADING_CLASS}>
            {copy.architecture.heading}
          </h2>
          <div className={COMMITERS_CASE_STUDY_ARCHITECTURE_LIST_CLASS}>
            {copy.architecture.sections.map((section) => (
              <article key={section.id} className={COMMITERS_CASE_STUDY_ARCHITECTURE_ITEM_CLASS}>
                <h3 className={COMMITERS_CASE_STUDY_ARCHITECTURE_ITEM_TITLE_CLASS}>{section.title}</h3>
                <p className={COMMITERS_CASE_STUDY_ARCHITECTURE_ITEM_BODY_CLASS}>{section.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className={COMMITERS_CASE_STUDY_FEATURES_SECTION_CLASS} data-testid={`${pageId}-case-study-features`}>
        <div className={COMMITERS_CASE_STUDY_FEATURE_GRID_CLASS}>
          {copy.features.map((feature) => (
            <article key={feature.id} className={COMMITERS_CASE_STUDY_FEATURE_CARD_CLASS}>
              <span className={COMMITERS_CASE_STUDY_FEATURE_ICON_CLASS} aria-hidden>
                <FeatureIcon icon={feature.icon} />
              </span>
              <h3 className={COMMITERS_CASE_STUDY_FEATURE_TITLE_CLASS}>{feature.title}</h3>
              <p className={COMMITERS_CASE_STUDY_FEATURE_BODY_CLASS}>{feature.body}</p>
            </article>
          ))}
        </div>
      </section>

      <section
        className={`${COMMITERS_CASE_STUDY_BOTTOM_CTA_SECTION_CLASS} reveal-on-scroll`}
        data-testid={`${pageId}-case-study-bottom-cta`}
        aria-labelledby={`${pageId}-case-study-bottom-cta-title`}
      >
        <div className={COMMITERS_CASE_STUDY_BOTTOM_CTA_INNER_CLASS}>
          <h2 id={`${pageId}-case-study-bottom-cta-title`} className={COMMITERS_CASE_STUDY_BOTTOM_CTA_TITLE_CLASS}>
            {bottomCta.title}
          </h2>
          <p className={COMMITERS_CASE_STUDY_BOTTOM_CTA_SUBTEXT_CLASS}>{bottomCta.subtext}</p>
          <div className={COMMITERS_CASE_STUDY_BOTTOM_CTA_ACTIONS_CLASS}>
            <Link className={primaryCtaClass(bottomCta.primaryVariant)} to={bottomCta.primaryTo}>
              {bottomCta.primaryLabel}
            </Link>
            <Link
              className={`${COMMITERS_CASE_STUDY_BOTTOM_CTA_BTN_CLASS} ${COMMITERS_CASE_STUDY_BOTTOM_CTA_SECONDARY_CLASS}`}
              to={bottomCta.secondaryTo}
            >
              {bottomCta.secondaryLabel}
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
