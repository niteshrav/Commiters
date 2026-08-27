import { ROUTES } from "./routes";

export const WEB_APPLICATIONS_DOCUMENT_TITLE = "Custom Web Applications | Commiters" as const;

export const WEB_APPLICATIONS_SEO = {
  title: WEB_APPLICATIONS_DOCUMENT_TITLE,
  description:
    "Scalable custom web applications from Commiters. Next.js/React frontends, Node.js and Python services, PostgreSQL, and RBAC APIs built for high-growth operations.",
  keywords:
    "custom web applications, Next.js, Node.js, PostgreSQL, Cloud Run, RBAC, REST API, GraphQL, Commiters",
  path: ROUTES.webApplications,
} as const;

export const WEB_APPLICATIONS_HERO = {
  eyebrow: "FULL-STACK PLATFORM ENGINEERING",
  headline: "Scalable Custom Web Applications Built for High-Growth Operations",
  subheadline:
    "We engineer fast, secure, and modern Next.js/Node.js web applications tailored to your exact business requirements.",
} as const;

export const WEB_APPLICATIONS_CTA_LABEL = "Discuss Your Application" as const;

export const WEB_APPLICATIONS_CAPABILITIES = [
  {
    id: "frontends",
    title: "High-Performance Next.js/React Frontends",
    body: "Lightning-fast SSR/SSG user experiences.",
  },
  {
    id: "microservices",
    title: "Robust Node.js/Python Microservices",
    body: "Serverless backend pipelines hosted on Google Cloud Run.",
  },
  {
    id: "databases",
    title: "Enterprise Database Design",
    body: "Scalable PostgreSQL, Cloud SQL, and Redis caching.",
  },
  {
    id: "rbac-apis",
    title: "Role-Based Security (RBAC) & APIs",
    body: "Granular access control, OAuth/SSO integration, and REST/GraphQL APIs.",
  },
] as const;

export const WEB_APPLICATIONS_STANDARDS = [
  {
    id: "uptime",
    title: "99.9% Uptime",
    body: "Production platforms designed for reliability, observability, and graceful failure.",
  },
  {
    id: "cicd",
    title: "CI/CD Automated Deployment",
    body: "Every merge ships through automated tests, previews, and repeatable release pipelines.",
  },
  {
    id: "cloud-native",
    title: "Scalable Cloud-Native Engineering",
    body: "Containerized services, managed databases, and infrastructure as code from day one.",
  },
] as const;

export const WEB_APPLICATIONS_FORM = {
  title: "Start Your Web Application Project",
  nameLabel: "Name",
  namePlaceholder: "Your name",
  emailLabel: "Work Email",
  emailPlaceholder: "name@company.com",
  companyLabel: "Company Name",
  companyPlaceholder: "Company name",
  projectLabel: "Project Description",
  projectPlaceholder: "What should this application do for your operations?",
  submitLabel: WEB_APPLICATIONS_CTA_LABEL,
  serviceNeeded: "Custom Web Applications",
} as const;
