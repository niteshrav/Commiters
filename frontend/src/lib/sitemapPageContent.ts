import { buildAboutSectionHref } from "./navSections";
import { ROUTES } from "./routes";

export type SitemapPageIcon =
  | "company"
  | "services"
  | "work"
  | "careers"
  | "about"
  | "legal"
  | "local";

export type SitemapPageLink = {
  label: string;
  to: string;
  description?: string;
};

export type SitemapPageGroup = {
  id: string;
  title: string;
  description: string;
  icon: SitemapPageIcon;
  links: readonly SitemapPageLink[];
};

export const SITEMAP_XML_PATH = "/sitemap.xml" as const;

export const SITEMAP_PAGE_COPY = {
  kicker: "Navigation",
  title: "Site Map",
  subtext:
    "A structured index of every public page on Commiters — from services and case studies to careers, legal policies, and local offerings.",
  xmlLabel: "Download XML sitemap",
  statsLabel: "indexed pages",
  bottomNote:
    "Can't find what you need? Reach out and our team will point you to the right service, case study, or contact channel.",
  bottomCtaLabel: "Contact the team",
  bottomCtaTo: ROUTES.contact,
  groups: [
    {
      id: "company",
      title: "Company",
      description: "Core pages for exploring who we are and how to connect.",
      icon: "company",
      links: [
        { label: "Home", to: ROUTES.home, description: "Engineering studio overview and featured work." },
        { label: "About", to: ROUTES.about, description: "Vision, craftsmanship, and operating principles." },
        { label: "Services", to: ROUTES.services, description: "AI operational engineering and custom web systems." },
        { label: "Work", to: ROUTES.caseStudies, description: "Case studies and shipped products." },
        { label: "trustTap", to: ROUTES.trustTap, description: "Our trust and verification product." },
        { label: "OpsFlow AI", to: ROUTES.opsFlow, description: "Free invoice-to-Excel sandbox for operations teams." },
        { label: "Free Business Utilities", to: ROUTES.utilities, description: "Zero-code operational tools including OpsFlow AI." },
        { label: "Blog", to: ROUTES.technicalLedger, description: "Technical notes and engineering insights." },
        { label: "FAQ", to: ROUTES.faq, description: "Common questions about process, pricing, and delivery." },
        { label: "Testimonials", to: ROUTES.testimonials, description: "Client feedback and delivery outcomes." },
        { label: "Contact", to: ROUTES.contact, description: "Project inquiries and discovery calls." },
      ],
    },
    {
      id: "services",
      title: "Services",
      description: "Dedicated pages for each engineering offering.",
      icon: "services",
      links: [
        {
          label: "AI Operational Audits",
          to: ROUTES.aiOperationalAudit,
          description: "2-week diagnostic that maps bottlenecks and ships a working AI prototype.",
        },
        {
          label: "Governed AI & Workflow Systems",
          to: ROUTES.aiSolutions,
          description: "GST/PAN document parsing, MCP sockets, and portable LLM backends with zero vendor lock-in.",
        },
        {
          label: "Spec-Driven Full-Stack Platforms",
          to: ROUTES.webApplications,
          description: "Operational web systems and SaaS portals on Vite, React, Express, and MongoDB.",
        },
        {
          label: "Workflow & Process Automation",
          to: ROUTES.workflowAutomation,
          description: "Automated pipelines connecting CRM, WhatsApp, email, and accounting systems.",
        },
      ],
    },
    {
      id: "work",
      title: "Portfolio",
      description: "Selected builds across web, mobile, AI, and SaaS.",
      icon: "work",
      links: [
        { label: "Commiters.com", to: ROUTES.commitersCaseStudy, description: "Spec-driven cloud platform architecture." },
        { label: "AI Summarizer", to: ROUTES.aiSummarizerCaseStudy, description: "Governed document ingestion and LLM pipeline." },
        { label: "NearDrop MVP", to: ROUTES.neardropCaseStudy, description: "Cloud logistics and real-time field coordination." },
        { label: "Multi-Role CRM", to: ROUTES.multiRoleCrmCaseStudy, description: "Governed AI CRM with RLS and MCP sockets." },
        { label: "Browse My Vacation", to: ROUTES.browseMyVacationCaseStudy, description: "B2B/B2C travel marketplace on the edge." },
        { label: "ProspectIQ AI", to: ROUTES.prospectIqCaseStudy, description: "Governed B2B prospecting and intent intelligence." },
        { label: "EcoRoute Intelligence", to: ROUTES.ecoRouteCaseStudy, description: "Cloud-native green fleet and route optimization." },
      ],
    },
    {
      id: "careers",
      title: "Careers",
      description: "Join the studio or explore open engineering roles.",
      icon: "careers",
      links: [
        { label: "Open Positions", to: ROUTES.openPositions, description: "Current roles across engineering and delivery." },
        { label: "Join Us", to: ROUTES.joinUs, description: "General applications and talent pipeline." },
      ],
    },
    {
      id: "about",
      title: "About Sections",
      description: "Deep links into the About page.",
      icon: "about",
      links: [
        { label: "Vision", to: buildAboutSectionHref("vision") },
        { label: "What We Stand For", to: buildAboutSectionHref("principles") },
        { label: "From Idea to Production", to: buildAboutSectionHref("how-we-work") },
      ],
    },
    {
      id: "legal",
      title: "Legal & Policies",
      description: "Privacy, cookies, terms, and site indexing.",
      icon: "legal",
      links: [
        { label: "Privacy Policy", to: ROUTES.privacyPolicy },
        { label: "Cookie Policy", to: ROUTES.cookiePolicy },
        { label: "Terms of Service", to: ROUTES.terms },
        { label: "Site Map", to: ROUTES.sitemap },
      ],
    },
    {
      id: "local",
      title: "Local Pages",
      description: "Location-focused service landing pages.",
      icon: "local",
      links: [
        { label: "Website Development in Udaipur", to: ROUTES.websiteDevelopmentUdaipur },
        { label: "WhatsApp Automation in Udaipur", to: ROUTES.whatsappAutomationUdaipur },
      ],
    },
  ] satisfies readonly SitemapPageGroup[],
} as const;

export function countSitemapLinks(groups: readonly SitemapPageGroup[] = SITEMAP_PAGE_COPY.groups): number {
  return groups.reduce((total, group) => total + group.links.length, 0);
}
