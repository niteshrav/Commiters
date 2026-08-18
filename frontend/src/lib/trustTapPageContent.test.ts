import { describe, expect, it } from "vitest";
import {
  TRUSTTAP_BENEFITS,
  TRUSTTAP_FEATURES,
  TRUSTTAP_HERO_SHOWCASE,
  TRUSTTAP_LIVE_URL,
  TRUSTTAP_SEO,
} from "./trustTapPageContent";
import { ROUTES } from "./routes";

describe("trustTapPageContent", () => {
  it("defines SEO metadata and product route", () => {
    expect(TRUSTTAP_SEO.path).toBe(ROUTES.trustTap);
    expect(TRUSTTAP_SEO.description).toMatch(/QR-powered customer feedback/i);
    expect(TRUSTTAP_SEO.title).toBe("TrustTap");
    expect(TRUSTTAP_LIVE_URL).toBe("https://trusttap.commiters.com/");
  });

  it("references the live-site hero showcase image", () => {
    expect(TRUSTTAP_HERO_SHOWCASE.image.src).toMatch(/trusttap-hero-marketing\.png$/);
    expect(TRUSTTAP_HERO_SHOWCASE.image.srcSet).toMatch(/trusttap-hero-marketing@2x\.png/);
  });

  it("lists four live-site features and three benefit cards", () => {
    expect(TRUSTTAP_FEATURES.items).toHaveLength(4);
    expect(TRUSTTAP_FEATURES.title).toBe("Built for real counters");
    expect(TRUSTTAP_FEATURES.items.map((item) => item.title)).toEqual([
      "QR-powered collection",
      "Private feedback first",
      "Google reviews, ungated",
      "Owner alerts",
    ]);
    expect(TRUSTTAP_BENEFITS.items).toHaveLength(3);
    expect(TRUSTTAP_BENEFITS.items.map((item) => item.title)).toEqual([
      "Protect reputation",
      "Look professional",
      "Operate simply",
    ]);
  });
});
