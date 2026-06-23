import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import ServiceOfferCard from "./ServiceOfferCard";
import {
  SERVICE_CARD_BUTTON_CLASS,
  SERVICE_CARD_CLASS,
  SERVICE_CARD_COPY_CLASS,
  SERVICE_CARD_HOVER_CLASS,
  SERVICE_CARD_ICON_CLASS,
  SERVICE_CARD_LAYOUT_CLASS,
  SERVICE_CARD_LINK_CLASS,
  SERVICE_CARD_MAIN_CLASS,
  SERVICE_CARD_SPAN_CLASS,
  SERVICE_CARD_TITLE_CLASS,
} from "../lib/servicesGridLayout";
import { STITCH_SERVICES_GRID } from "../lib/stitchPageContent";

describe("ServiceOfferCard", () => {
  it("renders the website card with a two-column span and a hover link", () => {
    const service = STITCH_SERVICES_GRID[0];

    render(
      <MemoryRouter>
        <ServiceOfferCard service={service} />
      </MemoryRouter>,
    );

    const card = screen.getByTestId("stitch-service-card");
    expect(card).toHaveClass(
      SERVICE_CARD_CLASS,
      SERVICE_CARD_SPAN_CLASS[2],
      SERVICE_CARD_LAYOUT_CLASS.standard,
    );
    expect(card.querySelector(`.${SERVICE_CARD_ICON_CLASS}`)).toBeTruthy();
    expect(screen.getByRole("heading", { name: service.title })).toHaveClass(SERVICE_CARD_TITLE_CLASS);
    expect(screen.getByText(service.description)).toHaveClass(SERVICE_CARD_COPY_CLASS);

    const hover = card.querySelector(`.${SERVICE_CARD_HOVER_CLASS}`);
    expect(hover).toBeTruthy();
    const link = screen.getByRole("link", { name: /Learn more/i });
    expect(link).toHaveClass(SERVICE_CARD_LINK_CLASS);
    expect(link).toHaveAttribute("href", service.hoverAction.href);
  });

  it("renders the automation card as a split layout with a hover button", () => {
    const service = STITCH_SERVICES_GRID.find((entry) => entry.id === "automation-tools");
    expect(service).toBeDefined();

    render(
      <MemoryRouter>
        <ServiceOfferCard service={service!} />
      </MemoryRouter>,
    );

    const card = screen.getByTestId("stitch-service-card");
    expect(card).toHaveClass(
      SERVICE_CARD_SPAN_CLASS[3],
      SERVICE_CARD_LAYOUT_CLASS.split,
    );
    expect(card.querySelector(`.${SERVICE_CARD_MAIN_CLASS}`)).toBeTruthy();

    const button = screen.getByRole("link", { name: /Inquire about Automation/i });
    expect(button).toHaveClass(SERVICE_CARD_BUTTON_CLASS);
    expect(button).toHaveAttribute("href", service!.hoverAction.href);
  });
});
