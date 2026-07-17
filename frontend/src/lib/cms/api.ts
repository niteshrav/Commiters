import type { CmsBundle } from "./types";

const baseUrl = import.meta.env.VITE_API_BASE_URL as string | undefined;
const apiBase = baseUrl ?? "http://localhost:4000";

export async function fetchCmsBundle(): Promise<CmsBundle | null> {
  try {
    const res = await fetch(`${apiBase}/api/cms/bundle`);
    if (!res.ok) return null;
    return (await res.json()) as CmsBundle;
  } catch {
    return null;
  }
}

export function hasCmsItems(items: unknown[] | null | undefined): items is Record<string, unknown>[] {
  return Array.isArray(items) && items.length > 0;
}

export function hasCmsDoc<T extends Record<string, unknown>>(doc: T | null | undefined): doc is T {
  return Boolean(doc && Object.keys(doc).length > 0);
}
