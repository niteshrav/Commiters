import { Fragment } from "react";
import { NavLink } from "react-router-dom";
import BrandLogo from "./BrandLogo";
import {
  FOOTER_BACK_TO_TOP_CLASS,
  FOOTER_BLACKBOOK_BAR_CLASS,
  FOOTER_BLACKBOOK_SOCIAL_CLASS,
  FOOTER_BRAND_SUBTEXT_CLASS,
  FOOTER_BRAND_TAGLINE_CLASS,
  FOOTER_COPYRIGHT_CELL_CLASS,
  FOOTER_LOGO_CELL_CLASS,
  FOOTER_NOCK_BRAND_CLASS,
  FOOTER_NOCK_CLASS,
  FOOTER_NOCK_MAIN_CLASS,
  FOOTER_NOCK_NAV_CLASS,
  FOOTER_NOCK_NAV_COLUMN_CLASS,
  FOOTER_NOCK_SHELL_CLASS,
} from "../lib/footerLayout";
import { useFooterContent } from "../lib/cms/hooks";
import { footerBrandLogoSrc } from "../lib/cms/media";
import {
  FOOTER_COPYRIGHT_STAFF_LINK_CLASS,
  FOOTER_STAFF_LOGIN_ARIA_LABEL,
  splitCopyrightLine,
} from "../lib/footerCopyright";
import {
  SITE_FOOTER_CAREERS_HIRING_BADGE,
  isSocialFooterColumn,
  type FooterExternalLink,
  type FooterLinkCell,
  type FooterNavColumn,
} from "../lib/siteFooterCopy";
import { resolveAdminPanelUrl } from "../lib/siteAdmin";
import { IconChevronUp, SocialBrandIcon } from "./icons";

function isAdminFooterLink(link: FooterLinkCell): boolean {
  return link.label.trim().toLowerCase() === "admin";
}

function FooterLink({ link }: { link: FooterLinkCell }) {
  if (link.kind === "external") {
    return (
      <a className="footer-link-item" href={link.href} target="_blank" rel="noopener noreferrer">
        <span className="footer-link-label">{link.label}</span>
      </a>
    );
  }

  return (
    <NavLink
      to={link.to}
      end={link.to === "/"}
      className={({ isActive }) => ["footer-link-item", isActive ? "active" : ""].filter(Boolean).join(" ") || undefined}
    >
      <span className="footer-link-label">{link.label}</span>
      {link.badge ? (
        <span className={link.badge === SITE_FOOTER_CAREERS_HIRING_BADGE ? "footer-hiring-badge" : "footer-link-badge"}>
          {link.badge}
        </span>
      ) : null}
    </NavLink>
  );
}

function FooterNavColumnBlock({ column }: { column: FooterNavColumn }) {
  const visibleLinks = column.links.filter((link) => !isAdminFooterLink(link));
  const columnId = column.id ?? column.heading.trim().toLowerCase().replace(/&/g, "").replace(/\s+/g, "-");

  return (
    <nav
      className={FOOTER_NOCK_NAV_COLUMN_CLASS}
      data-testid={`footer-nav-column-${columnId}`}
      aria-label={`${column.heading} footer links`}
    >
      <p className="footer-nock-nav-heading">{column.heading}</p>
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
  return <SocialBrandIcon label={label} width={16} height={16} aria-hidden />;
}

function scrollToTop() {
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function FooterCopyrightLine({ copyrightLine1 }: { copyrightLine1: string }) {
  const adminUrl = resolveAdminPanelUrl();
  const { symbol, remainder } = splitCopyrightLine(copyrightLine1);

  if (!adminUrl || !symbol) {
    return <>{copyrightLine1}</>;
  }

  return (
    <>
      <a
        className={FOOTER_COPYRIGHT_STAFF_LINK_CLASS}
        href={adminUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={FOOTER_STAFF_LOGIN_ARIA_LABEL}
      >
        {symbol}
      </a>{" "}
      {remainder}
    </>
  );
}

export default function Footer() {
  const { brandTagline, brandSubtext, copyrightLine1, navColumns, socialLinks, bottomLegalLinks } = useFooterContent();
  const visibleNavColumns = navColumns.filter((column) => !isSocialFooterColumn(column.heading));
  const visibleSocialLinks = socialLinks.filter(
    (link): link is FooterExternalLink => link.kind === "external" && !isAdminFooterLink(link),
  );
  const visibleLegalLinks = bottomLegalLinks.filter((link) => !isAdminFooterLink(link));

  return (
    <footer className={`footer footer-rich footer--stitch ${FOOTER_NOCK_CLASS} footer--home-mockup`}>
      <div className={FOOTER_NOCK_SHELL_CLASS}>
        <div className={`${FOOTER_NOCK_MAIN_CLASS} grid-cols-1 md:grid-cols-4`}>
          <div className={`${FOOTER_NOCK_BRAND_CLASS} footer-mockup-brand-stack`}>
            <div className={FOOTER_LOGO_CELL_CLASS} data-testid="footer-logo-cell">
              <BrandLogo variant="footer" logoSrc={footerBrandLogoSrc()} />
            </div>
            <p className={FOOTER_BRAND_TAGLINE_CLASS}>{brandTagline}</p>
            <p className={FOOTER_BRAND_SUBTEXT_CLASS}>{brandSubtext}</p>
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
          </div>

          <div className={FOOTER_NOCK_NAV_CLASS} data-testid="footer-nav-group">
            {visibleNavColumns.map((column) => (
              <FooterNavColumnBlock key={column.heading} column={column} />
            ))}
          </div>
        </div>

        <div className={FOOTER_BLACKBOOK_BAR_CLASS}>
          <p className={`footer-blackbook-copyright footer-bar-copyright ${FOOTER_COPYRIGHT_CELL_CLASS}`} data-testid="footer-copyright-cell">
            <FooterCopyrightLine copyrightLine1={copyrightLine1} />
          </p>

          <div className="footer-bar-right" data-testid="footer-legal-cell">
            <div className="footer-bar-legal-links">
              {visibleLegalLinks.map((link, index) => (
                <Fragment key={link.label}>
                  {index > 0 ? (
                    <span className="footer-legal-sep" aria-hidden>
                      |
                    </span>
                  ) : null}
                  <FooterLink link={link} />
                </Fragment>
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
