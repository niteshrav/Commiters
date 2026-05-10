import { describe, expect, it } from "vitest";
import { buildTelHref, buildWhatsAppUrl, COMMITERS_PHONE_E164_DIGITS } from "./siteContact";

describe("siteContact", () => {
  it("builds tel href with E.164 + prefix", () => {
    expect(buildTelHref()).toBe(`tel:+${COMMITERS_PHONE_E164_DIGITS}`);
  });

  it("builds wa.me link with encoded text", () => {
    const url = buildWhatsAppUrl("Hello & test");
    expect(url).toContain(`https://wa.me/${COMMITERS_PHONE_E164_DIGITS}?text=`);
    expect(url).toContain(encodeURIComponent("Hello & test"));
  });
});
