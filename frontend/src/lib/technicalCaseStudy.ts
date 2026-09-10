import type { TechLogoDef } from "./homeTechStack";

export type TechnicalCaseStudyCtaVariant = "cyan-glow" | "gold-blue";

export type TechnicalCaseStudyStackItem = TechLogoDef & {
  title: string;
  subtitle: string;
};

export type TechnicalCaseStudyMetric = {
  id: string;
  label: string;
  value: string;
};

export type TechnicalCaseStudySection = {
  id: string;
  title: string;
  body: string;
};

export type TechnicalCaseStudyFeature = {
  id: string;
  title: string;
  body: string;
  icon: "performance" | "seo" | "minimalist";
};

export type TechnicalCaseStudyCopy = {
  documentTitle: string;
  pageId: string;
  kicker: string;
  title: string;
  subtitle: string;
  heroImage?: {
    src: string;
    alt: string;
  };
  overview: {
    heading: string;
    body: string;
  };
  metrics: readonly TechnicalCaseStudyMetric[];
  coreStack: {
    heading: string;
    items: readonly TechnicalCaseStudyStackItem[];
  };
  architecture: {
    kicker?: string;
    heading: string;
    sections: readonly TechnicalCaseStudySection[];
  };
  features: readonly TechnicalCaseStudyFeature[];
  bottomCta: {
    title: string;
    subtext: string;
    primaryLabel: string;
    primaryTo: string;
    primaryVariant: TechnicalCaseStudyCtaVariant;
    secondaryLabel: string;
    secondaryTo: string;
  };
};
