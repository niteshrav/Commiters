import { render } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { LANDING_PAGE_HASH_SCROLL_DELAY_MS } from "../lib/landingPageHashScroll";
import { useLandingPageHashScroll } from "./useLandingPageHashScroll";

function Probe() {
  useLandingPageHashScroll();
  return (
    <>
      <header>Nav</header>
      <section id="features">
        <h2>Core Capabilities</h2>
      </section>
      <section id="delivery-journey">
        <p className="about-journey-kicker">DELIVERY JOURNEY</p>
        <h2>From Idea to Production</h2>
      </section>
    </>
  );
}

function stubRect(element: Element | null, rect: Partial<DOMRect>) {
  vi.spyOn(element as HTMLElement, "getBoundingClientRect").mockReturnValue({
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    width: 0,
    height: 0,
    x: 0,
    y: 0,
    toJSON: () => ({}),
    ...rect,
  } as DOMRect);
}

describe("useLandingPageHashScroll", () => {
  beforeEach(() => {
    vi.useFakeTimers();
    vi.spyOn(window, "requestAnimationFrame").mockImplementation((callback) => {
      callback(0);
      return 1;
    });
  });

  afterEach(() => {
    vi.useRealTimers();
    vi.restoreAllMocks();
  });

  it("scrolls the inner heading just below the header without leftover section padding", () => {
    const scrollTo = vi.spyOn(window, "scrollTo").mockImplementation(() => {});
    render(
      <MemoryRouter initialEntries={["/opsflow#features"]}>
        <Probe />
      </MemoryRouter>,
    );

    stubRect(document.querySelector("header"), { height: 96 });
    stubRect(document.querySelector("#features h2"), { top: 640, height: 40, bottom: 680, y: 640 });
    Object.defineProperty(window, "pageYOffset", { configurable: true, value: 120 });

    expect(LANDING_PAGE_HASH_SCROLL_DELAY_MS).toBe(100);
    expect(window.requestAnimationFrame).toHaveBeenCalled();
    vi.advanceTimersByTime(LANDING_PAGE_HASH_SCROLL_DELAY_MS);

    expect(scrollTo).toHaveBeenCalledWith({ top: 656, behavior: "smooth" });
  });

  it("scrolls About kickers just below the header", () => {
    const scrollTo = vi.spyOn(window, "scrollTo").mockImplementation(() => {});
    render(
      <MemoryRouter initialEntries={["/about#delivery-journey"]}>
        <Probe />
      </MemoryRouter>,
    );

    stubRect(document.querySelector("header"), { height: 96 });
    stubRect(document.querySelector("#delivery-journey .about-journey-kicker"), {
      top: 640,
      height: 20,
      bottom: 660,
      y: 640,
    });
    Object.defineProperty(window, "pageYOffset", { configurable: true, value: 120 });

    vi.advanceTimersByTime(LANDING_PAGE_HASH_SCROLL_DELAY_MS);

    expect(scrollTo).toHaveBeenCalledWith({ top: 656, behavior: "smooth" });
  });

  it("does not reset scroll in jsdom when the landing page has no hash", () => {
    const scrollTo = vi.spyOn(window, "scrollTo").mockImplementation(() => {});
    render(
      <MemoryRouter initialEntries={["/opsflow"]}>
        <Probe />
      </MemoryRouter>,
    );
    expect(scrollTo).not.toHaveBeenCalled();
  });
});
