import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import AiOperationalAuditPage from "./AiOperationalAuditPage";
import {
  AI_OPERATIONAL_AUDIT_HERO,
  AI_OPERATIONAL_AUDIT_SEO,
} from "../lib/aiOperationalAuditPageContent";

describe("AiOperationalAuditPage", () => {
  it("renders the diagnostic landing with product SEO", () => {
    render(
      <MemoryRouter>
        <AiOperationalAuditPage />
      </MemoryRouter>,
    );

    expect(screen.getByTestId("ai-operational-audit-page")).toBeInTheDocument();
    expect(screen.getByTestId("ai-operational-audit-section")).toBeInTheDocument();
    expect(document.title).toBe(AI_OPERATIONAL_AUDIT_SEO.title);
    expect(document.querySelector('meta[name="description"]')).toHaveAttribute(
      "content",
      AI_OPERATIONAL_AUDIT_SEO.description,
    );
    expect(screen.getByRole("heading", { name: AI_OPERATIONAL_AUDIT_HERO.headline, level: 1 })).toBeInTheDocument();
  });
});
