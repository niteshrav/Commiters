import { useEffect } from "react";
import { buildOrganizationSchema } from "../lib/siteSeo";

/** Global Organization JSON-LD (present on every route). */
export default function SiteOrganizationSchema() {
  useEffect(() => {
    const existing = document.querySelector('script[data-seo-org="true"]');
    if (existing) return undefined;

    const script = document.createElement("script");
    script.type = "application/ld+json";
    script.dataset.seoOrg = "true";
    script.text = JSON.stringify(buildOrganizationSchema());
    document.head.appendChild(script);

    return () => {
      script.remove();
    };
  }, []);

  return null;
}
