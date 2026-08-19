import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { Link, NavLink, useLocation } from "react-router-dom";
import { useNavbarContent } from "../lib/cms/hooks";
import {
  NAV_DROPDOWN_LINK_CLASS,
  type NavDropdownConfig,
  resolveNavDropdownConfigs,
} from "../lib/navSections";
import BrandLogo from "./BrandLogo";
import { IconChevronDown } from "./icons";

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

function NavItemDropdownPanel({
  config,
  alignEnd,
  anchorRef,
  onNavigate,
  onPointerEnter,
  onPointerLeave,
}: NavItemDropdownPanelProps) {
  const [position, setPosition] = useState<DropdownPanelPosition | null>(null);
  const linkColumns = config.links.length > 4 ? "nav-item-dropdown-panel--columns" : "";

  useLayoutEffect(() => {
    const anchor = anchorRef.current;
    if (!anchor) return;

    const updatePosition = () => {
      const rect = anchor.getBoundingClientRect();
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
  }, [alignEnd, anchorRef, config.id]);

  if (!position) return null;

  return createPortal(
    <div
      className={`nav-item-dropdown-panel nav-item-dropdown-panel--fixed ${linkColumns}`.trim()}
      data-testid={`nav-mega-panel-${config.id}`}
      role="menu"
      style={{ top: position.top, left: position.left, right: position.right }}
      onMouseEnter={onPointerEnter}
      onMouseLeave={onPointerLeave}
    >
      {config.links.map((link) => (
        <NavLink
          key={link.id}
          to={link.to}
          role="menuitem"
          className={() => NAV_DROPDOWN_LINK_CLASS}
          onClick={onNavigate}
        >
          {link.label}
        </NavLink>
      ))}
    </div>,
    document.body,
  );
}

const NAV_ITEM_ALIGN_END_IDS = new Set(["trusttap", "careers", "contact"]);

type NavDesktopDropdownProps = {
  configs: NavDropdownConfig[];
  openDropdownId: string | null;
  onOpenDropdown: (id: string) => void;
  onScheduleClose: () => void;
  onCancelClose: () => void;
  onNavigate: (event: React.MouseEvent<HTMLAnchorElement>) => void;
};

function NavDesktopDropdowns({
  configs,
  openDropdownId,
  onOpenDropdown,
  onScheduleClose,
  onCancelClose,
  onNavigate,
}: NavDesktopDropdownProps) {
  return (
    <div className="nav-menus-desktop" data-testid="nav-menus-desktop">
      {configs.map((config) => (
        <NavDesktopDropdownItem
          key={config.id}
          config={config}
          isOpen={openDropdownId === config.id}
          onOpenDropdown={onOpenDropdown}
          onScheduleClose={onScheduleClose}
          onCancelClose={onCancelClose}
          onNavigate={onNavigate}
        />
      ))}
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
        <IconChevronDown
          width={14}
          height={14}
          aria-hidden
          className={isOpen ? "nav-dropdown-chevron--open" : undefined}
        />
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

type NavMobileAccordionProps = {
  configs: NavDropdownConfig[];
  expandedId: string | null;
  onToggle: (id: string) => void;
  onNavigate: (event: React.MouseEvent<HTMLAnchorElement>) => void;
};

function NavMobileAccordion({ configs, expandedId, onToggle, onNavigate }: NavMobileAccordionProps) {
  return (
    <div className="nav-mobile-accordion" data-testid="nav-mobile-accordion">
      {configs.map((config) => {
        const isOpen = expandedId === config.id;
        const panelId = `nav-mobile-panel-${config.id}`;

        return (
          <div key={config.id} className="nav-mobile-group" data-testid={`nav-mobile-group-${config.id}`}>
            <button
              type="button"
              className={["nav-mobile-group-trigger", isOpen ? "nav-mobile-group-trigger--open" : ""]
                .filter(Boolean)
                .join(" ")}
              aria-expanded={isOpen}
              aria-controls={panelId}
              onClick={() => onToggle(config.id)}
            >
              {config.label}
              <IconChevronDown width={16} height={16} aria-hidden className={isOpen ? "nav-dropdown-chevron--open" : undefined} />
            </button>

            {isOpen ? (
              <div id={panelId} className="nav-mobile-group-panel">
                {config.links.map((link) => (
                  <NavLink
                    key={link.id}
                    to={link.to}
                    className={NAV_DROPDOWN_LINK_CLASS}
                    onClick={onNavigate}
                  >
                    {link.label}
                  </NavLink>
                ))}
              </div>
            ) : null}
          </div>
        );
      })}
    </div>
  );
}

export default function Navbar() {
  const location = useLocation();
  const closeTimerRef = useRef<number | null>(null);
  const [openDropdownId, setOpenDropdownId] = useState<string | null>(null);
  const [expandedMobileId, setExpandedMobileId] = useState<string | null>(null);
  const { logo, logoAlt, navItems, ctaLabel, ctaUrl } = useNavbarContent();
  const dropdownConfigs = resolveNavDropdownConfigs(navItems);

  useEffect(() => {
    setOpenDropdownId(null);
    setExpandedMobileId(null);
  }, [location.pathname]);

  useEffect(() => {
    function onKey(event: KeyboardEvent) {
      if (event.key !== "Escape") return;
      setOpenDropdownId(null);
      setExpandedMobileId(null);
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
    setExpandedMobileId(null);
    const element = event.currentTarget;
    queueMicrotask(() => element?.blur());
  }

  return (
    <header className="header header-light">
      <div className="container header-inner">
        <BrandLogo onNavigate={handleNavigate} logoSrc={logo} logoAlt={logoAlt} />

        <nav className="nav" aria-label="Primary navigation">
          <NavDesktopDropdowns
            configs={dropdownConfigs}
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
          <Link
            className="btn btn-primary btn-nav-cta nav-cta-mobile"
            to={ctaUrl}
            onClick={handleNavigate}
            data-testid="nav-start-project-cta-mobile"
          >
            {ctaLabel}
          </Link>
        </div>
      </div>

      <NavMobileAccordion
        configs={dropdownConfigs}
        expandedId={expandedMobileId}
        onToggle={(id) => setExpandedMobileId((current) => (current === id ? null : id))}
        onNavigate={handleNavigate}
      />
    </header>
  );
}
