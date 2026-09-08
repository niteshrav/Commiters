import { ROUTES } from "./routes";

export type ServicesProcessStepTone = "blue" | "green" | "gold" | "purple";

export type ServicesProcessStep = {
  index: string;
  title: string;
  body: string;
  tone: ServicesProcessStepTone;
  href?: string;
};

export const SERVICES_HOW_WE_WORK = {
  kicker: "OUR PROCESS",
  titleLead: "How We ",
  titleAccent: "Work",
  subtext: "A simple, structured process from audit to deployment, built for real-world impact.",
  steps: [
    {
      index: "01",
      title: "AI Operational Audit",
      body: "Assess your workflows and create a spec-driven blueprint.",
      tone: "blue",
      href: ROUTES.aiOperationalAudit,
    },
    {
      index: "02",
      title: "Architecture & Policy Design",
      body: "Define schemas, policy gateways, and MCP layouts.",
      tone: "green",
    },
    {
      index: "03",
      title: "Spec-Driven Sprints",
      body: "Build and test with continuous automation.",
      tone: "gold",
    },
    {
      index: "04",
      title: "Governed Deployment & Handoff",
      body: "CI/CD, RLS verification, and smooth handoff.",
      tone: "purple",
    },
  ] as const satisfies readonly ServicesProcessStep[],
} as const;

export const SERVICES_BOTTOM_CTA = {
  title: "Ready to start building?",
  subtext:
    "Book a 2-week AI Operational Audit to map spreadsheet bottlenecks and leave with a working automation prototype.",
  primaryLabel: "Book Operational Audit",
  primaryHref: ROUTES.aiOperationalAudit,
  secondaryLabel: "View Our Stack",
  secondaryHref: ROUTES.about,
} as const;

export const SERVICES_REJECTED_BOTTOM_CTA_SUBTEXT =
  "Connect with us to discuss your project requirements and receive a technical proposal." as const;
