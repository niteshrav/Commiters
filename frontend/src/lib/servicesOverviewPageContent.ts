import { ROUTES } from "./routes";
import { buildServiceDetailPath } from "./services";

export const SERVICES_OVERVIEW_INQUIRY_ANCHOR = "services-overview-inquiry" as const;
export const SERVICES_OVERVIEW_PRODUCTS_ANCHOR = "services-overview-products" as const;
export const SERVICES_OVERVIEW_OFFERINGS_ANCHOR = "flagship-solutions" as const;

export const SERVICES_OVERVIEW_SEO = {
  title: "Enterprise AI Products & Cloud-Native Web Systems",
  description:
    "We build enterprise AI products and engineer scalable cloud platforms—backed by governed Model Context Protocol (MCP) integrations, zero ambient authority, and spec-driven software development.",
  keywords:
    "enterprise AI products, cloud-native web systems, AI operational audit, governed AI, spec-driven platforms, MCP, OpsFlow AI, trustTap, Commiters services",
  path: ROUTES.services,
} as const;

export const SERVICES_OVERVIEW_HERO = {
  kicker: "ENTERPRISE AI & CLOUD SYSTEMS",
  title: "Enterprise AI Products & Cloud-Native Web Systems",
  subtitle:
    "We build enterprise AI products and engineer scalable cloud platforms—backed by governed Model Context Protocol (MCP) integrations, zero ambient authority, and spec-driven software development.",
  productsCtaLabel: "Explore AI Products",
  productsCtaTo: `${ROUTES.services}#${SERVICES_OVERVIEW_OFFERINGS_ANCHOR}`,
  auditCtaLabel: "Book Operational Audit",
  auditCtaTo: ROUTES.audit,
} as const;

export type ServicesOverviewOffering = {
  id: string;
  title: string;
  description: string;
  tag: string;
  ctaLabel: string;
  to: string;
  featured?: boolean;
};

export const SERVICES_OVERVIEW_OFFERINGS_TITLE = "Flagship Operational Solutions" as const;

export const SERVICES_OVERVIEW_OFFERINGS: readonly ServicesOverviewOffering[] = [
  {
    id: "ai-operational-audits",
    title: "AI Operational Audits",
    description:
      "48-hour workflow diagnostics, spreadsheet bottleneck elimination, and live working cloud automation blueprints.",
    tag: "48-HOUR ENGAGEMENT",
    ctaLabel: "View Audit Details",
    to: ROUTES.audit,
    featured: true,
  },
  {
    id: "governed-ai-workflow-systems",
    title: "Governed AI & Workflow Systems",
    description:
      "Enterprise-grade document parsing, GST/PAN bills, LLM integrations, and zero-vendor-lockin automated workflows.",
    tag: "CUSTOM BUILD",
    ctaLabel: "View System Services",
    to: ROUTES.aiSolutionsShort,
  },
  {
    id: "spec-driven-full-stack-platforms",
    title: "Spec-Driven Full-Stack Platforms",
    description:
      "Scalable operational portals, SaaS systems, and custom web apps built on Vite, Express, React, and PostgreSQL/MongoDB.",
    tag: "ENGINEERING PILLAR",
    ctaLabel: "View Platform Services",
    to: ROUTES.webApplicationsShort,
  },
] as const;

export type ServicesOverviewStandard = {
  id: string;
  title: string;
  body: string;
};

export const SERVICES_OVERVIEW_STANDARDS_TITLE =
  "THE COMMITERS WAY: ENGINEERING & GOVERNANCE STANDARDS" as const;
export const SERVICES_OVERVIEW_STANDARDS_SUBTITLE =
  "Every application and AI pipeline we deliver is built on a secure, policy-gated architecture." as const;

export const SERVICES_OVERVIEW_STANDARDS_BANNER = {
  id: "human-in-the-loop-vibe-diff",
  title: "Human-in-the-Loop ('Vibe Diff')",
  body: "High-stakes operations require explicit user confirmation before database commit.",
} as const;

export const SERVICES_OVERVIEW_STANDARDS: readonly ServicesOverviewStandard[] = [
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
  SERVICES_OVERVIEW_STANDARDS_BANNER,
] as const;

export type ServicesOverviewCapabilityIcon = "cart" | "web" | "mobile" | "mvp";

export type ServicesOverviewCapability = {
  id: string;
  title: string;
  badge: string;
  subtext: string;
  bullets: readonly string[];
  icon: ServicesOverviewCapabilityIcon;
  to: string;
  aliasIds?: readonly string[];
};

