import { Project } from "./models";

export type CmsCaseStudyProjectSeed = {
  name: string;
  category: string;
  description: string;
  images: string[];
  technologies: string[];
  projectUrl: string;
  slug: string;
  isFeatured: boolean;
  isActive: boolean;
  order: number;
};

export const CMS_CASE_STUDY_PROJECTS: readonly CmsCaseStudyProjectSeed[] = [
  {
    name: "Commiters.com",
    category: "Web Platform",
    description: "Built a zero-latency React ecosystem with a custom minimalist design system.",
    images: [],
    technologies: ["React", "Node.js", "Express"],
    projectUrl: "/work/commiters",
    slug: "commiters",
    isFeatured: true,
    isActive: true,
    order: 1,
  },
  {
    name: "AI Summarizer",
    category: "AI Product",
    description: "Engineered a generative AI tool to produce precise executive summaries.",
    images: [],
    technologies: ["Python", "Google ADK"],
    projectUrl: "/work/ai-summarizer",
    slug: "ai-summarizer",
    isFeatured: true,
    isActive: true,
    order: 2,
  },
  {
    name: "Multi-Role CRM & AI Chatbot",
    category: "Enterprise SaaS",
    description: "Created an AI-powered CRM with RAG-enhanced chatbots for real-time customer interaction.",
    images: [],
    technologies: ["React", "Node.js", "OpenAI"],
    projectUrl: "/work/multi-role-crm",
    slug: "multi-role-crm",
    isFeatured: false,
    isActive: true,
    order: 3,
  },
  {
    name: "NearDrop MVP",
    category: "Logistics",
    description: "Developed a three-role system for seamless tracking and coordination.",
    images: [],
    technologies: ["React Native", "Node.js"],
    projectUrl: "/work/neardrop-mvp",
    slug: "neardrop-mvp",
    isFeatured: true,
    isActive: true,
    order: 4,
  },
  {
    name: "BrowseMyVacation",
    category: "Travel",
    description: "Shipped a curated Rajasthan travel platform with custom quote workflows.",
    images: [],
    technologies: ["Next.js", "Node.js"],
    projectUrl: "/work/browse-my-vacation",
    slug: "browse-my-vacation",
    isFeatured: false,
    isActive: true,
    order: 5,
  },
  {
    name: "ProspectIQ AI",
    category: "ENTERPRISE AI & WORKFLOW SYSTEM",
    description:
      "Automated B2B lead discovery and intent intelligence pipeline with governed LLM agents, schema validation, and strict API policy gateways.",
    images: [],
    technologies: ["Python", "FastAPI", "MCP Protocol", "PostgreSQL"],
    projectUrl: "/work/prospectiq-ai",
    slug: "prospectiq-ai",
    isFeatured: true,
    isActive: true,
    order: 6,
  },
  {
    name: "EcoRoute Intelligence",
    category: "SPEC-DRIVEN CLOUD PLATFORM",
    description:
      "Cloud-native green fleet and geo-routing platform with live telemetry, carbon analytics, and session-gated portal views.",
    images: [],
    technologies: ["React", "Node.js", "PostgreSQL", "Express"],
    projectUrl: "/work/ecoroute-intelligence",
    slug: "ecoroute-intelligence",
    isFeatured: true,
    isActive: true,
    order: 7,
  },
];

export function missingCmsProjects(
  existing: ReadonlyArray<{ slug?: string | null; projectUrl?: string | null }>,
): CmsCaseStudyProjectSeed[] {
  return CMS_CASE_STUDY_PROJECTS.filter(
    (project) =>
      !existing.some((row) => row.slug === project.slug || row.projectUrl === project.projectUrl),
  );
}

export async function ensureMissingCmsProjects(): Promise<number> {
  const existing = await Project.find({}, "slug projectUrl").lean();
  const missing = missingCmsProjects(existing);
  if (missing.length) {
    await Project.insertMany(missing);
  }
  return missing.length;
}
