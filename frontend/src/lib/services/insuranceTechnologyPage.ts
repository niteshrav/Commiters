import type { TechLogoDef } from "../homeTechStack";
import type { ServiceFeature } from "./types";

const v11 = (slug: string) => `https://cdn.jsdelivr.net/npm/simple-icons@11/icons/${slug}.svg`;

export const INSURANCE_TECH_FEATURES: ServiceFeature[] = [
  {
    title: "Insurance Platform Development",
    description: "Custom platforms for policies, portals, and renewals.",
    icon: "scale",
    points: ["Web applications", "Policy systems", "Issuance and renewal", "Customer portals", "Multi-product setups"],
  },
  {
    title: "Claims Management Solutions",
    description: "Digital claim intake, documents, and status tracking.",
    icon: "maintain",
    points: ["Online submission", "Claim tracking", "Document checks", "Status notices", "Claim workflows"],
  },
  {
    title: "Underwriting & Risk Management",
    description: "Workflows that collect risk data for a human decision.",
    icon: "seo",
    points: ["Risk assessment", "Data collection", "Risk scoring", "Underwriting views", "Decision support"],
  },
  {
    title: "Customer & Agent Portals",
    description: "Self-service for customers and a desk for agents.",
    icon: "responsive",
    points: ["Self-service", "Agent dashboards", "Policy history", "Onboarding", "Role-based access"],
  },
  {
    title: "Payment & Billing Integration",
    description: "Premium collection, reminders, and reconciliation.",
    icon: "performance",
    points: ["Premium payments", "Recurring billing", "Reminders", "Invoices", "Reconciliation"],
  },
  {
    title: "Insurance CRM & Automation",
    description: "Lead follow-up, renewals, and agent task flows.",
    icon: "automation",
    points: ["Lead management", "CRM", "Follow-ups", "Renewal reminders", "Agent workflows"],
  },
  {
    title: "AI-Powered Insurance Solutions",
    description: "Assistive AI for documents and support. Not autonomous approval.",
    icon: "ai",
    points: ["Support chat", "Document processing", "Data extraction", "Review signals", "Assisted support"],
  },
  {
    title: "Insurance Analytics & Reporting",
    description: "Reports for policies, claims, and agent activity.",
    icon: "secure",
    points: ["Claims analytics", "Policy reports", "Retention views", "Agent dashboards", "BI connections"],
  },
];

export const INSURANCE_TECH_PILLARS = [
  { title: "Digital transformation", body: "Modernize traditional insurance operations with scalable digital platforms." },
  { title: "Intelligent automation", body: "Reduce repetitive processes through automated workflows and intelligent systems." },
  { title: "Connected experiences", body: "Connect customers, agents, administrators, and operations on one platform." },
] as const;

export const INSURANCE_TECH_DESK = [
  { title: "Policy endorsements", body: "Coverage, vehicle, driver, address, and mortgagee changes processed on the agency record." },
  { title: "Carrier portal entry", body: "Quoting and data entry inside the carrier portals and agency system you already use." },
  { title: "Renewals", body: "30, 60, and 90-day renewal tracking and remarketing prep before the deadline." },
  { title: "COI issuance", body: "Same-day certificates, plus a daily watch on cancellations and non-pay notices." },
  { title: "SOP automation", body: "One checklist for the desk, with AI-assisted document extraction on repetitive files." },
  { title: "Who this is for", body: "Independent US P&C and personal-lines agencies that need capacity without a full-time admin hire." },
] as const;

export const INSURANCE_TECH_SEGMENTS = [
  { title: "Life insurance", body: "Policy administration, onboarding, and lifecycle management." },
  { title: "Health insurance", body: "Claims workflows, partner data, and service portals." },
  { title: "Motor insurance", body: "Vehicle policies, accident claims, and digital documents." },
  { title: "Property insurance", body: "Property policies and digital damage-claim intake." },
  { title: "Commercial insurance", body: "Business policy admin, risk records, and reporting." },
  { title: "Travel insurance", body: "Policy servicing, customer portals, and claim tracking." },
] as const;

export const INSURANCE_TECH_FLOW = [
  { title: "Customer onboarding", body: "Registration and information collection." },
  { title: "Policy management", body: "Creation, issuance, documents, and renewals." },
  { title: "Premium and payments", body: "Payment integration and billing workflows." },
  { title: "Claims processing", body: "Submission, verification, and status tracking." },
  { title: "Analytics and reporting", body: "Operational insight and performance reporting." },
] as const;

