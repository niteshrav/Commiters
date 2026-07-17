import { useRef, useState, type ReactNode } from "react";
import { resolveMediaUrl, uploadMediaFile } from "../lib/api";
import MaterialIcon from "./MaterialIcon";

type Variant = "default" | "dropzone";

type SingleProps = {
  label: string;
  value: unknown;
  onChange: (value: string) => void;
  variant?: Variant;
};

async function uploadOne(file: File): Promise<string> {
  return uploadMediaFile(file);
}

function DropzoneShell({
  label,
  uploading,
  error,
  onPick,
  onDrop,
  children,
}: {
  label: string;
  uploading: boolean;
  error: string;
  onPick: (file: File | null) => void;
  onDrop: (files: FileList | null) => void;
  children?: ReactNode;
}) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [dragging, setDragging] = useState(false);

  return (
    <div className="image-upload-field image-upload-field--dropzone">
      <span className="image-upload-label">{label}</span>
      {children}
      <button
        type="button"
        className={`studio-dropzone${dragging ? " studio-dropzone--active" : ""}`}
        disabled={uploading}
        onClick={() => inputRef.current?.click()}
        onDragOver={(e) => {
          e.preventDefault();
          setDragging(true);
        }}
        onDragLeave={() => setDragging(false)}
        onDrop={(e) => {
          e.preventDefault();
          setDragging(false);
          onDrop(e.dataTransfer.files);
        }}
      >
        <MaterialIcon name="cloud_upload" className="studio-dropzone-icon" />
        <p className="studio-dropzone-title">{uploading ? "Uploading…" : "Click to upload or drag and drop"}</p>
        <p className="studio-dropzone-hint">PNG, JPG, WebP or SVG (max. 5MB)</p>
      </button>
      <input
        ref={inputRef}
        type="file"
        accept="image/jpeg,image/png,image/webp,image/gif,image/svg+xml"
        className="image-upload-file-hidden"
        disabled={uploading}
        onChange={(e) => onPick(e.target.files?.[0] ?? null)}
      />
      {error ? <p className="error">{error}</p> : null}
    </div>
  );
}

export function ImageUploadField({ label, value, onChange, variant = "default" }: SingleProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");
  const url = String(value ?? "");

  async function handleFile(file: File | null) {
    if (!file) return;
    setError("");
    setUploading(true);
    try {
      onChange(await uploadOne(file));
    } catch (err) {
      setError(err instanceof Error ? err.message : "Upload failed.");
    } finally {
      setUploading(false);
      if (inputRef.current) inputRef.current.value = "";
    }
  }

  if (variant === "dropzone") {
    return (
      <DropzoneShell
        label={label}
        uploading={uploading}
        error={error}
        onPick={(file) => void handleFile(file)}
        onDrop={(files) => void handleFile(files?.[0] ?? null)}
      >
        {url ? (
          <div className="studio-dropzone-preview">
            <img src={resolveMediaUrl(url)} alt="" />
            <button className="btn secondary" type="button" onClick={() => onChange("")}>
              Remove
            </button>
          </div>
        ) : null}
      </DropzoneShell>
    );
  }

  return (
    <div className="image-upload-field">
      <span className="image-upload-label">{label}</span>
      {url ? (
        <div className="image-upload-preview-wrap">
          <img className="image-upload-preview" src={resolveMediaUrl(url)} alt="" />
          <button className="btn secondary image-upload-clear" type="button" onClick={() => onChange("")}>
            Remove
          </button>
        </div>
      ) : null}
      <div className="image-upload-actions">
        <input
          ref={inputRef}
          type="file"
          accept="image/jpeg,image/png,image/webp,image/gif,image/svg+xml"
          className="image-upload-file"
          disabled={uploading}
          onChange={(e) => void handleFile(e.target.files?.[0] ?? null)}
        />
        <span className="muted image-upload-hint">{uploading ? "Uploading…" : "Choose a file to upload (max 5 MB)"}</span>
      </div>
      <label className="image-upload-url-label">
        Or paste image URL
        <input type="url" value={url} placeholder="https://… or /uploads/…" onChange={(e) => onChange(e.target.value)} />
      </label>
      {error ? <p className="error">{error}</p> : null}
    </div>
  );
}

type MultiProps = {
  label: string;
  value: unknown;
  onChange: (value: string[]) => void;
  variant?: Variant;
};

export function ImagesUploadField({ label, value, onChange, variant = "default" }: MultiProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");
  const urls = Array.isArray(value) ? value.map(String).filter(Boolean) : [];

  async function handleFiles(files: FileList | null) {
    if (!files?.length) return;
    setError("");
    setUploading(true);
    try {
      const uploaded: string[] = [];
      for (const file of Array.from(files)) {
        uploaded.push(await uploadOne(file));
      }
      onChange([...urls, ...uploaded]);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Upload failed.");
    } finally {
      setUploading(false);
      if (inputRef.current) inputRef.current.value = "";
    }
  }

  if (variant === "dropzone") {
    return (
      <DropzoneShell
        label={label}
        uploading={uploading}
        error={error}
        onPick={(file) => void handleFiles(file ? createFileList(file) : null)}
        onDrop={(files) => void handleFiles(files)}
      >
        {urls.length ? (
          <ul className="image-upload-gallery">
            {urls.map((itemUrl, index) => (
              <li key={`${itemUrl}-${index}`} className="image-upload-gallery-item">
                <img src={resolveMediaUrl(itemUrl)} alt="" />
                <button
                  className="btn danger image-upload-gallery-remove"
                  type="button"
                  onClick={() => onChange(urls.filter((_, i) => i !== index))}
                >
                  Remove
                </button>
              </li>
            ))}
          </ul>
        ) : null}
      </DropzoneShell>
    );
  }

  return (
    <div className="image-upload-field">
      <span className="image-upload-label">{label}</span>
      {urls.length ? (
        <ul className="image-upload-gallery">
          {urls.map((itemUrl, index) => (
            <li key={`${itemUrl}-${index}`} className="image-upload-gallery-item">
              <img src={resolveMediaUrl(itemUrl)} alt="" />
              <button
                className="btn danger image-upload-gallery-remove"
                type="button"
                onClick={() => onChange(urls.filter((_, i) => i !== index))}
              >
                Remove
              </button>
            </li>
          ))}
        </ul>
      ) : null}
      <div className="image-upload-actions">
        <input
          ref={inputRef}
          type="file"
          accept="image/jpeg,image/png,image/webp,image/gif,image/svg+xml"
          multiple
          className="image-upload-file"
          disabled={uploading}
          onChange={(e) => void handleFiles(e.target.files)}
        />
        <span className="muted image-upload-hint">
          {uploading ? "Uploading…" : "Choose one or more images (max 5 MB each)"}
        </span>
      </div>
      {error ? <p className="error">{error}</p> : null}
    </div>
  );
}

function createFileList(file: File): FileList {
  const transfer = new DataTransfer();
  transfer.items.add(file);
  return transfer.files;
}
