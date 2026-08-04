import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import ServiceOfferCard from "./ServiceOfferCard";
import {
  SERVICE_CARD_ACTION_CLASS,
  SERVICE_CARD_CLASS,
  SERVICE_CARD_COPY_CLASS,
  SERVICE_CARD_LAYOUT_CLASS,
  SERVICE_CARD_LINK_WRAP_CLASS,
  SERVICE_CARD_MEDIA_CLASS,
  SERVICE_CARD_SPAN_CLASS,
  SERVICE_CARD_TITLE_CLASS,
} from "../lib/servicesGridLayout";
import { SERVICE_CARD_IMAGE_BY_GRID_ID } from "../lib/serviceCardImages";
import { STITCH_SERVICES_GRID } from "../lib/stitchPageContent";

describe("ServiceOfferCard", () => {
  it("renders a uniform card with a full-width link and visible action", () => {
    const service = STITCH_SERVICES_GRID[0];

    render(
      <MemoryRouter>
        <ServiceOfferCard service={service} />
      </MemoryRouter>,
    );

    const card = screen.getByTestId("stitch-service-card");
    expect(card).toHaveClass(
      SERVICE_CARD_CLASS,
      SERVICE_CARD_SPAN_CLASS[1],
      SERVICE_CARD_LAYOUT_CLASS.standard,
    );
    expect(card.querySelector(`.${SERVICE_CARD_MEDIA_CLASS} img`)).toHaveAttribute(
      "src",
      SERVICE_CARD_IMAGE_BY_GRID_ID["website-development"],
    );
    expect(screen.getByRole("heading", { name: service.title })).toHaveClass(SERVICE_CARD_TITLE_CLASS);
    expect(screen.getByText(service.description)).toHaveClass(SERVICE_CARD_COPY_CLASS);

    const link = screen.getByRole("link", { name: new RegExp(service.title, "i") });
    expect(link).toHaveClass(SERVICE_CARD_LINK_WRAP_CLASS);
    expect(link).toHaveAttribute("href", "/services/website-development");
    expect(link.querySelector(`.${SERVICE_CARD_ACTION_CLASS}`)).toHaveTextContent(/View service/i);
  });

  it("renders automation as the same card pattern as other services", () => {
    const service = STITCH_SERVICES_GRID.find((entry) => entry.id === "automation-tools");
    expect(service).toBeDefined();

    render(
      <MemoryRouter>
        <ServiceOfferCard service={service!} />
      </MemoryRouter>,
    );

    const card = screen.getByTestId("stitch-service-card");
    expect(card).toHaveClass(SERVICE_CARD_SPAN_CLASS[1], SERVICE_CARD_LAYOUT_CLASS.standard);

    const link = screen.getByRole("link", { name: /Automation Tools/i });
    expect(link).toHaveAttribute("href", "/services/automation-tools");
    expect(link.querySelector(`.${SERVICE_CARD_ACTION_CLASS}`)).toHaveTextContent(/View service/i);
  });
});
