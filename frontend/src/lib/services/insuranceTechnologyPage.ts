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
  {
    title: "COI Issuance & Holder Updates",
    body: "Same-day Certificates of Insurance (COIs), additional insured/waiver endorsements, and daily monitoring of pending cancellations or non-pay notices.",
  },
  {
    title: "Policy Endorsements & Changes",
    body: "Accurate processing of coverage updates, vehicle/driver additions, address changes, and mortgagee/lienholder updates across Personal and Commercial policies.",
  },
  {
    title: "Carrier Portal & AMS Entry",
    body: "Fast, error-free quoting prep, ACORD form preparation, loss run requests, and data entry inside your existing Agency Management System (Applied Epic, AMS360, EZLynx, HawkSoft, NowCerts).",
  },
  {
    title: "Renewals & Remarketing Prep",
    body: "Proactive 30-, 60-, and 90-day renewal tracking, remarketing worksheets, and policy audit support ahead of carrier deadlines.",
  },
  {
    title: "SOP & Document Automation",
    body: "Standardized desk checklists paired with AI-assisted document extraction (OCR/LLM) to pull data from dec pages, loss runs, and carrier notices automatically.",
  },
  {
    title: "Who This Is For",
    body: "Independent US P&C brokerages and MGAs (Personal Lines & Commercial Lines) looking to eliminate servicing backlogs without adding full-time local overhead.",
  },
] as const;

export const INSURANCE_TECH_SEGMENTS = [
  { title: "Life insurance", body: "Administrative policy servicing, document workflows, and lifecycle support systems." },
  { title: "Health insurance", body: "Administrative claims intake support, partner data flows, and service portal tooling." },
  {
    title: "Personal & Commercial Auto",
    body: "Personal auto policies, commercial fleet schedules, driver updates, and endorsements.",
  },
  {
    title: "Homeowners & Commercial Property",
    body: "Homeowners, landlord, BOP, and commercial property policy servicing and mortgagee updates.",
  },
  {
    title: "Commercial Lines & General Liability",
    body: "GL, Workers' Comp, umbrella policies, ACORD forms, COIs, and annual audit prep.",
  },
  { title: "Travel insurance", body: "Administrative policy servicing, customer portal support, and claim tracking workflows." },
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

export type InsuranceMetricIcon =
  | "clock"
  | "calendar"
  | "shield"
  | "checklist"
  | "document"
  | "users";

export const INSURANCE_TECH_METRICS = [
  {
    title: "Same-Day COI Turnaround",
    body: "Urgent certificate and holder requests processed within business hours.",
    icon: "clock" as const,
  },
  {
    title: "30/60/90-Day Renewal Pipeline",
    body: "Zero missed renewal dates or unworked remarketing files.",
    icon: "calendar" as const,
  },
  {
    title: "Daily Cancellation Watch",
    body: "Pending non-pay and underwriting notices flagged before lapse.",
    icon: "shield" as const,
  },
  {
    title: "AMS & Portal Sync Accuracy",
    body: "Standardized SOP checklists minimizing E&O exposure.",
    icon: "checklist" as const,
  },
  {
    title: "Automated Dec-Page Extraction",
    body: "Structured data pulled from carrier PDFs into your system.",
    icon: "document" as const,
  },
  {
    title: "Dedicated Desk Coverage",
    body: "Predictable daily servicing capacity aligned to US time zones.",
    icon: "users" as const,
  },
] as const;

export const INSURANCE_TECH_SECURITY_LEAD =
  "Enterprise-grade access controls, encrypted workflows, and strict role-based boundaries designed for US insurance agency data privacy. Note: Commiters provides non-licensed administrative servicing and technical automation; all binding, coverage advice, and carrier approvals remain strictly with your licensed staff." as const;

export const INSURANCE_TECH_FAQS = [
  {
    question: "Which Agency Management Systems (AMS) and carrier portals do you support?",
    answer:
      "We work directly inside the systems your agency already uses—including Applied Epic, AMS360, EZLynx, HawkSoft, NowCerts, and direct carrier portals—following your exact naming conventions and activity logging rules.",
  },
  {
    question: "Do your specialists handle licensed insurance activities?",
    answer:
      "No. Our team handles strictly non-licensed back-office administration, data entry, COI generation, renewal prep, and workflow automation. All coverage recommendations, quoting approvals, and policy binding stay exclusively with your licensed producers and account managers.",
  },
  {
    question: "Can you support both Personal Lines and Commercial Lines?",
    answer:
      "Yes. We support Personal Lines (Auto, Homeowners, Umbrella) as well as Commercial Lines (General Liability, Commercial Auto, BOP, Workers' Comp), including ACORD form prep, loss run requests, and audit support.",
  },
  {
    question: "What is your typical turnaround time for COIs and endorsements?",
    answer:
      "Standard COI requests and routine endorsements are processed same-day within agreed SLA windows, with urgent rush certificates prioritized so your producers never lose momentum on a closing.",
  },
  {
    question: "How do you ensure data security and client confidentiality?",
    answer:
      "We operate under strict NDAs, role-based access permissions (least-privilege logins via your VPN/VDI or user-level AMS credentials), encrypted communications, and documented audit trails—never sharing raw credentials.",
  },
  {
    question: "Can you also automate repetitive agency workflows using AI?",
    answer:
      "Yes. Beyond daily desk operations, our engineering team builds custom AI document extractors (for dec pages, loss runs, and carrier notices), automated renewal reminders, and CRM/AMS integrations tailored to your agency.",
  },
];
