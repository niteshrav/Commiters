import { IconBolt, IconDatabase, IconShieldCheck, IconWorkflow } from "./icons";
import { QUALITY_FIRST_ICON_TEST_ID } from "../lib/qualityFirstIcon";
import { HOME_CORE_PILLARS_SURFACE_CLASS } from "../lib/homeCorePillarsSurface";
import { HOME_PAGE_COPY } from "../lib/homePageContent";
import { STITCH_SURFACE_CARD_CLASS } from "../lib/stitchSurfaceCard";

const PILLAR_ICONS = [IconWorkflow, IconBolt, IconShieldCheck, IconDatabase] as const;

export default function HomeCorePillars() {
  const { corePillars } = HOME_PAGE_COPY;

  return (
    <section
      id="core-pillars"
      className={`home-core-pillars ${HOME_CORE_PILLARS_SURFACE_CLASS} band-breakout reveal-on-scroll`}
      data-testid="home-core-pillars"
    >
      <div className="home-core-pillars-inner">
        <div className="home-core-pillars-header">
          <h2 className="home-section-title typography-section-title">{corePillars.title}</h2>
          <p className="home-section-subtext typography-body">{corePillars.subtext}</p>
        </div>

        <div className={`home-pillars-card ${STITCH_SURFACE_CARD_CLASS}`} data-testid="home-pillars-card">
          <div className="home-pillars-grid" data-testid="home-pillars-grid">
            {corePillars.items.map((item, index) => {
              const Icon = PILLAR_ICONS[index] ?? IconShieldCheck;
              return (
                <div key={item.title} className="home-pillar" data-testid="home-governance-pillar">
                  <span className={index % 2 === 0 ? "home-pillar-icon home-pillar-icon--blue" : "home-pillar-icon home-pillar-icon--gold"} aria-hidden>
                    <Icon
                      width={28}
                      height={28}
                      data-testid={index === 2 ? QUALITY_FIRST_ICON_TEST_ID : undefined}
                    />
                  </span>
                  <h3 className="home-pillar-title">{item.title}</h3>
                  <p className="home-pillar-body typography-body">{item.body}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
