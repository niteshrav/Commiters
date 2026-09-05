import { describe, expect, it } from "vitest";
import { FROSTED_GLASS_CLASS_NAME, FROSTED_GLASS_CLASSES } from "./frostedGlass";

describe("frostedGlass", () => {
  it("exposes the frosted-glass utility class contract", () => {
    expect([...FROSTED_GLASS_CLASSES]).toEqual([
      "backdrop-blur-md",
      "bg-white/80",
      "dark:bg-slate-900/80",
      "border",
      "border-slate-200/50",
      "dark:border-slate-800/50",
    ]);
    expect(FROSTED_GLASS_CLASS_NAME).toBe(FROSTED_GLASS_CLASSES.join(" "));
  });
});
