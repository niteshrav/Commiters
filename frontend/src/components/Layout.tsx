import React, { PropsWithChildren, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";
import SiteQuickActions from "./SiteQuickActions";

export default function Layout({ children }: PropsWithChildren) {
  const location = useLocation();

  useEffect(() => {
    if (navigator.userAgent.toLowerCase().includes("jsdom")) {
      return;
    }

    try {
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch {
      window.scrollTo(0, 0);
    }
  }, [location.pathname]);

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
    <div className="site-shell" data-theme="monochrome-navy">
      <Navbar />
      <main className="container">
        <div key={location.pathname} className="route-shell route-transition" data-testid="route-shell">
          {children}
        </div>
      </main>
      <Footer />
      <SiteQuickActions />
    </div>
  );
}

