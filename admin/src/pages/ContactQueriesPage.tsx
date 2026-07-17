import { useCallback, useEffect, useState } from "react";
import { api, Paginated } from "../lib/api";
import { useRegisterPageSearch } from "../lib/AdminPageContext";
import { StudioIconButton, StudioPageHeader, StudioStatusBadge } from "../components/StudioModal";

type Query = {
  _id: string;
  name: string;
  email: string;
  serviceNeeded: string;
  message: string;
  isRead: boolean;
  createdAt: string;
  updatedAt?: string;
};

export default function ContactQueriesPage() {
  const [data, setData] = useState<Paginated<Query> | null>(null);
  const [filter, setFilter] = useState<"all" | "read" | "unread">("all");
  const [search, setSearch] = useState("");

  const onSearchChange = useCallback((value: string) => setSearch(value), []);

  useRegisterPageSearch({
    placeholder: "Search inquiries...",
    value: search,
    onChange: onSearchChange,
  });

  async function load() {
    const params = new URLSearchParams({ page: "1", limit: "50", search });
    if (filter === "read") params.set("isRead", "true");
    if (filter === "unread") params.set("isRead", "false");
    const res = await api<Paginated<Query>>(`/api/admin/contact-queries?${params.toString()}`);
    setData(res);
  }

  useEffect(() => {
    void load();
  }, [filter, search]);

  return (
    <div className="admin-page studio-page">
      <StudioPageHeader
        title="Contact Queries"
        description="Review client inquiries submitted through the website contact form."
      />

      <div className="studio-toolbar">
        <select value={filter} onChange={(e) => setFilter(e.target.value as typeof filter)}>
          <option value="all">All inquiries</option>
          <option value="unread">Unread</option>
          <option value="read">Read</option>
        </select>
      </div>

      <div className="studio-table-card">
        <div className="studio-table-wrap">
          <table className="studio-table">
            <thead>
              <tr>
                <th>Client</th>
                <th>Service</th>
                <th>Message</th>
                <th>Status</th>
                <th>Received</th>
                <th className="studio-table-actions-head">Actions</th>
              </tr>
            </thead>
            <tbody>
              {data?.items.map((item) => (
                <tr key={item._id} className="studio-table-row">
                  <td>
                    <div className="studio-table-primary">
                      <div className="studio-table-thumb">
                        <span>{item.name.slice(0, 2).toUpperCase()}</span>
                      </div>
                      <div>
                        <span className="studio-table-title">{item.name}</span>
                        <span className="studio-table-subtitle">{item.email}</span>
                      </div>
                    </div>
                  </td>
                  <td>{item.serviceNeeded ? <span className="studio-chip">{item.serviceNeeded}</span> : "—"}</td>
                  <td className="studio-table-message">{item.message.slice(0, 100)}</td>
                  <td>
                    <StudioStatusBadge published={item.isRead} label={item.isRead ? "Read" : "Unread"} />
                  </td>
                  <td className="studio-table-muted">
                    {new Date(item.createdAt).toLocaleDateString(undefined, {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </td>
                  <td className="studio-table-actions">
                    {!item.isRead ? (
                      <StudioIconButton
                        icon="mark_email_read"
                        label="Mark read"
                        onClick={() =>
                          api(`/api/admin/contact-queries/${item._id}/read`, {
                            method: "PATCH",
                            body: JSON.stringify({ isRead: true }),
                          }).then(load)
                        }
                      />
                    ) : null}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {!data?.items.length ? <p className="studio-table-empty">No inquiries found.</p> : null}
        <div className="studio-table-footer">
          <span>{data?.total ?? 0} total inquiries</span>
        </div>
      </div>
    </div>
  );
}
