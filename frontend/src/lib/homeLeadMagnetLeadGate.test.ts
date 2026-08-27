import { describe, expect, it } from "vitest";
import { HOME_LEAD_MAGNET_COPY } from "./homeLeadMagnetContent";
import { validateHomeLeadMagnetEmail } from "./homeLeadMagnetLeadGate";

describe("validateHomeLeadMagnetEmail", () => {
  it("requires a valid email before capture", () => {
    expect(validateHomeLeadMagnetEmail("")).toEqual({ ok: false, error: "Please enter your email." });
    expect(validateHomeLeadMagnetEmail("not-an-email")).toEqual({
      ok: false,
      error: "Please enter a valid email.",
    });
  });

  it("builds a lead payload from a valid email", () => {
    expect(validateHomeLeadMagnetEmail("  founder@acme.io  ")).toEqual({
      ok: true,
      payload: {
        name: HOME_LEAD_MAGNET_COPY.subscriberName,
        email: "founder@acme.io",
        serviceNeeded: HOME_LEAD_MAGNET_COPY.serviceNeeded,
        timeline: HOME_LEAD_MAGNET_COPY.timeline,
        message: HOME_LEAD_MAGNET_COPY.requestMessage,
      },
    });
  });
});
