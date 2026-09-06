import { ROUTES } from "./routes";

export const AI_SOLUTIONS_DOCUMENT_TITLE = "Governed AI & Operational Workflow Systems | Commiters" as const;

export const AI_SOLUTIONS_SEO = {
  title: AI_SOLUTIONS_DOCUMENT_TITLE,
  description:
    "Bespoke document parsing, automated back-office pipelines, and cloud verification systems—built with strict Model Context Protocol (MCP) sockets and zero vendor lock-in.",
  keywords:
    "governed AI, workflow systems, MCP sockets, document parsing, GST PAN, field verification, zero vendor lock-in, Commiters",
  path: ROUTES.aiSolutions,
} as const;

export const AI_SOLUTIONS_HERO = {
  eyebrow: "ENTERPRISE AI ENGINEERING",
  headline: "Governed AI & Operational Workflow Systems",
  subheadline:
    "Bespoke document parsing, automated back-office pipelines, and cloud verification systems—built with strict Model Context Protocol (MCP) sockets and zero vendor lock-in.",
} as const;

export const AI_SOLUTIONS_CTA_LABEL = "Request Governed AI Scoping" as const;

export const AI_SOLUTIONS_OFFERINGS = [
  {
    id: "enterprise-document-ingestion",
    title: "Enterprise Document Ingestion",
    body: "Parse GST/PAN bills, invoices, and operational PDFs into structured records your systems can trust.",
  },
  {
    id: "field-back-office-automation",
    title: "Field & Back-Office Automation",
    body: "Connect field verification and back-office handoffs into monitored, policy-gated workflows.",
  },
  {
    id: "zero-vendor-lock-in",
    title: "Zero Vendor Lock-in",
    body: "Own the pipeline: portable MCP sockets, swappable models, and no proprietary lock-in.",
  },
] as const;

export const AI_SOLUTIONS_ARCHITECTURE_TITLE = "Architecture" as const;

export const AI_SOLUTIONS_ARCHITECTURE = [
  {
    id: "mcp-tool-sockets",
    title: "MCP Tool Sockets",
    body: "Models reach data only through Model Context Protocol sockets, never direct database access.",
  },
  {
    id: "two-tier-policy-gateways",
    title: "Two-Tier Policy Gateways",
    body: "Every call passes deterministic RBAC checks and semantic input validation before execution.",
  },
  {
    id: "row-level-security-rls",
    title: "Row-Level Security (RLS)",
    body: "AI actions inherit session permissions so database rows stay scoped to the user.",
  },
  {
    id: "vibe-diff-approval",
    title: "Vibe Diff Approval",
    body: "High-stakes mutations require explicit human confirmation before commit.",
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
  title: "Scope a governed AI engagement",
  nameLabel: "Name",
  namePlaceholder: "Your name",
  emailLabel: "Work Email",
  emailPlaceholder: "name@company.com",
  companyLabel: "Company Name",
  companyPlaceholder: "Company name",
  scopeLabel: "What should we scope?",
  projectLabel: "Documents & workflows to automate",
  projectPlaceholder: "Which GST, PAN, or operational documents should the pipeline handle?",
  submitLabel: AI_SOLUTIONS_CTA_LABEL,
  serviceNeeded: "Governed AI & Workflow Systems",
} as const;
