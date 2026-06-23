import { describe, expect, it } from "vitest";
import { ROUTES } from "./routes";
import {
  NAV_DROPDOWN_LINK_ACTIVE_CLASS,
  PRIMARY_NAV_ITEMS,
  SERVICE_NAV_ENTRIES,
  buildServiceSectionHref,
  buildServiceSectionLocation,
  resolveActiveServiceSectionId,
} from "./navSections";

describe("navSections", () => {
  it("lists primary nav items with Services before Our Work and Technical Ledger after Our Work", () => {
    expect(PRIMARY_NAV_ITEMS.map((item) => item.label)).toEqual([
      "Home",
      "About",
      "Services",
      "Our Work",
      "Technical Ledger",
      "Join Us",
      "Contact",
    ]);
    expect(PRIMARY_NAV_ITEMS.map((item) => item.to)).toEqual([
      ROUTES.home,
      ROUTES.about,
      ROUTES.services,
      ROUTES.caseStudies,
      ROUTES.technicalLedger,
      ROUTES.joinUs,
      ROUTES.contact,
    ]);
    const servicesIndex = PRIMARY_NAV_ITEMS.findIndex((item) => item.id === "services");
    const ourWorkIndex = PRIMARY_NAV_ITEMS.findIndex((item) => item.id === "our-work");
    const technicalLedgerIndex = PRIMARY_NAV_ITEMS.findIndex((item) => item.id === "technical-ledger");
    const joinUsIndex = PRIMARY_NAV_ITEMS.findIndex((item) => item.id === "join-us");
    expect(servicesIndex).toBeGreaterThan(-1);
    expect(ourWorkIndex).toBeGreaterThan(servicesIndex);
    expect(technicalLedgerIndex).toBeGreaterThan(ourWorkIndex);
    expect(joinUsIndex).toBeGreaterThan(technicalLedgerIndex);
  });

  it("builds stable service section URLs for Services page anchors", () => {
    expect(buildServiceSectionHref("website-development")).toBe(`${ROUTES.services}#website-development`);
    expect(buildServiceSectionLocation("website-development")).toEqual({
      pathname: ROUTES.services,
      hash: "#website-development",
    });
    expect(SERVICE_NAV_ENTRIES.map((e) => e.id)).toEqual([
      "website-development",
      "web-applications",
      "mobile-applications",
      "automation-tools",
      "ai-integration",
      "mvp-development",
    ]);
  });

  it("resolves the active service section only on /services with a known hash", () => {
    expect(resolveActiveServiceSectionId(ROUTES.services, "#automation-tools")).toBe("automation-tools");
    expect(resolveActiveServiceSectionId(ROUTES.services, "")).toBeNull();
    expect(resolveActiveServiceSectionId(ROUTES.home, "#automation-tools")).toBeNull();
    expect(resolveActiveServiceSectionId(ROUTES.services, "#unknown")).toBeNull();
  });

  it("exports the active dropdown link class for hover-matched highlighting", () => {
    expect(NAV_DROPDOWN_LINK_ACTIVE_CLASS).toBe("nav-dropdown-link--active");
  });
});
