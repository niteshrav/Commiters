import { describe, expect, it } from "vitest";
import { SERVICE_PAGE_SECTIONS, serviceSectionMeta } from "./servicePageContent";

describe("servicePageContent", () => {
  it("numbers each services row per the Stitch mockup", () => {
    expect(SERVICE_PAGE_SECTIONS).toHaveLength(6);
    expect(SERVICE_PAGE_SECTIONS[0].index).toBe("01");
    expect(SERVICE_PAGE_SECTIONS[0].kicker).toBe("WEBSITE DEVELOPMENT");
    expect(SERVICE_PAGE_SECTIONS[0].titleAccent).toBe("convert");
  });

  it("looks up metadata by section anchor id", () => {
    expect(serviceSectionMeta("ai-integration")?.index).toBe("05");
  });
});
