import { describe, expect, it } from "vitest";
import { APP_ROUTE_PATHS, ROUTES, buildJoinUsApplyHref } from "./routes";

describe("routes", () => {
  it("defines paths aligned with App.tsx routing", () => {
    expect(ROUTES.home).toBe("/");
    expect(ROUTES.about).toBe("/about");
    expect(ROUTES.caseStudies).toBe("/work");
    expect(ROUTES.caseStudiesLegacy).toBe("/case-studies");
    expect(ROUTES.technicalLedger).toBe("/blog");
    expect(ROUTES.technicalLedgerLegacy).toBe("/technical-ledger");
    expect(ROUTES.commitersCaseStudy).toBe("/work/commiters");
    expect(ROUTES.aiSummarizerCaseStudy).toBe("/work/ai-summarizer");
    expect(ROUTES.neardropCaseStudy).toBe("/work/neardrop-mvp");
    expect(ROUTES.browseMyVacationCaseStudy).toBe("/work/browse-my-vacation");
    expect(ROUTES.nextsaasCaseStudy).toBe("/case-studies/nextsaas");
    expect(ROUTES.browseMyVacationCaseStudyLegacy).toBe("/case-studies/browse-my-vacation");
    expect(ROUTES.trustTap).toBe("/products/trusttap");
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

  it("builds the apply form URL with an optional position query", () => {
    expect(buildJoinUsApplyHref()).toBe("/join-us");
    expect(buildJoinUsApplyHref("Marketing Intern")).toBe("/join-us?position=Marketing%20Intern");
  });
});
