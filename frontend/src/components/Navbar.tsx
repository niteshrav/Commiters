import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { Link, NavLink, useLocation } from "react-router-dom";
import { useNavbarContent } from "../lib/cms/hooks";
import {
  NAV_DROPDOWN_LINK_CLASS,
  NAV_DROPDOWN_PANEL_GLASS_CLASS,
  type DesktopHeaderNavEntry,
  type NavDropdownConfig,
  type NavDropdownLink,
  type PrimaryNavItem,
  resolveDesktopHeaderNav,
} from "../lib/navSections";
import BrandLogo from "./BrandLogo";
import MobileNavDrawer from "./MobileNavDrawer";
import { IconMenu } from "./icons";
import {
  HEADER_DRAWER_OPEN_CLASS,
  HEADER_MENU_BTN_TESTID,
  MOBILE_NAV_DRAWER_TESTID,
} from "../lib/mobileNavDrawer";

const MEGA_CLOSE_DELAY_MS = 140;

type DropdownPanelPosition = {
  top: number;
  left?: number;
  right?: number;
};

type NavItemDropdownPanelProps = {
  config: NavDropdownConfig;
  alignEnd: boolean;
  anchorRef: React.RefObject<HTMLElement | null>;
  onNavigate: (event: React.MouseEvent<HTMLAnchorElement>) => void;
  onPointerEnter: () => void;
  onPointerLeave: () => void;
};

function NavDropdownItemLink({
  link,
  onNavigate,
  role,
}: {
  link: NavDropdownLink;
  onNavigate: (event: React.MouseEvent<HTMLAnchorElement>) => void;
  role?: "menuitem";
}) {
  return (
    <NavLink
      to={link.to}
      role={role}
      className={() =>
        [NAV_DROPDOWN_LINK_CLASS, "nav-dropdown-link--stacked", link.featured ? "nav-dropdown-link--featured" : ""]
          .filter(Boolean)
          .join(" ")
      }
      onClick={onNavigate}
    >
      <span className="nav-dropdown-link-label">{link.label}</span>
      <span className="nav-dropdown-link-description">{link.description}</span>
    </NavLink>
  );
}

function NavItemDropdownPanel({
  config,
  alignEnd,
  anchorRef,
  onNavigate,
  onPointerEnter,
  onPointerLeave,
}: NavItemDropdownPanelProps) {
  const [position, setPosition] = useState<DropdownPanelPosition | null>(null);
  const grouped = Boolean(config.groups?.length);

  useLayoutEffect(() => {
    const anchor = anchorRef.current;
    if (!anchor) return;

    const updatePosition = () => {
      const rect = anchor.getBoundingClientRect();
      if (grouped) {
        setPosition({ top: rect.bottom, left: 16, right: 16 });
        return;
      }
      setPosition(
        alignEnd
          ? { top: rect.bottom, right: Math.max(16, window.innerWidth - rect.right) }
          : { top: rect.bottom, left: rect.left },
      );
    };

    updatePosition();
    window.addEventListener("resize", updatePosition);
    window.addEventListener("scroll", updatePosition, true);
    return () => {
      window.removeEventListener("resize", updatePosition);
      window.removeEventListener("scroll", updatePosition, true);
    };
  }, [alignEnd, anchorRef, config.id, grouped]);

  if (!position) return null;

  return createPortal(
    <div
      className={`nav-item-dropdown-panel nav-item-dropdown-panel--fixed ${NAV_DROPDOWN_PANEL_GLASS_CLASS} ${grouped ? "nav-item-dropdown-panel--grouped" : "nav-item-dropdown-panel--cards"}`.trim()}
      data-testid={`nav-mega-panel-${config.id}`}
      role="menu"
      style={{ top: position.top, left: position.left, right: position.right }}
      onMouseEnter={onPointerEnter}
      onMouseLeave={onPointerLeave}
    >
      {grouped
        ? config.groups!.map((group) => (
            <div key={group.id} className="nav-mega-column" data-testid={`nav-mega-column-${group.id}`}>
              <p className="nav-mega-column-title">{group.label}</p>
              {group.links.map((link) => (
                <NavDropdownItemLink key={link.id} link={link} role="menuitem" onNavigate={onNavigate} />
              ))}
            </div>
          ))
        : config.links.map((link) => (
            <NavDropdownItemLink key={link.id} link={link} role="menuitem" onNavigate={onNavigate} />
          ))}
    </div>,
    document.body,
  );
}

const NAV_ITEM_ALIGN_END_IDS = new Set(["about"]);

type NavDesktopItemsProps = {
  entries: DesktopHeaderNavEntry[];
  openDropdownId: string | null;
  onOpenDropdown: (id: string) => void;
  onScheduleClose: () => void;
  onCancelClose: () => void;
  onNavigate: (event: React.MouseEvent<HTMLAnchorElement>) => void;
};

function NavDesktopPlainLink({
  item,
  onNavigate,
}: {
  item: PrimaryNavItem;
  onNavigate: (event: React.MouseEvent<HTMLAnchorElement>) => void;
}) {
  return (
    <NavLink
      to={item.to}
      end={item.end}
      className={() => "nav-primary-link"}
      data-testid={`nav-item-${item.id}`}
      onClick={onNavigate}
    >
      {item.label}
    </NavLink>
  );
}

