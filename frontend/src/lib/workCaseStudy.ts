import type { TechLogoDef } from "./homeTechStack";

export type WorkCaseStudyImage = {
  src: string;
  srcSet?: string;
  alt: string;
  caption?: string;
  title?: string;
  body?: string;
};

export type WorkCaseStudyCard = {
  id: string;
  title: string;
  body: string;
};

export type WorkCaseStudyFact = {
  label: string;
  value: string;
};

export type WorkCaseStudyStackItem = {
  id: string;
  group: string;
  title: string;
  body?: string;
  logo?: TechLogoDef;
};

export type WorkCaseStudyCta =
  | { kind: "internal"; label: string; to: string }
  | { kind: "external"; label: string; href: string };

export type WorkCaseStudyBlock<T> = {
  kicker: string;
  title: string;
  lead: string;
  items: T;
};

export type WorkCaseStudy = {
  id: string;
  route: string;
  pageTestId: string;
  pageClass: string;
  extraPageClass?: string;
  name: string;
  kicker: string;
  headline: string;
  lead: string;
  heroImage: WorkCaseStudyImage;
  exploreCta: WorkCaseStudyCta;
  discussCta: WorkCaseStudyCta;
  liveDemo?: WorkCaseStudyCta;
  heroFacts: readonly WorkCaseStudyFact[];
  overview: WorkCaseStudyBlock<readonly WorkCaseStudyFact[]>;
  problem: WorkCaseStudyBlock<readonly WorkCaseStudyCard[]>;
  solution: WorkCaseStudyBlock<readonly WorkCaseStudyCard[]>;
  usp: WorkCaseStudyBlock<readonly WorkCaseStudyCard[]>;
  journey: WorkCaseStudyBlock<readonly WorkCaseStudyImage[]>;
  details: WorkCaseStudyBlock<readonly WorkCaseStudyCard[]>;
  flow: WorkCaseStudyBlock<readonly WorkCaseStudyCard[]>;
  stack: WorkCaseStudyBlock<readonly WorkCaseStudyStackItem[]> & { note?: string };
  outcome: WorkCaseStudyBlock<readonly WorkCaseStudyCard[]>;
  relatedIds: readonly string[];
};

export const WORK_CASE_STUDY_SECTIONS = {
  overview: { kicker: "01 / Overview", title: "Project overview" },
  problem: { kicker: "02 / Problem", title: "Problem" },
  solution: { kicker: "03 / Solution", title: "Solution" },
  usp: { kicker: "04 / USP", title: "USP of the project" },
  journey: { kicker: "05 / Product", title: "Product in view" },
  details: { kicker: "06 / Capabilities", title: "What we built" },
  flow: { kicker: "07 / How it works", title: "How it works" },
  stack: { kicker: "08 / Tech stack", title: "Tech stack used" },
  outcome: { kicker: "09 / Outcome", title: "Outcome" },
  live: { kicker: "Live demo", title: "Live demo" },
} as const;

export const WORK_CASE_STUDY_FINAL_CTA = {
  title: "Commission the next system.",
  body: "From first MVP to a durable platform, Commiters turns complex requirements into production software.",
  primaryLabel: "Start a brief",
  secondaryLabel: "View the portfolio",
} as const;
