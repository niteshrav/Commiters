import { readFileSync, readdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const srcRoot = join(dirname(fileURLToPath(import.meta.url)), "..");

function sourceFiles(): string[] {
  const out: string[] = [];
  function walk(dir: string) {
    for (const entry of readdirSync(dir, { withFileTypes: true })) {
      const full = join(dir, entry.name);
      if (entry.isDirectory()) {
        if (entry.name === "node_modules") continue;
        walk(full);
        continue;
      }
      if (/\.(tsx?)$/.test(entry.name) && !entry.name.endsWith(".test.ts") && !entry.name.endsWith(".test.tsx")) {
        out.push(full);
      }
    }
  }
  walk(srcRoot);
  return out.filter((f) => !f.endsWith("BrandTagline.tsx"));
}

describe("taglinePlacement", () => {
  it("does not render duplicate text taglines in layout chrome (tagline is in the logo image)", () => {
    const combined = sourceFiles().map((f) => readFileSync(f, "utf8")).join("\n");
    expect(combined).not.toMatch(/import\s+BrandTagline\s+from/);
    expect(combined).not.toMatch(/<BrandTagline/);
    expect(combined).not.toMatch(/BrandLockup/);
  });
});
