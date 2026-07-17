import React, { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { useNavbarContent } from "../lib/cms/hooks";
import type { NavItem } from "../lib/cms/mappers";
import BrandLogo from "./BrandLogo";

type NavMenusProps = {
  variant: "desktop" | "mobile";
  navItems: NavItem[];
  hoverPath: string | null;
  setHoverPath: (path: string | null) => void;
  handlePrimaryNavClick: (e: React.MouseEvent<HTMLAnchorElement>) => void;
  closeMenus: () => void;
};

function NavMenus({ variant, navItems, hoverPath, setHoverPath, handlePrimaryNavClick, closeMenus }: NavMenusProps) {
  const menusWrapClass = variant === "desktop" ? "nav-menus-desktop" : "mobile-nav-menus";

  return (
    <div className={menusWrapClass} data-testid={variant === "mobile" ? "mobile-nav-inner" : undefined}>
      {navItems.map((item) => (
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
      ))}
    </div>
  );
}

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const [hoverPath, setHoverPath] = useState<string | null>(null);
  const { logo, logoAlt, navItems, ctaLabel, ctaUrl } = useNavbarContent();

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
          <NavMenus
            variant="desktop"
            navItems={navItems}
            hoverPath={hoverPath}
            setHoverPath={setHoverPath}
            handlePrimaryNavClick={handlePrimaryNavClick}
            closeMenus={closeMenus}
          />
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
          navItems={navItems}
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
