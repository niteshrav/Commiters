import { ROUTES } from "./routes";

export type HomeMetric = {
  value: string;
  label: string;
};

export type HomeGovernancePillar = {
  title: string;
  body: string;
};

/** Public paths for home mockup photography (cropped from Stitch screenshots). */
export const HOME_PAGE_ASSETS = {
  heroMonitor: "/assets/home/home-hero-monitor.png",
  heroMonitor2x: "/assets/home/home-hero-monitor@2x.png",
  serverRacks: "/assets/home/server-racks.png",
  serverRacks2x: "/assets/home/server-racks@2x.png",
} as const;

export const HOME_OPS_FLOW_SECTION_ID = "opsflow-ai" as const;
export const HOME_HERO_OPS_FLOW_HREF = `/#${HOME_OPS_FLOW_SECTION_ID}` as const;

export const HOME_PAGE_COPY = {
  hero: {
    badge: "AN AI & CLOUD PRODUCT & ENGINEERING FIRM",
    title: "Enterprise AI Products & Cloud-Native Web Systems",
    subtext:
      "We build enterprise AI products and engineer scalable cloud platforms—backed by governed Model Context Protocol (MCP) integrations, zero ambient authority, and spec-driven software development.",
    ctaPrimary: "Try OpsFlow AI",
    ctaPrimaryTo: HOME_HERO_OPS_FLOW_HREF,
    ctaSecondary: "Book Operational Audit",
    ctaSecondaryTo: ROUTES.aiOperationalAudit,
    sprintLabel: "CURRENT SPRINT",
    sprintValue: "v2.4.0 Engine",
  },
  corePillars: {
    title: "The Commiters Governance Standard",
    subtext:
      "Four technical and governance pillars that keep enterprise AI products and cloud platforms auditable, permissioned, and production-safe.",
    items: [
      {
        title: "Governed MCP Integration",
        body: "Models connect to data via Model Context Protocol (MCP) sockets rather than direct DB access.",
      },
      {
        title: "Two-Tier Policy Gateways",
        body: "All API calls pass deterministic RBAC checks and semantic input validation before execution.",
      },
      {
        title: "Zero Ambient Authority & RLS",
        body: "AI actions inherit user session permissions, enforcing Row-Level Security (RLS) at the database level.",
      },
      {
        title: "Human-in-the-Loop ('Vibe Diff')",
        body: "High-stakes operations require explicit user confirmation before database commit.",
      },
    ] satisfies readonly HomeGovernancePillar[],
  },
  builtForScale: {
    title: "Spec-Driven Cloud Infrastructure",
    body: "We architect systems that evolve with your business—combining cloud-native web platforms with rigid policy guardrails and production-grade security.",
    features: [
      {
        title: "Cloud-Native Web Architecture (AWS, GCP, Azure, Vercel)",
        description: "Cloud-native platforms on AWS, GCP, Azure, and Vercel that scale with demand.",
      },
      {
        title: "Zero Ambient Authority & Database Row-Level Security (RLS)",
        description: "Session-inherited permissions with row-level security enforced at the database.",
      },
      {
        title: "Micro-optimized API Response Times (<200ms) with strict SLA tracking",
        description: "Core APIs are tuned for sub-200ms responses with explicit SLA monitoring.",
      },
    ],
  },
  bottomCta: {
    title: "Ready to Build the Future?",
    subtext: "Join the ranks of high-performance companies powered by Commiters.",
    button: "Start Your Project Cycle",
    buttonTo: ROUTES.contact,
  },
} as const;
