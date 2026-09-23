import { describe, expect, it } from "vitest";
import { assertPublicHttpUrl, isBlockedHostname, isPrivateIPv4, isPrivateIPv6 } from "./ssrf";

describe("ssrf", () => {
  it("blocks localhost and loopback hostnames", () => {
    expect(isBlockedHostname("localhost")).toBe(true);
    expect(isBlockedHostname("127.0.0.1")).toBe(true);
    expect(isBlockedHostname("0.0.0.0")).toBe(true);
    expect(isBlockedHostname("::1")).toBe(true);
  });

  it("blocks private IPv4 ranges", () => {
    expect(isPrivateIPv4("10.0.0.8")).toBe(true);
    expect(isPrivateIPv4("192.168.1.20")).toBe(true);
    expect(isPrivateIPv4("172.16.0.1")).toBe(true);
    expect(isPrivateIPv4("169.254.1.1")).toBe(true);
    expect(isPrivateIPv4("8.8.8.8")).toBe(false);
  });

  it("blocks private IPv6 and link-local", () => {
    expect(isPrivateIPv6("fc00::1")).toBe(true);
    expect(isPrivateIPv6("fe80::1")).toBe(true);
    expect(isPrivateIPv6("::ffff:127.0.0.1")).toBe(true);
  });

  it("rejects credentials and redirect-to-private via lookup", async () => {
    await expect(assertPublicHttpUrl("https://user:pass@example.com")).rejects.toThrow(/credentials/);
    await expect(
      assertPublicHttpUrl("https://example.com", async () => ({ address: "127.0.0.1", family: 4 })),
    ).rejects.toThrow(/private/);
    await expect(
      assertPublicHttpUrl("https://ok.example", async () => ({ address: "1.1.1.1", family: 4 })),
    ).resolves.toBeInstanceOf(URL);
  });
});
