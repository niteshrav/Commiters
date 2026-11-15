import type { ServiceDetail } from "./types";
import { SERVICE_DEFAULT_PRICING } from "./sharedContent";

const OPS_TECH = [
  { slug: "nodedotjs", alt: "Node.js" },
  { slug: "python", alt: "Python" },
  { slug: "postgresql", alt: "PostgreSQL" },
  { slug: "googlecloud", alt: "Google Cloud" },
  { slug: "docker", alt: "Docker" },
  { slug: "react", alt: "React" },
];

const MARKETING_TECH = [
  { slug: "react", alt: "React" },
  { slug: "nextdotjs", alt: "Next.js" },
  { slug: "googlecloud", alt: "Google Cloud" },
  { slug: "nodedotjs", alt: "Node.js" },
  { slug: "postgresql", alt: "PostgreSQL" },
  { slug: "tailwindcss", alt: "Tailwind CSS" },
];

const DATA_TECH = [
  { slug: "python", alt: "Python" },
  { slug: "nodedotjs", alt: "Node.js" },
  { slug: "postgresql", alt: "PostgreSQL" },
  { slug: "googlecloud", alt: "Google Cloud" },
  { slug: "docker", alt: "Docker" },
  { slug: "amazonaws", alt: "AWS" },
];

export const INSURANCE_OPERATIONS_SERVICE: ServiceDetail = {
  slug: "insurance-operations",
  gridId: "insurance-operations",
  title: "Insurance Operations",
  tagline:
    "Dedicated back-office and AI-assisted insurance operations support—so licensed producers sell while we keep policy administration accurate and on time.",
  description:
    "Commiters runs high-SLA policy administration, carrier portal work, renewals, and COI workflows for independent US P&C and personal lines agencies that need capacity without full-time overhead.",
  heroVisual: "automation",
  showAllFeatures: true,
  showProcess: true,
  seo: {
    title: "Insurance Operations Support for Agencies",
    description:
      "Back-office and AI-assisted insurance operations for US P&C agencies—endorsements, carrier portal entry, renewals, COIs, and SOP automation.",
    keywords:
      "insurance operations, insurance back office, policy endorsements, COI issuance, agency management, P&C operations, Commiters",
  },
  about: {
    what: "We operate as an extension of your agency desk: endorsements, quoting support, renewals prep, COIs, cancellation tracking, and SOP-driven automation.",
    why: "Licensed producers lose revenue when they are stuck in portals and paperwork. A disciplined ops partner clears the queue without adding full-time headcount.",
    who: "Independent US P&C and personal lines agencies and brokerages that need reliable back-office capacity and measurable turnaround.",
  },
  problem: {
    title: "The bottleneck we remove",
    lead: "Agencies stall when producers absorb admin work that should never leave the back office.",
    points: [
      "Endorsement and change queues pile up while producers chase carrier portals.",
      "Renewals and remarketing prep arrive late, forcing last-minute scrambles.",
      "COI and cancellation work is reactive instead of same-day and tracked.",
      "Every desk invents its own checklist, so quality and SLA drift.",
    ],
  },
  features: [
    {
      title: "Policy Endorsements & Changes",
      description:
        "Accurate processing of coverage updates, vehicle/driver additions, address changes, and mortgagee updates.",
      icon: "maintain",
    },
    {
      title: "Carrier Portal Entry & Quoting Support",
      description: "Fast, error-free data entry across carrier portals and agency management systems (AMS).",
      icon: "performance",
    },
    {
      title: "Policy Renewals & Remarketing Prep",
      description:
        "Proactive 30/60/90-day renewal tracking, remarketing sheet preparation, and client follow-up workflows.",
      icon: "seo",
    },
    {
      title: "COI Issuance & Cancellation Tracking",
      description:
        "Same-day Certificate of Insurance generation and daily monitoring of pending cancellations and non-pay notices.",
      icon: "secure",
    },
    {
      title: "Workflow & SOP Automation",
      description:
        "Standardized agency checklists plus AI-assisted document extraction to cut manual processing time.",
      icon: "automation",
    },
  ],
  technologies: OPS_TECH,
  processSteps: [
    "Scope desks, SLAs, and AMS access",
    "Stand up SOPs and quality checks",
    "Run live endorsement and renewal queues",
    "Automate repetitive checklist steps",
    "Report turnaround and exception metrics",
  ],
  faqs: [
    {
      question: "Who is this for?",
      answer:
        "Independent US P&C and personal lines agencies that need back-office capacity without hiring a full-time admin team.",
    },
    {
      question: "Do you replace licensed producers?",
      answer:
        "No. Producers stay on sales and client relationships. We handle policy administration and portal work under agreed SLAs.",
    },
    {
      question: "How do you keep quality high?",
      answer:
        "Documented SOPs, dual-check paths for high-risk changes, and daily exception reporting so nothing silent-fails.",
    },
    {
      question: "Can you work inside our AMS and carrier portals?",
      answer:
        "Yes. We operate inside the systems you already use, with least-privilege access and audit-friendly activity notes.",
    },
  ],
  timeline: [
    { label: "Desk pilot (one workflow)", duration: "1–2 Weeks" },
    { label: "Full back-office desk", duration: "3–6 Weeks" },
    { label: "Multi-desk + automation", duration: "2–3 Months" },
  ],
  pricing: SERVICE_DEFAULT_PRICING,
  portfolio: [],
};

