import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import {
  LANDING_PAGE_HASH_SCROLL_DELAY_MS,
  scrollLandingPageAnchorIntoView,
  scrollWindowTo,
} from "../lib/landingPageHashScroll";

export function useLandingPageHashScroll() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (!hash) {
      if (navigator.userAgent.toLowerCase().includes("jsdom")) {
        return undefined;
      }
      scrollWindowTo(0);
      return undefined;
    }

    const targetId = hash.replace("#", "");
    const element = document.getElementById(targetId);
    if (!element) {
      return undefined;
    }

    let timer: number | undefined;
    const frame = window.requestAnimationFrame(() => {
      timer = window.setTimeout(() => {
        scrollLandingPageAnchorIntoView(element);
      }, LANDING_PAGE_HASH_SCROLL_DELAY_MS);
    });

    return () => {
      window.cancelAnimationFrame(frame);
      if (timer !== undefined) {
        window.clearTimeout(timer);
      }
    };
  }, [pathname, hash]);
}
