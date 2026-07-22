import { ROUTES } from "../routes";
import { HOME_TESTIMONIALS } from "../siteTrustContent";
import type { ServiceDetail } from "./types";
import {
  SERVICE_DEFAULT_INDUSTRIES,
  SERVICE_DEFAULT_PRICING,
  SERVICE_DEFAULT_TIMELINE,
  SERVICE_DEFAULT_WHY_CHOOSE,
  SERVICE_PROCESS_STEPS,
  buildDefaultFaqs,
} from "./sharedContent";

const WEB_TECH = [
  { slug: "react", alt: "React" },
  { slug: "nextdotjs", alt: "Next.js" },
  { slug: "typescript", alt: "TypeScript" },
  { slug: "nodedotjs", alt: "Node.js" },
  { slug: "tailwindcss", alt: "Tailwind CSS" },
  { slug: "postgresql", alt: "PostgreSQL" },
  { slug: "amazonaws", alt: "AWS" },
  { slug: "docker", alt: "Docker" },
];

const APP_TECH = [
  { slug: "react", alt: "React" },
  { slug: "nextdotjs", alt: "Next.js" },
  { slug: "nodedotjs", alt: "Node.js" },
  { slug: "express", alt: "Express" },
  { slug: "mongodb", alt: "MongoDB" },
  { slug: "postgresql", alt: "PostgreSQL" },
  { slug: "amazonaws", alt: "AWS" },
  { slug: "kubernetes", alt: "Kubernetes" },
];

const MOBILE_TECH = [
  { slug: "react", alt: "React Native" },
  { slug: "typescript", alt: "TypeScript" },
  { slug: "firebase", alt: "Firebase" },
  { slug: "nodedotjs", alt: "Node.js" },
  { slug: "postgresql", alt: "PostgreSQL" },
  { slug: "amazonaws", alt: "AWS" },
];

const AI_TECH = [
  { slug: "python", alt: "Python" },
  { slug: "openai", alt: "OpenAI" },
  { slug: "langchain", alt: "LangChain" },
  { slug: "nodedotjs", alt: "Node.js" },
  { slug: "postgresql", alt: "PostgreSQL" },
  { slug: "googlecloud", alt: "Google Cloud" },
];

const AUTOMATION_TECH = [
  { slug: "python", alt: "Python" },
  { slug: "nodedotjs", alt: "Node.js" },
  { slug: "docker", alt: "Docker" },
  { slug: "amazonaws", alt: "AWS" },
  { slug: "postgresql", alt: "PostgreSQL" },
];

const ECOMMERCE_TECH = [
  { slug: "shopify", alt: "Shopify" },
  { slug: "react", alt: "React" },
  { slug: "nextdotjs", alt: "Next.js" },
  { slug: "stripe", alt: "Stripe" },
  { slug: "nodedotjs", alt: "Node.js" },
  { slug: "postgresql", alt: "PostgreSQL" },
  { slug: "amazonaws", alt: "AWS" },
];

export const SERVICE_ICON_SLUGS: Record<string, string> = {
  website: "website-development",
  webapp: "web-application-development",
  mobile: "mobile-app-development",
  ecommerce: "e-commerce-development",
  automation: "automation-tools",
  ai: "ai-integration",
  mvp: "mvp-development",
};

const MVP_TECH = [
  { slug: "react", alt: "React" },
  { slug: "nextdotjs", alt: "Next.js" },
  { slug: "nodedotjs", alt: "Node.js" },
  { slug: "firebase", alt: "Firebase" },
  { slug: "postgresql", alt: "PostgreSQL" },
  { slug: "vercel", alt: "Vercel" },
];

function testimonialsFromHome(indices: number[]) {
  return indices.map((index) => {
    const item = HOME_TESTIMONIALS[index];
    return {
      quote: item.quote,
      name: item.name,
      company: item.company,
    };
  });
}

