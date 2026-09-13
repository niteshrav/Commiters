import { Link } from "react-router-dom";
import { HOME_IMAGE_FULL_COLOR_CLASS } from "../lib/homeImagePresentation";
import {
  HOME_CLOUD_LEAD_CLASS,
  HOME_CLOUD_THEME_CLASS,
  HOME_CLOUD_TITLE_ACCENT_CLASS,
  HOME_CLOUD_TITLE_CLASS,
} from "../lib/homeCloudTheme";
import { HOME_PRIMARY_SURFACE_CLASS } from "../lib/homePrimarySurface";
import { HOME_PAGE_COPY } from "../lib/homePageContent";
import { useHeroContent } from "../lib/cms/hooks";
import BrandHeroEyebrow from "./BrandHeroEyebrow";

export default function HomeHeroStitch() {
  const hero = useHeroContent();
  const useCloudTitle = hero.title === HOME_PAGE_COPY.hero.title;

  return (
    <section
      className={`stitch-home-hero ${HOME_CLOUD_THEME_CLASS} ${HOME_PRIMARY_SURFACE_CLASS} reveal-on-scroll`}
      data-testid="stitch-home-hero"
    >
      <div className="stitch-home-hero-grid">
        <div className="stitch-home-hero-copy">
          <BrandHeroEyebrow text={hero.badgeText} />
          <h1 className={`stitch-home-title ${HOME_CLOUD_TITLE_CLASS} typography-display`}>
            {useCloudTitle ? HOME_PAGE_COPY.hero.titleLead : hero.title}
            {useCloudTitle ? (
              <span className={HOME_CLOUD_TITLE_ACCENT_CLASS}>{HOME_PAGE_COPY.hero.titleAccent}</span>
            ) : null}
          </h1>
          <p className={`stitch-home-subtext ${HOME_CLOUD_LEAD_CLASS} typography-body`}>{hero.subtext}</p>
          <div className="stitch-home-actions" data-testid="hero-actions">
            <Link className="btn btn-primary stitch-btn-primary" to={hero.ctaPrimaryTo}>
              {hero.ctaPrimary}
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
            alt="Commiters software development — web and mobile engineering workspace"
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
