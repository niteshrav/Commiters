import { HOME_OPS_FLOW_SECTION_ID } from "./homePageContent";
import { ROUTES } from "./routes";

export const HOME_LEAD_MAGNET_TEST_ID = "home-lead-magnet" as const;
export const HOME_LEAD_MAGNET_SECTION_ID = HOME_OPS_FLOW_SECTION_ID;

export const HOME_LEAD_MAGNET_COPY = {
  badge: "PROPRIETARY CLOUD PRODUCT",
  title: "OpsFlow AI: Transform Unstructured PDFs into Clean, Structured Excel Datasets",
  description:
    "Zero-code PDF-to-Excel data extraction for invoices, receipts, GST bills, and financial records.",
  features: [
    {
      title: "Precision Extraction",
      body: "High-accuracy table and key-value field mapping.",
    },
    {
      title: "Automated Formatting",
      body: "Instant conversion of multi-page invoices and receipts into .xlsx.",
    },
    {
      title: "Enterprise MCP Integration",
      body: "Governed Model Context Protocol sockets connect models to data without direct database access.",
    },
  ],
  ctaConverter: "Try Free Converter",
  ctaConverterTo: ROUTES.opsFlowPlayground,
  ctaDemo: "Request Enterprise Demo",
  formTitle: "Test OpsFlow AI with Your Document Format",
  formSubtitle: "Submit a sample layout to receive your benchmark Excel conversion.",
  emailLabel: "Business email",
  emailPlaceholder: "Enter your business email",
  submitLabel: "Request Enterprise Demo",
  microcopy: "Zero spam. Direct benchmark results delivered within 1 business day.",
  successMessage:
    "Request Received! Our engineering team will reach out shortly to process your sample PDF-to-Excel conversion.",
  serviceNeeded: "AI Integration",
  timeline: "Immediate",
  subscriberName: "Website Visitor",
  requestMessage: "Requested OpsFlow AI sample PDF-to-Excel extraction",
} as const;

export const HOME_LEAD_MAGNET_LAYOUT = {
  sectionClass: "home-lead-magnet band-breakout",
  innerClass: "home-lead-magnet-inner",
  offerClass: "home-lead-magnet-offer",
  formClass: "home-lead-magnet-form",
  formCardClass: "home-lead-magnet-card",
  formTitleClass: "home-lead-magnet-form-title",
  formSubtitleClass: "home-lead-magnet-form-subtitle",
  badgeClass: "home-lead-magnet-badge",
  featuresClass: "home-lead-magnet-features",
  background: "#F8FAFC",
  paddingBlock: "clamp(48px, 5vw, 64px)",
  innerMaxWidth: "var(--max-width, 1360px)",
  cardBackground: "#FFFFFF",
  cardBorder: "#E2E8F0",
} as const;
