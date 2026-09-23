import { setDefaultResultOrder } from "node:dns";
import { getCACertificates, setDefaultCACertificates } from "node:tls";
import { CRAWLER_USER_AGENT, CRAWL_HARD_MAX } from "./limits";
import { assertPublicHttpUrl, type HostLookup } from "./ssrf";
import type { FetchResult } from "./types";

let systemCaReady = false;

function enableSystemCertificates(): void {
  if (systemCaReady) return;
  systemCaReady = true;
  try {
    setDefaultResultOrder("ipv4first");
  } catch {
    // Node without dns result-order support.
  }
  try {
    setDefaultCACertificates([...getCACertificates(), ...getCACertificates("system")]);
  } catch {
    // Node without system CA merge support.
  }
}

function networkErrorMessage(error: unknown): string {
  if (error instanceof Error && error.name === "AbortError") return "Request timed out.";
  const cause = error instanceof Error && "cause" in error ? error.cause : undefined;
  const causeMessage = cause instanceof Error ? cause.message : "";
  if (causeMessage) return `Network error: ${causeMessage}`;
  if (error instanceof Error && error.message) return `Network error: ${error.message}`;
  return "Network error.";
}

export class CrawlHttpError extends Error {
  constructor(
    message: string,
    readonly status: number | null = null,
    readonly retryable = false,
  ) {
    super(message);
    this.name = "CrawlHttpError";
  }
}

export type FetchPageFn = (url: string, timeoutMs: number) => Promise<FetchResult>;

function isRedirect(status: number): boolean {
  return status === 301 || status === 302 || status === 303 || status === 307 || status === 308;
}

export function createFetchPage(lookup?: HostLookup): FetchPageFn {
  enableSystemCertificates();
  return async function fetchPage(url: string, timeoutMs: number): Promise<FetchResult> {
    let current = url;
    for (let hop = 0; hop <= CRAWL_HARD_MAX.redirectHops; hop += 1) {
      await assertPublicHttpUrl(current, lookup);
      const controller = new AbortController();
      const timer = setTimeout(() => controller.abort(), timeoutMs);
      let response: Response;
      try {
        response = await fetch(current, {
          method: "GET",
          redirect: "manual",
          headers: {
            Accept: "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
            "User-Agent": CRAWLER_USER_AGENT,
          },
          signal: controller.signal,
        });
      } catch (error) {
        const aborted = error instanceof Error && error.name === "AbortError";
        throw new CrawlHttpError(networkErrorMessage(error), null, true);
      } finally {
        clearTimeout(timer);
      }

      if (isRedirect(response.status)) {
        const location = response.headers.get("location");
        if (!location) {
          throw new CrawlHttpError(`Redirect ${response.status} missing Location.`, response.status, false);
        }
        try {
          current = new URL(location, current).toString();
        } catch {
          throw new CrawlHttpError("Invalid redirect location.", response.status, false);
        }
        continue;
      }

      const body = await response.text();
      return {
        finalUrl: current,
        status: response.status,
        contentType: response.headers.get("content-type") ?? "",
        body,
      };
    }

    throw new CrawlHttpError("Too many redirects.", null, false);
  };
}

export function isRetryableStatus(status: number): boolean {
  return status === 408 || status === 429 || status >= 500;
}
