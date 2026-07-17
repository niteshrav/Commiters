import type { FieldConfig } from "../lib/entityConfigs";
import { ImageUploadField, ImagesUploadField } from "./ImageUploadField";

type Props = {
  field: FieldConfig;
  value: unknown;
  onChange: (value: unknown) => void;
  variant?: "default" | "studio";
};

function fieldClass(variant: Props["variant"]) {
  return variant === "studio" ? "studio-field" : undefined;
}

export default function FieldRenderer({ field, value, onChange, variant = "default" }: Props) {
  const type = field.type ?? "text";
  const studioClass = fieldClass(variant);

  if (type === "checkbox") {
    return (
      <label className={`checkbox-field ${studioClass ?? ""}`.trim()}>
        <input type="checkbox" checked={Boolean(value)} onChange={(e) => onChange(e.target.checked)} />
        {field.label}
      </label>
    );
  }

  if (type === "select" && field.options) {
    return (
      <label className={studioClass}>
        {field.label}
        <select value={String(value ?? "")} onChange={(e) => onChange(e.target.value)}>
          {field.options.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      </label>
    );
  }

  if (type === "textarea") {
    return (
      <label className={studioClass}>
        {field.label}
        <textarea
          rows={field.rows ?? 4}
          placeholder={field.placeholder}
          value={String(value ?? "")}
          onChange={(e) => onChange(e.target.value)}
        />
      </label>
    );
  }

  if (type === "image") {
    return (
      <ImageUploadField
        label={field.label}
        value={value}
        onChange={(v) => onChange(v)}
        variant={variant === "studio" ? "dropzone" : "default"}
      />
    );
  }

  if (type === "images") {
    return (
      <ImagesUploadField
        label={field.label}
        value={value}
        onChange={(v) => onChange(v)}
        variant={variant === "studio" ? "dropzone" : "default"}
      />
    );
  }

  if (type === "tags") {
    const display = Array.isArray(value) ? value.join(", ") : String(value ?? "");
    return (
      <label className={studioClass}>
        {field.label}
        <input
          placeholder={field.placeholder ?? "Comma-separated values"}
          value={display}
          onChange={(e) =>
            onChange(
              e.target.value
                .split(",")
                .map((s) => s.trim())
                .filter(Boolean),
            )
          }
        />
      </label>
    );
  }

  if (type === "number") {
    return (
      <label className={studioClass}>
        {field.label}
        <input
          type="number"
          value={value === undefined || value === null ? "" : Number(value)}
          onChange={(e) => onChange(Number(e.target.value))}
        />
      </label>
    );
  }

  return (
    <label className={studioClass}>
      {field.label}
      <input
        placeholder={field.placeholder}
        value={String(value ?? "")}
        onChange={(e) => onChange(e.target.value)}
      />
    </label>
  );
}

function serializeJobRequirements(value: unknown): string {
  if (Array.isArray(value)) return value.join("\n");
  return String(value ?? "");
}

export function JobRequirementsField({ value, onChange }: { value: unknown; onChange: (v: string[]) => void }) {
  return (
    <label>
      Requirements (one per line)
      <textarea
        rows={4}
        value={serializeJobRequirements(value)}
        onChange={(e) =>
          onChange(
            e.target.value
              .split("\n")
              .map((s) => s.trim())
              .filter(Boolean),
          )
        }
      />
    </label>
  );
}
