import { describe, expect, it } from "vitest";
import {
  PRIVACY_DPO_CTA,
  PRIVACY_PAGE_COPY,
  PRIVACY_POLICY_SECTIONS,
} from "./privacyPageContent";
import { ROUTES } from "./routes";
import { STITCH_COPY } from "./stitchDesign";

describe("privacyPageContent", () => {
  it("pins privacy hero copy from the Stitch screenshot", () => {
    expect(STITCH_COPY.privacy.title).toBe("Privacy Policy");
    expect(STITCH_COPY.privacy.lastUpdatedLabel).toBe("LAST UPDATED:");
    expect(STITCH_COPY.privacy.lastUpdatedDate).toBe("April 15, 2026");
    expect(PRIVACY_PAGE_COPY.introBold).toBe("Commiters Softwares");
    expect(PRIVACY_PAGE_COPY.intro).toContain("data protection and transparency");
    expect(PRIVACY_PAGE_COPY.intro).toContain("surgical precision and absolute integrity");
  });

  it("lists numbered privacy sections in Stitch order below the intro", () => {
    expect(PRIVACY_POLICY_SECTIONS.map((section) => section.number)).toEqual(["01", "02", "03", "04"]);
    expect(PRIVACY_POLICY_SECTIONS.map((section) => section.title)).toEqual([
      "Data Collection",
      "Usage & Purpose",
      "Cookies",
      "Your Rights",
    ]);
  });

  it("defines the identity data subsection with checklist items", () => {
    const dataCollection = PRIVACY_POLICY_SECTIONS[0];
    const identity = dataCollection.blocks[0];
    expect(identity.kind).toBe("identity");
    if (identity.kind !== "identity") return;
    expect(identity.label).toBe("IDENTITY DATA");
    expect(identity.description).toContain("first name, last name");
    expect(identity.items).toEqual([
      "Direct interactions via project inquiry forms.",
      "Automated technical data including IP addresses and browser types.",
    ]);
  });

  it("defines usage purpose cards below the section intro paragraph", () => {
    const usage = PRIVACY_POLICY_SECTIONS[1];
    expect(usage.blocks[0]).toEqual({
      kind: "paragraph",
      text: "We process your personal data only when we have a legal basis to do so. Our primary objective is the delivery of high-precision software solutions.",
    });
    const cards = usage.blocks[1];
    expect(cards.kind).toBe("cards");
    if (cards.kind !== "cards") return;
    expect(cards.cards.map((card) => card.title)).toEqual(["Contract Performance", "Legal Compliance"]);
  });

  it("defines the cookies callout below the section intro paragraph", () => {
    const cookies = PRIVACY_POLICY_SECTIONS[2];
    expect(cookies.blocks[0].kind).toBe("paragraph");
    const callout = cookies.blocks[1];
    expect(callout.kind).toBe("callout");
    if (callout.kind !== "callout") return;
    expect(callout.text).toContain("If you disable or refuse cookies");
  });

  it("defines your rights bullets below section 03", () => {
    const rights = PRIVACY_POLICY_SECTIONS[3];
    expect(rights.title).toBe("Your Rights");
    const block = rights.blocks[0];
    expect(block.kind).toBe("rights");
    if (block.kind !== "rights") return;
    expect(block.items.map((item) => item.title)).toEqual([
      "Right to Access",
      "Right to Erasure",
      "Right to Rectification",
    ]);
  });

  it("defines the DPO contact CTA from the screenshot", () => {
    expect(PRIVACY_DPO_CTA.title).toBe(STITCH_COPY.privacy.dpoCta.title);
    expect(PRIVACY_DPO_CTA.description).toContain("Data Protection Officer");
    expect(PRIVACY_DPO_CTA.buttonLabel).toBe("Contact DPO");
    expect(PRIVACY_DPO_CTA.href).toBe(ROUTES.contact);
  });
});
