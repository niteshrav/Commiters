import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { describe, expect, it } from "vitest";
import { DEFAULT_DOCUMENT_TITLE } from "./siteMeta";
import { DEFAULT_META_DESCRIPTION } from "./siteBrandChrome";

const indexHtml = readFileSync(join(dirname(fileURLToPath(import.meta.url)), "..", "..", "index.html"), "utf8");

describe("index.html brand metadata", () => {
  it("sets the global title and meta description to the enterprise brand line", () => {
    expect(indexHtml).toContain(`<title>${DEFAULT_DOCUMENT_TITLE}</title>`);
    expect(indexHtml).toMatch(
      /<meta\s+name="description"\s+content="Commiters — Enterprise AI & Cloud Systems\. Spec-driven engineering, custom AI pipelines, and enterprise software architectures\."\s*\/>/,
    );
    expect(indexHtml).toContain(DEFAULT_META_DESCRIPTION);
    expect(indexHtml).not.toMatch(/Committers/);
    expect(indexHtml).toContain("Commiters, Commiters Softwares");
  });
});
