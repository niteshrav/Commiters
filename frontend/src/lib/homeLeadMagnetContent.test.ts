import { describe, expect, it } from "vitest";
import { HOME_LEAD_MAGNET_COPY, HOME_LEAD_MAGNET_LAYOUT } from "./homeLeadMagnetContent";

describe("homeLeadMagnetContent", () => {
  it("defines OpsFlow AI PDF-to-Excel showcase copy and capture fields", () => {
    expect(HOME_LEAD_MAGNET_COPY.badge).toBe("OPSFLOW AI • DOCUMENT INTELLIGENCE");
    expect(HOME_LEAD_MAGNET_COPY.title).toBe("Transform Unstructured PDFs into Clean, Structured Excel Datasets");
    expect(HOME_LEAD_MAGNET_COPY.description).toBe(
      "OpsFlow AI eliminates manual document entry by automatically extracting tables, line items, and complex financial fields from PDFs directly into production-ready Excel workbooks.",
    );
    expect(HOME_LEAD_MAGNET_COPY.features).toEqual([
      {
        title: "Precision Extraction",
        body: "High-accuracy table and key-value field mapping.",
      },
      {
        title: "Automated Formatting",
        body: "Instant conversion of multi-page invoices and receipts into .xlsx.",
      },
      {
        title: "Zero Manual Effort",
        body: "Eliminates copy-paste errors and speeds up reconciliation cycles.",
      },
    ]);
    expect(HOME_LEAD_MAGNET_COPY.formTitle).toBe("Test OpsFlow AI with Your Document Format");
    expect(HOME_LEAD_MAGNET_COPY.formSubtitle).toBe("Submit a sample layout to receive your benchmark Excel conversion.");
    expect(HOME_LEAD_MAGNET_COPY.emailPlaceholder).toBe("Enter your business email");
    expect(HOME_LEAD_MAGNET_COPY.submitLabel).toBe("Request Sample Extraction");
    expect(HOME_LEAD_MAGNET_COPY.microcopy).toBe(
      "Zero spam. Direct benchmark results delivered within 1 business day.",
    );
    expect(HOME_LEAD_MAGNET_COPY.successMessage).toBe(
      "Request Received! Our engineering team will reach out shortly to process your sample PDF-to-Excel conversion.",
    );
  });

  it("stays on PDF-to-Excel conversion and avoids generic workflow or LLM-stack claims", () => {
    const blob = JSON.stringify(HOME_LEAD_MAGNET_COPY);
    expect(blob).toMatch(/PDF/);
    expect(blob).toMatch(/Excel|\.xlsx/);
    expect(blob).not.toMatch(/workflow engine|LLM|JSON API|custom AI models|enterprise stack|Tech Debt|Checklist/i);
  });

  it("uses a cool slate full-bleed surface with aligned inner content", () => {
    expect(HOME_LEAD_MAGNET_LAYOUT.background).toBe("#F8FAFC");
    expect(HOME_LEAD_MAGNET_LAYOUT.paddingBlock).toMatch(/48px/);
    expect(HOME_LEAD_MAGNET_LAYOUT.paddingBlock).toMatch(/64px/);
    expect(HOME_LEAD_MAGNET_LAYOUT.sectionClass).toContain("home-lead-magnet");
    expect(HOME_LEAD_MAGNET_LAYOUT.sectionClass).toContain("band-breakout");
    expect(HOME_LEAD_MAGNET_LAYOUT.innerMaxWidth).toBe("80rem");
    expect(HOME_LEAD_MAGNET_LAYOUT.cardBackground).toBe("#FFFFFF");
    expect(HOME_LEAD_MAGNET_LAYOUT.cardBorder).toBe("#E2E8F0");
  });
});
