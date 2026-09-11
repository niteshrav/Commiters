import { ROUTES } from "./routes";

export type HomeMetric = {
  value: string;
  label: string;
};

export type HomeBuiltForScaleFeatureTone = "blue" | "green" | "gold";

export type HomeBuiltForScaleFeature = {
  title: string;
  description: string;
  tone: HomeBuiltForScaleFeatureTone;
};

export type HomeGovernancePillarTone = "blue" | "gold" | "green" | "purple";

export type HomeGovernancePillar = {
  label: string;
  title: string;
  summary: string;
  tone: HomeGovernancePillarTone;
  to: string;
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
    title: "Code Your Success",
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
    kicker: "BUILT ON TRUST",
    title: "The Commiters Governance Standard",
    items: [
      {
        label: "MCP Connect",
        title: "Governed MCP Integration",
        summary: "Secure model-to-data integration.",
        tone: "blue",
        to: `${ROUTES.services}#governed-mcp-integration`,
      },
      {
        label: "Policy Guard",
        title: "Two-Tier Policy Gateways",
        summary: "AI calls with built-in policy checks.",
        tone: "gold",
        to: `${ROUTES.services}#two-tier-policy-gateways`,
      },
      {
        label: "Access Shield",
        title: "Zero Ambient Authority & RLS",
        summary: "Automatic RLS and least privilege.",
        tone: "green",
        to: `${ROUTES.services}#zero-ambient-authority-rls`,
      },
      {
        label: "Vibe Check",
        title: "Human-in-the-Loop",
        summary: "Human approval for high-stakes actions.",
        tone: "purple",
        to: `${ROUTES.services}#human-in-the-loop-vibe-diff`,
      },
    ] satisfies readonly HomeGovernancePillar[],
  },
  builtForScale: {
    kicker: "CLOUD INFRASTRUCTURE",
    titleLead: "Cloud, Built ",
    titleAccent: "Right",
    body: "Secure, scalable infrastructure that grows with your business.",
    imageAlt: "Cloud-native server infrastructure with high-availability networking",
    imageBadgeLines: ["SCALABLE", "SECURE", "ALWAYS ON"],
    imageUptimeLabel: "99.99% UPTIME",
    features: [
      {
        title: "Cloud Native",
        description: "AWS • GCP • Azure • Vercel",
        tone: "blue",
      },
      {
        title: "Always Observable",
        description: "Monitoring & smart alerts",
        tone: "green",
      },
      {
        title: "Sub-200ms APIs",
        description: "Fast, reliable performance",
        tone: "gold",
      },
    ] satisfies readonly HomeBuiltForScaleFeature[],
    ctaPrimary: "Explore Our Cloud Stack",
    ctaPrimaryTo: ROUTES.webApplications,
    ctaSecondary: "Learn More",
    ctaSecondaryTo: ROUTES.services,
  },
  bottomCta: {
    title: "Ready to Build the Future?",
    subtext: "Join the ranks of high-performance companies powered by Commiters.",
    button: "Start Your Project Cycle",
    buttonTo: ROUTES.contact,
  },
} as const;
