import type { CaseStudyProject } from "./caseStudiesPageContent";
import { ROUTES } from "./routes";

export type WorkPageFilterId = "all" | "ai" | "cloud" | "saas" | "web";

export const CASE_STUDIES_PAGE_DESIGN = {
  hero: {
    kicker: "SELECTED WORK",
    titleLead: "Systems built for",
    titleAccent: "real operations.",
    subtext: "AI products, cloud platforms, and workflow systems engineered for measurable outcomes.",
    ctaLabel: "Explore Case Studies",
    ctaHref: "#featured-case-studies",
    visual: [
      { id: "ai", label: "AI & Automation" },
      { id: "cloud", label: "Cloud Platforms" },
      { id: "saas", label: "SaaS Products" },
      { id: "web", label: "Web Applications" },
    ],
  },
  featured: {
    heading: "Featured Case Studies",
  },
  metrics: [
    { value: "8+", label: "Projects Delivered" },
    { value: "AI + Cloud", label: "Across Industries" },
    { value: "Production Ready", label: "Real-World Impact" },
    { value: "Spec-Driven", label: "Built for Operations" },
  ],
  filters: [
    { id: "all", label: "All" },
    { id: "ai", label: "AI & Automation" },
    { id: "cloud", label: "Cloud Platforms" },
    { id: "saas", label: "SaaS" },
    { id: "web", label: "Web Apps" },
  ] as const satisfies readonly { id: WorkPageFilterId; label: string }[],
  cta: {
    kicker: "LET'S BUILD TOGETHER",
    title: "Have a system to build?",
    subtext: "Let's turn the requirement into a production-ready product.",
    primaryLabel: "Start a Conversation",
    primaryTo: ROUTES.contact,
  },
  detailsCta: "View Case Study",
} as const;

export const WORK_PAGE_PROJECT_PRESENTATION: Record<
  string,
  {
    blurb: string;
    badge: string;
    filters: WorkPageFilterId[];
    tags?: string[];
  }
> = {
  commiters: {
    blurb: "A high-performance cloud platform built for growth, speed, and clean user experience.",
    badge: "Cloud Platforms",
    filters: ["cloud", "web"],
    tags: ["React", "Vite", "Tailwind CSS", "Cloud"],
  },
  "ai-summarizer": {
    blurb: "Transform long documents into clear, actionable summaries with enterprise-grade security.",
    badge: "AI & Automation",
    filters: ["ai"],
    tags: ["Python", "OpenAI", "Document AI"],
  },
  "multi-role-crm": {
    blurb: "AI-powered CRM assistance with real-time workflows.",
    badge: "SaaS",
    filters: ["saas", "ai"],
    tags: ["React", "RAG", "WebSockets"],
  },
  "neardrop-mvp": {
    blurb: "Real-time fleet tracking and smarter field operations.",
    badge: "SaaS",
    filters: ["saas"],
    tags: ["Node.js", "React", "WebSockets"],
  },
  "browse-my-vacation": {
    blurb: "A curated travel platform with custom quote workflows.",
    badge: "Web Apps",
    filters: ["web", "saas"],
    tags: ["React", "Next.js", "Node.js"],
  },
  "prospectiq-ai": {
    blurb: "Automated lead discovery and intelligence for B2B sales.",
    badge: "AI & Automation",
    filters: ["ai"],
    tags: ["Python", "FastAPI", "PostgreSQL"],
  },
  "ecoroute-intelligence": {
    blurb: "Cloud-native fleet and route optimization.",
    badge: "Cloud Platforms",
    filters: ["cloud"],
    tags: ["React", "Node.js", "PostgreSQL"],
  },
  "governed-ai": {
    blurb: "Policy-gated AI workflows with secure data access.",
    badge: "AI & Automation",
    filters: ["ai", "cloud"],
    tags: ["MCP", "RLS", "Express"],
  },
};

export const WORK_PAGE_GRID_ORDER = [
  "multi-role-crm",
  "neardrop-mvp",
  "browse-my-vacation",
  "prospectiq-ai",
  "ecoroute-intelligence",
  "governed-ai",
] as const;

export function workPageBlurb(project: Pick<CaseStudyProject, "id" | "solution">): string {
  return WORK_PAGE_PROJECT_PRESENTATION[project.id]?.blurb ?? project.solution;
}

export function workPageBadge(project: Pick<CaseStudyProject, "id" | "category" | "tags">): string {
  return WORK_PAGE_PROJECT_PRESENTATION[project.id]?.badge ?? project.category ?? project.tags[0] ?? "Case Study";
}

export function workPageTags(project: Pick<CaseStudyProject, "id" | "tags">, limit: number): string[] {
  const overlay = WORK_PAGE_PROJECT_PRESENTATION[project.id]?.tags;
  const tags = overlay?.length ? overlay : project.tags;
  return tags.slice(0, limit);
}

export function workPageMatchesFilter(projectId: string, filter: WorkPageFilterId): boolean {
  if (filter === "all") return true;
  return WORK_PAGE_PROJECT_PRESENTATION[projectId]?.filters.includes(filter) ?? filter === "all";
}
