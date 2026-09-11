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
    expect(HOME_PAGE_COPY.hero.title).toBe("Code Your Success");
    expect(HOME_PAGE_COPY.hero.subtext).toMatch(/governed Model Context Protocol \(MCP\)/);
    expect(HOME_PAGE_COPY.hero.ctaPrimary).toBe("Try OpsFlow AI");
    expect(HOME_PAGE_COPY.hero.ctaPrimaryTo).toBe(HOME_HERO_OPS_FLOW_HREF);
    expect(HOME_HERO_OPS_FLOW_HREF).toBe(`/#${HOME_OPS_FLOW_SECTION_ID}`);
    expect(HOME_PAGE_COPY.hero.ctaSecondary).toBe("Book Operational Audit");
    expect(HOME_PAGE_COPY.hero.ctaSecondaryTo).toBe(ROUTES.aiOperationalAudit);
  });

  it("defines the four Commiters governance pillars", () => {
    expect(HOME_PAGE_COPY.corePillars.kicker).toBe("BUILT ON TRUST");
    expect(HOME_PAGE_COPY.corePillars.title).toBe("The Commiters Governance Standard");
    expect(HOME_PAGE_COPY.corePillars.items).toHaveLength(4);
    expect(HOME_PAGE_COPY.corePillars.items.map((item) => item.label)).toEqual([
      "MCP Connect",
      "Policy Guard",
      "Access Shield",
      "Vibe Check",
    ]);
    expect(HOME_PAGE_COPY.corePillars.items.map((item) => item.title)).toEqual([
      "Governed MCP Integration",
      "Two-Tier Policy Gateways",
      "Zero Ambient Authority & RLS",
      "Human-in-the-Loop",
    ]);
    expect(HOME_PAGE_COPY.corePillars.items.map((item) => item.summary)).toEqual([
      "Secure model-to-data integration.",
      "AI calls with built-in policy checks.",
      "Automatic RLS and least privilege.",
      "Human approval for high-stakes actions.",
    ]);
    expect(HOME_PAGE_COPY.corePillars.items.map((item) => item.tone)).toEqual(["blue", "gold", "green", "purple"]);
    expect(HOME_PAGE_COPY.corePillars.items[0].to).toBe(`${ROUTES.services}#governed-mcp-integration`);
  });

  it("describes the cloud-built-right infrastructure band", () => {
    expect(HOME_PAGE_COPY.builtForScale.kicker).toBe("CLOUD INFRASTRUCTURE");
    expect(HOME_PAGE_COPY.builtForScale.titleLead).toBe("Cloud, Built ");
    expect(HOME_PAGE_COPY.builtForScale.titleAccent).toBe("Right");
    expect(HOME_PAGE_COPY.builtForScale.body).toMatch(/Secure, scalable infrastructure/);
    expect(HOME_PAGE_COPY.builtForScale.features).toHaveLength(3);
    expect(HOME_PAGE_COPY.builtForScale.features.map((feature) => feature.title)).toEqual([
      "Cloud Native",
      "Always Observable",
      "Sub-200ms APIs",
    ]);
    expect(HOME_PAGE_COPY.builtForScale.ctaPrimaryTo).toBe(ROUTES.webApplications);
  });

  it("keeps the dark home bottom CTA copy", () => {
    expect(HOME_PAGE_COPY.bottomCta.title).toBe("Ready to Build the Future?");
    expect(HOME_PAGE_COPY.bottomCta.subtext).toBe(
      "Join the ranks of high-performance companies powered by Commiters.",
    );
    expect(HOME_PAGE_COPY.bottomCta.buttonTo).toBe(ROUTES.contact);
  });
});
