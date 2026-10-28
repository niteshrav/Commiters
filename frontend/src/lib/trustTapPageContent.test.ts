import { describe, expect, it } from "vitest";
import { BRAND_HERO_EYEBROW_TEXT } from "./siteBrandChrome";
import { ROUTES } from "./routes";
import {
  TRUSTTAP_BOTTOM_CTA,
  TRUSTTAP_FEATURES,
  TRUSTTAP_HERO,
  TRUSTTAP_HERO_SHOWCASE,
  TRUSTTAP_HOW_IT_WORKS,
  TRUSTTAP_LIVE_URL,
  TRUSTTAP_PORTAL_BANNER,
  TRUSTTAP_SEO,
} from "./trustTapPageContent";

describe("trustTapPageContent", () => {
  it("defines SEO metadata and product route without logistics copy", () => {
    expect(TRUSTTAP_SEO.path).toBe(ROUTES.trustTap);
    expect(TRUSTTAP_SEO.title).toBe("Prooflyn");
    expect(TRUSTTAP_SEO.description).toBe(TRUSTTAP_HERO.tagline);
    expect(TRUSTTAP_SEO.description).not.toMatch(/ground verification|field inspection|logistics/i);
    expect(TRUSTTAP_LIVE_URL).toBe("https://trusttap.commiters.com/");
  });

  it("references the live-site hero showcase image", () => {
    expect(TRUSTTAP_HERO_SHOWCASE.image.src).toMatch(/prooflyn-hero-v10\.png$/);
    expect(TRUSTTAP_HERO_SHOWCASE.image.srcSet).toMatch(/prooflyn-hero-v10@2x\.png/);
  });

  it("uses punchy hero copy and a live portal secondary CTA", () => {
    expect(TRUSTTAP_HERO.kicker).toBe(BRAND_HERO_EYEBROW_TEXT);
    expect(TRUSTTAP_HERO.title).toBe("Engineering Public Trust at the Point of Service.");
    expect(TRUSTTAP_HERO.tagline).toBe(
      "Smart NFC/QR touchpoints that scale 5-star Google reviews while intercepting customer complaints privately.",
    );
    expect(TRUSTTAP_HERO.primaryLabel).toBe("Deploy Prooflyn");
    expect(TRUSTTAP_HERO.primaryHref).toBe(ROUTES.contact);
    expect(TRUSTTAP_HERO.secondaryLabel).toBe("Launch Merchant Portal");
    expect(TRUSTTAP_HERO.secondaryHref).toBe(TRUSTTAP_LIVE_URL);
    expect(TRUSTTAP_HERO.secondaryLabel).not.toMatch(/commiters\.com/i);
    expect(TRUSTTAP_HERO.chips.map((chip) => chip.label)).toEqual([
      "NFC Touchpoint Hardware",
      "Private Grievance Interception",
      "Weekly Merchant Intelligence",
    ]);
  });

  it("lists three merchant pillars and a three-step flow", () => {
    expect(TRUSTTAP_FEATURES.title).toBe("Built for Modern Merchants");
    expect(TRUSTTAP_FEATURES.items.map((item) => [item.title, item.body])).toEqual([
      [
        "Automated Sentiment Routing",
        "Routes positive taps directly to Google Reviews and private feedback straight to management.",
      ],
      [
        "On-Premise Tap Hardware",
        "Architectural-grade NFC & QR counter stands for billing desks and tables.",
      ],
      [
        "Merchant Intelligence Digests",
        "Weekly and monthly email reports with clear staff performance action items.",
      ],
    ]);

    expect(TRUSTTAP_HOW_IT_WORKS.title).toBe("How It Works");
    expect(TRUSTTAP_HOW_IT_WORKS.steps.map((step) => [step.title, step.body])).toEqual([
      ["Connect", "Link your Google Business profile."],
      ["Anchor", "Place NFC hardware at customer touchpoints."],
      ["Scale", "Watch 5-star reviews grow while acting on weekly reports."],
    ]);
  });

  it("defines the portal banner and bottom CTA to the live platform", () => {
    expect(TRUSTTAP_PORTAL_BANNER.title).toBe(
      "Need deep platform specs & live dashboard previews?",
    );
    expect(TRUSTTAP_PORTAL_BANNER.subtext).toBe(
      "Explore our dedicated merchant portal for hardware options, enterprise tiers, and live demo access.",
    );
    expect(TRUSTTAP_PORTAL_BANNER.ctaLabel).toBe("Explore Dedicated Platform");
    expect(TRUSTTAP_PORTAL_BANNER.href).toBe(TRUSTTAP_LIVE_URL);
    expect(TRUSTTAP_PORTAL_BANNER.ctaLabel).not.toMatch(/commiters\.com/i);

    expect(TRUSTTAP_BOTTOM_CTA.title).toBe("Ready to protect and grow your on-premise reputation?");
    expect(TRUSTTAP_BOTTOM_CTA.subtext).toBe("Deploy Prooflyn hardware today or access our live merchant suite.");
    expect(TRUSTTAP_BOTTOM_CTA.primaryLabel).toBe("Deploy Prooflyn");
    expect(TRUSTTAP_BOTTOM_CTA.primaryHref).toBe(ROUTES.contact);
    expect(TRUSTTAP_BOTTOM_CTA.secondaryLabel).toBe("Access Merchant Hub");
    expect(TRUSTTAP_BOTTOM_CTA.secondaryHref).toBe(TRUSTTAP_LIVE_URL);
    expect(TRUSTTAP_BOTTOM_CTA.secondaryLabel).not.toMatch(/commiters\.com/i);
  });
});
