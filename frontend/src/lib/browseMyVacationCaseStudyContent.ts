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

/** Case study copy for the BrowseMyVacation travel platform (reuses NextSaas page layout). */
export const BROWSE_MY_VACATION_CASE_STUDY_COPY = {
  documentTitle: "BrowseMyVacation Case Study",
  kicker: "CASE STUDY — TRAVEL PLATFORM",
  title: "BrowseMyVacation Web Platform.",
  description:
    "A fast, reliable travel platform that turns founder vision into a production-ready web application customers love to use.",
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
