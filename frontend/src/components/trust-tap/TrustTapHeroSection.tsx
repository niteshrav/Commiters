import { Link } from "react-router-dom";
import { IconChartLine, IconCloud, IconLock, IconShieldCheck } from "../icons";
import TrustTapHeroShowcase from "./TrustTapHeroShowcase";
import { TRUSTTAP_DISPLAY } from "../../lib/trustTapPageDesign";
import { TRUSTTAP_HERO } from "../../lib/trustTapPageContent";
import {
  TRUSTTAP_HERO_ACTIONS_CLASS,
  TRUSTTAP_HERO_CHIPS_CLASS,
  TRUSTTAP_HERO_CLASS,
  TRUSTTAP_HERO_COPY_CLASS,
  TRUSTTAP_HERO_FOOTNOTE_CLASS,
  TRUSTTAP_HERO_GRID_CLASS,
  TRUSTTAP_HERO_INNER_CLASS,
  TRUSTTAP_HERO_TAGLINE_CLASS,
  TRUSTTAP_HERO_TITLE_ACCENT_CLASS,
  TRUSTTAP_HERO_TITLE_CLASS,
  TRUSTTAP_KICKER_CLASS,
} from "../../lib/trustTapPageLayout";

const CHIP_ICONS = {
  tamper: IconShieldCheck,
  offline: IconCloud,
  live: IconChartLine,
  secure: IconLock,
} as const;

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
              <span className="trusttap-sr">
                {copy.titleLead} {copy.titleAccent}
              </span>
              <span className="trusttap-hero-title-brand" aria-hidden="true">
                {TRUSTTAP_DISPLAY.headlineBrand}
              </span>
              <span className={`${TRUSTTAP_HERO_TITLE_ACCENT_CLASS} trusttap-hero-title-tag`} aria-hidden="true">
                {TRUSTTAP_DISPLAY.headlineTag}
              </span>
            </h1>
            <p className={TRUSTTAP_HERO_TAGLINE_CLASS}>{copy.tagline}</p>
            <div className={TRUSTTAP_HERO_ACTIONS_CLASS}>
              {copy.primaryHref.startsWith("http") ? (
                <a
                  className="btn btn-primary trusttap-hero-btn-primary"
                  href={copy.primaryHref}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {copy.primaryLabel} <span aria-hidden="true">{TRUSTTAP_DISPLAY.ctaArrow}</span>
                </a>
              ) : (
                <Link className="btn btn-primary trusttap-hero-btn-primary" to={copy.primaryHref}>
                  {copy.primaryLabel} <span aria-hidden="true">{TRUSTTAP_DISPLAY.ctaArrow}</span>
                </Link>
              )}
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
            <ul className={TRUSTTAP_HERO_CHIPS_CLASS}>
              {TRUSTTAP_DISPLAY.chips.map((chip) => {
                const Icon = CHIP_ICONS[chip.id];
                return (
                  <li key={chip.id}>
                    <Icon />
                    <span>
                      <strong>{chip.title}</strong> {chip.body}
                    </span>
                  </li>
                );
              })}
            </ul>
            <p className={`${TRUSTTAP_HERO_FOOTNOTE_CLASS} trusttap-sr`}>{copy.footnote}</p>
          </div>
          <TrustTapHeroShowcase />
        </div>
      </div>
    </section>
  );
}
