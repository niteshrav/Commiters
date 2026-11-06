import { ROUTES } from "./routes";

export const TERMINAL_LIVE_URL = "https://terminal.commiters.com/" as const;
export const SYNAPSE_LIVE_URL = "https://synapse.commiters.com/login?next=%2F" as const;

export type StudioProductFeature = {
  id: string;
  title: string;
  body: string;
};

export type StudioProductStep = {
  id: string;
  step: string;
  title: string;
  body: string;
};

export type StudioProduct = {
  id: "synapse" | "terminal";
  route: string;
  pageTestId: string;
  name: string;
  kicker: string;
  headline: string;
  lead: string;
  description: string;
  eyebrow: string;
  primaryCta: { label: string; to: string };
  secondaryCta: { label: string; to: string };
  liveDemo: { label: string; href: string };
  features: readonly StudioProductFeature[];
  steps: readonly StudioProductStep[];
  capabilities: readonly string[];
  card: {
    kicker: string;
    body: string;
    cta: string;
    image: string;
    alt: string;
  };
  seo: {
    title: string;
    description: string;
    keywords: string;
  };
};

export const SYNAPSE_PRODUCT: StudioProduct = {
  id: "synapse",
  route: ROUTES.synapse,
  pageTestId: "synapse-product-page",
  name: "Synapse",
  kicker: "HRMS & Workforce Management",
  headline: "The company's single source of truth.",
  lead: "People, work, and money share one record. You sign in as a Person in the company — not into a separate HR or accounts app.",
  description:
    "Synapse is the company operating record: people, work, money, and named policy. First access is by invite, using the work email on the Person record — this is not an open signup.",
  eyebrow: "ENTERPRISE & WORKFORCE",
  primaryCta: { label: "Start a Synapse brief", to: ROUTES.contact },
  secondaryCta: { label: "View related work", to: ROUTES.caseStudies },
  liveDemo: { label: "Live Demo", href: SYNAPSE_LIVE_URL },
  features: [
    { id: "people", title: "People", body: "One Person. Employment is the seat." },
    { id: "work", title: "Work", body: "Leave, attendance, assets, and requests sit on the same record." },
    { id: "money", title: "Money", body: "One ledger. Expenses and payroll post there." },
    { id: "policy", title: "Policy", body: "Named rules the company actually runs on." },
  ],
  steps: [
    { id: "invite", step: "01", title: "Sign in as a Person", body: "Use the work email on your Person record. First access is by invite." },
    { id: "operate", step: "02", title: "Run people and work", body: "Leave, attendance, assets, and requests share the same company record." },
    { id: "post", step: "03", title: "Post to one ledger", body: "Expenses and payroll land in the same money record, under named policy." },
  ],
  capabilities: ["People", "Work", "Money", "Policy", "Invite-only access"],
  card: {
    kicker: "HRMS & WORKFORCE",
    body: "People, work, and money share one record — not a separate HR or accounts app.",
    cta: "Explore Synapse",
    image: "/assets/case-studies/work-synapse.png",
    alt: "Synapse company operating record for people, work, and money",
  },
  seo: {
    title: "Synapse — The company's single source of truth",
    description:
      "Synapse is Commiters’ company operating record: people, work, money, and policy, with invite-only access on the Person record.",
    keywords: "Synapse, HRMS, people operations, attendance, leave, payroll, Commiters product",
  },
};

export const TERMINAL_PRODUCT: StudioProduct = {
  id: "terminal",
  route: ROUTES.terminal,
  pageTestId: "terminal-product-page",
  name: "Terminal",
  kicker: "Recruitment & Learning Management",
  headline: "Hire like we ship. Teach like we review.",
  lead: "Terminal is the Commiters surface for candidate screens, engineer onboarding, and the curriculum we actually use in delivery — not a marketplace, not a bootcamp.",
  description:
    "Recruitment, internal onboarding, and public curriculum share the same models — so a candidate who joins already knows how we write, review, and ship. The same engineers who ship client work write the screens, the SOPs, and the curriculum.",
  eyebrow: "ENTERPRISE & WORKFORCE",
  primaryCta: { label: "Start a Terminal brief", to: ROUTES.contact },
  secondaryCta: { label: "View related work", to: ROUTES.caseStudies },
  liveDemo: { label: "Live Demo", href: TERMINAL_LIVE_URL },
  features: [
    { id: "recruitment", title: "Recruitment", body: "Candidate screens with MCQ and coding, timed, with tab-switch logged." },
    { id: "scorecard", title: "Scorecard", body: "Technical, communication, and verdict on one hiring record." },
    { id: "onboard", title: "Onboarding", body: "SOP tracks by role, with skill validation after a candidate joins." },
    { id: "curriculum", title: "Curriculum", body: "Production Next.js and TypeScript fundamentals taught to the same delivery bar." },
  ],
  steps: [
    { id: "screen", step: "01", title: "Screen", body: "MCQ + coding, timed, tab-switch logged." },
    { id: "score", step: "02", title: "Scorecard", body: "Technical, communication, verdict." },
    { id: "onboard", step: "03", title: "Onboard", body: "SOP tracks by role, skill validation." },
  ],
  capabilities: ["Candidate screens", "Hiring scorecards", "Role onboarding", "Delivery curriculum"],
  card: {
    kicker: "RECRUITMENT & LMS",
    body: "Candidate screens, engineer onboarding, and the curriculum used in delivery — not a marketplace.",
    cta: "Explore Terminal",
    image: "/assets/case-studies/multi-role-crm.png",
    alt: "Terminal recruitment, onboarding, and curriculum surface",
  },
  seo: {
    title: "Terminal — Hire like we ship. Teach like we review.",
    description:
      "Terminal is Commiters’ surface for candidate screens, engineer onboarding, and the curriculum used in delivery.",
    keywords: "Terminal, recruitment, onboarding, curriculum, hiring scorecard, Commiters product",
  },
};

export const STUDIO_PRODUCTS: readonly StudioProduct[] = [SYNAPSE_PRODUCT, TERMINAL_PRODUCT];

export function getStudioProduct(id: StudioProduct["id"]): StudioProduct {
  const product = STUDIO_PRODUCTS.find((item) => item.id === id);
  if (!product) throw new Error(`Unknown studio product ${id}`);
  return product;
}
