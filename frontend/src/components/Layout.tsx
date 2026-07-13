import React, { PropsWithChildren, useEffect } from "react";
import { useLocation } from "react-router-dom";
import CircuitBackdrop from "./CircuitBackdrop";
import CookieConsentBanner from "./CookieConsentBanner";
import CookiePreferencesPanel from "./CookiePreferencesPanel";
import { CookieConsentProvider } from "./CookieConsentProvider";
import AccessibilityWidget from "./AccessibilityWidget";
import { AccessibilityProvider } from "./AccessibilityProvider";
import SkipToMainLink from "./SkipToMainLink";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { ACCESSIBILITY_MAIN_CONTENT_ID } from "../lib/accessibilityContent";

export default function Layout({ children }: PropsWithChildren) {
  const location = useLocation();

  useEffect(() => {
    const hash = location.hash.replace(/^#/, "");

    const runScroll = () => {
      if (hash) {
        document.getElementById(hash)?.scrollIntoView({ behavior: "smooth", block: "start" });
        return;
      }
      if (navigator.userAgent.toLowerCase().includes("jsdom")) {
        return;
      }
      try {
        window.scrollTo({ top: 0, behavior: "smooth" });
      } catch {
        window.scrollTo(0, 0);
      }
    };

    if (hash) {
      const id = window.setTimeout(runScroll, 80);
      return () => clearTimeout(id);
    }
    runScroll();
    return undefined;
  }, [location.pathname, location.hash]);

  useEffect(() => {
    const revealElements = Array.from(document.querySelectorAll<HTMLElement>(".reveal-on-scroll"));
    if (!revealElements.length) {
      return;
    }

    if (typeof window.IntersectionObserver === "undefined") {
      revealElements.forEach((element) => element.classList.add("is-visible"));
      return;
    }

    const observer = new window.IntersectionObserver(
      (entries, io) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("is-visible");
          io.unobserve(entry.target);
        });
      },
      { threshold: 0.16, rootMargin: "0px 0px -8% 0px" },
    );

    revealElements.forEach((element) => observer.observe(element));

    return () => observer.disconnect();
  }, [location.pathname]);

  return (
    <CookieConsentProvider>
      <AccessibilityProvider>
        <div className="site-shell" data-theme="commiters-brand">
          <SkipToMainLink />
          <CircuitBackdrop />
          <Navbar />
          <main id={ACCESSIBILITY_MAIN_CONTENT_ID} className="container" tabIndex={-1}>
            <div
              key={location.pathname}
              className="route-shell route-transition"
              data-testid="route-shell"
              data-route={location.pathname}
            >
              {children}
            </div>
          </main>
          <Footer />
          <AccessibilityWidget />
          <CookieConsentBanner />
          <CookiePreferencesPanel />
        </div>
      </AccessibilityProvider>
    </CookieConsentProvider>
  );
}

