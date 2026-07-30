import { NavLink, useLocation } from "react-router-dom";
import BrandLogo from "./BrandLogo";
import {
  FOOTER_COLUMN_CLASS,
  FOOTER_COPYRIGHT_CELL_CLASS,
  FOOTER_LINK_LIST_SOCIAL_CLASS,
  FOOTER_LOGO_CELL_CLASS,
  FOOTER_MOCKUP_COMPACT_CLASS,
  FOOTER_MOCKUP_GRID_CLASS,
  FOOTER_NAV_COLUMNS_CLASS,
  FOOTER_NAV_GROUP_CLASS,
} from "../lib/footerLayout";
import { useFooterContent } from "../lib/cms/hooks";
import { footerBrandLogoSrc } from "../lib/cms/media";
import {
  FOOTER_COPYRIGHT_STAFF_LINK_CLASS,
  FOOTER_STAFF_LOGIN_ARIA_LABEL,
  splitCopyrightLine,
} from "../lib/footerCopyright";
import { ADMIN_PANEL_URL } from "../lib/siteAdmin";
import { usesContactStyleFooter, type FooterLinkCell } from "../lib/siteFooterCopy";

function isSocialColumn(heading: string): boolean {
  return heading === "SOCIAL" || heading === "CONNECT";
}

function FooterLink({ link }: { link: FooterLinkCell }) {
  if (link.kind === "external") {
    return (
      <a className="footer-link-item" href={link.href} target="_blank" rel="noopener noreferrer">
        {link.label}
      </a>
    );
  }

  return (
    <NavLink to={link.to} className={({ isActive }) => ["footer-link-item", isActive ? "active" : ""].filter(Boolean).join(" ") || undefined}>
      {link.label}
    </NavLink>
  );
}

function FooterCopyrightLine({ copyrightLine1 }: { copyrightLine1: string }) {
  const { symbol, remainder } = splitCopyrightLine(copyrightLine1);

  return (
    <p
      className={`footer-mockup-copyright-line1 ${FOOTER_COPYRIGHT_CELL_CLASS}`}
      data-testid="footer-copyright-cell"
    >
      {symbol ? (
        <>
          <a
            className={FOOTER_COPYRIGHT_STAFF_LINK_CLASS}
            href={ADMIN_PANEL_URL}
            aria-label={FOOTER_STAFF_LOGIN_ARIA_LABEL}
            target="_blank"
            rel="noopener noreferrer"
          >
            {symbol}
          </a>
          {remainder ? ` ${remainder}` : null}
        </>
      ) : (
        copyrightLine1
      )}
    </p>
  );
}

export default function Footer() {
  const location = useLocation();
  const { copyrightLine1, copyrightLine2, navColumns: cmsColumns } = useFooterContent();
  const isContactFooter = usesContactStyleFooter(location.pathname);
  const navColumns = isContactFooter
    ? cmsColumns.map((column) => ({
        ...column,
        heading:
          column.heading === "NAVIGATION" ? "SITEMAP" : column.heading === "SOCIAL" ? "CONNECT" : column.heading,
      }))
    : cmsColumns;

  return (
    <footer
      className={`footer footer-rich footer--stitch footer--home-mockup footer--professional footer--v2${isContactFooter ? " footer--contact-mockup" : ""}`}
    >
      <div className="footer-v2-accent" aria-hidden />

      <div className={`footer-columns footer-columns--mockup ${FOOTER_MOCKUP_GRID_CLASS} ${FOOTER_MOCKUP_COMPACT_CLASS} footer-v2-main`}>
        <div className="footer-mockup-brand-stack footer-v2-brand">
          <div className={FOOTER_LOGO_CELL_CLASS} data-testid="footer-logo-cell">
            <BrandLogo variant="footer" logoSrc={footerBrandLogoSrc()} />
          </div>
          <p className="footer-brand-tagline">{copyrightLine2}</p>
        </div>

        <div
          className={`footer-nav-group ${FOOTER_NAV_GROUP_CLASS} ${FOOTER_NAV_COLUMNS_CLASS} footer-v2-nav`}
          data-testid="footer-nav-group"
        >
          {navColumns.map((column) => (
            <nav
              key={column.heading}
              className={`footer-column ${FOOTER_COLUMN_CLASS}`}
              data-testid={`footer-nav-column-${column.heading.toLowerCase()}`}
              aria-label={column.heading}
            >
              <p className="footer-column-heading">{column.heading}</p>
              <ul
                className={[
                  "footer-link-list",
                  isSocialColumn(column.heading) ? FOOTER_LINK_LIST_SOCIAL_CLASS : "",
                ]
                  .filter(Boolean)
                  .join(" ")}
              >
                {column.links.map((link) => (
                  <li key={link.label}>
                    <FooterLink link={link} />
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>
      </div>

      <div className="footer-v2-bar">
        <div className="footer-v2-bar-inner">
          <FooterCopyrightLine copyrightLine1={copyrightLine1} />
        </div>
      </div>
    </footer>
  );
}
