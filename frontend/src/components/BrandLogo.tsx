import React from "react";
import { Link } from "react-router-dom";
import {
  BRAND_LOGO_FOOTER_HEIGHT_PX,
  BRAND_LOGO_HEADER_HEIGHT_PX,
  brandLogoWidthPx,
} from "../lib/brandDisplay";
import { BRAND_LOGO_DISPLAY_CLASS, BRAND_LOGO_WRAP_CLASS } from "../lib/brandImprint";
import { COMMITERS_HEADER_LOGO_ALT, COMMITERS_HEADER_LOGO_SRC } from "../lib/siteBrand";
import { ROUTES } from "../lib/routes";

type Props = {
  variant?: "header" | "footer";
  onNavigate?: (e: React.MouseEvent<HTMLAnchorElement>) => void;
};

export default function BrandLogo({ variant = "header", onNavigate }: Props) {
  const isFooter = variant === "footer";
  const height = isFooter ? BRAND_LOGO_FOOTER_HEIGHT_PX : BRAND_LOGO_HEADER_HEIGHT_PX;
  const width = brandLogoWidthPx(height);

  const img = (
    <span className={BRAND_LOGO_WRAP_CLASS}>
      <img
        className={[
          "brand-logo",
          BRAND_LOGO_DISPLAY_CLASS,
          isFooter ? "brand-logo--footer" : "brand-logo--header",
        ].join(" ")}
        src={COMMITERS_HEADER_LOGO_SRC}
        alt={COMMITERS_HEADER_LOGO_ALT}
        width={width}
        height={height}
        decoding="async"
      />
    </span>
  );

  if (isFooter) {
    return <div className="footer-brand-logo-wrap">{img}</div>;
  }

  return (
    <Link
      to={ROUTES.home}
      className="brand brand-logo-link typography-brand"
      onClick={onNavigate}
      aria-label={COMMITERS_HEADER_LOGO_ALT}
    >
      {img}
    </Link>
  );
}
