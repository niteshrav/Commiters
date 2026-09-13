import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { usesLandingPageHashScroll } from "../lib/landingPageHashScroll";

export const SCROLL_TO_HASH_DELAY_MS = 80 as const;

export default function ScrollToHashElement() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (!hash || usesLandingPageHashScroll(pathname)) {
      return undefined;
    }

    const runScroll = () => {
      const element = document.querySelector(hash);
      if (element) {
        element.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    };

    const timer = window.setTimeout(runScroll, SCROLL_TO_HASH_DELAY_MS);
    return () => window.clearTimeout(timer);
  }, [pathname, hash]);

  return null;
}
