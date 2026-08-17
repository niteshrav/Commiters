import { NavLink } from "react-router-dom";
import BrandLogo from "./BrandLogo";
import {
  FOOTER_BACK_TO_TOP_CLASS,
  FOOTER_BLACKBOOK_BAR_CLASS,
  FOOTER_BLACKBOOK_SOCIAL_CLASS,
  FOOTER_BRAND_TAGLINE_CLASS,
  FOOTER_COPYRIGHT_CELL_CLASS,
  FOOTER_LOGO_CELL_CLASS,
  FOOTER_NOCK_BRAND_CLASS,
  FOOTER_NOCK_CLASS,
  FOOTER_NOCK_MAIN_CLASS,
  FOOTER_NOCK_NAV_CLASS,
  FOOTER_NOCK_NAV_COLUMN_CLASS,
  FOOTER_NOCK_SHELL_CLASS,
  FOOTER_NOCK_WATERMARK_CLASS,
} from "../lib/footerLayout";
import { useFooterContent } from "../lib/cms/hooks";
import { footerBrandLogoSrc } from "../lib/cms/media";
import { isSocialFooterColumn, type FooterExternalLink, type FooterLinkCell, type FooterNavColumn } from "../lib/siteFooterCopy";
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
    <NavLink
      to={link.to}
      end={link.to === "/"}
      className={({ isActive }) => ["footer-link-item", isActive ? "active" : ""].filter(Boolean).join(" ") || undefined}
    >
      {link.label}
    </NavLink>
  );
}

function FooterNavColumnBlock({ column }: { column: FooterNavColumn }) {
  const visibleLinks = column.links.filter((link) => !isAdminFooterLink(link));
  const columnId = column.heading.trim().toLowerCase().replace(/\s+/g, "-");

  return (
    <nav
      className={FOOTER_NOCK_NAV_COLUMN_CLASS}
      data-testid={`footer-nav-column-${columnId}`}
      aria-label={`${column.heading} footer links`}
    >
      <ul className="footer-link-list">
        {visibleLinks.map((link) => (
          <li key={link.label}>
            <FooterLink link={link} />
          </li>
        ))}
      </ul>
    </nav>
  );
}

function FooterSocialIcon({ label }: { label: string }) {
  const iconProps = { width: 18, height: 18, "aria-hidden": true as const };

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

function scrollToTop() {
  window.scrollTo({ top: 0, behavior: "smooth" });
}

export default function Footer() {
  const { brandTagline, copyrightLine1, navColumns, socialLinks, bottomLegalLinks } = useFooterContent();
  const visibleNavColumns = navColumns.filter((column) => !isSocialFooterColumn(column.heading));
  const visibleSocialLinks = socialLinks.filter(
    (link): link is FooterExternalLink => link.kind === "external" && !isAdminFooterLink(link),
  );
  const visibleLegalLinks = bottomLegalLinks.filter((link) => !isAdminFooterLink(link));

  return (
    <footer className={`footer footer-rich footer--stitch ${FOOTER_NOCK_CLASS} footer--home-mockup`}>
      <div className={FOOTER_NOCK_SHELL_CLASS}>
        <div className={FOOTER_NOCK_MAIN_CLASS}>
          <div className={`${FOOTER_NOCK_BRAND_CLASS} footer-mockup-brand-stack`}>
            <div className={FOOTER_LOGO_CELL_CLASS} data-testid="footer-logo-cell">
              <BrandLogo variant="footer" logoSrc={footerBrandLogoSrc()} />
            </div>
            <p className={FOOTER_BRAND_TAGLINE_CLASS}>{brandTagline}</p>
          </div>

          <div className={FOOTER_NOCK_NAV_CLASS} data-testid="footer-nav-group">
            {visibleNavColumns.map((column) => (
              <FooterNavColumnBlock key={column.heading} column={column} />
            ))}
          </div>

          <p className={FOOTER_NOCK_WATERMARK_CLASS} aria-hidden>
            COMMITERS
          </p>
        </div>

        <div className={FOOTER_BLACKBOOK_BAR_CLASS}>
          <p className={`footer-blackbook-copyright footer-bar-copyright ${FOOTER_COPYRIGHT_CELL_CLASS}`} data-testid="footer-copyright-cell">
            {copyrightLine1}
          </p>

          <div className={FOOTER_BLACKBOOK_SOCIAL_CLASS} data-testid="footer-social-icons">
            {visibleSocialLinks.map((link) => (
              <a
                key={link.label}
                className="footer-blackbook-social-link"
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={link.label}
              >
                <FooterSocialIcon label={link.label} />
              </a>
            ))}
          </div>

          <div className="footer-bar-right" data-testid="footer-legal-cell">
            <div className="footer-bar-legal-links">
              {visibleLegalLinks.map((link) => (
                <FooterLink key={link.label} link={link} />
              ))}
            </div>
            <button type="button" className={FOOTER_BACK_TO_TOP_CLASS} onClick={scrollToTop} aria-label="Back to top">
              <IconChevronUp width={16} height={16} />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
