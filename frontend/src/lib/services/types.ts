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

export type ServiceWhyChoose = {
  title: string;
  description: string;
};

export type ServiceFaq = {
  question: string;
  answer: string;
};

export type ServicePortfolioItem = {
  title: string;
  tag: string;
  description: string;
  href: string;
  external?: boolean;
};

export type ServiceTestimonial = {
  quote: string;
  name: string;
  company: string;
};

export type ServiceSeo = {
  title: string;
  description: string;
  keywords: string;
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
  features: ServiceFeature[];
  technologies: TechLogoDef[];
  processSteps: string[];
  timeline: ServiceTimelineEntry[];
  pricing: ServicePricingModel[];
  industries: string[];
  whyChoose: ServiceWhyChoose[];
  portfolio: ServicePortfolioItem[];
  testimonials: ServiceTestimonial[];
  faqs: ServiceFaq[];
};