export const INSURANCE_TECH_AI = [
  { title: "AI-powered chat", body: "Answers routine policy and claim questions and hands off the rest." },
  { title: "Document processing", body: "Reads uploaded forms so staff review exceptions, not every field." },
  { title: "OCR data extraction", body: "Pulls text from scans into the workflow for a person to confirm." },
  { title: "Automated support", body: "Routes status updates and missing-document requests." },
  { title: "Claims workflow automation", body: "Moves a claim through the steps your team defines." },
  { title: "Fraud review support", body: "Flags unusual patterns for review. It does not decide a claim." },
  { title: "Predictive analytics", body: "Connects models your team chooses. It does not approve policies alone." },
] as const;

export const INSURANCE_TECH_STACK: { label: string; items: { name: string; logo?: TechLogoDef }[] }[] = [
  {
    label: "Frontend",
    items: [
      { name: "React", logo: { slug: "react", alt: "React" } },
      { name: "Next.js", logo: { slug: "nextdotjs", alt: "Next.js" } },
    ],
  },
  {
    label: "Backend",
    items: [
      { name: "Node.js", logo: { slug: "nodedotjs", alt: "Node.js" } },
      { name: "Python", logo: { slug: "python", alt: "Python" } },
      { name: "Java", logo: { slug: "openjdk", alt: "Java" } },
    ],
  },
  {
    label: "Databases",
    items: [
      { name: "PostgreSQL", logo: { slug: "postgresql", alt: "PostgreSQL" } },
      { name: "MongoDB", logo: { slug: "mongodb", alt: "MongoDB" } },
      { name: "MySQL", logo: { slug: "mysql", alt: "MySQL" } },
    ],
  },
  {
    label: "Cloud",
    items: [
      { name: "AWS", logo: { slug: "amazonaws", alt: "AWS", iconSrc: v11("amazonaws") } },
      { name: "Microsoft Azure", logo: { slug: "microsoftazure", alt: "Microsoft Azure", iconSrc: v11("microsoftazure") } },
      { name: "Google Cloud", logo: { slug: "googlecloud", alt: "Google Cloud" } },
    ],
  },
  {
    label: "Integrations",
    items: [{ name: "REST APIs" }, { name: "Webhooks" }, { name: "Third-party APIs" }],
  },
  {
    label: "AI and automation",
    items: [{ name: "OCR" }, { name: "Document AI" }, { name: "LLM integrations" }, { name: "Workflow automation" }],
  },
];

export const INSURANCE_TECH_WHY = [
  { title: "Scalable insurance platforms", body: "Architecture that can add a product or a portal without a rewrite." },
  { title: "Secure application architecture", body: "Auth, permissions, and encryption designed into the build." },
  { title: "Intelligent process automation", body: "Repetitive steps run on rules your operations team can see." },
  { title: "Seamless API integrations", body: "Payments, documents, and partner systems connect through APIs." },
  { title: "Customer-centric experiences", body: "Customers and agents see the same policy and claim record." },
  { title: "Data-driven decision support", body: "Reports for underwriting and claims. People still make the decision." },
] as const;

export const INSURANCE_TECH_SECURITY = [
  "Secure authentication",
  "Role-based permissions",
  "Encrypted data in transit",
  "Secure API integrations",
  "Audit logs",
  "Scalable cloud hosting",
  "Third-party system integration",
] as const;

export const INSURANCE_TECH_METRICS = [
  "Total policies",
  "Claims overview",
  "Premium tracking",
  "Policy renewals",
  "Agent performance",
  "Customer activity",
] as const;

export const INSURANCE_TECH_FAQS = [
  {
    question: "What is Insurance Software Development?",
    answer:
      "It is the work of building the systems insurers and agencies use: policy records, claims, portals, payments, and the reports around them.",
  },
  {
    question: "What is an InsurTech solution?",
    answer:
      "Software that runs an insurance workflow digitally, such as onboarding, policy servicing, claims, or agent and customer portals.",
  },
  {
    question: "Can you develop a custom insurance management platform?",
    answer: "Yes. The platform is scoped to your products, roles, and the systems it must connect to.",
  },
  {
    question: "Can you build digital policy management systems?",
    answer: "Yes. That covers issuance, documents, endorsements, and renewals on a shared policy record.",
  },
  {
    question: "Do you develop online claims management solutions?",
    answer: "Yes. Customers can submit a claim, upload documents, and follow status while your team works the file.",
  },
  {
    question: "Can insurance platforms integrate with third-party APIs?",
    answer: "Yes. Payments, documents, and partner systems connect through REST APIs and webhooks.",
  },
  {
    question: "Can AI automate insurance workflows?",
    answer:
      "AI can draft replies, extract document fields, and flag items for review. It does not approve a claim or a policy on its own.",
  },
  {
    question: "Do you provide cloud-based insurance solutions?",
    answer: "Yes. Platforms can run on AWS, Microsoft Azure, or Google Cloud, matched to the environment you already use.",
  },
];
