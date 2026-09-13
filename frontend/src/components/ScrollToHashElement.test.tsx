import { render, screen, waitFor } from "@testing-library/react";
import { MemoryRouter, Route, Routes, useNavigate } from "react-router-dom";
import { afterEach, describe, expect, it, vi } from "vitest";
import userEvent from "@testing-library/user-event";
import ScrollToHashElement from "./ScrollToHashElement";

function HashChangeButton() {
  const navigate = useNavigate();
  return (
    <button type="button" onClick={() => navigate("/privacy-policy#cookies")}>
      Go to cookies
    </button>
  );
}

describe("ScrollToHashElement", () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("smooth-scrolls to the current hash target", async () => {
    const scrollIntoView = vi.fn();
    const original = HTMLElement.prototype.scrollIntoView;
    HTMLElement.prototype.scrollIntoView = scrollIntoView;

    render(
      <MemoryRouter initialEntries={["/privacy-policy#intro"]}>
        <ScrollToHashElement />
        <Routes>
          <Route path="/privacy-policy" element={<section id="intro">Intro</section>} />
        </Routes>
      </MemoryRouter>,
    );

    await waitFor(() => {
      expect(scrollIntoView).toHaveBeenCalledWith({ behavior: "smooth", block: "start" });
    });

    HTMLElement.prototype.scrollIntoView = original;
  });

  it("smooth-scrolls again when the hash changes", async () => {
    const user = userEvent.setup();
    const scrollIntoView = vi.fn();
    const original = HTMLElement.prototype.scrollIntoView;
    HTMLElement.prototype.scrollIntoView = scrollIntoView;

    render(
      <MemoryRouter initialEntries={["/privacy-policy#intro"]}>
        <ScrollToHashElement />
        <HashChangeButton />
        <Routes>
          <Route
            path="/privacy-policy"
            element={
              <>
                <section id="intro">Intro</section>
                <section id="cookies">Cookies</section>
              </>
            }
          />
        </Routes>
      </MemoryRouter>,
    );

    await waitFor(() => {
      expect(scrollIntoView).toHaveBeenCalled();
    });
    scrollIntoView.mockClear();

    await user.click(screen.getByRole("button", { name: "Go to cookies" }));

    await waitFor(() => {
      expect(scrollIntoView).toHaveBeenCalledWith({ behavior: "smooth", block: "start" });
    });

    HTMLElement.prototype.scrollIntoView = original;
  });

  it("does not steal hashes owned by landing-page offset scrolling", async () => {
    const scrollIntoView = vi.fn();
    const original = HTMLElement.prototype.scrollIntoView;
    HTMLElement.prototype.scrollIntoView = scrollIntoView;

    render(
      <MemoryRouter initialEntries={["/products/trusttap#how-it-works"]}>
        <ScrollToHashElement />
        <Routes>
          <Route path="/products/trusttap" element={<section id="how-it-works">How it works</section>} />
        </Routes>
      </MemoryRouter>,
    );

    await new Promise((resolve) => {
      window.setTimeout(resolve, 120);
    });

    expect(scrollIntoView).not.toHaveBeenCalled();
    HTMLElement.prototype.scrollIntoView = original;
  });
});
