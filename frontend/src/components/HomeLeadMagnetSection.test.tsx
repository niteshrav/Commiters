import { beforeEach, describe, expect, it, vi } from "vitest";
import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import HomeLeadMagnetSection from "./HomeLeadMagnetSection";
import {
  HOME_LEAD_MAGNET_COPY,
  HOME_LEAD_MAGNET_LAYOUT,
  HOME_LEAD_MAGNET_SECTION_ID,
  HOME_LEAD_MAGNET_TEST_ID,
} from "../lib/homeLeadMagnetContent";

const createLead = vi.fn();

vi.mock("../lib/api", () => ({
  createLead: (...args: unknown[]) => createLead(...args),
}));

describe("HomeLeadMagnetSection", () => {
  beforeEach(() => {
    createLead.mockReset();
    createLead.mockResolvedValue({ ok: true });
  });

  it("renders the OpsFlow mockup showcase, upload visual, and capture card", () => {
    render(
      <MemoryRouter>
        <HomeLeadMagnetSection />
      </MemoryRouter>,
    );

    const section = screen.getByTestId(HOME_LEAD_MAGNET_TEST_ID);
    expect(section).toHaveClass(...HOME_LEAD_MAGNET_LAYOUT.sectionClass.split(" "));
    expect(screen.getByText(HOME_LEAD_MAGNET_COPY.badge)).toHaveClass(HOME_LEAD_MAGNET_LAYOUT.badgeClass);
    expect(screen.getByRole("heading", { name: /Turn PDFs into Data/i })).toBeInTheDocument();
    expect(screen.getByText(HOME_LEAD_MAGNET_COPY.description)).toBeInTheDocument();

    const features = screen.getByTestId("home-lead-magnet-features");
    expect(within(features).getAllByTestId("home-lead-magnet-feature")).toHaveLength(
      HOME_LEAD_MAGNET_COPY.features.length,
    );
    for (const feature of HOME_LEAD_MAGNET_COPY.features) {
      expect(within(features).getByText(feature.title)).toBeInTheDocument();
      expect(within(features).getByText(feature.description)).toBeInTheDocument();
    }

    const visual = screen.getByTestId("home-lead-magnet-visual");
    expect(within(visual).getByText(HOME_LEAD_MAGNET_COPY.visual.uploadTitle)).toBeInTheDocument();
    expect(within(visual).getByText(HOME_LEAD_MAGNET_COPY.visual.outputLabel)).toBeInTheDocument();
    for (const label of HOME_LEAD_MAGNET_COPY.documentTypes) {
      expect(within(visual).getByText(label)).toBeInTheDocument();
    }

    const card = screen.getByTestId("home-lead-magnet-card");
    expect(card).toHaveClass(HOME_LEAD_MAGNET_LAYOUT.formCardClass);
    expect(within(card).getByRole("heading", { name: HOME_LEAD_MAGNET_COPY.formTitle })).toBeInTheDocument();
    expect(within(card).getByText(HOME_LEAD_MAGNET_COPY.formSubtitle)).toBeInTheDocument();
    expect(screen.getByLabelText(HOME_LEAD_MAGNET_COPY.emailLabel)).toHaveAttribute(
      "placeholder",
      HOME_LEAD_MAGNET_COPY.emailPlaceholder,
    );

    const actions = screen.getByTestId("home-lead-magnet-actions");
    expect(within(actions).getByRole("link", { name: HOME_LEAD_MAGNET_COPY.ctaPrimary })).toHaveAttribute(
      "href",
      HOME_LEAD_MAGNET_COPY.ctaPrimaryTo,
    );
    expect(within(actions).getByRole("link", { name: HOME_LEAD_MAGNET_COPY.ctaDemo })).toHaveAttribute(
      "href",
      "#home-lead-magnet-card",
    );

    expect(section).toHaveAttribute("id", HOME_LEAD_MAGNET_SECTION_ID);
    expect(screen.getByRole("button", { name: HOME_LEAD_MAGNET_COPY.submitLabel })).toBeInTheDocument();
    expect(screen.getByText(HOME_LEAD_MAGNET_COPY.microcopy)).toBeInTheDocument();
    expect(screen.queryByText(/Streamline Your Business Operations/i)).not.toBeInTheDocument();
  });

  it("replaces the form with the success message after a valid submission", async () => {
    const user = userEvent.setup();
    render(
      <MemoryRouter>
        <HomeLeadMagnetSection />
      </MemoryRouter>,
    );

    await user.type(screen.getByLabelText(HOME_LEAD_MAGNET_COPY.emailLabel), "founder@acme.io");
    await user.click(screen.getByRole("button", { name: HOME_LEAD_MAGNET_COPY.submitLabel }));

    expect(createLead).toHaveBeenCalledWith({
      name: HOME_LEAD_MAGNET_COPY.subscriberName,
      email: "founder@acme.io",
      serviceNeeded: HOME_LEAD_MAGNET_COPY.serviceNeeded,
      timeline: HOME_LEAD_MAGNET_COPY.timeline,
      message: HOME_LEAD_MAGNET_COPY.requestMessage,
    });
    expect(await screen.findByText(HOME_LEAD_MAGNET_COPY.successMessage)).toBeInTheDocument();
    expect(screen.queryByRole("button", { name: HOME_LEAD_MAGNET_COPY.submitLabel })).not.toBeInTheDocument();
    expect(screen.queryByLabelText(HOME_LEAD_MAGNET_COPY.emailLabel)).not.toBeInTheDocument();
    expect(screen.queryByRole("heading", { name: HOME_LEAD_MAGNET_COPY.formTitle })).not.toBeInTheDocument();
  });

  it("does not submit an invalid email", async () => {
    const user = userEvent.setup();
    render(
      <MemoryRouter>
        <HomeLeadMagnetSection />
      </MemoryRouter>,
    );

    await user.click(screen.getByRole("button", { name: HOME_LEAD_MAGNET_COPY.submitLabel }));
    expect(createLead).not.toHaveBeenCalled();
    expect(screen.getByRole("alert")).toHaveTextContent(/enter your email/i);
  });
});
