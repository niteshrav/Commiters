import { beforeEach, describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import ContactPage from "./ContactPage";
import { STITCH_COPY } from "../lib/stitchDesign";
import { CONTACT_STUDIO } from "../lib/contactPageContent";
import { CONTACT_SECTION_SEPARATOR_TEST_ID } from "../lib/contactSectionLayout";
import { STITCH_PROJECT_TYPE_DEFAULT } from "../lib/stitchPageContent";
import { buildOfficeMapEmbedUrl } from "../lib/officeMap";
import { buildDiscoveryCallCalendarUrl } from "../lib/siteContact";
import { ROUTES } from "../lib/routes";

const createLead = vi.fn();
const navigate = vi.fn();

vi.mock("../lib/api", () => ({
  createLead: (...args: unknown[]) => createLead(...args),
}));

vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual<typeof import("react-router-dom")>("react-router-dom");
  return {
    ...actual,
    useNavigate: () => navigate,
  };
});

describe("ContactPage", () => {
  beforeEach(() => {
    createLead.mockReset();
    createLead.mockResolvedValue({ ok: true });
    navigate.mockReset();
  });

  it("renders the Stitch contact hero and direct inquiry layout", () => {
    render(
      <MemoryRouter>
        <ContactPage />
      </MemoryRouter>,
    );

    expect(screen.getByTestId("contact-page")).toBeInTheDocument();
    expect(screen.getByTestId("contact-intro-section")).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: STITCH_COPY.contact.title })).toBeInTheDocument();
    expect(screen.getByText(STITCH_COPY.contact.subtext)).toBeInTheDocument();
    expect(screen.queryByTestId("stitch-page-hero")).not.toBeInTheDocument();
    expect(screen.getByRole("heading", { name: STITCH_COPY.contact.formTitle })).toBeInTheDocument();
    expect(screen.getByLabelText(STITCH_COPY.contact.nameLabel)).toHaveAttribute("placeholder", STITCH_COPY.contact.namePlaceholder);
    expect(screen.getByLabelText(STITCH_COPY.contact.emailLabel)).toHaveAttribute(
      "placeholder",
      STITCH_COPY.contact.emailPlaceholder,
    );
    expect(screen.getByLabelText(STITCH_COPY.contact.projectTypeLabel)).toBeInTheDocument();
    expect(screen.getByLabelText(STITCH_COPY.contact.messageLabel)).toHaveAttribute(
      "placeholder",
      STITCH_COPY.contact.messagePlaceholder,
    );
    expect(screen.getByRole("button", { name: /Submit Inquiry/i })).toBeInTheDocument();
    expect(screen.getByTestId("contact-sidebar-cards")).toBeInTheDocument();
    expect(screen.getByText(/Chat with an Engineer/i)).toBeInTheDocument();
    const discoveryCallLink = screen.getByRole("link", { name: /Book a Discovery Call/i });
    expect(discoveryCallLink).toBeInTheDocument();
    expect(discoveryCallLink).toHaveAttribute("href", buildDiscoveryCallCalendarUrl());
    expect(discoveryCallLink.getAttribute("href")).not.toContain("calendly.com");
    expect(screen.getByTestId("contact-studio-panel")).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: CONTACT_STUDIO.title })).toBeInTheDocument();
    expect(screen.getByText(/82, Sobhagya Nagar,/i)).toBeInTheDocument();
    expect(screen.getByRole("link", { name: CONTACT_STUDIO.email })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: CONTACT_STUDIO.phone })).toHaveAttribute(
      "href",
      CONTACT_STUDIO.phoneHref,
    );
    expect(screen.getByTitle(/Udaipur Engineering Studio location/i)).toHaveAttribute(
      "src",
      buildOfficeMapEmbedUrl(),
    );
    expect(screen.getByTestId(CONTACT_SECTION_SEPARATOR_TEST_ID)).toBeInTheDocument();
  });

  it("keeps the intro and inquiry sections as separate bands with spacing tokens", () => {
    render(
      <MemoryRouter>
        <ContactPage />
      </MemoryRouter>,
    );

    const intro = screen.getByTestId("contact-intro-section");
    const inquiry = screen.getByTestId("contact-layout");

    expect(intro).toHaveClass("contact-intro-section");
    expect(inquiry).toHaveClass("stitch-contact-section");
    expect(intro.compareDocumentPosition(inquiry) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy();
  });

  it("submits the stitch form with mapped service type", async () => {
    const user = userEvent.setup();
    render(
      <MemoryRouter>
        <ContactPage />
      </MemoryRouter>,
    );

    await user.type(screen.getByLabelText(STITCH_COPY.contact.nameLabel), "Jane Doe");
    await user.type(screen.getByLabelText(STITCH_COPY.contact.emailLabel), "jane@company.com");
    await user.selectOptions(screen.getByLabelText(STITCH_COPY.contact.projectTypeLabel), STITCH_PROJECT_TYPE_DEFAULT);
    await user.type(screen.getByLabelText(STITCH_COPY.contact.messageLabel), "We need a customer portal with dashboards.");
    await user.click(screen.getByRole("button", { name: /Submit Inquiry/i }));

    expect(createLead).toHaveBeenCalledWith(
      expect.objectContaining({
        name: "Jane Doe",
        email: "jane@company.com",
        serviceNeeded: "Website Development",
      }),
    );
    expect(navigate).toHaveBeenCalledWith(ROUTES.thankYou, { state: { submissionView: "client" } });
  });
});
