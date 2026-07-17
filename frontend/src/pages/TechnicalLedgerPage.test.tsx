import { render, screen, within } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { afterEach, describe, expect, it, vi } from "vitest";
import TechnicalLedgerPage from "./TechnicalLedgerPage";
import {
  TECHNICAL_LEDGER_CONTEXT_TRAP_ARTICLE,
  TECHNICAL_LEDGER_CONTEXT_TRAP_MEDIUM_URL,
  TECHNICAL_LEDGER_PAGE_COPY,
} from "../lib/technicalLedgerPageContent";

describe("TechnicalLedgerPage", () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("renders the Stitch Technical Ledger hero and featured Medium article", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue(
        new Response(
          JSON.stringify({
            articles: [
              {
                id: TECHNICAL_LEDGER_CONTEXT_TRAP_ARTICLE.id,
                category: TECHNICAL_LEDGER_CONTEXT_TRAP_ARTICLE.category,
                title: TECHNICAL_LEDGER_CONTEXT_TRAP_ARTICLE.title,
                summary: TECHNICAL_LEDGER_CONTEXT_TRAP_ARTICLE.summary,
                href: TECHNICAL_LEDGER_CONTEXT_TRAP_MEDIUM_URL,
                imageSrc: TECHNICAL_LEDGER_CONTEXT_TRAP_ARTICLE.image.src,
                imageAlt: TECHNICAL_LEDGER_CONTEXT_TRAP_ARTICLE.image.alt,
                source: "medium",
                publishedAt: "2026-06-17T06:31:59.855Z",
              },
            ],
          }),
          { status: 200, headers: { "Content-Type": "application/json" } },
        ),
      ),
    );

    render(
      <MemoryRouter>
        <TechnicalLedgerPage />
      </MemoryRouter>,
    );

    const page = screen.getByTestId("technical-ledger-page");
    expect(page).toHaveClass("technical-ledger-page");

    const intro = screen.getByTestId("technical-ledger-intro");
    expect(within(intro).getByRole("heading", { level: 1, name: TECHNICAL_LEDGER_PAGE_COPY.title })).toBeInTheDocument();
    expect(within(intro).getByText(TECHNICAL_LEDGER_PAGE_COPY.subtext)).toBeInTheDocument();
    expect(intro.querySelector(".technical-ledger-divider")).toBeInTheDocument();

    const articles = await screen.findByTestId("technical-ledger-articles");
    const card = within(articles).getByTestId("technical-ledger-article-card");
    const article = TECHNICAL_LEDGER_CONTEXT_TRAP_ARTICLE;

    expect(within(card).getByText(article.category)).toBeInTheDocument();
    expect(within(card).getByRole("heading", { level: 2, name: article.title })).toBeInTheDocument();
    expect(within(card).getByText(article.summary)).toBeInTheDocument();

    const image = within(card).getByRole("img", { name: article.image.alt });
    expect(image).toHaveAttribute("src", article.image.src);

    const mediumLink = within(card).getByRole("link", { name: TECHNICAL_LEDGER_PAGE_COPY.readOnMediumLabel });
    expect(mediumLink).toHaveAttribute("href", TECHNICAL_LEDGER_CONTEXT_TRAP_MEDIUM_URL);
    expect(mediumLink).toHaveAttribute("target", "_blank");

    expect(screen.queryByTestId("technical-ledger-compose-section")).not.toBeInTheDocument();
  });
});
