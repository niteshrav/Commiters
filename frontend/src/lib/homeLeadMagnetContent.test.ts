import { describe, expect, it } from "vitest";
import { HOME_OPS_FLOW_SECTION_ID } from "./homePageContent";
import { HOME_LEAD_MAGNET_COPY, HOME_LEAD_MAGNET_LAYOUT, HOME_LEAD_MAGNET_SECTION_ID } from "./homeLeadMagnetContent";
import { ROUTES } from "./routes";

describe("homeLeadMagnetContent", () => {
  it("defines the OpsFlow AI mockup showcase and capture fields", () => {
    expect(HOME_LEAD_MAGNET_SECTION_ID).toBe(HOME_OPS_FLOW_SECTION_ID);
    expect(HOME_LEAD_MAGNET_COPY.badge).toBe("PROPRIETARY AI PRODUCT");
    expect(HOME_LEAD_MAGNET_COPY.titleLead).toBe("Turn PDFs into ");
    expect(HOME_LEAD_MAGNET_COPY.titleAccent).toBe("Data");
    expect(HOME_LEAD_MAGNET_COPY.description).toBe(
      "Extract clean, structured data from any business document.",
    );
    expect(HOME_LEAD_MAGNET_COPY.features).toEqual([
      {
        title: "Smart Extract",
        description: "Accurate data capture",
        tone: "blue",
      },
      {
        title: "Auto Format",
        description: "Ready-to-use Excel",
        tone: "green",
      },
      {
        title: "Fast Export",
        description: "Built for workflows",
        tone: "purple",
      },
    ]);
    expect(HOME_LEAD_MAGNET_COPY.ctaPrimary).toBe("Try OpsFlow AI");
    expect(HOME_LEAD_MAGNET_COPY.ctaPrimaryTo).toBe(ROUTES.opsFlowPlayground);
    expect(HOME_LEAD_MAGNET_COPY.ctaDemo).toBe("Request Enterprise Demo");
    expect(HOME_LEAD_MAGNET_COPY.submitLabel).toBe("Send Benchmark Request");
    expect(HOME_LEAD_MAGNET_COPY.formTitle).toBe("Request an Enterprise Demo");
    expect(HOME_LEAD_MAGNET_COPY.formSubtitle).toBe(
      "Submit a sample layout to receive your benchmark Excel conversion.",
    );
    expect(HOME_LEAD_MAGNET_COPY.emailPlaceholder).toBe("Enter your business email");
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
    expect(blob).toMatch(/Excel|\.xlsx/i);
    expect(blob).not.toMatch(/workflow engine|LLM|JSON API|custom AI models|enterprise stack|Tech Debt|Checklist/i);
  });

  it("uses a cool slate full-bleed surface with aligned inner content", () => {
    expect(HOME_LEAD_MAGNET_LAYOUT.background).toBe("#F8FAFC");
    expect(HOME_LEAD_MAGNET_LAYOUT.paddingBlock).toMatch(/48px/);
    expect(HOME_LEAD_MAGNET_LAYOUT.paddingBlock).toMatch(/64px/);
    expect(HOME_LEAD_MAGNET_LAYOUT.sectionClass).toContain("home-lead-magnet");
    expect(HOME_LEAD_MAGNET_LAYOUT.sectionClass).toContain("band-breakout");
    expect(HOME_LEAD_MAGNET_LAYOUT.innerMaxWidth).toBe("var(--max-width, 1360px)");
    expect(HOME_LEAD_MAGNET_LAYOUT.cardBackground).toBe("#FFFFFF");
    expect(HOME_LEAD_MAGNET_LAYOUT.cardBorder).toBe("#E2E8F0");
  });
});
