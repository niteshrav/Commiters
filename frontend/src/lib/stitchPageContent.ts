import { ROUTES } from "./routes";
import { buildDiscoveryCallCalendarUrl, buildWhatsAppUrl } from "./siteContact";

export type ServiceHoverAction = {
  kind: "link" | "button";
  label: string;
  href: string;
};

export type StitchServiceCard = {
  id: string;
  title: string;
  description: string;
  icon: "website" | "ai" | "webapp" | "mobile" | "automation" | "mvp";
  gridSpan: 1 | 2 | 3;
  layout: "standard" | "split";
  hoverAction: ServiceHoverAction;
};

export const STITCH_SERVICES_GRID: StitchServiceCard[] = [
  {
    id: "website-development",
    title: "Website Development",
    description:
      "High-conversion marketing sites and enterprise portals built with speed, SEO, and accessibility as core priorities.",
    icon: "website",
    gridSpan: 2,
    layout: "standard",
    hoverAction: { kind: "link", label: "Learn more", href: ROUTES.contact },
  },
  {
    id: "ai-integration",
    title: "AI Integration",
    description:
      "Embedding LLMs and custom machine learning models into your existing workflows to drive automation.",
    icon: "ai",
    gridSpan: 1,
    layout: "standard",
    hoverAction: { kind: "link", label: "Learn more", href: ROUTES.contact },
  },
  {
    id: "web-applications",
    title: "Web Applications",
    description:
      "Complex, data-driven platforms designed for scalability and performance. We handle the heavy lifting of state management and API architecture.",
    icon: "webapp",
    gridSpan: 1,
    layout: "standard",
    hoverAction: { kind: "link", label: "Learn more", href: ROUTES.contact },
  },
  {
    id: "mobile-applications",
    title: "Mobile Applications",
    description:
      "Native and cross-platform mobile experiences that feel fluid and integrated. Performance-first iOS and Android development.",
    icon: "mobile",
    gridSpan: 1,
    layout: "standard",
    hoverAction: { kind: "link", label: "Learn more", href: ROUTES.contact },
  },
  {
    id: "mvp-development",
    title: "MVP Development",
    description:
      "Go from concept to market in weeks. We focus on the core value proposition to validate your product quickly.",
    icon: "mvp",
    gridSpan: 1,
    layout: "standard",
    hoverAction: { kind: "link", label: "Learn more", href: ROUTES.contact },
  },
  {
    id: "automation-tools",
    title: "Automation Tools",
    description:
      "Bespoke internal tools and scripts that eliminate repetitive tasks, connecting your disparate data sources into a unified ecosystem.",
    icon: "automation",
    gridSpan: 3,
    layout: "split",
    hoverAction: { kind: "button", label: "Inquire about Automation", href: ROUTES.contact },
  },
];

export type CaseStudyCard = {
  id: string;
  category: string;
  title: string;
  href: string;
};

export const STITCH_CASE_STUDIES: CaseStudyCard[] = [
  {
    id: "finflow",
    category: "WEB APPLICATION",
    title: "Finflow: Next-Gen Fintech Dashboard",
    href: ROUTES.contact,
  },
  {
    id: "logitrack",
    category: "AI INTEGRATION",
    title: "LogiTrack AI: Autonomous Logistics",
    href: ROUTES.contact,
  },
];

export const STITCH_CONTACT_SIDEBAR = [
  {
    id: "whatsapp",
    label: "WhatsApp",
    title: "Chat with an Engineer",
    href: buildWhatsAppUrl(),
    iconVariant: "whatsapp" as const,
    external: true,
  },
  {
    id: "scheduling",
    label: "Scheduling",
    title: "Book a Discovery Call",
    href: buildDiscoveryCallCalendarUrl(),
    iconVariant: "calendar" as const,
    external: true,
  },
] as const;

export const STITCH_PROJECT_TYPE_DEFAULT = "Custom Engineering" as const;
