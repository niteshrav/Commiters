import React from "react";
import { Link } from "react-router-dom";
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
  COMMITERS_LOGO_HORIZONTAL_SRC,
  COMMITERS_LOGO_STACKED_SRC,
} from "../lib/siteBrand";
import { ROUTES } from "../lib/routes";

type Props = {
  variant?: "header" | "footer" | "mobile";
  onNavigate?: (e: React.MouseEvent<HTMLAnchorElement>) => void;
  logoSrc?: string;
  logoAlt?: string;
};

export default function BrandLogo({
  variant = "header",
  onNavigate,
  logoSrc,
  logoAlt = COMMITERS_HEADER_LOGO_ALT,
}: Props) {
  const isFooter = variant === "footer";
  const isMobile = variant === "mobile";
  const resolvedDefault = isFooter ? COMMITERS_FOOTER_LOGO_SRC : isMobile ? COMMITERS_LOGO_STACKED_SRC : COMMITERS_HEADER_LOGO_SRC;
  const source =
    logoSrc && logoSrc !== COMMITERS_HEADER_LOGO_SRC && logoSrc !== COMMITERS_LOGO_HORIZONTAL_SRC
      ? logoSrc
      : resolvedDefault;
  const height = isFooter ? BRAND_LOGO_FOOTER_HEIGHT_PX : BRAND_LOGO_HEADER_HEIGHT_PX;
  const width = brandLogoWidthPx(height);
  const [resolvedSrc, setResolvedSrc] = React.useState(source);

  React.useEffect(() => {
    setResolvedSrc(source);
  }, [source]);

  const img = (
    <span className={BRAND_LOGO_WRAP_CLASS}>
      <img
        className={[
          "brand-logo",
          BRAND_LOGO_DISPLAY_CLASS,
          isFooter ? "brand-logo--footer" : isMobile ? "brand-logo--mobile" : "brand-logo--header",
        ].join(" ")}
        src={resolvedSrc}
        alt={logoAlt}
        width={width}
        height={height}
        decoding="async"
        onError={() => {
          if (resolvedSrc !== COMMITERS_HEADER_LOGO_SRC) {
            setResolvedSrc(COMMITERS_HEADER_LOGO_SRC);
          }
        }}
      />
    </span>
  );

  if (isFooter) {
    return (
      <Link
        to={ROUTES.home}
        className="footer-brand-logo-wrap brand-logo-link"
        aria-label={logoAlt}
      >
        {img}
      </Link>
    );
  }

  return (
    <Link
      to={ROUTES.home}
      className="brand brand-logo-link typography-brand opacity-90 transition-opacity"
      onClick={onNavigate}
      aria-label={logoAlt}
    >
      {img}
    </Link>
  );
}
