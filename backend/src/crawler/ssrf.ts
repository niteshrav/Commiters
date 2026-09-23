import { lookup as dnsLookup } from "node:dns/promises";
import { isIP } from "node:net";
import { hasUrlCredentials, isHttpProtocol } from "./urlPolicy";

export type HostLookup = (hostname: string) => Promise<{ address: string; family: number }>;

const BLOCKED_HOSTNAMES = new Set([
  "localhost",
  "localhost.localdomain",
  "ip6-localhost",
  "ip6-loopback",
  "metadata.google.internal",
]);

function ipv4ToInt(address: string): number | null {
  const parts = address.split(".");
  if (parts.length !== 4) return null;
  const nums = parts.map((part) => Number(part));
  if (nums.some((n) => !Number.isInteger(n) || n < 0 || n > 255)) return null;
  return ((nums[0]! << 24) | (nums[1]! << 16) | (nums[2]! << 8) | nums[3]!) >>> 0;
}

function inCidr(address: string, cidr: string): boolean {
  const [base, bitsRaw] = cidr.split("/");
  const bits = Number(bitsRaw);
  const ip = ipv4ToInt(address);
  const network = ipv4ToInt(base ?? "");
  if (ip === null || network === null || !Number.isInteger(bits)) return false;
  const mask = bits === 0 ? 0 : (~0 << (32 - bits)) >>> 0;
  return (ip & mask) === (network & mask);
}

export function isPrivateIPv4(address: string): boolean {
  return (
    inCidr(address, "0.0.0.0/8") ||
    inCidr(address, "10.0.0.0/8") ||
    inCidr(address, "100.64.0.0/10") ||
    inCidr(address, "127.0.0.0/8") ||
    inCidr(address, "169.254.0.0/16") ||
    inCidr(address, "172.16.0.0/12") ||
    inCidr(address, "192.168.0.0/16") ||
    inCidr(address, "198.18.0.0/15") ||
    inCidr(address, "224.0.0.0/4") ||
    inCidr(address, "240.0.0.0/4")
  );
}

export function isPrivateIPv6(address: string): boolean {
  const value = address.toLowerCase();
  if (value === "::" || value === "::1") return true;
  if (value.startsWith("fe80:") || value.startsWith("fec0:")) return true;
  if (value.startsWith("fc") || value.startsWith("fd")) return true;
  if (value.startsWith("ff")) return true;
  const mapped = value.match(/^::ffff:(\d+\.\d+\.\d+\.\d+)$/);
  if (mapped) return isPrivateIPv4(mapped[1]!);
  return false;
}

export function isBlockedHostname(hostname: string): boolean {
  const host = hostname.replace(/^\[|\]$/g, "").toLowerCase();
  if (BLOCKED_HOSTNAMES.has(host) || host.endsWith(".localhost") || host.endsWith(".local")) {
    return true;
  }
  const ipVersion = isIP(host);
  if (ipVersion === 4) return isPrivateIPv4(host);
  if (ipVersion === 6) return isPrivateIPv6(host);
  return false;
}

export function isPrivateAddress(address: string, family: number): boolean {
  if (family === 6 || address.includes(":")) return isPrivateIPv6(address);
  return isPrivateIPv4(address);
}

export async function assertPublicHttpUrl(
  raw: string,
  lookup: HostLookup = (hostname) => dnsLookup(hostname, { all: false }),
): Promise<URL> {
  let url: URL;
  try {
    url = new URL(raw);
  } catch {
    throw new Error("Invalid URL.");
  }

  if (!isHttpProtocol(url)) {
    throw new Error("Only HTTP and HTTPS URLs are allowed.");
  }
  if (hasUrlCredentials(url)) {
    throw new Error("URLs with credentials are not allowed.");
  }
  if (isBlockedHostname(url.hostname)) {
    throw new Error("Crawling private or local addresses is not allowed.");
  }

  const resolved = await lookup(url.hostname.replace(/^\[|\]$/g, ""));
  if (isPrivateAddress(resolved.address, resolved.family)) {
    throw new Error("Crawling private or local addresses is not allowed.");
  }

  return url;
}
