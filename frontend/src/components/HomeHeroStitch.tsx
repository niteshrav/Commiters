import { Link } from "react-router-dom";
import EngineeringPrecisionBadge from "./EngineeringPrecisionBadge";
import { HOME_IMAGE_FULL_COLOR_CLASS } from "../lib/homeImagePresentation";
import { HOME_PRIMARY_SURFACE_CLASS } from "../lib/homePrimarySurface";
import { useHeroContent } from "../lib/cms/hooks";

export default function HomeHeroStitch() {
  const hero = useHeroContent();

  return (
    <section
      className={`stitch-home-hero ${HOME_PRIMARY_SURFACE_CLASS} reveal-on-scroll`}
      data-testid="stitch-home-hero"
    >
      <div className="stitch-home-hero-grid">
        <div className="stitch-home-hero-copy">
          {hero.badgeText ? (
            <span className="engineering-precision-badge">{hero.badgeText}</span>
          ) : (
            <EngineeringPrecisionBadge />
          )}
          <h1 className="stitch-home-title typography-display">{hero.title}</h1>
          <p className="stitch-home-subtext typography-body">{hero.subtext}</p>
          <div className="stitch-home-actions" data-testid="hero-actions">
            <Link className="btn btn-primary stitch-btn-primary" to={hero.ctaPrimaryTo}>
              {hero.ctaPrimary} →
            </Link>
            <Link className="btn btn-secondary stitch-btn-outline" to={hero.ctaSecondaryTo}>
              {hero.ctaSecondary}
            </Link>
          </div>
        </div>
        <div className="stitch-home-hero-visual" data-testid="stitch-home-hero-visual">
          <img
            className={`stitch-home-hero-photo ${HOME_IMAGE_FULL_COLOR_CLASS}`}
            src={hero.heroImage}
            srcSet={`${hero.heroImage} 1x, ${hero.heroImage2x} 2x`}
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
