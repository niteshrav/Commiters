import { describe, expect, it } from "vitest";
import { ROUTES } from "./routes";
import {
  SERVICES_OVERVIEW_CAPABILITIES,
  SERVICES_OVERVIEW_CAPABILITIES_SUBTEXT,
  SERVICES_OVERVIEW_CAPABILITIES_TITLE,
  SERVICES_OVERVIEW_HERO,
  SERVICES_OVERVIEW_INQUIRY,
  SERVICES_OVERVIEW_INQUIRY_ANCHOR,
  SERVICES_OVERVIEW_PRODUCTS_ANCHOR,
  SERVICES_OVERVIEW_INQUIRY_INTERESTS,
  SERVICES_OVERVIEW_LEGACY_TITLES,
  SERVICES_OVERVIEW_OFFERINGS,
  SERVICES_OVERVIEW_OFFERINGS_TITLE,
  SERVICES_OVERVIEW_PRODUCTS,
  SERVICES_OVERVIEW_PRODUCTS_TITLE,
  SERVICES_OVERVIEW_SEO,
  SERVICES_OVERVIEW_STANDARDS,
  SERVICES_OVERVIEW_STANDARDS_BANNER,
  SERVICES_OVERVIEW_STANDARDS_SUBTITLE,
  SERVICES_OVERVIEW_STANDARDS_TITLE,
} from "./servicesOverviewPageContent";

