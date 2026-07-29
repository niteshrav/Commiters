import { render, screen } from "@testing-library/react";
import WhatsAppFloatingButton from "./WhatsAppFloatingButton";
import { CmsProvider } from "../lib/cms/CmsProvider";
import { WHATSAPP_FLOATING_ACTION_LABEL } from "../lib/whatsappFloatingAction";
import { buildWhatsAppUrl } from "../lib/siteContact";

describe("WhatsAppFloatingButton", () => {
  it("links to wa.me with a new tab and accessible label", () => {
    render(
      <CmsProvider>
        <WhatsAppFloatingButton />
      </CmsProvider>,
    );

    const link = screen.getByRole("link", { name: WHATSAPP_FLOATING_ACTION_LABEL });
    expect(link).toHaveAttribute("href", buildWhatsAppUrl());
    expect(link).toHaveAttribute("target", "_blank");
    expect(link).toHaveAttribute("rel", "noopener noreferrer");
    expect(link).toHaveClass("whatsapp-floating-action");
  });
});
