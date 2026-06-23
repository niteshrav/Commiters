import { ROUTES } from "./routes";

export type CaseStudyGridSpan = "wide" | "narrow";
export type CaseStudyLayout = "horizontal" | "stacked";
export type CaseStudyTagVariant = "pill" | "outline" | "accent";
export type CaseStudyTagsPlacement = "header" | "below-media";

export type CaseStudyProject = {
  id: string;
  title: string;
  tags: string[];
  tagVariant?: CaseStudyTagVariant;
  tagsPlacement?: CaseStudyTagsPlacement;
  problem: string;
  solution: string;
  gridSpan: CaseStudyGridSpan;
  layout: CaseStudyLayout;
  detailsLabel: string;
  detailsHref: string;
  external?: boolean;
};

export const CASE_STUDIES_PAGE_COPY = {
  intro: {
    kicker: "OUR WORK",
    title: "Proven Precision",
    subtext:
      "We build high-performance digital products for visionary founders who demand technical excellence and minimalist aesthetic clarity.",
  },
  bottomCta: {
    title: "Ready for the next level?",
    primaryLabel: "Start a Project",
    primaryTo: ROUTES.contact,
    secondaryLabel: "View All Services",
    secondaryTo: ROUTES.services,
  },
} as const;

export const CASE_STUDY_PROJECTS: CaseStudyProject[] = [
  {
    id: "commiters",
    title: "Commiters.com",
    tags: ["Design Showcase"],
    tagVariant: "pill",
    problem: "Needed a high-performance brand showcase that mirrors the precision of our codebase.",
    solution: "Built a zero-latency React/Next.js ecosystem with a custom minimalist design system.",
    gridSpan: "wide",
    layout: "horizontal",
    detailsLabel: "View Project Details",
    detailsHref: ROUTES.commitersCaseStudy,
  },
  {
    id: "ai-summarizer",
    title: "AI Summarizer",
    tags: ["Python • Google ADK"],
    tagVariant: "accent",
    tagsPlacement: "header",
    problem:
      "Distilling complex, multi-page documents into strategic insights was time-consuming for executives.",
    solution:
      "Engineered a generative AI tool using Google ADK to produce precise, three-point executive summaries.",
    gridSpan: "narrow",
    layout: "stacked",
    detailsLabel: "View Project Details",
    detailsHref: ROUTES.aiSummarizerCaseStudy,
  },
  {
    id: "multi-role-crm",
    title: "Multi-Role CRM & AI Chatbot",
    tags: [],
    problem: "Enterprise support teams struggled with manual query resolution and fragmented customer data.",
    solution:
      "Created an AI-powered CRM with RAG-enhanced chatbots for intelligent, real-time customer interaction.",
    gridSpan: "narrow",
    layout: "stacked",
    detailsLabel: "View Project Details",
    detailsHref: ROUTES.multiRoleCrmCaseStudy,
  },
  {
    id: "neardrop-mvp",
    title: "NearDrop MVP",
    tags: ["AFFILIATES", "VENDORS", "CUSTOMERS"],
    tagVariant: "outline",
    problem: "Merchant-driver coordination in logistics was fragmented and lacked real-time visibility.",
    solution:
      "Developed a robust three-role system (Affiliates, Vendors, Customers) for seamless tracking and coordination.",
    gridSpan: "wide",
    layout: "horizontal",
    detailsLabel: "View Project Details",
    detailsHref: ROUTES.neardropCaseStudy,
  },
  {
    id: "nextsaas",
    title: "NextSaas",
    tags: [],
    problem:
      "Ensuring performance and reliability across fragmented SaaS platforms required extensive manual verification.",
    solution:
      "Executed end-to-end testing for web and mobile applications to ensure cross-platform stability and reliability.",
    gridSpan: "narrow",
    layout: "stacked",
    detailsLabel: "View Project Details",
    detailsHref: ROUTES.nextsaasCaseStudy,
  },
];
