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
  iconTone: "blue" | "gold";
};

export type MultiRoleCrmArchitectureIndicator = {
  id: string;
  label: string;
  icon: "shield" | "gauge";
};

export const MULTI_ROLE_CRM_CASE_STUDY_COPY = {
  documentTitle: "Multi-Role CRM Case Study",
  kicker: "CASE STUDY: SPEC-DRIVEN B2B PLATFORM",
  titleLead: "Governed AI CRM &",
  titleAccent: "Multi-Role Operational Portal",
  subheadline: "Intelligent enterprise operations platform combining RAG-enhanced query engines with Row-Level Security (RLS).",
  heroImage: {
    src: "/assets/case-studies/multi-role-crm-hero.png",
    srcSet: "/assets/case-studies/multi-role-crm-hero@2x.png 2x",
    alt: "Professional 3D render of a CRM dashboard interface on a tablet device",
  },
  vision: {
    heading: "The Vision",
    body: "A spec-driven multi-role CRM featuring a policy-gated chatbot powered by LLM and RAG (Retrieval-Augmented Generation). Row-Level Security (RLS) and MCP sockets keep every query inside authorized user context—bridging static customer data and governed intelligent interaction.",
    challenge: {
      label: "Challenge",
      text: "Fragmented data access and slow manual query resolution for enterprise support teams without leaking unauthorized records.",
    },
    solution: {
      label: "Solution",
      text: "Centralized RAG-enhanced AI grounded in institutional knowledge, scoped by RLS and two-tier policy gateways.",
    },
  },
  techStack: {
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
    description: "Modular, scalable, and secure. Designed for high-density enterprise environments with zero ambient authority.",
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
        iconTone: "blue",
      },
      {
        id: "analytics",
        title: "Smart Analytics",
        body: "Automated reporting on user sentiment and query frequency to optimize support flows without ambient data access.",
        icon: "analytics",
        iconTone: "gold",
      },
    ] satisfies MultiRoleCrmCaseStudyFeature[],
  },
  bottomCta: {
    title: "Ready to build your B2B platform?",
    subtext: "Transform operations with spec-driven web systems, RLS, and governed AI. Let's discuss your roadmap today.",
    primaryLabel: "Build Your B2B Web Platform",
    primaryTo: ROUTES.webApplications,
  },
} as const;
