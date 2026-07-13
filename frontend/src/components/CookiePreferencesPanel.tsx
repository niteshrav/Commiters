import { useEffect, useState } from "react";
import {
  COOKIE_PREFERENCE_ROWS,
  COOKIE_PREFERENCES_PANEL_COPY,
} from "../lib/cookieConsentContent";
import {
  COOKIE_CONSENT_REJECT_ALL,
  type CookieConsentPreferences,
} from "../lib/cookieConsentStorage";
import {
  COOKIE_PREFERENCES_ACTIONS_CLASS,
  COOKIE_PREFERENCES_BACKDROP_CLASS,
  COOKIE_PREFERENCES_CANCEL_CLASS,
  COOKIE_PREFERENCES_DESCRIPTION_CLASS,
  COOKIE_PREFERENCES_DIALOG_CLASS,
  COOKIE_PREFERENCES_HEADER_CLASS,
  COOKIE_PREFERENCES_ITEM_BODY_CLASS,
  COOKIE_PREFERENCES_ITEM_CLASS,
  COOKIE_PREFERENCES_ITEM_CONTROL_CLASS,
  COOKIE_PREFERENCES_ITEM_LABEL_CLASS,
  COOKIE_PREFERENCES_LIST_CLASS,
  COOKIE_PREFERENCES_PANEL_CLASS,
  COOKIE_PREFERENCES_SAVE_CLASS,
  COOKIE_PREFERENCES_STATUS_CLASS,
  COOKIE_PREFERENCES_TITLE_CLASS,
  COOKIE_PREFERENCES_TOGGLE_CLASS,
} from "../lib/cookieConsentLayout";
import { useCookieConsent } from "./CookieConsentProvider";

type DraftPreferences = Pick<CookieConsentPreferences, "performance" | "functional" | "targeting">;

function buildDraftPreferences(preferences: CookieConsentPreferences | null): DraftPreferences {
  if (!preferences) return COOKIE_CONSENT_REJECT_ALL;

  return {
    performance: preferences.performance,
    functional: preferences.functional,
    targeting: preferences.targeting,
  };
}

export default function CookiePreferencesPanel() {
  const { preferences, preferencesOpen, closePreferences, savePreferences } = useCookieConsent();
  const [draft, setDraft] = useState<DraftPreferences>(() => buildDraftPreferences(preferences));

  useEffect(() => {
    if (preferencesOpen) {
      setDraft(buildDraftPreferences(preferences));
    }
  }, [preferences, preferencesOpen]);

  if (!preferencesOpen) return null;

  return (
    <div className={COOKIE_PREFERENCES_PANEL_CLASS} data-testid="cookie-preferences-panel">
      <button
        type="button"
        className={COOKIE_PREFERENCES_BACKDROP_CLASS}
        aria-label="Close cookie preferences"
        onClick={closePreferences}
      />
      <div
        className={COOKIE_PREFERENCES_DIALOG_CLASS}
        role="dialog"
        aria-modal="true"
        aria-labelledby="cookie-preferences-title"
        data-testid="cookie-preferences-dialog"
      >
        <header className={COOKIE_PREFERENCES_HEADER_CLASS}>
          <h2 id="cookie-preferences-title" className={COOKIE_PREFERENCES_TITLE_CLASS}>
            {COOKIE_PREFERENCES_PANEL_COPY.title}
          </h2>
          <p className={COOKIE_PREFERENCES_DESCRIPTION_CLASS}>{COOKIE_PREFERENCES_PANEL_COPY.description}</p>
        </header>

        <ul className={COOKIE_PREFERENCES_LIST_CLASS}>
          {COOKIE_PREFERENCE_ROWS.map((row) => (
            <li key={row.id} className={COOKIE_PREFERENCES_ITEM_CLASS} data-testid={`cookie-preference-row-${row.id}`}>
              <div className={COOKIE_PREFERENCES_ITEM_LABEL_CLASS}>
                <p>{row.label}</p>
                <p className={COOKIE_PREFERENCES_ITEM_BODY_CLASS}>{row.description}</p>
              </div>
              <div className={COOKIE_PREFERENCES_ITEM_CONTROL_CLASS}>
                {row.required ? (
                  <span className={COOKIE_PREFERENCES_STATUS_CLASS}>{COOKIE_PREFERENCES_PANEL_COPY.necessaryStatusLabel}</span>
                ) : (
                  <label className={COOKIE_PREFERENCES_TOGGLE_CLASS}>
                    <input
                      type="checkbox"
                      checked={draft[row.id]}
                      aria-label={`Enable ${row.label} cookies`}
                      onChange={(event) =>
                        setDraft((current) => ({
                          ...current,
                          [row.id]: event.target.checked,
                        }))
                      }
                    />
                    <span className="cookie-preferences-toggle-ui" aria-hidden />
                  </label>
                )}
              </div>
            </li>
          ))}
        </ul>

        <div className={COOKIE_PREFERENCES_ACTIONS_CLASS}>
          <button type="button" className={`btn ${COOKIE_PREFERENCES_SAVE_CLASS}`} onClick={() => savePreferences(draft)}>
            {COOKIE_PREFERENCES_PANEL_COPY.saveLabel}
          </button>
          <button type="button" className={`btn ${COOKIE_PREFERENCES_CANCEL_CLASS}`} onClick={closePreferences}>
            {COOKIE_PREFERENCES_PANEL_COPY.cancelLabel}
          </button>
        </div>
      </div>
    </div>
  );
}
