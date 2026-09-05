import { ROUTES } from "./routes";

export const AI_SOLUTIONS_DOCUMENT_TITLE = "AI Pipeline Engineering | Commiters" as const;

export const AI_SOLUTIONS_SEO = {
  title: AI_SOLUTIONS_DOCUMENT_TITLE,
  description:
    "Enterprise-grade document parsing and LLM workflows from Commiters. GST/PAN extraction, Gemini and Claude integrations, and a zero-vendor-lock-in backend.",
  keywords:
    "AI pipeline engineering, document parsing, GST PAN extraction, Gemini, Claude, LLM workflows, Commiters",
  path: ROUTES.aiSolutions,
} as const;

export const AI_SOLUTIONS_HERO = {
  eyebrow: "ENTERPRISE-GRADE DOCUMENT PARSING",
  headline: "Enterprise-Grade Document Parsing & LLM Workflows Built for Speed.",
  subheadline:
    "We design custom extraction pipelines for Indian GST/PAN documents, wire Gemini and Claude into your operations, and keep the backend free of vendor lock-in.",
} as const;

export const AI_SOLUTIONS_CTA_LABEL = "Schedule Technical Scoping Call" as const;

export const AI_SOLUTIONS_OFFERINGS = [
  {
    id: "document-extraction",
    title: "Custom Document Extraction",
    body: "Parse GST/PAN Indian formats — invoices, PAN records, and related documents — into structured data your ERP can trust.",
  },
  {
    id: "gemini-claude",
    title: "Gemini & Claude Integrations",
    body: "Production LLM workflows on Gemini and Claude, wired into your databases, queues, and approval paths.",
  },
  {
    id: "zero-lock-in",
    title: "Zero Vendor-Lock-In Architecture",
    body: "A backend you own: swappable models, portable prompts, and zero vendor-lock-in infrastructure.",
  },
] as const;

export const AI_SOLUTIONS_STACK = [
  { id: "gemini", label: "Gemini", slug: "googlegemini" },
  { id: "claude", label: "Claude", slug: "anthropic" },
  { id: "nodejs", label: "Node.js", slug: "nodedotjs" },
  { id: "python", label: "Python", slug: "python" },
  { id: "cloud-run", label: "Google Cloud Run", slug: "googlecloud" },
] as const;

export const AI_SOLUTIONS_FORM = {
  title: "Schedule a technical scoping call",
  nameLabel: "Name",
  namePlaceholder: "Your name",
  emailLabel: "Work Email",
  emailPlaceholder: "name@company.com",
  companyLabel: "Company Name",
  companyPlaceholder: "Company name",
  projectLabel: "Documents & workflows to automate",
  projectPlaceholder: "Which GST, PAN, or operational documents should the pipeline handle?",
  submitLabel: AI_SOLUTIONS_CTA_LABEL,
  serviceNeeded: "Custom AI Pipeline Engineering",
} as const;
