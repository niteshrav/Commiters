import { render, screen, waitFor } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { describe, expect, it, vi } from "vitest";
import Layout from "./Layout";
import ServicesPage from "../pages/ServicesPage";
import { ROUTES } from "../lib/routes";

describe("Layout", () => {
  it("wraps pages in a fluid route transition shell", () => {
    render(
      <MemoryRouter initialEntries={["/services"]}>
        <Layout>
          <section>Page Content</section>
        </Layout>
      </MemoryRouter>,
    );

    expect(screen.getByTestId("route-shell")).toHaveClass("route-shell", "route-transition");
    expect(screen.getByTestId("route-shell")).toHaveAttribute("data-route", "/services");
    expect(screen.getByRole("main")).toHaveClass("container");
    expect(document.querySelector(".site-shell")).toHaveAttribute("data-theme", "commiters-brand");
    expect(document.querySelector('[data-testid="circuit-backdrop"]')).toBeInTheDocument();
    expect(screen.queryByTestId("site-quick-actions")).not.toBeInTheDocument();
    expect(screen.queryByRole("dialog", { name: /quick inquiry/i })).not.toBeInTheDocument();
  });

  it("scrolls to the service card anchor when navigating with a section hash", async () => {
    const scrollIntoView = vi.fn();
    const original = HTMLElement.prototype.scrollIntoView;
    HTMLElement.prototype.scrollIntoView = scrollIntoView;

    render(
      <MemoryRouter initialEntries={[`${ROUTES.services}#website-development`]}>
        <Layout>
          <Routes>
            <Route path={ROUTES.services} element={<ServicesPage />} />
          </Routes>
        </Layout>
      </MemoryRouter>,
    );

    await waitFor(() => {
      expect(scrollIntoView).toHaveBeenCalled();
    });

    const anchor = document.getElementById("website-development");
    expect(anchor).toHaveAttribute("data-testid", "stitch-service-card");
    expect(scrollIntoView).toHaveBeenCalledWith({ behavior: "smooth", block: "start" });

    HTMLElement.prototype.scrollIntoView = original;
  });

  it("reveals scroll-animated sections with fallback when observer is unavailable", async () => {
    render(
      <MemoryRouter initialEntries={["/"]}>
        <Layout>
          <section data-testid="demo-reveal" className="reveal-on-scroll">
            Demo Content
          </section>
        </Layout>
      </MemoryRouter>,
    );

    await waitFor(() => {
      expect(screen.getByTestId("demo-reveal")).toHaveClass("reveal-on-scroll", "is-visible");
    });
  });
});
