import { ROUTES } from "./routes";

export const AI_OPERATIONAL_AUDIT_DOCUMENT_TITLE = "AI Operational Audits & Cloud Diagnostics | Commiters" as const;

export const AI_OPERATIONAL_AUDIT_SEO = {
  title: AI_OPERATIONAL_AUDIT_DOCUMENT_TITLE,
  description:
    "Book a 2-week AI Operational Audit. We analyze manual bottlenecks, spreadsheet dependencies, and legacy workflows to deliver a live automation prototype and a Spec-Driven Architecture Blueprint.",
  keywords:
    "AI operational audit, workflow diagnostics, spec-driven blueprint, spreadsheet automation, workflow security, Commiters diagnostic",
  path: ROUTES.aiOperationalAudit,
} as const;

export const AI_OPERATIONAL_AUDIT_HERO = {
  eyebrow: "2-WEEK ENGAGEMENT",
  headline: "AI Operational Audits & Cloud Diagnostics",
  subheadline:
    "We analyze your manual operational bottlenecks, spreadsheet dependencies, and legacy workflows to deliver a live automation prototype and a Spec-Driven Architecture Blueprint (/specs).",
} as const;

export const AI_OPERATIONAL_AUDIT_CTA_LABEL = "Book Your 2-Week Audit" as const;

export const AI_OPERATIONAL_AUDIT_PRICING = {
  title: "Pricing & Scope",
  engagement: "Fixed-scope 2-week engagement",
  range: "$3,000–$5,000 / ₹35,000–₹50,000",
  summary: "Fixed-scope 2-week engagement ($3,000–$5,000 / ₹35,000–₹50,000).",
} as const;

export const AI_OPERATIONAL_AUDIT_DIAGNOSE_TITLE = "What We Diagnose" as const;

export const AI_OPERATIONAL_AUDIT_DIAGNOSE = [
  {
    id: "spreadsheet-manual-bottlenecks",
    title: "Spreadsheet & Manual Bottlenecks",
    body: "Identify re-typing, manual invoice parsing, and slow data entry.",
  },
  {
    id: "workflow-security-policy-gaps",
    title: "Workflow Security & Policy Gaps",
    body: "Audit where sensitive company data is exposed to unmonitored AI tools.",
  },
  {
    id: "automation-roi-roadmap",
    title: "Automation ROI Roadmap",
    body: "Deliver a clear cost-benefit breakdown before you write a single line of production code.",
  },
] as const;

/** @deprecated Use AI_OPERATIONAL_AUDIT_DIAGNOSE */
export const AI_OPERATIONAL_AUDIT_DELIVERABLES = AI_OPERATIONAL_AUDIT_DIAGNOSE;

export const AI_OPERATIONAL_AUDIT_PROCESS_TITLE = "The 2-Week Deliverables" as const;

export const AI_OPERATIONAL_AUDIT_PROCESS = [
  {
    id: "days-1-3",
    week: "Days 1-3",
    body: "Discovery",
  },
  {
    id: "days-4-8",
    week: "Days 4-8",
    body: "Prototype Build",
  },
  {
    id: "days-9-14",
    week: "Days 9-14",
    body: "Deliver Spec-Driven Blueprint",
  },
] as const;

export const AI_OPERATIONAL_AUDIT_GOVERNANCE = {
  title: "The Committers Way",
  body: 'All audit recommendations follow "The Committers Way": Zero ambient authority, two-tier policy gateways, and human-in-the-loop validation.',
} as const;

export const AI_OPERATIONAL_AUDIT_FORM = {
  title: "Book your diagnostic",
  nameLabel: "Name",
  namePlaceholder: "Your name",
  emailLabel: "Work Email",
  emailPlaceholder: "name@company.com",
  companyLabel: "Company Name",
  companyPlaceholder: "Company name",
  scopeLabel: "What should we scope?",
  bottleneckLabel: "Current Manual Bottleneck Description",
  bottleneckPlaceholder: "Where do hours disappear each week?",
  submitLabel: AI_OPERATIONAL_AUDIT_CTA_LABEL,
  serviceNeeded: "AI Operational Audit (2-Week Blueprint)",
  budgetRange: "$3,000–$5,000 / ₹35,000–₹50,000",
  timeline: "2-week diagnostic",
} as const;
