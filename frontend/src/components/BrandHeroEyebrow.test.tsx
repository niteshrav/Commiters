import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import BrandHeroEyebrow from "./BrandHeroEyebrow";
import {
  BRAND_HERO_EYEBROW_CLASS,
  BRAND_HERO_EYEBROW_TESTID,
  BRAND_HERO_EYEBROW_TEXT,
  BRAND_HERO_EYEBROW_WRAP_CLASS,
} from "../lib/siteBrandChrome";

describe("BrandHeroEyebrow", () => {
  it("renders the enterprise AI eyebrow badge above hero headlines", () => {
    render(<BrandHeroEyebrow />);

    const wrap = screen.getByTestId(BRAND_HERO_EYEBROW_TESTID);
    expect(wrap).toHaveClass(...BRAND_HERO_EYEBROW_WRAP_CLASS.split(" "));
    expect(wrap.querySelector("span")).toHaveClass(...BRAND_HERO_EYEBROW_CLASS.split(" "));
    expect(wrap).toHaveTextContent(BRAND_HERO_EYEBROW_TEXT);
  });
});
