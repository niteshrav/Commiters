import { render, screen } from "@testing-library/react";
import ContactStudioPanel from "./ContactStudioPanel";
import { CONTACT_STUDIO } from "../lib/contactPageContent";
import { buildOfficeMapEmbedUrl } from "../lib/officeMap";

describe("ContactStudioPanel", () => {
  it("renders the studio address, email, and pinned map embed", () => {
    render(<ContactStudioPanel />);

    expect(screen.getByTestId("contact-studio-panel")).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: CONTACT_STUDIO.title })).toBeInTheDocument();

    for (const line of CONTACT_STUDIO.addressLines) {
      expect(screen.getByText(line, { exact: false })).toBeInTheDocument();
    }

    const emailLink = screen.getByRole("link", { name: CONTACT_STUDIO.email });
    expect(emailLink).toHaveAttribute("href", CONTACT_STUDIO.emailHref);

    const phoneLink = screen.getByRole("link", { name: CONTACT_STUDIO.phone });
    expect(phoneLink).toHaveAttribute("href", CONTACT_STUDIO.phoneHref);

    const map = screen.getByTitle(/Udaipur Engineering Studio location/i);
    expect(map).toHaveAttribute("src", buildOfficeMapEmbedUrl());
  });
});
