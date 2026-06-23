import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const css = readFileSync(join(dirname(fileURLToPath(import.meta.url)), "..", "styles.css"), "utf8");

function ruleBlock(selector: string, nextSelector: string): string {
  const start = css.indexOf(selector);
  expect(start).toBeGreaterThan(-1);
  const next = css.indexOf(nextSelector, start + selector.length);
  return css.slice(start, next);
}

describe("aboutFounderSocial (styles contract)", () => {
  it("spaces LinkedIn and GitHub links below the founder tagline", () => {
    const row = ruleBlock(".founder-social-row {", ".founder-social-link {");
    expect(row).toMatch(/display:\s*flex/);
    expect(row).toMatch(/gap:\s*\d+px/);
    expect(row).toMatch(/justify-content:\s*center/);
    const link = ruleBlock(".founder-social-link {", ".nav-primary-link {");
    expect(link).toMatch(/display:\s*inline-flex/);
    expect(link).toMatch(/gap:\s*\d+px/);
  });
});
