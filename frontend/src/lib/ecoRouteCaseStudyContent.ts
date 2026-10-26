import { ROUTES } from "./routes";
import type { TechnicalCaseStudyCopy } from "./technicalCaseStudy";

export const ECO_ROUTE_CASE_STUDY_COPY = {
  documentTitle: "EcoRoute Intelligence Case Study",
  pageId: "ecoroute",
  kicker: "TECHNICAL CASE STUDY: AI DECISION INTELLIGENCE",
  title: "EcoRoute Intelligence — AI Transportation Decision Platform",
  subtitle:
    "A multi-agent system built with Google ADK and Gemini 2.5 Flash that turns transportation datasets into congestion, emissions, and policy insights.",
  heroImage: {
    src: "/assets/case-studies/work-ecoroute.png",
    alt: "EcoRoute Intelligence city mobility map with optimized green routes",
  },
  overview: {
    heading: "Core Metrics",
    body: "Communities collect large volumes of mobility data, but planners still struggle to convert it into action. EcoRoute Intelligence uses specialized AI agents to analyze route performance, flag congestion bottlenecks, estimate CO2 impact, and produce recommendations for transportation and sustainability teams.",
  },
  metrics: [
    { id: "routes", label: "Routes Analyzed", value: "15 Sample Traffic Routes" },
    { id: "critical", label: "Critical Congestion Routes", value: "6 High-Risk Corridors" },
    { id: "emissions", label: "Peak CO2 Emissions", value: "740 kg/hour on ROUTE_9" },
  ],
  coreStack: {
    heading: "CORE STACK",
    items: [
      { slug: "python", alt: "Python", title: "Python", subtitle: "Agent runtime" },
      { slug: "google", alt: "Google ADK", title: "Google ADK", subtitle: "Multi-agent orchestration" },
      { slug: "google", alt: "Gemini", title: "Gemini 2.5 Flash", subtitle: "Language model" },
      { slug: "pandas", alt: "Pandas", title: "Pandas", subtitle: "Dataset analysis" },
      { slug: "matplotlib", alt: "Matplotlib", title: "Matplotlib", subtitle: "Traffic dashboards" },
    ],
  },
  architecture: {
    heading: "Technical Architecture",
    sections: [
      {
        id: "geo",
        title: "Transit Analyst Agent",
        body: "Analyzes the urban traffic dataset, detects congestion hotspots, evaluates route performance, and calculates mobility and emissions indicators.",
      },
      {
        id: "rls",
        title: "Policy Director Agent",
        body: "Reviews analytical findings, generates short-term interventions and longer-term infrastructure recommendations, and prioritizes critical routes.",
      },
      {
        id: "ui",
        title: "Root Coordinator Agent",
        body: "Orchestrates agent collaboration, routes requests, aggregates outputs, and delivers final recommendations with congestion and emissions dashboards.",
      },
    ],
  },
  features: [
    {
      id: "routing",
      title: "Congestion Detection",
      body: "Scores routes on speed, vehicle density, and congestion so planners can see the highest-risk corridors first.",
      icon: "performance",
    },
    {
      id: "rls",
      title: "Policy Recommendations",
      body: "Turns analyst findings into short-term interventions and longer-term infrastructure actions.",
      icon: "seo",
    },
    {
      id: "dashboard",
      title: "Emissions Dashboards",
      body: "Compares CO2 by route, including the 740 kg/hour peak on ROUTE_9 at Highway Junction.",
      icon: "minimalist",
    },
  ],
  bottomCta: {
    title: "Need transportation decision intelligence?",
    subtext: "We build AI agent systems that turn mobility data into congestion, emissions, and planning insights.",
    primaryLabel: "Start an AI Project",
    primaryTo: ROUTES.contact,
    primaryVariant: "gold-blue",
    secondaryLabel: "View All Work",
    secondaryTo: ROUTES.caseStudies,
  },
} as const satisfies TechnicalCaseStudyCopy;
