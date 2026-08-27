import { ROUTES } from "./routes";

export const AI_SOLUTIONS_DOCUMENT_TITLE = "Generative AI & LLM Solutions | Commiters" as const;

export const AI_SOLUTIONS_SEO = {
  title: AI_SOLUTIONS_DOCUMENT_TITLE,
  description:
    "Custom generative AI pipelines from Commiters. We connect Vertex AI, Gemini, and fine-tuned LLMs into your databases, web apps, and operational workflows.",
  keywords:
    "generative AI, LLM solutions, Vertex AI, Gemini, RAG, document processing, workflow agents, Commiters",
  path: ROUTES.aiSolutions,
} as const;

export const AI_SOLUTIONS_HERO = {
  eyebrow: "ENTERPRISE-GRADE GEN AI INTEGRATIONS",
  headline: "Custom Generative AI Pipelines Built for Your Specific Business Logic",
  subheadline:
    "We connect Google Vertex AI, Gemini 1.5, and fine-tuned LLMs directly into your databases, web apps, and operational workflows.",
} as const;

export const AI_SOLUTIONS_CTA_LABEL = "Explore Custom AI Solutions" as const;

export const AI_SOLUTIONS_OFFERINGS = [
  {
    id: "document-processing",
    title: "Intelligent Document Processing",
    body: "Automatically extract, validate, and structure data from invoices, receipts, and PDFs directly into your ERP/Database.",
  },
  {
    id: "rag-search",
    title: "Knowledge Base & Vector Search (RAG)",
    body: "Search through internal operational logs, contracts, and customer tickets instantly with LLM-powered search.",
  },
  {
    id: "workflow-agents",
    title: "Automated Workflow Agents",
    body: "AI workers that triage emails, flag anomalies, and handle repetitive multi-system task approvals.",
  },
] as const;

export const AI_SOLUTIONS_STACK = [
  { id: "cloud-run", label: "Google Cloud Run", slug: "googlecloud" },
  { id: "vertex-ai", label: "Vertex AI", slug: "googlecloud" },
  { id: "gemini", label: "Gemini 1.5", slug: "googlegemini" },
  { id: "postgresql", label: "PostgreSQL", slug: "postgresql" },
  { id: "python", label: "Python", slug: "python" },
  { id: "nodejs", label: "Node.js", slug: "nodedotjs" },
  { id: "terraform", label: "Terraform", slug: "terraform" },
] as const;

export const AI_SOLUTIONS_BOTTOM_CTA = {
  headline: "Ready to embed Gen AI into your core stack?",
  buttonLabel: "Book an AI Operational Audit",
  to: ROUTES.aiOperationalAudit,
} as const;
