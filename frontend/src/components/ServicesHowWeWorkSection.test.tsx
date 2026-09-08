import { render, screen, within } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import ServicesHowWeWorkSection from "./ServicesHowWeWorkSection";
import {
  SERVICES_HOW_WE_WORK_KICKER_CLASS,
  SERVICES_HOW_WE_WORK_SECTION_CLASS,
  SERVICES_HOW_WE_WORK_TITLE_CLASS,
  SERVICES_HOW_WE_WORK_TRACK_CLASS,
} from "../lib/servicesPageBottomLayout";
import { SERVICES_HOW_WE_WORK } from "../lib/servicesPageBottomContent";
import { ROUTES } from "../lib/routes";

describe("ServicesHowWeWorkSection", () => {
  it("renders the mockup process band with four cards", () => {
    render(
      <MemoryRouter>
        <ServicesHowWeWorkSection />
      </MemoryRouter>,
    );

    expect(screen.getByTestId("services-how-we-work-section")).toHaveClass(SERVICES_HOW_WE_WORK_SECTION_CLASS);
    expect(screen.getByText(SERVICES_HOW_WE_WORK.kicker)).toHaveClass(SERVICES_HOW_WE_WORK_KICKER_CLASS);
    expect(screen.getByRole("heading", { name: /How We Work/i })).toHaveClass(SERVICES_HOW_WE_WORK_TITLE_CLASS);
    expect(screen.getByText(SERVICES_HOW_WE_WORK.subtext)).toBeInTheDocument();

    const track = screen.getByTestId("services-how-we-work-grid");
    expect(track).toHaveClass(SERVICES_HOW_WE_WORK_TRACK_CLASS);
    expect(within(track).getAllByTestId("services-how-we-work-step")).toHaveLength(4);
    expect(within(track).getByRole("link", { name: "AI Operational Audit" })).toHaveAttribute(
      "href",
      ROUTES.aiOperationalAudit,
    );
    expect(screen.queryByTestId("about-how-we-work-cta")).not.toBeInTheDocument();
  });
});
