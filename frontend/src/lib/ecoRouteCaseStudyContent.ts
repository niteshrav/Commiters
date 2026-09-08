import { ROUTES } from "./routes";
import type { TechnicalCaseStudyCopy } from "./technicalCaseStudy";

export const ECO_ROUTE_CASE_STUDY_COPY = {
  documentTitle: "EcoRoute Intelligence Case Study",
  pageId: "ecoroute",
  kicker: "TECHNICAL CASE STUDY: SPEC-DRIVEN CLOUD PLATFORM",
  title: "EcoRoute Intelligence — Cloud-Native Green Fleet & Route Optimization",
  subtitle:
    "Spec-driven geo-spatial optimization platform designed for low-emission logistics tracking, real-time telemetry processing, and fleet analytics.",
  heroImage: {
    src: "/assets/case-studies/ecoroute-intelligence.png",
    alt: "EcoRoute Intelligence fleet routing and emissions analytics dashboard",
  },
  overview: {
    heading: "Core Metrics",
    body: "Static route plans ignore live traffic and emissions, inflating cost and carbon. EcoRoute Intelligence combines PostGIS spatial indexing, session-scoped RLS, and a micro-optimized dashboard so fleet managers, drivers, and enterprise clients see only authorized telemetry.",
  },
  metrics: [
    { id: "emissions", label: "Emissions Reduction", value: "24% Average Fuel & CO2 Savings" },
    { id: "latency", label: "Query Latency", value: "<100ms Telemetry Response" },
    { id: "uptime", label: "System Uptime", value: "99.99% Cloud SLA" },
  ],
  coreStack: {
    heading: "CORE STACK",
    items: [
      { slug: "react", alt: "React", title: "React 18", subtitle: "Atomic dashboard UI" },
      { slug: "vitedotjs", alt: "Vite", title: "Vite", subtitle: "Zero-latency tooling" },
      { slug: "nodedotjs", alt: "Node.js", title: "Node.js / Express", subtitle: "Telemetry APIs" },
      { slug: "postgresql", alt: "PostgreSQL", title: "PostgreSQL / PostGIS", subtitle: "Spatial RLS store" },
      { slug: "tailwindcss", alt: "Tailwind CSS", title: "Tailwind CSS", subtitle: "Zero-runtime CSS" },
    ],
  },
  architecture: {
    heading: "Technical Architecture",
    sections: [
      {
        id: "geo",
        title: "High-Performance Geo-Spatial Engine",
        body: "Integrated PostGIS spatial indexing and custom routing algorithms to calculate optimal paths based on vehicle payload, terrain, and real-time congestion data.",
      },
      {
        id: "rls",
        title: "Multi-Tenant Role-Based Access (RLS)",
        body: "Session-scoped authentication ensuring fleet managers, drivers, and enterprise clients access strictly isolated telemetry data via Row-Level Security (RLS).",
      },
      {
        id: "ui",
        title: "Micro-Optimized Dashboard UI",
        body: "Built on Vite and React with atomic component architecture to render live map overlays and telemetry metrics at 60fps without browser lag.",
      },
    ],
  },
  features: [
    {
      id: "routing",
      title: "Adaptive Geo-Routing",
      body: "PostGIS indexes and live congestion signals keep route computation under 100ms.",
      icon: "performance",
    },
    {
      id: "rls",
      title: "Session-Gated RLS",
      body: "Row-Level Security isolates telemetry for managers, drivers, and enterprise tenants.",
      icon: "seo",
    },
    {
      id: "dashboard",
      title: "60fps Fleet Overlay",
      body: "Atomic React surfaces stream map overlays without ambient data access or UI lag.",
      icon: "minimalist",
    },
  ],
  bottomCta: {
    title: "Need a spec-driven operations platform?",
    subtext: "We engineer cloud-native logistics systems with RLS, live telemetry, and governed access paths.",
    primaryLabel: "Build Your Cloud Platform",
    primaryTo: ROUTES.webApplications,
    primaryVariant: "gold-blue",
    secondaryLabel: "View All Work",
    secondaryTo: ROUTES.caseStudies,
  },
} as const satisfies TechnicalCaseStudyCopy;
