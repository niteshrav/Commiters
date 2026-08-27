import { ROUTES } from "./routes";
import { AI_OPERATIONAL_AUDIT_FORM } from "./aiOperationalAuditPageContent";

export const WORKFLOW_AUTOMATION_DOCUMENT_TITLE = "Workflow & Process Automation | Commiters" as const;

export const WORKFLOW_AUTOMATION_SEO = {
  title: WORKFLOW_AUTOMATION_DOCUMENT_TITLE,
  description:
    "Workflow automation from Commiters. We connect CRM, WhatsApp, email, and accounting systems into automated data pipelines that replace copy-paste back-office work.",
  keywords:
    "workflow automation, invoice syncing, WhatsApp automation, data reconciliation, Tally, QuickBooks, Zoho, Commiters",
  path: ROUTES.workflowAutomation,
} as const;

export const WORKFLOW_AUTOMATION_HERO = {
  eyebrow: "BUSINESS PROCESS AUTOMATION",
  headline: "Connect Your Tools & Automate Repetitive Back-Office Tasks",
  subheadline:
    "Stop wasting hours copy-pasting spreadsheet data. We build automated data pipelines connecting your CRM, WhatsApp, Email, and Accounting systems.",
} as const;

export const WORKFLOW_AUTOMATION_CTA_LABEL = "Automate Your Workflows" as const;

export const WORKFLOW_AUTOMATION_SOLUTIONS = [
  {
    id: "invoice-sync",
    title: "Financial & Invoice Syncing",
    body: "Automatically parse invoices and push entries to Tally, QuickBooks, or Zoho.",
  },
  {
    id: "customer-comms",
    title: "Automated Customer Communications",
    body: "Trigger instant WhatsApp/Email updates for order sign-offs, quotes, and approvals.",
  },
  {
    id: "reconciliation",
    title: "Data Reconciliation Pipelines",
    body: "Clean, deduplicate, and sync data between multi-tenant databases automatically.",
  },
] as const;

export const WORKFLOW_AUTOMATION_PIPELINE = [
  { id: "source", title: "Unstructured Data / Email" },
  { id: "ai-pipeline", title: "Commiters AI Pipeline" },
  { id: "destination", title: "Your ERP / CRM / Excel" },
] as const;

export const WORKFLOW_AUTOMATION_FORM = {
  title: "Book an AI Operational Audit",
  intro: "Start with a 2-week diagnostic that maps copy-paste work into an automated pipeline.",
  nameLabel: AI_OPERATIONAL_AUDIT_FORM.nameLabel,
  namePlaceholder: AI_OPERATIONAL_AUDIT_FORM.namePlaceholder,
  emailLabel: AI_OPERATIONAL_AUDIT_FORM.emailLabel,
  emailPlaceholder: AI_OPERATIONAL_AUDIT_FORM.emailPlaceholder,
  companyLabel: AI_OPERATIONAL_AUDIT_FORM.companyLabel,
  companyPlaceholder: AI_OPERATIONAL_AUDIT_FORM.companyPlaceholder,
  bottleneckLabel: AI_OPERATIONAL_AUDIT_FORM.bottleneckLabel,
  bottleneckPlaceholder: AI_OPERATIONAL_AUDIT_FORM.bottleneckPlaceholder,
  submitLabel: "Book an AI Operational Audit",
  auditLinkLabel: "View the 2-week diagnostic",
  auditTo: ROUTES.aiOperationalAudit,
  serviceNeeded: AI_OPERATIONAL_AUDIT_FORM.serviceNeeded,
  budgetRange: AI_OPERATIONAL_AUDIT_FORM.budgetRange,
  timeline: AI_OPERATIONAL_AUDIT_FORM.timeline,
} as const;
