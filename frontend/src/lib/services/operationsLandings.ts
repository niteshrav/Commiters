import type { ServiceDetail } from "./types";
import { DATA_ENGINEERING_FEATURES } from "./dataEngineeringPage";
import { DIGITAL_MARKETING_FAQS, DIGITAL_MARKETING_FEATURES } from "./digitalMarketingPage";
import { INSURANCE_TECH_FAQS, INSURANCE_TECH_FEATURES, INSURANCE_TECH_FLOW } from "./insuranceTechnologyPage";
import { SERVICE_DEFAULT_PRICING } from "./sharedContent";

const MARKETING_TECH = [
  { slug: "react", alt: "React" },
  { slug: "nextdotjs", alt: "Next.js" },
  { slug: "googlecloud", alt: "Google Cloud" },
  { slug: "nodedotjs", alt: "Node.js" },
  { slug: "postgresql", alt: "PostgreSQL" },
  { slug: "tailwindcss", alt: "Tailwind CSS" },
];

const v11 = (slug: string) => `https://cdn.jsdelivr.net/npm/simple-icons@11/icons/${slug}.svg`;
const v13 = (slug: string) => `https://cdn.jsdelivr.net/npm/simple-icons@13/icons/${slug}.svg`;
const v14 = (slug: string) => `https://cdn.jsdelivr.net/npm/simple-icons@14/icons/${slug}.svg`;

const DATA_TECH = [
  { slug: "python", alt: "Python" },
  { slug: "scala", alt: "Scala" },
  { slug: "apachespark", alt: "Apache Spark" },
  { slug: "apachekafka", alt: "Apache Kafka" },
  { slug: "apacheairflow", alt: "Apache Airflow" },
  { slug: "dbt", alt: "dbt", iconSrc: v11("dbt") },
  { slug: "snowflake", alt: "Snowflake" },
  { slug: "googlebigquery", alt: "BigQuery" },
  { slug: "amazonredshift", alt: "Amazon Redshift", iconSrc: v14("amazonredshift") },
  { slug: "postgresql", alt: "PostgreSQL" },
  { slug: "mongodb", alt: "MongoDB" },
  { slug: "amazonaws", alt: "AWS", iconSrc: v11("amazonaws") },
  { slug: "microsoftazure", alt: "Microsoft Azure", iconSrc: v11("microsoftazure") },
  { slug: "googlecloud", alt: "Google Cloud" },
  { slug: "powerbi", alt: "Power BI", iconSrc: v11("powerbi") },
  { slug: "tableau", alt: "Tableau", iconSrc: v13("tableau") },
  { slug: "looker", alt: "Looker" },
];

