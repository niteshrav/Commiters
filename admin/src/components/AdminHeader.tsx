import { useNavigate } from "react-router-dom";
import AdminAvatar from "./AdminAvatar";
import MaterialIcon from "./MaterialIcon";
import { adminDisplayName, useAdminPage } from "../lib/AdminPageContext";

type Props = {
  unreadQueries: number;
  navSearch: string;
  onNavSearchChange: (value: string) => void;
};

export default function AdminHeader({ unreadQueries, navSearch, onNavSearchChange }: Props) {
  const navigate = useNavigate();
  const { pageSearch, user } = useAdminPage();
  const siteUrl = (import.meta.env.VITE_SITE_URL as string | undefined)?.trim() || "http://localhost:5173";
  const search = pageSearch ?? {
    placeholder: "Search modules, inquiries, or posts...",
    value: navSearch,
    onChange: onNavSearchChange,
  };

  const displayName = adminDisplayName(user);

  return (
    <header className="admin-header">
      <div className="admin-header-search">
        <MaterialIcon name="search" className="admin-header-search-icon" />
        <input
          type="search"
          value={search.value}
          onChange={(e) => search.onChange(e.target.value)}
          placeholder={search.placeholder}
          aria-label="Search admin console"
        />
      </div>
      <div className="admin-header-actions">
        <button
          type="button"
          className="admin-icon-btn"
          aria-label={`Notifications${unreadQueries ? `, ${unreadQueries} unread` : ""}`}
          onClick={() => navigate("/contact-queries")}
        >
          <MaterialIcon name="notifications" />
          {unreadQueries > 0 ? <span className="admin-notify-dot" /> : null}
        </button>
        <button type="button" className="admin-icon-btn" aria-label="Help">
          <MaterialIcon name="help_outline" />
        </button>
        <span className="admin-header-divider" aria-hidden />
        <a className="admin-header-cta" href={siteUrl} target="_blank" rel="noopener noreferrer">
          View Site
        </a>
        <span className="admin-header-divider" aria-hidden />
        <button type="button" className="admin-header-user admin-header-user--button" onClick={() => navigate("/profile")}>
          <span className="admin-header-user-name">{displayName}</span>
          <AdminAvatar name={displayName} avatar={user?.avatar} size={32} className="admin-header-user-avatar" />
        </button>
      </div>
    </header>
  );
}
