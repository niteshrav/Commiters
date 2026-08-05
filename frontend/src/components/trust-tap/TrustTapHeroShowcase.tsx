import { TRUSTTAP_HERO_SHOWCASE } from "../../lib/trustTapPageContent";

export default function TrustTapHeroShowcase() {
  const copy = TRUSTTAP_HERO_SHOWCASE;
  const preview = copy.livePreview;

  return (
    <figure
      className="trusttap-hero-showcase"
      data-testid="trusttap-hero-showcase"
      aria-label={copy.ariaLabel}
    >
      <div className="trusttap-hero-showcase-stage">
        <div className="trusttap-hero-showcase-browser">
          <div className="trusttap-hero-showcase-chrome" aria-hidden>
            <span className="trusttap-hero-showcase-dot trusttap-hero-showcase-dot--close" />
            <span className="trusttap-hero-showcase-dot trusttap-hero-showcase-dot--min" />
            <span className="trusttap-hero-showcase-dot trusttap-hero-showcase-dot--max" />
            <span className="trusttap-hero-showcase-url">{copy.browserChromeUrl}</span>
          </div>
          <img
            className="trusttap-hero-showcase-main"
            src={preview.src}
            srcSet={preview.srcSet}
            alt={preview.alt}
            width={preview.width}
            height={preview.height}
            decoding="async"
            fetchPriority="high"
          />
        </div>
        <div className="trusttap-hero-showcase-accent" aria-hidden>
          <img
            className="trusttap-hero-showcase-accent-image"
            src={copy.accent.src}
            alt={copy.accent.alt}
            width={copy.accent.width}
            height={copy.accent.height}
            loading="lazy"
            decoding="async"
          />
        </div>
      </div>
    </figure>
  );
}
