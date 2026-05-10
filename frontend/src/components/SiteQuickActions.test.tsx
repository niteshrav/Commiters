import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import SiteQuickActions from "./SiteQuickActions";
import { COMMITERS_PHONE_E164_DIGITS, buildTelHref } from "../lib/siteContact";
import { ROUTES } from "../lib/routes";

describe("SiteQuickActions", () => {
  it("exposes call, WhatsApp, and quick inquiry with correct primary actions", async () => {
    const user = userEvent.setup();
    render(
      <MemoryRouter initialEntries={["/"]}>
        <Routes>
          <Route
            path="/"
            element={
              <div>
                <SiteQuickActions />
                <h1>Home</h1>
              </div>
            }
          />
        </Routes>
      </MemoryRouter>,
    );

    const call = screen.getByRole("link", { name: /call commiters/i });
    expect(call).toHaveAttribute("href", buildTelHref());

    const wa = screen.getByRole("link", { name: /whatsapp commiters/i });
    expect(wa.getAttribute("href")).toContain(`wa.me/${COMMITERS_PHONE_E164_DIGITS}`);

    await user.click(screen.getByRole("button", { name: /open quick inquiry/i }));
    expect(screen.getByRole("dialog", { name: /quick inquiry/i })).toBeInTheDocument();
  });

  it("submits quick inquiry via same leads API and navigates to thank-you", async () => {
    const user = userEvent.setup();
    const fetchMock = vi.spyOn(globalThis, "fetch").mockResolvedValue(
      new Response(JSON.stringify({ ok: true, id: "lead123" }), {
        status: 201,
        headers: { "Content-Type": "application/json" },
      }),
    );

    render(
      <MemoryRouter initialEntries={["/"]}>
        <Routes>
          <Route
            path="/"
            element={
              <div>
                <SiteQuickActions />
              </div>
            }
          />
          <Route path={ROUTES.thankYou} element={<h1>Thank you</h1>} />
        </Routes>
      </MemoryRouter>,
    );

    await user.click(screen.getByRole("button", { name: /open quick inquiry/i }));

    await user.type(screen.getByLabelText(/^Name$/i), "Jane Doe");
    await user.type(screen.getByLabelText(/^Email$/i), "jane@example.com");
    await user.type(screen.getByLabelText(/what do you need/i), "Need a marketing site.");

    await user.click(screen.getByRole("button", { name: /^send inquiry$/i }));

    expect(fetchMock).toHaveBeenCalled();
    const [, init] = fetchMock.mock.calls[0];
    expect(init?.method).toBe("POST");
    const body = JSON.parse(String(init?.body));
    expect(body.timeline).toBe("Quick inquiry");
    expect(body.message).toContain("Quick inquiry — site widget");
    expect(body.message).toContain("marketing site");
    expect(screen.getByRole("heading", { name: /thank you/i })).toBeInTheDocument();

    fetchMock.mockRestore();
  });
});
