import { Link } from "react-router-dom";
import { TRUSTTAP_DISPLAY } from "../../lib/trustTapPageDesign";
import { TRUSTTAP_BOTTOM_CTA } from "../../lib/trustTapPageContent";
import {
  TRUSTTAP_BOTTOM_CTA_ACTIONS_CLASS,
  TRUSTTAP_BOTTOM_CTA_CLASS,
  TRUSTTAP_BOTTOM_CTA_INNER_CLASS,
  TRUSTTAP_SECTION_SUBTEXT_CLASS,
  TRUSTTAP_SECTION_TITLE_CLASS,
} from "../../lib/trustTapPageLayout";

export default function TrustTapBottomCtaSection() {
  const copy = TRUSTTAP_BOTTOM_CTA;

  return (
    <section
      className={`${TRUSTTAP_BOTTOM_CTA_CLASS} band-breakout reveal-on-scroll`}
      data-testid="trusttap-bottom-cta"
      aria-labelledby="trusttap-bottom-cta-title"
    >
      <div className={TRUSTTAP_BOTTOM_CTA_INNER_CLASS}>
        <p className="trusttap-bottom-kicker">{TRUSTTAP_DISPLAY.bottomKicker}</p>
        <h2 id="trusttap-bottom-cta-title" className={`${TRUSTTAP_SECTION_TITLE_CLASS} trusttap-sr`}>
          {copy.title}
        </h2>
        <p className="trusttap-bottom-headline" aria-hidden="true">
          {TRUSTTAP_DISPLAY.bottomHeadline}
        </p>
        <p className={TRUSTTAP_SECTION_SUBTEXT_CLASS}>{copy.subtext}</p>
        <div className={TRUSTTAP_BOTTOM_CTA_ACTIONS_CLASS}>
          {copy.secondaryHref ? (
            <Link className="btn btn-secondary trusttap-bottom-cta-secondary" to={copy.secondaryHref}>
              {copy.secondaryLabel}
            </Link>
          ) : null}
          <Link className="btn btn-primary trusttap-hero-btn-primary" to={copy.primaryHref}>
            {copy.primaryLabel} <span aria-hidden="true">{TRUSTTAP_DISPLAY.ctaArrow}</span>
          </Link>
        </div>
        <p className="trusttap-bottom-note" aria-hidden="true">
          Trusted in the field.
        </p>
      </div>
    </section>
  );
}
