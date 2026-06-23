import { describe, expect, it } from "vitest";
import { ROUTES } from "./routes";
import { STITCH_COPY } from "./stitchDesign";
import {
  COOKIE_CATEGORY_CARDS,
  COOKIE_MANAGE_CTA,
  COOKIE_PAGE_COPY,
  COOKIE_POLICY_DISCLAIMER,
  COOKIE_POLICY_NAV,
  COOKIE_POLICY_SECTIONS,
} from "./cookiePageContent";

describe("cookiePageContent", () => {
  it("pins the cookie policy hero from the Stitch compliance screenshot", () => {
    expect(STITCH_COPY.cookie.kicker).toBe("COMPLIANCE");
    expect(COOKIE_PAGE_COPY.title).toBe("Cookie Policy");
    expect(COOKIE_PAGE_COPY.lastUpdatedLabel).toBe("Last Updated:");
    expect(COOKIE_PAGE_COPY.lastUpdatedDate).toBe(STITCH_COPY.privacy.lastUpdatedDate);
  });

  it("lists sidebar anchors for each policy section", () => {
    expect(COOKIE_POLICY_NAV.map((item) => item.label)).toEqual([
      "What are Cookies",
      "How We Use Them",
      "Types of Cookies",
      "Managing Preferences",
    ]);
    expect(COOKIE_POLICY_NAV.map((item) => item.id)).toEqual([
      "what-are-cookies",
      "how-we-use-cookies",
      "types-of-cookies",
      "managing-preferences",
    ]);
  });

  it("defines numbered sections with Commiters-specific copy", () => {
    expect(COOKIE_POLICY_SECTIONS.map((section) => section.title)).toEqual([
      "What are cookies?",
      "How we use cookies",
    ]);
    expect(COOKIE_POLICY_SECTIONS[0].body).toContain("Commiters Softwares");
    expect(COOKIE_POLICY_SECTIONS[0].body).toContain("improve your experience");
    expect(COOKIE_POLICY_SECTIONS[1].intro).toContain("secure, reliable experience");
  });

  it("defines the four cookie category cards from the screenshot grid", () => {
    expect(COOKIE_CATEGORY_CARDS.map((card) => card.label)).toEqual([
      "STRICTLY NECESSARY",
      "PERFORMANCE",
      "FUNCTIONAL",
      "TARGETING",
    ]);
    expect(COOKIE_CATEGORY_CARDS.map((card) => card.variant)).toEqual([
      "necessary",
      "performance",
      "functional",
      "targeting",
    ]);
    expect(COOKIE_CATEGORY_CARDS[0].description).toMatch(/cannot be switched off/i);
    expect(COOKIE_CATEGORY_CARDS[3].description).toMatch(/advertising partners/i);
  });

  it("defines the manage cookies CTA and privacy cross-link", () => {
    expect(COOKIE_MANAGE_CTA.title).toBe("How to manage cookies");
    expect(COOKIE_MANAGE_CTA.buttonLabel).toBe("Manage Cookie Preferences");
    expect(COOKIE_MANAGE_CTA.buttonHref).toBe("#managing-preferences");
    expect(COOKIE_MANAGE_CTA.privacyLinkLabel).toBe("Read Privacy Policy");
    expect(COOKIE_MANAGE_CTA.privacyHref).toBe(ROUTES.privacyPolicy);
  });

  it("defines the consent disclaimer for the page footer band", () => {
    expect(COOKIE_POLICY_DISCLAIMER).toContain("data compliance team");
    expect(COOKIE_POLICY_DISCLAIMER).toContain("consent");
  });
});
