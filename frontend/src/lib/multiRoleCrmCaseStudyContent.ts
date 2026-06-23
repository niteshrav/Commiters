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
  kicker: "CASE STUDY: ENTERPRISE AI",
  titleLead: "AI-Powered",
  titleAccent: "Multi-Role CRM",
  subheadline: "Intelligent Operations with RAG & LLMs",
  heroImage: {
    src: "/assets/case-studies/multi-role-crm-hero.png",
    srcSet: "/assets/case-studies/multi-role-crm-hero@2x.png 2x",
    alt: "Professional 3D render of a CRM dashboard interface on a tablet device",
  },
  vision: {
    heading: "The Vision",
    body: "A proof-of-concept multi-role CRM featuring a real-time chatbot powered by LLM and RAG (Retrieval-Augmented Generation) to handle complex user queries. This project bridges the gap between static customer data and dynamic, intelligent interaction.",
    challenge: {
      label: "Challenge",
      text: "Fragmented data access and slow manual query resolution for enterprise support teams.",
    },
    solution: {
      label: "Solution",
      text: "Centralized RAG-enhanced AI that understands institutional knowledge in real-time.",
    },
  },
  techStack: {
    items: [
      { slug: "react", alt: "React", role: "Frontend", icon: "code", layout: "wide" },
      { slug: "postgresql", alt: "PostgreSQL", role: "Storage", icon: "database", layout: "compact" },
      { slug: "nodedotjs", alt: "Node.js", role: "Runtime", icon: "cloud", layout: "compact" },
      {
        slug: "openai",
        alt: "Generative AI",
        role: "LLM & RAG Integration",
        icon: "ai",
        layout: "wide",
        highlight: true,
      },
    ] satisfies MultiRoleCrmCaseStudyStackItem[],
  },
  architecture: {
    heading: "Architectural Excellence",
    description: "Modular, scalable, and secure. Designed for high-density enterprise environments.",
    indicators: [
      { id: "security", label: "Enterprise Security", icon: "shield" },
      { id: "scale", label: "Cloud-Native Scale", icon: "gauge" },
    ] satisfies MultiRoleCrmArchitectureIndicator[],
    features: [
      {
        id: "rbac",
        title: "Multi-role RBAC",
        body: "Granular access control for Admins, Managers, and Agents with real-time session validation.",
        icon: "rbac",
        iconTone: "blue",
      },
      {
        id: "rag",
        title: "RAG Chatbot",
        body: "Retrieval-Augmented Generation ensuring AI responses are grounded in your specific data.",
        icon: "rag",
        iconTone: "gold",
      },
      {
        id: "sync",
        title: "Real-time Sync",
        body: "WebSocket-driven query updates ensuring zero-latency communication between users and AI.",
        icon: "sync",
        iconTone: "blue",
      },
      {
        id: "analytics",
        title: "Smart Analytics",
        body: "Automated reporting on user sentiment and query frequency to optimize support flows.",
        icon: "analytics",
        iconTone: "gold",
      },
    ] satisfies MultiRoleCrmCaseStudyFeature[],
  },
  bottomCta: {
    title: "Ready to build?",
    subtext: "Transform your operations with enterprise-grade AI. Let's discuss your roadmap today.",
    primaryLabel: "Get Started",
    primaryTo: ROUTES.contact,
  },
} as const;
