import { NavLink, useLocation } from "react-router-dom";
import BrandLogo from "./BrandLogo";
import {
  FOOTER_BACK_TO_TOP_CLASS,
  FOOTER_COLUMN_CLASS,
  FOOTER_COPYRIGHT_CELL_CLASS,
  FOOTER_LOGO_CELL_CLASS,
  FOOTER_REFERENCE_BAR_CLASS,
  FOOTER_REFERENCE_BRAND_CLASS,
  FOOTER_REFERENCE_CARD_CLASS,
  FOOTER_REFERENCE_GRID_CLASS,
  FOOTER_REFERENCE_SHELL_CLASS,
  FOOTER_SOCIAL_ICONS_ROW_CLASS,
} from "../lib/footerLayout";
import { useFooterContent } from "../lib/cms/hooks";
import { footerBrandLogoSrc } from "../lib/cms/media";
import {
  formatFooterColumnHeading,
  usesContactStyleFooter,
  type FooterExternalLink,
  type FooterLinkCell,
} from "../lib/siteFooterCopy";
import { IconChevronUp, IconInstagram, IconLinkedIn, IconMedium, IconWhatsApp } from "./icons";

function isAdminFooterLink(link: FooterLinkCell): boolean {
  return link.label.trim().toLowerCase() === "admin";
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

function FooterSocialIcon({ label }: { label: string }) {
  const iconProps = { width: 20, height: 20, "aria-hidden": true as const };

  switch (label) {
    case "LinkedIn":
      return <IconLinkedIn {...iconProps} />;
    case "WhatsApp":
      return <IconWhatsApp {...iconProps} />;
    case "Instagram":
      return <IconInstagram {...iconProps} />;
    case "Medium":
      return <IconMedium {...iconProps} />;
    default:
      return null;
  }
}

function FooterSocialIcons({ links }: { links: readonly FooterLinkCell[] }) {
  const visibleLinks = links.filter(
    (link): link is FooterExternalLink => link.kind === "external" && !isAdminFooterLink(link),
  );

  if (!visibleLinks.length) return null;

  return (
    <div className={FOOTER_SOCIAL_ICONS_ROW_CLASS} data-testid="footer-social-icons">
      {visibleLinks.map((link) => (
        <a
          key={link.label}
          className="footer-contact-icon-link"
          href={link.href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={link.label}
        >
          <FooterSocialIcon label={link.label} />
        </a>
      ))}
    </div>
  );
}

function scrollToTop() {
  window.scrollTo({ top: 0, behavior: "smooth" });
}

export default function Footer() {
  const location = useLocation();
  const { copyrightLine1, copyrightLine2, socialLinks, navColumns: cmsColumns } = useFooterContent();
  const isContactFooter = usesContactStyleFooter(location.pathname);
  const navColumns = isContactFooter
    ? cmsColumns.map((column) => ({
        ...column,
        heading: column.heading === "NAVIGATION" ? "SITEMAP" : column.heading,
      }))
    : cmsColumns;

  return (
    <footer className={`footer footer-rich footer--stitch footer--reference footer--home-mockup${isContactFooter ? " footer--contact-mockup" : ""}`}>
      <div className={FOOTER_REFERENCE_SHELL_CLASS}>
        <div className={FOOTER_REFERENCE_CARD_CLASS}>
          <div className={FOOTER_REFERENCE_GRID_CLASS}>
            <div className={`${FOOTER_REFERENCE_BRAND_CLASS} footer-mockup-brand-stack`}>
              <div className={FOOTER_LOGO_CELL_CLASS} data-testid="footer-logo-cell">
                <BrandLogo variant="footer" logoSrc={footerBrandLogoSrc()} />
              </div>
              <p className="footer-brand-tagline">{copyrightLine2}</p>
              <FooterSocialIcons links={socialLinks} />
              <button type="button" className={FOOTER_BACK_TO_TOP_CLASS} onClick={scrollToTop}>
                <IconChevronUp width={16} height={16} />
                <span>Back to Top</span>
              </button>
            </div>

            {navColumns.map((column) => {
              const visibleLinks = column.links.filter((link) => !isAdminFooterLink(link));
              return (
                <nav
                  key={column.heading}
                  className={`footer-column ${FOOTER_COLUMN_CLASS}`}
                  data-testid={`footer-nav-column-${column.heading.toLowerCase()}`}
                  aria-label={formatFooterColumnHeading(column.heading)}
                >
                  <p className="footer-column-heading">{formatFooterColumnHeading(column.heading)}</p>
                  <ul className="footer-link-list">
                    {visibleLinks.map((link) => (
                      <li key={link.label}>
                        <FooterLink link={link} />
                      </li>
                    ))}
                  </ul>
                </nav>
              );
            })}
          </div>

          <div className={FOOTER_REFERENCE_BAR_CLASS}>
            <p className={`footer-reference-copyright ${FOOTER_COPYRIGHT_CELL_CLASS}`} data-testid="footer-copyright-cell">
              {copyrightLine1}
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
