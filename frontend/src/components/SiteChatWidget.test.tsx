import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import SiteChatWidget from "./SiteChatWidget";
import { SITE_CHAT_COPY } from "../lib/siteChatCopy";

describe("SiteChatWidget", () => {
  it("opens the assistant panel and shows the greeting", async () => {
    const user = userEvent.setup();
    render(
      <MemoryRouter>
        <SiteChatWidget />
      </MemoryRouter>,
    );

    expect(screen.queryByText(SITE_CHAT_COPY.panelTitle)).not.toBeInTheDocument();
    await user.click(screen.getByRole("button", { name: SITE_CHAT_COPY.launcherLabel }));
    expect(screen.getByText(SITE_CHAT_COPY.panelTitle)).toBeInTheDocument();
    expect(screen.getByText(SITE_CHAT_COPY.greeting)).toBeInTheDocument();
  });
});
