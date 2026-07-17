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
  logoSrc?: string;
  logoAlt?: string;
};

export default function BrandLogo({
  variant = "header",
  onNavigate,
  logoSrc = COMMITERS_HEADER_LOGO_SRC,
  logoAlt = COMMITERS_HEADER_LOGO_ALT,
}: Props) {
  const isFooter = variant === "footer";
  const height = isFooter ? BRAND_LOGO_FOOTER_HEIGHT_PX : BRAND_LOGO_HEADER_HEIGHT_PX;
  const width = brandLogoWidthPx(height);
  const [resolvedSrc, setResolvedSrc] = React.useState(logoSrc);

  React.useEffect(() => {
    setResolvedSrc(logoSrc);
  }, [logoSrc]);

  const img = (
    <span className={BRAND_LOGO_WRAP_CLASS}>
      <img
        className={[
          "brand-logo",
          BRAND_LOGO_DISPLAY_CLASS,
          isFooter ? "brand-logo--footer" : "brand-logo--header",
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
    return <div className="footer-brand-logo-wrap">{img}</div>;
  }

  return (
    <Link
      to={ROUTES.home}
      className="brand brand-logo-link typography-brand"
      onClick={onNavigate}
      aria-label={logoAlt}
    >
      {img}
    </Link>
  );
}
