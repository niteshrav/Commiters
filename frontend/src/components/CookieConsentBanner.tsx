import { Link } from "react-router-dom";
import { COOKIE_CONSENT_BANNER_COPY } from "../lib/cookieConsentContent";
import {
  COOKIE_CONSENT_BANNER_ACTIONS_CLASS,
  COOKIE_CONSENT_BANNER_BODY_CLASS,
  COOKIE_CONSENT_BANNER_CLASS,
  COOKIE_CONSENT_BANNER_COPY_CLASS,
  COOKIE_CONSENT_BANNER_GHOST_CLASS,
  COOKIE_CONSENT_BANNER_INNER_CLASS,
  COOKIE_CONSENT_BANNER_POLICY_LINK_CLASS,
  COOKIE_CONSENT_BANNER_PRIMARY_CLASS,
  COOKIE_CONSENT_BANNER_SECONDARY_CLASS,
  COOKIE_CONSENT_BANNER_TITLE_CLASS,
} from "../lib/cookieConsentLayout";
import { useCookieConsent } from "./CookieConsentProvider";

export default function CookieConsentBanner() {
  const { bannerVisible, acceptAll, rejectNonEssential, openPreferences } = useCookieConsent();

  if (!bannerVisible) return null;

  return (
    <section
      className={COOKIE_CONSENT_BANNER_CLASS}
      data-testid="cookie-consent-banner"
      aria-labelledby="cookie-consent-banner-title"
      role="region"
    >
      <div className={COOKIE_CONSENT_BANNER_INNER_CLASS}>
        <div className={COOKIE_CONSENT_BANNER_COPY_CLASS}>
          <h2 id="cookie-consent-banner-title" className={COOKIE_CONSENT_BANNER_TITLE_CLASS}>
            {COOKIE_CONSENT_BANNER_COPY.title}
          </h2>
          <p className={COOKIE_CONSENT_BANNER_BODY_CLASS}>{COOKIE_CONSENT_BANNER_COPY.description}</p>
          <Link className={COOKIE_CONSENT_BANNER_POLICY_LINK_CLASS} to={COOKIE_CONSENT_BANNER_COPY.policyHref}>
            {COOKIE_CONSENT_BANNER_COPY.policyLinkLabel} →
          </Link>
        </div>
        <div className={COOKIE_CONSENT_BANNER_ACTIONS_CLASS}>
          <button type="button" className={`btn ${COOKIE_CONSENT_BANNER_PRIMARY_CLASS}`} onClick={acceptAll}>
            {COOKIE_CONSENT_BANNER_COPY.acceptAllLabel}
          </button>
          <button type="button" className={`btn ${COOKIE_CONSENT_BANNER_SECONDARY_CLASS}`} onClick={rejectNonEssential}>
            {COOKIE_CONSENT_BANNER_COPY.essentialOnlyLabel}
          </button>
          <button type="button" className={`btn ${COOKIE_CONSENT_BANNER_GHOST_CLASS}`} onClick={openPreferences}>
            {COOKIE_CONSENT_BANNER_COPY.manageLabel}
          </button>
        </div>
      </div>
    </section>
  );
}
