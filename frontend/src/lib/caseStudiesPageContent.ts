import { ROUTES } from "./routes";

export type CaseStudyGridSpan = "wide" | "narrow";
export type CaseStudyLayout = "horizontal" | "stacked";
export type CaseStudyTagVariant = "pill" | "outline" | "accent" | "cyan";
export type CaseStudyTagsPlacement = "header" | "below-media";

export type CaseStudyProject = {
  id: string;
  title: string;
  category?: string;
  tags: string[];
  tagVariant?: CaseStudyTagVariant;
  tagsPlacement?: CaseStudyTagsPlacement;
  problem: string;
  solution: string;
  impact?: readonly string[];
  gridSpan: CaseStudyGridSpan;
  layout: CaseStudyLayout;
  detailsLabel: string;
  detailsHref: string;
  external?: boolean;
};

export const CASE_STUDIES_PAGE_COPY = {
  intro: {
    kicker: "CASE STUDIES",
    titleLead: "Governed AI & Cloud Engineering ",
    titleAccent: "in Action",
    title: "Governed AI & Cloud Engineering in Action",
    subtext: "Real-world solutions built with AI, cloud, and secure engineering.",
  },
  bottomCta: {
    title: "Have a project in mind?",
    subtext: "Let's build something impactful together.",
    primaryLabel: "Start a Conversation",
    primaryTo: ROUTES.contact,
    secondaryLabel: "View Services & Products",
    secondaryTo: ROUTES.services,
  },
} as const;

export function isHiddenFromWorkPage(project: Pick<CaseStudyProject, "id" | "detailsHref" | "title">): boolean {
  return (
    project.id === "opsflow" ||
    project.id === "opsflow-ai" ||
    project.detailsHref === ROUTES.opsFlow ||
    project.title.startsWith("OpsFlow AI")
  );
}

export const CASE_STUDY_PROJECTS: CaseStudyProject[] = [
  {
    id: "governed-ai",
    title: "Governed Enterprise AI & Automated Ingestion",
    tags: ["Model Context Protocol (MCP)", "Row-Level Security (RLS)", "Express", "MongoDB"],
    tagVariant: "cyan",
    problem: "Enterprise client required LLM automation without prompt injection risks.",
    solution:
      'Two-tier API policy gateway with JIT permissions and human-in-the-loop ("Vibe Diff") checks.',
    impact: ["Zero Security Leaks", "100% Policy-Gated Invocation"],
    gridSpan: "narrow",
    layout: "stacked",
    detailsLabel: "View Project Details",
    detailsHref: ROUTES.aiSolutions,
  },
  {
    id: "commiters",
    title: "Commiters.com — Spec-Driven Cloud Platform",
    tags: ["React", "Vite", "Tailwind CSS", "Cloud-Native"],
    tagVariant: "cyan",
    problem: "Required zero-latency, high-security web presence reflecting engineering precision.",
    solution: "Spec-driven cloud web platform built for high performance and clean UI execution.",
    impact: ["100/100 Lighthouse Speed", "<150ms TTFB"],
    gridSpan: "narrow",
    layout: "stacked",
    detailsLabel: "View Project Details",
    detailsHref: ROUTES.commitersCaseStudy,
  },
  {
    id: "neardrop-mvp",
    title: "NearDrop — Field & Logistics Coordination System",
    tags: ["Node.js", "React", "Geo-Fencing", "Real-time WebSockets"],
    tagVariant: "cyan",
    problem: "Merchant-driver logistics lacked real-time visibility and verification.",
    solution: "Three-role cloud operational portal with live tracking and offline sync.",
    impact: ["Real-Time GPS Tracking", "Zero-Downtime Architecture"],
    gridSpan: "wide",
    layout: "horizontal",
    detailsLabel: "View Project Details",
    detailsHref: ROUTES.neardropCaseStudy,
  },
  {
    id: "prospectiq-ai",
    title: "ProspectIQ AI — Loan Prospect Intelligence Platform",
    category: "LENDING DECISION SUPPORT",
    tags: ["Python", "Google ADK", "Gemini 2.5 Flash", "Streamlit", "Vertex AI"],
    tagVariant: "cyan",
    problem:
      "Retail-lending teams struggle to see genuine loan intent, repayment capacity, and product fit from traditional financial and demographic signals alone.",
    solution:
      "Built a deterministic prospect-scoring engine plus a Gemini sequential multi-agent workflow that explains capacity, product fit, and risk without approving loans.",
    impact: ["5 Sequential Specialist Agents", "Human-in-the-Loop Underwriting"],
    gridSpan: "wide",
    layout: "horizontal",
    detailsLabel: "View Project Details",
    detailsHref: ROUTES.prospectIqCaseStudy,
  },
  {
    id: "ecoroute-intelligence",
    title: "EcoRoute Intelligence — AI Transportation Decision Platform",
    category: "AI DECISION INTELLIGENCE",
    tags: ["Python", "Google ADK", "Gemini 2.5 Flash", "Pandas", "Matplotlib"],
    tagVariant: "cyan",
    problem:
      "Transportation planners sit on large mobility datasets but still struggle to convert congestion, speed, and emissions signals into timely, actionable decisions.",
    solution:
      "Built a multi-agent decision intelligence platform with Google ADK and Gemini 2.5 Flash that analyzes traffic routes, flags bottlenecks, and generates policy recommendations.",
    impact: ["15 Routes Analyzed", "6 Critical Congestion Corridors"],
    gridSpan: "wide",
    layout: "horizontal",
    detailsLabel: "View Project Details",
    detailsHref: ROUTES.ecoRouteCaseStudy,
  },
];

