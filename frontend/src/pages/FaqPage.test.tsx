import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import FaqPage from "./FaqPage";
import { FAQ_PAGE_COPY, FALLBACK_FAQ_ITEMS } from "../lib/faqPageContent";
import { buildDiscoveryCallCalendarUrl } from "../lib/siteContact";

describe("FaqPage", () => {
  it("renders intro, categories, accordions, and bottom CTA from fallback content", () => {
    render(
      <MemoryRouter>
        <FaqPage />
      </MemoryRouter>,
    );

    expect(screen.getByTestId("faq-page")).toBeInTheDocument();
    expect(screen.getByTestId("faq-intro-section")).toBeInTheDocument();
    expect(screen.getByTestId("faq-content-section")).toBeInTheDocument();
    expect(screen.getByTestId("faq-bottom-cta")).toBeInTheDocument();

    expect(screen.getByRole("heading", { level: 1, name: FAQ_PAGE_COPY.title })).toBeInTheDocument();
    expect(screen.getByText(FAQ_PAGE_COPY.subtext)).toBeInTheDocument();

    expect(screen.getByTestId("faq-category-process")).toBeInTheDocument();
    expect(screen.getByTestId("faq-category-technical")).toBeInTheDocument();
    expect(screen.getByTestId("faq-category-engagements")).toBeInTheDocument();

    for (const item of FALLBACK_FAQ_ITEMS) {
      expect(screen.getByText(item.question)).toBeInTheDocument();
    }

    const scheduleLink = screen.getByRole("link", { name: FAQ_PAGE_COPY.bottomCta.buttonLabel });
    expect(scheduleLink).toHaveAttribute("href", buildDiscoveryCallCalendarUrl());
  });

  it("toggles accordion items within a category", async () => {
    const user = userEvent.setup();

    render(
      <MemoryRouter>
        <FaqPage />
      </MemoryRouter>,
    );

    const firstItem = FALLBACK_FAQ_ITEMS[0];
    const secondItem = FALLBACK_FAQ_ITEMS[1];
    const firstTrigger = screen.getByRole("button", { name: firstItem.question });
    const secondTrigger = screen.getByRole("button", { name: secondItem.question });

    expect(firstTrigger).toHaveAttribute("aria-expanded", "true");
    expect(secondTrigger).toHaveAttribute("aria-expanded", "false");

    await user.click(secondTrigger);

    expect(firstTrigger).toHaveAttribute("aria-expanded", "false");
    expect(secondTrigger).toHaveAttribute("aria-expanded", "true");

    const secondPanel = within(screen.getByTestId(`faq-item-${secondItem.id}`)).getByText(secondItem.answer);
    expect(secondPanel).toBeVisible();
  });
});
