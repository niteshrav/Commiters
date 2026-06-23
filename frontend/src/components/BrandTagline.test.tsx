import { render, screen } from "@testing-library/react";
import { COMMITERS_TAGLINE } from "../lib/siteBrand";
import BrandTagline from "./BrandTagline";

describe("BrandTagline", () => {
  it("renders the logo tagline with Code highlighted in brand blue", () => {
    render(<BrandTagline />);
    expect(screen.getByTestId("brand-tagline")).toHaveTextContent(COMMITERS_TAGLINE);
    expect(screen.getByText("Code.")).toHaveClass("brand-tagline-accent");
  });
});
