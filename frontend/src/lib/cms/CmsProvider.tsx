import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { fetchCmsBundle } from "./api";
import type { CmsContextValue } from "./types";

const CmsContext = createContext<CmsContextValue>({
  bundle: null,
  loading: true,
  error: null,
  refresh: async () => {},
});

export function CmsProvider({ children }: { children: React.ReactNode }) {
  const [bundle, setBundle] = useState<CmsContextValue["bundle"]>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const refresh = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchCmsBundle();
      setBundle(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load CMS content.");
      setBundle(null);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void refresh();
  }, [refresh]);

  const value = useMemo(() => ({ bundle, loading, error, refresh }), [bundle, loading, error, refresh]);

  return <CmsContext.Provider value={value}>{children}</CmsContext.Provider>;
}

export function useCms() {
  return useContext(CmsContext);
}
