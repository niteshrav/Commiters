import { describe, expect, it } from "vitest";
import { COMMITERS_CASE_STUDY_COPY } from "./commitersCaseStudyContent";
import { NEARDROP_CASE_STUDY_COPY } from "./neardropCaseStudyContent";
import { SERVICES_BOTTOM_CTA } from "./servicesPageBottomContent";
import { STITCH_CONTACT_SIDEBAR } from "./stitchPageContent";
import {
  COMMITERS_EMAIL_LEGAL_DISPLAY,
  COMMITERS_EMAIL_PRIMARY,
  COMMITERS_EMAIL_SECONDARY,
  COMMITERS_EMAIL_STRIP_DISPLAY,
  COMMITERS_PHONE_DISPLAY,
  COMMITERS_PHONE_E164_DIGITS,
  buildDiscoveryCallCalendarUrl,
  buildMailtoPrimaryHref,
  buildMailtoTeamInboxHref,
  buildTelHref,
  buildWhatsAppUrl,
} from "./siteContact";

describe("siteContact", () => {
  const discoveryCallUrl = buildDiscoveryCallCalendarUrl();

  it("exposes primary and secondary contact emails", () => {
    expect(COMMITERS_EMAIL_PRIMARY).toBe("hello@commiters.com");
    expect(COMMITERS_EMAIL_SECONDARY).toBe("commitersudaipur@gmail.com");
  });

  it("shows only the primary inbox in public strips", () => {
    expect(COMMITERS_EMAIL_STRIP_DISPLAY).toBe("hello@commiters.com");
  });

  it("lists both inboxes for legal copy alongside dual mailto", () => {
    expect(COMMITERS_EMAIL_LEGAL_DISPLAY).toBe("hello@commiters.com, commitersudaipur@gmail.com");
  });

  it("builds mailto for the primary inbox", () => {
    expect(buildMailtoPrimaryHref()).toBe("mailto:hello@commiters.com");
  });

  it("builds mailto with both team inboxes for legal and internal use", () => {
    expect(buildMailtoTeamInboxHref()).toBe(
      "mailto:hello@commiters.com,commitersudaipur@gmail.com",
    );
  });

  it("exposes the India mobile number for tel and WhatsApp links", () => {
    expect(COMMITERS_PHONE_E164_DIGITS).toBe("919024882899");
    expect(COMMITERS_PHONE_DISPLAY).toBe("+91 9024882899");
  });

  it("builds tel href with E.164 + prefix", () => {
    expect(buildTelHref()).toBe("tel:+919024882899");
  });

  it("builds wa.me link with encoded text", () => {
    const url = buildWhatsAppUrl("Hello & test");
    expect(url).toContain(`https://wa.me/${COMMITERS_PHONE_E164_DIGITS}?text=`);
    expect(url).toContain(encodeURIComponent("Hello & test"));
  });

  it("builds a Google Calendar discovery call URL for the Udaipur calendar inbox", () => {
    const url = buildDiscoveryCallCalendarUrl();
    const parsed = new URL(url);

    expect(parsed.origin + parsed.pathname).toBe("https://calendar.google.com/calendar/render");
    expect(parsed.searchParams.get("action")).toBe("TEMPLATE");
    expect(parsed.searchParams.get("text")).toBe("Discovery Call with Commiters");
    expect(parsed.searchParams.get("add")).toBe(COMMITERS_EMAIL_SECONDARY);
    expect(parsed.searchParams.get("details")).toContain("discovery call");
  });

  it("wires every discovery-call CTA to the Udaipur calendar inbox instead of Calendly", () => {
    const discoveryHrefs = [
      STITCH_CONTACT_SIDEBAR[1].href,
      SERVICES_BOTTOM_CTA.primaryHref,
      COMMITERS_CASE_STUDY_COPY.bottomCta.primaryHref,
      NEARDROP_CASE_STUDY_COPY.bottomCta.primaryHref,
    ];

    for (const href of discoveryHrefs) {
      expect(href).toBe(discoveryCallUrl);
      expect(href).not.toContain("calendly.com");
    }
  });
});
