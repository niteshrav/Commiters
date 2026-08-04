import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { describe, expect, it } from "vitest";
import {
  WHATSAPP_FLOATING_ACTION_CLASS,
  resolveWhatsAppHref,
} from "./whatsappFloatingAction";
import { buildWhatsAppUrl } from "./siteContact";

const css = readFileSync(join(dirname(fileURLToPath(import.meta.url)), "..", "styles.css"), "utf8");

describe("whatsappFloatingAction", () => {
  it("falls back to the default wa.me link when CMS URL is empty", () => {
    expect(resolveWhatsAppHref("")).toBe(buildWhatsAppUrl());
    expect(resolveWhatsAppHref(undefined)).toBe(buildWhatsAppUrl());
  });

  it("uses CMS whatsapp URL when provided", () => {
    const custom = "https://wa.me/919999999999?text=Hi";
    expect(resolveWhatsAppHref(custom)).toBe(custom);
  });

  it("pins the floating action to the bottom-right of the viewport", () => {
    expect(css).toMatch(
      new RegExp(
        `\\.${WHATSAPP_FLOATING_ACTION_CLASS.replace(/-/g, "\\-")}[\\s\\S]*position:\\s*fixed[\\s\\S]*right:\\s*`,
      ),
    );
    expect(css).toMatch(
      new RegExp(
        `\\.${WHATSAPP_FLOATING_ACTION_CLASS.replace(/-/g, "\\-")}[\\s\\S]*bottom:\\s*`,
      ),
    );
  });
});
