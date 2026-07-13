import { Link, useLocation } from "react-router-dom";
import {
  IconAutomationSpark,
  IconChartLine,
  IconShieldCheck,
  IconTarget,
} from "./icons";
import type { CookieCategoryVariant } from "../lib/cookiePageContent";
import {
  COOKIE_CATEGORY_CARDS,
  COOKIE_MANAGE_CTA,
  COOKIE_POLICY_DISCLAIMER,
  COOKIE_POLICY_NAV,
  COOKIE_POLICY_SECTIONS,
} from "../lib/cookiePageContent";
import {
  COOKIE_CATEGORY_BODY_CLASS,
  COOKIE_CATEGORY_CARD_CLASS,
  COOKIE_CATEGORY_GRID_CLASS,
  COOKIE_CATEGORY_ICON_CLASS,
  COOKIE_CATEGORY_LABEL_CLASS,
  COOKIE_DISCLAIMER_CLASS,
  COOKIE_DOCUMENT_CLASS,
  COOKIE_LAYOUT_CLASS,
  COOKIE_MAIN_CLASS,
  COOKIE_MANAGE_ACTIONS_CLASS,
  COOKIE_MANAGE_BODY_CLASS,
  COOKIE_MANAGE_BUTTON_CLASS,
  COOKIE_MANAGE_CTA_CLASS,
  COOKIE_MANAGE_INNER_CLASS,
  COOKIE_MANAGE_PRIVACY_LINK_CLASS,
  COOKIE_MANAGE_TITLE_CLASS,
  COOKIE_NAV_CLASS,
  COOKIE_NAV_LINK_ACTIVE_CLASS,
  COOKIE_NAV_LINK_CLASS,
  COOKIE_SECTION_BODY_CLASS,
  COOKIE_SECTION_CLASS,
  COOKIE_SECTION_TITLE_CLASS,
} from "../lib/cookiePageLayout";
import { useCookieConsent } from "./CookieConsentProvider";

function renderCategoryIcon(variant: CookieCategoryVariant) {
  switch (variant) {
    case "necessary":
      return <IconShieldCheck width={22} height={22} />;
    case "performance":
      return <IconChartLine width={22} height={22} />;
    case "functional":
      return <IconAutomationSpark width={22} height={22} />;
    case "targeting":
      return <IconTarget width={22} height={22} />;
  }
}

export default function CookiePolicyDocument() {
  const location = useLocation();
  const { openPreferences } = useCookieConsent();
  const activeId = location.hash.replace(/^#/, "") || COOKIE_POLICY_NAV[0].id;

  return (
    <div className={COOKIE_DOCUMENT_CLASS} data-testid="cookie-policy-document">
      <div className={COOKIE_LAYOUT_CLASS} data-testid="cookie-policy-layout">
        <nav className={COOKIE_NAV_CLASS} data-testid="cookie-policy-nav" aria-label="Cookie policy sections">
          <ul>
            {COOKIE_POLICY_NAV.map((item) => (
              <li key={item.id}>
                <a
                  href={`#${item.id}`}
                  className={`${COOKIE_NAV_LINK_CLASS}${activeId === item.id ? ` ${COOKIE_NAV_LINK_ACTIVE_CLASS}` : ""}`}
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className={COOKIE_MAIN_CLASS} data-testid="cookie-policy-main">
          {COOKIE_POLICY_SECTIONS.map((section) => (
            <section
              key={section.id}
              id={section.id}
              className={COOKIE_SECTION_CLASS}
              data-testid={`cookie-policy-section-${section.number}`}
              aria-labelledby={`cookie-section-${section.id}-title`}
            >
              <h2 id={`cookie-section-${section.id}-title`} className={COOKIE_SECTION_TITLE_CLASS}>
                {section.number}. {section.title}
              </h2>
              {section.body ? <p className={COOKIE_SECTION_BODY_CLASS}>{section.body}</p> : null}
              {section.intro ? <p className={COOKIE_SECTION_BODY_CLASS}>{section.intro}</p> : null}

              {section.id === "how-we-use-cookies" ? (
                <div className={COOKIE_CATEGORY_GRID_CLASS} data-testid="cookie-policy-category-grid" id="types-of-cookies">
                  {COOKIE_CATEGORY_CARDS.map((card) => (
                    <article
                      key={card.variant}
                      className={`${COOKIE_CATEGORY_CARD_CLASS} cookie-policy-category-card--${card.variant}`}
                      data-testid={`cookie-policy-category-card-${card.variant}`}
                    >
                      <span className={COOKIE_CATEGORY_ICON_CLASS}>{renderCategoryIcon(card.variant)}</span>
                      <p className={COOKIE_CATEGORY_LABEL_CLASS}>{card.label}</p>
                      <p className={COOKIE_CATEGORY_BODY_CLASS}>{card.description}</p>
                    </article>
                  ))}
                </div>
              ) : null}
            </section>
          ))}

          <section
            id="managing-preferences"
            className={COOKIE_MANAGE_CTA_CLASS}
            data-testid="cookie-policy-manage-cta"
            aria-labelledby="cookie-manage-title"
          >
            <div className={COOKIE_MANAGE_INNER_CLASS}>
              <h2 id="cookie-manage-title" className={COOKIE_MANAGE_TITLE_CLASS}>
                {COOKIE_MANAGE_CTA.title}
              </h2>
              <p className={COOKIE_MANAGE_BODY_CLASS}>{COOKIE_MANAGE_CTA.description}</p>
              <div className={COOKIE_MANAGE_ACTIONS_CLASS}>
                <button type="button" className={COOKIE_MANAGE_BUTTON_CLASS} onClick={openPreferences}>
                  {COOKIE_MANAGE_CTA.buttonLabel}
                </button>
                <Link className={COOKIE_MANAGE_PRIVACY_LINK_CLASS} to={COOKIE_MANAGE_CTA.privacyHref}>
                  {COOKIE_MANAGE_CTA.privacyLinkLabel} →
                </Link>
              </div>
            </div>
          </section>

          <p className={COOKIE_DISCLAIMER_CLASS}>{COOKIE_POLICY_DISCLAIMER}</p>
        </div>
      </div>
    </div>
  );
}
