import { AI_OPERATIONAL_AUDIT_BOOKING_HREF, OPSFLOW_HERO_PAGE_HREF, ROUTES } from "./routes";

export const ABOUT_STUDIO_ID = "the-studio" as const;
export const ABOUT_VALUES_ID = "our-values" as const;
export const ABOUT_VISION_ID = "governed-engineering" as const;
export const ABOUT_JOURNEY_ID = "delivery-journey" as const;
export const ABOUT_SECTION_SCROLL_SHELL_CLASS = "pt-16 pb-16 w-full" as const;
export const ABOUT_VALUES_HEADING_WRAP_CLASS = "text-center mb-10" as const;
export const ABOUT_VALUES_KICKER_UTIL_CLASS = "text-xs font-bold tracking-widest text-blue-600 uppercase" as const;
export const ABOUT_VALUES_TITLE_UTIL_CLASS = "text-3xl font-bold text-slate-900 mt-2" as const;
export const ABOUT_SECTION_HASH_IDS = [
  ABOUT_STUDIO_ID,
  ABOUT_VALUES_ID,
  ABOUT_VISION_ID,
  ABOUT_JOURNEY_ID,
  "principles",
  "vision",
  "process",
  "how-we-work",
] as const;

export const ABOUT_REJECTED_CTA_SUBTEXT =
  "We are currently accepting new projects for Q3 2024." as const;

export type AboutPrincipleIcon = "mcp" | "authority" | "spec" | "async";

export type AboutPrincipleTone = "blue" | "green" | "orange" | "navy";

export type AboutOperatingPrinciple = {
  id: string;
  title: string;
  body: string;
  icon: AboutPrincipleIcon;
  tone: AboutPrincipleTone;
};

export const ABOUT_OPERATING_PRINCIPLES: AboutOperatingPrinciple[] = [
  {
    id: "ai-with-guardrails",
    title: "AI With Guardrails",
    body: "Governed AI integrations",
    icon: "mcp",
    tone: "blue",
  },
  {
    id: "security-by-default",
    title: "Security by Default",
    body: "RLS and least-privilege access",
    icon: "authority",
    tone: "green",
  },
  {
    id: "build-from-specs",
    title: "Build From Specs",
    body: "Predictable, documented systems",
    icon: "spec",
    tone: "orange",
  },
  {
    id: "transparent-delivery",
    title: "Transparent Delivery",
    body: "Clear progress and ownership",
    icon: "async",
    tone: "navy",
  },
];

export type AboutJourneyStage = {
  id: string;
  index: string;
  title: string;
  body: string;
  href?: string;
};

export const ABOUT_DELIVERY_JOURNEY = {
  kicker: "DELIVERY JOURNEY",
  titleLead: "From Idea to ",
  titleAccent: "Production",
  subtext: "Four connected stages from discovery to a governed launch.",
  stages: [
    {
      id: "discover",
      index: "01",
      title: "Discover",
      body: "Map the problem, constraints, and what success looks like.",
      href: ROUTES.aiOperationalAudit,
    },
    {
      id: "architect",
      index: "02",
      title: "Architect",
      body: "Define the system shape, policies, and delivery plan.",
    },
    {
      id: "build",
      index: "03",
      title: "Build",
      body: "Ship in spec-driven sprints with continuous checks.",
    },
    {
      id: "launch",
      index: "04",
      title: "Launch",
      body: "Deploy, verify, and hand off a production-ready system.",
    },
  ] as const satisfies readonly AboutJourneyStage[],
} as const;

export const ABOUT_PAGE_COPY = {
  principles: {
    kicker: "OUR VALUES",
    titleLead: "What We ",
    titleAccent: "Stand For",
    subtext: "The beliefs that shape how we engineer high-stakes systems.",
  },
  bottomCta: {
    title: "Ready to build something monumental?",
    subtext: "Let's discuss your technical roadmap.",
    primaryLabel: "Book Operational Audit",
    primaryTo: AI_OPERATIONAL_AUDIT_BOOKING_HREF,
    secondaryLabel: "Try OpsFlow AI",
    secondaryTo: OPSFLOW_HERO_PAGE_HREF,
  },
} as const;
