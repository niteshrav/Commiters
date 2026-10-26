import { describe, expect, it } from "vitest";
import { ROUTES } from "./routes";
import { SITE_FOOTER_CONNECT_LINKS } from "./siteFooterCopy";
import { SITE_GITHUB_URL, SITE_INSTAGRAM_URL, SITE_LINKEDIN_URL } from "./siteLinks";
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
      "Work",
      "About",
      "Prooflyn",
      "OpsFlow AI",
      "Contact",
      "Careers",
    ]);
    expect(MOBILE_NAV_SERVICE_LINKS.map((link) => ({ label: link.label, to: link.to, description: link.description }))).toEqual([
      {
        label: "AI Operational Audits",
        to: ROUTES.audit,
        description: "48-hour workflow diagnostics, bottleneck elimination, and live automation blueprints.",
      },
      {
        label: "Governed AI & Workflow Systems",
        to: ROUTES.aiSolutionsShort,
        description: "Custom pipelines, policy gateways, and enterprise AI workflows.",
      },
      {
        label: "Spec-Driven Full-Stack Platforms",
        to: ROUTES.webApplicationsShort,
        description: "Scalable web apps, cloud portals, and spec-driven SaaS architecture.",
      },
      {
        label: "High-Performance Web & Mobile Apps",
        to: `${ROUTES.services}#engineering-capabilities`,
        description: "Custom B2B web applications, mobile platforms, and SaaS MVPs.",
      },
      {
        label: "Automation & Integration Tools",
        to: `${ROUTES.services}#engineering-capabilities`,
        description: "API integrations, document processing, and operational workflow tools.",
      },
    ]);
    expect(MOBILE_NAV_SERVICE_LINKS.some((link) => /trusttap|opsflow/i.test(link.label) || /trusttap|opsflow/i.test(link.to))).toBe(false);
    const about = MOBILE_NAV_DRAWER_ITEMS.find((item) => item.id === "about");
    const work = MOBILE_NAV_DRAWER_ITEMS.find((item) => item.id === "work");
    const trusttap = MOBILE_NAV_DRAWER_ITEMS.find((item) => item.id === "trusttap");
    const opsflow = MOBILE_NAV_DRAWER_ITEMS.find((item) => item.id === "opsflow");
    const contact = MOBILE_NAV_DRAWER_ITEMS.find((item) => item.id === "contact");
    const careers = MOBILE_NAV_DRAWER_ITEMS.find((item) => item.id === "careers");
    expect(about && "expandable" in about ? about.expandable : false).toBe(true);
    expect(work && "expandable" in work ? work.expandable : false).toBe(true);
    expect(trusttap && "expandable" in trusttap ? trusttap.expandable : false).toBe(true);
    expect(trusttap && "children" in trusttap ? trusttap.children.map((child) => child.label) : []).toEqual([
      "Product Overview",
      "Merchant Intelligence",
      "How It Works",
    ]);
    expect(trusttap && "children" in trusttap ? trusttap.children.map((child) => child.to) : []).toEqual([
      `${ROUTES.trustTap}#product-overview`,
      `${ROUTES.trustTap}#core-pillars`,
      `${ROUTES.trustTap}#how-it-works`,
    ]);
    expect(opsflow && "expandable" in opsflow ? opsflow.expandable : false).toBe(true);
    expect(opsflow && "children" in opsflow ? opsflow.children.map((child) => child.label) : []).toEqual([
      "Try Free Sandbox",
      "Extraction Capabilities",
      "How It Works & Integration",
    ]);
    expect(opsflow && "children" in opsflow ? opsflow.children.map((child) => child.to) : []).toEqual([
      `${ROUTES.opsFlow}#sandbox`,
      `${ROUTES.opsFlow}#features`,
      `${ROUTES.opsFlow}#how-it-works`,
    ]);
    expect(about && "children" in about ? about.children.map((child) => child.label) : []).toEqual([
      "The Studio",
      "Vision & Philosophy",
      "What We Stand For",
      "From Idea to Production",
    ]);
    expect(about && "children" in about ? about.children.map((child) => child.to) : []).toEqual([
      `${ROUTES.about}#the-studio`,
      `${ROUTES.about}#governed-engineering`,
      `${ROUTES.about}#our-values`,
      `${ROUTES.about}#delivery-journey`,
    ]);
    expect(work && "children" in work ? work.children.map((child) => child.to) : []).toEqual([
      ROUTES.caseStudies,
    ]);
    expect(contact && "to" in contact ? contact.to : undefined).toBe(ROUTES.contact);
    expect(careers && "to" in careers ? careers.to : undefined).toBe(ROUTES.openPositions);
  });

  it("pins drawer socials to the same brand-column icons as the footer", () => {
    expect(MOBILE_NAV_DRAWER_SOCIAL_LINKS).toBe(SITE_FOOTER_CONNECT_LINKS);
    expect(MOBILE_NAV_DRAWER_SOCIAL_LINKS.map((link) => link.label)).toEqual([
      "LinkedIn",
      "Instagram",
      "GitHub",
    ]);
    expect(MOBILE_NAV_DRAWER_SOCIAL_LINKS[0].href).toBe(SITE_LINKEDIN_URL);
    expect(MOBILE_NAV_DRAWER_SOCIAL_LINKS[1].href).toBe(SITE_INSTAGRAM_URL);
    expect(MOBILE_NAV_DRAWER_SOCIAL_LINKS[2].href).toBe(SITE_GITHUB_URL);
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
