import { useEffect } from "react";

export const SITE_ORIGIN = "https://www.commiters.com";

export type PageSeoInput = {
  title: string;
  description: string;
  keywords?: string;
  path: string;
  ogType?: string;
  ogImage?: string;
  robots?: string;
  structuredData?: Record<string, unknown> | Record<string, unknown>[];
};

function upsertMeta(attr: "name" | "property", key: string, content: string) {
  let el = document.querySelector(`meta[${attr}="${key}"]`);
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute("content", content);
}

function upsertLink(rel: string, href: string) {
  let el = document.querySelector<HTMLLinkElement>(`link[rel="${rel}"]`);
  if (!el) {
    el = document.createElement("link");
    el.rel = rel;
    document.head.appendChild(el);
  }
  el.href = href;
}

function removePageStructuredData() {
  document.querySelectorAll('script[data-seo-page="true"]').forEach((node) => node.remove());
}

/** Sets document title, meta description, Open Graph tags, and optional JSON-LD. */
export function usePageSeo(input: PageSeoInput | null): void {
  useEffect(() => {
    if (!input) return undefined;

    const previousTitle = document.title;
    const canonicalUrl = `${SITE_ORIGIN}${input.path}`;
    const ogImage = input.ogImage
      ? input.ogImage.startsWith("http")
        ? input.ogImage
        : `${SITE_ORIGIN}${input.ogImage}`
      : `${SITE_ORIGIN}/assets/commiters-header-logo.png`;

    document.title = input.title;
    upsertMeta("name", "description", input.description);
    upsertMeta("name", "robots", input.robots ?? "index, follow");
    if (input.keywords) {
      upsertMeta("name", "keywords", input.keywords);
    }

    upsertMeta("property", "og:title", input.title);
    upsertMeta("property", "og:description", input.description);
    upsertMeta("property", "og:type", input.ogType ?? "website");
    upsertMeta("property", "og:url", canonicalUrl);
    upsertMeta("property", "og:site_name", "Commiters Softwares");
    upsertMeta("property", "og:image", ogImage);
    upsertMeta("name", "twitter:card", "summary_large_image");
    upsertMeta("name", "twitter:title", input.title);
    upsertMeta("name", "twitter:description", input.description);
    upsertMeta("name", "twitter:image", ogImage);
    upsertLink("canonical", canonicalUrl);

    removePageStructuredData();
    const scripts: HTMLScriptElement[] = [];
    if (input.structuredData) {
      const payloads = Array.isArray(input.structuredData) ? input.structuredData : [input.structuredData];
      for (const payload of payloads) {
        const script = document.createElement("script");
        script.type = "application/ld+json";
        script.text = JSON.stringify(payload);
        script.dataset.seoPage = "true";
        document.head.appendChild(script);
        scripts.push(script);
      }
    }

    return () => {
      document.title = previousTitle;
      scripts.forEach((script) => script.remove());
    };
  }, [input]);
}
