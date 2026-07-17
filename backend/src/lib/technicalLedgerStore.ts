import { mkdir, readFile, writeFile } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import type { LocalTechnicalLedgerArticle } from "./technicalLedgerTypes";

type StoreShape = {
  articles: LocalTechnicalLedgerArticle[];
};

const DEFAULT_STORE_PATH = resolve(process.cwd(), "data/technical-ledger-articles.json");

function getStorePath(): string {
  return process.env.TECHNICAL_LEDGER_STORE_PATH?.trim() || DEFAULT_STORE_PATH;
}

async function ensureStoreFile(): Promise<StoreShape> {
  const storePath = getStorePath();
  await mkdir(dirname(storePath), { recursive: true });

  try {
    const raw = await readFile(storePath, "utf8");
    const parsed = JSON.parse(raw) as StoreShape;
    if (!Array.isArray(parsed.articles)) {
      return { articles: [] };
    }
    return parsed;
  } catch {
    const empty: StoreShape = { articles: [] };
    await writeFile(storePath, `${JSON.stringify(empty, null, 2)}\n`, "utf8");
    return empty;
  }
}

async function writeStore(store: StoreShape): Promise<void> {
  const storePath = getStorePath();
  await mkdir(dirname(storePath), { recursive: true });
  await writeFile(storePath, `${JSON.stringify(store, null, 2)}\n`, "utf8");
}

export async function listLocalTechnicalLedgerArticles(): Promise<LocalTechnicalLedgerArticle[]> {
  const store = await ensureStoreFile();
  return store.articles.sort((a, b) => Date.parse(b.publishedAt) - Date.parse(a.publishedAt));
}

export async function saveLocalTechnicalLedgerArticle(
  article: LocalTechnicalLedgerArticle,
): Promise<LocalTechnicalLedgerArticle> {
  const store = await ensureStoreFile();
  const existingIndex = store.articles.findIndex((entry) => entry.id === article.id);
  if (existingIndex >= 0) {
    store.articles[existingIndex] = article;
  } else {
    store.articles.unshift(article);
  }
  await writeStore(store);
  return article;
}

export function resetTechnicalLedgerStoreForTests(): void {
  delete process.env.TECHNICAL_LEDGER_STORE_PATH;
}
