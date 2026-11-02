import { caseStudyImageAlt, caseStudyImageSrc, caseStudyImageSrcSet } from "./caseStudiesPageAssets";
import { HOME_LEAD_MAGNET_FORM_ID } from "./homeLeadMagnetContent";
import type { PlannerTypeId } from "./homePlannerData";
import { OPSFLOW_HERO } from "./opsFlowPageContent";
import { ROUTES } from "./routes";
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
    eyebrow: "WEB · SOFTWARE · AI · CLOUD",
    titleBefore: "Technology that solves ",
    titleAccent: "real business",
    titleAfter: " problems.",
    title: "Technology that solves real business problems.",
    lead: "From a new website to custom business software, AI automation, and scalable cloud platforms — Commiters helps turn your business needs into reliable digital solutions.",
    primaryCta: "Find My Solution",
    primaryHref: `#${HOME_DEMO_SOLUTIONS_ID}`,
    secondaryCta: "Explore Our Work",
    secondaryHref: `#${HOME_DEMO_WORK_ID}`,
    checks: ["Built around your requirements", "Clear scope & milestones", "From planning to launch"],
  },
  servicesCarousel: {
    id: "home-services",
    eyebrow: "OUR SERVICES",
    title: "One service. One clear next step.",
    exploreLabel: "Explore Service",
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
    eyebrow: "BUSINESS PROBLEMS, PRACTICAL SOLUTIONS",
    title: "Challenges we commonly address.",
    lead: "Describe the operational challenge. We will help define the technology, scope, and next steps.",
    cta: "Discuss a Challenge",
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
    eyebrow: "START WITH YOUR GOAL",
    title: "What does your business need?",
    lead: "Technical terminology is not required. Begin with the business outcome, and we will recommend a suitable direction.",
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
    eyebrow: "SMART PROJECT PLANNER",
    title: "Prepare a project blueprint before the first discussion.",
    lead: "Select a project type and answer only the questions that apply. You will receive a blueprint you can download or send with an enquiry.",
  },
  work: {
    id: HOME_DEMO_WORK_ID,
    eyebrow: "PROOF THROUGH PROJECTS",
    title: "Selected work from the portfolio.",
    lead: "Live platforms and products from the Work page: travel, document automation, and merchant reviews.",
    note: "See the full Work portfolio for more projects.",
    allWorkCta: "See all work",
    allWorkTo: ROUTES.caseStudies,
    items: [
      {
        id: "browse-my-vacation",
        kicker: "TRAVEL PLATFORM",
        title: "BrowseMyVacation",
        body: "A B2C/B2B travel platform with packages, search, and custom quote workflows.",
        cta: "View project details",
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
  faq: {
    id: HOME_DEMO_FAQ_ID,
    eyebrow: "QUICK ANSWERS",
    title: "Questions clients ask before getting started.",
    lead: "These answers cover the points clients usually confirm before starting a project.",
    contactCta: "Still have a question? Contact us",
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
    title: "Tell us about the problem you need to solve.",
    body: "Share a brief overview of your business or project. We will use it to prepare the first discussion.",
    button: "Start a Project Enquiry",
    to: ROUTES.contact,
    whatsapp: "Share on WhatsApp",
    whatsappHref: buildWhatsAppUrl(
      "Hello Commiters,\n\nI would like to enquire about a project.\n\nSent from the Commiters homepage.",
    ),
  },
  toast: "Selection saved. Continue in the planner below.",
} as const;
