import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { afterEach, describe, expect, it, vi } from "vitest";
import Layout from "./Layout";
import AiOperationalAuditPage from "../pages/AiOperationalAuditPage";
import ServicesPage from "../pages/ServicesPage";
import TrustTapPage from "../pages/TrustTapPage";
import { AI_OPERATIONAL_AUDIT_FORM } from "../lib/aiOperationalAuditPageContent";
import {
  AI_OPERATIONAL_AUDIT_BOOKING_ANCHOR,
  AI_OPERATIONAL_AUDIT_BOOKING_HREF,
  ROUTES,
} from "../lib/routes";
import { HEADER_MENU_BTN_TESTID, MOBILE_NAV_BODY_LOCK_CLASS } from "../lib/mobileNavDrawer";
import { BACK_TO_TOP_TEST_ID } from "../lib/backToTop";
import { WHATSAPP_FLOATING_ACTION_TEST_ID } from "../lib/whatsappFloatingAction";
import { SITE_CHAT_TEST_ID } from "../lib/siteChatCopy";

describe("Layout", () => {
  afterEach(() => {
    document.body.classList.remove(MOBILE_NAV_BODY_LOCK_CLASS);
    document.body.style.overflow = "unset";
  });

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
    const scrollTo = vi.spyOn(window, "scrollTo").mockImplementation(() => {});
    const scrollIntoView = vi.fn();
    const original = HTMLElement.prototype.scrollIntoView;
    HTMLElement.prototype.scrollIntoView = scrollIntoView;

    render(
      <MemoryRouter initialEntries={[`${ROUTES.services}#ai-operational-audits`]}>
        <Layout>
          <Routes>
            <Route path={ROUTES.services} element={<ServicesPage />} />
          </Routes>
        </Layout>
      </MemoryRouter>,
    );

    await waitFor(() => {
      expect(scrollTo).toHaveBeenCalledWith(expect.objectContaining({ behavior: "smooth" }));
    });

    const anchor = document.getElementById("ai-operational-audits");
    expect(anchor).toHaveAttribute("data-testid", "services-offering-card");
    expect(scrollIntoView).not.toHaveBeenCalled();

    HTMLElement.prototype.scrollIntoView = original;
    scrollTo.mockRestore();
  });

  it("scrolls to Book your diagnostic when opening the audit booking hash", async () => {
    const scrollIntoView = vi.fn();
    const original = HTMLElement.prototype.scrollIntoView;
    HTMLElement.prototype.scrollIntoView = scrollIntoView;

    render(
      <MemoryRouter initialEntries={[AI_OPERATIONAL_AUDIT_BOOKING_HREF]}>
        <Layout>
          <Routes>
            <Route path={ROUTES.aiOperationalAudit} element={<AiOperationalAuditPage />} />
          </Routes>
        </Layout>
      </MemoryRouter>,
    );

    await waitFor(() => {
      expect(scrollIntoView).toHaveBeenCalled();
    });

    const booking = document.getElementById(AI_OPERATIONAL_AUDIT_BOOKING_ANCHOR);
    expect(booking).toBeTruthy();
    expect(screen.getByRole("heading", { name: AI_OPERATIONAL_AUDIT_FORM.title, level: 2 })).toBeInTheDocument();
    expect(scrollIntoView).toHaveBeenCalledWith({ behavior: "smooth", block: "start" });

    HTMLElement.prototype.scrollIntoView = original;
  });

  it("smooth-scrolls to trustTap section hashes below the sticky header", async () => {
    const scrollTo = vi.spyOn(window, "scrollTo").mockImplementation(() => {});
    const scrollIntoView = vi.fn();
    const original = HTMLElement.prototype.scrollIntoView;
    HTMLElement.prototype.scrollIntoView = scrollIntoView;

    render(
      <MemoryRouter initialEntries={[`${ROUTES.trustTap}#how-it-works`]}>
        <Layout>
          <Routes>
            <Route path={ROUTES.trustTap} element={<TrustTapPage />} />
          </Routes>
        </Layout>
      </MemoryRouter>,
    );

    await waitFor(() => {
      expect(scrollTo).toHaveBeenCalledWith(expect.objectContaining({ behavior: "smooth" }));
    });

    const headingAnchor = document.getElementById("how-it-works");
    expect(headingAnchor).toBe(screen.getByTestId("trusttap-how-it-works"));
    expect(headingAnchor?.className).not.toMatch(/scroll-mt-/);
    expect(scrollIntoView).not.toHaveBeenCalled();

    HTMLElement.prototype.scrollIntoView = original;
    scrollTo.mockRestore();
  });

  it("reveals scroll-animated sections with fallback when observer is unavailable", async () => {
    const OriginalObserver = window.IntersectionObserver;
    Reflect.deleteProperty(window, "IntersectionObserver");

    try {
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
    } finally {
      window.IntersectionObserver = OriginalObserver;
    }
  });

  it("applies the drawer body lock so floating widgets sit behind the open menu", async () => {
    const user = userEvent.setup();
    render(
      <MemoryRouter>
        <Layout>
          <section>Page Content</section>
        </Layout>
      </MemoryRouter>,
    );

    expect(screen.getByTestId(BACK_TO_TOP_TEST_ID)).toBeInTheDocument();
    expect(screen.getByTestId(WHATSAPP_FLOATING_ACTION_TEST_ID)).toBeInTheDocument();
    expect(screen.getByTestId(SITE_CHAT_TEST_ID)).toBeInTheDocument();
    expect(screen.getByTestId("accessibility-widget")).toBeInTheDocument();

    await user.click(screen.getByTestId(HEADER_MENU_BTN_TESTID));
    expect(document.body).toHaveClass(MOBILE_NAV_BODY_LOCK_CLASS);
  });
});