function NavDesktopItems({
  entries,
  openDropdownId,
  onOpenDropdown,
  onScheduleClose,
  onCancelClose,
  onNavigate,
}: NavDesktopItemsProps) {
  return (
    <div className="nav-menus-desktop" data-testid="nav-menus-desktop">
      {entries.map((entry) =>
        entry.kind === "link" ? (
          <NavDesktopPlainLink key={entry.item.id} item={entry.item} onNavigate={onNavigate} />
        ) : (
          <NavDesktopDropdownItem
            key={entry.config.id}
            config={entry.config}
            isOpen={openDropdownId === entry.config.id}
            onOpenDropdown={onOpenDropdown}
            onScheduleClose={onScheduleClose}
            onCancelClose={onCancelClose}
            onNavigate={onNavigate}
          />
        ),
      )}
    </div>
  );
}

type NavDesktopDropdownItemProps = {
  config: NavDropdownConfig;
  isOpen: boolean;
  onOpenDropdown: (id: string) => void;
  onScheduleClose: () => void;
  onCancelClose: () => void;
  onNavigate: (event: React.MouseEvent<HTMLAnchorElement>) => void;
};

function NavDesktopDropdownItem({
  config,
  isOpen,
  onOpenDropdown,
  onScheduleClose,
  onCancelClose,
  onNavigate,
}: NavDesktopDropdownItemProps) {
  const triggerRef = useRef<HTMLAnchorElement>(null);
  const alignEnd = NAV_ITEM_ALIGN_END_IDS.has(config.id);

  return (
    <div
      className={["nav-item-dropdown", alignEnd ? "nav-item-dropdown--align-end" : ""].filter(Boolean).join(" ")}
      data-testid={`nav-item-${config.id}`}
      onMouseEnter={() => {
        onCancelClose();
        onOpenDropdown(config.id);
      }}
      onMouseLeave={onScheduleClose}
    >
      <NavLink
        ref={triggerRef}
        to={config.overviewTo}
        end={config.end}
        className={() =>
          ["nav-primary-link", "nav-dropdown-trigger", isOpen ? "nav-dropdown-trigger--open" : ""]
            .filter(Boolean)
            .join(" ")
        }
        aria-expanded={isOpen}
        aria-haspopup="menu"
        aria-controls={`nav-mega-panel-${config.id}`}
        onMouseEnter={() => onOpenDropdown(config.id)}
        onClick={onNavigate}
      >
        {config.label}
      </NavLink>

      {isOpen ? (
        <NavItemDropdownPanel
          config={config}
          alignEnd={alignEnd}
          anchorRef={triggerRef}
          onNavigate={onNavigate}
          onPointerEnter={onCancelClose}
          onPointerLeave={onScheduleClose}
        />
      ) : null}
    </div>
  );
}

export default function Navbar() {
  const location = useLocation();
  const closeTimerRef = useRef<number | null>(null);
  const [openDropdownId, setOpenDropdownId] = useState<string | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { logo, logoAlt, navItems, ctaLabel, ctaUrl } = useNavbarContent();
  const headerNavEntries = resolveDesktopHeaderNav(navItems);

  useEffect(() => {
    setOpenDropdownId(null);
    setMobileMenuOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    function onKey(event: KeyboardEvent) {
      if (event.key !== "Escape") return;
      setOpenDropdownId(null);
      setMobileMenuOpen(false);
    }

    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, []);

  function cancelCloseTimer() {
    if (closeTimerRef.current !== null) {
      window.clearTimeout(closeTimerRef.current);
      closeTimerRef.current = null;
    }
  }

  function scheduleClose() {
    cancelCloseTimer();
    closeTimerRef.current = window.setTimeout(() => {
      setOpenDropdownId(null);
      closeTimerRef.current = null;
    }, MEGA_CLOSE_DELAY_MS);
  }

  function handleNavigate(event: React.MouseEvent<HTMLAnchorElement>) {
    cancelCloseTimer();
    setOpenDropdownId(null);
    setMobileMenuOpen(false);
    const element = event.currentTarget;
    queueMicrotask(() => element?.blur());
  }

  return (
    <header className={["header", "header-light", mobileMenuOpen ? HEADER_DRAWER_OPEN_CLASS : ""].filter(Boolean).join(" ")}>
      <div className="container header-inner">
        <BrandLogo onNavigate={handleNavigate} logoSrc={logo} logoAlt={logoAlt} />

        <nav className="nav" aria-label="Primary navigation">
          <NavDesktopItems
            entries={headerNavEntries}
            openDropdownId={openDropdownId}
            onOpenDropdown={setOpenDropdownId}
            onScheduleClose={scheduleClose}
            onCancelClose={cancelCloseTimer}
            onNavigate={handleNavigate}
          />
        </nav>

        <div className="header-actions">
          <Link
            className="btn btn-primary btn-nav-cta nav-cta-desktop"
            to={ctaUrl}
            onClick={handleNavigate}
            data-testid="nav-start-project-cta"
          >
            {ctaLabel}
          </Link>
          <button
            type="button"
            className="header-menu-btn"
            data-testid={HEADER_MENU_BTN_TESTID}
            aria-label="Open menu"
            aria-expanded={mobileMenuOpen}
            aria-controls={MOBILE_NAV_DRAWER_TESTID}
            onClick={() => setMobileMenuOpen(true)}
          >
            <IconMenu width={22} height={22} />
          </button>
        </div>
      </div>

      {mobileMenuOpen ? (
        <MobileNavDrawer
          ctaLabel={ctaLabel}
          ctaUrl={ctaUrl}
          logoSrc={logo}
          logoAlt={logoAlt}
          onNavigate={handleNavigate}
          onClose={() => setMobileMenuOpen(false)}
        />
      ) : null}
    </header>
  );
}