describe("servicesOverviewPageContent", () => {
  it("positions the services hero around enterprise AI products and cloud-native systems", () => {
    expect(SERVICES_OVERVIEW_HERO.kicker).toBe("AN AI & CLOUD PRODUCT & ENGINEERING FIRM");
    expect(SERVICES_OVERVIEW_HERO.title).toBe("Enterprise AI Products & Cloud-Native Web Systems");
    expect(SERVICES_OVERVIEW_HERO.subtitle).toBe(
      "We build enterprise AI products and engineer scalable cloud platforms—backed by governed Model Context Protocol (MCP) integrations, zero ambient authority, and spec-driven software development.",
    );
    expect(SERVICES_OVERVIEW_HERO.productsCtaLabel).toBe("Explore AI Products");
    expect(SERVICES_OVERVIEW_HERO.productsCtaTo).toBe(`${ROUTES.services}#${SERVICES_OVERVIEW_PRODUCTS_ANCHOR}`);
    expect(SERVICES_OVERVIEW_HERO.auditCtaLabel).toBe("Book Operational Audit");
    expect(SERVICES_OVERVIEW_HERO.auditCtaTo).toBe(`${ROUTES.services}#${SERVICES_OVERVIEW_INQUIRY_ANCHOR}`);
    expect(SERVICES_OVERVIEW_SEO.path).toBe(ROUTES.services);
    expect(SERVICES_OVERVIEW_SEO.description).toMatch(/enterprise AI products/i);
  });

  it("lists the three flagship operational solutions with canonical routes", () => {
    expect(SERVICES_OVERVIEW_OFFERINGS_TITLE).toBe("Flagship Operational Solutions");
    expect(SERVICES_OVERVIEW_OFFERINGS).toHaveLength(3);
    expect(SERVICES_OVERVIEW_OFFERINGS.map((card) => ({ title: card.title, description: card.description, ctaLabel: card.ctaLabel }))).toEqual([
      {
        title: "AI Operational Audits",
        description:
          "2-week workflow diagnostics, spreadsheet bottleneck elimination, and live working cloud automation blueprints.",
        ctaLabel: "View Audit Details",
      },
      {
        title: "Governed AI & Workflow Systems",
        description:
          "Enterprise-grade document parsing, GST/PAN bills, LLM integrations, and zero-vendor-lockin automated workflows.",
        ctaLabel: "View System Services",
      },
      {
        title: "Spec-Driven Full-Stack Platforms",
        description:
          "Scalable operational portals, SaaS systems, and custom web apps built on Vite, Express, React, and MongoDB.",
        ctaLabel: "View Platform Services",
      },
    ]);
    expect(SERVICES_OVERVIEW_OFFERINGS[0]?.featured).toBe(true);
    expect(SERVICES_OVERVIEW_OFFERINGS.map((card) => card.to)).toEqual([
      ROUTES.aiOperationalAudit,
      ROUTES.aiSolutions,
      ROUTES.webApplications,
    ]);
  });

  it("defines the Committers Way engineering and governance standards grid", () => {
    expect(SERVICES_OVERVIEW_STANDARDS_TITLE).toBe("THE COMMITTERS WAY: ENGINEERING & GOVERNANCE STANDARDS");
    expect(SERVICES_OVERVIEW_STANDARDS_SUBTITLE).toBe(
      "Every application and AI pipeline we deliver is built on a secure, policy-gated architecture.",
    );
    expect(SERVICES_OVERVIEW_STANDARDS).toEqual([
      {
        id: "governed-mcp-integration",
        title: "Governed MCP Integration",
        body: "Models connect to data via Model Context Protocol (MCP) sockets rather than direct DB access.",
      },
      {
        id: "two-tier-policy-gateways",
        title: "Two-Tier Policy Gateways",
        body: "API calls pass deterministic RBAC checks and semantic input validation before execution.",
      },
      {
        id: "zero-ambient-authority-rls",
        title: "Zero Ambient Authority & RLS",
        body: "AI actions inherit user session permissions, enforcing Row-Level Security (RLS) at the DB level.",
      },
      {
        id: "human-in-the-loop-vibe-diff",
        title: "Human-in-the-Loop ('Vibe Diff')",
        body: "High-stakes operations require explicit user confirmation before database commit.",
      },
    ]);
    expect(SERVICES_OVERVIEW_STANDARDS).toHaveLength(4);
    expect(SERVICES_OVERVIEW_STANDARDS_BANNER).toEqual(SERVICES_OVERVIEW_STANDARDS[3]);
  });

  it("adds four core engineering capability cards with badges, subtext, and live routes", () => {
    expect(SERVICES_OVERVIEW_CAPABILITIES_TITLE).toBe("Full-Lifecycle Software Engineering Capabilities");
    expect(SERVICES_OVERVIEW_CAPABILITIES_SUBTEXT).toBe(
      "Comprehensive software development backed by automated workflows and cloud-native architecture.",
    );
    expect(SERVICES_OVERVIEW_CAPABILITIES.map((card) => ({ title: card.title, badge: card.badge, to: card.to }))).toEqual([
      {
        title: "Automated E-commerce Systems",
        badge: "E-Commerce & Portals",
        to: "/services/e-commerce-development",
      },
      {
        title: "High-Performance Web Platforms",
        badge: "Web Engineering",
        to: "/services/website-development",
      },
      {
        title: "Cross-Platform Mobile Applications",
        badge: "Mobile Engineering",
        to: "/services/mobile-app-development",
      },
      {
        title: "Rapid SaaS MVP Development",
        badge: "SaaS & MVPs",
        to: "/services/mvp-development",
      },
    ]);
    expect(SERVICES_OVERVIEW_CAPABILITIES[0]?.subtext).toMatch(/GST invoice pipelines/);
  });

  it("showcases OpsFlow AI and TrustTap as live products", () => {
    expect(SERVICES_OVERVIEW_PRODUCTS_TITLE).toBe("Live Product Showcases");
    expect(SERVICES_OVERVIEW_PRODUCTS).toEqual([
      {
        id: "opsflow-ai",
        title: "OpsFlow AI",
        description: "PDF-to-Excel document extraction for invoices, receipts, and operational PDFs.",
        to: ROUTES.opsFlowPlayground,
        ctaLabel: "Open OpsFlow AI",
      },
      {
        id: "trusttap",
        title: "TrustTap",
        description: "NFC/QR ground verification and field inspection tracking.",
        to: ROUTES.trustTap,
        ctaLabel: "Open TrustTap",
      },
    ]);
  });

  it("offers a four-track inquiry defaulting to the 2-week AI operational audit", () => {
    expect(SERVICES_OVERVIEW_INQUIRY.title).toMatch(/scoping/i);
    expect(SERVICES_OVERVIEW_INQUIRY.interestLabel).toBe("What should we scope?");
    expect([...SERVICES_OVERVIEW_INQUIRY_INTERESTS]).toEqual([
      "AI Operational Audit (2-Week Blueprint)",
      "Governed AI & Workflow Systems",
      "Spec-Driven Full-Stack Platforms",
      "Custom Cloud Enterprise Software / Utilities",
    ]);
  });

  it("does not restore the retired seven-card catalog titles", () => {
    const titles = [
      ...SERVICES_OVERVIEW_OFFERINGS.map((card) => card.title),
      ...SERVICES_OVERVIEW_CAPABILITIES.map((card) => card.title),
    ];
    for (const legacy of SERVICES_OVERVIEW_LEGACY_TITLES) {
      expect(titles).not.toContain(legacy);
    }
  });
});
