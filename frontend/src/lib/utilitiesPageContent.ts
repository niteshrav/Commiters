import { ROUTES } from "./routes";
import { SERVICES_OVERVIEW_INQUIRY_ANCHOR } from "./servicesOverviewPageContent";

export const UTILITIES_DOCUMENT_TITLE = "Free Operational Business Utilities | Commiters" as const;

export const UTILITIES_SEO = {
  title: UTILITIES_DOCUMENT_TITLE,
  description:
    "Lightweight, zero-code tools engineered by Committers to streamline daily document extraction, verification, and business operations.",
  keywords:
    "free business utilities, OpsFlow AI, PDF to Excel, GST verification, Commiters tools",
  path: ROUTES.utilities,
} as const;

export const UTILITIES_HERO = {
  eyebrow: "ZERO-CODE CLOUD UTILITIES",
  title: "Free Operational Business Utilities",
  subtitle:
    "Lightweight, zero-code tools engineered by Committers to streamline daily document extraction, verification, and business operations.",
} as const;

export type UtilitiesTool = {
  id: string;
  title: string;
  description: string;
  to: string;
  ctaLabel: string;
};

export const UTILITIES_TOOLS: readonly UtilitiesTool[] = [
  {
    id: "opsflow-ai-pdf-to-excel",
    title: "OpsFlow AI PDF-to-Excel Converter",
    description:
      "Zero-code PDF-to-Excel data ingestion for invoices, receipts, GST bills, and operational records.",
    to: ROUTES.opsFlowPlayground,
    ctaLabel: "Open OpsFlow AI",
  },
  {
    id: "gst-business-verification",
    title: "GST & Business Verification Checker",
    description:
      "Verify GSTIN status, legal names, and registration details before you invoice or onboard a vendor. Request access and we will scope a checker for your operations team.",
    to: `${ROUTES.services}#${SERVICES_OVERVIEW_INQUIRY_ANCHOR}`,
    ctaLabel: "Request this utility",
  },
] as const;

export const UTILITIES_BANNER = {
  title: "Need a custom tool or automated cloud workflow for your team?",
  ctaLabel: "Book Operational Audit",
  ctaTo: ROUTES.aiOperationalAudit,
} as const;
