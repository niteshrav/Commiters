import { ROUTES } from "./routes";

export const AI_OPERATIONAL_AUDIT_DOCUMENT_TITLE = "AI Operational Audit | Commiters" as const;

export const AI_OPERATIONAL_AUDIT_SEO = {
  title: AI_OPERATIONAL_AUDIT_DOCUMENT_TITLE,
  description:
    "Eliminate back-office bottlenecks with a 2-week AI Operational Audit. We shadow workflows, map spreadsheet friction, and deliver a live automation prototype.",
  keywords:
    "AI operational audit, back-office automation, workflow bottleneck, spreadsheet automation, Commiters diagnostic",
  path: ROUTES.aiOperationalAudit,
} as const;

export const AI_OPERATIONAL_AUDIT_HERO = {
  eyebrow: "2-WEEK FIXED DIAGNOSTIC ENGAGEMENT",
  headline: "Eliminate Back-Office Bottlenecks with a 2-Week AI Operational Audit.",
  subheadline:
    "We shadow your back-office workflows, identify manual spreadsheet friction, and build a live working AI automation prototype.",
} as const;

export const AI_OPERATIONAL_AUDIT_CTA_LABEL = "Book Operational Audit" as const;

export const AI_OPERATIONAL_AUDIT_PRICING = {
  title: "Pricing & Scope",
  engagement: "Fixed-scope 2-week engagement",
  range: "$3,000–$5,000 / ₹35,000–₹50,000",
  summary: "Fixed-scope 2-week engagement ($3,000–$5,000 / ₹35,000–₹50,000).",
} as const;

export const AI_OPERATIONAL_AUDIT_DELIVERABLES = [
  {
    id: "workflow-bottleneck-map",
    title: "Workflow Bottleneck Diagnostic Map",
    body: "A visual map of back-office handoffs, spreadsheet friction, and the delays we will automate first.",
  },
  {
    id: "working-prototype",
    title: "Working AI / Automation Prototype",
    body: "A live prototype that shadows your workflow and proves the automation inside the two-week window.",
  },
  {
    id: "roi-roadmap",
    title: "ROI & Implementation Roadmap",
    body: "Hours saved, implementation cost, and the sequence to take the prototype into production.",
  },
] as const;

export const AI_OPERATIONAL_AUDIT_PROCESS = [
  {
    id: "week-1",
    week: "Week 1",
    body: "Discovery, workflow shadowing, and mapping of spreadsheet and legacy-system friction.",
  },
  {
    id: "week-2",
    week: "Week 2",
    body: "Prototype build, ROI model, and executive demo of the working automation.",
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
  budgetRange: "$3,000–$5,000 / ₹35,000–₹50,000",
  timeline: "2-week diagnostic",
} as const;
