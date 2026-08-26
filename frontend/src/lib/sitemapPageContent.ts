import { buildAboutSectionHref, buildServiceDetailMenuHref, SERVICE_NAV_ENTRIES } from "./navSections";
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
        { label: "Services", to: ROUTES.services, description: "Full-stack development capabilities and expertise." },
        { label: "Work", to: ROUTES.caseStudies, description: "Case studies and shipped products." },
        { label: "TrustTap", to: ROUTES.trustTap, description: "Our trust and verification product." },
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
      links: SERVICE_NAV_ENTRIES.map((entry) => ({
        label: entry.label,
        to: buildServiceDetailMenuHref(entry.id),
      })),
    },
    {
      id: "work",
      title: "Portfolio",
      description: "Selected builds across web, mobile, AI, and SaaS.",
      icon: "work",
      links: [
        { label: "Commiters.com", to: ROUTES.commitersCaseStudy, description: "Marketing site and CMS platform." },
        { label: "AI Summarizer", to: ROUTES.aiSummarizerCaseStudy, description: "Document intelligence workflow." },
        { label: "NearDrop MVP", to: ROUTES.neardropCaseStudy, description: "Location-based product MVP." },
        { label: "Multi-Role CRM", to: ROUTES.multiRoleCrmCaseStudy, description: "Role-based operations platform." },
        { label: "Browse My Vacation", to: ROUTES.browseMyVacationCaseStudy, description: "Travel booking experience." },
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
        { label: "Operating Principles", to: buildAboutSectionHref("principles") },
        { label: "How We Work", to: buildAboutSectionHref("how-we-work") },
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
