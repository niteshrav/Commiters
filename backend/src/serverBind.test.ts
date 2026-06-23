import { afterEach, describe, expect, it } from "vitest";
import { getServerHost } from "./serverBind";

describe("getServerHost", () => {
  const originalHost = process.env.HOST;

  afterEach(() => {
    if (originalHost === undefined) delete process.env.HOST;
    else process.env.HOST = originalHost;
  });

  it("defaults to 0.0.0.0 so containers accept external traffic", () => {
    delete process.env.HOST;
    expect(getServerHost()).toBe("0.0.0.0");
  });

  it("honors HOST when provided", () => {
    process.env.HOST = "127.0.0.1";
    expect(getServerHost()).toBe("127.0.0.1");
  });
});
