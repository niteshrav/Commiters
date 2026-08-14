import { TRUSTTAP_HERO_SHOWCASE } from "../../lib/trustTapPageContent";

export default function TrustTapHeroShowcase() {
  const copy = TRUSTTAP_HERO_SHOWCASE;
  const preview = copy.image;

  return (
    <figure
      className="trusttap-hero-showcase"
      data-testid="trusttap-hero-showcase"
      aria-label={copy.ariaLabel}
    >
      <img
        className="trusttap-hero-showcase-image"
        src={preview.src}
        srcSet={preview.srcSet}
        sizes="(min-width: 960px) 560px, 92vw"
        alt={preview.alt}
        width={preview.width}
        height={preview.height}
        decoding="async"
        fetchPriority="high"
      />
    </figure>
  );
}
