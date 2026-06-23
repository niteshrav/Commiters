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
  kicker: "TECHNICAL CASE STUDY",
  title: "AI Summarizer POC",
  description:
    "A high-speed generative AI tool designed to distill complex multi-page documents into precise three-point executive summaries.",
  metadata: {
    timeline: { label: "TIMELINE", value: "4 Weeks Development" },
    coreStack: { label: "CORE STACK", value: "Python, Google ADK, Google Cloud" },
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
        title: "Multi-page Processing",
        body: "Engineered to ingest documents exceeding 100 pages using a sliding window context window approach, ensuring no loss of nuance across chapter boundaries.",
        icon: "layers",
        badge: { text: "OPTIMIZED", variant: "dark" },
      },
      {
        id: "synthesis",
        title: "3-Point Synthesis",
        body: "Custom prompt engineering logic that forces the LLM to categorize insights into Strategic, Operational, and Financial impact points.",
        icon: "list",
        badge: { text: "LOGIC ENGINE", variant: "light" },
      },
      {
        id: "latency",
        title: "Latency Optimization",
        body: "Asynchronous Google ADK calls and Google Cloud Functions (Gen 2) reduced response times by 64% compared to standard sequential processing.",
        icon: "gauge",
        badge: { text: "HIGH-SPEED", variant: "dark" },
      },
    ] satisfies AiSummarizerArchitectureCard[],
  },
  techStack: {
    heading: "The Tech Stack",
    description:
      "Our selection of tools prioritized scalability and the specific requirements of multi-modal generative AI pipelines.",
    items: [
      {
        id: "language",
        label: "LANGUAGE",
        title: "Python 3.11",
        body: "Leveraging Pydantic for strict data validation and FastAPI for high-performance interface endpoints.",
      },
      {
        id: "ai-framework",
        label: "AI FRAMEWORK",
        title: "Google ADK",
        body: "Utilizing advanced embedding models and vector search to maintain document hierarchy during processing.",
      },
      {
        id: "cloud",
        label: "CLOUD INFRA",
        title: "Google Cloud",
        body: "Vertex AI pipelines paired with Cloud Run for serverless scaling of intensive LLM workloads.",
      },
      {
        id: "delivery",
        label: "DELIVERY",
        title: "JSON-Structured API",
        body: "Guaranteed schema output for seamless integration into enterprise ERP and reporting systems.",
      },
    ] satisfies AiSummarizerStackItem[],
  },
  execution: {
    heading: "Execution Strategy",
    items: [
      {
        id: "tokenization",
        title: "Data Tokenization",
        body: "Breaking multi-page PDFs into semantic chunks without losing context between headers and tables.",
      },
      {
        id: "chaining",
        title: "Latency Chaining",
        body: "Executing parallel processing threads for document ingestion while the summary engine initializes.",
      },
      {
        id: "validation",
        title: "Output Validation",
        body: "An automated feedback loop that cross-references the summary against the source text for factual grounding.",
      },
    ] satisfies AiSummarizerExecutionItem[],
  },
} as const;
