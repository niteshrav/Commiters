import { readFileSync, readdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const pagesDir = join(dirname(fileURLToPath(import.meta.url)), "..", "pages");

describe("singleSiteFooter", () => {
  it("does not use extra footer landmarks inside page components", () => {
    const pageSources = readdirSync(pagesDir)
      .filter((name) => name.endsWith(".tsx") && !name.endsWith(".test.tsx"))
      .map((name) => readFileSync(join(pagesDir, name), "utf8"))
      .join("\n");

    expect(pageSources).not.toMatch(/<footer[\s>]/i);
  });
});