export const DIGITAL_MARKETING_SERVICE: ServiceDetail = {
  slug: "digital-marketing",
  gridId: "digital-marketing",
  title: "Digital Marketing",
  tagline:
    "Performance-driven digital marketing and conversion funnels—turning search, social, and website traffic into qualified pipeline.",
  description:
    "Commiters builds measurable acquisition systems for startups, local businesses, hospitality and wellness brands, and SMBs that need leads—not vanity metrics.",
  heroVisual: "website",
  showAllFeatures: true,
  showProcess: true,
  seo: {
    title: "Digital Marketing & Conversion Funnels",
    description:
      "SEO, CRO, paid acquisition, content systems, and CRM automation that turn traffic into qualified pipeline for startups and SMBs.",
    keywords:
      "digital marketing, SEO, conversion rate optimization, Google Ads, Meta Ads, marketing automation, lead generation, Commiters",
  },
  about: {
    what: "We design and run SEO, landing-page CRO, paid acquisition, content distribution, and CRM follow-up so inbound demand becomes booked conversations.",
    why: "Most marketing spend dies in weak landing pages and slow follow-up. We optimize for cost-per-qualified-lead and pipeline, not impressions alone.",
    who: "Startups, local businesses, hospitality and wellness brands, and growing SMBs that need accountable lead generation.",
  },
  problem: {
    title: "The bottleneck we remove",
    lead: "Traffic without conversion systems is noise. Agencies and founders need pipeline they can measure.",
    points: [
      "Sites rank or get ads traffic but fail to convert into qualified inquiries.",
      "Campaigns optimize for clicks instead of cost-per-qualified-lead.",
      "Content ships without a distribution or follow-up system.",
      "Inbound leads go cold because CRM and SMS/email sequences are missing.",
    ],
  },
  features: [
    {
      title: "SEO & Local Visibility",
      description:
        "Technical SEO cleanup, high-intent landing architecture, and Google Business Profile optimization for organic and local demand.",
      icon: "seo",
    },
    {
      title: "CRO & Conversion Funnels",
      description:
        "High-converting landing pages, automated lead capture, and booking or gifting funnels that turn visitors into customers.",
      icon: "performance",
    },
    {
      title: "Paid Acquisition & Retargeting",
      description:
        "Meta and Google Ads setups focused on cost-per-qualified-lead and measurable ROI—not vanity reach.",
      icon: "mvp",
    },
    {
      title: "Content & Social Growth Systems",
      description:
        "Structured calendars, brand positioning, and multi-channel distribution built to drive inbound inquiries.",
      icon: "maintain",
    },
    {
      title: "Marketing & CRM Automation",
      description:
        "Automated email/SMS follow-up and lead routing so no inbound inquiry goes cold.",
      icon: "automation",
    },
  ],
  technologies: MARKETING_TECH,
  processSteps: [
    "Audit funnel, tracking, and offer clarity",
    "Fix landing architecture and conversion paths",
    "Launch SEO and/or paid acquisition",
    "Wire CRM follow-up and lead routing",
    "Optimize weekly against qualified pipeline",
  ],
  faqs: [
    {
      question: "Do you sell vanity metrics?",
      answer:
        "No. We report on qualified leads, booked calls, and cost-per-qualified-lead—metrics founders and SMBs can act on.",
    },
    {
      question: "Can you work with our existing website?",
      answer:
        "Yes. We improve conversion on what you have, or rebuild high-intent landing pages when the current site cannot convert.",
    },
    {
      question: "Which channels do you run?",
      answer:
        "SEO, Google Ads, Meta Ads, content distribution, and CRM/email-SMS automation—scoped to the channels that match your offer.",
    },
    {
      question: "How fast until we see signal?",
      answer:
        "Paid and CRO changes can show signal in days to weeks. SEO compounds over months; we set expectations by channel in the scope.",
    },
  ],
  timeline: [
    { label: "Funnel + tracking fix", duration: "1–2 Weeks" },
    { label: "Acquisition launch", duration: "2–4 Weeks" },
    { label: "Ongoing growth system", duration: "Monthly retainer" },
  ],
  pricing: SERVICE_DEFAULT_PRICING,
  portfolio: [],
};

