import { Link } from "react-router-dom";
import type { TechnicalCaseStudyCopy, TechnicalCaseStudyFeature } from "../lib/technicalCaseStudy";
import { resolveTechIconUrl } from "../lib/homeTechStack";
import { ECOROUTE_DISPLAY } from "../lib/ecoRouteCaseStudyDesign";
import {
  COMMITERS_CASE_STUDY_ARCHITECTURE_GRID_CLASS,
  COMMITERS_CASE_STUDY_ARCHITECTURE_HEADING_BLOCK_CLASS,
  COMMITERS_CASE_STUDY_ARCHITECTURE_HEADING_CLASS,
  COMMITERS_CASE_STUDY_ARCHITECTURE_ITEM_BODY_CLASS,
  COMMITERS_CASE_STUDY_ARCHITECTURE_ITEM_CLASS,
  COMMITERS_CASE_STUDY_ARCHITECTURE_ITEM_ICON_CLASS,
  COMMITERS_CASE_STUDY_ARCHITECTURE_ITEM_TITLE_CLASS,
  COMMITERS_CASE_STUDY_ARCHITECTURE_KICKER_CLASS,
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
  ECOROUTE_CASE_STUDY_PAGE_CLASS,
  ECOROUTE_HERO_ACTIONS_CLASS,
  ECOROUTE_HERO_CHIP_CLASS,
  ECOROUTE_HERO_CHIPS_CLASS,
  ECOROUTE_HERO_COPY_CLASS,
  ECOROUTE_HERO_LEAD_CLASS,
  ECOROUTE_HERO_NAME_CLASS,
  ECOROUTE_HERO_TAGLINE_CLASS,
  ECOROUTE_HERO_VISUAL_CLASS,
  ECOROUTE_METRIC_FIGURE_CLASS,
  ECOROUTE_METRIC_ICON_CLASS,
  ECOROUTE_SR_COPY_CLASS,
  PROSPECTIQ_CASE_STUDY_PAGE_CLASS,
  PROSPECTIQ_DISPLAY_HEADING_CLASS,
  PROSPECTIQ_HERO_ACTIONS_CLASS,
  PROSPECTIQ_HERO_CHIP_CLASS,
  PROSPECTIQ_HERO_CHIPS_CLASS,
  PROSPECTIQ_HERO_COPY_CLASS,
  PROSPECTIQ_HERO_VISUAL_CLASS,
  PROSPECTIQ_METRIC_ICON_CLASS,
} from "../lib/commitersCaseStudyLayout";
import { ArchitectureItemIcon } from "./ArchitectureItemIcon";
import { IconBolt, IconCloud, IconGauge, IconGlobe, IconLayers, IconSearch, IconShieldCheck } from "./icons";

type Props = {
  copy: TechnicalCaseStudyCopy;
};

function FeatureIcon({ icon }: { icon: TechnicalCaseStudyFeature["icon"] }) {
  if (icon === "seo") return <IconSearch width={18} height={18} />;
  if (icon === "minimalist") return <IconLayers width={18} height={18} />;
  return <IconBolt width={18} height={18} />;
}

function primaryCtaClass(variant: TechnicalCaseStudyCopy["bottomCta"]["primaryVariant"]): string {
  const tone = variant === "gold-blue" ? "technical-case-study-cta--gold-blue" : "technical-case-study-cta--cyan-glow";
  return `${COMMITERS_CASE_STUDY_BOTTOM_CTA_BTN_CLASS} ${COMMITERS_CASE_STUDY_BOTTOM_CTA_PRIMARY_CLASS} ${tone}`;
}

function secondaryCtaClass(): string {
  return `${COMMITERS_CASE_STUDY_BOTTOM_CTA_BTN_CLASS} ${COMMITERS_CASE_STUDY_BOTTOM_CTA_SECONDARY_CLASS}`;
}

function MetricIcon({ id }: { id: string }) {
  if (id === "accuracy" || id === "latency") return <IconGauge width={22} height={22} />;
  if (id === "governance") return <IconShieldCheck width={22} height={22} />;
  if (id === "emissions") return <IconGlobe width={22} height={22} />;
  if (id === "uptime") return <IconCloud width={22} height={22} />;
  return <IconBolt width={22} height={22} />;
}

