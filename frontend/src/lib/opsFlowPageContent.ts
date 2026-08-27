import { ROUTES } from "./routes";

export const OPSFLOW_DOCUMENT_TITLE = "OpsFlow AI" as const;

export const OPSFLOW_SEO = {
  title: OPSFLOW_DOCUMENT_TITLE,
  description:
    "Turn PDF invoices, receipts, and shipping bills into clean Excel files. Free OpsFlow AI sandbox tuned for Indian GST invoices and B2B document layouts.",
  keywords:
    "OpsFlow AI, invoice OCR, GST invoice to Excel, shipping bill parser, Commiters automation, document to CSV",
  path: ROUTES.opsFlow,
} as const;

export const OPSFLOW_HERO = {
  eyebrow: "FREE BUSINESS UTILITY | ZERO SETUP REQUIRED",
  headline: "Turn PDF Invoices, Receipts & Shipping Bills into Clean Excel Files",
  subheadline:
    "Specially tuned for Indian GST invoices, PAN fields, bilingual receipts, and complex B2B layouts that generic OCR tools get wrong.",
} as const;

export const OPSFLOW_VALUE_CARDS = [
  {
    id: "sandbox",
    title: "Zero-Friction Web Sandbox",
    body: "10 free daily extractions with zero credit card or complex developer setup.",
  },
  {
    id: "excel",
    title: "Direct Excel & CSV Bridge",
    body: "Download clean .xlsx spreadsheets ready for Tally/QuickBooks, not raw developer JSON arrays.",
  },
  {
    id: "pipeline",
    title: "B2B Pipeline Ready",
    body: "Need auto-syncing email pipelines or Zapier/ERP integrations? We build custom workflows for your operations.",
  },
] as const;

export const OPSFLOW_DOCUMENT_CATEGORIES = [
  "GST Invoices",
  "Shipping Manifests/Bills",
  "Tax Receipts",
  "Purchase Orders",
  "Other",
] as const;

export type OpsFlowDocumentCategory = (typeof OPSFLOW_DOCUMENT_CATEGORIES)[number];

export const OPSFLOW_DROPZONE_LABEL = "Drag invoice/document here or click to browse" as const;
export const OPSFLOW_DROPZONE_HELP = "PDF, PNG, or JPG · Max 10MB" as const;
export const OPSFLOW_CATEGORY_LABEL = "Document Category" as const;
export const OPSFLOW_CATEGORY_PLACEHOLDER = "Select document category" as const;
export const OPSFLOW_WORK_EMAIL_LABEL = "Work Email Address" as const;
export const OPSFLOW_WORK_EMAIL_PLACEHOLDER = "name@company.com" as const;
export const OPSFLOW_SUBMIT_LABEL = "Extract Data to Excel (Free)" as const;
export const OPSFLOW_PROCESSING_LABEL = "Analyzing document fields with Gemini..." as const;
export const OPSFLOW_SUCCESS_COPY =
  "Extraction Complete! Your Excel file has been downloaded. Need auto-syncing email pipelines for your ERP? Click" as const;
export const OPSFLOW_ENGINEER_CTA_LABEL = "Talk to an Engineer" as const;
export const OPSFLOW_SECURITY_FOOTER =
  "Powered by Google Gemini via Google AI Studio. 100% Confidential — files are processed securely and deleted automatically after extraction." as const;
