import { ROUTES } from "./routes";

export const AI_OPERATIONAL_AUDIT_DOCUMENT_TITLE = "AI Operational Audits & Cloud Diagnostics | Commiters" as const;

export const AI_OPERATIONAL_AUDIT_SEO = {
  title: AI_OPERATIONAL_AUDIT_DOCUMENT_TITLE,
  description:
    "We audit your manual workflows, spreadsheet bottlenecks, and software stack to deliver a complete technical blueprint and AI implementation map within 48 hours. 100% of your diagnostic fee is credited directly toward your software build.",
  keywords:
    "AI operational audit, workflow diagnostics, spec-driven blueprint, spreadsheet automation, workflow security, Commiters diagnostic",
  path: ROUTES.aiOperationalAudit,
} as const;

export const AI_OPERATIONAL_AUDIT_HERO = {
  eyebrow: "ENTERPRISE AI & CLOUD SYSTEMS",
  headline: "AI Operational Audits & Cloud Diagnostics",
  subheadline:
    "We audit your manual workflows, spreadsheet bottlenecks, and software stack to deliver a complete technical blueprint and AI implementation map within 48 hours. 100% of your diagnostic fee is credited directly toward your software build.",
} as const;

export const AI_OPERATIONAL_AUDIT_CTA_LABEL = "Book Your AI Diagnostic" as const;

export const AI_OPERATIONAL_AUDIT_PRICING = {
  title: "Fixed-Scope AI & Technical Diagnostic",
  indiaLabel: "India",
  indiaPrice: "₹4,999",
  internationalLabel: "International",
  internationalPrice: "$499",
  badge: "100% DEDUCTIBLE — Credited directly toward your full build",
  features: [
    "48-Hour Operational & Data Bottleneck Audit",
    "Custom Spec-Driven Architecture Blueprint",
    "Tool selection, security gap assessment, and ROI roadmap",
    "100% Credit Guarantee: ₹4,999 / $499 credited toward implementation when you build with us.",
  ],
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

export const AI_OPERATIONAL_AUDIT_PROCESS_TITLE = "The Deliverables" as const;

export const AI_OPERATIONAL_AUDIT_PROCESS = [
  {
    id: "days-1-2",
    week: "Days 1–2",
    title: "48-Hour Technical Diagnostic",
    body: "Deep dive into operational bottlenecks, tech stack, and data flow gaps.",
  },
  {
    id: "days-3-5",
    week: "Days 3–5",
    title: "Prototype & Spec-Driven Blueprint",
    body: "Architecture breakdown, tool selection, and fixed-scope build roadmap.",
  },
  {
    id: "days-6-plus",
    week: "Days 6+",
    title: "Full Build Rollout & Fee Credit",
    body: "100% of your diagnostic fee is applied directly toward production code implementation.",
  },
] as const;

export const AI_OPERATIONAL_AUDIT_GOVERNANCE = {
  title: "The Commiters Way",
  body: 'All audit recommendations follow "The Commiters Way": Zero ambient authority, two-tier policy gateways, and human-in-the-loop validation.',
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
  submitLabel: "Request AI Diagnostic (₹4,999 / $499)",
  scopeOptions: ["AI & Workflow Diagnostic (₹4,999 / $499)"],
  serviceNeeded: "AI & Workflow Diagnostic (₹4,999 / $499)",
  budgetRange: "₹4,999 / $499",
  timeline: "48-hour diagnostic",
} as const;
