import type { TechLogoDef } from "../homeTechStack";

export type ServiceFeature = {
  title: string;
  description: string;
  icon: "responsive" | "performance" | "seo" | "secure" | "maintain" | "scale" | "ai" | "mobile" | "automation" | "mvp";
};

export type ServiceTimelineEntry = {
  label: string;
  duration: string;
};

export type ServicePricingModel = {
  title: string;
  description: string;
  bestFor: string;
};

export type ServicePortfolioItem = {
  title: string;
  tag: string;
  description: string;
  href: string;
  external?: boolean;
};

export type ServiceSeo = {
  title: string;
  description: string;
  keywords: string;
};

export type ServiceProblem = {
  title: string;
  lead: string;
  points: string[];
};

export type ServiceFaq = {
  question: string;
  answer: string;
};

export type ServiceDetail = {
  slug: string;
  gridId: string;
  title: string;
  tagline: string;
  description: string;
  heroVisual: "website" | "ai" | "webapp" | "mobile" | "automation" | "mvp" | "ecommerce";
  seo: ServiceSeo;
  about: {
    what: string;
    why: string;
    who: string;
  };
  /** Optional bottleneck section for operations landing pages. */
  problem?: ServiceProblem;
  /** When true, render the How We Work process steps block. */
  showProcess?: boolean;
  /** When true, show every feature card (default caps at four). */
  showAllFeatures?: boolean;
  features: ServiceFeature[];
  technologies: TechLogoDef[];
  processSteps: string[];
  faqs?: ServiceFaq[];
  timeline: ServiceTimelineEntry[];
  pricing: ServicePricingModel[];
  portfolio: ServicePortfolioItem[];
};
