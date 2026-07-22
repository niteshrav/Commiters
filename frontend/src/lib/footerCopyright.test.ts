import { describe, expect, it } from "vitest";
import { splitCopyrightLine } from "./footerCopyright";

describe("splitCopyrightLine", () => {
  it("splits a leading copyright symbol from the rest of the line", () => {
    expect(splitCopyrightLine("© 2026 Commiters Softwares.")).toEqual({
      symbol: "©",
      remainder: "2026 Commiters Softwares.",
    });
  });

  it("supports (c) notation", () => {
    expect(splitCopyrightLine("(c) Commiters. All rights reserved.")).toEqual({
      symbol: "(c)",
      remainder: "Commiters. All rights reserved.",
    });
  });

  it("returns the full line when no copyright symbol is present", () => {
    expect(splitCopyrightLine("Commiters. All rights reserved.")).toEqual({
      symbol: null,
      remainder: "Commiters. All rights reserved.",
    });
  });
});
