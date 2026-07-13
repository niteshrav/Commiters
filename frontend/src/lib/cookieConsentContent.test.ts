import { describe, expect, it } from "vitest";
import { ROUTES } from "./routes";
import { STITCH_COPY } from "./stitchDesign";
import {
  COOKIE_CONSENT_BANNER_COPY,
  COOKIE_PREFERENCE_ROWS,
  COOKIE_PREFERENCES_PANEL_COPY,
} from "./cookieConsentContent";

describe("cookieConsentContent", () => {
  it("defines the consent banner copy and policy link", () => {
    expect(COOKIE_CONSENT_BANNER_COPY.title).toBe(STITCH_COPY.cookie.consentBanner.title);
    expect(COOKIE_CONSENT_BANNER_COPY.acceptAllLabel).toBe("Accept All");
    expect(COOKIE_CONSENT_BANNER_COPY.essentialOnlyLabel).toBe("Essential Only");
    expect(COOKIE_CONSENT_BANNER_COPY.policyHref).toBe(ROUTES.cookiePolicy);
  });

  it("maps the four cookie categories into preference rows", () => {
    expect(COOKIE_PREFERENCE_ROWS.map((row) => row.id)).toEqual([
      "necessary",
      "performance",
      "functional",
      "targeting",
    ]);
    expect(COOKIE_PREFERENCE_ROWS[0].required).toBe(true);
    expect(COOKIE_PREFERENCE_ROWS.slice(1).every((row) => !row.required)).toBe(true);
  });

  it("defines the preferences panel actions", () => {
    expect(COOKIE_PREFERENCES_PANEL_COPY.title).toBe("Cookie Preferences");
    expect(COOKIE_PREFERENCES_PANEL_COPY.saveLabel).toBe("Save Preferences");
    expect(COOKIE_PREFERENCES_PANEL_COPY.necessaryStatusLabel).toBe("Always active");
  });
});