export const SERVICES_CATALOG: ServiceDetail[] = [
  {
    slug: "website-development",
    gridId: "website-development",
    title: "Website Development",
    tagline: "High-conversion websites engineered for speed, trust, and search visibility.",
    description:
      "We design and build marketing sites and enterprise portals with performance, accessibility, and SEO as first-class requirements.",
    heroVisual: "website",
    seo: {
      title: "Website Development Services",
      description:
        "Professional website development for high-conversion marketing sites and enterprise portals. Fast, SEO-friendly, and built to scale.",
      keywords: "website development, corporate website, landing page development, SEO website",
    },
    about: {
      what: "Website development covers everything from brand-led marketing sites to multi-locale enterprise portals with CMS integration and analytics.",
      why: "Your website is often the first proof of credibility. Slow, outdated, or confusing experiences cost leads before sales ever gets involved.",
      who: "Marketing teams, local businesses, SaaS companies, and founders who need a premium web presence that converts.",
    },
    features: [
      { title: "Responsive Design", description: "Flawless layouts across mobile, tablet, and desktop breakpoints.", icon: "responsive" },
      { title: "High Performance", description: "Optimized assets, lazy loading, and Core Web Vitals-focused builds.", icon: "performance" },
      { title: "SEO Friendly", description: "Semantic markup, metadata, structured data, and crawl-friendly architecture.", icon: "seo" },
      { title: "Secure Architecture", description: "Hardened forms, HTTPS, and safe deployment patterns by default.", icon: "secure" },
      { title: "Easy Maintenance", description: "Component-driven codebases your team can extend without friction.", icon: "maintain" },
      { title: "Scalable Solution", description: "Modular structure ready for new pages, locales, and integrations.", icon: "scale" },
    ],
    technologies: WEB_TECH,
    processSteps: [...SERVICE_PROCESS_STEPS],
    timeline: SERVICE_DEFAULT_TIMELINE,
    pricing: SERVICE_DEFAULT_PRICING,
    industries: [...SERVICE_DEFAULT_INDUSTRIES],
    whyChoose: SERVICE_DEFAULT_WHY_CHOOSE,
    portfolio: [
      {
        title: "Commiters.com",
        tag: "Website",
        description: "Our own site — designed and built from scratch with performance and conversion in mind.",
        href: "https://www.commiters.com/",
        external: true,
      },
      {
        title: "NextSaas Marketing Site",
        tag: "Website",
        description: "Conversion-focused SaaS landing experience with modular content sections.",
        href: ROUTES.nextsaasCaseStudy,
      },
    ],
    testimonials: testimonialsFromHome([0, 2]),
    faqs: buildDefaultFaqs("Website Development"),
  },
  {
    slug: "web-application-development",
    gridId: "web-applications",
    title: "Web Application Development",
    tagline: "Custom platforms built for scale, security, and long-term product velocity.",
    description:
      "We engineer data-driven web applications with robust API layers, role-based access, and architecture that survives real-world growth.",
    heroVisual: "webapp",
    seo: {
      title: "Web Application Development Services",
      description:
        "Custom web application development with React, Node.js, and cloud-native architecture. Scalable dashboards, SaaS platforms, and internal tools.",
      keywords: "web application development, SaaS development, custom web app, React development",
    },
    about: {
      what: "Web application development delivers interactive products — dashboards, SaaS platforms, customer portals, and internal ops tools — beyond static marketing pages.",
      why: "Off-the-shelf software rarely matches your workflows. Custom apps reduce manual work, unify data, and create defensible product advantages.",
      who: "Founders, product teams, and enterprises building customer-facing or internal platforms with complex logic and integrations.",
    },
    features: [
      { title: "Scalable Solution", description: "Service-oriented architecture that grows with users and data volume.", icon: "scale" },
      { title: "Secure Architecture", description: "Auth, RBAC, audit trails, and secure API design from sprint one.", icon: "secure" },
      { title: "High Performance", description: "Efficient queries, caching strategies, and responsive UI under load.", icon: "performance" },
      { title: "Easy Maintenance", description: "Typed codebases, tests, and documentation for sustainable iteration.", icon: "maintain" },
      { title: "Responsive Design", description: "Operator-grade experiences across desktop and mobile browsers.", icon: "responsive" },
      { title: "SEO Friendly", description: "Public-facing modules optimized for discoverability where relevant.", icon: "seo" },
    ],
    technologies: APP_TECH,
    processSteps: [...SERVICE_PROCESS_STEPS],
    timeline: [
      { label: "MVP Web App", duration: "4–8 Weeks" },
      { label: "Growth-Stage Platform", duration: "2–4 Months" },
      { label: "Enterprise Application", duration: "3–6 Months" },
      { label: "Multi-Tenant SaaS", duration: "4–8 Months" },
    ],
    pricing: SERVICE_DEFAULT_PRICING,
    industries: [...SERVICE_DEFAULT_INDUSTRIES],
    whyChoose: SERVICE_DEFAULT_WHY_CHOOSE,
    portfolio: [
      {
        title: "Multi-Role CRM",
        tag: "Web App",
        description: "Role-based CRM with generative AI workflows and operator dashboards.",
        href: ROUTES.multiRoleCrmCaseStudy,
      },
      {
        title: "Customer Service Portal",
        tag: "Web App",
        description: "Ticketing, routing, and SLA dashboards for distributed support teams.",
        href: ROUTES.contact,
      },
    ],
    testimonials: testimonialsFromHome([0, 1]),
    faqs: buildDefaultFaqs("Web Application Development"),
  },
  {
    slug: "mobile-app-development",
    gridId: "mobile-applications",
    title: "Mobile App Development",
    tagline: "Native-quality mobile experiences with cross-platform efficiency.",
    description:
      "We build iOS and Android applications that feel fluid, offline-resilient, and deeply integrated with your backend systems.",
    heroVisual: "mobile",
    seo: {
      title: "Mobile App Development Services",
      description:
        "Mobile app development for iOS and Android using React Native and modern cloud backends. Performance-first, user-centric delivery.",
      keywords: "mobile app development, iOS app, Android app, React Native development",
    },
    about: {
      what: "Mobile app development spans consumer apps, field-service tools, and companion apps for web platforms — designed for real devices and real networks.",
      why: "Mobile is where daily engagement happens. A polished app increases retention, enables push-driven workflows, and unlocks on-the-go revenue.",
      who: "Startups validating mobile-first ideas and businesses extending their product to iOS and Android users.",
    },
    features: [
      { title: "Responsive Design", description: "Adaptive layouts tuned for phone and tablet form factors.", icon: "responsive" },
      { title: "High Performance", description: "Smooth animations, optimized bundles, and efficient native bridges.", icon: "performance" },
      { title: "Secure Architecture", description: "Secure storage, token handling, and API hardening for mobile clients.", icon: "secure" },
      { title: "Scalable Solution", description: "Backend contracts and release pipelines built for app store cadence.", icon: "scale" },
      { title: "Easy Maintenance", description: "Shared component libraries and OTA-friendly update strategies.", icon: "maintain" },
      { title: "SEO Friendly", description: "App Store Optimization guidance and deep-link ready web fallbacks.", icon: "seo" },
    ],
    technologies: MOBILE_TECH,
    processSteps: [...SERVICE_PROCESS_STEPS],
    timeline: [
      { label: "MVP Mobile App", duration: "4–6 Weeks" },
      { label: "Feature-Rich App", duration: "2–3 Months" },
      { label: "Enterprise Mobile Suite", duration: "3–6 Months" },
    ],
    pricing: SERVICE_DEFAULT_PRICING,
    industries: [...SERVICE_DEFAULT_INDUSTRIES],
    whyChoose: SERVICE_DEFAULT_WHY_CHOOSE,
    portfolio: [
      {
        title: "NearDrop MVP",
        tag: "Mobile",
        description: "Location-aware MVP validating core user flows on iOS and Android.",
        href: ROUTES.neardropCaseStudy,
      },
    ],
    testimonials: testimonialsFromHome([1, 2]),
    faqs: buildDefaultFaqs("Mobile App Development"),
  },
  {
    slug: "e-commerce-development",
    gridId: "e-commerce-development",
    title: "E-commerce Development",
    tagline: "Conversion-focused storefronts built to sell, scale, and integrate.",
    description:
      "We design and build Shopify, WooCommerce, and custom commerce platforms with fast checkout, inventory sync, and analytics that drive revenue.",
    heroVisual: "ecommerce",
    seo: {
      title: "E-commerce Development Services",
      description:
        "E-commerce development for Shopify, custom storefronts, and headless commerce. Fast checkout, payment integration, and scalable product catalogs.",
      keywords: "e-commerce development, Shopify development, online store, headless commerce",
    },
    about: {
      what: "E-commerce development covers storefront UX, product catalogs, payments, fulfillment integrations, and admin tooling for online retail.",
      why: "Generic templates limit conversion and operations. Custom commerce experiences improve trust, checkout completion, and integration with your back office.",
      who: "D2C brands, retailers, and B2B sellers launching or replatforming their online store.",
    },
    features: [
      { title: "Responsive Design", description: "Mobile-first shopping experiences optimized for thumb-friendly checkout.", icon: "responsive" },
      { title: "High Performance", description: "Fast product pages, image optimization, and edge-friendly delivery.", icon: "performance" },
      { title: "Secure Architecture", description: "PCI-aware payment flows, fraud-safe checkout, and hardened admin access.", icon: "secure" },
      { title: "Scalable Solution", description: "Catalog, cart, and order systems ready for seasonal traffic spikes.", icon: "scale" },
      { title: "Easy Maintenance", description: "CMS-friendly product updates and modular theme components.", icon: "maintain" },
      { title: "SEO Friendly", description: "Structured product data, clean URLs, and category pages built to rank.", icon: "seo" },
    ],
    technologies: ECOMMERCE_TECH,
    processSteps: [...SERVICE_PROCESS_STEPS],
    timeline: [
      { label: "Starter Store", duration: "2–4 Weeks" },
      { label: "Custom Storefront", duration: "4–8 Weeks" },
      { label: "Headless Commerce Platform", duration: "2–4 Months" },
    ],
    pricing: SERVICE_DEFAULT_PRICING,
    industries: ["E-commerce", "Retail", "Fashion", "Food & Beverage", "Healthcare", "Startups"],
    whyChoose: SERVICE_DEFAULT_WHY_CHOOSE,
    portfolio: [
      {
        title: "NextSaas Marketing Site",
        tag: "E-commerce Ready",
        description: "Conversion-focused product storytelling with modular landing sections.",
        href: ROUTES.nextsaasCaseStudy,
      },
      {
        title: "Commiters.com",
        tag: "Website",
        description: "Lead-generation site with CMS-driven content and performance-first delivery.",
        href: "https://www.commiters.com/",
        external: true,
      },
    ],
    testimonials: testimonialsFromHome([0, 2]),
    faqs: buildDefaultFaqs("E-commerce Development"),
  },
  {
    slug: "ai-integration",
    gridId: "ai-integration",
    title: "AI Integration",
    tagline: "Production-ready LLM and automation layers wired into your product.",
    description:
      "We embed LLMs, RAG pipelines, and custom ML workflows into existing products — with guardrails, evaluation, and observability.",
    heroVisual: "ai",
    seo: {
      title: "AI Integration Services",
      description:
        "AI integration for LLMs, RAG, and workflow automation. Embed intelligent features into your web and mobile products safely.",
      keywords: "AI integration, LLM integration, RAG development, AI automation",
    },
    about: {
      what: "AI integration connects large language models, retrieval systems, and automation agents to your apps, CRMs, and internal tools.",
      why: "Teams that ship AI features early gain efficiency and differentiation — but only if integrations are reliable, secure, and measurable.",
      who: "SaaS products, support teams, and operations leaders adding copilots, summarization, or autonomous workflows.",
    },
    features: [
      { title: "Scalable Solution", description: "Queue-backed inference and caching for cost-aware AI at scale.", icon: "scale" },
      { title: "Secure Architecture", description: "Prompt injection defenses, PII handling, and access-controlled contexts.", icon: "secure" },
      { title: "High Performance", description: "Streaming responses and latency budgets tuned for user-facing flows.", icon: "performance" },
      { title: "Easy Maintenance", description: "Evaluation harnesses and versioned prompts for safe iteration.", icon: "maintain" },
      { title: "AI Workflows", description: "Multi-step agents orchestrated with human-in-the-loop checkpoints.", icon: "ai" },
      { title: "SEO Friendly", description: "Public AI-assisted content modules optimized where applicable.", icon: "seo" },
    ],
    technologies: AI_TECH,
    processSteps: [...SERVICE_PROCESS_STEPS],
    timeline: [
      { label: "AI Feature Pilot", duration: "2–4 Weeks" },
      { label: "Production Copilot", duration: "1–2 Months" },
      { label: "Enterprise AI Platform", duration: "3–5 Months" },
    ],
    pricing: SERVICE_DEFAULT_PRICING,
    industries: [...SERVICE_DEFAULT_INDUSTRIES],
    whyChoose: SERVICE_DEFAULT_WHY_CHOOSE,
    portfolio: [
      {
        title: "AI Summariser",
        tag: "AI Tool",
        description: "Multi-modal summarization with evaluation hooks and production guardrails.",
        href: ROUTES.aiSummarizerCaseStudy,
      },
      {
        title: "Multi-Role CRM AI",
        tag: "AI Integration",
        description: "Generative workflows embedded in operator and sales tooling.",
        href: ROUTES.multiRoleCrmCaseStudy,
      },
    ],
    testimonials: testimonialsFromHome([1, 2]),
    faqs: buildDefaultFaqs("AI Integration"),
  },
  {
    slug: "mvp-development",
    gridId: "mvp-development",
    title: "MVP Development",
    tagline: "Validate your idea in weeks — not quarters.",
    description:
      "We focus on the core value proposition, ship a testable MVP fast, and set foundations for the features that matter next.",
    heroVisual: "mvp",
    seo: {
      title: "MVP Development Services",
      description:
        "MVP development for founders who need to launch fast. Scope discipline, rapid prototyping, and production-ready foundations.",
      keywords: "MVP development, startup MVP, product validation, rapid prototyping",
    },
    about: {
      what: "MVP development delivers the smallest lovable product that proves demand — core flows, auth, payments, and analytics where needed.",
      why: "Speed to learning beats perfection. A focused MVP reduces burn, attracts investors, and generates real user signal.",
      who: "First-time founders, corporate innovation teams, and product leaders testing new market bets.",
    },
    features: [
      { title: "MVP Focus", description: "Ruthless scope control around the one workflow that proves value.", icon: "mvp" },
      { title: "High Performance", description: "Lean architecture without cutting corners on reliability.", icon: "performance" },
      { title: "Scalable Solution", description: "Foundations that support v2 features without a rewrite.", icon: "scale" },
      { title: "Secure Architecture", description: "Auth, data isolation, and deployment hygiene from day one.", icon: "secure" },
      { title: "Easy Maintenance", description: "Clear handoff docs and modular code for your next hire.", icon: "maintain" },
      { title: "Responsive Design", description: "Investor-ready UI that works across devices.", icon: "responsive" },
    ],
    technologies: MVP_TECH,
    processSteps: [...SERVICE_PROCESS_STEPS],
    timeline: [
      { label: "Idea Validation MVP", duration: "3–5 Weeks" },
      { label: "Funded Startup MVP", duration: "6–10 Weeks" },
      { label: "Pilot with Paying Users", duration: "2–3 Months" },
    ],
    pricing: SERVICE_DEFAULT_PRICING,
    industries: ["Startups", "Finance", "Healthcare", "Education", "E-commerce", "Travel"],
    whyChoose: SERVICE_DEFAULT_WHY_CHOOSE,
    portfolio: [
      {
        title: "NearDrop MVP",
        tag: "MVP",
        description: "Concept-to-market MVP with focused scope and rapid iteration cycles.",
        href: ROUTES.neardropCaseStudy,
      },
    ],
    testimonials: testimonialsFromHome([0, 1]),
    faqs: buildDefaultFaqs("MVP Development"),
  },
  {
    slug: "automation-tools",
    gridId: "automation-tools",
    title: "Automation Tools",
    tagline: "Eliminate repetitive work with bespoke internal tools and integrations.",
    description:
      "We connect your data sources, automate manual workflows, and build operator dashboards that save hours every week.",
    heroVisual: "automation",
    seo: {
      title: "Automation Tools Development",
      description:
        "Custom automation tools, internal dashboards, and workflow integrations. Connect APIs, eliminate manual tasks, unify data.",
      keywords: "automation tools, workflow automation, internal tools, business process automation",
    },
    about: {
      what: "Automation tools include scripts, schedulers, admin panels, and integrations that move data between the systems your team already uses.",
      why: "Manual copy-paste and spreadsheet workflows don't scale. Automation reduces errors, frees engineers, and surfaces real-time visibility.",
      who: "Operations teams, agencies, and growing companies drowning in repetitive back-office tasks.",
    },
    features: [
      { title: "Automation Workflows", description: "Event-driven jobs, webhooks, and scheduled pipelines.", icon: "automation" },
      { title: "Secure Architecture", description: "Credential vaulting, least-privilege API access, and audit logs.", icon: "secure" },
      { title: "Scalable Solution", description: "Queue workers and idempotent jobs that handle volume spikes.", icon: "scale" },
      { title: "Easy Maintenance", description: "Monitoring, alerts, and runbooks for every critical automation.", icon: "maintain" },
      { title: "High Performance", description: "Batch processing and parallel workers tuned for throughput.", icon: "performance" },
      { title: "Responsive Design", description: "Operator dashboards usable on desktop and tablet.", icon: "responsive" },
    ],
    technologies: AUTOMATION_TECH,
    processSteps: [...SERVICE_PROCESS_STEPS],
    timeline: [
      { label: "Single Workflow Automation", duration: "1–2 Weeks" },
      { label: "Multi-System Integration", duration: "3–6 Weeks" },
      { label: "Ops Platform", duration: "2–4 Months" },
    ],
    pricing: SERVICE_DEFAULT_PRICING,
    industries: [...SERVICE_DEFAULT_INDUSTRIES],
    whyChoose: SERVICE_DEFAULT_WHY_CHOOSE,
    portfolio: [
      {
        title: "Internal Ops Dashboard",
        tag: "Automation",
        description: "Role-based admin tooling with audit trails and exportable reports.",
        href: ROUTES.contact,
      },
    ],
    testimonials: testimonialsFromHome([2, 0]),
    faqs: buildDefaultFaqs("Automation Tools"),
  },
];

