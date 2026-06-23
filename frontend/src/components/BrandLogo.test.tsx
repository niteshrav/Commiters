import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import {
  BRAND_LOGO_FOOTER_HEIGHT_PX,
  BRAND_LOGO_HEADER_HEIGHT_PX,
  brandLogoWidthPx,
} from "../lib/brandDisplay";
import { BRAND_LOGO_DISPLAY_CLASS, BRAND_LOGO_WRAP_CLASS } from "../lib/brandImprint";
import { COMMITERS_HEADER_LOGO_ALT, COMMITERS_HEADER_LOGO_SRC } from "../lib/siteBrand";
import BrandLogo from "./BrandLogo";

describe("BrandLogo", () => {
  it("renders a large bold header logo without separate tagline text", () => {
    render(
      <MemoryRouter>
        <BrandLogo />
      </MemoryRouter>,
    );

    const link = screen.getByRole("link", { name: COMMITERS_HEADER_LOGO_ALT });
    expect(link).toHaveAttribute("href", "/");
    expect(screen.queryByTestId("brand-tagline")).not.toBeInTheDocument();

    const img = screen.getByRole("img", { name: COMMITERS_HEADER_LOGO_ALT });
    expect(img).toHaveAttribute("src", COMMITERS_HEADER_LOGO_SRC);
    expect(img).toHaveClass("brand-logo", BRAND_LOGO_DISPLAY_CLASS, "brand-logo--header");
    expect(img).toHaveAttribute("height", String(BRAND_LOGO_HEADER_HEIGHT_PX));
    expect(img).toHaveAttribute("width", String(brandLogoWidthPx(BRAND_LOGO_HEADER_HEIGHT_PX)));
    expect(link.querySelector(`.${BRAND_LOGO_WRAP_CLASS}`)).toBeTruthy();
  });

  it("renders a large bold footer logo without a home link or tagline text", () => {
    render(<BrandLogo variant="footer" />);
    const img = screen.getByRole("img", { name: COMMITERS_HEADER_LOGO_ALT });
    expect(img).toHaveClass("brand-logo", BRAND_LOGO_DISPLAY_CLASS, "brand-logo--footer");
    expect(img).toHaveAttribute("height", String(BRAND_LOGO_FOOTER_HEIGHT_PX));
    expect(img).toHaveAttribute("width", String(brandLogoWidthPx(BRAND_LOGO_FOOTER_HEIGHT_PX)));
    expect(screen.queryByTestId("brand-tagline")).not.toBeInTheDocument();
    expect(screen.queryByRole("link", { name: COMMITERS_HEADER_LOGO_ALT })).not.toBeInTheDocument();
  });
});
