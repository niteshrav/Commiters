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
    kicker: "PROVEN ENTERPRISE ARCHITECTURE",
    title: "Governed AI & Cloud Engineering in Action",
    subtext:
      "Explore how we engineer production-grade cloud web platforms, governed AI pipelines, and high-stakes operational products—backed by strict policy guardrails and zero ambient authority.",
  },
  bottomCta: {
    title: "Ready for the next level?",
    primaryLabel: "Book Operational Audit",
    primaryTo: ROUTES.aiOperationalAudit,
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
    title: "ProspectIQ AI — Governed B2B Prospecting & Intelligence Engine",
    category: "ENTERPRISE AI & WORKFLOW SYSTEM",
    tags: ["Python", "FastAPI", "MCP Protocol", "LLM Pipeline", "PostgreSQL"],
    tagVariant: "cyan",
    problem:
      "Sales teams lose hundreds of hours manually discovering, verifying, and enriching lead context across fragmented B2B databases and unstructured web sources.",
    solution:
      "Built an automated lead discovery and intent intelligence pipeline powered by governed LLM agents, automated schema validation, and strict API policy gateways.",
    impact: ["10x Lead Discovery Velocity", "Zero Hallucinated Contacts"],
    gridSpan: "wide",
    layout: "horizontal",
    detailsLabel: "View Project Details",
    detailsHref: ROUTES.prospectIqCaseStudy,
  },
  {
    id: "ecoroute-intelligence",
    title: "EcoRoute Intelligence — Cloud-Native Green Fleet & Route Optimization",
    category: "SPEC-DRIVEN CLOUD PLATFORM",
    tags: ["React", "Node.js", "Geo-Spatial Algorithms", "PostgreSQL (RLS)", "Express"],
    tagVariant: "cyan",
    problem:
      "Logistics fleets suffer high carbon footprints and cost inefficiencies due to static, non-adaptive route planning that ignores real-time traffic and emissions metrics.",
    solution:
      "Engineered an intelligent geo-routing and green fleet optimization engine with live telemetry processing, route carbon analytics, and session-gated portal views.",
    impact: ["-24% Emissions Footprint", "<100ms Route Computation"],
    gridSpan: "wide",
    layout: "horizontal",
    detailsLabel: "View Project Details",
    detailsHref: ROUTES.ecoRouteCaseStudy,
  },
];
