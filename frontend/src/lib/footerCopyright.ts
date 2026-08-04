/** Leading copyright mark linked to the staff admin panel. */
export const FOOTER_COPYRIGHT_STAFF_LINK_CLASS = "footer-copyright-staff-link" as const;
export const FOOTER_STAFF_LOGIN_ARIA_LABEL = "Staff login" as const;

const COPYRIGHT_SYMBOL = /^(\u00A9|\u00a9|\(c\)|\(C\))\s*/;

export type CopyrightLineParts = {
  symbol: string | null;
  remainder: string;
};

export function splitCopyrightLine(copyrightLine: string): CopyrightLineParts {
  const trimmed = copyrightLine.trim();
  const match = trimmed.match(COPYRIGHT_SYMBOL);
  if (!match) {
    return { symbol: null, remainder: trimmed };
  }
  return {
    symbol: match[1] === "(c)" || match[1] === "(C)" ? match[1] : "\u00A9",
    remainder: trimmed.slice(match[0].length),
  };
}
