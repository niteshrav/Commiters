import { TRACKING_QUERY_PARAMS } from "./limits";

export function hasUrlCredentials(url: URL): boolean {
  return Boolean(url.username || url.password);
}

export function isHttpProtocol(url: URL): boolean {
  return url.protocol === "https:" || url.protocol === "http:";
}

export function stripDefaultPort(url: URL): void {
  if ((url.protocol === "https:" && url.port === "443") || (url.protocol === "http:" && url.port === "80")) {
    url.port = "";
  }
}

export function stripTrackingParams(url: URL): void {
  const keys = [...url.searchParams.keys()];
  for (const key of keys) {
    if (TRACKING_QUERY_PARAMS.has(key.toLowerCase())) {
      url.searchParams.delete(key);
    }
  }
  url.searchParams.sort();
}

export function normalizePathname(pathname: string): string {
  if (pathname.length > 1 && pathname.endsWith("/")) {
    return pathname.slice(0, -1);
  }
  return pathname || "/";
}

export function normalizeUrl(raw: string, base?: string): string | null {
  let parsed: URL;
  try {
    parsed = base ? new URL(raw, base) : new URL(raw);
  } catch {
    return null;
  }

  if (!isHttpProtocol(parsed) || hasUrlCredentials(parsed)) {
    return null;
  }

  parsed.hash = "";
  parsed.hostname = parsed.hostname.toLowerCase();
  stripDefaultPort(parsed);
  stripTrackingParams(parsed);
  parsed.pathname = normalizePathname(parsed.pathname);

  return parsed.toString();
}

export function hostnameOf(url: string): string | null {
  try {
    return new URL(url).hostname.toLowerCase();
  } catch {
    return null;
  }
}

export function originOf(url: string): string | null {
  try {
    const parsed = new URL(url);
    stripDefaultPort(parsed);
    return parsed.origin;
  } catch {
    return null;
  }
}

export function isSameHostname(left: string, right: string): boolean {
  const a = hostnameOf(left);
  const b = hostnameOf(right);
  return Boolean(a && b && a === b);
}

export function classifyLink(href: string, pageUrl: string, startUrl: string): {
  kind: "internal" | "external" | "ignored";
  url?: string;
} {
  const normalized = normalizeUrl(href, pageUrl);
  if (!normalized) return { kind: "ignored" };
  if (isSameHostname(normalized, startUrl)) {
    return { kind: "internal", url: normalized };
  }
  return { kind: "external", url: normalized };
}
