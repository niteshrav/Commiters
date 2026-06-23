import { describe, expect, it } from "vitest";
import {
  HOME_TECH_STACK_ITEMS,
  HOME_TECH_STACK_ROWS,
  TECH_LOCAL_ICONS,
  resolveTechIconUrl,
} from "./homeTechStack";

describe("homeTechStack", () => {
  it("exposes a flat items list matching stacked rows", () => {
    expect(HOME_TECH_STACK_ITEMS).toEqual(HOME_TECH_STACK_ROWS.flat());
    expect(HOME_TECH_STACK_ITEMS).toHaveLength(17);
  });

  it("uses bundled Cursor and Visual Studio logo assets", () => {
    const cursor = HOME_TECH_STACK_ITEMS.find((t) => t.alt === "Cursor");
    const vs = HOME_TECH_STACK_ITEMS.find((t) => t.alt === "Visual Studio");
    expect(cursor?.iconSrc).toBe(TECH_LOCAL_ICONS.cursor);
    expect(vs?.iconSrc).toBe(TECH_LOCAL_ICONS.visualStudio);
    expect(resolveTechIconUrl(cursor!)).toBe(TECH_LOCAL_ICONS.cursor);
    expect(resolveTechIconUrl(vs!)).toBe(TECH_LOCAL_ICONS.visualStudio);
  });

  it("includes Python, Google stack, Claude, and Antigravity entries", () => {
    const flat = HOME_TECH_STACK_ROWS.flat();
    expect(flat.some((t) => t.alt === "Python")).toBe(true);
    expect(flat.some((t) => t.alt === "Google ADK")).toBe(true);
    expect(flat.some((t) => t.alt === "Claude")).toBe(true);
    expect(flat.some((t) => t.alt === "Antigravity")).toBe(true);
  });

  it("defines logos with no AWS entry", () => {
    const flat = HOME_TECH_STACK_ROWS.flat();
    expect(flat.some((t) => t.slug.toLowerCase() === "amazonaws")).toBe(false);
  });
});
