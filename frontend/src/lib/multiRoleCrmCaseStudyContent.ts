import type { TechLogoDef } from "./homeTechStack";
import { ROUTES } from "./routes";

export type MultiRoleCrmCaseStudyStackItem = TechLogoDef & {
  role: string;
  icon: "code" | "database" | "cloud" | "ai";
  layout: "wide" | "compact";
  highlight?: boolean;
};

export type MultiRoleCrmCaseStudyFeature = {
  id: string;
  title: string;
  body: string;
  icon: "rbac" | "rag" | "sync" | "analytics";
  iconTone: "blue" | "gold" | "purple" | "green";
};

export type MultiRoleCrmImpactItem = {
  id: string;
  label: string;
  icon: "lock" | "clock" | "spark" | "users";
};

export type MultiRoleCrmArchitectureIndicator = {
  id: string;
  label: string;
  icon: "shield" | "gauge";
};

export const MULTI_ROLE_CRM_CASE_STUDY_COPY = {
  documentTitle: "Multi-Role CRM Case Study",
  kicker: "CASE STUDY: ENTERPRISE AI",
  titleLead: "AI-Powered",
  titleAccent: "Multi-Role CRM",
  subheadline: "Intelligent Operations with RAG & LLMs.",
  breadcrumb: {
    parent: "CASE STUDIES",
    parentTo: ROUTES.caseStudies,
    current: "MULTI-ROLE CRM",
  },
  heroImage: {
    src: "/assets/case-studies/multi-role-crm-hero.png",
    srcSet: "/assets/case-studies/multi-role-crm-hero@2x.png 2x",
    alt: "Professional 3D render of a CRM dashboard interface on a tablet device",
  },
  vision: {
    heading: "The Vision",
    body: "A policy-gated, multi-role CRM powered by LLM and RAG, with Row-Level Security (RLS) for secure, intelligent customer interactions.",
    challenge: {
      label: "Challenge",
      text: "Fragmented data and slow support queries.",
    },
    solution: {
      label: "Solution",
      text: "RAG-powered answers with RLS and policy gateways.",
    },
  },
  techStack: {
    heading: "TECH STACK",
    caption: "FRONTEND + BACKEND + AI",
    items: [
      { slug: "react", alt: "React", role: "Frontend", icon: "code", layout: "wide" },
      { slug: "postgresql", alt: "PostgreSQL (RLS)", role: "Storage", icon: "database", layout: "compact" },
      { slug: "nodedotjs", alt: "Node.js", role: "Runtime", icon: "cloud", layout: "compact" },
      {
        slug: "openai",
        alt: "MCP Sockets",
        role: "Generative AI",
        icon: "ai",
        layout: "wide",
        highlight: true,
      },
    ] satisfies MultiRoleCrmCaseStudyStackItem[],
  },
  architecture: {
    heading: "Architectural Excellence",
    description: "Modular, scalable, and secure. Designed for enterprise environments with zero ambient authority.",
    indicators: [
      { id: "security", label: "Enterprise Security", icon: "shield" },
      { id: "scale", label: "Cloud-Native Scale", icon: "gauge" },
    ] satisfies MultiRoleCrmArchitectureIndicator[],
    features: [
      {
        id: "rbac",
        title: "Multi-Role RBAC & RLS",
        body: "Session-scoped permissions enforcing Row-Level Security at the database tier for Admins, Managers, and Field Agents.",
        icon: "rbac",
        iconTone: "blue",
      },
      {
        id: "rag",
        title: "Policy-Gated RAG Engine",
        body: "Grounded AI queries restricted strictly to authorized user context through two-tier API policy gateways.",
        icon: "rag",
        iconTone: "gold",
      },
      {
        id: "sync",
        title: "Real-Time WebSockets",
        body: "Zero-latency sync across Admin, Manager, and Field Agent dashboards with JIT permission scoping.",
        icon: "sync",
        iconTone: "purple",
      },
      {
        id: "analytics",
        title: "Smart Analytics",
        body: "Automated reporting on user sentiment and query frequency to optimize support flows without ambient data access.",
        icon: "analytics",
        iconTone: "green",
      },
    ] satisfies MultiRoleCrmCaseStudyFeature[],
  },
  impact: {
    heading: "Delivered Impact",
    body: "Governed access, live updates, and role-aware AI across every CRM surface.",
    items: [
      { id: "access", label: "Secure Access", icon: "lock" },
      { id: "realtime", label: "Real-Time", icon: "clock" },
      { id: "ai", label: "AI-Powered", icon: "spark" },
      { id: "roles", label: "Role-Based", icon: "users" },
    ] satisfies MultiRoleCrmImpactItem[],
  },
  bottomCta: {
    kicker: "MULTI-ROLE CRM",
    title: "Smarter Support. Stronger Security.",
    subtext: "Empowering teams with AI-driven insights and governed access.",
    primaryLabel: "View Full Case Study",
    primaryTo: ROUTES.webApplications,
  },
} as const;
