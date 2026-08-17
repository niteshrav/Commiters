import React, { useEffect, useRef, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { useNavbarContent } from "../lib/cms/hooks";
import type { NavItem } from "../lib/cms/mappers";
import { NAV_DROPDOWN_LINK_ACTIVE_CLASS, NAV_DROPDOWN_LINK_CLASS, partitionHeaderNavItems } from "../lib/navSections";
import BrandLogo from "./BrandLogo";
import { IconChevronDown } from "./icons";

type NavMenusProps = {
  variant: "desktop" | "mobile";
  navItems: NavItem[];
  hoverPath: string | null;
  setHoverPath: (path: string | null) => void;
  handlePrimaryNavClick: (e: React.MouseEvent<HTMLAnchorElement>) => void;
  closeMenus: () => void;
};

function NavMenus({ variant, navItems, hoverPath, setHoverPath, handlePrimaryNavClick, closeMenus }: NavMenusProps) {
  const links = navItems.map((item) => (
    <NavLink
      key={item.id}
      to={item.to}
      end={item.end}
      className={({ isActive }) =>
        ["nav-primary-link", isActive ? "active" : "", hoverPath === item.to ? "nav-primary-link--hover" : ""]
          .filter(Boolean)
          .join(" ") || undefined
      }
      onMouseEnter={() => setHoverPath(item.to)}
      onMouseLeave={() => setHoverPath(null)}
      onClick={(e) => {
        closeMenus();
        handlePrimaryNavClick(e);
      }}
    >
      {item.label}
    </NavLink>
  ));

  if (variant === "desktop") {
    return <>{links}</>;
  }

  return (
    <div className="mobile-nav-menus" data-testid="mobile-nav-inner">
      {links}
    </div>
  );
}

type NavMoreDropdownProps = {
  variant: "desktop" | "mobile";
  items: NavItem[];
  handlePrimaryNavClick: (e: React.MouseEvent<HTMLAnchorElement>) => void;
  closeMenus: () => void;
};

function NavMoreDropdown({ variant, items, handlePrimaryNavClick, closeMenus }: NavMoreDropdownProps) {
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const rootRef = useRef<HTMLDivElement>(null);
  const panelId = variant === "desktop" ? "nav-more-menu" : "nav-more-menu-mobile";

  useEffect(() => {
    setOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    if (!open || variant !== "desktop") return;

    function onPointerDown(event: MouseEvent) {
      if (!rootRef.current?.contains(event.target as Node)) {
        setOpen(false);
      }
    }

    document.addEventListener("pointerdown", onPointerDown);
    return () => document.removeEventListener("pointerdown", onPointerDown);
  }, [open, variant]);

  if (items.length === 0) return null;

  const isAnyActive = items.some((item) => {
    if (item.end) return location.pathname === item.to;
    return location.pathname === item.to || location.pathname.startsWith(`${item.to}/`);
  });

  function closeDropdown() {
    setOpen(false);
    closeMenus();
  }

  return (
    <div ref={rootRef} className="nav-dropdown" data-testid="nav-more-menu">
      <button
        type="button"
        className={[
          "nav-primary-link",
          "nav-dropdown-trigger",
          open ? "nav-primary-link--hover" : "",
          isAnyActive ? "active" : "",
        ]
          .filter(Boolean)
          .join(" ")}
        aria-expanded={open}
        aria-controls={panelId}
        aria-haspopup="menu"
        onClick={() => setOpen((value) => !value)}
      >
        More
        <IconChevronDown width={14} height={14} aria-hidden className={open ? "nav-dropdown-chevron--open" : undefined} />
      </button>

      {open ? (
        <ul
          id={panelId}
          role="menu"
          className={
            variant === "desktop" ? "nav-dropdown-panel nav-dropdown-panel--desktop" : "nav-dropdown-panel nav-dropdown-panel--mobile"
          }
        >
          {items.map((item) => (
            <li key={item.id} role="none">
              <NavLink
                to={item.to}
                end={item.end}
                role="menuitem"
                className={({ isActive }) =>
                  [NAV_DROPDOWN_LINK_CLASS, isActive ? NAV_DROPDOWN_LINK_ACTIVE_CLASS : ""].filter(Boolean).join(" ") ||
                  undefined
                }
                onClick={(event) => {
                  closeDropdown();
                  handlePrimaryNavClick(event);
                }}
              >
                {item.label}
              </NavLink>
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  );
}

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const [hoverPath, setHoverPath] = useState<string | null>(null);
  const { logo, logoAlt, navItems, ctaLabel, ctaUrl } = useNavbarContent();
  const { bar: desktopBarItems, more: desktopMoreItems, mobile: mobileNavItems } = partitionHeaderNavItems(navItems);

  useEffect(() => {
    setHoverPath(null);
  }, [location.pathname]);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key !== "Escape") return;
      setOpen(false);
    }
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, []);

  function closeMenus() {
    setOpen(false);
  }

  function handlePrimaryNavClick(e: React.MouseEvent<HTMLAnchorElement>) {
    setOpen(false);
    setHoverPath(null);
    const el = e.currentTarget;
    queueMicrotask(() => el?.blur());
  }

  return (
    <header className="header header-light">
      <div className="container header-inner">
        <BrandLogo onNavigate={handlePrimaryNavClick} logoSrc={logo} logoAlt={logoAlt} />

        <nav className="nav" aria-label="Primary navigation">
          <div className="nav-menus-desktop">
            <NavMenus
              variant="desktop"
              navItems={desktopBarItems}
              hoverPath={hoverPath}
              setHoverPath={setHoverPath}
              handlePrimaryNavClick={handlePrimaryNavClick}
              closeMenus={closeMenus}
            />
            <NavMoreDropdown
              variant="desktop"
              items={desktopMoreItems}
              handlePrimaryNavClick={handlePrimaryNavClick}
              closeMenus={closeMenus}
            />
          </div>
        </nav>

        <Link
          className="btn btn-primary btn-nav-cta nav-cta-desktop"
          to={ctaUrl}
          onClick={handlePrimaryNavClick}
          data-testid="nav-start-project-cta"
        >
          {ctaLabel}
        </Link>

        <button
          className="menu-btn"
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-controls="mobile-nav"
        >
          Menu
        </button>
      </div>

      <div className={`container mobile-nav ${open ? "open" : ""}`} id="mobile-nav">
        <NavMenus
          variant="mobile"
          navItems={mobileNavItems}
          hoverPath={hoverPath}
          setHoverPath={setHoverPath}
          handlePrimaryNavClick={handlePrimaryNavClick}
          closeMenus={closeMenus}
        />
        <Link
          className="btn btn-primary btn-nav-cta nav-cta-mobile"
          to={ctaUrl}
          onClick={handlePrimaryNavClick}
          data-testid="nav-start-project-cta-mobile"
        >
          {ctaLabel}
        </Link>
      </div>
    </header>
  );
}
