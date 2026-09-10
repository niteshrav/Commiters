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
  kicker: "TECHNICAL CASE STUDY",
  title: "Commiters.com — Spec-Driven Cloud Platform",
  subtitle:
    "A zero-latency cloud web platform built with strict component isolation and optimized performance.",
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
    kicker: "TECHNICAL ARCHITECTURE",
    heading: "Technical Architecture",
    sections: [
      {
        id: "frontend",
        title: "Frontend Engineering",
        body: "Atomic components with Tailwind CSS, powered by Vite and Next.js.",
      },
      {
        id: "infrastructure",
        title: "Cloud Architecture",
        body: "Type-safe persistence with PostgreSQL (RLS) on edge nodes.",
      },
      {
        id: "seo",
        title: "Security & Governance",
        body: "Compliant with Commiters standards, with zero ambient authority.",
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
    primaryLabel: "Book Operational Audit",
    primaryTo: ROUTES.aiOperationalAudit,
    secondaryLabel: "Try OpsFlow AI",
    secondaryTo: HOME_HERO_OPS_FLOW_HREF,
  },
} as const;
