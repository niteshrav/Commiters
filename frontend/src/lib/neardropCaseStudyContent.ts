import type { TechLogoDef } from "./homeTechStack";
import { ROUTES } from "./routes";
import { SITE_GITHUB_URL } from "./siteLinks";

export type NearDropCaseStudyFeature = {
  id: string;
  title: string;
  body: string;
  icon: "shield" | "tracking" | "schema" | "coordination";
  iconTone: "blue" | "gold" | "green" | "purple";
};

export type NearDropCaseStudyExecutionItem = {
  id: string;
  number: string;
  title: string;
  body: string;
  icon: "lock" | "database" | "gear";
};

export type NearDropCaseStudyArchitectureItem = {
  id: string;
  title: string;
  body: string;
  icon: "frontend" | "backend" | "storage" | "sync";
};

export const NEARDROP_CASE_STUDY_COPY = {
  documentTitle: "NearDrop MVP Case Study",
  kicker: "CASE STUDY",
  titleLead: "NearDrop ",
  titleAccent: "Field Operations",
  titleTrail: " & Real-Time Coordination",
  description: "Real-time coordination for modern field teams.",
  heroImage: {
    src: "/assets/case-studies/neardrop-hero-devices.png",
    alt: "Laptop and phone mockups showing the NearDrop field operations dashboard and live delivery map",
  },
  heroActions: {
    primaryLabel: "View Project",
    primaryTo: ROUTES.contact,
    sourceLabel: "Source Code",
    sourceHref: SITE_GITHUB_URL,
  },
  introStack: {
    items: [
      { slug: "react", alt: "React" },
      { slug: "nodedotjs", alt: "Node.js" },
      { slug: "postgresql", alt: "PostgreSQL" },
      { slug: "socketdotio", alt: "WebSockets" },
    ] satisfies TechLogoDef[],
  },
  architecture: {
    kicker: "TECHNICAL ARCHITECTURE",
    heading: "Engineering for Scalability",
    description:
      "A robust, cloud-native architecture designed to handle high-frequency data exchanges and concurrent user sessions.",
    items: [
      {
        id: "frontend",
        title: "Modern Frontend",
        body: "React-based UI for high performance and responsiveness.",
        icon: "frontend",
      },
      {
        id: "backend",
        title: "Scalable Backend",
        body: "Node.js microservices for efficient request handling.",
        icon: "backend",
      },
      {
        id: "storage",
        title: "Reliable Storage",
        body: "PostgreSQL for robust data integrity and complex queries.",
        icon: "storage",
      },
      {
        id: "sync",
        title: "Real-time Sync",
        body: "WebSockets for instant updates across the ecosystem.",
        icon: "sync",
      },
    ] satisfies NearDropCaseStudyArchitectureItem[],
  },
  functionalExcellence: {
    heading: "KEY FEATURES",
    description: "Strategic features designed for operational scalability, role isolation, and real-time field visibility.",
    countLabel: "FEATURES [04]",
    items: [
      {
        id: "rbac",
        title: "Role-based Access",
        body: "Multi-tenant dashboards for Vendors, Drivers, and Customers. Each portal is tuned for specific operational needs with session-scoped permissions.",
        icon: "shield",
        iconTone: "blue",
      },
      {
        id: "tracking",
        title: "Real-time Tracking",
        body: "Sub-second WebSocket updates for live logistics monitoring and geo-fenced field verification.",
        icon: "tracking",
        iconTone: "gold",
      },
      {
        id: "schema",
        title: "Normalized Schema",
        body: "A PostgreSQL structure built for high-concurrency real-time location writes and complex relationship queries.",
        icon: "schema",
        iconTone: "green",
      },
      {
        id: "coordination",
        title: "Driver-Merchant Coordination",
        body: "Automated matching algorithms that connect local vendors with available delivery affiliates in real-time, reducing latency in the last-mile delivery chain.",
        icon: "coordination",
        iconTone: "purple",
      },
    ] satisfies NearDropCaseStudyFeature[],
  },
  execution: {
    kicker: "PROCESS",
    heading: "Built for Impact",
    description: "Secure, scalable, and reliable field operations.",
    items: [
      {
        id: "architectural",
        number: "01",
        title: "Secure Access",
        body: "Controlled and safe system usage.",
        icon: "lock",
      },
      {
        id: "precision",
        number: "02",
        title: "Scalable Data",
        body: "Structured for growth.",
        icon: "database",
      },
      {
        id: "security",
        number: "03",
        title: "Reliable Operations",
        body: "Consistent and efficient performance.",
        icon: "gear",
      },
    ] satisfies NearDropCaseStudyExecutionItem[],
  },
  bottomCta: {
    kicker: "LET'S WORK TOGETHER",
    title: "Let's Build What's Next",
    subtext: "Better systems for better field operations.",
    primaryLabel: "Discuss Your Project",
    primaryTo: ROUTES.contact,
    secondaryLabel: "View Portfolio",
    secondaryTo: ROUTES.caseStudies,
  },
} as const;
