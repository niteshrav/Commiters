import { useEffect } from "react";
import { useWebsiteSettings } from "../lib/cms/hooks";

/** Applies CMS website settings (favicon, meta description) when available. */
export default function CmsSiteMeta() {
  const settings = useWebsiteSettings();

  useEffect(() => {
    if (settings.metaDescription) {
      let meta = document.querySelector('meta[name="description"]');
      if (!meta) {
        meta = document.createElement("meta");
        meta.setAttribute("name", "description");
        document.head.appendChild(meta);
      }
      meta.setAttribute("content", settings.metaDescription);
    }
  }, [settings.metaDescription]);

  useEffect(() => {
    if (!settings.favicon) return;
    let link = document.querySelector<HTMLLinkElement>('link[rel="icon"]');
    if (!link) {
      link = document.createElement("link");
      link.rel = "icon";
      document.head.appendChild(link);
    }
    link.href = settings.favicon;
  }, [settings.favicon]);

  return null;
}
