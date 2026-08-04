import { describe, expect, it } from "vitest";
import { TRUSTTAP_BENEFITS, TRUSTTAP_FEATURES, TRUSTTAP_SEO } from "./trustTapPageContent";
import { ROUTES } from "./routes";

describe("trustTapPageContent", () => {
  it("defines SEO metadata and product route", () => {
    expect(TRUSTTAP_SEO.path).toBe(ROUTES.trustTap);
    expect(TRUSTTAP_SEO.description.length).toBeGreaterThan(40);
    expect(TRUSTTAP_SEO.title).toMatch(/TrustTap/i);
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
