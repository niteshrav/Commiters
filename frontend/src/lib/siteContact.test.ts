import { describe, expect, it } from "vitest";
import {
  COMMITERS_EMAIL_PRIMARY,
  COMMITERS_EMAIL_SECONDARY,
  COMMITERS_EMAIL_STRIP_DISPLAY,
  COMMITERS_PHONE_E164_DIGITS,
  buildMailtoTeamInboxHref,
  buildTelHref,
  buildWhatsAppUrl,
} from "./siteContact";

describe("siteContact", () => {
  it("exposes primary and secondary contact emails", () => {
    expect(COMMITERS_EMAIL_PRIMARY).toBe("hello@commiters.com");
    expect(COMMITERS_EMAIL_SECONDARY).toBe("commitersudaipur@gmail.com");
  });

  it("formats strip display with comma spacing", () => {
    expect(COMMITERS_EMAIL_STRIP_DISPLAY).toBe("hello@commiters.com, commitersudaipur@gmail.com");
  });

  it("builds mailto with both team inboxes so one action reaches hello and Gmail", () => {
    expect(buildMailtoTeamInboxHref()).toBe(
      "mailto:hello@commiters.com,commitersudaipur@gmail.com",
    );
  });

  it("builds tel href with E.164 + prefix", () => {
    expect(buildTelHref()).toBe(`tel:+${COMMITERS_PHONE_E164_DIGITS}`);
  });

  it("builds wa.me link with encoded text", () => {
    const url = buildWhatsAppUrl("Hello & test");
    expect(url).toContain(`https://wa.me/${COMMITERS_PHONE_E164_DIGITS}?text=`);
    expect(url).toContain(encodeURIComponent("Hello & test"));
  });
});
