import { describe, expect, it } from "vitest";
import { ROUTES } from "./routes";
import {
  STUDIO_PRODUCTS,
  SYNAPSE_LIVE_URL,
  SYNAPSE_PRODUCT,
  TERMINAL_LIVE_URL,
  TERMINAL_PRODUCT,
} from "./studioProducts";

describe("studioProducts", () => {
  it("defines Synapse and Terminal as Commiters studio products", () => {
    expect(STUDIO_PRODUCTS.map((product) => product.name)).toEqual(["Synapse", "Terminal"]);
    expect(SYNAPSE_PRODUCT.route).toBe(ROUTES.synapse);
    expect(TERMINAL_PRODUCT.route).toBe(ROUTES.terminal);
    expect(SYNAPSE_PRODUCT.features.length).toBeGreaterThan(2);
    expect(TERMINAL_PRODUCT.features.length).toBeGreaterThan(2);
    expect(SYNAPSE_PRODUCT.primaryCta.to).toBe(ROUTES.contact);
    expect(TERMINAL_PRODUCT.primaryCta.to).toBe(ROUTES.contact);
    expect(SYNAPSE_PRODUCT.liveDemo.href).toBe(SYNAPSE_LIVE_URL);
    expect(TERMINAL_PRODUCT.liveDemo.href).toBe(TERMINAL_LIVE_URL);
    expect(SYNAPSE_PRODUCT.headline).toBe("The company's single source of truth.");
    expect(TERMINAL_PRODUCT.headline).toBe("Hire like we ship. Teach like we review.");
  });
});