export default function TechnicalCaseStudyPage({ copy }: Props) {
  const { pageId, bottomCta } = copy;
  const isProspectIq = pageId === "prospectiq";
  const isEcoRoute = pageId === "ecoroute";
  const isSplitHero = isProspectIq || isEcoRoute;
  const pageClassName = [
    COMMITERS_CASE_STUDY_PAGE_CLASS,
    "technical-case-study-page",
    isProspectIq ? PROSPECTIQ_CASE_STUDY_PAGE_CLASS : "",
    isEcoRoute ? ECOROUTE_CASE_STUDY_PAGE_CLASS : "",
  ]
    .filter(Boolean)
    .join(" ");

  const heroImage = copy.heroImage ? (
    <img
      className="technical-case-study-hero-image"
      data-testid={`${pageId}-case-study-hero-image`}
      src={copy.heroImage.src}
      alt={copy.heroImage.alt}
      loading="eager"
      decoding="async"
    />
  ) : null;

  const heroActions = (
    <div className={isEcoRoute ? ECOROUTE_HERO_ACTIONS_CLASS : PROSPECTIQ_HERO_ACTIONS_CLASS}>
      <Link className={primaryCtaClass(bottomCta.primaryVariant)} to={bottomCta.primaryTo}>
        {bottomCta.primaryLabel}
      </Link>
      <Link className={secondaryCtaClass()} to={bottomCta.secondaryTo}>
        {bottomCta.secondaryLabel}
      </Link>
    </div>
  );

  const [heroName, heroRest] = copy.title.includes(" — ")
    ? (copy.title.split(" — ") as [string, string])
    : [copy.title, ""];

  return (
    <div className={pageClassName} data-testid={`${pageId}-case-study-page`}>
      <section
        className={`${COMMITERS_CASE_STUDY_INTRO_SECTION_CLASS} reveal-on-scroll`}
        data-testid={`${pageId}-case-study-intro`}
        aria-labelledby={`${pageId}-case-study-title`}
      >
        <div className={COMMITERS_CASE_STUDY_INTRO_INNER_CLASS}>
          {isSplitHero ? (
            <>
              <div className={isEcoRoute ? ECOROUTE_HERO_COPY_CLASS : PROSPECTIQ_HERO_COPY_CLASS}>
                <p className={COMMITERS_CASE_STUDY_KICKER_CLASS}>{copy.kicker}</p>
                <h1 id={`${pageId}-case-study-title`} className={COMMITERS_CASE_STUDY_TITLE_CLASS}>
                  {isEcoRoute ? (
                    <>
                      <span className={ECOROUTE_HERO_NAME_CLASS} aria-hidden="true">
                        {heroName}
                      </span>
                      <span className={ECOROUTE_SR_COPY_CLASS}>{copy.title}</span>
                    </>
                  ) : (
                    copy.title
                  )}
                </h1>
                {isEcoRoute ? <p className={ECOROUTE_HERO_TAGLINE_CLASS}>{ECOROUTE_DISPLAY.heroTagline}</p> : null}
                {isEcoRoute ? <p className={ECOROUTE_HERO_LEAD_CLASS}>{ECOROUTE_DISPLAY.heroLead}</p> : null}
                <p className={`${COMMITERS_CASE_STUDY_SUBTITLE_CLASS}${isEcoRoute ? ` ${ECOROUTE_SR_COPY_CLASS}` : ""}`}>
                  {copy.subtitle}
                </p>
                {heroActions}
              </div>
              {heroImage ? (
                <div className={isEcoRoute ? ECOROUTE_HERO_VISUAL_CLASS : PROSPECTIQ_HERO_VISUAL_CLASS}>
                  <ul
                    className={isEcoRoute ? ECOROUTE_HERO_CHIPS_CLASS : PROSPECTIQ_HERO_CHIPS_CLASS}
                    aria-hidden
                  >
                    {isEcoRoute ? (
                      ECOROUTE_DISPLAY.heroChips.map((chip) => (
                        <li key={chip} className={ECOROUTE_HERO_CHIP_CLASS}>
                          {chip}
                        </li>
                      ))
                    ) : (
                      <>
                        <li className={PROSPECTIQ_HERO_CHIP_CLASS}>{copy.coreStack.items[2]?.title}</li>
                        <li className={PROSPECTIQ_HERO_CHIP_CLASS}>{copy.metrics[0]?.value}</li>
                        <li className={PROSPECTIQ_HERO_CHIP_CLASS}>{copy.features[1]?.title}</li>
                      </>
                    )}
                  </ul>
                  {heroImage}
                </div>
              ) : null}
            </>
          ) : (
            <>
              <p className={COMMITERS_CASE_STUDY_KICKER_CLASS}>{copy.kicker}</p>
              <h1 id={`${pageId}-case-study-title`} className={COMMITERS_CASE_STUDY_TITLE_CLASS}>
                {copy.title}
              </h1>
              <p className={COMMITERS_CASE_STUDY_SUBTITLE_CLASS}>{copy.subtitle}</p>
              {heroImage}
            </>
          )}
        </div>
      </section>

      <section className={`${COMMITERS_CASE_STUDY_OVERVIEW_SECTION_CLASS} reveal-on-scroll`}>
        <div className={COMMITERS_CASE_STUDY_OVERVIEW_GRID_CLASS}>
          <div className={COMMITERS_CASE_STUDY_OVERVIEW_MAIN_CLASS} data-testid={`${pageId}-case-study-overview`}>
            {isProspectIq || isEcoRoute ? <p className={COMMITERS_CASE_STUDY_KICKER_CLASS}>{copy.overview.heading}</p> : null}
            <h2 className={COMMITERS_CASE_STUDY_OVERVIEW_HEADING_CLASS}>
              {isProspectIq
                ? "Faster. Accurate. Compliant."
                : isEcoRoute
                  ? ECOROUTE_DISPLAY.metricsHeading
                  : copy.overview.heading}
            </h2>
            <p className={`${COMMITERS_CASE_STUDY_OVERVIEW_BODY_CLASS}${isEcoRoute ? ` ${ECOROUTE_SR_COPY_CLASS}` : ""}`}>
              {copy.overview.body}
            </p>
            <div className={`${COMMITERS_CASE_STUDY_HIGHLIGHT_GRID_CLASS} commiters-case-study-highlight-grid--trio`}>
              {copy.metrics.map((metric) => {
                const figure =
                  isEcoRoute && metric.id in ECOROUTE_DISPLAY.metricFigures
                    ? ECOROUTE_DISPLAY.metricFigures[metric.id as keyof typeof ECOROUTE_DISPLAY.metricFigures]
                    : null;
                return (
                  <article key={metric.id} className={COMMITERS_CASE_STUDY_HIGHLIGHT_CARD_CLASS}>
                    {isProspectIq || isEcoRoute ? (
                      <span className={isEcoRoute ? ECOROUTE_METRIC_ICON_CLASS : PROSPECTIQ_METRIC_ICON_CLASS} aria-hidden>
                        <MetricIcon id={metric.id} />
                      </span>
                    ) : null}
                    <p className={COMMITERS_CASE_STUDY_HIGHLIGHT_LABEL_CLASS}>{metric.label}</p>
                    <p className={COMMITERS_CASE_STUDY_HIGHLIGHT_BODY_CLASS}>
                      {figure ? (
                        <>
                          <span className={ECOROUTE_METRIC_FIGURE_CLASS} aria-hidden>
                            {figure}
                          </span>
                          <span className={ECOROUTE_SR_COPY_CLASS}>{metric.value}</span>
                        </>
                      ) : (
                        metric.value
                      )}
                    </p>
                  </article>
                );
              })}
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
                      width={isProspectIq || isEcoRoute ? 32 : 28}
                      height={isProspectIq || isEcoRoute ? 32 : 28}
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
        className={`${COMMITERS_CASE_STUDY_ARCHITECTURE_SECTION_CLASS} reveal-on-scroll`}
        data-testid={`${pageId}-case-study-architecture`}
        aria-labelledby={`${pageId}-case-study-architecture-title`}
      >
        <div className={COMMITERS_CASE_STUDY_ARCHITECTURE_GRID_CLASS}>
          <div className={COMMITERS_CASE_STUDY_ARCHITECTURE_HEADING_BLOCK_CLASS}>
            <p className={COMMITERS_CASE_STUDY_ARCHITECTURE_KICKER_CLASS}>
              {copy.architecture.kicker ?? "TECHNICAL ARCHITECTURE"}
            </p>
            <h2
              id={`${pageId}-case-study-architecture-title`}
              className={`${COMMITERS_CASE_STUDY_ARCHITECTURE_HEADING_CLASS}${isProspectIq ? ` ${PROSPECTIQ_DISPLAY_HEADING_CLASS}` : ""}`}
            >
              {isProspectIq
                ? "Modular. Governed. Scalable."
                : isEcoRoute
                  ? ECOROUTE_DISPLAY.architectureHeading
                  : copy.architecture.heading}
            </h2>
          </div>
          <div className={COMMITERS_CASE_STUDY_ARCHITECTURE_LIST_CLASS}>
            {copy.architecture.sections.map((section) => {
              const display =
                isEcoRoute && section.id in ECOROUTE_DISPLAY.architecture
                  ? ECOROUTE_DISPLAY.architecture[section.id as keyof typeof ECOROUTE_DISPLAY.architecture]
                  : null;
              return (
                <article key={section.id} className={COMMITERS_CASE_STUDY_ARCHITECTURE_ITEM_CLASS}>
                  <span className={COMMITERS_CASE_STUDY_ARCHITECTURE_ITEM_ICON_CLASS} aria-hidden>
                    <ArchitectureItemIcon id={section.id} title={section.title} />
                  </span>
                  <div>
                    <h3 className={COMMITERS_CASE_STUDY_ARCHITECTURE_ITEM_TITLE_CLASS}>
                      {display ? (
                        <>
                          <span aria-hidden="true">{display.title}</span>
                          <span className={ECOROUTE_SR_COPY_CLASS}>{section.title}</span>
                        </>
                      ) : (
                        section.title
                      )}
                    </h3>
                    {display ? <p className={COMMITERS_CASE_STUDY_ARCHITECTURE_ITEM_BODY_CLASS} aria-hidden="true">{display.body}</p> : null}
                    <p
                      className={
                        display
                          ? ECOROUTE_SR_COPY_CLASS
                          : COMMITERS_CASE_STUDY_ARCHITECTURE_ITEM_BODY_CLASS
                      }
                    >
                      {section.body}
                    </p>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section
        className={`${COMMITERS_CASE_STUDY_FEATURES_SECTION_CLASS} reveal-on-scroll`}
        data-testid={`${pageId}-case-study-features`}
      >
        <div className={COMMITERS_CASE_STUDY_FEATURE_GRID_CLASS}>
          {copy.features.map((feature) => {
            const displayTitle =
              isEcoRoute && feature.id in ECOROUTE_DISPLAY.features
                ? ECOROUTE_DISPLAY.features[feature.id as keyof typeof ECOROUTE_DISPLAY.features]
                : null;
            return (
              <article key={feature.id} className={COMMITERS_CASE_STUDY_FEATURE_CARD_CLASS}>
                <span className={COMMITERS_CASE_STUDY_FEATURE_ICON_CLASS} aria-hidden>
                  <FeatureIcon icon={feature.icon} />
                </span>
                <h3 className={COMMITERS_CASE_STUDY_FEATURE_TITLE_CLASS}>
                  {displayTitle ? (
                    <>
                      <span aria-hidden="true">{displayTitle}</span>
                      <span className={ECOROUTE_SR_COPY_CLASS}>{feature.title}</span>
                    </>
                  ) : (
                    feature.title
                  )}
                </h3>
                <p className={COMMITERS_CASE_STUDY_FEATURE_BODY_CLASS}>{feature.body}</p>
              </article>
            );
          })}
        </div>
      </section>

      <section
        className={`${COMMITERS_CASE_STUDY_BOTTOM_CTA_SECTION_CLASS} reveal-on-scroll`}
        data-testid={`${pageId}-case-study-bottom-cta`}
        aria-labelledby={`${pageId}-case-study-bottom-cta-title`}
      >
        <div className={COMMITERS_CASE_STUDY_BOTTOM_CTA_INNER_CLASS}>
          <h2 id={`${pageId}-case-study-bottom-cta-title`} className={COMMITERS_CASE_STUDY_BOTTOM_CTA_TITLE_CLASS}>
            {isEcoRoute ? ECOROUTE_DISPLAY.ctaTitle : bottomCta.title}
          </h2>
          {isEcoRoute ? <p className={ECOROUTE_SR_COPY_CLASS}>{bottomCta.title}</p> : null}
          <p className={COMMITERS_CASE_STUDY_BOTTOM_CTA_SUBTEXT_CLASS}>
            {isEcoRoute ? ECOROUTE_DISPLAY.ctaSubtext : bottomCta.subtext}
          </p>
          {isEcoRoute ? <p className={ECOROUTE_SR_COPY_CLASS}>{bottomCta.subtext}</p> : null}
          <div className={COMMITERS_CASE_STUDY_BOTTOM_CTA_ACTIONS_CLASS}>
            <Link className={primaryCtaClass(bottomCta.primaryVariant)} to={bottomCta.primaryTo}>
              {bottomCta.primaryLabel}
            </Link>
            <Link className={secondaryCtaClass()} to={bottomCta.secondaryTo}>
              {bottomCta.secondaryLabel}
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
