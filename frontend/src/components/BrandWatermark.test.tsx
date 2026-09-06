import { render, screen } from "@testing-library/react";
import BrandWatermark from "./BrandWatermark";
import { BRAND_WATERMARK_CLASS, BRAND_WATERMARK_SRC, BRAND_WATERMARK_TESTID } from "../lib/brandWatermark";

describe("BrandWatermark", () => {
  it("renders a decorative primary-logo watermark", () => {
    render(<BrandWatermark />);
    const mark = screen.getByTestId(BRAND_WATERMARK_TESTID);
    expect(mark).toHaveClass(BRAND_WATERMARK_CLASS);
    expect(mark).toHaveAttribute("src", BRAND_WATERMARK_SRC);
    expect(mark).toHaveAttribute("alt", "");
    expect(mark).toHaveAttribute("aria-hidden", "true");
  });
});
