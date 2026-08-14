import type { TechLogoDef } from "./homeTechStack";
import { ROUTES } from "./routes";

export const BROWSE_MY_VACATION_LIVE_URL = "https://browsemyvacations.com/" as const;

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

export type BrowseMyVacationCaseStudyMetadataItem = {
  label: string;
  value: string;
  href?: string;
};

/** Case study copy for the BrowseMyVacation travel platform (reuses NextSaas page layout). */
export const BROWSE_MY_VACATION_CASE_STUDY_COPY = {
  documentTitle: "BrowseMyVacation Case Study",
  kicker: "CASE STUDY — TRAVEL PLATFORM",
  title: "BrowseMyVacation — Curated Rajasthan Vacations.",
  description:
    "Vacations you'll love, memories you'll keep. A Next.js travel platform where travelers explore curated Rajasthan packages by city—no dates required—with transparent pricing and Customise & Quote flows.",
  metadata: {
    timeline: { label: "TIMELINE", value: "8 Weeks to Production" },
    coreStack: { label: "CORE STACK", value: "React, Next.js, Node.js, PostgreSQL" },
    client: { label: "CLIENT", value: "Rahul Kumawat · BrowseMyVacation" },
    liveSite: {
      label: "LIVE SITE",
      value: "browsemyvacations.com",
      href: BROWSE_MY_VACATION_LIVE_URL,
    },
  },
  introHeroImage: {
    src: "/assets/case-studies/browse-my-vacation-intro-hero.png",
    srcSet:
      "/assets/case-studies/browse-my-vacation-intro-hero.png 1x, /assets/case-studies/browse-my-vacation-intro-hero@2x.png 2x",
    sizes: "(min-width: 960px) 560px, 100vw",
    alt: "Browse My Vacations curated Rajasthan package listings with city search and transparent pricing",
  },
  scope: {
    heading: "Product scope",
    description:
      "Full-stack delivery for a production travel marketplace—city discovery, curated packages, custom quotes, and founder-ready admin tooling.",
    items: [
      "City-based package discovery",
      "Customise & Quote journeys",
      "Vacation Meter, MICE & admin",
    ] as const,
  },
  pipelines: {
    heading: "Built for Rajasthan travelers",
    subheading:
      "Curated experiences, no dates needed, best-price transparency, and 24/7 travel support—wrapped in a fast Next.js experience on mobile and desktop.",
  },
  outcomes: {
    heading: "What we delivered",
    description:
      "Founder Rahul Kumawat needed more than a brochure site—customers had to discover Udaipur, Jaipur, and Jaisalmer packages, request custom quotes, and trust the brand. These were the outcomes we shipped together.",
    items: [
      {
        id: "launch",
        label: "GO-LIVE",
        value: "Production-ready",
        body: "Live at browsemyvacations.com with curated package grids, city search, Customise & Quote, Vacation Meter, and MICE pages—not a staging demo.",
      },
      {
        id: "discovery",
        label: "DISCOVERY",
        value: "City-first search",
        body: "Travelers browse Rajasthan packages by destination with transparent starting prices, rich photography, and clear View Details paths—no forced date pickers.",
      },
      {
        id: "partnership",
        label: "DELIVERY",
        value: "Founder-led loops",
        body: "Weekly releases, direct feedback with Rahul, and fast turnarounds from discovery workshops through launch and post-go-live refinements.",
      },
    ] satisfies BrowseMyVacationCaseStudyOutcome[],
  },
  techStack: {
    heading: "The Tech Stack",
    description:
      "We chose a modern web stack for SEO-friendly destination pages, scalable package content, and quick iteration with the founder as the catalog grew.",
    items: [
      {
        id: "frontend",
        label: "FRONTEND",
        title: "React & Next.js",
        body: "Server-rendered travel pages, reusable package cards, city search, and image optimization for destination photography across Rajasthan.",
        slug: "nextdotjs",
      },
      {
        id: "backend",
        label: "BACKEND",
        title: "Node.js APIs",
        body: "REST services for packages, quote requests, and content—with validation and structured error handling for enquiry and customisation flows.",
        slug: "nodedotjs",
      },
      {
        id: "database",
        label: "DATA LAYER",
        title: "PostgreSQL",
        body: "Normalized schemas for destinations, itineraries, pricing tiers, and enquiries so curated content and lead data stay consistent at scale.",
        slug: "postgresql",
      },
      {
        id: "delivery",
        label: "DEPLOYMENT",
        title: "Vercel Edge",
        body: "Edge delivery for marketing and search pages, CI/CD for weekly founder reviews, and monitoring on critical discovery paths.",
        slug: "vercel",
      },
    ] satisfies BrowseMyVacationCaseStudyStackItem[],
  },
  coreStackLogos: {
    heading: "Core technologies",
    items: [
      { slug: "react", alt: "React", title: "React 18", subtitle: "Search, listings & quote UI" },
      { slug: "nextdotjs", alt: "Next.js", title: "Next.js", subtitle: "SSR, routing & travel SEO" },
      { slug: "nodedotjs", alt: "Node.js", title: "Node.js", subtitle: "Packages & enquiry APIs" },
      { slug: "postgresql", alt: "PostgreSQL", title: "PostgreSQL", subtitle: "Destinations & leads" },
    ] satisfies (TechLogoDef & { title: string; subtitle: string })[],
  },
  capabilities: {
    items: [
      {
        id: "curated",
        label: "CURATED PACKAGES",
        body: "Destination grids with photography, starting prices, and clear View Details / Customise & Quote actions for every Rajasthan itinerary.",
        icon: "cross-platform",
      },
      {
        id: "trust",
        label: "TRUST & SUPPORT",
        body: "Best Price Guarantee, flexible customisation, and 24/7 travel support messaging so travelers feel confident before they enquire.",
        icon: "regression",
      },
      {
        id: "performance",
        label: "PERFORMANCE",
        body: "Optimized loads and Next.js rendering so city search and package browsing stay smooth on real mobile networks.",
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
        body: "Mapped city-first discovery, package taxonomy, quote funnels, and a minimalist interface system before writing production code.",
      },
      {
        id: "launch",
        number: "02",
        title: "Launch & iterate",
        body: "Shipped core discovery and enquiry paths, then refined Vacation Meter, MICE, pricing transparency, and reliability with founder feedback.",
      },
      {
        id: "engineering",
        number: "03",
        title: "Production engineering",
        body: "React/Next.js frontend, Node.js services, and PostgreSQL persistence—deployed with monitoring so search and quote flows stay fast under real traffic.",
      },
    ] satisfies BrowseMyVacationCaseStudyInfrastructureStep[],
  },
  visualBreak: {
    image: {
      src: "/assets/case-studies/browse-my-vacation.png",
      srcSet: "/assets/case-studies/browse-my-vacation@2x.png 2x",
      alt: "Udaipur Lake Palace hero imagery from the Browse My Vacations live travel platform",
    },
    badgeLabel: "FOUNDER",
    badgeValue: "Rahul Kumawat",
  },
  bottomCta: {
    title: "Building a travel or marketplace product?",
    description:
      "BrowseMyVacation shows how Commiters partners with founders to ship fast, reliable web platforms—with the same precision we bring to every engagement.",
    primaryLabel: "View our work",
    primaryTo: ROUTES.caseStudies,
    secondaryLabel: "Visit live site",
    secondaryHref: BROWSE_MY_VACATION_LIVE_URL,
    secondaryExternal: true,
    tertiaryLabel: "Start a project",
    tertiaryTo: ROUTES.contact,
  },
} as const;
