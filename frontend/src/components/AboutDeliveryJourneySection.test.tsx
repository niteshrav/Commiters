import { render, screen, within } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import AboutDeliveryJourneySection from "./AboutDeliveryJourneySection";
import { ABOUT_DELIVERY_JOURNEY } from "../lib/aboutPageContent";
import { ABOUT_JOURNEY_SECTION_CLASS, ABOUT_JOURNEY_TRACK_CLASS } from "../lib/aboutJourneyLayout";
import { ROUTES } from "../lib/routes";

describe("AboutDeliveryJourneySection", () => {
  it("renders a four-stage delivery timeline", () => {
    render(
      <MemoryRouter>
        <AboutDeliveryJourneySection />
      </MemoryRouter>,
    );

    expect(screen.getByTestId("about-journey-section")).toHaveClass(ABOUT_JOURNEY_SECTION_CLASS);
    expect(screen.getByRole("heading", { name: /From Idea to Production/i })).toBeInTheDocument();
    expect(screen.getByText(ABOUT_DELIVERY_JOURNEY.subtext)).toBeInTheDocument();

    const track = screen.getByTestId("about-journey-track");
    expect(track).toHaveClass(ABOUT_JOURNEY_TRACK_CLASS);
    expect(track.tagName).toBe("OL");
    expect(within(track).getAllByTestId("about-journey-stage")).toHaveLength(4);
    expect(screen.getByRole("link", { name: "Discover" })).toHaveAttribute("href", ROUTES.aiOperationalAudit);
    expect(screen.getByRole("heading", { name: "Launch" })).toBeInTheDocument();
  });
});
