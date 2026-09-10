import { ROUTES } from "./routes";

export type AiSummarizerArchitectureIcon = "layers" | "shield" | "gauge";
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
  kicker: "CASE STUDY",
  title: "Enterprise Document Ingestion & Governed LLM Pipeline",
  description: "High-speed document parsing with MCP sockets and zero ambient authority.",
  tags: ["Document AI", "MCP", "Google Cloud"] as const,
  metadata: {
    timeline: { label: "DURATION", value: "4 Weeks" },
    coreStack: { label: "STACK", value: "Python, MCP, Vertex AI" },
    industry: { label: "INDUSTRY", value: "Enterprise AI" },
  },
  heroImage: {
    src: "/assets/case-studies/ai-summarizer-hero.png",
    srcSet: "/assets/case-studies/ai-summarizer-hero@2x.png 2x",
    alt: "Document invoices flowing into a governed AI summarizer dashboard",
  },
  architecture: {
    heading: "Core Architecture",
    cards: [
      {
        id: "multi-page",
        title: "Ingestion & Processing",
        body: "Streaming multi-page invoices, receipts, and GST records without losing context.",
        icon: "layers",
        badge: { text: "OPTIMIZED", variant: "dark" },
      },
      {
        id: "synthesis",
        title: "Governance & Security",
        body: "Policy-gated MCP sockets with two-tier gateways and zero ambient authority.",
        icon: "shield",
        badge: { text: "LOGIC ENGINE", variant: "light" },
      },
      {
        id: "latency",
        title: "Optimization",
        body: "Parallel execution with deterministic Pydantic schemas and low-latency JSON output.",
        icon: "gauge",
        badge: { text: "HIGH-SPEED", variant: "dark" },
      },
    ] satisfies AiSummarizerArchitectureCard[],
  },
  techStack: {
    heading: "Tech Stack",
    description:
      "Our selection of tools prioritized governed Model Context Protocol (MCP) sockets, schema validation, and scalable LLM pipelines.",
    items: [
      {
        id: "language",
        label: "LANGUAGE",
        title: "Python 3.11",
        body: "",
      },
      {
        id: "ai-framework",
        label: "GOVERNANCE",
        title: "MCP Protocol",
        body: "",
      },
      {
        id: "cloud",
        label: "CLOUD INFRA",
        title: "Google Cloud Run / Vertex AI",
        body: "",
      },
      {
        id: "delivery",
        label: "VALIDATION",
        title: "Pydantic / FastAPI",
        body: "",
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
    title: "Turning documents into trusted intelligence",
    subtext: "We design MCP-socketed LLM systems with two-tier policy gateways and zero ambient authority.",
    primaryLabel: "View Full Case Study",
    primaryTo: ROUTES.aiSolutions,
  },
} as const;