export const SERVICE_SLUGS = SERVICES_CATALOG.map((service) => service.slug);

export function getServiceBySlug(slug: string): ServiceDetail | undefined {
  return SERVICES_CATALOG.find((service) => service.slug === slug);
}

export function getServiceByGridId(gridId: string): ServiceDetail | undefined {
  return SERVICES_CATALOG.find((service) => service.gridId === gridId);
}

export function buildServiceDetailPath(slug: string): string {
  return `/services/${slug}`;
}

export function resolveServiceDetailHref(options: {
  id?: string;
  title?: string;
  icon?: string;
}): string {
  const { id, title, icon } = options;

  if (id) {
    const byGrid = getServiceByGridId(id);
    if (byGrid) return buildServiceDetailPath(byGrid.slug);
    const bySlug = getServiceBySlug(id);
    if (bySlug) return buildServiceDetailPath(bySlug.slug);
  }

  if (icon && SERVICE_ICON_SLUGS[icon]) {
    const byIcon = getServiceBySlug(SERVICE_ICON_SLUGS[icon]);
    if (byIcon) return buildServiceDetailPath(byIcon.slug);
  }

  if (title) {
    const normalized = title.trim().toLowerCase();
    const byTitle = SERVICES_CATALOG.find((service) => service.title.toLowerCase() === normalized);
    if (byTitle) return buildServiceDetailPath(byTitle.slug);
  }

  return buildServiceDetailPath(SERVICE_ICON_SLUGS.website);
}
