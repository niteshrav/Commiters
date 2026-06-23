import { existsSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { describe, expect, it } from "vitest";
import {
  COMMITERS_HEADER_LOGO_ALT,
  COMMITERS_HEADER_LOGO_INTRINSIC_HEIGHT_PX,
  COMMITERS_HEADER_LOGO_INTRINSIC_WIDTH_PX,
  COMMITERS_HEADER_LOGO_SRC,
  COMMITERS_TAGLINE,
  RETIRED_GODADDY_IMAGE_PATHS,
} from "./siteBrand";

const publicLogoPath = join(dirname(fileURLToPath(import.meta.url)), "..", "..", "public", "assets", "commiters-header-logo.png");

describe("siteBrand", () => {
  it("points the header and footer at the bundled regenerated Commiters logo asset", () => {
    expect(COMMITERS_HEADER_LOGO_SRC).toBe("/assets/commiters-header-logo.png");
    expect(COMMITERS_HEADER_LOGO_ALT).toMatch(/Commiters/i);
    expect(existsSync(publicLogoPath)).toBe(true);
  });

  it("pins the wide horizontal logo dimensions for aspect-ratio sizing", () => {
    expect(COMMITERS_HEADER_LOGO_INTRINSIC_WIDTH_PX).toBe(548);
    expect(COMMITERS_HEADER_LOGO_INTRINSIC_HEIGHT_PX).toBe(151);
    expect(COMMITERS_HEADER_LOGO_INTRINSIC_WIDTH_PX / COMMITERS_HEADER_LOGO_INTRINSIC_HEIGHT_PX).toBeGreaterThan(3);
  });

  it("defines the tagline text carried inside the logo artwork", () => {
    expect(COMMITERS_TAGLINE).toBe("Commit. Code. Connect.");
  });

  it("lists retired GoDaddy stock image paths that must stay unused", () => {
    expect(RETIRED_GODADDY_IMAGE_PATHS).toContain("/assets/premium-hero.png");
    expect(RETIRED_GODADDY_IMAGE_PATHS).toContain("/assets/premium-contact.png");
  });
});