export const SERVICES_OVERVIEW_CAPABILITIES_ANCHOR = "engineering-capabilities" as const;
export const SERVICES_OVERVIEW_CAPABILITIES_TITLE = "Full-Lifecycle Software Engineering Capabilities" as const;
export const SERVICES_OVERVIEW_CAPABILITIES_SUBTEXT =
  "Comprehensive software development backed by automated workflows and cloud-native architecture." as const;

export const SERVICES_OVERVIEW_CAPABILITIES: readonly ServicesOverviewCapability[] = [
  {
    id: "web-engineering",
    title: "High-Performance Web Platforms",
    badge: "Web Engineering",
    subtext:
      "Modern web portals, custom dashboards, and high-converting marketing sites built on Vite, React, Node, and Tailwind CSS.",
    bullets: ["Modern web portals", "Custom dashboards", "High-converting marketing sites on Vite, React, Node, and Tailwind CSS"],
    icon: "web",
    to: buildServiceDetailPath("website-development"),
    aliasIds: ["high-performance-web-platforms"],
  },
  {
    id: "ecommerce",
    title: "Automated E-commerce Systems",
    badge: "E-Commerce & Portals",
    subtext: "Custom storefronts, automated inventory sync, GST invoice pipelines, and secure payment gateway integrations.",
    bullets: [
      "Custom storefronts",
      "Automated inventory sync",
      "GST invoice pipelines",
      "Secure payment gateway integrations",
    ],
    icon: "cart",
    to: buildServiceDetailPath("e-commerce-development"),
    aliasIds: ["automated-ecommerce-systems"],
  },
  {
    id: "saas-mvp",
    title: "Rapid SaaS MVP Development",
    badge: "SaaS & MVPs",
    subtext: "Fast 4-week founder-led MVP launches with production-ready database architecture, auth, and automated billing.",
    bullets: [
      "4-week founder-led MVP launches",
      "Production-ready database architecture",
      "Authentication and automated billing",
    ],
    icon: "mvp",
    to: buildServiceDetailPath("mvp-development"),
    aliasIds: ["rapid-saas-mvp-development"],
  },
  {
    id: "mobile",
    title: "Cross-Platform Mobile Applications",
    badge: "Mobile Engineering",
    subtext: "Field workforce tracking apps, customer loyalty portals, and offline-first mobile tools built for iOS and Android.",
    bullets: ["Field workforce tracking apps", "Customer loyalty portals", "Offline-first mobile tools for iOS and Android"],
    icon: "mobile",
    to: buildServiceDetailPath("mobile-app-development"),
    aliasIds: ["cross-platform-mobile-applications"],
  },
] as const;

export type ServicesOverviewProduct = {
  id: string;
  title: string;
  description: string;
  to: string;
  ctaLabel: string;
};

export const SERVICES_OVERVIEW_PRODUCTS_TITLE = "Live Product Showcases" as const;

export const SERVICES_OVERVIEW_PRODUCTS: readonly ServicesOverviewProduct[] = [
  {
    id: "opsflow-ai",
    title: "OpsFlow AI",
    description: "PDF-to-Excel document extraction for invoices, receipts, and operational PDFs.",
    to: ROUTES.opsFlowAi,
    ctaLabel: "Open OpsFlow AI",
  },
  {
    id: "trusttap",
    title: "trustTap",
    description:
      "NFC & QR-enabled reputation protection platform that converts satisfied customers into public Google reviews while routing grievances privately.",
    to: ROUTES.trustTapShort,
    ctaLabel: "Open trustTap",
  },
] as const;

export const SERVICES_OVERVIEW_INQUIRY_INTERESTS = [
  "AI Operational Audit (48-Hour Blueprint)",
  "Governed AI & Workflow Systems",
  "Spec-Driven Full-Stack Platforms",
  "Custom Cloud Enterprise Software / Utilities",
] as const;

export type ServicesOverviewInquiryInterest = (typeof SERVICES_OVERVIEW_INQUIRY_INTERESTS)[number];

export const SERVICES_OVERVIEW_INQUIRY = {
  title: "Request a scoping conversation",
  subtext: "Tell us whether you need a 48-hour AI Operational Audit, governed AI workflows, or a spec-driven platform.",
  nameLabel: "Name",
  namePlaceholder: "Your name",
  emailLabel: "Work Email",
  emailPlaceholder: "name@company.com",
  companyLabel: "Company Name",
  companyPlaceholder: "Company name",
  interestLabel: "What should we scope?",
  detailsLabel: "Project details",
  detailsPlaceholder: "Share the workflow, storefront, or product you want scoped.",
  submitLabel: "Request scoping",
} as const;

export const SERVICES_OVERVIEW_LEGACY_TITLES = [
  "Website Development",
  "Mobile Applications",
  "E-commerce Development",
  "MVP Development",
  "AI Integration",
  "Automation Tools",
] as const;
