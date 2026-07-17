// Uses Vite proxy in dev (relative URLs). Set VITE_API_BASE_URL in production.
const baseUrl = (import.meta.env.VITE_API_BASE_URL as string | undefined) ?? "";

function getToken() {
  return localStorage.getItem("commiters-admin-token");
}

export async function api<T>(path: string, options: RequestInit = {}): Promise<T> {
  const headers = new Headers(options.headers);
  if (!headers.has("Content-Type") && options.body && !(options.body instanceof FormData)) {
    headers.set("Content-Type", "application/json");
  }
  const token = getToken();
  if (token) headers.set("Authorization", `Bearer ${token}`);

  let res: Response;
  try {
    res = await fetch(`${baseUrl}${path}`, { ...options, headers });
  } catch {
    throw new Error("Cannot reach backend API. Ensure backend is running on port 4000.");
  }

  const payload = await res.json().catch(() => null);
  if (!res.ok) {
    throw new Error(payload?.error ?? `Request failed (${res.status})`);
  }
  return payload as T;
}

export function setToken(token: string) {
  localStorage.setItem("commiters-admin-token", token);
}

export function clearToken() {
  localStorage.removeItem("commiters-admin-token");
}

export function isLoggedIn() {
  return Boolean(getToken());
}

export type Paginated<T> = {
  items: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
};

export type MediaUploadResult = {
  url: string;
  _id: string;
  originalName: string;
};

export function resolveMediaUrl(url: string): string {
  if (!url) return "";
  if (url.startsWith("http://") || url.startsWith("https://")) return url;
  const base = baseUrl.replace(/\/$/, "");
  return `${base}${url.startsWith("/") ? url : `/${url}`}`;
}

export async function uploadMediaFile(file: File): Promise<string> {
  const form = new FormData();
  form.append("file", file);

  const headers = new Headers();
  const token = getToken();
  if (token) headers.set("Authorization", `Bearer ${token}`);

  let res: Response;
  try {
    res = await fetch(`${baseUrl}/api/admin/media/upload`, { method: "POST", headers, body: form });
  } catch {
    throw new Error("Cannot reach backend API. Ensure backend is running on port 4000.");
  }

  const payload = (await res.json().catch(() => null)) as MediaUploadResult | { error?: string } | null;
  if (!res.ok) {
    throw new Error(payload && "error" in payload && payload.error ? payload.error : "Upload failed.");
  }
  if (!payload || !("url" in payload) || !payload.url) {
    throw new Error("Upload failed — no URL returned.");
  }
  return payload.url;
}

export async function checkBackendHealth(): Promise<boolean> {
  try {
    const res = await fetch(`${baseUrl}/api/health`);
    return res.ok;
  } catch {
    return false;
  }
}

export async function checkCmsReady(): Promise<{ ok: boolean; message?: string }> {
  try {
    const res = await fetch(`${baseUrl}/api/admin/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: "_probe@test.com", password: "probe" }),
    });
    const payload = await res.json().catch(() => null);
    if (res.status === 503) {
      return { ok: false, message: payload?.error ?? "MongoDB is not connected. Start MongoDB and run npm run cms:seed in backend." };
    }
    return { ok: true };
  } catch {
    return { ok: false, message: "Backend API unreachable on port 4000." };
  }
}

export type PublishTechnicalLedgerArticleInput = {
  title: string;
  summary: string;
  contentMarkdown: string;
  category?: string;
  tags?: string[];
  publishToMedium?: boolean;
};

export async function publishTechnicalLedgerArticle(input: PublishTechnicalLedgerArticleInput) {
  return api<{ article: { id: string; syncStatus?: string; mediumUrl?: string; syncError?: string } }>(
    "/api/admin/technical-ledger/articles",
    {
      method: "POST",
      body: JSON.stringify(input),
    },
  );
}
