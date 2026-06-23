import type { TechLogoDef } from "./homeTechStack";
import { ROUTES } from "./routes";
import { buildDiscoveryCallCalendarUrl } from "./siteContact";

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
  icon: "terminal" | "database" | "code";
};

export const NEARDROP_CASE_STUDY_COPY = {
  documentTitle: "NearDrop MVP Case Study",
  kicker: "CASE STUDY: LOGISTICS BRAND ARCHITECTURE",
  titleLead: "NearDrop ",
  titleAccent: "Logistics",
  titleTrail: "MVP.",
  description:
    "A high-fidelity three-role logistics system engineered for seamless merchant-driver coordination and enterprise-grade real-time delivery tracking.",
  introStack: {
    items: [
      {
        slug: "nextdotjs",
        alt: "Next.js",
        role: "ARCHITECTURE",
        label: "Next.js",
        icon: "terminal",
      },
      {
        slug: "postgresql",
        alt: "PostgreSQL",
        role: "DATABASE",
        label: "PostgreSQL",
        icon: "database",
      },
      {
        slug: "nodedotjs",
        alt: "Node.js",
        role: "BACKEND",
        label: "Node.js",
        icon: "code",
      },
    ] satisfies NearDropCaseStudyStackItem[],
  },
  functionalExcellence: {
    heading: "Functional Excellence",
    description: "Strategic features designed for operational scalability and user efficiency.",
    countLabel: "FEATURES [04]",
    items: [
      {
        id: "rbac",
        title: "Role-Based Access Control",
        body: "Sophisticated permission architecture ensuring secure, isolated workflows for Affiliates, Vendors, and Customers. Each portal is tuned for specific operational needs.",
        icon: "shield",
        iconTone: "blue",
      },
      {
        id: "tracking",
        title: "Real-time Tracking",
        body: "Sub-second latency updates for live logistics monitoring.",
        icon: "tracking",
        iconTone: "gold",
      },
      {
        id: "schema",
        title: "Normalized Schema",
        body: "A data structure built for massive scale and complex relationship queries.",
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
    description: "How we translated complex logistics requirements into a performant digital ecosystem.",
    items: [
      {
        id: "architectural",
        number: "01",
        title: "Architectural Integrity",
        body: "We prioritized a PostgreSQL schema that could handle high-concurrency writes for real-time location updates without compromising system stability.",
      },
      {
        id: "precision",
        number: "02",
        title: "Precision Engineering",
        body: "Utilizing Next.js for its robust routing and server-side rendering capabilities, we ensured that the Vendor dashboard remains performant even with hundreds of active deliveries.",
      },
      {
        id: "security",
        number: "03",
        title: "Security First",
        body: "Multi-factor authentication and strict JWT handling ensure that sensitive logistics data remains private between the merchant and the delivery partner.",
      },
    ] satisfies NearDropCaseStudyExecutionItem[],
  },
  bottomCta: {
    title: "Need Enterprise-Grade Software Engineering?",
    subtext:
      "We specialize in high-performance systems for modern businesses. Let's discuss your next project.",
    primaryLabel: "Book a Consultation",
    primaryHref: buildDiscoveryCallCalendarUrl(),
    secondaryLabel: "View Portfolio",
    secondaryTo: ROUTES.caseStudies,
  },
} as const;
