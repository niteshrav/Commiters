import { Link } from "react-router-dom";
import {
  IconArrowRight,
  IconBolt,
  IconChartLine,
  IconCloudUpload,
} from "./icons";
import { HOME_IMAGE_FULL_COLOR_CLASS } from "../lib/homeImagePresentation";
import {
  BUILT_FOR_SCALE_GRID_CLASS,
  BUILT_FOR_SCALE_IMAGE_HEIGHT,
  BUILT_FOR_SCALE_IMAGE_SIZES,
  BUILT_FOR_SCALE_IMAGE_WIDTH,
} from "../lib/homeBuiltForScaleLayout";
import { HOME_PRIMARY_SURFACE_CLASS } from "../lib/homePrimarySurface";
import { HOME_PAGE_ASSETS, HOME_PAGE_COPY, type HomeBuiltForScaleFeatureTone } from "../lib/homePageContent";

const FEATURE_ICONS = {
  blue: IconCloudUpload,
  green: IconChartLine,
  gold: IconBolt,
} as const satisfies Record<HomeBuiltForScaleFeatureTone, typeof IconCloudUpload>;

export default function HomeBuiltForScale() {
  const { builtForScale } = HOME_PAGE_COPY;

  return (
    <section
      className={`home-built-for-scale home-built-for-scale--cloud ${HOME_PRIMARY_SURFACE_CLASS} band-breakout reveal-on-scroll`}
      data-testid="home-built-for-scale"
      id="built-for-scale"
      aria-labelledby="home-built-for-scale-title"
    >
      <div className="home-built-for-scale-bg" aria-hidden="true">
        <span className="home-built-for-scale-dots" />
      </div>

      <div className="home-built-for-scale-inner">
        <div
          className={`home-built-for-scale-grid ${BUILT_FOR_SCALE_GRID_CLASS}`}
          data-testid="home-built-for-scale-grid"
        >
          <figure className="home-built-for-scale-media" data-testid="home-built-for-scale-media">
            <div className="home-built-for-scale-image-shell">
              <img
                className={`home-built-for-scale-image ${HOME_IMAGE_FULL_COLOR_CLASS}`}
                data-testid="home-built-for-scale-image"
                src={HOME_PAGE_ASSETS.serverRacks}
                sizes={BUILT_FOR_SCALE_IMAGE_SIZES}
                alt={builtForScale.imageAlt}
                width={BUILT_FOR_SCALE_IMAGE_WIDTH}
                height={BUILT_FOR_SCALE_IMAGE_HEIGHT}
                loading="lazy"
                decoding="async"
              />
              <div className="home-built-for-scale-image-badge home-built-for-scale-image-badge--top">
                <IconCloudUpload width={16} height={16} aria-hidden />
                <span>
                  {builtForScale.imageBadgeLines.map((line) => (
                    <span key={line}>{line}</span>
                  ))}
                </span>
              </div>
              <div className="home-built-for-scale-image-badge home-built-for-scale-image-badge--bottom">
                <IconChartLine width={16} height={16} aria-hidden />
                <span>{builtForScale.imageUptimeLabel}</span>
              </div>
            </div>
          </figure>

          <div className="home-built-for-scale-copy" data-testid="home-built-for-scale-copy">
            <p className="home-built-for-scale-kicker">{builtForScale.kicker}</p>
            <h2 id="home-built-for-scale-title" className="home-built-for-scale-title typography-section-title">
              {builtForScale.titleLead}
              <span className="home-built-for-scale-title-accent">{builtForScale.titleAccent}</span>
            </h2>
            <p className="home-built-for-scale-lead typography-body">{builtForScale.body}</p>

            <div className="home-scale-feature-cards" data-testid="home-scale-feature-cards">
              {builtForScale.features.map((feature) => {
                const Icon = FEATURE_ICONS[feature.tone];
                return (
                  <article
                    key={feature.title}
                    className={`home-scale-feature-card home-scale-feature-card--${feature.tone}`}
                    data-testid="home-scale-feature"
                  >
                    <span className={`home-scale-feature-card-icon home-scale-feature-card-icon--${feature.tone}`} aria-hidden>
                      <Icon width={18} height={18} data-testid="home-scale-feature-icon" />
                    </span>
                    <div className="home-scale-feature-card-copy">
                      <strong className="home-scale-feature-card-title">{feature.title}</strong>
                      <p className="home-scale-feature-card-body typography-body">{feature.description}</p>
                    </div>
                  </article>
                );
              })}
            </div>

            <div className="home-built-for-scale-actions" data-testid="home-built-for-scale-actions">
              <Link className="btn btn-primary home-built-for-scale-primary" to={builtForScale.ctaPrimaryTo}>
                {builtForScale.ctaPrimary}
                <IconArrowRight width={18} height={18} aria-hidden />
              </Link>
              <Link className="home-built-for-scale-secondary" to={builtForScale.ctaSecondaryTo}>
                {builtForScale.ctaSecondary}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
