export const COOKIE_CONSENT_STORAGE_KEY = "commiters-cookie-consent" as const;
export const COOKIE_CONSENT_VERSION = 1 as const;

export type OptionalCookieCategory = "performance" | "functional" | "targeting";

export type CookieConsentPreferences = {
  necessary: true;
  performance: boolean;
  functional: boolean;
  targeting: boolean;
};

export type CookieConsentRecord = {
  version: typeof COOKIE_CONSENT_VERSION;
  updatedAt: string;
  preferences: CookieConsentPreferences;
};

export const COOKIE_CONSENT_REJECT_ALL: CookieConsentPreferences = {
  necessary: true,
  performance: false,
  functional: false,
  targeting: false,
};

export const COOKIE_CONSENT_ACCEPT_ALL: CookieConsentPreferences = {
  necessary: true,
  performance: true,
  functional: true,
  targeting: true,
};

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}

export function isCookieConsentPreferences(value: unknown): value is CookieConsentPreferences {
  if (!isRecord(value)) return false;

  return (
    value.necessary === true &&
    typeof value.performance === "boolean" &&
    typeof value.functional === "boolean" &&
    typeof value.targeting === "boolean"
  );
}

export function isCookieConsentRecord(value: unknown): value is CookieConsentRecord {
  if (!isRecord(value)) return false;

  return value.version === COOKIE_CONSENT_VERSION && typeof value.updatedAt === "string" && isCookieConsentPreferences(value.preferences);
}

export function createCookieConsentRecord(preferences: CookieConsentPreferences): CookieConsentRecord {
  return {
    version: COOKIE_CONSENT_VERSION,
    updatedAt: new Date().toISOString(),
    preferences,
  };
}

export function readCookieConsent(storage: Storage | null = getBrowserStorage()): CookieConsentRecord | null {
  if (!storage) return null;

  try {
    const raw = storage.getItem(COOKIE_CONSENT_STORAGE_KEY);
    if (!raw) return null;

    const parsed: unknown = JSON.parse(raw);
    return isCookieConsentRecord(parsed) ? parsed : null;
  } catch {
    return null;
  }
}

export function writeCookieConsent(
  preferences: CookieConsentPreferences,
  storage: Storage | null = getBrowserStorage(),
): CookieConsentRecord | null {
  if (!storage) return null;

  const record = createCookieConsentRecord(preferences);
  storage.setItem(COOKIE_CONSENT_STORAGE_KEY, JSON.stringify(record));
  applyCookieConsentDataset(preferences);
  return record;
}

export function clearCookieConsent(storage: Storage | null = getBrowserStorage()): void {
  storage?.removeItem(COOKIE_CONSENT_STORAGE_KEY);
  clearCookieConsentDataset();
}

export function applyCookieConsentDataset(preferences: CookieConsentPreferences, root: HTMLElement = document.documentElement): void {
  root.dataset.cookieConsent = "true";
  root.dataset.cookiePerformance = preferences.performance ? "granted" : "denied";
  root.dataset.cookieFunctional = preferences.functional ? "granted" : "denied";
  root.dataset.cookieTargeting = preferences.targeting ? "granted" : "denied";
}

export function clearCookieConsentDataset(root: HTMLElement = document.documentElement): void {
  delete root.dataset.cookieConsent;
  delete root.dataset.cookiePerformance;
  delete root.dataset.cookieFunctional;
  delete root.dataset.cookieTargeting;
}

function getBrowserStorage(): Storage | null {
  if (typeof window === "undefined") return null;

  try {
    return window.localStorage;
  } catch {
    return null;
  }
}
