import { existsSync, readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { describe, expect, it } from "vitest";
import {
  SITE_APPLE_TOUCH_ICON_HREF,
  SITE_FAVICON_16_HREF,
  SITE_FAVICON_32_HREF,
  SITE_FAVICON_HREF,
  SITE_FAVICON_TYPE,
} from "./siteIcons";

const frontendRoot = join(dirname(fileURLToPath(import.meta.url)), "..", "..");
const publicRoot = join(frontendRoot, "public");
const indexHtml = readFileSync(join(frontendRoot, "index.html"), "utf8");

describe("siteIcons", () => {
  it("ships the Commiters eagle PNG for tab, bookmark, and touch icons", () => {
    for (const href of [SITE_FAVICON_HREF, SITE_FAVICON_32_HREF, SITE_FAVICON_16_HREF, SITE_APPLE_TOUCH_ICON_HREF]) {
      expect(existsSync(join(publicRoot, href.replace(/^\//, "")))).toBe(true);
    }
  });

  it("wires favicon and apple-touch-icon links in index.html", () => {
    expect(indexHtml).toContain(`rel="icon" type="${SITE_FAVICON_TYPE}" href="${SITE_FAVICON_HREF}"`);
    expect(indexHtml).toContain(`rel="icon" type="${SITE_FAVICON_TYPE}" sizes="32x32" href="${SITE_FAVICON_32_HREF}"`);
    expect(indexHtml).toContain(`rel="icon" type="${SITE_FAVICON_TYPE}" sizes="16x16" href="${SITE_FAVICON_16_HREF}"`);
    expect(indexHtml).toContain(`rel="apple-touch-icon" href="${SITE_APPLE_TOUCH_ICON_HREF}"`);
    expect(indexHtml).not.toContain("favicon.svg");
  });
});
