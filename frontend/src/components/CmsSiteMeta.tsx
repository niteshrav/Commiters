import { useEffect } from "react";
import { useWebsiteSettings } from "../lib/cms/hooks";

/** Applies CMS favicon when available. Titles and descriptions come from page SEO, not CMS defaults. */
export default function CmsSiteMeta() {
  const settings = useWebsiteSettings();

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
