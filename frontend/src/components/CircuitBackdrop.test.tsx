import { render, screen } from "@testing-library/react";
import { LOGO_THEME } from "../lib/themeColors";
import CircuitBackdrop from "./CircuitBackdrop";

describe("CircuitBackdrop", () => {
  it("renders decorative circuit graphics using brand gold and blue", () => {
    render(<CircuitBackdrop />);
    const backdrop = screen.getByTestId("circuit-backdrop");
    expect(backdrop).toHaveAttribute("aria-hidden", "true");
    const svg = backdrop.querySelector("svg");
    expect(svg).toBeTruthy();
    expect(backdrop.innerHTML).toContain(LOGO_THEME.brandGold);
    expect(backdrop.innerHTML).toContain(LOGO_THEME.teal);
  });
});
