import type { TechLogoDef } from "./homeTechStack";
import { ROUTES } from "./routes";

export type BrowseMyVacationCaseStudyCapability = {
  id: string;
  label: string;
  body: string;
  icon: "cross-platform" | "regression" | "benchmarking";
};

export type BrowseMyVacationCaseStudyInfrastructureStep = {
  id: string;
  number: string;
  title: string;
  body: string;
};

export type BrowseMyVacationCaseStudyStackItem = {
  id: string;
  label: string;
  title: string;
  body: string;
  slug?: string;
};

export type BrowseMyVacationCaseStudyOutcome = {
  id: string;
  label: string;
  value: string;
  body: string;
};

/** Case study copy for the BrowseMyVacation travel platform (reuses NextSaas page layout). */
export const BROWSE_MY_VACATION_CASE_STUDY_COPY = {
  documentTitle: "BrowseMyVacation Case Study",
  kicker: "CASE STUDY — TRAVEL PLATFORM",
  title: "BrowseMyVacation Web Platform.",
  description:
    "A fast, reliable travel platform that turns founder vision into a production-ready web application customers love to use.",
  metadata: {
    timeline: { label: "TIMELINE", value: "8 Weeks to Production" },
    coreStack: { label: "CORE STACK", value: "React, Next.js, Node.js, PostgreSQL" },
    client: { label: "CLIENT", value: "BrowseMyVacation · Travel" },
  },
  introHeroImage: {
    src: "/assets/case-studies/browse-my-vacation-intro-hero.png",
    srcSet:
      "/assets/case-studies/browse-my-vacation-intro-hero.png 1x, /assets/case-studies/browse-my-vacation-intro-hero.png 2x",
    alt: "Browse My Vacations homepage with city search and curated travel packages",
  },
  scope: {
    heading: "Product scope",
    description: "Full-stack delivery from discovery through launch, with a focus on booking flows and trust.",
    items: ["Travel discovery UX", "Booking & checkout", "Performance at scale"] as const,
  },
  pipelines: {
    heading: "Built for travelers",
    subheading: "Responsive UI, resilient APIs, and observability so every trip search feels instant.",
  },
  outcomes: {
    heading: "What we delivered",
    description:
      "Founder Rahul needed a platform customers could trust for discovery and booking—not a prototype. These were the outcomes we shipped together.",
    items: [
      {
        id: "launch",
        label: "GO-LIVE",
        value: "Production-ready",
        body: "Search, package listings, and booking paths live for real travelers—not a demo environment.",
      },
      {
        id: "performance",
        label: "PERFORMANCE",
        value: "Fast discovery",
        body: "Optimized page loads and API patterns so city search and package browsing stay smooth on mobile.",
      },
      {
        id: "partnership",
        label: "DELIVERY",
        value: "Founder-led loops",
        body: "Weekly releases, direct feedback with Rahul, and fast turnarounds through the build cycle.",
      },
    ] satisfies BrowseMyVacationCaseStudyOutcome[],
  },
  techStack: {
    heading: "The Tech Stack",
    description:
      "We chose a modern web stack for SEO-friendly travel pages, reliable booking APIs, and quick iteration with the founder.",
    items: [
      {
        id: "frontend",
        label: "FRONTEND",
        title: "React & Next.js",
        body: "Server-rendered travel pages, reusable UI for search and package cards, and image optimization for destination photography.",
        slug: "nextdotjs",
      },
      {
        id: "backend",
        label: "BACKEND",
        title: "Node.js APIs",
        body: "REST services for packages, availability, and checkout—with validation and structured error handling for booking flows.",
        slug: "nodedotjs",
      },
      {
        id: "database",
        label: "DATA LAYER",
        title: "PostgreSQL",
        body: "Normalized schemas for destinations, itineraries, and reservations so content and bookings stay consistent at scale.",
        slug: "postgresql",
      },
      {
        id: "delivery",
        label: "DEPLOYMENT",
        title: "Vercel Edge",
        body: "Edge delivery for marketing and search pages, CI/CD for weekly founder reviews, and monitoring on critical paths.",
        slug: "vercel",
      },
    ] satisfies BrowseMyVacationCaseStudyStackItem[],
  },
  coreStackLogos: {
    heading: "Core technologies",
    items: [
      { slug: "react", alt: "React", title: "React 18", subtitle: "Search, listings & booking UI" },
      { slug: "nextdotjs", alt: "Next.js", title: "Next.js", subtitle: "SSR, routing & travel SEO" },
      { slug: "nodedotjs", alt: "Node.js", title: "Node.js", subtitle: "Booking & content APIs" },
      { slug: "postgresql", alt: "PostgreSQL", title: "PostgreSQL", subtitle: "Packages & reservations" },
    ] satisfies (TechLogoDef & { title: string; subtitle: string })[],
  },
  capabilities: {
    items: [
      {
        id: "ux",
        label: "USER EXPERIENCE",
        body: "Clear navigation, search, and itinerary views tuned for leisure travelers and repeat bookings.",
        icon: "cross-platform",
      },
      {
        id: "reliability",
        label: "RELIABILITY",
        body: "Stable releases, proactive communication, and fast turnarounds through the build cycle.",
        icon: "regression",
      },
      {
        id: "performance",
        label: "PERFORMANCE",
        body: "Optimized loads and API patterns so discovery and checkout stay smooth on real devices.",
        icon: "benchmarking",
      },
    ] satisfies BrowseMyVacationCaseStudyCapability[],
  },
  infrastructure: {
    heading: "How we shipped it.",
    items: [
      {
        id: "foundation",
        number: "01",
        title: "Product foundation",
        body: "Aligned on user journeys, data models, and a minimalist interface system before writing production code.",
      },
      {
        id: "launch",
        number: "02",
        title: "Launch & iterate",
        body: "Shipped core booking paths, then refined search, content, and reliability with founder feedback loops.",
      },
      {
        id: "engineering",
        number: "03",
        title: "Production engineering",
        body: "React/Next.js frontend, Node.js services, and PostgreSQL persistence—deployed with monitoring so search and checkout stay fast under real traffic.",
      },
    ] satisfies BrowseMyVacationCaseStudyInfrastructureStep[],
  },
  visualBreak: {
    image: {
      src: "/assets/case-studies/browse-my-vacation.png",
      srcSet: "/assets/case-studies/browse-my-vacation@2x.png 2x",
      alt: "BrowseMyVacation product preview on desktop and mobile",
    },
    badgeLabel: "FOUNDER",
    badgeValue: "Rahul K.",
  },
  bottomCta: {
    title: "Building a travel or marketplace product?",
    description:
      "BrowseMyVacation shows how Commiters partners with founders to ship fast, reliable web platforms—with the same precision we bring to every engagement.",
    primaryLabel: "View our work",
    primaryTo: ROUTES.caseStudies,
    secondaryLabel: "Start a project",
    secondaryTo: ROUTES.contact,
  },
} as const;
