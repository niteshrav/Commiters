import { ROUTES } from "./routes";

export type HomeMetric = {
  value: string;
  label: string;
};

/** Public paths for home mockup photography (cropped from Stitch screenshots). */
export const HOME_PAGE_ASSETS = {
  heroMonitor: "/assets/home/home-hero-monitor.png",
  heroMonitor2x: "/assets/home/home-hero-monitor@2x.png",
  serverRacks: "/assets/home/server-racks.png",
  serverRacks2x: "/assets/home/server-racks@2x.png",
} as const;

export const HOME_PAGE_COPY = {
  hero: {
    title: "Code Your Success",
    subtext:
      "We transform complex architectural challenges into scalable, production-ready systems. Founder-led engineering for high-stakes digital products.",
    ctaPrimary: "Our Work",
    ctaPrimaryTo: ROUTES.caseStudies,
    ctaSecondary: "Meet Our Team",
    sprintLabel: "CURRENT SPRINT",
    sprintValue: "v2.4.0 Engine",
  },
  corePillars: {
    title: "Our Core Pillars",
    subtext:
      "We don't just build features; we build foundations. Our methodology is rooted in absolute transparency and technical rigor.",
    founderLed: {
      title: "Founder-Led Delivery",
      body:
        "Every project is architected and overseen by our founder. No hand-offs to juniors, just direct communication with the expert building your vision.",
      linkLabel: "Learn about our process",
      linkTo: ROUTES.about,
    },
    fastLaunch: {
      title: "Fast Launch Cycles",
      body:
        "We prioritize speed-to-market without compromising integrity. Weekly deployments and real-time feedback loops keep us agile.",
    },
    quality: {
      title: "Quality-First Engineering",
      body:
        "Our 'Commit Early, Test Often' philosophy ensures your codebase remains a strategic asset, not a technical debt burden. Automated testing and rigorous code reviews are non-negotiable.",
      metrics: [
        { value: "99.9%", label: "TARGET UPTIME SLA" },
        { value: "<200ms", label: "CORE API RESPONSE (P95)" },
        { value: "Every release", label: "AUTOMATED TESTING" },
        { value: "24/7", label: "MONITORING & ALERTS" },
      ],
    },
  },
  builtForScale: {
    title: "Built for Scale",
    body:
      "We architect systems that evolve with your business. By focusing on clean interfaces and modular components, we ensure that today's code supports tomorrow's growth.",
    features: [
      {
        title: "Cloud-Native Architecture",
        description: "Seamless integration with AWS, Azure, or GCP for infinite scalability.",
      },
      {
        title: "Security by Design",
        description: "End-to-end encryption and strict compliance adherence from day one.",
      },
      {
        title: "Performance Optimization",
        description: "Micro-optimizations to ensure lightning-fast user experiences.",
      },
    ],
  },
  bottomCta: {
    title: "Ready to Build the Future?",
    subtext: "Join the ranks of high-performance companies powered by Commiters.",
    button: "Start Your Project Cycle",
    buttonTo: ROUTES.contact,
  },
} as const;
