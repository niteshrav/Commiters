import { useEffect, useMemo, useState } from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import AdminAvatar from "./AdminAvatar";
import AdminHeader from "./AdminHeader";
import MaterialIcon from "./MaterialIcon";
import { AdminPageProvider, adminDisplayName, useAdminPage } from "../lib/AdminPageContext";
import { api, clearToken } from "../lib/api";
import { NAV_SECTIONS, type NavItem } from "../lib/navConfig";

function matchesSearch(item: NavItem, query: string) {
  if (!query.trim()) return true;
  return item.label.toLowerCase().includes(query.trim().toLowerCase());
}

function AdminLayoutShell() {
  const navigate = useNavigate();
  const { user, refreshUser } = useAdminPage();
  const [unreadQueries, setUnreadQueries] = useState(0);
  const [navSearch, setNavSearch] = useState("");

  useEffect(() => {
    void refreshUser();
  }, [refreshUser]);

  useEffect(() => {
    api<{ unreadContactQueries: number }>("/api/admin/dashboard")
      .then((stats) => setUnreadQueries(stats.unreadContactQueries))
      .catch(() => setUnreadQueries(0));
  }, []);

  const filteredSections = useMemo(() => {
    if (!navSearch.trim()) return NAV_SECTIONS;
    return NAV_SECTIONS.map((section) => ({
      ...section,
      items: section.items.filter((item) => matchesSearch(item, navSearch)),
    })).filter((section) => section.items.length > 0);
  }, [navSearch]);

  const displayName = adminDisplayName(user);

  return (
    <div className="admin-app">
      <aside className="admin-sidebar">
        <div className="admin-brand">
          <h1>Engineering Studio</h1>
          <p>Admin Console</p>
        </div>

        <nav className="admin-nav custom-scrollbar">
          {filteredSections.map((section) => (
            <div key={section.heading ?? "dashboard"} className="admin-nav-section">
              {section.heading ? <p className="admin-nav-heading">{section.heading}</p> : null}
              {section.items.map((item) => (
                <NavLink
                  key={item.to}
                  to={item.to}
                  end={item.end}
                  className={({ isActive }) => `admin-nav-link${isActive ? " admin-nav-link--active" : ""}`}
                >
                  <MaterialIcon name={item.icon} />
                  <span>{item.label}</span>
                </NavLink>
              ))}
            </div>
          ))}
        </nav>

        <div className="admin-sidebar-footer">
          <NavLink to="/profile" className="admin-user-card admin-user-card--link">
            <AdminAvatar name={displayName} avatar={user?.avatar} size={40} />
            <div>
              <p className="admin-user-name">{displayName}</p>
              <p className="admin-user-role">{user?.email ?? "Lead Committer"}</p>
            </div>
          </NavLink>
          <button
            type="button"
            className="admin-logout-btn"
            onClick={() => {
              clearToken();
              navigate("/login");
            }}
          >
            <MaterialIcon name="logout" />
            Logout
          </button>
        </div>
      </aside>

      <div className="admin-main-wrap">
        <AdminHeader unreadQueries={unreadQueries} navSearch={navSearch} onNavSearchChange={setNavSearch} />
        <main className="admin-main custom-scrollbar">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default function AdminLayout() {
  return (
    <AdminPageProvider>
      <AdminLayoutShell />
    </AdminPageProvider>
  );
}
