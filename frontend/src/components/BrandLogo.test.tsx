import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import {
  BRAND_LOGO_FOOTER_HEIGHT_PX,
  BRAND_LOGO_HEADER_HEIGHT_PX,
  brandLogoWidthPx,
} from "../lib/brandDisplay";
import { BRAND_LOGO_DISPLAY_CLASS, BRAND_LOGO_WRAP_CLASS } from "../lib/brandImprint";
import {
  COMMITERS_FOOTER_LOGO_SRC,
  COMMITERS_HEADER_LOGO_ALT,
  COMMITERS_HEADER_LOGO_SRC,
  COMMITERS_LOGO_STACKED_SRC,
} from "../lib/siteBrand";
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
    expect(link).toHaveClass("brand-logo-link", "opacity-90", "transition-opacity");
    expect(screen.queryByTestId("brand-tagline")).not.toBeInTheDocument();

    const img = screen.getByRole("img", { name: COMMITERS_HEADER_LOGO_ALT });
    expect(img).toHaveAttribute("src", COMMITERS_HEADER_LOGO_SRC);
    expect(img).toHaveClass("brand-logo", BRAND_LOGO_DISPLAY_CLASS, "brand-logo--header");
    expect(img).toHaveAttribute("height", String(BRAND_LOGO_HEADER_HEIGHT_PX));
    expect(img).toHaveAttribute("width", String(brandLogoWidthPx(BRAND_LOGO_HEADER_HEIGHT_PX)));
    expect(link.querySelector(`.${BRAND_LOGO_WRAP_CLASS}`)).toBeTruthy();
  });

  it("renders a large bold footer logo that links home without tagline text", () => {
    render(
      <MemoryRouter>
        <BrandLogo variant="footer" />
      </MemoryRouter>,
    );
    const link = screen.getByRole("link", { name: COMMITERS_HEADER_LOGO_ALT });
    expect(link).toHaveAttribute("href", "/");
    const img = screen.getByRole("img", { name: COMMITERS_HEADER_LOGO_ALT });
    expect(img).toHaveAttribute("src", COMMITERS_FOOTER_LOGO_SRC);
    expect(img).toHaveClass("brand-logo", BRAND_LOGO_DISPLAY_CLASS, "brand-logo--footer");
    expect(img).toHaveAttribute("height", String(BRAND_LOGO_FOOTER_HEIGHT_PX));
    expect(img).toHaveAttribute("width", String(brandLogoWidthPx(BRAND_LOGO_FOOTER_HEIGHT_PX)));
    expect(screen.queryByTestId("brand-tagline")).not.toBeInTheDocument();
  });

  it("renders the stacked lockup in the mobile drawer", () => {
    render(
      <MemoryRouter>
        <BrandLogo variant="mobile" logoSrc={COMMITERS_HEADER_LOGO_SRC} />
      </MemoryRouter>,
    );
    const img = screen.getByRole("img", { name: COMMITERS_HEADER_LOGO_ALT });
    expect(img).toHaveAttribute("src", COMMITERS_LOGO_STACKED_SRC);
    expect(img).toHaveClass("brand-logo--mobile");
  });
});
