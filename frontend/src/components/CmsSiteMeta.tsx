import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { ROUTES } from "../lib/routes";
import { useWebsiteSettings } from "../lib/cms/hooks";

/** Applies CMS website settings (favicon) when available. Home meta description comes from page SEO. */
export default function CmsSiteMeta() {
  const settings = useWebsiteSettings();
  const location = useLocation();

  useEffect(() => {
    if (location.pathname !== ROUTES.home) return;
    if (!settings.metaDescription) return;
    const meta = document.querySelector('meta[name="description"]');
    if (!meta) return;
    meta.setAttribute("content", settings.metaDescription);
  }, [location.pathname, settings.metaDescription]);

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
