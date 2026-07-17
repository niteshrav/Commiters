import { useEffect, useState } from "react";
import { api, Paginated, resolveMediaUrl, uploadMediaFile } from "../lib/api";
import MaterialIcon from "../components/MaterialIcon";
import { StudioPageHeader } from "../components/StudioModal";

type MediaItem = {
  _id: string;
  originalName: string;
  url: string;
  mimeType: string;
  size: number;
  createdAt?: string;
};

export default function MediaPage() {
  const [data, setData] = useState<Paginated<MediaItem> | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);

  async function load() {
    setLoading(true);
    try {
      const res = await api<Paginated<MediaItem>>("/api/admin/media?page=1&limit=50");
      setData(res);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load media.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    void load();
  }, []);

  async function onUpload(e: React.FormEvent) {
    e.preventDefault();
    if (!file) return;
    setError("");
    setUploading(true);
    try {
      await uploadMediaFile(file);
      setFile(null);
      await load();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Upload failed.");
    } finally {
      setUploading(false);
    }
  }

  async function onDelete(id: string) {
    if (!confirm("Delete this media file?")) return;
    await api(`/api/admin/media/${id}`, { method: "DELETE" });
    await load();
  }

  return (
    <div className="admin-page studio-page">
      <StudioPageHeader
        title="Media Library"
        description="Upload and manage images used across the website and admin content."
      />

      <form className="studio-editor-card studio-form" onSubmit={onUpload}>
        <label className="studio-field">
          Upload Image
          <input type="file" accept="image/*" onChange={(e) => setFile(e.target.files?.[0] ?? null)} />
        </label>
        <button className="studio-btn studio-btn--primary" type="submit" disabled={!file || uploading}>
          <MaterialIcon name="cloud_upload" />
          {uploading ? "Uploading…" : "Upload Image"}
        </button>
      </form>

      {error ? <p className="error">{error}</p> : null}

      <div className="studio-table-card" style={{ marginTop: 24 }}>
        {loading ? (
          <p className="studio-table-empty">Loading…</p>
        ) : (
          <div className="studio-table-wrap">
            <table className="studio-table">
              <thead>
                <tr>
                  <th>Preview</th>
                  <th>Name</th>
                  <th>URL</th>
                  <th>Size</th>
                  <th className="studio-table-actions-head">Actions</th>
                </tr>
              </thead>
              <tbody>
                {data?.items.map((item) => (
                  <tr key={item._id} className="studio-table-row">
                    <td>
                      {item.mimeType.startsWith("image/") ? (
                        <div className="studio-table-thumb">
                          <img src={resolveMediaUrl(item.url)} alt="" />
                        </div>
                      ) : (
                        "—"
                      )}
                    </td>
                    <td className="studio-table-title">{item.originalName}</td>
                    <td>
                      <code>{item.url}</code>
                    </td>
                    <td className="studio-table-muted">{Math.round(item.size / 1024)} KB</td>
                    <td className="studio-table-actions">
                      <button className="studio-icon-btn studio-icon-btn--danger" type="button" onClick={() => onDelete(item._id)}>
                        <MaterialIcon name="delete" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
        {!loading && data?.items.length === 0 ? <p className="studio-table-empty">No media uploaded yet.</p> : null}
      </div>
    </div>
  );
}
