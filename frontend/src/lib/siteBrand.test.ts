import { existsSync, readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { describe, expect, it } from "vitest";
import {
  COMMITERS_FOOTER_LOGO_SRC,
  COMMITERS_HEADER_LOGO_ALT,
  COMMITERS_HEADER_LOGO_INTRINSIC_HEIGHT_PX,
  COMMITERS_HEADER_LOGO_INTRINSIC_WIDTH_PX,
  COMMITERS_HEADER_LOGO_SRC,
  COMMITERS_LOGO_HORIZONTAL_SRC,
  COMMITERS_LOGO_MARK_SRC,
  COMMITERS_LOGO_PRIMARY_SRC,
  COMMITERS_LOGO_STACKED_SRC,
  COMMITERS_POSITIONING_TAGLINE,
  COMMITERS_TAGLINE,
  RETIRED_GODADDY_IMAGE_PATHS,
} from "./siteBrand";

const publicRoot = join(dirname(fileURLToPath(import.meta.url)), "..", "..", "public");

function pngColorType(href: string): number {
  const data = readFileSync(join(publicRoot, href.replace(/^\//, "")));
  return data[25] ?? -1;
}

describe("siteBrand", () => {
  it("allocates transparent PNG variants under /brand", () => {
    expect(COMMITERS_HEADER_LOGO_SRC).toBe("/brand/logo-horizontal.png");
    expect(COMMITERS_FOOTER_LOGO_SRC).toBe("/brand/logo-horizontal.png");
    expect(COMMITERS_LOGO_HORIZONTAL_SRC).toBe("/brand/logo-horizontal.png");
    expect(COMMITERS_LOGO_PRIMARY_SRC).toBe("/brand/logo-primary.png");
    expect(COMMITERS_LOGO_STACKED_SRC).toBe("/brand/logo-stacked.png");
    expect(COMMITERS_LOGO_MARK_SRC).toBe("/brand/logo-mark.png");
    expect(COMMITERS_HEADER_LOGO_ALT).toBe("Commiters — Enterprise AI & Cloud Systems");

    for (const href of [
      COMMITERS_LOGO_HORIZONTAL_SRC,
      COMMITERS_LOGO_PRIMARY_SRC,
      COMMITERS_LOGO_STACKED_SRC,
      COMMITERS_LOGO_MARK_SRC,
    ]) {
      expect(existsSync(join(publicRoot, href.replace(/^\//, "")))).toBe(true);
      expect(href.endsWith(".png")).toBe(true);
      expect(pngColorType(href)).toBe(6);
    }
  });

  it("pins the wide horizontal logo dimensions for aspect-ratio sizing", () => {
    expect(COMMITERS_HEADER_LOGO_INTRINSIC_WIDTH_PX).toBe(548);
    expect(COMMITERS_HEADER_LOGO_INTRINSIC_HEIGHT_PX).toBe(151);
    expect(COMMITERS_HEADER_LOGO_INTRINSIC_WIDTH_PX / COMMITERS_HEADER_LOGO_INTRINSIC_HEIGHT_PX).toBeGreaterThan(3);
  });

  it("keeps the artwork tagline and the enterprise positioning line distinct", () => {
    expect(COMMITERS_TAGLINE).toBe("Commit. Code. Connect.");
    expect(COMMITERS_POSITIONING_TAGLINE).toBe("Enterprise AI Products & Cloud-Native Web Systems");
  });

  it("lists retired GoDaddy stock image paths that must stay unused", () => {
    expect(RETIRED_GODADDY_IMAGE_PATHS).toContain("/assets/premium-hero.png");
    expect(RETIRED_GODADDY_IMAGE_PATHS).toContain("/assets/premium-contact.png");
  });
});
