import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { SITE_CONTAINER_WIDTH_CSS, SITE_CONTENT_MAX_WIDTH_PX } from "./layoutTokens";

const css = readFileSync(join(dirname(fileURLToPath(import.meta.url)), "..", "styles.css"), "utf8");

describe("layoutTokens", () => {
  it("targets a wide content column that uses most of the viewport", () => {
    expect(SITE_CONTENT_MAX_WIDTH_PX).toBeGreaterThanOrEqual(1320);
    expect(css).toContain(`--max-width: ${SITE_CONTENT_MAX_WIDTH_PX}px`);
    expect(css).toContain(`width: ${SITE_CONTAINER_WIDTH_CSS}`);
    expect(css).not.toMatch(/\.container\s*\{[^}]*width:\s*min\([^)]*94%/);
  });
});
