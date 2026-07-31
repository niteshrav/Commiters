import { Link } from "react-router-dom";
import { TRUSTTAP_HERO } from "../../lib/trustTapPageContent";
import {
  TRUSTTAP_HERO_ACTIONS_CLASS,
  TRUSTTAP_HERO_CLASS,
  TRUSTTAP_HERO_COPY_CLASS,
  TRUSTTAP_HERO_FOOTNOTE_CLASS,
  TRUSTTAP_HERO_GRID_CLASS,
  TRUSTTAP_HERO_INNER_CLASS,
  TRUSTTAP_HERO_MEDIA_CLASS,
  TRUSTTAP_HERO_TAGLINE_CLASS,
  TRUSTTAP_HERO_TITLE_ACCENT_CLASS,
  TRUSTTAP_HERO_TITLE_CLASS,
  TRUSTTAP_KICKER_CLASS,
} from "../../lib/trustTapPageLayout";

export default function TrustTapHeroSection() {
  const copy = TRUSTTAP_HERO;
  const secondaryIsHash = copy.secondaryHref.startsWith("#");

  return (
    <section className={TRUSTTAP_HERO_CLASS} data-testid="trusttap-hero" aria-labelledby="trusttap-hero-title">
      <div className={TRUSTTAP_HERO_INNER_CLASS}>
        <div className={TRUSTTAP_HERO_GRID_CLASS}>
          <div className={TRUSTTAP_HERO_COPY_CLASS}>
            <p className={`${TRUSTTAP_KICKER_CLASS} trusttap-hero-kicker`}>{copy.kicker}</p>
            <h1 id="trusttap-hero-title" className={TRUSTTAP_HERO_TITLE_CLASS}>
              {copy.titleLead}{" "}
              <span className={TRUSTTAP_HERO_TITLE_ACCENT_CLASS}>{copy.titleAccent}</span>
            </h1>
            <p className={TRUSTTAP_HERO_TAGLINE_CLASS}>{copy.tagline}</p>
            <div className={TRUSTTAP_HERO_ACTIONS_CLASS}>
              <a
                className="btn btn-primary trusttap-hero-btn-primary"
                href={copy.primaryHref}
                target="_blank"
                rel="noopener noreferrer"
              >
                {copy.primaryLabel}
              </a>
              {secondaryIsHash ? (
                <a className="btn btn-secondary trusttap-hero-btn-secondary" href={copy.secondaryHref}>
                  {copy.secondaryLabel}
                </a>
              ) : (
                <Link className="btn btn-secondary trusttap-hero-btn-secondary" to={copy.secondaryHref}>
                  {copy.secondaryLabel}
                </Link>
              )}
            </div>
            <p className={TRUSTTAP_HERO_FOOTNOTE_CLASS}>{copy.footnote}</p>
          </div>
          <figure className={TRUSTTAP_HERO_MEDIA_CLASS}>
            <img
              className="trusttap-hero-image"
              src={copy.heroImage.src}
              alt={copy.heroImage.alt}
              width={1200}
              height={675}
              decoding="async"
              fetchPriority="high"
            />
          </figure>
        </div>
      </div>
    </section>
  );
}
