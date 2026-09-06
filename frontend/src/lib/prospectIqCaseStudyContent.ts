import { ROUTES } from "./routes";
import type { TechnicalCaseStudyCopy } from "./technicalCaseStudy";

export const PROSPECT_IQ_CASE_STUDY_COPY = {
  documentTitle: "ProspectIQ AI Case Study",
  pageId: "prospectiq",
  kicker: "TECHNICAL CASE STUDY: GOVERNED AI & WORKFLOW SYSTEM",
  title: "ProspectIQ AI: Automated B2B Sales Intelligence & Intent Scoring",
  subtitle:
    "Governed multi-agent lead enrichment pipeline engineered with strict Model Context Protocol (MCP) tool sockets, semantic input validation, and zero vendor lock-in.",
  overview: {
    heading: "Core Metrics",
    body: "Sales teams lose hundreds of hours discovering, verifying, and enriching leads across fragmented B2B databases. ProspectIQ AI automates that pipeline with governed LLM agents, schema validation, and two-tier API policy gateways—without ambient authority or hallucinated contacts.",
  },
  metrics: [
    { id: "velocity", label: "Lead Processing Velocity", value: "10x Faster" },
    { id: "accuracy", label: "Verification Accuracy", value: "99.4% Validated Email & Firmographics" },
    { id: "governance", label: "Governance Standard", value: "100% Policy-Gated MCP Execution" },
  ],
  coreStack: {
    heading: "CORE STACK",
    items: [
      { slug: "python", alt: "Python", title: "Python 3.11", subtitle: "Agent runtime & ingestion" },
      { slug: "fastapi", alt: "FastAPI", title: "FastAPI", subtitle: "Typed policy-gated APIs" },
      { slug: "openai", alt: "MCP", title: "MCP Protocol", subtitle: "Scoped tool sockets" },
      { slug: "anthropic", alt: "LLM", title: "OpenAI / Anthropic APIs", subtitle: "Vendor-portable models" },
      { slug: "postgresql", alt: "PostgreSQL", title: "PostgreSQL", subtitle: "Validated firmographics" },
    ],
  },
  architecture: {
    heading: "Technical Architecture",
    sections: [
      {
        id: "enrichment",
        title: "Multi-Agent Lead Enrichment Engine",
        body: "Parallel ingestion threads that query web targets, verify domain records, and synthesize company intent signals into structured JSON schemas.",
      },
      {
        id: "mcp",
        title: "Model Context Protocol (MCP) & Policy Gateways",
        body: "AI agents access enrichment tools and CRM databases strictly via scoped MCP sockets, preventing raw database execution or unmonitored API calls.",
      },
      {
        id: "vibe-diff",
        title: 'Deterministic Output & Human-in-the-Loop ("Vibe Diff")',
        body: "High-stakes actions (such as automated bulk outreach or CRM record updating) require explicit human confirmation before database commit.",
      },
    ],
  },
  features: [
    {
      id: "agents",
      title: "Parallel Enrichment",
      body: "Multi-agent threads verify domains and emit schema-valid JSON without leaking unmonitored context.",
      icon: "performance",
    },
    {
      id: "mcp",
      title: "Policy-Gated MCP",
      body: "Two-tier API gateways keep every tool call inside authorized MCP sockets and zero ambient authority.",
      icon: "seo",
    },
    {
      id: "hitl",
      title: "Vibe Diff Approval",
      body: "Bulk outreach and CRM writes wait for human confirmation before any persistence commit.",
      icon: "minimalist",
    },
  ],
  bottomCta: {
    title: "Need a governed intelligence pipeline?",
    subtext: "We design spec-driven LLM systems with MCP sockets, schema validation, and zero vendor lock-in.",
    primaryLabel: "Scope Your Custom AI Pipeline",
    primaryTo: ROUTES.aiSolutions,
    primaryVariant: "cyan-glow",
    secondaryLabel: "View All Work",
    secondaryTo: ROUTES.caseStudies,
  },
} as const satisfies TechnicalCaseStudyCopy;
