import { BROWSE_MY_VACATION_LIVE_URL } from "./browseMyVacationCaseStudyContent";
import { PROSPECTIQ_LIVE_URL } from "./prospectIqCaseStudyContent";
import type { CaseStudyProject } from "./caseStudiesPageContent";
import { SITE_ORIGIN } from "../hooks/usePageSeo";
import { buildAboutSectionHref } from "./navSections";
import { AI_OPERATIONAL_AUDIT_BOOKING_HREF, ROUTES } from "./routes";

export type WorkPageFilterId =
  | "all"
  | "ai"
  | "cloud"
  | "saas"
  | "web"
  | "business"
  | "travel";

export const CASE_STUDIES_PAGE_DESIGN = {
  hero: {
    kicker: "OUR WORK",
    titleLead: "Ideas to",
    titleAccent: "Real Impact.",
    subtext: "Explore the digital products, platforms and systems we've built for businesses across industries.",
    ctaLabel: "Explore Case Studies",
    ctaHref: "#featured-case-studies",
    secondaryLabel: "Our Approach",
    secondaryTo: buildAboutSectionHref("delivery-journey"),
    visual: [
      { id: "ai", label: "AI & Automation" },
      { id: "cloud", label: "Cloud Platforms" },
      { id: "saas", label: "SaaS Products" },
      { id: "web", label: "Web Applications" },
    ],
    mockups: ["commiters", "ai-summarizer", "neardrop-mvp"] as const,
  },
  featured: {
    heading: "Projects That Make a Difference",
    subtext: "Selected platforms and operational systems we have shipped with clients.",
  },
  grid: {
    heading: "Explore Our Work",
    empty: "No projects in this category yet.",
  },
  testimonials: {
    kicker: "CLIENT FEEDBACK",
    heading: "What partners say",
  },
  filters: [
    { id: "all", label: "All Projects" },
    { id: "ai", label: "AI & Automation" },
    { id: "cloud", label: "Cloud Platforms" },
    { id: "saas", label: "SaaS Products" },
    { id: "web", label: "Web Applications" },
    { id: "business", label: "Business Software" },
    { id: "travel", label: "Travel & Booking" },
  ] as const satisfies readonly { id: WorkPageFilterId; label: string }[],
  cta: {
    kicker: "LET'S BUILD TOGETHER",
    title: "Have a Project in Mind?",
    subtext: "From concept to deployment, we help businesses build powerful digital products.",
    primaryLabel: "Start a Project",
    primaryTo: ROUTES.contact,
    secondaryLabel: "Book Operational Audit",
    secondaryTo: AI_OPERATIONAL_AUDIT_BOOKING_HREF,
  },
  detailsCta: "View Case Study",
  liveDemoCta: "Live Demo",
} as const;

export const WORK_PAGE_PROJECT_PRESENTATION: Record<
  string,
  {
    blurb: string;
    badge: string;
    filters: WorkPageFilterId[];
    tags?: string[];
    liveHref?: string;
  }
> = {
  commiters: {
    blurb: "A high-performance cloud platform built for growth, speed, and clean user experience.",
    badge: "Cloud Platforms",
    filters: ["cloud", "web"],
    tags: ["React", "Vite", "Tailwind CSS", "Cloud"],
    liveHref: `${SITE_ORIGIN}/`,
  },
  "ai-summarizer": {
    blurb: "Transform long documents into clear, actionable summaries with enterprise-grade security.",
    badge: "AI & Automation",
    filters: ["ai"],
    tags: ["Python", "OpenAI", "Document AI"],
  },
  "multi-role-crm": {
    blurb: "AI-powered CRM assistance with real-time workflows.",
    badge: "SaaS Products",
    filters: ["saas", "ai", "business"],
    tags: ["React", "RAG", "WebSockets"],
  },
  "neardrop-mvp": {
    blurb: "Real-time fleet tracking and smarter field operations.",
    badge: "SaaS Products",
    filters: ["saas", "business"],
    tags: ["Node.js", "React", "WebSockets"],
  },
  "browse-my-vacation": {
    blurb: "A curated travel platform with custom quote workflows.",
    badge: "Travel & Booking",
    filters: ["web", "travel"],
    tags: ["React", "Next.js", "Node.js"],
    liveHref: BROWSE_MY_VACATION_LIVE_URL,
  },
  "prospectiq-ai": {
    blurb: "Loan prospect scoring and explainable underwriting support for banking teams.",
    badge: "AI & Automation",
    filters: ["ai", "business"],
    tags: ["Python", "Google ADK", "Gemini"],
    liveHref: PROSPECTIQ_LIVE_URL,
  },
  "ecoroute-intelligence": {
    blurb: "AI agents that turn mobility data into congestion and emissions decisions.",
    badge: "AI & Automation",
    filters: ["ai", "business"],
    tags: ["Python", "Google ADK", "Gemini"],
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
  return WORK_PAGE_PROJECT_PRESENTATION[projectId]?.filters.includes(filter) ?? false;
}

export function workPageFiltersWithProjects(projectIds: readonly string[]) {
  return CASE_STUDIES_PAGE_DESIGN.filters.filter((item) => {
    if (item.id === "all") return true;
    return projectIds.some((projectId) => workPageMatchesFilter(projectId, item.id));
  });
}

export function workPageLiveHref(projectId: string): string | undefined {
  return WORK_PAGE_PROJECT_PRESENTATION[projectId]?.liveHref;
}
