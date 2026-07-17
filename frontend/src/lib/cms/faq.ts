import {
  FALLBACK_FAQ_ITEMS,
  FAQ_CATEGORIES,
  type FaqCategoryId,
  type FaqItem,
} from "../faqPageContent";
import { hasCmsItems } from "./api";
import { useCms } from "./CmsProvider";

const CATEGORY_IDS = new Set<string>(FAQ_CATEGORIES.map((category) => category.id));

function asString(value: unknown, fallback = ""): string {
  return typeof value === "string" ? value : fallback;
}

function normalizeCategory(value: unknown): FaqCategoryId {
  const raw = asString(value, "process");
  return CATEGORY_IDS.has(raw) ? (raw as FaqCategoryId) : "process";
}

function mapCmsFaq(doc: Record<string, unknown>, index: number): FaqItem {
  return {
    id: asString(doc._id, `faq-${index}`),
    category: normalizeCategory(doc.category),
    question: asString(doc.question, "Untitled question"),
    answer: asString(doc.answer),
    order: typeof doc.order === "number" ? doc.order : index,
  };
}

export function resolveFaqItems(cmsFaqs: Record<string, unknown>[] | null | undefined): FaqItem[] {
  if (!hasCmsItems(cmsFaqs)) return [...FALLBACK_FAQ_ITEMS];
  return cmsFaqs
    .map(mapCmsFaq)
    .filter((item) => item.question.trim())
    .sort((a, b) => a.order - b.order || a.question.localeCompare(b.question));
}

export function groupFaqsByCategory(items: FaqItem[]) {
  return FAQ_CATEGORIES.map((category) => ({
    ...category,
    items: items.filter((item) => item.category === category.id),
  })).filter((group) => group.items.length > 0);
}

export function useFaqPageContent() {
  const { bundle } = useCms();
  const items = resolveFaqItems(bundle?.faqs);
  return {
    items,
    groups: groupFaqsByCategory(items),
    categories: FAQ_CATEGORIES,
  };
}
