import { AI_SUMMARIZER_CASE_STUDY_COPY } from "./aiSummarizerCaseStudyContent";
import {
  BROWSE_MY_VACATION_CASE_STUDY_COPY,
  BROWSE_MY_VACATION_LIVE_URL,
  uniqueBrowseMyVacationGallery,
} from "./browseMyVacationCaseStudyContent";
import { COMMITERS_CASE_STUDY_COPY } from "./commitersCaseStudyContent";
import { ECOROUTE_LIVE_URL, ECO_ROUTE_CASE_STUDY_COPY } from "./ecoRouteCaseStudyContent";
import { MULTI_ROLE_CRM_CASE_STUDY_COPY, MULTI_ROLE_CRM_LIVE_URL } from "./multiRoleCrmCaseStudyContent";
import { NEARDROP_CASE_STUDY_COPY } from "./neardropCaseStudyContent";
import { PROSPECTIQ_LIVE_URL, PROSPECT_IQ_CASE_STUDY_COPY } from "./prospectIqCaseStudyContent";
import { allStaticWorkPageProjects } from "./caseStudiesPageContent";
import { ROUTES } from "./routes";
import { WORK_CASE_STUDY_SECTIONS, type WorkCaseStudy } from "./workCaseStudy";

function catalogProject(id: string) {
  const project = allStaticWorkPageProjects().find((item) => item.id === id);
  if (!project) throw new Error(`Missing work catalog copy for ${id}`);
  return project;
}

const DISCUSS = { kind: "internal" as const, label: "Start a similar brief", to: ROUTES.contact };
const EXPLORE_PAGE = { kind: "internal" as const, label: "Read the study", to: "#wcs-overview" };

const BMV_GALLERY = uniqueBrowseMyVacationGallery();

