import { ROUTES } from "./routes";

export const WEB_APPLICATIONS_DOCUMENT_TITLE = "Spec-Driven Full-Stack Cloud Platforms | Commiters" as const;

export const WEB_APPLICATIONS_SEO = {
  title: WEB_APPLICATIONS_DOCUMENT_TITLE,
  description:
    "Scalable B2B portals, SaaS applications, and operational cloud systems built on Vite, React, Express, and MongoDB—engineered with rigid specifications and zero technical debt.",
  keywords:
    "spec-driven platforms, full-stack web, B2B portals, Vite, React, Express, MongoDB, RLS, A2UI, Commiters",
  path: ROUTES.webApplications,
} as const;

export const WEB_APPLICATIONS_HERO = {
  eyebrow: "CLOUD PLATFORM ENGINEERING",
  headline: "Spec-Driven Full-Stack Cloud Platforms",
  subheadline:
    "Scalable B2B portals, SaaS applications, and operational cloud systems built on Vite, React, Express, and MongoDB—engineered with rigid specifications and zero technical debt.",
} as const;

export const WEB_APPLICATIONS_CTA_LABEL = "Request Platform Estimate" as const;

export const WEB_APPLICATIONS_CAPABILITIES = [
  {
    id: "high-performance-b2b-portals",
    title: "High-Performance B2B Portals",
    body: "Operational portals and client systems on Vite, React, Express, and MongoDB.",
  },
  {
    id: "declarative-ui-a2ui",
    title: "Declarative UI (A2UI Pattern)",
    body: "Interface behavior is specified and tested, not improvised in production.",
  },
  {
    id: "database-security-rls",
    title: "Database Security & RLS",
    body: "Row-level security and role boundaries are designed into the schema from day one.",
  },
  {
    id: "cicd-policy-enforcement",
    title: "CI/CD Policy Enforcement",
    body: "Pipelines block unsafe deploys and keep production aligned with the spec.",
  },
] as const;

export const WEB_APPLICATIONS_STACK = [
  { id: "react", label: "React", slug: "react" },
  { id: "vite", label: "Vite", slug: "vite" },
  { id: "tailwind", label: "Tailwind CSS", slug: "tailwindcss" },
  { id: "express", label: "Express", slug: "express" },
  { id: "nodejs", label: "Node.js", slug: "nodedotjs" },
  { id: "mongodb-postgres", label: "MongoDB/PostgreSQL", slug: "mongodb" },
  { id: "mcp", label: "MCP Sockets" },
] as const;

export const WEB_APPLICATIONS_FORM = {
  title: "Request a project estimate",
  nameLabel: "Name",
  namePlaceholder: "Your name",
  emailLabel: "Work Email",
  emailPlaceholder: "name@company.com",
  companyLabel: "Company Name",
  companyPlaceholder: "Company name",
  scopeLabel: "What should we scope?",
  projectLabel: "Project Description",
  projectPlaceholder: "What operational system or support portal should we estimate?",
  submitLabel: WEB_APPLICATIONS_CTA_LABEL,
  serviceNeeded: "Spec-Driven Full-Stack Platforms",
} as const;
