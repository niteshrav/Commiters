import { useCallback, useEffect, useState } from "react";
import { fetchTechnicalLedgerArticles } from "./api";
import { mapTechnicalLedgerArticle } from "./technicalLedgerArticles";
import { TECHNICAL_LEDGER_ARTICLES, type TechnicalLedgerArticle } from "./technicalLedgerPageContent";

type State = {
  articles: TechnicalLedgerArticle[];
  loading: boolean;
  error: string | null;
};

export function useTechnicalLedgerArticles(refreshKey = 0) {
  const [state, setState] = useState<State>({
    articles: [],
    loading: true,
    error: null,
  });

  const load = useCallback(async () => {
    setState((current) => ({ ...current, loading: true, error: null }));
    try {
      const records = await fetchTechnicalLedgerArticles();
      setState({
        articles: records.map(mapTechnicalLedgerArticle),
        loading: false,
        error: null,
      });
    } catch (error) {
      setState({
        articles: TECHNICAL_LEDGER_ARTICLES,
        loading: false,
        error: error instanceof Error ? error.message : "Failed to load articles.",
      });
    }
  }, []);

  useEffect(() => {
    void load();
  }, [load, refreshKey]);

  return {
    ...state,
    reload: load,
  };
}
