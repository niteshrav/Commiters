import { Link } from "react-router-dom";
import { IconArrowRight, IconBolt, IconDatabase, IconShieldCheck, IconWorkflow } from "./icons";
import { QUALITY_FIRST_ICON_TEST_ID } from "../lib/qualityFirstIcon";
import { HOME_CORE_PILLARS_SURFACE_CLASS, HOME_CORE_PILLARS_SURFACE_HEX } from "../lib/homeCorePillarsSurface";
import { HOME_PRIMARY_SURFACE_CLASS } from "../lib/homePrimarySurface";
import { HOME_PAGE_COPY } from "../lib/homePageContent";

const PILLAR_ICONS = [IconWorkflow, IconBolt, IconShieldCheck, IconDatabase] as const;

export default function HomeCorePillars() {
  const { corePillars } = HOME_PAGE_COPY;

  return (
    <section
      id="core-pillars"
      className={`home-core-pillars home-core-pillars--trust ${HOME_CORE_PILLARS_SURFACE_CLASS} ${HOME_PRIMARY_SURFACE_CLASS} band-breakout reveal-on-scroll`}
      style={{ backgroundColor: HOME_CORE_PILLARS_SURFACE_HEX }}
      data-testid="home-core-pillars"
    >
      <div className="home-core-pillars-inner">
        <header className="home-core-pillars-header">
          <p className="home-core-pillars-kicker">{corePillars.kicker}</p>
          <h2 className="home-core-pillars-title typography-section-title">{corePillars.title}</h2>
          <span className="home-core-pillars-accent" aria-hidden="true" />
        </header>

        <div className="home-pillars-grid" data-testid="home-pillars-grid">
          {corePillars.items.map((item, index) => {
            const Icon = PILLAR_ICONS[index] ?? IconShieldCheck;
            return (
              <article
                key={item.label}
                className={`home-pillar-card home-pillar-card--${item.tone}`}
                data-testid="home-governance-pillar"
              >
                <div className="home-pillar-card-main">
                  <span className={`home-pillar-card-icon home-pillar-card-icon--${item.tone}`} aria-hidden>
                    <Icon
                      width={24}
                      height={24}
                      data-testid={index === 2 ? QUALITY_FIRST_ICON_TEST_ID : undefined}
                    />
                  </span>
                  <div className="home-pillar-card-copy">
                    <h3 className="home-pillar-card-title">{item.label}</h3>
                    <p className="home-pillar-card-summary typography-body">{item.summary}</p>
                  </div>
                </div>
                <Link
                  to={item.to}
                  className={`home-pillar-card-action home-pillar-card-action--${item.tone}`}
                  aria-label={`Learn about ${item.label}: ${item.title}`}
                >
                  <IconArrowRight width={18} height={18} aria-hidden />
                </Link>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
