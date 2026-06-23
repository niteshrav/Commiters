import { describe, expect, it } from "vitest";
import { APP_ROUTE_PATHS, ROUTES } from "./routes";

describe("routes", () => {
  it("defines paths aligned with App.tsx routing", () => {
    expect(ROUTES.home).toBe("/");
    expect(ROUTES.about).toBe("/about");
    expect(ROUTES.caseStudies).toBe("/case-studies");
    expect(ROUTES.technicalLedger).toBe("/technical-ledger");
    expect(ROUTES.commitersCaseStudy).toBe("/case-studies/commiters");
    expect(ROUTES.aiSummarizerCaseStudy).toBe("/case-studies/ai-summarizer");
    expect(ROUTES.neardropCaseStudy).toBe("/case-studies/neardrop-mvp");
    expect(ROUTES.nextsaasCaseStudy).toBe("/case-studies/nextsaas");
    expect(ROUTES.services).toBe("/services");
    expect(ROUTES.joinUs).toBe("/join-us");
    expect(ROUTES.contact).toBe("/contact");
    expect(ROUTES.privacyPolicy).toBe("/privacy-policy");
    expect(ROUTES.cookiePolicy).toBe("/cookie-policy");
    expect(ROUTES.terms).toBe("/terms");
    expect(ROUTES.thankYou).toBe("/thank-you");
    expect(ROUTES.notFound).toBe("/404");
  });

  it("lists each route exactly once", () => {
    expect(APP_ROUTE_PATHS.length).toBe(new Set(APP_ROUTE_PATHS).size);
  });
});
