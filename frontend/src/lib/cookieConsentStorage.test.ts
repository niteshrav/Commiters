import { describe, expect, it, beforeEach } from "vitest";
import {
  COOKIE_CONSENT_ACCEPT_ALL,
  COOKIE_CONSENT_REJECT_ALL,
  COOKIE_CONSENT_STORAGE_KEY,
  clearCookieConsent,
  createCookieConsentRecord,
  isCookieConsentRecord,
  readCookieConsent,
  writeCookieConsent,
} from "./cookieConsentStorage";

describe("cookieConsentStorage", () => {
  beforeEach(() => {
    window.localStorage.clear();
  });

  it("creates and validates consent records", () => {
    const record = createCookieConsentRecord(COOKIE_CONSENT_ACCEPT_ALL);
    expect(isCookieConsentRecord(record)).toBe(true);
    expect(record.preferences).toEqual(COOKIE_CONSENT_ACCEPT_ALL);
  });

  it("persists consent in localStorage and applies dataset flags", () => {
    writeCookieConsent(COOKIE_CONSENT_REJECT_ALL);
    expect(window.localStorage.getItem(COOKIE_CONSENT_STORAGE_KEY)).toBeTruthy();
    expect(readCookieConsent()?.preferences).toEqual(COOKIE_CONSENT_REJECT_ALL);
    expect(document.documentElement.dataset.cookiePerformance).toBe("denied");
    expect(document.documentElement.dataset.cookieFunctional).toBe("denied");
    expect(document.documentElement.dataset.cookieTargeting).toBe("denied");
  });

  it("clears stored consent", () => {
    writeCookieConsent(COOKIE_CONSENT_ACCEPT_ALL);
    clearCookieConsent();
    expect(readCookieConsent()).toBeNull();
    expect(document.documentElement.dataset.cookieConsent).toBeUndefined();
  });
});
