import { beforeEach, describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import ServicesOverviewInquiry from "./ServicesOverviewInquiry";
import { AI_OPERATIONAL_AUDIT_PERSONAL_EMAIL_ERROR } from "../lib/aiOperationalAuditLeadGate";
import { SERVICES_OVERVIEW_INQUIRY } from "../lib/servicesOverviewPageContent";
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

describe("ServicesOverviewInquiry", () => {
  beforeEach(() => {
    createLead.mockReset();
    createLead.mockResolvedValue({ ok: true });
    navigate.mockReset();
  });

  it("blocks personal email domains before submitting", async () => {
    const user = userEvent.setup();
    render(
      <MemoryRouter>
        <ServicesOverviewInquiry />
      </MemoryRouter>,
    );

    await user.type(screen.getByLabelText(SERVICES_OVERVIEW_INQUIRY.nameLabel), "Nitesh");
    await user.type(screen.getByLabelText(SERVICES_OVERVIEW_INQUIRY.emailLabel), "ops@gmail.com");
    await user.type(screen.getByLabelText(SERVICES_OVERVIEW_INQUIRY.companyLabel), "Commiters");
    await user.type(screen.getByLabelText(SERVICES_OVERVIEW_INQUIRY.detailsLabel), "Need an audit of invoice entry.");
    await user.click(screen.getByRole("button", { name: SERVICES_OVERVIEW_INQUIRY.submitLabel }));

    expect(screen.getByRole("alert")).toHaveTextContent(AI_OPERATIONAL_AUDIT_PERSONAL_EMAIL_ERROR);
    expect(createLead).not.toHaveBeenCalled();
  });

  it("submits an AI audit request and a custom app request", async () => {
    const user = userEvent.setup();
    render(
      <MemoryRouter>
        <ServicesOverviewInquiry />
      </MemoryRouter>,
    );

    await user.type(screen.getByLabelText(SERVICES_OVERVIEW_INQUIRY.nameLabel), "Nitesh Rav");
    await user.type(screen.getByLabelText(SERVICES_OVERVIEW_INQUIRY.emailLabel), "hello@commiters.com");
    await user.type(screen.getByLabelText(SERVICES_OVERVIEW_INQUIRY.companyLabel), "Commiters Softwares");
    await user.selectOptions(
      screen.getByLabelText(SERVICES_OVERVIEW_INQUIRY.interestLabel),
      "Custom Cloud Enterprise Software / Utilities",
    );
    await user.type(screen.getByLabelText(SERVICES_OVERVIEW_INQUIRY.detailsLabel), "Need a GST-aware storefront.");
    await user.click(screen.getByRole("button", { name: SERVICES_OVERVIEW_INQUIRY.submitLabel }));

    expect(createLead).toHaveBeenCalledWith({
      name: "Nitesh Rav",
      email: "hello@commiters.com",
      serviceNeeded: "Custom Cloud Enterprise Software / Utilities",
      timeline: "To be scoped",
      message: expect.stringContaining("Need a GST-aware storefront."),
    });
    expect(navigate).toHaveBeenCalledWith(ROUTES.thankYou, { state: { submissionView: "client" } });
  });
});
