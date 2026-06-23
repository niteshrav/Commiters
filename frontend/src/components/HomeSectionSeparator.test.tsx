import { render, screen } from "@testing-library/react";
import HomeSectionSeparator from "./HomeSectionSeparator";
import { HOME_SECTION_SEPARATOR_CLASS } from "../lib/homeSectionLayout";

describe("HomeSectionSeparator", () => {
  it("renders a full-width section divider", () => {
    render(<HomeSectionSeparator testId="home-separator-test" />);
    const rule = screen.getByTestId("home-separator-test");
    expect(rule.tagName.toLowerCase()).toBe("hr");
    expect(rule).toHaveClass("home-section-separator", HOME_SECTION_SEPARATOR_CLASS, "band-breakout");
  });
});
