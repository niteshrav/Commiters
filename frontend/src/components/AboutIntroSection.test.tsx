import { render, screen } from "@testing-library/react";
import AboutIntroSection from "./AboutIntroSection";
import {
  ABOUT_INTRO_BODY_CLASS,
  ABOUT_INTRO_INNER_CLASS,
  ABOUT_INTRO_KICKER_CLASS,
  ABOUT_INTRO_SECTION_CLASS,
  ABOUT_INTRO_TITLE_CLASS,
} from "../lib/aboutIntroLayout";
import { STITCH_COPY } from "../lib/stitchDesign";

describe("AboutIntroSection", () => {
  it("renders the Stitch about intro aligned with the header logo inset", () => {
    render(<AboutIntroSection />);

    const inner = screen.getByTestId("about-intro-inner");
    expect(screen.getByTestId("about-intro-section")).toHaveClass(ABOUT_INTRO_SECTION_CLASS);
    expect(inner).toHaveClass(ABOUT_INTRO_INNER_CLASS);
    expect(inner).not.toHaveClass("container");
    expect(screen.queryByTestId("about-intro-rule-top")).not.toBeInTheDocument();
    expect(screen.queryByTestId("about-intro-rule-bottom")).not.toBeInTheDocument();
    expect(screen.getByText(STITCH_COPY.engineeringPrecision)).toHaveClass(ABOUT_INTRO_KICKER_CLASS);
    expect(screen.getByRole("heading", { name: STITCH_COPY.about.title })).toHaveClass(ABOUT_INTRO_TITLE_CLASS);
    expect(screen.getByText(STITCH_COPY.about.subtext)).toHaveClass(ABOUT_INTRO_BODY_CLASS);
  });
});
