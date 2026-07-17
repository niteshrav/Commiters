import { NavLink, useLocation } from "react-router-dom";
import BrandLogo from "./BrandLogo";
import {
  FOOTER_COLUMN_CLASS,
  FOOTER_COPYRIGHT_CELL_CLASS,
  FOOTER_LOGO_CELL_CLASS,
  FOOTER_MOCKUP_COMPACT_CLASS,
  FOOTER_MOCKUP_GRID_CLASS,
  FOOTER_NAV_COLUMNS_CLASS,
  FOOTER_NAV_GROUP_CLASS,
} from "../lib/footerLayout";
import { useFooterContent } from "../lib/cms/hooks";
import { footerBrandLogoSrc } from "../lib/cms/media";
import { usesContactStyleFooter, type FooterLinkCell } from "../lib/siteFooterCopy";

function FooterLink({ link }: { link: FooterLinkCell }) {
  if (link.kind === "external") {
    return (
      <a href={link.href} target="_blank" rel="noopener noreferrer">
        {link.label}
      </a>
    );
  }

  return (
    <NavLink to={link.to} className={({ isActive }) => (isActive ? "active" : undefined)}>
      {link.label}
    </NavLink>
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
      className={`footer footer-rich footer--stitch footer--home-mockup${isContactFooter ? " footer--contact-mockup" : ""}`}
    >
      <div className={`footer-columns footer-columns--mockup ${FOOTER_MOCKUP_GRID_CLASS} ${FOOTER_MOCKUP_COMPACT_CLASS}`}>
        <div className={FOOTER_LOGO_CELL_CLASS} data-testid="footer-logo-cell">
          <BrandLogo variant="footer" logoSrc={footerBrandLogoSrc()} />
        </div>

        <div className={FOOTER_COPYRIGHT_CELL_CLASS} data-testid="footer-copyright-cell">
          <p className="footer-mockup-copyright-line1">{copyrightLine1}</p>
          <p className="footer-mockup-copyright-line2">{copyrightLine2}</p>
        </div>

        <div
          className={`footer-nav-group ${FOOTER_NAV_GROUP_CLASS} ${FOOTER_NAV_COLUMNS_CLASS}`}
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
              <ul className="footer-link-list">
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
    </footer>
  );
}
