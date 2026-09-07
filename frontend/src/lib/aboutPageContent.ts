import { ROUTES } from "./routes";

export const ABOUT_REJECTED_CTA_SUBTEXT =
  "We are currently accepting new projects for Q3 2024." as const;

export type AboutPrincipleIcon = "mcp" | "authority" | "spec" | "async";

export type AboutOperatingPrinciple = {
  id: string;
  title: string;
  body: string;
  icon: AboutPrincipleIcon;
};

export const ABOUT_OPERATING_PRINCIPLES: AboutOperatingPrinciple[] = [
  {
    id: "governed-ai-integration",
    title: "Governed AI Integration",
    body: "Connect models via Model Context Protocol (MCP) sockets, eliminating unmonitored database access.",
    icon: "mcp",
  },
  {
    id: "zero-ambient-authority",
    title: "Zero Ambient Authority",
    body: "Built with strict Row-Level Security (RLS) and JIT permission scoping.",
    icon: "authority",
  },
  {
    id: "spec-driven-development",
    title: "Spec-Driven Development",
    body: "Absolute predictability, structured database schemas, and zero technical debt.",
    icon: "spec",
  },
  {
    id: "async-first-transparent",
    title: "Async-First & Transparent",
    body: "Spec-driven delivery, structured written updates, and direct engineering access.",
    icon: "async",
  },
];

export const ABOUT_PAGE_COPY = {
  principles: {
    title: "Core Operating Principles",
    viewAllLabel: "VIEW ALL WORK",
    viewAllTo: ROUTES.caseStudies,
  },
  bottomCta: {
    title: "Ready to build something monumental?",
    subtext: "Let's discuss your technical roadmap.",
    primaryLabel: "Book Operational Audit",
    primaryTo: ROUTES.aiOperationalAudit,
    secondaryLabel: "Try OpsFlow AI",
    secondaryTo: "/#opsflow-ai",
  },
} as const;
