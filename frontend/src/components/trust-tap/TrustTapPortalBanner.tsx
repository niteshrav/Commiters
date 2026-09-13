import { TRUSTTAP_PORTAL_BANNER } from "../../lib/trustTapPageContent";
import {
  TRUSTTAP_PORTAL_BANNER_CLASS,
  TRUSTTAP_PORTAL_BANNER_TESTID,
  TRUSTTAP_SECTION_CLASS,
  TRUSTTAP_SECTION_INNER_CLASS,
} from "../../lib/trustTapPageLayout";

export default function TrustTapPortalBanner() {
  const copy = TRUSTTAP_PORTAL_BANNER;

  return (
    <section className={`${TRUSTTAP_SECTION_CLASS} reveal-on-scroll`} aria-labelledby="trusttap-portal-banner-title">
      <div className={TRUSTTAP_SECTION_INNER_CLASS}>
        <div className={`${TRUSTTAP_PORTAL_BANNER_CLASS} trusttap-portal-banner`} data-testid={TRUSTTAP_PORTAL_BANNER_TESTID}>
          <div className="trusttap-portal-banner-copy">
            <h2 id="trusttap-portal-banner-title" className="trusttap-portal-banner-title">
              {copy.title}
            </h2>
            <p className="trusttap-portal-banner-subtext">{copy.subtext}</p>
          </div>
          <a
            className="btn btn-primary trusttap-hero-btn-primary trusttap-portal-banner-cta"
            href={copy.href}
            target="_blank"
            rel="noopener noreferrer"
          >
            {copy.ctaLabel}
          </a>
        </div>
      </div>
    </section>
  );
}
