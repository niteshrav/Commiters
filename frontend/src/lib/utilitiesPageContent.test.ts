import { describe, expect, it } from "vitest";
import { ROUTES } from "./routes";
import { SERVICES_OVERVIEW_INQUIRY_ANCHOR } from "./servicesOverviewPageContent";
import {
  UTILITIES_BANNER,
  UTILITIES_HERO,
  UTILITIES_SEO,
  UTILITIES_TOOLS,
} from "./utilitiesPageContent";

describe("utilitiesPageContent", () => {
  it("defines the free utilities hub copy and canonical path", () => {
    expect(UTILITIES_SEO.path).toBe(ROUTES.utilities);
    expect(UTILITIES_SEO.path).toBe("/utilities");
    expect(UTILITIES_HERO.eyebrow).toBe("ZERO-CODE CLOUD UTILITIES");
    expect(UTILITIES_HERO.title).toBe("Free Operational Business Utilities");
    expect(UTILITIES_HERO.subtitle).toBe(
      "Lightweight, zero-code tools engineered by Committers to streamline daily document extraction, verification, and business operations.",
    );
    expect(UTILITIES_SEO.description).toBe(UTILITIES_HERO.subtitle);
  });

  it("lists OpsFlow and the GST verification checker with conversion links", () => {
    expect(UTILITIES_TOOLS.map((tool) => tool.title)).toEqual([
      "OpsFlow AI PDF-to-Excel Converter",
      "GST & Business Verification Checker",
    ]);
    expect(UTILITIES_TOOLS[0]?.to).toBe(ROUTES.opsFlowPlayground);
    expect(UTILITIES_TOOLS[1]?.to).toBe(`${ROUTES.services}#${SERVICES_OVERVIEW_INQUIRY_ANCHOR}`);
    expect(UTILITIES_TOOLS.every((tool) => tool.to !== ROUTES.trustTap)).toBe(true);
  });

  it("closes with a custom-tool banner that books an operational audit", () => {
    expect(UTILITIES_BANNER.title).toBe("Need a custom tool or automated cloud workflow for your team?");
    expect(UTILITIES_BANNER.ctaLabel).toBe("Book Operational Audit");
    expect(UTILITIES_BANNER.ctaTo).toBe(ROUTES.aiOperationalAudit);
  });
});
