import React, { useId } from "react";
import { LOGO_THEME } from "../lib/themeColors";

export type SectionFigurePattern = "layers" | "constellation" | "wave";

type Props = {
  pattern: SectionFigurePattern;
  className?: string;
};

const BRAND_STROKE = LOGO_THEME.teal;
const BRAND_FILL_DEEP = LOGO_THEME.brandGold;
const BRAND_SURFACE = LOGO_THEME.white;

/**
 * Abstract, premium section art using logo gold and blue — no stock photography URLs.
 */
export default function SectionFigure({ pattern, className }: Props) {
  const uid = useId().replace(/:/g, "");
  const gid = `sf-grad-${pattern}-${uid}`;

  return (
    <div
      className={["section-figure", `section-figure--${pattern}`, className ?? ""].filter(Boolean).join(" ")}
      data-testid={`section-figure-${pattern}`}
      role="presentation"
    >
      {pattern === "layers" ? (
        <svg viewBox="0 0 120 72" xmlns="http://www.w3.org/2000/svg" aria-hidden focusable="false">
          <defs>
            <linearGradient id={gid} x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor={BRAND_STROKE} stopOpacity="0.22" />
              <stop offset="100%" stopColor={BRAND_FILL_DEEP} stopOpacity="0.06" />
            </linearGradient>
          </defs>
          <rect x="10" y="28" width="100" height="36" rx="12" fill={`url(#${gid})`} stroke={BRAND_STROKE} strokeOpacity="0.18" />
          <rect x="22" y="14" width="76" height="32" rx="10" fill={BRAND_SURFACE} fillOpacity="0.55" stroke={BRAND_STROKE} strokeOpacity="0.16" />
          <rect x="34" y="4" width="52" height="26" rx="8" fill={BRAND_SURFACE} fillOpacity="0.75" stroke={BRAND_STROKE} strokeOpacity="0.14" />
        </svg>
      ) : null}
      {pattern === "constellation" ? (
        <svg viewBox="0 0 120 72" xmlns="http://www.w3.org/2000/svg" aria-hidden focusable="false">
          <g stroke={BRAND_STROKE} strokeOpacity="0.35" strokeWidth="1.2" strokeLinecap="round">
            <line x1="18" y1="48" x2="52" y2="22" />
            <line x1="52" y1="22" x2="92" y2="38" />
            <line x1="52" y1="22" x2="58" y2="56" />
            <line x1="92" y1="38" x2="102" y2="18" />
          </g>
          <circle cx="18" cy="48" r="3.5" fill={BRAND_FILL_DEEP} fillOpacity="0.35" />
          <circle cx="52" cy="22" r="4" fill={BRAND_STROKE} fillOpacity="0.45" />
          <circle cx="92" cy="38" r="3.5" fill={BRAND_FILL_DEEP} fillOpacity="0.32" />
          <circle cx="58" cy="56" r="2.8" fill={BRAND_STROKE} fillOpacity="0.28" />
          <circle cx="102" cy="18" r="2.8" fill={BRAND_FILL_DEEP} fillOpacity="0.3" />
        </svg>
      ) : null}
      {pattern === "wave" ? (
        <svg viewBox="0 0 120 56" xmlns="http://www.w3.org/2000/svg" aria-hidden focusable="false">
          <defs>
            <linearGradient id={`${gid}-w`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={BRAND_STROKE} stopOpacity="0.2" />
              <stop offset="100%" stopColor={BRAND_FILL_DEEP} stopOpacity="0.04" />
            </linearGradient>
          </defs>
          <path
            d="M0 38 C20 18 40 52 60 34 S100 14 120 30 L120 56 L0 56 Z"
            fill={`url(#${gid}-w)`}
            stroke={BRAND_STROKE}
            strokeOpacity="0.2"
            strokeWidth="1"
          />
        </svg>
      ) : null}
    </div>
  );
}
