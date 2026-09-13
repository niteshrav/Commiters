import { Link } from "react-router-dom";
import BrandHeroEyebrow from "../BrandHeroEyebrow";
import { IconBolt, IconChartLine, IconDevicePhone, IconShieldCheck } from "../icons";
import TrustTapHeroShowcase from "./TrustTapHeroShowcase";
import { TRUSTTAP_HERO } from "../../lib/trustTapPageContent";
import {
  TRUSTTAP_HERO_ACTIONS_CLASS,
  TRUSTTAP_HERO_CHIPS_CLASS,
  TRUSTTAP_HERO_CLASS,
  TRUSTTAP_OVERVIEW_ID,
  TRUSTTAP_HERO_COPY_CLASS,
  TRUSTTAP_HERO_FOOTNOTE_CLASS,
  TRUSTTAP_HERO_GRID_CLASS,
  TRUSTTAP_HERO_INNER_CLASS,
  TRUSTTAP_HERO_TAGLINE_CLASS,
  TRUSTTAP_HERO_TITLE_CLASS,
} from "../../lib/trustTapPageLayout";

const CHIP_ICONS = {
  nfc: IconDevicePhone,
  routing: IconShieldCheck,
  digests: IconChartLine,
  tap: IconBolt,
} as const;

function isExternalHref(href: string) {
  return href.startsWith("http://") || href.startsWith("https://");
}

export default function TrustTapHeroSection() {
  const copy = TRUSTTAP_HERO;
  const secondaryIsHash = copy.secondaryHref.startsWith("#");
  const secondaryIsExternal = isExternalHref(copy.secondaryHref);

  return (
    <section
      id={TRUSTTAP_OVERVIEW_ID}
      className={TRUSTTAP_HERO_CLASS}
      data-testid="trusttap-hero"
      aria-labelledby="trusttap-hero-title"
    >
      <div className={TRUSTTAP_HERO_INNER_CLASS}>
        <div className={TRUSTTAP_HERO_GRID_CLASS}>
          <div className={TRUSTTAP_HERO_COPY_CLASS}>
            <BrandHeroEyebrow text={copy.kicker} />
            <h1 id="trusttap-hero-title" className={TRUSTTAP_HERO_TITLE_CLASS}>
              {copy.title}
            </h1>
            <p className={TRUSTTAP_HERO_TAGLINE_CLASS}>{copy.tagline}</p>
            <div className={TRUSTTAP_HERO_ACTIONS_CLASS}>
              {isExternalHref(copy.primaryHref) ? (
                <a
                  className="btn btn-primary trusttap-hero-btn-primary"
                  href={copy.primaryHref}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {copy.primaryLabel}
                </a>
              ) : (
                <Link className="btn btn-primary trusttap-hero-btn-primary" to={copy.primaryHref}>
                  {copy.primaryLabel}
                </Link>
              )}
              {secondaryIsExternal ? (
                <a
                  className="btn btn-secondary trusttap-hero-btn-secondary"
                  href={copy.secondaryHref}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {copy.secondaryLabel}
                </a>
              ) : secondaryIsHash ? (
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
              {copy.chips.map((chip) => {
                const Icon = CHIP_ICONS[chip.id];
                return (
                  <li key={chip.id}>
                    <Icon />
                    <span>{chip.label}</span>
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
