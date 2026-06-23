export type TrustStat = { value: string; label: string };

export const HOME_TRUST_STATS: TrustStat[] = [
  { value: "12+", label: "Projects Delivered" },
  { value: "3", label: "Countries" },
  { value: "4hr", label: "Reply Guarantee" },
];

export const HOME_TRUST_COUNTRIES = ["India", "USA", "UK"] as const;

export type Testimonial = {
  quote: string;
  name: string;
  company: string;
  country: string;
  countryCode: string;
  initials: string;
  accent: "gold" | "teal" | "violet";
};

export const HOME_TESTIMONIALS: Testimonial[] = [
  {
    quote:
      "Nitesh delivered our entire SaaS MVP in 6 weeks — clean code, clear communication, and he flagged risks before we even noticed them. Exactly the technical co-builder we needed.",
    name: "Arjun Kumar",
    company: "FinTech Startup, Bangalore",
    country: "India",
    countryCode: "IN",
    initials: "AK",
    accent: "gold",
  },
  {
    quote:
      "Working across time zones was seamless. Written updates every day, overlap hours for calls, and no loss of context. The AI integration he built is genuinely production-ready.",
    name: "Sarah Reynolds",
    company: "SaaS Founder, London",
    country: "UK",
    countryCode: "GB",
    initials: "SR",
    accent: "teal",
  },
  {
    quote:
      "Most agencies hand you off to junior devs after the sales call. With Commiters, Nitesh is on every call, writes every line. That level of ownership shows in the final product.",
    name: "Michael Chen",
    company: "Automation Platform, NYC",
    country: "USA",
    countryCode: "US",
    initials: "MC",
    accent: "violet",
  },
];

export type PortfolioProject = {
  title: string;
  tag: string;
  techStack: string;
  description: string;
  ctaLabel: string;
  ctaHref: string;
  external?: boolean;
  visualVariant: "navy" | "forest" | "slate";
};

export const HOME_PORTFOLIO_PROJECTS: PortfolioProject[] = [
  {
    title: "Commiters.com",
    tag: "Website",
    techStack: "REACT • VITE • TAILWIND",
    description: "Our own site — designed and built from scratch with performance and conversion in mind.",
    ctaLabel: "View Live →",
    ctaHref: "https://www.commiters.com/",
    external: true,
    visualVariant: "slate",
  },
  {
    title: "AI Summariser",
    tag: "AI Tool",
    techStack: "PYTHON • GOOGLE ADK • LLM",
    description:
      "Condenses long documents and threads into accurate briefs — with evaluation hooks and guardrails suitable for production workflows.",
    ctaLabel: "Discuss this project →",
    ctaHref: "/contact",
    visualVariant: "navy",
  },
  {
    title: "Customer Service Portal",
    tag: "Web App",
    techStack: "LLM • RAG • REACT • NODE.JS",
    description:
      "Ticketing, routing, and operator dashboards that give support teams clear SLAs, audit trails, and faster resolutions.",
    ctaLabel: "Discuss this project →",
    ctaHref: "/contact",
    visualVariant: "forest",
  },
  {
    title: "Internal Ops Dashboard",
    tag: "SaaS",
    techStack: "REACT • NODE.JS • POSTGRESQL",
    description: "Role-based admin tooling with audit trails and exportable reports for distributed teams.",
    ctaLabel: "Discuss this project →",
    ctaHref: "/contact",
    visualVariant: "slate",
  },
];

export type HomeServiceCard = {
  id: string;
  title: string;
  blurb: string;
  bestFor: string;
  accent: "teal" | "gold";
};

export const HOME_SERVICE_CARDS: HomeServiceCard[] = [
  {
    id: "website",
    title: "Website Development",
    blurb: "Websites and landing pages tuned for speed and trust.",
    bestFor: "Local businesses & marketing teams",
    accent: "teal",
  },
  {
    id: "webapp",
    title: "Web Applications",
    blurb: "Custom web software for your team and your customers.",
    bestFor: "SaaS startups & product teams",
    accent: "teal",
  },
  {
    id: "mobile",
    title: "Mobile Applications",
    blurb: "Polished app experiences on iOS and Android.",
    bestFor: "Founders shipping cross-platform MVPs",
    accent: "teal",
  },
  {
    id: "automation",
    title: "Automation Tools",
    blurb: "Workflows and integrations that reduce manual work.",
    bestFor: "Ops teams drowning in spreadsheets",
    accent: "gold",
  },
  {
    id: "ai",
    title: "AI Integration",
    blurb: "Practical AI wired to your data with clear guardrails.",
    bestFor: "Teams adding LLM features safely",
    accent: "gold",
  },
  {
    id: "mvp",
    title: "MVP Development",
    blurb: "A focused first release you can ship and iterate on.",
    bestFor: "Pre-seed & seed founders",
    accent: "gold",
  },
];

export const FOUNDER_SKILL_CHIPS = [
  "React",
  "Node.js",
  "PostgreSQL",
  "TypeScript",
  "Python",
  "Google ADK",
  "AI/LLM",
  "RAG",
  "Vector Search",
] as const;

export type FounderSkillBar = { label: string; level: number };

export const FOUNDER_SKILL_BARS: FounderSkillBar[] = [
  { label: "React", level: 95 },
  { label: "Node.js", level: 92 },
  { label: "AI / LLM", level: 88 },
  { label: "PostgreSQL", level: 90 },
];

export const SERVICE_FEATURE_PILLS: Record<string, string[]> = {
  "website-development": [
    "Custom design",
    "Mobile-first",
    "SEO ready",
    "CMS integration",
    "Performance tuned",
    "Maintenance",
  ],
  "web-applications": [
    "React / Node.js",
    "Real-time features",
    "API development",
    "Database design",
    "Cloud deploy",
    "Security first",
  ],
  "mobile-applications": [
    "React Native",
    "iOS & Android",
    "Offline support",
    "Push notifications",
    "App store ready",
    "Analytics",
  ],
  "automation-tools": [
    "Workflow design",
    "API integrations",
    "Scheduled jobs",
    "Error monitoring",
    "Reporting",
    "Documentation",
  ],
  "ai-integration": [
    "RAG pipelines",
    "LLM guardrails",
    "Evaluation harness",
    "Vector search",
    "Human review",
    "Cost controls",
  ],
  "mvp-development": [
    "Discovery workshops",
    "Scope prioritization",
    "Launch architecture",
    "Lean timeline",
    "Usage analytics",
    "Roadmap",
  ],
};

export const PORTFOLIO_CATEGORY_TAGS: Record<string, string> = {
  "Commiters.com": "Website",
  "AI Summariser": "AI Tool",
  "Customer Service Portal": "Web App",
  "Internal Ops Dashboard": "SaaS",
};
