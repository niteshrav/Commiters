import { describe, expect, it } from "vitest";
import { ROUTES } from "./routes";
import { STITCH_COPY } from "./stitchDesign";
import {
  THANK_YOU_PAGE_COPY,
  resolveThankYouSubmissionView,
} from "./thankYouPageContent";

describe("thankYouPageContent", () => {
  it("matches the Stitch thank-you screen copy", () => {
    expect(THANK_YOU_PAGE_COPY.title).toBe(STITCH_COPY.thankYou.title);
    expect(THANK_YOU_PAGE_COPY.clientBody).toBe(STITCH_COPY.thankYou.views.client.body);
    expect(THANK_YOU_PAGE_COPY.candidateBody).toBe(
      "Your application to join the team has been received. We appreciate your interest in Commiters. Our team will review your credentials and reach out if there's a match.",
    );
    expect(THANK_YOU_PAGE_COPY.backToHomeLabel).toBe(STITCH_COPY.thankYou.backToHomeLabel);
    expect(THANK_YOU_PAGE_COPY.projectLedgerLabel).toBe(STITCH_COPY.thankYou.projectLedgerLabel);
    expect(THANK_YOU_PAGE_COPY.infrastructureLabel).toBe(STITCH_COPY.thankYou.infrastructureLabel);
  });

  it("routes the project ledger CTA to the case studies index", () => {
    expect(THANK_YOU_PAGE_COPY.projectLedgerTo).toBe(ROUTES.caseStudies);
    expect(THANK_YOU_PAGE_COPY.backToHomeTo).toBe(ROUTES.home);
  });

  it("defaults to the client view when navigation state is missing", () => {
    expect(resolveThankYouSubmissionView(undefined)).toBe("client");
    expect(resolveThankYouSubmissionView(null)).toBe("client");
    expect(resolveThankYouSubmissionView({})).toBe("client");
  });

  it("reads the submission view from router navigation state", () => {
    expect(resolveThankYouSubmissionView({ submissionView: "candidate" })).toBe("candidate");
    expect(resolveThankYouSubmissionView({ submissionView: "client" })).toBe("client");
  });
});
