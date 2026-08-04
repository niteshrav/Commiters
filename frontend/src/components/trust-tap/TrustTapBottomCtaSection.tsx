import { Link } from "react-router-dom";
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
      className={`${TRUSTTAP_BOTTOM_CTA_CLASS} reveal-on-scroll`}
      data-testid="trusttap-bottom-cta"
      aria-labelledby="trusttap-bottom-cta-title"
    >
      <div className={TRUSTTAP_BOTTOM_CTA_INNER_CLASS}>
        <h2 id="trusttap-bottom-cta-title" className={TRUSTTAP_SECTION_TITLE_CLASS}>
          {copy.title}
        </h2>
        <p className={TRUSTTAP_SECTION_SUBTEXT_CLASS}>{copy.subtext}</p>
        <div className={TRUSTTAP_BOTTOM_CTA_ACTIONS_CLASS}>
          <a className="btn btn-primary" href={copy.primaryHref} target="_blank" rel="noopener noreferrer">
            {copy.primaryLabel}
          </a>
          <Link className="btn btn-secondary trusttap-bottom-cta-secondary" to={copy.secondaryHref}>
            {copy.secondaryLabel}
          </Link>
        </div>
      </div>
    </section>
  );
}
