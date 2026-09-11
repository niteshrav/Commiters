import { describe, expect, it } from "vitest";
import { ROUTES } from "./routes";
import { SITE_FOOTER_CONNECT_LINKS } from "./siteFooterCopy";
import { SITE_GITHUB_URL, SITE_INSTAGRAM_URL, SITE_LINKEDIN_URL, SITE_MEDIUM_URL } from "./siteLinks";
import {
  HEADER_MENU_CLOSE_LABEL,
  HEADER_MENU_OPEN_LABEL,
  MOBILE_NAV_DRAWER_COPYRIGHT,
  MOBILE_NAV_DRAWER_ITEMS,
  MOBILE_NAV_DRAWER_PRIMARY_LABELS,
  MOBILE_NAV_DRAWER_SOCIAL_LINKS,
  MOBILE_NAV_DRAWER_WIDTH,
  MOBILE_NAV_SHEET_TOP,
  MOBILE_NAV_SERVICE_LINKS,
  SITE_HEADER_HEIGHT,
  SITE_HEADER_HEIGHT_MOBILE,
} from "./mobileNavDrawer";

describe("mobileNavDrawer", () => {
  it("lists primary drawer links with expandable mega-menu accordions", () => {
    expect(MOBILE_NAV_DRAWER_PRIMARY_LABELS).toEqual([
      "Services",
      "About",
      "Work",
      "trustTap",
      "OpsFlow AI",
      "Contact",
      "Careers",
    ]);
    expect(MOBILE_NAV_SERVICE_LINKS.map((link) => ({ label: link.label, to: link.to, description: link.description }))).toEqual([
      {
        label: "AI Operational Audits",
        to: ROUTES.aiOperationalAudit,
        description: "2-week workflow diagnostics & spec-driven cloud blueprints.",
      },
      {
        label: "Governed AI & Workflow Systems",
        to: ROUTES.aiSolutions,
        description: "Enterprise document parsing, LLM integrations & automated workflows.",
      },
      {
        label: "Spec-Driven Full-Stack Platforms",
        to: ROUTES.webApplications,
        description: "Scalable B2B web portals, SaaS platforms, & cloud web applications.",
      },
      {
        label: "Free Business Utilities",
        to: ROUTES.utilities,
        description: "Zero-code operational tools including OpsFlow AI PDF-to-Excel extraction.",
      },
    ]);
    const about = MOBILE_NAV_DRAWER_ITEMS.find((item) => item.id === "about");
    const work = MOBILE_NAV_DRAWER_ITEMS.find((item) => item.id === "work");
    const trusttap = MOBILE_NAV_DRAWER_ITEMS.find((item) => item.id === "trusttap");
    const opsflow = MOBILE_NAV_DRAWER_ITEMS.find((item) => item.id === "opsflow");
    const contact = MOBILE_NAV_DRAWER_ITEMS.find((item) => item.id === "contact");
    const careers = MOBILE_NAV_DRAWER_ITEMS.find((item) => item.id === "careers");
    expect(about && "expandable" in about ? about.expandable : false).toBe(true);
    expect(work && "expandable" in work ? work.expandable : false).toBe(true);
    expect(trusttap && "expandable" in trusttap ? trusttap.expandable : false).toBe(true);
    expect(opsflow && "expandable" in opsflow ? opsflow.expandable : false).toBe(true);
    expect(about && "children" in about ? about.children.map((child) => child.label) : []).toEqual([
      "The Studio",
      "Vision",
      "What We Stand For",
      "From Idea to Production",
    ]);
    expect(work && "children" in work ? work.children.map((child) => child.to) : []).toEqual([
      `${ROUTES.caseStudies}#featured-case-studies`,
      ROUTES.commitersCaseStudy,
      ROUTES.aiSummarizerCaseStudy,
      ROUTES.multiRoleCrmCaseStudy,
    ]);
    expect(contact && "to" in contact ? contact.to : undefined).toBe(ROUTES.contact);
    expect(careers && "to" in careers ? careers.to : undefined).toBe(ROUTES.openPositions);
  });

  it("pins drawer socials to the same brand-column icons as the footer", () => {
    expect(MOBILE_NAV_DRAWER_SOCIAL_LINKS).toBe(SITE_FOOTER_CONNECT_LINKS);
    expect(MOBILE_NAV_DRAWER_SOCIAL_LINKS.map((link) => link.label)).toEqual([
      "LinkedIn",
      "Instagram",
      "Medium",
      "GitHub",
    ]);
    expect(MOBILE_NAV_DRAWER_SOCIAL_LINKS[0].href).toBe(SITE_LINKEDIN_URL);
    expect(MOBILE_NAV_DRAWER_SOCIAL_LINKS[1].href).toBe(SITE_INSTAGRAM_URL);
    expect(MOBILE_NAV_DRAWER_SOCIAL_LINKS[2].href).toBe(SITE_MEDIUM_URL);
    expect(MOBILE_NAV_DRAWER_SOCIAL_LINKS[3].href).toBe(SITE_GITHUB_URL);
  });

  it("uses the short legal copyright line in the drawer footer", () => {
    expect(MOBILE_NAV_DRAWER_COPYRIGHT).toBe("Copyright 2026 © Commiters Softwares");
  });

  it("pins a full-width sheet below the sticky header instead of a side drawer", () => {
    expect(SITE_HEADER_HEIGHT).toBe("96px");
    expect(SITE_HEADER_HEIGHT_MOBILE).toBe("72px");
    expect(MOBILE_NAV_SHEET_TOP).toBe("var(--site-header-height)");
    expect(MOBILE_NAV_DRAWER_WIDTH).toBe("100%");
    expect(HEADER_MENU_OPEN_LABEL).toBe("Open menu");
    expect(HEADER_MENU_CLOSE_LABEL).toBe("Close menu");
  });
});