/** Additional Work-page case studies kept off the original five-item contract. */
export const CASE_STUDY_PORTFOLIO_EXTRAS: CaseStudyProject[] = [
  {
    id: "ai-summarizer",
    title: "AI Summarizer",
    tags: ["Python", "OpenAI", "Document AI", "MCP"],
    tagVariant: "cyan",
    problem: "Long operational documents slow review and bury decisions in unstructured text.",
    solution: "Governed document ingestion that turns packets into clear, actionable summaries.",
    impact: ["Enterprise Document Security", "Actionable Executive Briefs"],
    gridSpan: "wide",
    layout: "horizontal",
    detailsLabel: "View Project Details",
    detailsHref: ROUTES.aiSummarizerCaseStudy,
  },
  {
    id: "multi-role-crm",
    title: "Multi-Role CRM & AI Chatbot",
    tags: ["React", "RAG", "WebSockets", "RLS"],
    tagVariant: "cyan",
    problem: "Support and sales teams lacked a shared, permissioned view of customer work.",
    solution: "AI-powered CRM assistance with role-aware workflows and real-time updates.",
    impact: ["Role-Aware Access", "Live Operator Assist"],
    gridSpan: "narrow",
    layout: "stacked",
    detailsLabel: "View Project Details",
    detailsHref: ROUTES.multiRoleCrmCaseStudy,
  },
  {
    id: "browse-my-vacation",
    title: "BrowseMyVacation",
    tags: ["React", "Next.js", "Node.js", "PostgreSQL"],
    tagVariant: "cyan",
    problem: "Travel operators needed a curated storefront with reliable quote capture.",
    solution: "A B2C/B2B travel platform with packages, search, and custom quote workflows.",
    impact: ["Curated Inventory", "Quote Workflow"],
    gridSpan: "narrow",
    layout: "stacked",
    detailsLabel: "View Project Details",
    detailsHref: ROUTES.browseMyVacationCaseStudy,
  },
];

export function allStaticWorkPageProjects(): CaseStudyProject[] {
  return [...CASE_STUDY_PROJECTS, ...CASE_STUDY_PORTFOLIO_EXTRAS];
}
