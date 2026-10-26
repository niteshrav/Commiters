import { ROUTES } from "./routes";
import type { TechnicalCaseStudyCopy } from "./technicalCaseStudy";

export const PROSPECTIQ_LIVE_URL = "https://prospectiq-ai-rprbeonp4a-el.a.run.app" as const;

export const PROSPECT_IQ_CASE_STUDY_COPY = {
  documentTitle: "ProspectIQ AI Case Study",
  pageId: "prospectiq",
  kicker: "TECHNICAL CASE STUDY: LENDING DECISION SUPPORT",
  title: "ProspectIQ AI — Loan Prospect Intelligence Platform",
  subtitle:
    "An AI-powered loan prospect system for banking teams: deterministic scoring plus a Gemini sequential multi-agent workflow that explains intent, repayment capacity, product fit, and risk.",
  heroImage: {
    src: "/assets/case-studies/prospectiq-ai.png",
    alt: "ProspectIQ AI loan prospect intelligence dashboard",
  },
  overview: {
    heading: "Core Metrics",
    body: "Retail-lending teams often rely on limited financial and demographic signals, so genuine intent, repayment capacity, and product fit stay hard to see. ProspectIQ AI pairs a deterministic scoring engine with Google ADK sequential agents so Gemini can explain results without overriding them. It is a decision-support prototype on synthetic data — it does not approve or reject loans.",
  },
  metrics: [
    { id: "agents", label: "Specialist Agents", value: "5 Sequential ADK Agents" },
    { id: "scoring", label: "Scoring Engine", value: "Deterministic Source of Truth" },
    { id: "governance", label: "Lending Safeguard", value: "Human-in-the-Loop Underwriting" },
  ],
  coreStack: {
    heading: "CORE STACK",
    items: [
      { slug: "python", alt: "Python", title: "Python", subtitle: "Scoring and agent runtime" },
      { slug: "streamlit", alt: "Streamlit", title: "Streamlit", subtitle: "Executive dashboard" },
      { slug: "google", alt: "Google ADK", title: "Google ADK", subtitle: "Sequential multi-agent workflow" },
      { slug: "google", alt: "Gemini", title: "Gemini 2.5 Flash", subtitle: "Explainable reports" },
      { slug: "googlecloud", alt: "Google Cloud", title: "Vertex AI / Cloud Run", subtitle: "Hosted prototype" },
    ],
  },
  architecture: {
    heading: "Technical Architecture",
    sections: [
      {
        id: "enrichment",
        title: "Deterministic Scoring Engine",
        body: "Calculates lead score, quality class, disposable income, suggested EMI, repayment capacity, risk category, eligible products, next-best action, and underwriting recommendation.",
      },
      {
        id: "mcp",
        title: "Sequential Google ADK Agents",
        body: "Prospect Intelligence, Repayment Capacity, Loan Recommendation, Underwriting Assistant, and Decision Report agents run in a fixed order and share ADK session state.",
      },
      {
        id: "vibe-diff",
        title: "Human-in-the-Loop Underwriting",
        body: "Gemini explains calculated results and does not override them. Final lending decisions still need bank policy, consent, documents, bureau checks, and authorized review.",
      },
    ],
  },
  features: [
    {
      id: "agents",
      title: "Prospect Scoring",
      body: "Ranks conversion-ready leads using transactional, behavioural, and affordability indicators.",
      icon: "performance",
    },
    {
      id: "mcp",
      title: "Sequential ADK Workflow",
      body: "Five specialist agents produce explainable intent, capacity, product, and risk assessments.",
      icon: "seo",
    },
    {
      id: "hitl",
      title: "Decision-Support Reports",
      body: "Consolidates agent outputs into downloadable prospect reports for human underwriters.",
      icon: "minimalist",
    },
  ],
  bottomCta: {
    title: "Need lending decision intelligence?",
    subtext: "We build AI agent systems that explain prospect scores without replacing human underwriting.",
    primaryLabel: "Start an AI Project",
    primaryTo: ROUTES.contact,
    primaryVariant: "cyan-glow",
    secondaryLabel: "View All Work",
    secondaryTo: ROUTES.caseStudies,
  },
} as const satisfies TechnicalCaseStudyCopy;
