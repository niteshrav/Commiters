import { ROUTES } from "./routes";

export type NextSaasCaseStudyCapability = {
  id: string;
  label: string;
  body: string;
  icon: "cross-platform" | "regression" | "benchmarking";
};

export type NextSaasCaseStudyInfrastructureStep = {
  id: string;
  number: string;
  title: string;
  body: string;
};

export const NEXTSAAS_CASE_STUDY_COPY = {
  documentTitle: "NextSaas Case Study",
  kicker: "CASE STUDY — TECHNICAL",
  title: "NextSaas Quality Assurance.",
  description:
    "Comprehensive end-to-end quality assurance for a SaaS template, ensuring performance and reliability across web and mobile platforms.",
  introHeroImage: {
    src: "/assets/case-studies/nextsaas.png",
    srcSet: "/assets/case-studies/nextsaas@2x.png 2x",
    alt: "Dark laptop displaying NextSaas automated pipeline analytics dashboards",
  },
  scope: {
    heading: "Scope",
    description: "Manual and automated testing frameworks tailored for scalable SaaS ecosystems.",
    items: ["Unit Testing", "Integration Tests", "CI/CD Hooks"] as const,
  },
  pipelines: {
    heading: "Automated Pipelines",
    subheading: "99.9% uptime validation through persistent monitoring scripts.",
  },
  capabilities: {
    items: [
      {
        id: "cross-platform",
        label: "CROSS-PLATFORM",
        body: "Uniform UI/UX verification across 12+ device resolutions and OS versions.",
        icon: "cross-platform",
      },
      {
        id: "regression",
        label: "REGRESSION",
        body: "Automated suites ensuring legacy features remain intact during rapid iteration.",
        icon: "regression",
      },
      {
        id: "benchmarking",
        label: "BENCHMARKING",
        body: "Rigorous performance profiling to optimize TTI and server response times.",
        icon: "benchmarking",
      },
    ] satisfies NextSaasCaseStudyCapability[],
  },
  infrastructure: {
    heading: "Precision Infrastructure.",
    items: [
      {
        id: "unit-calibration",
        number: "01",
        title: "Unit Calibration",
        body: "Isolated component testing using high-fidelity stubs to ensure modular reliability.",
      },
      {
        id: "load-simulation",
        number: "02",
        title: "Load Simulation",
        body: "Rigorous stress testing to identify system limits and ensure stability under peak production loads",
      },
    ] satisfies NextSaasCaseStudyInfrastructureStep[],
  },
  visualBreak: {
    image: {
      src: "/assets/case-studies/nextsaas-infrastructure.png",
      srcSet: "/assets/case-studies/nextsaas-infrastructure@2x.png 2x",
      alt: "High-detail microchip macro photography representing NextSaas precision testing infrastructure",
    },
    badgeLabel: "PASS RATE",
    badgeValue: "99.8%",
  },
  bottomCta: {
    title: "Ready for Production.",
    description:
      "The NextSaas framework is now fully certified for enterprise-grade deployment, having cleared over 450 technical audit checkpoints.",
    primaryLabel: "Review Full Audit",
    primaryTo: ROUTES.caseStudies,
    secondaryLabel: "Contact Engineer",
    secondaryTo: ROUTES.contact,
  },
} as const;
