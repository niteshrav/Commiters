import { Link } from "react-router-dom";
import EngineeringPrecisionBadge from "./EngineeringPrecisionBadge";
import { HOME_IMAGE_FULL_COLOR_CLASS } from "../lib/homeImagePresentation";
import { HOME_PRIMARY_SURFACE_CLASS } from "../lib/homePrimarySurface";
import { HOME_PAGE_ASSETS, HOME_PAGE_COPY } from "../lib/homePageContent";
import { ROUTES } from "../lib/routes";

export default function HomeHeroStitch() {
  const { hero } = HOME_PAGE_COPY;

  return (
    <section
      className={`stitch-home-hero ${HOME_PRIMARY_SURFACE_CLASS} reveal-on-scroll`}
      data-testid="stitch-home-hero"
    >
      <div className="stitch-home-hero-grid">
        <div className="stitch-home-hero-copy">
          <EngineeringPrecisionBadge />
          <h1 className="stitch-home-title typography-display">{hero.title}</h1>
          <p className="stitch-home-subtext typography-body">{hero.subtext}</p>
          <div className="stitch-home-actions" data-testid="hero-actions">
            <Link className="btn btn-primary stitch-btn-primary" to={hero.ctaPrimaryTo}>
              {hero.ctaPrimary} →
            </Link>
            <Link className="btn btn-secondary stitch-btn-outline" to={ROUTES.about}>
              {hero.ctaSecondary}
            </Link>
          </div>
        </div>
        <div className="stitch-home-hero-visual" data-testid="stitch-home-hero-visual">
          <img
            className={`stitch-home-hero-photo ${HOME_IMAGE_FULL_COLOR_CLASS}`}
            src={HOME_PAGE_ASSETS.heroMonitor}
            srcSet={`${HOME_PAGE_ASSETS.heroMonitor} 1x, ${HOME_PAGE_ASSETS.heroMonitor2x} 2x`}
            sizes="(min-width: 960px) 520px, 92vw"
            alt=""
            width={480}
            height={520}
            decoding="async"
            data-testid="home-hero-visual"
          />
        </div>
      </div>
    </section>
  );
}
