import { ROUTES } from "./routes";

export type ServicesProcessStep = {
  index: string;
  title: string;
  body: string;
  href?: string;
};

export const SERVICES_HOW_WE_WORK = {
  title: "How We Work",
  subtext: "A four-stage process from operational audit through governed deployment and handoff.",
  steps: [
    {
      index: "01",
      title: "AI Operational Audit",
      body: "2-week workflow diagnostic and spec-driven architecture blueprint (/specs).",
      href: ROUTES.aiOperationalAudit,
    },
    {
      index: "02",
      title: "Architecture & Policy Design",
      body: "Schema definitions, two-tier API policy gateways, and MCP tool socket layout.",
    },
    {
      index: "03",
      title: "Spec-Driven Sprints",
      body: "Production-ready full-stack engineering with continuous automated testing.",
    },
    {
      index: "04",
      title: "Governed Deployment & Handoff",
      body: "CI/CD guardrail enforcement, RLS verification, and complete operational handoff.",
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
