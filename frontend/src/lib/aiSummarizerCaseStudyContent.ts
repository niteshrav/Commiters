import { ROUTES } from "./routes";

export type AiSummarizerArchitectureIcon = "layers" | "list" | "gauge";
export type AiSummarizerBadgeVariant = "dark" | "light";

export type AiSummarizerArchitectureCard = {
  id: string;
  title: string;
  body: string;
  icon: AiSummarizerArchitectureIcon;
  badge: {
    text: string;
    variant: AiSummarizerBadgeVariant;
  };
};

export type AiSummarizerStackItem = {
  id: string;
  label: string;
  title: string;
  body: string;
};

export type AiSummarizerExecutionItem = {
  id: string;
  title: string;
  body: string;
};

export const AI_SUMMARIZER_CASE_STUDY_COPY = {
  documentTitle: "AI Summarizer Case Study",
  kicker: "CASE STUDY: GOVERNED AI & WORKFLOW SYSTEMS",
  title: "Enterprise Document Ingestion & Governed LLM Pipeline",
  description:
    "High-speed document parsing engine built with strict Model Context Protocol (MCP) sockets and zero ambient authority.",
  metadata: {
    timeline: { label: "TIMELINE", value: "4 Weeks Development" },
    coreStack: { label: "CORE STACK", value: "Python 3.11, MCP Protocol, Pydantic / FastAPI, Google Cloud Run / Vertex AI" },
  },
  heroImage: {
    src: "/assets/case-studies/ai-summarizer-hero.png",
    srcSet: "/assets/case-studies/ai-summarizer-hero@2x.png 2x",
    alt: "High-tech microchip processor visual representing the AI Summarizer inference pipeline",
  },
  architecture: {
    heading: "Core Architecture",
    cards: [
      {
        id: "multi-page",
        title: "Multi-Page Processing",
        body: "Streaming context-window ingestion for multi-page invoices, receipts, and GST records, ensuring no loss of nuance across chapter boundaries.",
        icon: "layers",
        badge: { text: "OPTIMIZED", variant: "dark" },
      },
      {
        id: "synthesis",
        title: "Governance & Security",
        body: "Policy-gated execution via two-tier API gateways and human-in-the-loop (\"Vibe Diff\") approval, eliminating unmonitored model access.",
        icon: "list",
        badge: { text: "LOGIC ENGINE", variant: "light" },
      },
      {
        id: "latency",
        title: "Latency & Schema Optimization",
        body: "Parallel thread execution delivering structured JSON outputs with guaranteed schema validation and deterministic Pydantic contracts.",
        icon: "gauge",
        badge: { text: "HIGH-SPEED", variant: "dark" },
      },
    ] satisfies AiSummarizerArchitectureCard[],
  },
  techStack: {
    heading: "The Tech Stack",
    description:
      "Our selection of tools prioritized governed Model Context Protocol (MCP) sockets, schema validation, and scalable LLM pipelines.",
    items: [
      {
        id: "language",
        label: "LANGUAGE",
        title: "Python 3.11",
        body: "Leveraging Pydantic for strict data validation and FastAPI for high-performance interface endpoints.",
      },
      {
        id: "ai-framework",
        label: "GOVERNANCE",
        title: "MCP Protocol",
        body: "Model Context Protocol sockets connect models without unmonitored database access or ambient authority.",
      },
      {
        id: "cloud",
        label: "CLOUD INFRA",
        title: "Google Cloud Run / Vertex AI",
        body: "Vertex AI pipelines paired with Cloud Run for serverless scaling of intensive LLM workloads.",
      },
      {
        id: "delivery",
        label: "VALIDATION",
        title: "Pydantic / FastAPI",
        body: "Guaranteed schema output for seamless integration into enterprise ERP and reporting systems.",
      },
    ] satisfies AiSummarizerStackItem[],
  },
  execution: {
    heading: "Execution Strategy",
    items: [
      {
        id: "tokenization",
        title: "Streaming Ingestion",
        body: "Breaking multi-page PDFs into semantic chunks without losing context between headers and tables.",
      },
      {
        id: "chaining",
        title: "Policy-Gated Invocation",
        body: "Two-tier API gateways and JIT permissions keep every LLM call inside authorized MCP sockets.",
      },
      {
        id: "validation",
        title: "Schema Validation",
        body: "An automated feedback loop that cross-references structured JSON against the source text for factual grounding.",
      },
    ] satisfies AiSummarizerExecutionItem[],
  },
  bottomCta: {
    title: "Need a governed ingestion pipeline?",
    subtext: "We design MCP-socketed LLM systems with two-tier policy gateways and zero ambient authority.",
    primaryLabel: "Scope Your Governed AI Pipeline",
    primaryTo: ROUTES.aiSolutions,
  },
} as const;
