import type { TechLogoDef } from "./homeTechStack";
import { HOME_HERO_OPS_FLOW_HREF } from "./homePageContent";
import { ROUTES } from "./routes";

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
  kicker: "TECHNICAL CASE STUDY: SPEC-DRIVEN CLOUD PLATFORM",
  title: "Commiters.com: Spec-Driven Cloud Platform Architecture",
  subtitle:
    "Engineered a zero-latency cloud web ecosystem featuring rigid component isolation, micro-optimized performance, and strict design system adherence.",
  overview: {
    heading: "Project Overview",
    body: "The challenge was to engineer a spec-driven cloud web platform that mirrors Commiters governance standards. We eschewed template-based solutions in favor of a custom-built React ecosystem with rigid component isolation, type-safe persistence, and zero ambient authority across every surface.",
    objective: {
      label: "OBJECTIVE",
      body: "Develop a zero-latency showcase that communicates technical authority through spec-driven UI patterns and governed delivery.",
    },
    outcome: {
      label: "OUTCOME",
      body: "A 100/100 Lighthouse score performance engine with <150ms TTFB and a unique \"Void-First\" design philosophy.",
    },
  },
  coreStack: {
    heading: "CORE STACK",
    items: [
      { slug: "react", alt: "React", title: "React 18", subtitle: "Atomic Component Architecture" },
      { slug: "nextdotjs", alt: "Next.js", title: "Vite / Next.js", subtitle: "Edge Delivery & SEO" },
      { slug: "postgresql", alt: "PostgreSQL", title: "PostgreSQL with RLS", subtitle: "Type-Safe Persistence" },
      { slug: "tailwindcss", alt: "Tailwind CSS", title: "Tailwind CSS", subtitle: "Zero-Runtime Design System" },
    ] satisfies CommitersCaseStudyStackItem[],
  },
  architecture: {
    heading: "Technical Architecture",
    sections: [
      {
        id: "frontend",
        title: "Frontend Engineering",
        body: "Atomic component design, zero-runtime CSS footprint, and micro-optimized asset delivery. Tailwind CSS powers the styling layer while Vite and Next.js handle hydration and isolated component boundaries.",
      },
      {
        id: "infrastructure",
        title: "Cloud Architecture",
        body: "Normalized schema with a type-safe persistence layer deployed across edge nodes for <150ms TTFB. PostgreSQL Row-Level Security (RLS) keeps every query scoped to authorized context.",
      },
      {
        id: "seo",
        title: "Security & Governance",
        body: "Fully compliant with Commiters Governance Standards, featuring zero ambient authority and automated audit trails across CI/CD guardrails and spec-driven releases.",
      },
    ],
  },
  features: [
    {
      id: "performance",
      title: "High Performance",
      body: "Sub-second page loads, <150ms TTFB, and optimized Core Web Vitals for superior user retention.",
      icon: "performance",
    },
    {
      id: "seo",
      title: "Spec-Driven Delivery",
      body: "Structured schemas, automated metadata, and server-side rendering for perfect indexability.",
      icon: "seo",
    },
    {
      id: "minimalist",
      title: "Governed Surfaces",
      body: "Focus-driven layout with zero ambient authority and a design system that reduces cognitive load.",
      icon: "minimalist",
    },
  ] satisfies CommitersCaseStudyHighlight[],
  bottomCta: {
    title: "Ready to build your next breakthrough?",
    subtext: "Book a 2-week AI Operational Audit to map bottlenecks and leave with a spec-driven architecture blueprint.",
    primaryLabel: "Book 2-Week AI Operational Audit",
    primaryTo: ROUTES.aiOperationalAudit,
    secondaryLabel: "Explore AI Products",
    secondaryTo: HOME_HERO_OPS_FLOW_HREF,
  },
} as const;
