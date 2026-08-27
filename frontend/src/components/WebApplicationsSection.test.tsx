import { beforeEach, describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import WebApplicationsSection from "./WebApplicationsSection";
import { AI_OPERATIONAL_AUDIT_PERSONAL_EMAIL_ERROR } from "../lib/aiOperationalAuditLeadGate";
import {
  WEB_APPLICATIONS_CAPABILITIES,
  WEB_APPLICATIONS_CTA_LABEL,
  WEB_APPLICATIONS_FORM,
  WEB_APPLICATIONS_HERO,
  WEB_APPLICATIONS_STANDARDS,
} from "../lib/webApplicationsPageContent";
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

describe("WebApplicationsSection", () => {
  beforeEach(() => {
    createLead.mockReset();
    createLead.mockResolvedValue({ ok: true });
    navigate.mockReset();
  });

  it("renders hero, capabilities, architecture standards, and project form", () => {
    render(
      <MemoryRouter>
        <WebApplicationsSection />
      </MemoryRouter>,
    );

    expect(screen.getByTestId("web-applications-section")).toBeInTheDocument();
    expect(screen.getByText(WEB_APPLICATIONS_HERO.eyebrow)).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: WEB_APPLICATIONS_HERO.headline, level: 1 })).toBeInTheDocument();
    expect(screen.getByText(WEB_APPLICATIONS_HERO.subheadline)).toBeInTheDocument();
    expect(screen.getByRole("link", { name: WEB_APPLICATIONS_CTA_LABEL })).toHaveAttribute("href", "#webapp-project");

    const capabilities = screen.getByTestId("web-applications-capabilities");
    expect(capabilities).toHaveClass("webapp-cards");
    for (const card of WEB_APPLICATIONS_CAPABILITIES) {
      expect(screen.getByRole("heading", { name: card.title, level: 2 })).toBeInTheDocument();
      expect(screen.getByText(card.body)).toBeInTheDocument();
    }

    const standards = screen.getByTestId("web-applications-standards");
    expect(standards).toHaveClass("webapp-standards");
    for (const item of WEB_APPLICATIONS_STANDARDS) {
      expect(screen.getByRole("heading", { name: item.title, level: 2 })).toBeInTheDocument();
      expect(screen.getByText(item.body)).toBeInTheDocument();
    }

    expect(screen.getByRole("heading", { name: WEB_APPLICATIONS_FORM.title, level: 2 })).toBeInTheDocument();
    expect(screen.getByLabelText(WEB_APPLICATIONS_FORM.nameLabel)).toBeRequired();
    expect(screen.getByLabelText(WEB_APPLICATIONS_FORM.emailLabel)).toHaveAttribute(
      "placeholder",
      WEB_APPLICATIONS_FORM.emailPlaceholder,
    );
    expect(screen.getByLabelText(WEB_APPLICATIONS_FORM.companyLabel)).toBeRequired();
    expect(screen.getByLabelText(WEB_APPLICATIONS_FORM.projectLabel)).toBeRequired();
    expect(screen.getByRole("button", { name: WEB_APPLICATIONS_FORM.submitLabel })).toBeInTheDocument();
  });

  it("blocks personal email domains before submitting", async () => {
    const user = userEvent.setup();
    render(
      <MemoryRouter>
        <WebApplicationsSection />
      </MemoryRouter>,
    );

    await user.type(screen.getByLabelText(WEB_APPLICATIONS_FORM.nameLabel), "Nitesh");
    await user.type(screen.getByLabelText(WEB_APPLICATIONS_FORM.emailLabel), "ops@gmail.com");
    await user.type(screen.getByLabelText(WEB_APPLICATIONS_FORM.companyLabel), "Commiters");
    await user.type(screen.getByLabelText(WEB_APPLICATIONS_FORM.projectLabel), "Internal ops dashboard");
    await user.click(screen.getByRole("button", { name: WEB_APPLICATIONS_FORM.submitLabel }));

    expect(screen.getByRole("alert")).toHaveTextContent(AI_OPERATIONAL_AUDIT_PERSONAL_EMAIL_ERROR);
    expect(createLead).not.toHaveBeenCalled();
  });

  it("submits a valid project request and routes to thank you", async () => {
    const user = userEvent.setup();
    render(
      <MemoryRouter>
        <WebApplicationsSection />
      </MemoryRouter>,
    );

    await user.type(screen.getByLabelText(WEB_APPLICATIONS_FORM.nameLabel), "Nitesh Rav");
    await user.type(screen.getByLabelText(WEB_APPLICATIONS_FORM.emailLabel), "hello@commiters.com");
    await user.type(screen.getByLabelText(WEB_APPLICATIONS_FORM.companyLabel), "Commiters Softwares");
    await user.type(
      screen.getByLabelText(WEB_APPLICATIONS_FORM.projectLabel),
      "Role-based operations platform for field teams.",
    );
    await user.click(screen.getByRole("button", { name: WEB_APPLICATIONS_FORM.submitLabel }));

    expect(createLead).toHaveBeenCalledWith({
      name: "Nitesh Rav",
      email: "hello@commiters.com",
      serviceNeeded: "Custom Web Applications",
      message: expect.stringContaining("Role-based operations platform for field teams."),
    });
    expect(navigate).toHaveBeenCalledWith(ROUTES.thankYou, { state: { submissionView: "client" } });
  });
});
