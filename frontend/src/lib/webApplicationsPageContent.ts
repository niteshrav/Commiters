import { ROUTES } from "./routes";

export const WEB_APPLICATIONS_DOCUMENT_TITLE = "B2B Web Applications | Commiters" as const;

export const WEB_APPLICATIONS_SEO = {
  title: WEB_APPLICATIONS_DOCUMENT_TITLE,
  description:
    "High-margin operational web systems and support portals from Commiters, built on Vite, Express, MongoDB, Node.js, and GCP Serverless.",
  keywords:
    "B2B web applications, operational portals, Vite, Express, MongoDB, Node.js, GCP Serverless, Commiters",
  path: ROUTES.webApplications,
} as const;

export const WEB_APPLICATIONS_HERO = {
  eyebrow: "B2B OPERATIONAL WEB SYSTEMS",
  headline: "High-Margin Operational Web Systems & Support Portals.",
  subheadline:
    "We ship high-performance operations platforms and client support portals on Vite, Express, MongoDB, and GCP Serverless — built for teams that need reliability without a bloated stack.",
} as const;

export const WEB_APPLICATIONS_CTA_LABEL = "Request Project Estimate" as const;

export const WEB_APPLICATIONS_CAPABILITIES = [
  {
    id: "operational-systems",
    title: "Operational Web Systems",
    body: "Internal tools that replace spreadsheet ops with fast, auditable workflows your team will actually use.",
  },
  {
    id: "support-portals",
    title: "Client Support Portals",
    body: "Branded portals for tickets, documents, and status — so clients self-serve instead of flooding inboxes.",
  },
  {
    id: "rbac-apis",
    title: "Role-Based Access & APIs",
    body: "Granular RBAC, REST APIs, and SSO-ready auth so every role sees only what they should.",
  },
  {
    id: "cloud-native",
    title: "Cloud-Native Delivery",
    body: "GCP Serverless services with CI/CD, observability, and a stack you can operate without a platform army.",
  },
] as const;

export const WEB_APPLICATIONS_STACK = [
  { id: "vite", label: "Vite", slug: "vite" },
  { id: "express", label: "Express", slug: "express" },
  { id: "mongodb", label: "MongoDB", slug: "mongodb" },
  { id: "nodejs", label: "Node.js", slug: "nodedotjs" },
  { id: "gcp", label: "GCP Serverless", slug: "googlecloud" },
] as const;

export const WEB_APPLICATIONS_FORM = {
  title: "Request a project estimate",
  nameLabel: "Name",
  namePlaceholder: "Your name",
  emailLabel: "Work Email",
  emailPlaceholder: "name@company.com",
  companyLabel: "Company Name",
  companyPlaceholder: "Company name",
  projectLabel: "Project Description",
  projectPlaceholder: "What operational system or support portal should we estimate?",
  submitLabel: WEB_APPLICATIONS_CTA_LABEL,
  serviceNeeded: "B2B Web Applications",
} as const;
