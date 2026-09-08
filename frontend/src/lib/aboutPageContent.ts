import { ROUTES } from "./routes";

export const ABOUT_REJECTED_CTA_SUBTEXT =
  "We are currently accepting new projects for Q3 2024." as const;

export type AboutPrincipleIcon = "mcp" | "authority" | "spec" | "async";

export type AboutPrincipleTone = "blue" | "green" | "purple" | "gold";

export type AboutOperatingPrinciple = {
  id: string;
  index: string;
  title: string;
  body: string;
  icon: AboutPrincipleIcon;
  tone: AboutPrincipleTone;
};

export const ABOUT_OPERATING_PRINCIPLES: AboutOperatingPrinciple[] = [
  {
    id: "ai-integration",
    index: "01",
    title: "AI Integration",
    body: "Connect models via MCP sockets with full governance.",
    icon: "mcp",
    tone: "blue",
  },
  {
    id: "secure-by-design",
    index: "02",
    title: "Secure by Design",
    body: "Built with strict RLS and least privilege access.",
    icon: "authority",
    tone: "green",
  },
  {
    id: "spec-driven-development",
    index: "03",
    title: "Spec-Driven Development",
    body: "Predictable builds with structured schemas and zero technical debt.",
    icon: "spec",
    tone: "purple",
  },
  {
    id: "async-first-transparent",
    index: "04",
    title: "Async-First & Transparent",
    body: "Structured updates with direct engineering access.",
    icon: "async",
    tone: "gold",
  },
];

export const ABOUT_PAGE_COPY = {
  principles: {
    kicker: "OUR FOUNDATION",
    titleLead: "Core Operating ",
    titleAccent: "Principles",
    subtext: "Guiding how we build, operate, and deliver lasting impact.",
    viewAllLabel: "VIEW ALL PRINCIPLES",
    viewAllTo: ROUTES.services,
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
