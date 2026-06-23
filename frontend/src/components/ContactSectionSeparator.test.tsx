import { render, screen } from "@testing-library/react";
import ContactSectionSeparator from "./ContactSectionSeparator";
import { CONTACT_SECTION_SEPARATOR_CLASS, CONTACT_SECTION_SEPARATOR_TEST_ID } from "../lib/contactSectionLayout";

describe("ContactSectionSeparator", () => {
  it("renders a full-width horizontal rule before the footer", () => {
    render(<ContactSectionSeparator />);

    const rule = screen.getByTestId(CONTACT_SECTION_SEPARATOR_TEST_ID);
    expect(rule.tagName).toBe("HR");
    expect(rule).toHaveClass("contact-section-separator", CONTACT_SECTION_SEPARATOR_CLASS, "band-breakout");
  });
});
