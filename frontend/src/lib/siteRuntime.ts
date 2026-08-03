/**
 * Production builds without VITE_API_BASE_URL run as a static marketing site (no backend).
 * Set VITE_ENABLE_BACKEND=false to disable API calls in local dev too.
 */
function envFlagFalse(value: string | undefined): boolean {
  return value?.trim().toLowerCase() === "false";
}

export function getApiBaseUrl(): string | null {
  if (envFlagFalse(import.meta.env.VITE_ENABLE_BACKEND)) return null;

  const raw = import.meta.env.VITE_API_BASE_URL?.trim();
  if (raw) return raw.replace(/\/$/, "");

  return null;
}

export function isBackendEnabled(): boolean {
  return getApiBaseUrl() !== null;
}

export function getAdminPanelUrl(): string | null {
  const raw = import.meta.env.VITE_ADMIN_URL?.trim();
  if (raw) return raw.replace(/\/$/, "");
  return null;
}
