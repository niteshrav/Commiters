import { describe, expect, it } from "vitest";
import {
  FOUNDER_SKILL_BARS,
  FOUNDER_SKILL_CHIPS,
  HOME_PORTFOLIO_PROJECTS,
  HOME_SERVICE_CARDS,
  HOME_TESTIMONIALS,
  HOME_TRUST_STATS,
  SERVICE_FEATURE_PILLS,
} from "./siteTrustContent";

describe("siteTrustContent", () => {
  it("exposes homepage stat strip from the review checklist", () => {
    expect(HOME_TRUST_STATS).toHaveLength(3);
    expect(HOME_TRUST_STATS.map((s) => s.label)).toEqual(
      expect.arrayContaining(["Projects Delivered", "Countries", "Reply Guarantee"]),
    );
  });

  it("includes three client testimonials for social proof", () => {
    expect(HOME_TESTIMONIALS).toHaveLength(3);
    expect(HOME_TESTIMONIALS[0].countryCode).toBe("IN");
    expect(HOME_TESTIMONIALS[0].initials).toBe("AK");
  });

  it("lists portfolio projects with visual variants for the Stitch mockup cards", () => {
    expect(HOME_PORTFOLIO_PROJECTS).toHaveLength(4);
    expect(HOME_PORTFOLIO_PROJECTS[1].visualVariant).toBe("navy");
    expect(HOME_PORTFOLIO_PROJECTS[1].techStack).toMatch(/PYTHON/);
  });

  it("tags each home service card with a best-for audience", () => {
    expect(HOME_SERVICE_CARDS).toHaveLength(6);
    for (const card of HOME_SERVICE_CARDS) {
      expect(card.bestFor.length).toBeGreaterThan(5);
    }
  });

  it("maps every service section to pill chips instead of long bullet lists", () => {
    expect(Object.keys(SERVICE_FEATURE_PILLS)).toHaveLength(6);
    for (const pills of Object.values(SERVICE_FEATURE_PILLS)) {
      expect(pills.length).toBeGreaterThanOrEqual(4);
    }
  });

  it("lists founder skill chips for the About page", () => {
    expect(FOUNDER_SKILL_CHIPS).toContain("React");
    expect(FOUNDER_SKILL_CHIPS).toContain("AI/LLM");
  });

  it("exposes founder skill progress bars from the Stitch about mockup", () => {
    expect(FOUNDER_SKILL_BARS).toHaveLength(4);
    expect(FOUNDER_SKILL_BARS[0].level).toBeGreaterThan(80);
  });
});