export const DIGITAL_MARKETING_SERVICE: ServiceDetail = {
  slug: "digital-marketing",
  gridId: "digital-marketing",
  title: "Digital Marketing",
  heroHeadline: "Digital Marketing & Conversion Funnels",
  quoteCtaLabel: "Request a Quote",
  tagline:
    "Performance-driven digital marketing and conversion funnels that turn search, social and website traffic into qualified leads, customers and measurable business growth.",
  description:
    "Commiters builds measurable acquisition systems for startups, local businesses, hospitality and wellness brands, and growing SMBs that need more than vanity metrics.",
  heroVisual: "website",
  showAllFeatures: true,
  showProcess: true,
  seo: {
    title: "Digital Marketing & Conversion Funnels",
    description:
      "Performance-driven digital marketing and conversion funnels that turn search, social, and website traffic into qualified leads and measurable growth.",
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
  features: DIGITAL_MARKETING_FEATURES,
  technologies: MARKETING_TECH,
  processSteps: [
    "Audit funnel, tracking, and offer clarity",
    "Fix landing architecture and conversion paths",
    "Launch SEO and/or paid acquisition",
    "Wire CRM follow-up and lead routing",
    "Optimize weekly against qualified pipeline",
  ],
  faqs: DIGITAL_MARKETING_FAQS,
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
  tagline: "Engineering Data. Empowering Decisions.",
  description:
    "Build intelligent, scalable and reliable data ecosystems that transform complex information into actionable business insights.",
  heroVisual: "ai",
  showAllFeatures: true,
  showProcess: true,
  seo: {
    title: "Data Engineering Services",
    description:
      "Data pipelines, warehousing, integration, governance, cloud platforms, analytics, and AI-ready infrastructure from Commiters.",
    keywords:
      "data engineering, ETL, ELT, data warehouse, Apache Spark, Snowflake, BigQuery, data pipeline, Commiters",
  },
  about: {
    what: "We design pipelines, warehouses, and models that turn source systems into data a team can query and govern.",
    why: "Decisions stall when every tool holds a different extract. A maintained pipeline keeps one definition of the record.",
    who: "Operations, product, and finance teams that need reliable data plumbing rather than another one-off export.",
  },
  problem: {
    title: "The bottleneck we remove",
    lead: "When every tool holds a different version of the truth, teams spend the week reconciling instead of deciding.",
    points: [
      "Source systems do not share a model.",
      "Reporting is rebuilt by hand.",
      "Pipelines fail quietly because nobody owns them.",
      "Analytics and models wait on exports that arrive late.",
    ],
  },
  features: DATA_ENGINEERING_FEATURES,
  technologies: DATA_TECH,
  processSteps: [
    "Collect the source systems and events",
    "Ingest on a schedule or a stream",
    "Transform into one shared model",
    "Store in a warehouse, lake, or lakehouse",
    "Expose the models to analytics",
    "Monitor freshness, failures, and cost",
  ],
  faqs: [
    {
      question: "What is Data Engineering?",
      answer:
        "Data engineering is the work of collecting, moving, transforming, and storing data so people and systems can use it reliably. It covers pipelines, models, storage, and the checks that keep that data current.",
    },
    {
      question: "What is the difference between ETL and ELT?",
      answer:
        "ETL transforms data before it lands in the destination. ELT loads raw data first and transforms it inside the warehouse. We choose the pattern from the source volume, the warehouse, and who needs to change the models later.",
    },
    {
      question: "Which cloud platforms do you support?",
      answer: "AWS, Microsoft Azure, and Google Cloud. The pipeline is designed for the platform your team already operates.",
    },
    {
      question: "Can you integrate multiple data sources?",
      answer:
        "Yes. APIs, databases, files, and third-party tools can land in one model, with a documented definition for each entity.",
    },
    {
      question: "Do you provide real-time data processing?",
      answer:
        "Yes, where the decision needs it. Event streams and scheduled batches can sit in the same platform, and we use streaming only when freshness requires it.",
    },
    {
      question: "Can you modernize existing data infrastructure?",
      answer:
        "Yes. We move batch files and aging databases onto maintained pipelines and cloud storage, and we keep the current reports running while the new path is proven.",
    },
  ],
  timeline: [
    { label: "Single pipeline", duration: "Scoped per source" },
    { label: "Warehouse and core models", duration: "Scoped after discovery" },
    { label: "Reporting and ownership", duration: "Scoped with the warehouse" },
  ],
  pricing: SERVICE_DEFAULT_PRICING,
  portfolio: [],
};

export const INSURANCE_TECHNOLOGY_SERVICE: ServiceDetail = {
  slug: "insurance",
  gridId: "insurance",
  title: "Insurance",
  heroHeadline: "Building Smarter Digital Insurance Experiences.",
  primaryCtaLabel: "Explore Our Solutions",
  primaryCtaTo: "#ins-services",
  quoteCtaLabel: "Request a Quote",
  tagline:
    "We build secure, scalable and intelligent insurance technology solutions that simplify policy management, automate claims processing and transform customer experiences.",
  description:
    "From digital insurance platforms to AI-powered automation, Commiters helps insurance businesses modernize operations, improve efficiency and deliver seamless digital experiences.",
  heroVisual: "automation",
  showAllFeatures: true,
  showProcess: true,
  seo: {
    title: "Insurance Software & InsurTech Development",
    description:
      "Custom insurance platforms for policy management, claims, portals, payments, and AI-assisted workflows from Commiters.",
    keywords:
      "insurance software development, InsurTech, policy management system, claims management software, insurance portal, Commiters",
  },
  about: {
    what: "We design insurance platforms that connect policy records, claims, payments, and the people who use them.",
    why: "Legacy desks split the same policy across portals and spreadsheets. A shared system keeps the record and the workflow together.",
    who: "Insurers and InsurTech teams that need the platform, and US P&C agencies that also need the administration desk run.",
  },
  problem: {
    title: "The bottleneck we remove",
    lead: "Policy, claim, and payment work stalls when each step lives in a different tool.",
    points: [
      "Issuance and renewal depend on manual re-entry.",
      "Claims status is hard for the customer to see.",
      "Agent and customer views do not share one record.",
      "Reports are rebuilt after the work is already done.",
    ],
  },
  features: INSURANCE_TECH_FEATURES,
  technologies: [
    { slug: "react", alt: "React" },
    { slug: "nextdotjs", alt: "Next.js" },
    { slug: "nodedotjs", alt: "Node.js" },
    { slug: "python", alt: "Python" },
    { slug: "postgresql", alt: "PostgreSQL" },
    { slug: "googlecloud", alt: "Google Cloud" },
  ],
  processSteps: INSURANCE_TECH_FLOW.map((step) => step.title),
  faqs: INSURANCE_TECH_FAQS,
  timeline: [
    { label: "Discovery and workflow map", duration: "Scoped per product" },
    { label: "Core policy and portal build", duration: "Scoped after discovery" },
    { label: "Claims, payments, and reporting", duration: "Scoped with the core" },
  ],
  pricing: SERVICE_DEFAULT_PRICING,
  portfolio: [],
};

export const OPERATIONS_LANDING_SERVICES: ServiceDetail[] = [
  DIGITAL_MARKETING_SERVICE,
  DATA_ENGINEERING_SERVICE,
  INSURANCE_TECHNOLOGY_SERVICE,
];
