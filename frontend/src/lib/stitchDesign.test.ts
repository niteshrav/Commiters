import { describe, expect, it } from "vitest";
import {
  STITCH_COPY,
  STITCH_JOIN_US_PREVIEW_NODE_ID,
  STITCH_JOIN_US_PREVIEW_URL,
  STITCH_PREVIEW_NODE_ID,
  STITCH_PRIVACY_PREVIEW_NODE_ID,
  STITCH_PRIVACY_PREVIEW_URL,
  STITCH_PROJECT_ID,
  STITCH_TERMS_PREVIEW_NODE_ID,
  STITCH_TERMS_PREVIEW_URL,
  STITCH_TECHNICAL_LEDGER_PREVIEW_NODE_ID,
  STITCH_TECHNICAL_LEDGER_PREVIEW_URL,
  STITCH_THANK_YOU_PREVIEW_NODE_ID,
  STITCH_THANK_YOU_PREVIEW_URL,
} from "./stitchDesign";

describe("stitchDesign", () => {
  it("pins the Stitch project from user screenshots", () => {
    expect(STITCH_PROJECT_ID).toBe("15498726935719082035");
    expect(STITCH_PREVIEW_NODE_ID).toBe("36209a9664dd425f8a56bb19e6841473");
    expect(STITCH_PRIVACY_PREVIEW_NODE_ID).toBe("2b804f684c5843eeb60b0458e7791889");
    expect(STITCH_TERMS_PREVIEW_NODE_ID).toBe("8ffb701bbc824415a7ea1b91e638e645");
    expect(STITCH_TECHNICAL_LEDGER_PREVIEW_NODE_ID).toBe("d3c0a8479fb44f93b19d93f99aba2971");
    expect(STITCH_JOIN_US_PREVIEW_NODE_ID).toBe("2df09e96dafb4150b8425aa79f376b20");
    expect(STITCH_THANK_YOU_PREVIEW_NODE_ID).toBe("cdffe3f786c0490b9a05b69a7a66416d");
    expect(STITCH_JOIN_US_PREVIEW_URL).toBe(
      "https://stitch.withgoogle.com/preview/15498726935719082035?node-id=2df09e96dafb4150b8425aa79f376b20&raw=1",
    );
    expect(STITCH_PRIVACY_PREVIEW_URL).toBe(
      "https://stitch.withgoogle.com/preview/15498726935719082035?node-id=2b804f684c5843eeb60b0458e7791889&raw=1",
    );
    expect(STITCH_TERMS_PREVIEW_URL).toBe(
      "https://stitch.withgoogle.com/preview/15498726935719082035?node-id=8ffb701bbc824415a7ea1b91e638e645&raw=1",
    );
    expect(STITCH_TECHNICAL_LEDGER_PREVIEW_URL).toBe(
      "https://stitch.withgoogle.com/preview/15498726935719082035?node-id=d3c0a8479fb44f93b19d93f99aba2971&raw=1",
    );
    expect(STITCH_THANK_YOU_PREVIEW_URL).toBe(
      "https://stitch.withgoogle.com/preview/15498726935719082035?node-id=cdffe3f786c0490b9a05b69a7a66416d&raw=1",
    );
  });

  it("exposes thank-you submission received copy from the Stitch screenshot", () => {
    expect(STITCH_COPY.thankYou.title).toBe("Submission Received");
    expect(STITCH_COPY.thankYou.views.client.body).toMatch(/4 business hours/i);
    expect(STITCH_COPY.thankYou.views.candidate.body).toBe(
      "Your application to join the team has been received. We appreciate your interest in Commiters. Our team will review your credentials and reach out if there's a match.",
    );
    expect(STITCH_COPY.thankYou.backToHomeLabel).toBe("Back to Home");
    expect(STITCH_COPY.thankYou.projectLedgerLabel).toBe("View Project Ledger");
    expect(STITCH_COPY.thankYou.infrastructureLabel).toBe("Official Infrastructure By");
  });

  it("exposes Technical Ledger hero copy from the Stitch screenshot", () => {
    expect(STITCH_COPY.technicalLedger.title).toBe("Technical Ledger");
    expect(STITCH_COPY.technicalLedger.subtext).toMatch(/architectural deep-dives/i);
  });

  it("exposes cookie policy hero copy from the Stitch compliance screenshot", () => {
    expect(STITCH_COPY.cookie.kicker).toBe("COMPLIANCE");
    expect(STITCH_COPY.cookie.title).toBe("Cookie Policy");
    expect(STITCH_COPY.cookie.lastUpdatedLabel).toBe("Last Updated:");
    expect(STITCH_COPY.cookie.lastUpdatedDate).toBe(STITCH_COPY.privacy.lastUpdatedDate);
    expect(STITCH_COPY.cookie.manageCta.buttonLabel).toBe("Manage Cookie Preferences");
  });

  it("exposes privacy hero copy from the Stitch legal screenshot", () => {
    expect(STITCH_COPY.privacy.title).toBe("Privacy Policy");
    expect(STITCH_COPY.privacy.lastUpdatedLabel).toBe("LAST UPDATED:");
    expect(STITCH_COPY.privacy.lastUpdatedDate).toBe("April 15, 2026");
    expect(STITCH_COPY.privacy.introBold).toBe("Commiters Softwares");
    expect(STITCH_COPY.privacy.dpoCta.buttonLabel).toBe("Contact DPO");
  });

  it("exposes terms hero copy from the Stitch legal screenshot", () => {
    expect(STITCH_COPY.terms.title).toBe("Terms of Service");
    expect(STITCH_COPY.terms.lastUpdatedLabel).toBe("Last updated:");
    expect(STITCH_COPY.terms.lastUpdatedDate).toBe(STITCH_COPY.privacy.lastUpdatedDate);
    expect(STITCH_COPY.terms.enterpriseCta.buttonLabel).toBe("Contact Support");
  });

  it("exposes hero and nav copy from the light Stitch UI", () => {
    expect(STITCH_COPY.navCta).toBe("Start Project");
    expect(STITCH_COPY.home.title).toBe("Code Your Success");
    expect(STITCH_COPY.services.kicker).toBe("OUR EXPERTISE");
    expect(STITCH_COPY.contact.formTitle).toBe("Direct Inquiry");
  });

  it("exposes contact intro copy from the Stitch screenshot", () => {
    expect(STITCH_COPY.contact.title).toBe("Let's build with engineering precision.");
    expect(STITCH_COPY.contact.subtext).toBe(
      "We specialize in turning complex architectural challenges into clean, scalable software. Reach out to start a technical consultation.",
    );
    expect(STITCH_COPY.contact.messageLabel).toBe("Brief Project Summary");
    expect(STITCH_COPY.contact.submitButton).toBe("Submit Inquiry");
  });

  it("exposes Join Us copy from the Stitch screenshot", () => {
    expect(STITCH_COPY.joinUs.kicker).toBe("CAREERS AT COMMITERS");
    expect(STITCH_COPY.joinUs.title).toBe("Build the digital backbone of the future.");
    expect(STITCH_COPY.joinUs.subtext).toBe(
      "We are looking for precision-driven engineers and designers to join our core team in Udaipur. Every line of code counts.",
    );
    expect(STITCH_COPY.joinUs.sections.personal.title).toBe("Personal Information");
    expect(STITCH_COPY.joinUs.sections.digital.title).toBe("Digital Footprint");
    expect(STITCH_COPY.joinUs.sections.credentials.title).toBe("Credentials");
    expect(STITCH_COPY.joinUs.sections.core.title).toBe("The Core");
    expect(STITCH_COPY.joinUs.positionLabel).toBe("Position Applied For");
    expect(STITCH_COPY.joinUs.resumeLabel).toBe("Resume Upload");
    expect(STITCH_COPY.joinUs.coverLetterLabel).toBe("Cover Letter / Why Commiters?");
    expect(STITCH_COPY.joinUs.coverLetterPlaceholder).toBe(
      "Tell us about a project where you prioritized precision over speed...",
    );
    expect(STITCH_COPY.joinUs.submitButton).toBe("Submit Application");
  });

  it("exposes about intro copy from the Stitch screenshot", () => {
    expect(STITCH_COPY.about.title).toBe("We build the invisible architecture that powers digital leaders.");
    expect(STITCH_COPY.about.subtext).toBe(
      "Commiters is a boutique engineering studio founded on the principle that code should be as elegant as it is robust. Led by Nitesh Rav, we translate complex business logic into scalable digital reality.",
    );
    expect(STITCH_COPY.about.visionTitle).toBe("A Vision of Craftsmanship");
    expect(STITCH_COPY.about.visionBody).toContain("Founded by Nitesh Rav");
  });
});
