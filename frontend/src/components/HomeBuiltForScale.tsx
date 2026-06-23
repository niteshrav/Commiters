import { IconCheckCircle } from "./icons";
import { HOME_IMAGE_FULL_COLOR_CLASS } from "../lib/homeImagePresentation";
import {
  BUILT_FOR_SCALE_GRID_CLASS,
  BUILT_FOR_SCALE_IMAGE_HEIGHT,
  BUILT_FOR_SCALE_IMAGE_SIZES,
  BUILT_FOR_SCALE_IMAGE_WIDTH,
} from "../lib/homeBuiltForScaleLayout";
import { HOME_PRIMARY_SURFACE_CLASS } from "../lib/homePrimarySurface";
import { HOME_PAGE_ASSETS, HOME_PAGE_COPY } from "../lib/homePageContent";

export default function HomeBuiltForScale() {
  const { builtForScale } = HOME_PAGE_COPY;

  return (
    <section
      className={`home-built-for-scale ${HOME_PRIMARY_SURFACE_CLASS} reveal-on-scroll`}
      data-testid="home-built-for-scale"
      id="built-for-scale"
      aria-labelledby="home-built-for-scale-title"
    >
      <div className="home-built-for-scale-inner">
        <div
          className={`home-built-for-scale-grid ${BUILT_FOR_SCALE_GRID_CLASS}`}
          data-testid="home-built-for-scale-grid"
        >
          <figure className="home-built-for-scale-media" data-testid="home-built-for-scale-media">
            <img
              className={`home-built-for-scale-image ${HOME_IMAGE_FULL_COLOR_CLASS}`}
              data-testid="home-built-for-scale-image"
              src={HOME_PAGE_ASSETS.serverRacks}
              srcSet={`${HOME_PAGE_ASSETS.serverRacks} 1x, ${HOME_PAGE_ASSETS.serverRacks2x} 2x`}
              sizes={BUILT_FOR_SCALE_IMAGE_SIZES}
              alt=""
              width={BUILT_FOR_SCALE_IMAGE_WIDTH}
              height={BUILT_FOR_SCALE_IMAGE_HEIGHT}
              loading="lazy"
              decoding="async"
            />
          </figure>

          <div className="home-built-for-scale-copy" data-testid="home-built-for-scale-copy">
            <h2 id="home-built-for-scale-title" className="home-built-for-scale-title typography-section-title">
              {builtForScale.title}
            </h2>
            <p className="home-built-for-scale-lead typography-body">{builtForScale.body}</p>
            <ul className="home-scale-features">
              {builtForScale.features.map((feature) => (
                <li key={feature.title} className="home-scale-feature" data-testid="home-scale-feature">
                  <span className="home-scale-feature-icon" data-testid="home-scale-feature-icon" aria-hidden>
                    <IconCheckCircle width={24} height={24} />
                  </span>
                  <div className="home-scale-feature-text">
                    <strong className="home-scale-feature-title">{feature.title}</strong>
                    <p className="home-scale-feature-body typography-body">{feature.description}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
