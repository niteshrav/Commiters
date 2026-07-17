import { createContext, useCallback, useContext, useEffect, useMemo, useState, type PropsWithChildren } from "react";
import { api } from "./api";

export type AdminUserProfile = {
  id: string;
  name: string;
  email: string;
  phone: string;
  avatar: string;
  role: string;
};

export type PageSearchConfig = {
  placeholder: string;
  value: string;
  onChange: (value: string) => void;
};

type AdminPageContextValue = {
  pageSearch: PageSearchConfig | null;
  setPageSearch: (config: PageSearchConfig | null) => void;
  user: AdminUserProfile | null;
  refreshUser: () => Promise<void>;
};

const AdminPageContext = createContext<AdminPageContextValue | null>(null);

export function AdminPageProvider({ children }: PropsWithChildren) {
  const [pageSearch, setPageSearch] = useState<PageSearchConfig | null>(null);
  const [user, setUser] = useState<AdminUserProfile | null>(null);

  const refreshUser = useCallback(async () => {
    try {
      const res = await api<{ user: AdminUserProfile }>("/api/admin/auth/me");
      setUser(res.user);
    } catch {
      setUser(null);
    }
  }, []);

  useEffect(() => {
    void refreshUser();
  }, [refreshUser]);

  const value = useMemo(
    () => ({ pageSearch, setPageSearch, user, refreshUser }),
    [pageSearch, user, refreshUser],
  );

  return <AdminPageContext.Provider value={value}>{children}</AdminPageContext.Provider>;
}

export function useAdminPage() {
  const ctx = useContext(AdminPageContext);
  if (!ctx) throw new Error("useAdminPage must be used within AdminPageProvider");
  return ctx;
}

export function useRegisterPageSearch(config: PageSearchConfig | null) {
  const { setPageSearch } = useAdminPage();

  useEffect(() => {
    setPageSearch(config);
    return () => setPageSearch(null);
  }, [config, setPageSearch]);
}

export function adminDisplayName(user: AdminUserProfile | null): string {
  return user?.name?.trim() || "Studio Admin";
}

export function adminInitials(name: string): string {
  return name
    .split(/\s+/)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? "")
    .join("");
}
