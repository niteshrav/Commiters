import { describe, expect, it } from "vitest";
import {
  COMMITERS_EMAIL_PRIMARY,
  COMMITERS_EMAIL_SECONDARY,
  COMMITERS_PHONE_E164_DIGITS,
  buildTelHref,
  buildWhatsAppUrl,
} from "./siteContact";

describe("siteContact", () => {
  it("exposes primary and secondary contact emails", () => {
    expect(COMMITERS_EMAIL_PRIMARY).toBe("hello@commiters.com");
    expect(COMMITERS_EMAIL_SECONDARY).toBe("commitersudaipur@gmail.com");
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
