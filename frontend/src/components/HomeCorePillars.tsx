import { Link } from "react-router-dom";
import { IconBolt, IconMedal, IconShieldCheck } from "./icons";
import { QUALITY_FIRST_ICON_TEST_ID } from "../lib/qualityFirstIcon";
import { HOME_CORE_PILLARS_SURFACE_CLASS } from "../lib/homeCorePillarsSurface";
import { HOME_PAGE_COPY } from "../lib/homePageContent";
import { STITCH_SURFACE_CARD_CLASS } from "../lib/stitchSurfaceCard";

export default function HomeCorePillars() {
  const { corePillars } = HOME_PAGE_COPY;
  const { quality } = corePillars;

  return (
    <section
      className={`home-core-pillars ${HOME_CORE_PILLARS_SURFACE_CLASS} band-breakout reveal-on-scroll`}
      data-testid="home-core-pillars"
    >
      <div className="home-core-pillars-inner">
        <div className="home-core-pillars-header">
          <h2 className="home-section-title typography-section-title">{corePillars.title}</h2>
          <p className="home-section-subtext typography-body">{corePillars.subtext}</p>
        </div>

        <div className={`home-pillars-card ${STITCH_SURFACE_CARD_CLASS}`} data-testid="home-pillars-card">
          <div className="home-pillars-card-top" data-testid="home-pillars-top-row">
            <div className="home-pillar home-pillar--founder">
              <span className="home-pillar-icon home-pillar-icon--blue" aria-hidden>
                <IconMedal width={28} height={28} />
              </span>
              <h3 className="home-pillar-title">{corePillars.founderLed.title}</h3>
              <p className="home-pillar-body typography-body">{corePillars.founderLed.body}</p>
              <Link className="home-pillar-link" to={corePillars.founderLed.linkTo}>
                {corePillars.founderLed.linkLabel} &gt;
              </Link>
            </div>

            <div className="home-pillar home-pillar--cycles">
              <span className="home-pillar-icon home-pillar-icon--gold" aria-hidden>
                <IconBolt width={28} height={28} />
              </span>
              <h3 className="home-pillar-title">{corePillars.fastLaunch.title}</h3>
              <p className="home-pillar-body typography-body">{corePillars.fastLaunch.body}</p>
              <div className="home-launch-bars" data-testid="home-launch-bars" aria-hidden>
                <span className="home-launch-bar home-launch-bar--1" />
                <span className="home-launch-bar home-launch-bar--2" />
                <span className="home-launch-bar home-launch-bar--3" />
                <span className="home-launch-bar home-launch-bar--4" />
                <span className="home-launch-bar home-launch-bar--5" />
              </div>
            </div>
          </div>

          <div className="home-pillars-card-bottom" data-testid="home-pillars-quality-row">
            <div className="home-quality-copy" data-testid="home-quality-copy">
              <span className="home-quality-icon home-quality-icon--shield" aria-hidden>
                <IconShieldCheck width={32} height={32} data-testid={QUALITY_FIRST_ICON_TEST_ID} />
              </span>
              <h3 className="home-pillar-title">{quality.title}</h3>
              <p className="home-pillar-body typography-body">{quality.body}</p>
            </div>
            <div className="home-quality-metrics" data-testid="home-quality-metrics">
              {quality.metrics.map((metric) => (
                <div key={metric.value} className={`home-metric-card ${STITCH_SURFACE_CARD_CLASS}`}>
                  <strong className="home-metric-value">{metric.value}</strong>
                  <span className="home-metric-label">{metric.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
