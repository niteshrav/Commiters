import { HOME_OPS_FLOW_SECTION_ID } from "./homePageContent";
import { ROUTES } from "./routes";

export const HOME_LEAD_MAGNET_TEST_ID = "home-lead-magnet" as const;
export const HOME_LEAD_MAGNET_SECTION_ID = HOME_OPS_FLOW_SECTION_ID;

export type HomeLeadMagnetFeatureTone = "blue" | "green" | "purple";

export type HomeLeadMagnetFeature = {
  title: string;
  description: string;
  tone: HomeLeadMagnetFeatureTone;
};

export const HOME_LEAD_MAGNET_COPY = {
  badge: "PROPRIETARY AI PRODUCT",
  titleLead: "OpsFlow ",
  titleAccent: "AI",
  description: "Extract clean, structured data from any business document.",
  features: [
    {
      title: "Smart Extract",
      description: "Accurate data capture",
      tone: "blue",
    },
    {
      title: "Auto Format",
      description: "Ready-to-use Excel",
      tone: "green",
    },
    {
      title: "Fast Export",
      description: "Built for workflows",
      tone: "purple",
    },
  ] satisfies HomeLeadMagnetFeature[],
  documentTypes: ["PDF", "Invoice", "Receipt", "GST Bill", "Statement"],
  visual: {
    uploadTitle: "Upload Your Document",
    uploadSubtitle: "PDF, Images or Scanned Files",
    uploadCta: "Upload Sample",
    uploadNote: "No data is stored. Secure and private.",
    outputLabel: "Structured Excel Output",
  },
  ctaPrimary: "Try OpsFlow AI",
  ctaPrimaryTo: ROUTES.opsFlowPlayground,
  ctaDemo: "Request Enterprise Demo",
  formTitle: "Request an Enterprise Demo",
  formSubtitle: "Submit a sample layout to receive your benchmark Excel conversion.",
  emailLabel: "Business email",
  emailPlaceholder: "Enter your business email",
  submitLabel: "Send Benchmark Request",
  microcopy: "Zero spam. Direct benchmark results delivered within 1 business day.",
  successMessage:
    "Request Received! Our engineering team will reach out shortly to process your sample PDF-to-Excel conversion.",
  serviceNeeded: "AI Integration",
  timeline: "Immediate",
  subscriberName: "Website Visitor",
  requestMessage: "Requested OpsFlow AI sample PDF-to-Excel extraction",
} as const;

export const HOME_LEAD_MAGNET_LAYOUT = {
  sectionClass: "home-lead-magnet home-lead-magnet--opsflow band-breakout",
  innerClass: "home-lead-magnet-inner",
  offerClass: "home-lead-magnet-offer",
  visualClass: "home-lead-magnet-visual",
  formClass: "home-lead-magnet-form",
  formCardClass: "home-lead-magnet-card",
  formTitleClass: "home-lead-magnet-form-title",
  formSubtitleClass: "home-lead-magnet-form-subtitle",
  badgeClass: "home-lead-magnet-badge",
  featuresClass: "home-lead-magnet-feature-cards",
  background: "#F8FAFC",
  paddingBlock: "clamp(48px, 5vw, 64px)",
  innerMaxWidth: "var(--max-width, 1360px)",
  cardBackground: "#FFFFFF",
  cardBorder: "#E2E8F0",
} as const;
