import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const css = readFileSync(join(__dirname, "..", "styles.css"), "utf8");

describe("stickyHeaderScroll (hash / in-page navigation)", () => {
  it("defines a shared offset token for the sticky header", () => {
    expect(css).toMatch(/--sticky-header-offset:\s*108px/);
  });

  it("applies scroll-padding-top on html so hash targets clear the sticky navbar", () => {
    expect(css).toMatch(/html\s*\{[\s\S]*?scroll-padding-top:\s*var\(--sticky-header-offset\)/);
  });
});