export const WORK_CASE_STUDIES: WorkCaseStudy[] = [
  {
    id: "neardrop-mvp",
    route: ROUTES.neardropCaseStudy,
    pageTestId: "neardrop-case-study-page",
    pageClass: "neardrop-case-study-page",
    name: "NearDrop MVP",
    kicker: "Selected work",
    headline: "A field product, presented with intent.",
    lead: "A product concept presented as a precise digital experience—purpose, journey, and engineering, without unverified claims.",
    heroImage: {
      src: NEARDROP_CASE_STUDY_COPY.heroImage.src,
      alt: "NearDrop product preview — a simpler local experience",
    },
    exploreCta: EXPLORE_PAGE,
    discussCta: DISCUSS,
    heroFacts: [
      { label: "Project", value: "NearDrop MVP" },
      { label: "Category", value: "Product Development" },
      { label: "Studio", value: "Commiters" },
    ],
    overview: {
      ...WORK_CASE_STUDY_SECTIONS.overview,
      lead: "NearDrop is showcased here as a product case study, with a focus on presenting its purpose, user experience and engineering in a way that is easy for clients to understand.",
      items: [
        { label: "Project name", value: "NearDrop MVP" },
        { label: "Project category", value: "Digital product / MVP" },
        { label: "Development partner", value: "Commiters" },
        { label: "Delivery focus", value: "Product experience" },
      ],
    },
    problem: {
      ...WORK_CASE_STUDY_SECTIONS.problem,
      lead: "A new product idea still needs a clear value proposition, intuitive navigation, and a journey users can understand quickly.",
      items: [
        {
          id: "clarity",
          title: "The core journey was not obvious.",
          body: "Without a focused presentation, the value of the MVP is hard for clients to see in a single pass.",
        },
      ],
    },
    solution: {
      ...WORK_CASE_STUDY_SECTIONS.solution,
      lead: "This case study presents NearDrop as a product concept with a modern digital experience around the core user journey.",
      items: [
        {
          id: "presentation",
          title: "Make the experience feel simple.",
          body: "Bring the important information forward, reduce friction between steps, and keep a consistent experience across key screens.",
        },
      ],
    },
    usp: {
      ...WORK_CASE_STUDY_SECTIONS.usp,
      lead: "The presentation keeps the product story easy to follow without adding unverified implementation claims.",
      items: [
        { id: "discovery", title: "Easy discovery", body: "Keep the primary user destination clear and easy to navigate." },
        { id: "journeys", title: "Simple journeys", body: "Guide users through each important step with clear actions." },
        { id: "information", title: "Clear information", body: "Use hierarchy and readable layouts to reduce cognitive load." },
      ],
    },
    journey: {
      ...WORK_CASE_STUDY_SECTIONS.journey,
      lead: "Illustrative UI direction for the case-study presentation. Replace these concept screens with approved NearDrop product screenshots before publishing.",
      items: [
        {
          src: NEARDROP_CASE_STUDY_COPY.heroImage.src,
          alt: "Discover — a clean starting point around nearby places",
          title: "Discover",
          body: "A clean starting point that helps users understand what is available around them.",
          caption: "neardrop · product preview",
        },
        {
          src: "/assets/case-studies/work-neardrop.png",
          srcSet: "/assets/case-studies/work-neardrop.png 1x, /assets/case-studies/work-neardrop@2x.png 2x",
          alt: "NearDrop field logistics van with real-time GPS geofencing and live tracking pins",
          title: "Stay informed",
          body: "Keep the next step and relevant information easy to find throughout the journey.",
        },
      ],
    },
    details: {
      ...WORK_CASE_STUDY_SECTIONS.details,
      lead: "Use these cards to spotlight the real capabilities once the project scope and screenshots are confirmed.",
      items: [
        { id: "discovery", title: "Easy discovery", body: "Keep the primary user destination clear and easy to navigate." },
        { id: "journeys", title: "Simple journeys", body: "Guide users through each important step with clear actions." },
        { id: "context", title: "Relevant context", body: "Present useful information at the moment users need it." },
        { id: "information", title: "Clear information", body: "Use hierarchy and readable layouts to reduce cognitive load." },
        { id: "interface", title: "Consistent interface", body: "Build a familiar visual language across the product experience." },
        { id: "responsive", title: "Responsive design", body: "Keep the experience usable across common screen sizes." },
      ],
    },
    flow: {
      ...WORK_CASE_STUDY_SECTIONS.flow,
      lead: "Illustrative flow for the visual presentation. Confirm the actual NearDrop workflow before treating these steps as product functionality.",
      items: [
        { id: "discover", title: "Discover", body: "Start with a clear entry point and understand the available options." },
        { id: "choose", title: "Choose", body: "Review relevant details and make an informed selection." },
        { id: "continue", title: "Continue", body: "Move forward with clear next steps and useful status information." },
      ],
    },
    stack: {
      ...WORK_CASE_STUDY_SECTIONS.stack,
      lead: "Technology labels should reflect the actual repository and production architecture. Add the confirmed stack here.",
      note: "Technology stack intentionally left category-based in this approval concept to avoid displaying unverified tools.",
      items: [
        { id: "frontend", group: "Frontend", title: "Frontend" },
        { id: "backend", group: "Backend", title: "Backend" },
        { id: "database", group: "Database", title: "Database" },
        { id: "apis", group: "APIs & Integrations", title: "APIs & Integrations" },
        { id: "cloud", group: "Cloud & Deployment", title: "Cloud & Deployment" },
        { id: "qa", group: "Quality Assurance", title: "Quality Assurance" },
      ],
    },
    outcome: {
      ...WORK_CASE_STUDY_SECTIONS.outcome,
      lead: "Once approved, replace these prompts with validated project outcomes, delivery details and measurable results where available.",
      items: [
        { id: "readiness", title: "Product readiness", body: "Summarise the MVP scope and what was delivered." },
        { id: "journey", title: "Core journey", body: "Highlight meaningful improvements to the core journey." },
        { id: "engineering", title: "Engineering quality", body: "Explain the architecture, reliability and maintainability decisions." },
      ],
    },
    relatedIds: ["browse-my-vacation", "commiters", "multi-role-crm"],
  },
  {
    id: "browse-my-vacation",
    route: ROUTES.browseMyVacationCaseStudy,
    pageTestId: "nextsaas-case-study-page",
    pageClass: "nextsaas-case-study-page",
    extraPageClass: "browse-my-vacation-case-study-page",
    name: "BrowseMyVacation",
    kicker: "Selected work",
    headline: "Travel discovery, built for enquiry.",
    lead: BROWSE_MY_VACATION_CASE_STUDY_COPY.description,
    heroImage: BROWSE_MY_VACATION_CASE_STUDY_COPY.introHeroImage,
    exploreCta: { kind: "external", label: "View live product", href: BROWSE_MY_VACATION_LIVE_URL },
    discussCta: DISCUSS,
    liveDemo: { kind: "external", label: "Live Demo", href: BROWSE_MY_VACATION_LIVE_URL },
    heroFacts: [
      { label: "Project", value: "BrowseMyVacation" },
      { label: "Category", value: "B2C/B2B travel platform" },
      { label: "Studio", value: "Commiters" },
    ],
    overview: {
      ...WORK_CASE_STUDY_SECTIONS.overview,
      lead: BROWSE_MY_VACATION_CASE_STUDY_COPY.scope.description,
      items: [
        { label: "Project name", value: "BrowseMyVacation" },
        { label: "Project category", value: "B2C/B2B travel platform" },
        { label: "Live site", value: BROWSE_MY_VACATION_CASE_STUDY_COPY.metadata.liveSite.value },
        { label: "Core stack", value: BROWSE_MY_VACATION_CASE_STUDY_COPY.metadata.coreStack.value },
      ],
    },
    problem: {
      ...WORK_CASE_STUDY_SECTIONS.problem,
      lead: catalogProject("browse-my-vacation").problem,
      items: [
        {
          id: "storefront",
          title: "Quote capture was the gap.",
          body: "Operators needed travelers to move from a curated package to a reliable enquiry without a forced date picker.",
        },
      ],
    },
    solution: {
      ...WORK_CASE_STUDY_SECTIONS.solution,
      lead: catalogProject("browse-my-vacation").solution,
      items: [
        {
          id: "city",
          title: "City-first discovery.",
          body: "City search, transparent pricing, and Customise & Quote keep the next step obvious on mobile and desktop.",
        },
      ],
    },
    usp: {
      ...WORK_CASE_STUDY_SECTIONS.usp,
      lead: BROWSE_MY_VACATION_CASE_STUDY_COPY.pipelines.subheading,
      items: [
        { id: "live", title: "Production marketplace", body: "Live at browsemyvacations.com with curated package grids, city search, Customise & Quote, Vacation Meter, and MICE pages." },
        { id: "search", title: "City-first search", body: "City-first search engines with transparent pricing calculators and clear View Details paths—no forced date pickers." },
        { id: "quote", title: "Customise & Quote", body: "Travelers can request a tailored itinerary without leaving the package journey." },
      ],
    },
    journey: {
      ...WORK_CASE_STUDY_SECTIONS.journey,
      lead: "Screens from the live BrowseMyVacation platform.",
      items: [
        ...BMV_GALLERY.map((image, index) => ({
          ...image,
          title: index === 0 ? "Discover" : "Stay informed",
          body:
            index === 0
              ? "City search and curated package grids help travelers see what is available."
              : "Package photography and pricing keep the next enquiry step close at hand.",
        })),
        {
          src: BROWSE_MY_VACATION_CASE_STUDY_COPY.visualBreak.image.src,
          srcSet: BROWSE_MY_VACATION_CASE_STUDY_COPY.visualBreak.image.srcSet,
          alt: BROWSE_MY_VACATION_CASE_STUDY_COPY.visualBreak.image.alt,
          title: "Live destination photography",
          body: "Founder-ready imagery from the production marketplace, not a placeholder collage.",
        },
      ],
    },
    details: {
      ...WORK_CASE_STUDY_SECTIONS.details,
      lead: BROWSE_MY_VACATION_CASE_STUDY_COPY.pipelines.heading,
      items: [
        ...BROWSE_MY_VACATION_CASE_STUDY_COPY.capabilities.items.map((item) => ({
          id: item.id,
          title: item.label,
          body: item.body,
        })),
        ...BROWSE_MY_VACATION_CASE_STUDY_COPY.scope.items.map((item, index) => ({
          id: `scope-${index}`,
          title: item,
          body: BROWSE_MY_VACATION_CASE_STUDY_COPY.pipelines.subheading,
        })),
      ],
    },
    flow: {
      ...WORK_CASE_STUDY_SECTIONS.flow,
      lead: "The live enquiry path on browsemyvacations.com.",
      items: BROWSE_MY_VACATION_CASE_STUDY_COPY.infrastructure.items.map((item) => ({
        id: item.id,
        title: item.title,
        body: item.body,
      })),
    },
    stack: {
      ...WORK_CASE_STUDY_SECTIONS.stack,
      lead: BROWSE_MY_VACATION_CASE_STUDY_COPY.techStack.description,
      items: BROWSE_MY_VACATION_CASE_STUDY_COPY.techStack.items.map((item) => ({
        id: item.id,
        group: item.label,
        title: item.title,
        body: item.body,
        logo: item.slug ? { slug: item.slug, alt: item.title } : undefined,
      })),
    },
    outcome: {
      ...WORK_CASE_STUDY_SECTIONS.outcome,
      lead: BROWSE_MY_VACATION_CASE_STUDY_COPY.outcomes.description,
      items: BROWSE_MY_VACATION_CASE_STUDY_COPY.outcomes.items.map((item) => ({
        id: item.id,
        title: item.value,
        body: item.body,
      })),
    },
    relatedIds: ["neardrop-mvp", "commiters", "multi-role-crm"],
  },
  {
    id: "commiters",
    route: ROUTES.commitersCaseStudy,
    pageTestId: "commiters-case-study-page",
    pageClass: "commiters-case-study-page",
    name: "Commiters.com",
    kicker: "Selected work",
    headline: "The studio, engineered as a product.",
    lead: COMMITERS_CASE_STUDY_COPY.subtitle,
    heroImage: {
      src: "/assets/case-studies/work-commiters.png",
      srcSet: "/assets/case-studies/work-commiters.png 1x, /assets/case-studies/work-commiters@2x.png 2x",
      alt: "Commiters spec-driven cloud website on a high-performance engineering console",
    },
    exploreCta: { kind: "internal", label: "View live product", to: ROUTES.home },
    discussCta: DISCUSS,
    liveDemo: { kind: "internal", label: "Open live site", to: ROUTES.home },
    heroFacts: [
      { label: "Project", value: "Commiters.com" },
      { label: "Category", value: "Spec-driven cloud website" },
      { label: "Studio", value: "Commiters" },
    ],
    overview: {
      ...WORK_CASE_STUDY_SECTIONS.overview,
      lead: COMMITERS_CASE_STUDY_COPY.overview.body,
      items: [
        { label: "Project name", value: "Commiters.com" },
        { label: "Project category", value: "Spec-driven cloud platform" },
        { label: "Development partner", value: "Commiters" },
        { label: "Delivery focus", value: "Performance and governed surfaces" },
      ],
    },
    problem: {
      ...WORK_CASE_STUDY_SECTIONS.problem,
      lead: catalogProject("commiters").problem,
      items: [
        {
          id: "presence",
          title: "Template sites could not carry the standard.",
          body: "The public site needed to reflect engineering precision with rigid component isolation and zero ambient authority.",
        },
      ],
    },
    solution: {
      ...WORK_CASE_STUDY_SECTIONS.solution,
      lead: catalogProject("commiters").solution,
      items: [
        {
          id: "isolation",
          title: "Spec-driven delivery.",
          body: COMMITERS_CASE_STUDY_COPY.overview.objective.body,
        },
      ],
    },
    usp: {
      ...WORK_CASE_STUDY_SECTIONS.usp,
      lead: "A governed marketing surface treated as an engineering product.",
      items: [
        { id: "lighthouse", title: "100/100 Lighthouse Speed", body: COMMITERS_CASE_STUDY_COPY.overview.outcome.body },
        { id: "ttfb", title: "<150ms TTFB", body: "Sub-second page loads and optimized Core Web Vitals for a high-performance public site." },
        { id: "governance", title: "Zero ambient authority", body: "Rigid component isolation, type-safe persistence, and governed surfaces across the site." },
      ],
    },
    journey: {
      ...WORK_CASE_STUDY_SECTIONS.journey,
      lead: "The live Commiters website is the product surface.",
      items: [
        {
          src: "/assets/case-studies/work-commiters.png",
          srcSet: "/assets/case-studies/work-commiters.png 1x, /assets/case-studies/work-commiters@2x.png 2x",
          alt: "Commiters public website",
          title: "Discover",
          body: "A spec-driven marketing surface that presents services, work and products in one journey.",
        },
        {
          src: "/assets/case-studies/commiters.png",
          alt: "Commiters.com engineering console for the spec-driven public site",
          title: "Stay informed",
          body: "Isolation, type-safe surfaces, and governed delivery on the live studio site.",
        },
      ],
    },
    details: {
      ...WORK_CASE_STUDY_SECTIONS.details,
      lead: "The public site is treated as a governed engineering surface.",
      items: COMMITERS_CASE_STUDY_COPY.features.map((item) => ({
        id: item.id,
        title: item.title,
        body: item.body,
      })),
    },
    flow: {
      ...WORK_CASE_STUDY_SECTIONS.flow,
      lead: COMMITERS_CASE_STUDY_COPY.architecture.heading,
      items: COMMITERS_CASE_STUDY_COPY.architecture.sections.map((item) => ({
        id: item.id,
        title: item.title,
        body: item.body,
      })),
    },
    stack: {
      ...WORK_CASE_STUDY_SECTIONS.stack,
      lead: "Confirmed stack from the live Commiters platform.",
      items: COMMITERS_CASE_STUDY_COPY.coreStack.items.map((item) => ({
        id: item.slug,
        group: item.title,
        title: item.title,
        body: item.subtitle,
        logo: { slug: item.slug, alt: item.alt },
      })),
    },
    outcome: {
      ...WORK_CASE_STUDY_SECTIONS.outcome,
      lead: COMMITERS_CASE_STUDY_COPY.overview.outcome.body,
      items: [
        { id: "performance", title: "Product readiness", body: COMMITERS_CASE_STUDY_COPY.overview.outcome.body },
        { id: "seo", title: "Engineering quality", body: "Structured schemas, automated metadata and server-side rendering for indexability." },
      ],
    },
    relatedIds: ["browse-my-vacation", "neardrop-mvp", "ai-summarizer"],
  },
  {
    id: "ai-summarizer",
    route: ROUTES.aiSummarizerCaseStudy,
    pageTestId: "ai-summarizer-case-study-page",
    pageClass: "ai-summarizer-case-study-page",
    name: "AI Summarizer",
    kicker: "Selected work",
    headline: "Documents, reduced to a decision.",
    lead: AI_SUMMARIZER_CASE_STUDY_COPY.description,
    heroImage: AI_SUMMARIZER_CASE_STUDY_COPY.heroImage,
    exploreCta: EXPLORE_PAGE,
    discussCta: DISCUSS,
    heroFacts: [
      { label: "Project", value: "AI Summarizer" },
      { label: "Category", value: "Enterprise document AI" },
      { label: "Studio", value: "Commiters" },
    ],
    overview: {
      ...WORK_CASE_STUDY_SECTIONS.overview,
      lead: "Governed document ingestion that turns packets into clear, actionable summaries.",
      items: [
        { label: "Project name", value: "AI Summarizer" },
        { label: "Duration", value: AI_SUMMARIZER_CASE_STUDY_COPY.metadata.timeline.value },
        { label: "Stack", value: AI_SUMMARIZER_CASE_STUDY_COPY.metadata.coreStack.value },
        { label: "Industry", value: AI_SUMMARIZER_CASE_STUDY_COPY.metadata.industry.value },
      ],
    },
    problem: {
      ...WORK_CASE_STUDY_SECTIONS.problem,
      lead: catalogProject("ai-summarizer").problem,
      items: [
        {
          id: "volume",
          title: "Decisions stayed buried in packets.",
          body: "Reviewers had to hunt through unstructured operational documents instead of reading a brief.",
        },
      ],
    },
    solution: {
      ...WORK_CASE_STUDY_SECTIONS.solution,
      lead: catalogProject("ai-summarizer").solution,
      items: [
        {
          id: "policy",
          title: "Governed LLM calls.",
          body: "Every LLM call stays inside policy-gated MCP sockets with schema-validated output.",
        },
      ],
    },
    usp: {
      ...WORK_CASE_STUDY_SECTIONS.usp,
      lead: "Enterprise document security through policy-gated sockets.",
      items: [
        { id: "security", title: "Enterprise Document Security", body: "Policy-gated MCP sockets with zero ambient authority." },
        { id: "briefs", title: "Actionable Executive Briefs", body: "Packets become structured briefs instead of another unread document pile." },
        { id: "grounding", title: "Schema-validated output", body: "Schema validation cross-references JSON against source text." },
      ],
    },
    journey: {
      ...WORK_CASE_STUDY_SECTIONS.journey,
      lead: "Document packets moving through a governed summarizer.",
      items: [
        {
          src: AI_SUMMARIZER_CASE_STUDY_COPY.heroImage.src,
          srcSet: AI_SUMMARIZER_CASE_STUDY_COPY.heroImage.srcSet,
          alt: AI_SUMMARIZER_CASE_STUDY_COPY.heroImage.alt,
          title: "Discover",
          body: "Streaming multi-page invoices, receipts and GST records without losing context.",
        },
        {
          src: "/assets/case-studies/work-ai-summarizer.png",
          srcSet: "/assets/case-studies/work-ai-summarizer.png 1x, /assets/case-studies/work-ai-summarizer@2x.png 2x",
          alt: "AI Summarizer turning document pages into a governed executive brief",
          title: "Stay informed",
          body: "Schema-validated briefs instead of another unread operational packet.",
        },
      ],
    },
    details: {
      ...WORK_CASE_STUDY_SECTIONS.details,
      lead: AI_SUMMARIZER_CASE_STUDY_COPY.techStack.description,
      items: AI_SUMMARIZER_CASE_STUDY_COPY.architecture.cards.map((item) => ({
        id: item.id,
        title: item.title,
        body: item.body,
      })),
    },
    flow: {
      ...WORK_CASE_STUDY_SECTIONS.flow,
      lead: AI_SUMMARIZER_CASE_STUDY_COPY.execution.heading,
      items: AI_SUMMARIZER_CASE_STUDY_COPY.execution.items.map((item) => ({
        id: item.id,
        title: item.title,
        body: item.body,
      })),
    },
    stack: {
      ...WORK_CASE_STUDY_SECTIONS.stack,
      lead: AI_SUMMARIZER_CASE_STUDY_COPY.techStack.description,
      items: AI_SUMMARIZER_CASE_STUDY_COPY.techStack.items.map((item) => ({
        id: item.id,
        group: item.label,
        title: item.title,
      })),
    },
    outcome: {
      ...WORK_CASE_STUDY_SECTIONS.outcome,
      lead: "Governed briefs instead of unconstrained model output.",
      items: [
        { id: "security", title: "Product readiness", body: "Enterprise document security through policy-gated sockets." },
        { id: "briefs", title: "Core journey", body: "Actionable executive briefs from multi-page packets." },
        { id: "grounding", title: "Engineering quality", body: "Schema validation cross-references JSON against source text." },
      ],
    },
    relatedIds: ["prospectiq-ai", "ecoroute-intelligence", "multi-role-crm"],
  },
  {
    id: "multi-role-crm",
    route: ROUTES.multiRoleCrmCaseStudy,
    pageTestId: "multi-role-crm-case-study-page",
    pageClass: "multi-role-crm-case-study-page",
    name: "Multi-Role CRM",
    kicker: "Selected work",
    headline: "Customer work, gated by role.",
    lead: MULTI_ROLE_CRM_CASE_STUDY_COPY.subheadline,
    heroImage: MULTI_ROLE_CRM_CASE_STUDY_COPY.heroImage,
    exploreCta: { kind: "external", label: "View live product", href: MULTI_ROLE_CRM_LIVE_URL },
    discussCta: DISCUSS,
    liveDemo: { kind: "external", label: "Live Demo", href: MULTI_ROLE_CRM_LIVE_URL },
    heroFacts: [
      { label: "Project", value: "Multi-Role CRM" },
      { label: "Category", value: "Enterprise AI / SaaS" },
      { label: "Studio", value: "Commiters" },
    ],
    overview: {
      ...WORK_CASE_STUDY_SECTIONS.overview,
      lead: MULTI_ROLE_CRM_CASE_STUDY_COPY.vision.body,
      items: [
        { label: "Project name", value: "Multi-Role CRM & AI Chatbot" },
        { label: "Project category", value: "Enterprise AI" },
        { label: "Development partner", value: "Commiters" },
        { label: "Delivery focus", value: "Role-aware AI operations" },
      ],
    },
    problem: {
      ...WORK_CASE_STUDY_SECTIONS.problem,
      lead: catalogProject("multi-role-crm").problem,
      items: [
        {
          id: "challenge",
          title: "Fragmented support work",
          body: MULTI_ROLE_CRM_CASE_STUDY_COPY.vision.challenge.text,
        },
      ],
    },
    solution: {
      ...WORK_CASE_STUDY_SECTIONS.solution,
      lead: catalogProject("multi-role-crm").solution,
      items: [
        {
          id: "solution",
          title: "RAG-powered answers",
          body: MULTI_ROLE_CRM_CASE_STUDY_COPY.vision.solution.text,
        },
      ],
    },
    usp: {
      ...WORK_CASE_STUDY_SECTIONS.usp,
      lead: MULTI_ROLE_CRM_CASE_STUDY_COPY.architecture.description,
      items: MULTI_ROLE_CRM_CASE_STUDY_COPY.architecture.features.slice(0, 3).map((item) => ({
        id: item.id,
        title: item.title,
        body: item.body,
      })),
    },
    journey: {
      ...WORK_CASE_STUDY_SECTIONS.journey,
      lead: "Operator screens with an AI chatbot co-pilot.",
      items: [
        {
          src: MULTI_ROLE_CRM_CASE_STUDY_COPY.heroImage.src,
          srcSet: MULTI_ROLE_CRM_CASE_STUDY_COPY.heroImage.srcSet,
          alt: MULTI_ROLE_CRM_CASE_STUDY_COPY.heroImage.alt,
          title: "Discover",
          body: "Admins, managers and field agents share a permissioned view of customer work.",
        },
        {
          src: "/assets/case-studies/work-multi-role-crm.png",
          srcSet: "/assets/case-studies/work-multi-role-crm.png 1x, /assets/case-studies/work-multi-role-crm@2x.png 2x",
          alt: "Multi-role CRM operator screens with an AI chatbot co-pilot",
          title: "Stay informed",
          body: "RAG answers stay inside the role. WebSockets keep the three dashboards aligned.",
        },
      ],
    },
    details: {
      ...WORK_CASE_STUDY_SECTIONS.details,
      lead: MULTI_ROLE_CRM_CASE_STUDY_COPY.architecture.description,
      items: MULTI_ROLE_CRM_CASE_STUDY_COPY.architecture.features.map((item) => ({
        id: item.id,
        title: item.title,
        body: item.body,
      })),
    },
    flow: {
      ...WORK_CASE_STUDY_SECTIONS.flow,
      lead: MULTI_ROLE_CRM_CASE_STUDY_COPY.impact.body,
      items: [
        { id: "role", title: "Discover", body: "Sign in with a role. Session-scoped permissions decide which records appear." },
        { id: "ask", title: "Choose", body: "Ask from authorized context. RAG answers stay inside that role." },
        { id: "sync", title: "Continue", body: "WebSocket updates keep Admin, Manager and Field Agent dashboards aligned." },
      ],
    },
    stack: {
      ...WORK_CASE_STUDY_SECTIONS.stack,
      lead: MULTI_ROLE_CRM_CASE_STUDY_COPY.techStack.caption,
      items: MULTI_ROLE_CRM_CASE_STUDY_COPY.techStack.items.map((item) => ({
        id: item.slug,
        group: item.role,
        title: item.alt,
        logo: { slug: item.slug, alt: item.alt },
      })),
    },
    outcome: {
      ...WORK_CASE_STUDY_SECTIONS.outcome,
      lead: MULTI_ROLE_CRM_CASE_STUDY_COPY.impact.body,
      items: MULTI_ROLE_CRM_CASE_STUDY_COPY.impact.items.map((item) => ({
        id: item.id,
        title: item.label,
        body: MULTI_ROLE_CRM_CASE_STUDY_COPY.impact.body,
      })),
    },
    relatedIds: ["neardrop-mvp", "ai-summarizer", "prospectiq-ai"],
  },
  {
    id: "prospectiq-ai",
    route: ROUTES.prospectIqCaseStudy,
    pageTestId: "prospectiq-case-study-page",
    pageClass: "prospectiq-case-study-page",
    extraPageClass: "commiters-case-study-page technical-case-study-page",
    name: "ProspectIQ AI",
    kicker: "Selected work",
    headline: "Prospect scoring, explained—not decided.",
    lead: PROSPECT_IQ_CASE_STUDY_COPY.subtitle,
    heroImage: PROSPECT_IQ_CASE_STUDY_COPY.heroImage,
    exploreCta: { kind: "external", label: "View live product", href: PROSPECTIQ_LIVE_URL },
    discussCta: DISCUSS,
    liveDemo: { kind: "external", label: "Live Demo", href: PROSPECTIQ_LIVE_URL },
    heroFacts: [
      { label: "Project", value: "ProspectIQ AI" },
      { label: "Category", value: "Lending decision support" },
      { label: "Studio", value: "Commiters" },
    ],
    overview: {
      ...WORK_CASE_STUDY_SECTIONS.overview,
      lead: PROSPECT_IQ_CASE_STUDY_COPY.overview.body,
      items: [
        { label: "Project name", value: "ProspectIQ AI" },
        { label: "Project category", value: "Lending decision support" },
        { label: "Hosted prototype", value: "Vertex AI / Cloud Run" },
        { label: "Safeguard", value: "Human-in-the-loop underwriting" },
      ],
    },
    problem: {
      ...WORK_CASE_STUDY_SECTIONS.problem,
      lead: catalogProject("prospectiq-ai").problem,
      items: [
        {
          id: "signals",
          title: "Traditional signals were not enough.",
          body: "Genuine loan intent, repayment capacity, and product fit stayed hard to see from financial and demographic data alone.",
        },
      ],
    },
    solution: {
      ...WORK_CASE_STUDY_SECTIONS.solution,
      lead: catalogProject("prospectiq-ai").solution,
      items: [
        {
          id: "hitl",
          title: "Explain, do not override.",
          body: "Gemini explains calculated results and does not override them. Final lending decisions still need authorized review.",
        },
      ],
    },
    usp: {
      ...WORK_CASE_STUDY_SECTIONS.usp,
      lead: "Decision support on synthetic data — it does not approve or reject loans.",
      items: PROSPECT_IQ_CASE_STUDY_COPY.metrics.map((item) => ({
        id: item.id,
        title: item.value,
        body: item.label,
      })),
    },
    journey: {
      ...WORK_CASE_STUDY_SECTIONS.journey,
      lead: "The hosted ProspectIQ prototype on Cloud Run.",
      items: [
        {
          src: PROSPECT_IQ_CASE_STUDY_COPY.heroImage.src,
          alt: PROSPECT_IQ_CASE_STUDY_COPY.heroImage.alt,
          title: "Discover",
          body: "Deterministic scoring remains the source of truth. Agents explain it for underwriters.",
        },
        {
          src: "/assets/case-studies/work-prospectiq.png",
          srcSet: "/assets/case-studies/work-prospectiq.png 1x, /assets/case-studies/work-prospectiq@2x.png 2x",
          alt: "ProspectIQ AI loan prospect intelligence dashboard for banking teams",
          title: "Stay informed",
          body: "Five sequential agents produce a report. A human still reviews before any lending decision.",
        },
      ],
    },
    details: {
      ...WORK_CASE_STUDY_SECTIONS.details,
      lead: "Specialist agents in a fixed sequential workflow.",
      items: PROSPECT_IQ_CASE_STUDY_COPY.features.map((item) => ({
        id: item.id,
        title: item.title,
        body: item.body,
      })),
    },
    flow: {
      ...WORK_CASE_STUDY_SECTIONS.flow,
      lead: PROSPECT_IQ_CASE_STUDY_COPY.architecture.heading,
      items: PROSPECT_IQ_CASE_STUDY_COPY.architecture.sections.map((item) => ({
        id: item.id,
        title: item.title,
        body: item.body,
      })),
    },
    stack: {
      ...WORK_CASE_STUDY_SECTIONS.stack,
      lead: "Confirmed stack from the hosted prototype.",
      items: PROSPECT_IQ_CASE_STUDY_COPY.coreStack.items.map((item, index) => ({
        id: `${item.slug}-${index}`,
        group: item.subtitle,
        title: item.title,
        logo: { slug: item.slug, alt: item.alt },
      })),
    },
    outcome: {
      ...WORK_CASE_STUDY_SECTIONS.outcome,
      lead: "Decision support on synthetic data — it does not approve or reject loans.",
      items: PROSPECT_IQ_CASE_STUDY_COPY.metrics.map((item) => ({
        id: item.id,
        title: item.value,
        body: item.label,
      })),
    },
    relatedIds: ["ecoroute-intelligence", "ai-summarizer", "multi-role-crm"],
  },
  {
    id: "ecoroute-intelligence",
    route: ROUTES.ecoRouteCaseStudy,
    pageTestId: "ecoroute-case-study-page",
    pageClass: "ecoroute-case-study-page",
    extraPageClass: "commiters-case-study-page technical-case-study-page",
    name: "EcoRoute Intelligence",
    kicker: "Selected work",
    headline: "Mobility data, turned into a decision.",
    lead: ECO_ROUTE_CASE_STUDY_COPY.subtitle,
    heroImage: ECO_ROUTE_CASE_STUDY_COPY.heroImage,
    exploreCta: { kind: "external", label: "View live product", href: ECOROUTE_LIVE_URL },
    discussCta: DISCUSS,
    liveDemo: { kind: "external", label: "Live Demo", href: ECOROUTE_LIVE_URL },
    heroFacts: [
      { label: "Project", value: "EcoRoute Intelligence" },
      { label: "Category", value: "AI decision intelligence" },
      { label: "Studio", value: "Commiters" },
    ],
    overview: {
      ...WORK_CASE_STUDY_SECTIONS.overview,
      lead: ECO_ROUTE_CASE_STUDY_COPY.overview.body,
      items: [
        { label: "Project name", value: "EcoRoute Intelligence" },
        { label: "Project category", value: "AI decision intelligence" },
        { label: "Routes analyzed", value: "15 sample traffic routes" },
        { label: "Critical corridors", value: "6 high-risk corridors" },
      ],
    },
    problem: {
      ...WORK_CASE_STUDY_SECTIONS.problem,
      lead: catalogProject("ecoroute-intelligence").problem,
      items: [
        {
          id: "data",
          title: "Data without a decision path.",
          body: "Planners sat on congestion, speed, and emissions signals that were hard to convert into timely action.",
        },
      ],
    },
    solution: {
      ...WORK_CASE_STUDY_SECTIONS.solution,
      lead: catalogProject("ecoroute-intelligence").solution,
      items: [
        {
          id: "agents",
          title: "Specialist agents.",
          body: "Specialist agents analyze routes, flag congestion, and produce policy recommendations.",
        },
      ],
    },
    usp: {
      ...WORK_CASE_STUDY_SECTIONS.usp,
      lead: ECO_ROUTE_CASE_STUDY_COPY.architecture.heading,
      items: ECO_ROUTE_CASE_STUDY_COPY.features.map((item) => ({
        id: item.id,
        title: item.title,
        body: item.body,
      })),
    },
    journey: {
      ...WORK_CASE_STUDY_SECTIONS.journey,
      lead: "Congestion and emissions views from the EcoRoute prototype.",
      items: [
        {
          src: ECO_ROUTE_CASE_STUDY_COPY.heroImage.src,
          alt: ECO_ROUTE_CASE_STUDY_COPY.heroImage.alt,
          title: "Discover",
          body: "Compare congestion and emissions by route, including the recorded peak on ROUTE_9.",
        },
        {
          src: "/assets/case-studies/ecoroute-intelligence.png",
          srcSet:
            "/assets/case-studies/ecoroute-intelligence.png 1x, /assets/case-studies/ecoroute-intelligence@2x.png 2x",
          alt: "EcoRoute Intelligence congestion and emissions decision surface",
          title: "Stay informed",
          body: "Six high-risk corridors from a 15-route sample, with policy options for planners.",
        },
      ],
    },
    details: {
      ...WORK_CASE_STUDY_SECTIONS.details,
      lead: ECO_ROUTE_CASE_STUDY_COPY.architecture.heading,
      items: ECO_ROUTE_CASE_STUDY_COPY.features.map((item) => ({
        id: item.id,
        title: item.title,
        body: item.body,
      })),
    },
    flow: {
      ...WORK_CASE_STUDY_SECTIONS.flow,
      lead: "Agent collaboration from analysis to recommendation.",
      items: ECO_ROUTE_CASE_STUDY_COPY.architecture.sections.map((item) => ({
        id: item.id,
        title: item.title,
        body: item.body,
      })),
    },
    stack: {
      ...WORK_CASE_STUDY_SECTIONS.stack,
      lead: "Confirmed stack from the EcoRoute prototype.",
      items: ECO_ROUTE_CASE_STUDY_COPY.coreStack.items.map((item, index) => ({
        id: `${item.slug}-${index}`,
        group: item.subtitle,
        title: item.title,
        logo: { slug: item.slug, alt: item.alt },
      })),
    },
    outcome: {
      ...WORK_CASE_STUDY_SECTIONS.outcome,
      lead: "Validated prototype metrics from the project record.",
      items: ECO_ROUTE_CASE_STUDY_COPY.metrics.map((item) => ({
        id: item.id,
        title: item.value,
        body: item.label,
      })),
    },
    relatedIds: ["prospectiq-ai", "ai-summarizer", "neardrop-mvp"],
  },
];

export function getWorkCaseStudy(id: string): WorkCaseStudy {
  const study = WORK_CASE_STUDIES.find((item) => item.id === id);
  if (!study) throw new Error(`Unknown work case study ${id}`);
  return study;
}

export function relatedWorkCaseStudies(study: WorkCaseStudy): WorkCaseStudy[] {
  return study.relatedIds.map((id) => getWorkCaseStudy(id));
}
