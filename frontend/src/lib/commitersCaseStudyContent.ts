import type { TechLogoDef } from "./homeTechStack";
import { ROUTES } from "./routes";
import { buildDiscoveryCallCalendarUrl } from "./siteContact";

export type CommitersCaseStudyHighlight = {
  id: string;
  title: string;
  body: string;
  icon: "performance" | "seo" | "minimalist";
};

export type CommitersCaseStudyStackItem = TechLogoDef & {
  title: string;
  subtitle: string;
};

export const COMMITERS_CASE_STUDY_COPY = {
  documentTitle: "Commiters Case Study",
  kicker: "TECHNICAL CASE STUDY",
  title: "Commiters.com: Architectural Foundation.",
  subtitle:
    "Building a high-performance brand showcase from the ground up, optimized for technical precision and extreme minimalist aesthetics.",
  overview: {
    heading: "Project Overview",
    body: "The challenge was to engineer a digital identity that mirrors the precision of our codebase. We eschewed template-based solutions in favor of a custom-built React ecosystem. Every interaction, from page transitions to font rendering, was architected to provide a frictionless professional experience.",
    objective: {
      label: "OBJECTIVE",
      body: "Develop a zero-latency showcase that communicates technical authority through minimalist UI patterns.",
    },
    outcome: {
      label: "OUTCOME",
      body: 'A 100/100 Lighthouse score performance engine with a unique "Void-First" design philosophy.',
    },
  },
  coreStack: {
    heading: "CORE STACK",
    items: [
      { slug: "react", alt: "React", title: "React 18", subtitle: "Component-Driven Architecture" },
      { slug: "nextdotjs", alt: "Next.js", title: "Next.js", subtitle: "Server-Side Rendering & SEO" },
      { slug: "postgresql", alt: "PostgreSQL", title: "PostgreSQL", subtitle: "Structured Data Persistence" },
    ] satisfies CommitersCaseStudyStackItem[],
  },
  architecture: {
    heading: "Technical Architecture",
    sections: [
      {
        id: "frontend",
        title: "Frontend Engineering",
        body: "The UI is built using a strict atomic design methodology. Tailwind CSS powers the styling layer, ensuring a zero-runtime CSS footprint. Next.js App Router handles complex state management and partial hydration to maximize interactivity.",
      },
      {
        id: "infrastructure",
        title: "Infrastructure & Backend",
        body: "Data is managed through a normalized PostgreSQL schema, interfaced via a type-safe Prisma ORM. The entire ecosystem is deployed on edge nodes to minimize TTFB (Time to First Byte) across all global regions.",
      },
      {
        id: "seo",
        title: "SEO & Performance",
        body: "Dynamic OG images, semantic HTML5 structure, and automatic image optimization through the Next.js Image component ensure maximum visibility and accessibility.",
      },
    ],
  },
  features: [
    {
      id: "performance",
      title: "High Performance",
      body: "Sub-second page loads and optimized Core Web Vitals for superior user retention.",
      icon: "performance",
    },
    {
      id: "seo",
      title: "SEO Optimization",
      body: "Automated metadata generation and server-side rendering for perfect indexability.",
      icon: "seo",
    },
    {
      id: "minimalist",
      title: "Minimalist UI",
      body: "Focus-driven layout utilizing the 'Void' principle to reduce cognitive load.",
      icon: "minimalist",
    },
  ] satisfies CommitersCaseStudyHighlight[],
  bottomCta: {
    title: "Ready to build your next breakthrough?",
    subtext: "Our engineering team is ready to translate your vision into a high-performance digital reality.",
    primaryLabel: "Schedule a Call",
    primaryHref: buildDiscoveryCallCalendarUrl(),
    secondaryLabel: "View Our Work",
    secondaryTo: ROUTES.caseStudies,
  },
} as const;
