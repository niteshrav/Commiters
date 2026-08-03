import { getAdminPanelUrl } from "./siteRuntime";

/** Staff admin URL when configured; in static production deploys this is null. */
export function resolveAdminPanelUrl(): string | null {
  return getAdminPanelUrl();
}

/** Dev default for tests; production static sites omit the staff link instead. */
export const ADMIN_PANEL_URL = getAdminPanelUrl() ?? "http://localhost:5174";
