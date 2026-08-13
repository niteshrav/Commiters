import { describe, expect, it } from "vitest";
import {
  TRUSTTAP_ABOUT,
  TRUSTTAP_BENEFITS,
  TRUSTTAP_FEATURES,
  TRUSTTAP_HERO_SHOWCASE,
  TRUSTTAP_PREVIEW,
  TRUSTTAP_SEO,
} from "./trustTapPageContent";
import { ROUTES } from "./routes";

describe("trustTapPageContent", () => {
  it("defines SEO metadata and product route", () => {
    expect(TRUSTTAP_SEO.path).toBe(ROUTES.trustTap);
    expect(TRUSTTAP_SEO.description.length).toBeGreaterThan(40);
    expect(TRUSTTAP_SEO.title).toMatch(/TrustTap/i);
  });

  it("uses a distinct image for each TrustTap marketing section", () => {
    const imagePaths = [
      TRUSTTAP_HERO_SHOWCASE.livePreview.src,
      TRUSTTAP_HERO_SHOWCASE.accent.src,
      TRUSTTAP_ABOUT.illustration.src,
      ...TRUSTTAP_PREVIEW.shots.map((shot) => shot.src),
    ];
    expect(new Set(imagePaths).size).toBe(imagePaths.length);
  });

  it("lists six features and five benefits requested for the product page", () => {
    expect(TRUSTTAP_FEATURES.items).toHaveLength(6);
    expect(TRUSTTAP_FEATURES.items.map((item) => item.title)).toEqual([
      "Customer Reviews",
      "Reputation Management",
      "QR Review Collection",
      "Analytics Dashboard",
      "Multi-location Support",
      "Notifications",
    ]);
    expect(TRUSTTAP_BENEFITS.items).toEqual([
      "Increase Google Reviews",
      "Build Customer Trust",
      "Improve Local SEO",
      "Easy Setup",
      "Better Customer Engagement",
    ]);
  });
});
