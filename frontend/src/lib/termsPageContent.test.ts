import { describe, expect, it } from "vitest";
import {
  TERMS_ENTERPRISE_CTA,
  TERMS_PAGE_COPY,
  TERMS_PAGE_SECTIONS,
} from "./termsPageContent";
import { ROUTES } from "./routes";
import { STITCH_COPY } from "./stitchDesign";

describe("termsPageContent", () => {
  it("pins the terms hero and uses the same last-updated date as the privacy page", () => {
    expect(STITCH_COPY.terms.title).toBe("Terms of Service");
    expect(STITCH_COPY.terms.lastUpdatedLabel).toBe("Last updated:");
    expect(TERMS_PAGE_COPY.lastUpdatedDate).toBe(STITCH_COPY.terms.lastUpdatedDate);
    expect(TERMS_PAGE_COPY.lastUpdatedDate).toBe(STITCH_COPY.privacy.lastUpdatedDate);
  });

  it("lists the numbered terms sections from the Stitch screenshot", () => {
    expect(TERMS_PAGE_SECTIONS.map((section) => section.number)).toEqual(["01", "02", "03", "04", "05"]);
    expect(TERMS_PAGE_SECTIONS.map((section) => section.title)).toEqual([
      "Acceptance of Terms",
      "Service Description",
      "Intellectual Property",
      "Limitation of Liability",
      "Governing Law",
    ]);
    expect(TERMS_PAGE_SECTIONS.map((section) => section.accent)).toEqual([
      "blue",
      "gold",
      "blue",
      "gold",
      "blue",
    ]);
  });

  it("defines acceptance, service checklist, and liability highlight copy from the document", () => {
    const acceptance = TERMS_PAGE_SECTIONS[0].blocks[0];
    expect(acceptance.kind).toBe("paragraph");
    if (acceptance.kind !== "paragraph") return;
    expect(acceptance.text).toContain('Commiters Softwares ("we," "us," or "our")');

    const services = TERMS_PAGE_SECTIONS[1].blocks[1];
    expect(services.kind).toBe("checklist");
    if (services.kind !== "checklist") return;
    expect(services.items).toEqual([
      "Custom Web & Mobile Engineering",
      "Cloud Infrastructure & DevOps",
      "Technical Strategy Consulting",
    ]);

    const liability = TERMS_PAGE_SECTIONS[3].blocks[0];
    expect(liability.kind).toBe("highlight");
    if (liability.kind !== "highlight") return;
    expect(liability.text).toContain("To the maximum extent permitted by law");
  });

  it("defines the enterprise support CTA from the screenshot", () => {
    expect(TERMS_ENTERPRISE_CTA.title).toBe("Have Enterprise Questions?");
    expect(TERMS_ENTERPRISE_CTA.description).toContain("Master Service Agreement (MSA)");
    expect(TERMS_ENTERPRISE_CTA.buttonLabel).toBe("Contact Support");
    expect(TERMS_ENTERPRISE_CTA.href).toBe(ROUTES.contact);
  });
});
