export type RobotsRule = {
  type: "allow" | "disallow";
  path: string;
};

export type RobotsPolicy = {
  sourceStatus: number;
  blocked: boolean;
  reason: string;
  rules: RobotsRule[];
  /** Unsupported: Crawl-delay, Sitemap, Host, wildcard path globs besides prefix, Request-rate. */
};

export const UNSUPPORTED_ROBOTS_DIRECTIVES = [
  "Crawl-delay",
  "Sitemap",
  "Host",
  "Request-rate",
  "Noindex",
  "wildcard path globs (* and $) beyond prefix matching",
] as const;

function decodePath(value: string): string {
  try {
    return decodeURIComponent(value);
  } catch {
    return value;
  }
}

export function parseRobotsTxt(text: string, userAgent: string): RobotsRule[] {
  const ua = userAgent.toLowerCase();
  const groups: Array<{ agents: string[]; rules: RobotsRule[] }> = [];
  let current: { agents: string[]; rules: RobotsRule[] } | null = null;

  for (const rawLine of text.split(/\r?\n/)) {
    const line = rawLine.replace(/#.*$/, "").trim();
    if (!line) continue;
    const colon = line.indexOf(":");
    if (colon === -1) continue;
    const field = line.slice(0, colon).trim().toLowerCase();
    const value = line.slice(colon + 1).trim();

    if (field === "user-agent") {
      if (!current || current.rules.length > 0 || current.agents.length === 0) {
        current = { agents: [], rules: [] };
        groups.push(current);
      }
      current.agents.push(value.toLowerCase());
      continue;
    }

    if (!current) continue;
    if (field === "allow" || field === "disallow") {
      current.rules.push({ type: field, path: decodePath(value) });
    }
  }

  const specific = groups.find((group) => group.agents.some((agent) => ua.startsWith(agent) && agent !== "*"));
  const wildcard = groups.filter((group) => group.agents.includes("*"));
  const selected = specific ?? wildcard[wildcard.length - 1];
  return selected?.rules ?? [];
}

export function isPathAllowed(pathname: string, rules: RobotsRule[]): boolean {
  let matched: RobotsRule | null = null;
  for (const rule of rules) {
    if (!rule.path && rule.type === "disallow") {
      continue;
    }
    if (pathname.startsWith(rule.path)) {
      if (!matched || rule.path.length >= matched.path.length) {
        matched = rule;
      }
    }
  }
  if (!matched) return true;
  return matched.type === "allow";
}

export function robotsPolicyFromResponse(status: number, body: string, userAgent: string): RobotsPolicy {
  if (status === 401 || status === 403) {
    return {
      sourceStatus: status,
      blocked: true,
      reason: `robots.txt returned ${status}; crawling this origin is blocked.`,
      rules: [],
    };
  }
  if (status === 404 || status === 410) {
    return { sourceStatus: status, blocked: false, reason: "", rules: [] };
  }
  if (status >= 400) {
    return {
      sourceStatus: status,
      blocked: false,
      reason: `robots.txt returned ${status}; treating as allow.`,
      rules: [],
    };
  }
  return {
    sourceStatus: status,
    blocked: false,
    reason: "",
    rules: parseRobotsTxt(body, userAgent),
  };
}
