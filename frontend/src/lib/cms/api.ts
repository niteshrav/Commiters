import { getApiBaseUrl } from "../siteRuntime";
import type { CmsBundle } from "./types";

export async function fetchCmsBundle(): Promise<CmsBundle | null> {
  const apiBase = getApiBaseUrl();
  if (!apiBase) return null;

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
