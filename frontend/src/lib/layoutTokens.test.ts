import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { SITE_CONTAINER_WIDTH_CSS, SITE_SIDE_GUTTER_CSS } from "./layoutTokens";

const css = readFileSync(join(dirname(fileURLToPath(import.meta.url)), "..", "styles.css"), "utf8");

describe("layoutTokens", () => {
  it("uses a full-width shell with a 5cm side gutter", () => {
    expect(css).toContain(`--max-width: ${SITE_CONTAINER_WIDTH_CSS}`);
    expect(css).toContain(`--site-gutter: ${SITE_SIDE_GUTTER_CSS}`);
    expect(css).toContain(".container {");
    expect(css).toMatch(/\.container\s*\{[^}]*width:\s*100%/);
    expect(css).not.toMatch(/\.container\s*\{[^}]*width:\s*min\([^)]*94%/);
  });
});
