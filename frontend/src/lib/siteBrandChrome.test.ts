import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { describe, expect, it } from "vitest";
import { DEFAULT_DOCUMENT_TITLE } from "./siteMeta";
import {
  BRAND_HERO_EYEBROW_CLASS,
  BRAND_HERO_EYEBROW_TEXT,
  BRAND_HERO_EYEBROW_WRAP_CLASS,
  DEFAULT_META_DESCRIPTION,
  FOOTER_BRAND_DESCRIPTION_CLASS,
  FOOTER_BRAND_STACK_CLASS,
  FOOTER_BRAND_TAGLINE_CHROME_CLASS,
  FOOTER_LOGO_IMG_CLASS,
  HEADER_BRAND_CLASS,
  HEADER_LOGO_IMG_CLASS,
  HEADER_LOGO_LINK_CLASS,
  HEADER_SHELL_CLASS,
} from "./siteBrandChrome";

const css = readFileSync(join(dirname(fileURLToPath(import.meta.url)), "..", "styles.css"), "utf8");

describe("siteBrandChrome", () => {
  it("defines the enterprise brand title, meta description, and hero eyebrow", () => {
    expect(DEFAULT_DOCUMENT_TITLE).toBe("Commiters — Enterprise AI & Cloud Systems");
    expect(DEFAULT_META_DESCRIPTION).toBe(
      "Commiters — Enterprise AI & Cloud Systems. Spec-driven engineering, custom AI pipelines, and enterprise software architectures.",
    );
    expect(BRAND_HERO_EYEBROW_TEXT).toBe("ENTERPRISE AI & CLOUD SYSTEMS");
    expect(BRAND_HERO_EYEBROW_WRAP_CLASS).toBe("flex justify-start items-start text-left mb-4");
    expect(BRAND_HERO_EYEBROW_WRAP_CLASS).not.toMatch(/justify-center|items-center|text-center|mx-auto/);
    expect(BRAND_HERO_EYEBROW_CLASS).toBe(
      "text-sm font-bold tracking-wide text-blue-600 uppercase bg-blue-50/80 px-3.5 py-1.5 rounded-full border border-blue-200 shadow-sm",
    );
    expect(HEADER_SHELL_CLASS).toBe(
      "sticky top-0 z-50 w-full border-b border-slate-200/80 bg-white/90 backdrop-blur-md transition-all duration-300 shadow-sm",
    );
    expect(HEADER_BRAND_CLASS).toBe("header-brand flex items-center h-full overflow-visible");
    expect(HEADER_LOGO_LINK_CLASS).toBe("flex items-center gap-3 shrink-0 overflow-visible");
    expect(HEADER_LOGO_IMG_CLASS).toBe("h-12 max-h-12");
    expect(FOOTER_BRAND_STACK_CLASS).toBe("flex flex-col items-start text-left space-y-3");
    expect(FOOTER_BRAND_TAGLINE_CHROME_CLASS).toBe("text-sm font-semibold text-slate-300 tracking-wide mt-1");
    expect(FOOTER_BRAND_DESCRIPTION_CLASS).toBe("text-xs text-slate-400 max-w-xs font-normal");
    expect(FOOTER_LOGO_IMG_CLASS).toBe("h-12");
    expect(css).toContain(".sticky {\n  position: sticky;");
    expect(css).toContain(".top-0 {\n  top: 0;");
    expect(css).toContain(".z-50 {\n  z-index: 50;");
    expect(css).toContain(".bg-white\\/90 {\n  background: rgb(255 255 255 / 0.9);");
  });
});
