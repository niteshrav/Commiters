import { describe, expect, it } from "vitest";
import type { LegalDocumentBlock, LegalDocumentSectionContent } from "./legalDocumentContent";

describe("legalDocumentContent", () => {
  it("supports paragraph, list, and contact blocks for Stitch legal pages", () => {
    const section: LegalDocumentSectionContent = {
      id: "sample",
      heading: "Sample",
      blocks: [
        { kind: "paragraph", text: "Paragraph copy." },
        { kind: "list", items: ["First item", "Second item"] },
        { kind: "contact", textBefore: "Email ", textAfter: "." },
      ] satisfies LegalDocumentBlock[],
    };

    expect(section.blocks).toHaveLength(3);
    expect(section.blocks[1].kind).toBe("list");
    expect(section.blocks[2].kind).toBe("contact");
  });
});
