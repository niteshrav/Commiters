import { readFileSync, readdirSync, statSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { RETIRED_GODADDY_IMAGE_PATHS } from "./siteBrand";

const __dirname = dirname(fileURLToPath(import.meta.url));
const frontendRoot = join(__dirname, "..", "..");
const srcRoot = join(frontendRoot, "src");
const publicAssets = join(frontendRoot, "public", "assets");

function walkTsFiles(dir: string): string[] {
  const entries = readdirSync(dir, { withFileTypes: true });
  return entries.flatMap((entry) => {
    const full = join(dir, entry.name);
    if (entry.isDirectory()) return walkTsFiles(full);
    if (/\.(tsx?|css|html)$/.test(entry.name)) return [full];
    return [];
  });
}

describe("noGodaddyImages", () => {
  it("does not ship retired GoDaddy PNG files under public/assets", () => {
    for (const retired of RETIRED_GODADDY_IMAGE_PATHS) {
      const filename = retired.replace("/assets/", "");
      const full = join(publicAssets, filename);
      expect(() => statSync(full)).toThrow();
    }
  });

  it("does not reference retired GoDaddy image paths in source", () => {
    const files = [...walkTsFiles(srcRoot), join(frontendRoot, "index.html")].filter(
      (f) => !/\.test\.(t|j)sx?$/.test(f) && !/siteBrand\.ts$/.test(f),
    );
    const combined = files.map((f) => readFileSync(f, "utf8")).join("\n");
    for (const retired of RETIRED_GODADDY_IMAGE_PATHS) {
      expect(combined).not.toContain(retired);
    }
  });
});
