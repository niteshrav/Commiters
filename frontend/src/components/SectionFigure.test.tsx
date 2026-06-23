import { render, screen } from "@testing-library/react";
import { LOGO_THEME } from "../lib/themeColors";
import SectionFigure from "./SectionFigure";

describe("SectionFigure", () => {
  it.each(["layers", "constellation", "wave"] as const)("renders the %s abstract pattern for section rhythm", (pattern) => {
    render(<SectionFigure pattern={pattern} />);

    const fig = screen.getByTestId(`section-figure-${pattern}`);
    expect(fig).toHaveClass("section-figure", `section-figure--${pattern}`);
    expect(fig).toHaveAttribute("role", "presentation");
    expect(fig.querySelector("svg")).toBeTruthy();
  });

  it("uses logo electric blue and bronze gold in the layers pattern", () => {
    render(<SectionFigure pattern="layers" />);
    const svg = screen.getByTestId("section-figure-layers").innerHTML;
    expect(svg).toContain(LOGO_THEME.teal);
    expect(svg).toContain(LOGO_THEME.brandGold);
    expect(svg).toContain(LOGO_THEME.white);
    expect(svg).not.toContain("#152238");
  });
});
