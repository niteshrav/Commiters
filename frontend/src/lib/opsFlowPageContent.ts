import { ROUTES } from "./routes";

export const OPSFLOW_DOCUMENT_TITLE = "OpsFlow AI: Automated Document Ingestion | Commiters" as const;
export const OPSFLOW_SANDBOX_ANCHOR = "opsflow-sandbox" as const;

export const OPSFLOW_SEO = {
  title: OPSFLOW_DOCUMENT_TITLE,
  description:
    "Zero-code PDF-to-Excel data extraction for invoices, receipts, GST bills, and operational records.",
  keywords:
    "OpsFlow AI, invoice OCR, GST invoice to Excel, shipping bill parser, Commiters automation, document to CSV",
  path: ROUTES.opsFlow,
} as const;

export const OPSFLOW_HERO = {
  eyebrow: "PROPRIETARY CLOUD PRODUCT",
  headline: "OpsFlow AI: Automated Document Ingestion",
  subheadline:
    "Zero-code PDF-to-Excel data extraction for invoices, receipts, GST bills, and operational records.",
  tryFreeLabel: "Try Free Version",
  tryFreeHref: `#${OPSFLOW_SANDBOX_ANCHOR}`,
  demoLabel: "Request Enterprise Demo",
  demoTo: ROUTES.contact,
} as const;

export const OPSFLOW_VALUE_CARDS = [
  {
    id: "ingestion",
    icon: "upload",
    title: "Instant PDF Ingestion",
    body: "Drop invoices, receipts, GST bills, and operational PDFs into a zero-code extractor.",
  },
  {
    id: "schema",
    icon: "spreadsheet",
    title: "Deterministic Schema Checking",
    body: "Extracted fields are validated against a fixed schema so Excel output stays predictable.",
  },
  {
    id: "mcp",
    icon: "pipeline",
    title: "Enterprise MCP API Integration",
    body: "Graduate from the sandbox to governed MCP sockets when you need production document pipelines.",
  },
] as const;

export const OPSFLOW_HOW_IT_WORKS = {
  title: "How it works",
  steps: [
    {
      id: "upload",
      step: "01",
      title: "Upload your document",
      body: "Drop a GST invoice, shipping bill, or receipt — PDF, PNG, or JPG up to 10 MB.",
    },
    {
      id: "extract",
      step: "02",
      title: "AI extracts structured fields",
      body: "Gemini reads tables, GST/PAN numbers, line items, and totals tuned for Indian layouts.",
    },
    {
      id: "download",
      step: "03",
      title: "Download clean Excel",
      body: "Get a production-ready .xlsx file you can import into Tally, QuickBooks, or your ERP.",
    },
  ],
} as const;

export const OPSFLOW_PREVIEW = {
  title: "PDF → Excel in seconds",
  pdfLabel: "Scanned PDF",
  excelLabel: "Structured Excel",
  fields: [
    { label: "Vendor", value: "Shree Logistics Pvt Ltd" },
    { label: "GSTIN", value: "08AABCS1429B1Z5" },
    { label: "Invoice #", value: "INV-2026-0412" },
    { label: "Grand Total", value: "₹1,24,500.00" },
  ],
  lineItems: [
    { description: "Freight charges — Udaipur to Mumbai", total: "₹98,000" },
    { description: "Handling & documentation", total: "₹26,500" },
  ],
} as const;

export const OPSFLOW_BOTTOM_CTA = {
  title: "Need auto-syncing pipelines for your ERP?",
  subtext:
    "OpsFlow sandbox is free to try. When you need email ingestion, Zapier hooks, or custom reconciliation workflows, our engineers can build the full pipeline.",
  primaryLabel: "Talk to an Engineer",
  primaryTo: ROUTES.contact,
  secondaryLabel: "View our automation services",
  secondaryTo: ROUTES.workflowAutomation,
} as const;

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

export const OPSFLOW_DAILY_LIMIT = 10 as const;
export const OPSFLOW_QUOTA_CONTACT_EMAIL = "hello@commiters.com" as const;
export const OPSFLOW_QUOTA_TITLE = "Daily limit reached" as const;
export const OPSFLOW_QUOTA_BODY =
  "Daily limit reached. You have used your 10 free extractions for today. Need high-volume automated pipelines? Contact us at hello@commiters.com." as const;

export function formatOpsFlowRemainingLabel(remaining: number, limit: number = OPSFLOW_DAILY_LIMIT): string {
  return `Extractions remaining today: ${remaining}/${limit}`;
}
