import { describe, expect, it } from "vitest";
import {
  JOIN_US_PAGE_COPY,
} from "./joinUsPageContent";
import { STITCH_COPY } from "./stitchDesign";

describe("joinUsPageContent", () => {
  it("matches the Stitch Join Us intro copy", () => {
    expect(JOIN_US_PAGE_COPY.intro.kicker).toBe(STITCH_COPY.joinUs.kicker);
    expect(JOIN_US_PAGE_COPY.intro.title).toBe(STITCH_COPY.joinUs.title);
    expect(JOIN_US_PAGE_COPY.intro.subtext).toBe(STITCH_COPY.joinUs.subtext);
    expect(JOIN_US_PAGE_COPY.intro.kicker).toBe("CAREERS AT COMMITERS");
    expect(JOIN_US_PAGE_COPY.intro.title).toBe("Build the digital backbone of the future.");
  });

  it("matches the Stitch numbered form sections and field labels", () => {
    expect(JOIN_US_PAGE_COPY.sections.personal).toEqual({ number: "01.", title: "Personal Information" });
    expect(JOIN_US_PAGE_COPY.sections.digital).toEqual({ number: "02.", title: "Digital Footprint" });
    expect(JOIN_US_PAGE_COPY.sections.credentials).toEqual({ number: "03.", title: "Credentials" });
    expect(JOIN_US_PAGE_COPY.sections.core).toEqual({ number: "04.", title: "The Core" });
    expect(JOIN_US_PAGE_COPY.fields.namePlaceholder).toBe("John Doe");
    expect(JOIN_US_PAGE_COPY.fields.emailPlaceholder).toBe("john@example.com");
    expect(JOIN_US_PAGE_COPY.fields.phonePlaceholder).toBe("+91 00000 00000");
    expect(JOIN_US_PAGE_COPY.fields.positionLabel).toBe("Position Applied For");
    expect(JOIN_US_PAGE_COPY.fields.linkedinPlaceholder).toBe("https://linkedin.com/in/username");
    expect(JOIN_US_PAGE_COPY.fields.portfolioPlaceholder).toBe("https://github.com/username");
    expect(JOIN_US_PAGE_COPY.fields.resumeLabel).toBe("Resume Upload");
    expect(JOIN_US_PAGE_COPY.fields.resumeHelp).toBe("PDF only, max 5MB");
    expect(JOIN_US_PAGE_COPY.fields.coverLetterLabel).toBe("Cover Letter / Why Commiters?");
    expect(JOIN_US_PAGE_COPY.fields.coverLetterPlaceholder).toBe(
      "Tell us about a project where you prioritized precision over speed...",
    );
    expect(JOIN_US_PAGE_COPY.privacyDisclaimer).toMatch(/recruitment privacy terms/i);
    expect(JOIN_US_PAGE_COPY.submitButton).toBe("Submit Application");
  });
});
