import type { EntityConfig } from "./entityConfigs";
import { resolveMediaUrl } from "./api";

type Row = Record<string, unknown>;

export function getRowLabel(row: Row, config: EntityConfig): string {
  const key = config.studio?.primaryKey ?? config.columns[0];
  const value = row[key];
  return value ? String(value) : "Untitled";
}

export function getRowCategory(row: Row, config: EntityConfig): string | null {
  const key = config.studio?.categoryKey;
  if (!key) return null;
  const value = row[key];
  return value ? String(value) : null;
}

export function getRowThumbnail(row: Row, config: EntityConfig): string | null {
  const studio = config.studio;
  if (!studio) return null;

  if (studio.imageFromArray) {
    const images = row[studio.imageFromArray];
    if (Array.isArray(images) && images[0]) return String(images[0]);
  }

  if (studio.imageKey) {
    const value = row[studio.imageKey];
    if (typeof value === "string" && value) return value;
  }

  return null;
}

export function getThumbnailSrc(row: Row, config: EntityConfig): string | null {
  const url = getRowThumbnail(row, config);
  return url ? resolveMediaUrl(url) : null;
}

export function getRowStatus(row: Row, config: EntityConfig): { label: string; published: boolean } {
  const studio = config.studio;
  if (!studio?.statusKey) {
    return { label: "Active", published: true };
  }

  const value = row[studio.statusKey];
  const publishedValues = studio.statusPublishedValues ?? [true, "open", "published"];
  const published = publishedValues.some((candidate) => candidate === value);

  if (typeof value === "string" && (studio.statusKey === "status" || studio.statusKey === "status")) {
    return {
      label: value === "open" ? "Open" : value === "closed" ? "Closed" : String(value),
      published: value === "open",
    };
  }

  if (studio.statusKey === "isPublished") {
    return {
      label: published ? (studio.statusPublishedLabel ?? "Published") : (studio.statusDraftLabel ?? "Draft"),
      published,
    };
  }

  if (studio.statusKey === "isRead") {
    return {
      label: published ? "Read" : "Unread",
      published,
    };
  }

  return {
    label: published ? (studio.statusPublishedLabel ?? "Published") : (studio.statusDraftLabel ?? "Draft"),
    published,
  };
}

export function formatRowDate(row: Row, config: EntityConfig): string {
  const key = config.studio?.dateKey ?? "updatedAt";
  const raw = row[key] ?? row.createdAt;
  if (!raw) return "—";
  const date = new Date(String(raw));
  if (Number.isNaN(date.getTime())) return "—";
  return date.toLocaleDateString(undefined, { month: "short", day: "numeric", year: "numeric" });
}

export function getInitials(label: string): string {
  return label
    .split(/\s+/)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? "")
    .join("");
}
