export const HOME_LEAD_MAGNET_TEST_ID = "home-lead-magnet" as const;

export const HOME_LEAD_MAGNET_COPY = {
  badge: "OPSFLOW AI • DOCUMENT INTELLIGENCE",
  title: "Transform Unstructured PDFs into Clean, Structured Excel Datasets",
  description:
    "OpsFlow AI eliminates manual document entry by automatically extracting tables, line items, and complex financial fields from PDFs directly into production-ready Excel workbooks.",
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
      title: "Zero Manual Effort",
      body: "Eliminates copy-paste errors and speeds up reconciliation cycles.",
    },
  ],
  formTitle: "Test OpsFlow AI with Your Document Format",
  formSubtitle: "Submit a sample layout to receive your benchmark Excel conversion.",
  emailLabel: "Business email",
  emailPlaceholder: "Enter your business email",
  submitLabel: "Request Sample Extraction",
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
  innerMaxWidth: "80rem",
  cardBackground: "#FFFFFF",
  cardBorder: "#E2E8F0",
} as const;
