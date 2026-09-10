import { TECH_LOCAL_ICONS } from "./homeTechStack";
import { ROUTES } from "./routes";
import type { TechnicalCaseStudyCopy } from "./technicalCaseStudy";

export const PROSPECT_IQ_CASE_STUDY_COPY = {
  documentTitle: "ProspectIQ AI Case Study",
  pageId: "prospectiq",
  kicker: "TECHNICAL CASE STUDY: GOVERNED AI & WORKFLOW SYSTEM",
  title: "ProspectIQ AI — Governed B2B Prospecting & Intelligence Engine",
  subtitle:
    "Governed multi-agent lead enrichment pipeline engineered with strict Model Context Protocol (MCP) tool sockets, semantic input validation, and zero vendor lock-in.",
  heroImage: {
    src: "/assets/case-studies/prospectiq-ai.png",
    alt: "ProspectIQ AI governed B2B prospecting dashboard",
  },
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
      {
        slug: "mcp",
        alt: "MCP",
        title: "MCP Protocol",
        subtitle: "Scoped tool sockets",
        iconSrc: TECH_LOCAL_ICONS.mcp,
      },
      { slug: "anthropic", alt: "LLM", title: "OpenAI / Anthropic APIs", subtitle: "Vendor-portable models" },
      { slug: "postgresql", alt: "PostgreSQL", title: "PostgreSQL", subtitle: "Validated firmographics" },
    ],
  },
  architecture: {
    heading: "Technical Architecture",
    sections: [
      {
        id: "enrichment",
        title: "Multi-Agent Lead Enrichment",
        body: "Parallel agents query, verify domains, and emit structured firmographics.",
      },
      {
        id: "mcp",
        title: "Policy-Gated MCP",
        body: "Tools and CRM stay behind scoped MCP sockets — no raw database access.",
      },
      {
        id: "vibe-diff",
        title: "Human-in-the-Loop",
        body: "Bulk outreach and CRM writes wait for explicit human confirmation.",
      },
    ],
  },
  features: [
    {
      id: "agents",
      title: "Parallel Enrichment",
      body: "Agents verify domains and emit schema-valid JSON.",
      icon: "performance",
    },
    {
      id: "mcp",
      title: "Policy-Gated MCP",
      body: "Every tool call stays inside authorized MCP sockets.",
      icon: "seo",
    },
    {
      id: "hitl",
      title: "Vibe Diff Approval",
      body: "CRM writes wait for human confirmation before commit.",
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
