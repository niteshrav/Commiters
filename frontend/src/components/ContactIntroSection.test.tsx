import { render, screen } from "@testing-library/react";
import ContactIntroSection from "./ContactIntroSection";
import {
  CONTACT_INTRO_BODY_CLASS,
  CONTACT_INTRO_INNER_CLASS,
  CONTACT_INTRO_SECTION_CLASS,
  CONTACT_INTRO_TITLE_CLASS,
} from "../lib/contactIntroLayout";
import { STITCH_COPY } from "../lib/stitchDesign";

describe("ContactIntroSection", () => {
  it("renders the Stitch contact intro copy with dedicated typography classes", () => {
    render(<ContactIntroSection />);

    const inner = screen.getByTestId("contact-intro-inner");
    expect(screen.getByTestId("contact-intro-section")).toHaveClass(CONTACT_INTRO_SECTION_CLASS);
    expect(inner).toHaveClass(CONTACT_INTRO_INNER_CLASS);
    expect(inner).not.toHaveClass("container");
    expect(screen.queryByRole("separator")).not.toBeInTheDocument();
    expect(screen.getByRole("heading", { name: STITCH_COPY.contact.title })).toHaveClass(CONTACT_INTRO_TITLE_CLASS);
    expect(screen.getByText(STITCH_COPY.contact.subtext)).toHaveClass(CONTACT_INTRO_BODY_CLASS);
  });
});
