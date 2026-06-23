import { describe, expect, it } from "vitest";
import { STITCH_COPY } from "./stitchDesign";
import { CONTACT_STUDIO } from "./contactPageContent";
import { STITCH_CONTACT_SIDEBAR } from "./stitchPageContent";
import { buildDiscoveryCallCalendarUrl } from "./siteContact";

describe("contactPageContent", () => {
  it("exposes Stitch contact form labels and placeholders from the screenshot", () => {
    expect(STITCH_COPY.contact.formTitle).toBe("Direct Inquiry");
    expect(STITCH_COPY.contact.nameLabel).toBe("Full Name");
    expect(STITCH_COPY.contact.namePlaceholder).toBe("John Doe");
    expect(STITCH_COPY.contact.emailLabel).toBe("Email Address");
    expect(STITCH_COPY.contact.emailPlaceholder).toBe("john@company.com");
    expect(STITCH_COPY.contact.projectTypeLabel).toBe("Project Type");
    expect(STITCH_COPY.contact.messageLabel).toBe("Brief Project Summary");
    expect(STITCH_COPY.contact.messagePlaceholder).toBe(
      "How can we help you solve your engineering challenges?",
    );
    expect(STITCH_COPY.contact.submitButton).toBe("Submit Inquiry");
  });

  it("exposes the Udaipur studio address from the screenshot", () => {
    expect(CONTACT_STUDIO.title).toBe("Udaipur Engineering Studio");
    expect(CONTACT_STUDIO.addressLines).toEqual([
      "82, Sobhagya Nagar,",
      "Nakoda Nagar,",
      "Udaipur, Rajasthan, India",
    ]);
    expect(CONTACT_STUDIO.email).toBe("hello@commiters.com, commitersudaipur@gmail.com");
    expect(CONTACT_STUDIO.emailHref).toBe("mailto:hello@commiters.com,commitersudaipur@gmail.com");
    expect(CONTACT_STUDIO.phone).toBe("+91 9024882899");
    expect(CONTACT_STUDIO.phoneHref).toBe("tel:+919024882899");
  });

  it("lists WhatsApp and scheduling quick-contact cards only", () => {
    expect(STITCH_CONTACT_SIDEBAR.map((item) => item.id)).toEqual(["whatsapp", "scheduling"]);
    expect(STITCH_CONTACT_SIDEBAR[0].title).toBe("Chat with an Engineer");
    expect(STITCH_CONTACT_SIDEBAR[1].title).toBe("Book a Discovery Call");
  });

  it("wires the discovery call card to the Google Calendar inbox, not Calendly", () => {
    expect(STITCH_CONTACT_SIDEBAR[1].href).toBe(buildDiscoveryCallCalendarUrl());
    expect(STITCH_CONTACT_SIDEBAR[1].href).not.toContain("calendly.com");
  });
});
