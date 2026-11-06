import { caseStudyImageAlt, caseStudyImageSrc, caseStudyImageSrcSet } from "./caseStudiesPageAssets";
import { HOME_LEAD_MAGNET_FORM_ID } from "./homeLeadMagnetContent";
import type { PlannerTypeId } from "./homePlannerData";
import { OPSFLOW_HERO } from "./opsFlowPageContent";
import { ROUTES } from "./routes";
import { STUDIO_PRODUCTS } from "./studioProducts";
import { buildServiceDetailPath } from "./services";
import { buildWhatsAppUrl } from "./siteContact";
import { TRUSTTAP_HERO, TRUSTTAP_HERO_SHOWCASE } from "./trustTapPageContent";

export const HOME_DEMO_PAGE_CLASS = "home-demo-page" as const;
export const HOME_DEMO_FINDER_ID = "finder" as const;
export const HOME_DEMO_SOLUTIONS_ID = "solutions" as const;
export const HOME_DEMO_WORK_ID = "work" as const;
export const HOME_DEMO_FAQ_ID = "faq" as const;
export const HOME_DEMO_CTA_ID = "contact" as const;

export const HOME_DEMO_COPY = {
  hero: {
    eyebrow: "ENTERPRISE AI · CLOUD · SOFTWARE",
    titleBefore: "Engineered systems for ",
    titleAccent: "serious operations.",
    titleAfter: "",
    title: "Engineered systems for serious operations.",
    lead: "Commiters designs and ships enterprise AI, cloud platforms, and operational software—spec-driven, policy-aware, and built to hold in production.",
    primaryCta: "Find your system",
    primaryHref: `#${HOME_DEMO_SOLUTIONS_ID}`,
    secondaryCta: "View selected work",
    secondaryHref: `#${HOME_DEMO_WORK_ID}`,
    checks: ["Spec-driven delivery", "Governed AI by default", "From brief to launch"],
  },
  servicesCarousel: {
    id: "home-services",
    eyebrow: "OUR SERVICES",
    title: "One engagement. One precise next step.",
    exploreLabel: "View service",
    previousLabel: "Previous service",
    nextLabel: "Next service",
    counterSuffix: "Services",
    items: [
      {
        id: "websites",
        num: "01",
        kicker: "DIGITAL PRESENCE",
        title: "Websites & E-commerce",
        description:
          "Plan and build a responsive business website or online store with a clear path from discovery to enquiry.",
        capabilities: ["Business websites", "Online stores", "Landing pages & redesigns"],
        alt: "Laptop showing a website analytics dashboard",
        image: "/assets/services/website-development.jpg",
        to: buildServiceDetailPath("website-development"),
      },
      {
        id: "software",
        num: "02",
        kicker: "DIGITAL PRODUCTS",
        title: "Custom Software & SaaS",
        description:
          "Web applications, dashboards, portals, and software tailored to the way your team already works.",
        capabilities: ["Role-based platforms", "Dashboards & APIs", "SaaS product delivery"],
        alt: "Business software dashboard with charts and records",
        image: "/assets/services/web-applications.jpg",
        to: ROUTES.webApplications,
      },
      {
        id: "ai",
        num: "03",
        kicker: "SMART WORKFLOWS",
        title: "AI & Automation",
        description:
          "Practical AI integrations and workflow automation that reduce repetitive work while keeping human review in place.",
        capabilities: ["Document processing", "Workflow automation", "Governed AI assistants"],
        alt: "Abstract visualisation of connected AI workflows",
        image: "/assets/services/ai-integration.jpg",
        to: ROUTES.workflowAutomation,
      },
      {
        id: "cloud",
        num: "04",
        kicker: "RELIABLE SYSTEMS",
        title: "Cloud & DevOps",
        description:
          "Deployment, cloud architecture, monitoring, and infrastructure support so applications stay reliable as they grow.",
        capabilities: ["Cloud architecture", "CI/CD & monitoring", "Performance & access"],
        alt: "Server infrastructure for cloud deployment",
        image: "/assets/home/server-racks.png",
        to: ROUTES.webApplications,
      },
      {
        id: "mobile",
        num: "05",
        kicker: "ON THE GO",
        title: "Mobile Applications",
        description:
          "iOS and Android applications that feel fluid, stay connected to your backend, and support day-to-day field or customer use.",
        capabilities: ["iOS & Android", "Cross-platform delivery", "Backend integration"],
        alt: "Mobile application screens on a device",
        image: "/assets/services/mobile-applications.jpg",
        to: buildServiceDetailPath("mobile-app-development"),
      },
      {
        id: "enterprise",
        num: "06",
        kicker: "CONNECTED OPERATIONS",
        title: "Enterprise & Business Solutions",
        description:
          "Role-based portals, operations dashboards, and connected business applications designed around your processes.",
        capabilities: ["Operations portals", "Team workflows", "System integrations"],
        alt: "Enterprise operations dashboard on a laptop",
        image: "/assets/services/mvp-development.jpg",
        to: ROUTES.services,
      },
    ],
  },
  problems: {
    eyebrow: "OPERATIONAL GAPS",
    title: "The problems we design against.",
    lead: "Name the constraint. We will shape the system, the scope, and the first move.",
    cta: "Brief a challenge",
    ctaTo: ROUTES.contact,
    items: [
      {
        id: "website",
        num: "01",
        pick: "web" as PlannerTypeId,
        title: "“We need a professional website.”",
        body: "Plan and build a responsive business website or e-commerce experience.",
      },
      {
        id: "spreadsheets",
        num: "02",
        pick: "software" as PlannerTypeId,
        title: "“Our process is spread across spreadsheets and tools.”",
        body: "Explore a connected dashboard, portal, or custom business application.",
      },
      {
        id: "manual",
        num: "03",
        pick: "ai" as PlannerTypeId,
        title: "“Our team repeats the same manual tasks every day.”",
        body: "Identify suitable workflows for automation or AI-assisted processing.",
      },
      {
        id: "reliable",
        num: "04",
        pick: "cloud" as PlannerTypeId,
        title: "“Our application needs a more reliable setup.”",
        body: "Review deployment, cloud infrastructure, monitoring, and performance.",
      },
      {
        id: "improve",
        num: "05",
        pick: "modernize" as PlannerTypeId,
        title: "“We already have a product, but it needs improvement.”",
        body: "Prioritize fixes, integrations, modernization, and future enhancements.",
      },
    ],
  },
  needs: {
    id: HOME_DEMO_SOLUTIONS_ID,
    eyebrow: "BEGIN WITH THE OUTCOME",
    title: "What should the system do?",
    lead: "You do not need the technical vocabulary. Start with the result; we will recommend the architecture.",
    items: [
      {
        id: "web",
        icon: "⌘",
        pick: "web" as PlannerTypeId,
        title: "Website & E-commerce",
        body: "Business websites, landing pages, online stores, redesigns, and customer-facing web experiences.",
      },
      {
        id: "software",
        icon: "▦",
        pick: "software" as PlannerTypeId,
        title: "Custom Software & SaaS",
        body: "Web applications, dashboards, portals, booking platforms, APIs, and software tailored to your process.",
      },
      {
        id: "ai",
        icon: "✳",
        pick: "ai" as PlannerTypeId,
        title: "AI & Workflow Automation",
        body: "AI integrations, document processing, assistants, and practical automation for repetitive business tasks.",
      },
      {
        id: "systems",
        icon: "▤",
        pick: "business" as PlannerTypeId,
        title: "Business Systems",
        body: "Role-based portals, operations dashboards, employee workflows, and connected business applications.",
      },
      {
        id: "cloud",
        icon: "☁",
        pick: "cloud" as PlannerTypeId,
        title: "Cloud & DevOps",
        body: "Deployment, cloud architecture, CI/CD, monitoring, performance improvements, and infrastructure support.",
      },
      {
        id: "improve",
        icon: "↗",
        pick: "modernize" as PlannerTypeId,
        title: "Improve an Existing Product",
        body: "Modernization, integrations, bug fixing, performance reviews, and planned product improvements.",
      },
    ],
  },
  finder: {
    id: HOME_DEMO_FINDER_ID,
    legacyId: HOME_LEAD_MAGNET_FORM_ID,
    eyebrow: "PROJECT BRIEF",
    title: "A blueprint, before the first conversation.",
    lead: "Choose a project type and answer only what applies. You leave with a brief you can download or send.",
  },
  work: {
    id: HOME_DEMO_WORK_ID,
    eyebrow: "SELECTED WORK",
    title: "Systems already in the world.",
    lead: "Live platforms from the studio: travel, document automation, merchant reviews, and governed product surfaces.",
    note: "The full Work portfolio holds the remaining studies.",
    allWorkCta: "View the portfolio",
    allWorkTo: ROUTES.caseStudies,
    items: [
      {
        id: "browse-my-vacation",
        kicker: "TRAVEL PLATFORM",
        title: "BrowseMyVacation",
        body: "A B2C/B2B travel platform with packages, search, and custom quote workflows.",
        cta: "Read the study",
        to: ROUTES.browseMyVacationCaseStudy,
        image: caseStudyImageSrc("browse-my-vacation"),
        imageSrcSet: caseStudyImageSrcSet("browse-my-vacation"),
        alt: caseStudyImageAlt("browse-my-vacation"),
      },
      {
        id: "opsflow",
        kicker: "DOCUMENT AUTOMATION",
        title: "OpsFlow AI",
        body: OPSFLOW_HERO.subheadline,
        cta: "Explore OpsFlow AI",
        to: ROUTES.opsFlow,
        image: caseStudyImageSrc("opsflow"),
        imageSrcSet: caseStudyImageSrcSet("opsflow"),
        alt: caseStudyImageAlt("opsflow"),
      },
      {
        id: "prooflyn",
        kicker: "MERCHANT REVIEWS",
        title: "Prooflyn",
        body: TRUSTTAP_HERO.tagline,
        cta: "Explore Prooflyn",
        to: ROUTES.trustTap,
        image: TRUSTTAP_HERO_SHOWCASE.image.src,
        imageSrcSet: TRUSTTAP_HERO_SHOWCASE.image.srcSet,
        alt: TRUSTTAP_HERO_SHOWCASE.image.alt,
      },
    ],
  },
  products: {
    eyebrow: "STUDIO PRODUCTS",
    title: "Platforms we operate.",
    lead: "Terminal for screens, onboarding, and curriculum. Synapse for people, work, money, and policy.",
    items: STUDIO_PRODUCTS.map((product) => ({
      id: product.id,
      kicker: product.card.kicker,
      title: product.name,
      body: product.card.body,
      cta: product.card.cta,
      to: product.route,
      image: product.card.image,
      alt: product.card.alt,
    })),
  },
  faq: {
    id: HOME_DEMO_FAQ_ID,
    eyebrow: "BEFORE WE BEGIN",
    title: "Questions that usually come first.",
    lead: "The points clients confirm before a brief becomes a build.",
    contactCta: "Prefer a direct conversation? Contact us",
    contactTo: ROUTES.contact,
    items: [
      {
        question: "What services can Commiters help with?",
        answer:
          "Commiters delivers enterprise AI and cloud systems, full-stack platforms, B2B web applications, e-commerce automation, software MVPs, and workflow integrations. The final scope is confirmed during discovery.",
      },
      {
        question: "Can you build something around my specific business process?",
        answer:
          "Yes, where the engagement matches our capabilities. Discovery defines the workflow, users, integrations, requirements, and the recommended approach.",
      },
      {
        question: "How is a project scoped?",
        answer:
          "Scope depends on functionality, integrations, security, and delivery requirements. Once the requirements are understood, Commiters prepares a written proposal.",
      },
      {
        question: "How long will development take?",
        answer:
          "Timelines depend on complexity, readiness of requirements, integrations, and review cycles. A realistic timeline should be confirmed after the scope is understood.",
      },
      {
        question: "Can you improve or integrate with an existing application?",
        answer:
          "Depending on the stack and requirements, the team can assess integrations, performance, modernization, and planned enhancements. A technical review may be needed first.",
      },
      {
        question: "What happens after I submit an enquiry?",
        answer:
          "The next step is to review your requirements, arrange a discussion if appropriate, and align on scope, priorities, timeline, and the proposal process.",
      },
    ],
  },
  cta: {
    id: HOME_DEMO_CTA_ID,
    title: "Tell us the system you need.",
    body: "Share a concise brief. We will use it to prepare a precise first conversation.",
    button: "Start a project brief",
    to: ROUTES.contact,
    whatsapp: "Share on WhatsApp",
    whatsappHref: buildWhatsAppUrl(
      "Hello Commiters,\n\nI would like to enquire about a project.\n\nSent from the Commiters homepage.",
    ),
  },
  toast: "Selection saved. Continue the brief below.",
} as const;
