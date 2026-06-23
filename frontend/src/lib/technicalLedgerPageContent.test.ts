import { describe, expect, it } from "vitest";
import { STITCH_COPY } from "./stitchDesign";
import {
  TECHNICAL_LEDGER_ARTICLES,
  TECHNICAL_LEDGER_CONTEXT_TRAP_ARTICLE,
  TECHNICAL_LEDGER_PAGE_COPY,
} from "./technicalLedgerPageContent";

describe("technicalLedgerPageContent", () => {
  it("matches the Stitch Technical Ledger hero copy", () => {
    expect(STITCH_COPY.technicalLedger.title).toBe("Technical Ledger");
    expect(TECHNICAL_LEDGER_PAGE_COPY.title).toBe(STITCH_COPY.technicalLedger.title);
    expect(TECHNICAL_LEDGER_PAGE_COPY.subtext).toBe(STITCH_COPY.technicalLedger.subtext);
    expect(TECHNICAL_LEDGER_PAGE_COPY.readOnMediumLabel).toBe("Read on Medium");
  });

  it("features the Context Trap Medium article by Nitesh Rav", () => {
    expect(TECHNICAL_LEDGER_ARTICLES).toEqual([TECHNICAL_LEDGER_CONTEXT_TRAP_ARTICLE]);
    expect(TECHNICAL_LEDGER_CONTEXT_TRAP_ARTICLE.id).toBe("context-trap-ai-shipping");
    expect(TECHNICAL_LEDGER_CONTEXT_TRAP_ARTICLE.category).toBe("ENGINEERING");
    expect(TECHNICAL_LEDGER_CONTEXT_TRAP_ARTICLE.title).toBe(
      "The Context Trap: Why More AI Code Isn't Leading to Faster Shipping",
    );
    expect(TECHNICAL_LEDGER_CONTEXT_TRAP_ARTICLE.summary).toMatch(
      /human-centric architectural orchestration/i,
    );
    expect(TECHNICAL_LEDGER_CONTEXT_TRAP_ARTICLE.href).toBe(
      "https://medium.com/@erniteshrav/the-context-trap-why-more-ai-code-isnt-leading-to-faster-shipping-8cdead376704",
    );
    expect(TECHNICAL_LEDGER_CONTEXT_TRAP_ARTICLE.image.src).toMatch(/^\/assets\//);
    expect(TECHNICAL_LEDGER_CONTEXT_TRAP_ARTICLE.image.alt.length).toBeGreaterThan(0);
  });

  it("does not list the retired Void minimalism placeholder article", () => {
    expect(TECHNICAL_LEDGER_ARTICLES.some((article) => article.id === "void-minimalism-enterprise-ui")).toBe(
      false,
    );
    expect(
      TECHNICAL_LEDGER_ARTICLES.some((article) =>
        article.title.includes("The Power of the Void"),
      ),
    ).toBe(false);
  });
});