export const DATA_ENGINEERING_SERVICE: ServiceDetail = {
  slug: "data-engineering",
  gridId: "data-engineering",
  title: "Data Engineering",
  tagline:
    "Reliable data pipelines, warehousing, and automated extraction—turning raw operational data into clean, actionable systems.",
  description:
    "Commiters builds ETL/ELT pipelines, document extraction, warehouses, API sync, and reporting for teams drowning in spreadsheets, PDFs, and disconnected SaaS tools.",
  heroVisual: "ai",
  showAllFeatures: true,
  showProcess: true,
  seo: {
    title: "Data Engineering & Automated Extraction",
    description:
      "ETL/ELT pipelines, PDF extraction, data warehousing, API sync, and operational dashboards for growing businesses and ops teams.",
    keywords:
      "data engineering, ETL, ELT, data warehouse, PDF extraction, BigQuery, PostgreSQL, API integration, Commiters",
  },
  about: {
    what: "We design pipelines that ingest, clean, and sync data across CRMs, ERPs, payments, and databases—plus AI extraction for unstructured documents and live reporting.",
    why: "Fragmented spreadsheets and PDFs hide the truth of the business. Clean systems unlock faster decisions without weekly manual compilation.",
    who: "Growing businesses, operations teams, and tech-enabled SMBs that need reliable data plumbing—not another one-off spreadsheet.",
  },
  problem: {
    title: "The bottleneck we remove",
    lead: "When every tool holds a different version of the truth, teams waste hours reconciling instead of deciding.",
    points: [
      "CRMs, ERPs, and payment tools do not share a reliable record.",
      "Invoices and PDFs stay trapped as files instead of structured data.",
      "Weekly reporting is a manual spreadsheet rebuild.",
      "One-off scripts break quietly and nobody owns the pipeline.",
    ],
  },
  features: [
    {
      title: "Automated ETL / ELT Pipelines",
      description:
        "Resilient pipelines that ingest, clean, and sync data across CRMs, ERPs, payment gateways, and databases (PostgreSQL, BigQuery, Neon).",
      icon: "automation",
    },
    {
      title: "Unstructured Document & PDF Extraction",
      description:
        "AI-powered extraction that converts invoices, forms, statements, and PDFs into structured Excel/SQL records.",
      icon: "ai",
    },
    {
      title: "Data Warehousing & Schema Architecture",
      description:
        "Clean, scalable relational and analytical models built for fast querying and long-term reliability.",
      icon: "scale",
    },
    {
      title: "API Integrations & Real-Time Syncing",
      description:
        "Custom webhooks, Python/Node workers, and cloud serverless runtimes (including Google Cloud Run) that connect isolated tools.",
      icon: "performance",
    },
    {
      title: "Operational Reporting & Decision Dashboards",
      description:
        "Automated executive reporting that replaces manual weekly spreadsheet compilation with live metrics.",
      icon: "mvp",
    },
  ],
  technologies: DATA_TECH,
  processSteps: [
    "Map sources, owners, and decision metrics",
    "Design schema and pipeline SLAs",
    "Build ingestion and extraction jobs",
    "Validate quality and backfill history",
    "Ship dashboards and ownership runbooks",
  ],
  faqs: [
    {
      question: "Which systems can you connect?",
      answer:
        "CRMs, ERPs, payment gateways, spreadsheets, and SQL warehouses—including PostgreSQL, BigQuery, and Neon—via APIs, webhooks, and scheduled workers.",
    },
    {
      question: "Can you extract data from PDFs and forms?",
      answer:
        "Yes. We build AI-assisted extraction pipelines that turn invoices, statements, and forms into structured records with human review where stakes are high.",
    },
    {
      question: "Do you replace our analysts?",
      answer:
        "No. We remove the plumbing and manual compilation so operators and founders get trustworthy metrics faster.",
    },
    {
      question: "How do you keep pipelines reliable?",
      answer:
        "Explicit schemas, monitoring, retry policies, and ownership runbooks—so failures surface early instead of silently rotting.",
    },
  ],
  timeline: [
    { label: "Single pipeline / extraction", duration: "1–3 Weeks" },
    { label: "Warehouse + core sync", duration: "4–8 Weeks" },
    { label: "Full reporting platform", duration: "2–4 Months" },
  ],
  pricing: SERVICE_DEFAULT_PRICING,
  portfolio: [],
};

export const OPERATIONS_LANDING_SERVICES: ServiceDetail[] = [
  INSURANCE_OPERATIONS_SERVICE,
  DIGITAL_MARKETING_SERVICE,
  DATA_ENGINEERING_SERVICE,
];
