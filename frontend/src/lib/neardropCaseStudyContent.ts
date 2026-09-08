import type { TechLogoDef } from "./homeTechStack";
import { ROUTES } from "./routes";

export type NearDropCaseStudyFeature = {
  id: string;
  title: string;
  body: string;
  icon: "shield" | "tracking" | "schema" | "coordination";
  iconTone: "blue" | "gold" | "highlight";
  highlight?: boolean;
};

export type NearDropCaseStudyExecutionItem = {
  id: string;
  number: string;
  title: string;
  body: string;
};

export type NearDropCaseStudyStackItem = TechLogoDef & {
  role: string;
  label: string;
  icon: "terminal" | "database" | "code" | "sync";
};

export const NEARDROP_CASE_STUDY_COPY = {
  documentTitle: "NearDrop MVP Case Study",
  kicker: "CASE STUDY: CLOUD LOGISTICS PLATFORM",
  titleLead: "NearDrop: ",
  titleAccent: "Field Operations",
  titleTrail: "& Real-Time Coordination System",
  description:
    "Cloud-native operational portal engineered for seamless merchant-driver coordination and real-time field tracking.",
  introStack: {
    items: [
      {
        slug: "nextdotjs",
        alt: "Next.js",
        role: "FRONTEND",
        label: "React / Next.js",
        icon: "terminal",
      },
      {
        slug: "nodedotjs",
        alt: "Node.js",
        role: "BACKEND",
        label: "Node.js",
        icon: "code",
      },
      {
        slug: "postgresql",
        alt: "PostgreSQL",
        role: "DATABASE",
        label: "PostgreSQL",
        icon: "database",
      },
      {
        slug: "websockets",
        alt: "WebSockets",
        role: "REALTIME",
        label: "WebSockets",
        icon: "sync",
      },
    ] satisfies NearDropCaseStudyStackItem[],
  },
  functionalExcellence: {
    heading: "Functional Excellence",
    description: "Strategic features designed for operational scalability, role isolation, and real-time field visibility.",
    countLabel: "FEATURES [04]",
    items: [
      {
        id: "rbac",
        title: "Role-Isolated Portals",
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
        iconTone: "blue",
      },
      {
        id: "coordination",
        title: "Driver-Merchant Coordination",
        body: "Automated matching algorithms that connect local vendors with available delivery affiliates in real-time, reducing latency in the last-mile delivery chain.",
        icon: "coordination",
        iconTone: "highlight",
        highlight: true,
      },
    ] satisfies NearDropCaseStudyFeature[],
  },
  execution: {
    kicker: "PROCESS",
    heading: "The Precision Execution.",
    description: "How we translated complex logistics requirements into a performant cloud-native ecosystem.",
    items: [
      {
        id: "architectural",
        number: "01",
        title: "Architectural Integrity",
        body: "Normalized schema capable of high-concurrency real-time location writes without compromising system stability.",
      },
      {
        id: "precision",
        number: "02",
        title: "Dedicated Portal Surfaces",
        body: "Multi-tenant dashboards for Vendors, Drivers, and Customers, keeping each workflow isolated with spec-driven access paths.",
      },
      {
        id: "security",
        number: "03",
        title: "Security First",
        body: "JWT session scoping and multi-factor authentication for field data protection between the merchant and the delivery partner.",
      },
    ] satisfies NearDropCaseStudyExecutionItem[],
  },
  bottomCta: {
    title: "Need a cloud operations platform?",
    subtext:
      "We specialize in high-performance cloud-native systems for modern field operations. Let's discuss your next platform.",
    primaryLabel: "Discuss Your Cloud Platform",
    primaryTo: ROUTES.contact,
    secondaryLabel: "View Portfolio",
    secondaryTo: ROUTES.caseStudies,
  },
} as const;
