import { describe, expect, it } from "vitest";
import { getAdminPanelUrl, getApiBaseUrl, isBackendEnabled } from "./siteRuntime";

describe("siteRuntime", () => {
  it("does not assume localhost API unless VITE_API_BASE_URL is set", () => {
    const raw = import.meta.env.VITE_API_BASE_URL?.trim();
    if (raw) {
      expect(getApiBaseUrl()).toBe(raw.replace(/\/$/, ""));
      expect(isBackendEnabled()).toBe(true);
    } else {
      expect(getApiBaseUrl()).toBeNull();
      expect(isBackendEnabled()).toBe(false);
    }
  });

  it("does not assume localhost admin unless VITE_ADMIN_URL is set", () => {
    const raw = import.meta.env.VITE_ADMIN_URL?.trim();
    if (raw) {
      expect(getAdminPanelUrl()).toBe(raw.replace(/\/$/, ""));
    } else {
      expect(getAdminPanelUrl()).toBeNull();
    }
  });
});
