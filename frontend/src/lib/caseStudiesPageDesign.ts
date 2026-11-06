import { BROWSE_MY_VACATION_LIVE_URL } from "./browseMyVacationCaseStudyContent";
import { ECOROUTE_LIVE_URL } from "./ecoRouteCaseStudyContent";
import { MULTI_ROLE_CRM_LIVE_URL } from "./multiRoleCrmCaseStudyContent";
import { PROSPECTIQ_LIVE_URL } from "./prospectIqCaseStudyContent";
import { SYNAPSE_LIVE_URL, TERMINAL_LIVE_URL } from "./studioProducts";
import { TRUSTTAP_LIVE_URL } from "./trustTapPageContent";
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
  | "travel"
  | "enterprise";

export const CASE_STUDIES_PAGE_DESIGN = {
  hero: {
    kicker: "OUR WORK",
    titleLead: "Work,",
    titleAccent: "in production.",
    subtext: "Selected platforms and operational systems, engineered with the same discipline we apply to client delivery.",
    ctaLabel: "View case studies",
    ctaHref: "#featured-case-studies",
    secondaryLabel: "Our Approach",
    secondaryTo: buildAboutSectionHref("delivery-journey"),
    visual: [
      { id: "ai", label: "AI & Automation" },
      { id: "cloud", label: "Cloud Platforms" },
      { id: "saas", label: "SaaS Products" },
      { id: "web", label: "Web Applications" },
      { id: "enterprise", label: "Enterprise & Workforce" },
    ],
    mockups: ["commiters", "ai-summarizer", "neardrop-mvp"] as const,
  },
  featured: {
    heading: "Flagship platforms",
    subtext: "A short list of systems we have shipped and still stand behind.",
  },
  grid: {
    heading: "The full portfolio",
    empty: "No projects in this category yet.",
  },
  filters: [
    { id: "all", label: "All Projects" },
    { id: "ai", label: "AI & Automation" },
    { id: "cloud", label: "Cloud Platforms" },
    { id: "saas", label: "SaaS Products" },
    { id: "web", label: "Web Applications" },
    { id: "business", label: "Business Software" },
    { id: "travel", label: "Travel & Booking" },
    { id: "enterprise", label: "Enterprise & Workforce Solutions" },
  ] as const satisfies readonly { id: WorkPageFilterId; label: string }[],
  enterprise: {
    title: "Enterprise & Workforce Solutions",
    tagline: "Hiring, onboarding, and the company operating record — in production.",
    description:
      "Terminal screens candidates and onboards engineers against the curriculum we ship with. Synapse holds people, work, money, and named policy on one Person record.",
  },
  cta: {
    kicker: "NEXT BUILD",
    title: "Brief the next system.",
    subtext: "From first architecture to a governed launch, we treat every product as a production surface.",
    primaryLabel: "Start a brief",
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
    blurb: "A spec-driven public platform, engineered for speed, isolation, and a precise user experience.",
    badge: "Cloud Platforms",
    filters: ["cloud", "web"],
    tags: ["React", "Vite", "Tailwind CSS", "Cloud"],
    liveHref: `${SITE_ORIGIN}/`,
  },
  "ai-summarizer": {
    blurb: "Long operational packets, reduced to governed briefs with enterprise-grade control.",
    badge: "AI & Automation",
    filters: ["ai"],
    tags: ["Python", "OpenAI", "Document AI"],
  },
  "multi-role-crm": {
    blurb: "Role-aware CRM assistance, with live updates and policy-gated answers.",
    badge: "SaaS Products",
    filters: ["saas", "ai", "business"],
    tags: ["React", "RAG", "WebSockets"],
    liveHref: MULTI_ROLE_CRM_LIVE_URL,
  },
  "neardrop-mvp": {
    blurb: "A field-operations concept presented as a focused product experience.",
    badge: "SaaS Products",
    filters: ["saas", "business"],
    tags: ["Node.js", "React", "WebSockets"],
  },
  "browse-my-vacation": {
    blurb: "A curated travel marketplace with city-first search and custom quote paths.",
    badge: "Travel & Booking",
    filters: ["web", "travel"],
    tags: ["React", "Next.js", "Node.js"],
    liveHref: BROWSE_MY_VACATION_LIVE_URL,
  },
  "prospectiq-ai": {
    blurb: "Deterministic prospect scoring, explained for underwriters—never auto-approved.",
    badge: "AI & Automation",
    filters: ["ai", "business"],
    tags: ["Python", "Google ADK", "Gemini"],
    liveHref: PROSPECTIQ_LIVE_URL,
  },
  "ecoroute-intelligence": {
    blurb: "Specialist agents that turn mobility data into congestion and emissions decisions.",
    badge: "AI & Automation",
    filters: ["ai", "business"],
    tags: ["Python", "Google ADK", "Gemini"],
    liveHref: ECOROUTE_LIVE_URL,
  },
  "governed-ai": {
    blurb: "Policy-gated AI workflows, with access held at the data layer.",
    badge: "AI & Automation",
    filters: ["ai", "cloud"],
    tags: ["MCP", "RLS", "Express"],
  },
  terminal: {
    blurb:
      "Candidate screens, engineer onboarding, and the curriculum used in delivery — not a marketplace, not a bootcamp.",
    badge: "Enterprise & Workforce Solutions",
    filters: ["enterprise"],
    tags: ["Recruitment", "Scorecards", "Onboarding", "Curriculum"],
    liveHref: TERMINAL_LIVE_URL,
  },
  synapse: {
    blurb: "People, work, and money share one record. You sign in as a Person in the company.",
    badge: "Enterprise & Workforce Solutions",
    filters: ["enterprise"],
    tags: ["People", "Work", "Money", "Policy"],
    liveHref: SYNAPSE_LIVE_URL,
  },
  prooflyn: {
    blurb: "Smart NFC/QR touchpoints that scale 5-star Google reviews while intercepting customer complaints privately.",
    badge: "SaaS Products",
    filters: ["saas"],
    tags: ["NFC", "QR", "Reviews"],
    liveHref: TRUSTTAP_LIVE_URL,
  },
};

export const WORK_PAGE_GRID_ORDER = [
  "terminal",
  "synapse",
  "prooflyn",
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
