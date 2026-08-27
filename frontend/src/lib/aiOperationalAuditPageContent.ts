import { ROUTES } from "./routes";

export const AI_OPERATIONAL_AUDIT_DOCUMENT_TITLE = "AI Operational Audit | Commiters" as const;

export const AI_OPERATIONAL_AUDIT_SEO = {
  title: AI_OPERATIONAL_AUDIT_DOCUMENT_TITLE,
  description:
    "2-week AI Operational Audit from Commiters. We map back-office bottlenecks and deliver a GCP blueprint plus working prototype that saves 20+ hours per week.",
  keywords:
    "AI operational audit, back-office automation, Vertex AI, GCP architecture, workflow bottleneck, Commiters diagnostic",
  path: ROUTES.aiOperationalAudit,
} as const;

export const AI_OPERATIONAL_AUDIT_HERO = {
  eyebrow: "2-WEEK FIXED DIAGNOSTIC ENGAGEMENT",
  headline: "Identify & Eliminate Back-Office Bottlenecks with AI Operational Engineering",
  subheadline:
    "We audit your manual workflows, spreadsheet dependencies, and legacy bottlenecks to deliver a blueprint and working prototype that saves 20+ hours per week.",
} as const;

export const AI_OPERATIONAL_AUDIT_CTA_LABEL = "Book an AI Operational Audit ($3,000 - $5,000)" as const;

export const AI_OPERATIONAL_AUDIT_DELIVERABLES = [
  {
    id: "bottleneck-mapping",
    title: "Bottleneck Mapping",
    body: "Full visual flowchart of your operational waste.",
  },
  {
    id: "ai-architecture-spec",
    title: "AI Architecture Spec",
    body: "Custom GCP & Vertex AI solution design.",
  },
  {
    id: "working-poc",
    title: "Working Proof-of-Concept",
    body: "A live 14-day prototype targeting your single biggest bottleneck.",
  },
  {
    id: "roi-roadmap",
    title: "ROI & Execution Roadmap",
    body: "Clear metrics showing exact cost & hours saved.",
  },
] as const;

export const AI_OPERATIONAL_AUDIT_PROCESS = [
  {
    id: "week-1",
    week: "Week 1",
    body: "Discovery, Workflow Shadowing & Data Source Mapping.",
  },
  {
    id: "week-2",
    week: "Week 2",
    body: "Prototype Build, Architecture Delivery & Executive Demo.",
  },
] as const;

export const AI_OPERATIONAL_AUDIT_FORM = {
  title: "Book your diagnostic",
  nameLabel: "Name",
  namePlaceholder: "Your name",
  emailLabel: "Work Email",
  emailPlaceholder: "name@company.com",
  companyLabel: "Company Name",
  companyPlaceholder: "Company name",
  bottleneckLabel: "Current Manual Bottleneck Description",
  bottleneckPlaceholder: "Where do hours disappear each week?",
  submitLabel: AI_OPERATIONAL_AUDIT_CTA_LABEL,
  serviceNeeded: "AI Operational Audit",
  budgetRange: "$3,000 - $5,000",
  timeline: "2-week diagnostic",
} as const;
