import { describe, expect, it } from "vitest";
import { HOME_HERO_OPS_FLOW_HREF, HOME_OPS_FLOW_SECTION_ID, HOME_PAGE_ASSETS, HOME_PAGE_COPY } from "./homePageContent";
import { ROUTES } from "./routes";

describe("homePageContent", () => {
  it("exposes cropped home photography paths", () => {
    expect(HOME_PAGE_ASSETS.heroMonitor).toBe("/assets/home/home-hero-monitor.png");
    expect(HOME_PAGE_ASSETS.heroMonitor2x).toBe("/assets/home/home-hero-monitor@2x.png");
    expect(HOME_PAGE_ASSETS.serverRacks).toBe("/assets/home/server-racks.png");
    expect(HOME_PAGE_ASSETS.serverRacks2x).toBe("/assets/home/server-racks@2x.png");
  });

  it("positions the hero on enterprise AI products and the two-week audit", () => {
    expect(HOME_PAGE_COPY.hero.badge).toBe("AN AI & CLOUD PRODUCT & ENGINEERING FIRM");
    expect(HOME_PAGE_COPY.hero.title).toBe("Enterprise AI Products & Cloud-Native Web Systems");
    expect(HOME_PAGE_COPY.hero.subtext).toMatch(/governed Model Context Protocol \(MCP\)/);
    expect(HOME_PAGE_COPY.hero.ctaPrimary).toBe("Explore AI Products");
    expect(HOME_PAGE_COPY.hero.ctaPrimaryTo).toBe(HOME_HERO_OPS_FLOW_HREF);
    expect(HOME_HERO_OPS_FLOW_HREF).toBe(`/#${HOME_OPS_FLOW_SECTION_ID}`);
    expect(HOME_PAGE_COPY.hero.ctaSecondary).toBe("Book 2-Week AI Audit");
    expect(HOME_PAGE_COPY.hero.ctaSecondaryTo).toBe(ROUTES.aiOperationalAudit);
  });

  it("defines the four Commiters governance pillars", () => {
    expect(HOME_PAGE_COPY.corePillars.title).toBe("The Commiters Governance Standard");
    expect(HOME_PAGE_COPY.corePillars.items).toHaveLength(4);
    expect(HOME_PAGE_COPY.corePillars.items.map((item) => item.title)).toEqual([
      "Governed MCP Integration",
      "Two-Tier Policy Gateways",
      "Zero Ambient Authority & RLS",
      "Human-in-the-Loop ('Vibe Diff')",
    ]);
    expect(HOME_PAGE_COPY.corePillars.items[0].body).toMatch(/Model Context Protocol \(MCP\) sockets/);
    expect(HOME_PAGE_COPY.corePillars.items[1].body).toMatch(/deterministic RBAC/);
    expect(HOME_PAGE_COPY.corePillars.items[2].body).toMatch(/Row-Level Security \(RLS\)/);
    expect(HOME_PAGE_COPY.corePillars.items[3].body).toMatch(/explicit user confirmation/);
  });

  it("describes spec-driven cloud infrastructure with three scale bullets", () => {
    expect(HOME_PAGE_COPY.builtForScale.title).toBe("Spec-Driven Cloud Infrastructure");
    expect(HOME_PAGE_COPY.builtForScale.body).toMatch(/cloud-native web platforms/);
    expect(HOME_PAGE_COPY.builtForScale.features).toHaveLength(3);
    expect(HOME_PAGE_COPY.builtForScale.features.map((feature) => feature.title)).toEqual([
      "Cloud-Native Web Architecture (AWS, GCP, Azure, Vercel)",
      "Zero Ambient Authority & Database Row-Level Security (RLS)",
      "Micro-optimized API Response Times (<200ms) with strict SLA tracking",
    ]);
    expect(HOME_PAGE_COPY.bottomCta.title).toBe("Ready to Build the Future?");
    expect(HOME_PAGE_COPY.bottomCta.subtext).toBe(
      "Join the ranks of high-performance companies powered by Commiters.",
    );
    expect(HOME_PAGE_COPY.bottomCta.buttonTo).toBe(ROUTES.contact);
  });
});
