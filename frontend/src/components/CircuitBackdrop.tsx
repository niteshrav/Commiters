import React from "react";
import { LOGO_THEME } from "../lib/themeColors";

/**
 * Subtle full-page circuit motif echoing the logo — reduces text-only feel without stock photos.
 */
export default function CircuitBackdrop() {
  return (
    <div className="circuit-backdrop" data-testid="circuit-backdrop" aria-hidden>
      <svg className="circuit-backdrop-svg" viewBox="0 0 1200 800" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="circuit-gold" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor={LOGO_THEME.brandGold} stopOpacity="0.35" />
            <stop offset="100%" stopColor={LOGO_THEME.brandGoldSoft} stopOpacity="0.08" />
          </linearGradient>
        </defs>
        <g fill="none" strokeWidth="1.2" strokeLinecap="round">
          <path
            d="M40 120 H220 L280 180 H480 L540 120 H760 L820 200 H1040"
            stroke={LOGO_THEME.brandGold}
            strokeOpacity="0.22"
          />
          <path
            d="M80 420 H300 L360 360 H580 L640 440 H900 L960 380 H1120"
            stroke={LOGO_THEME.teal}
            strokeOpacity="0.18"
          />
          <path
            d="M120 640 H340 L400 580 H620 L680 660 H920"
            stroke="url(#circuit-gold)"
            strokeOpacity="0.28"
          />
        </g>
        {[
          [220, 120],
          [480, 180],
          [760, 120],
          [300, 420],
          [580, 360],
          [900, 440],
          [340, 640],
          [620, 660],
        ].map(([cx, cy]) => (
          <circle key={`${cx}-${cy}`} cx={cx} cy={cy} r="4" fill={LOGO_THEME.teal} fillOpacity="0.35" />
        ))}
        {[
          [40, 120],
          [1040, 200],
          [80, 420],
          [1120, 380],
        ].map(([cx, cy]) => (
          <circle key={`n-${cx}-${cy}`} cx={cx} cy={cy} r="3" fill={LOGO_THEME.brandGold} fillOpacity="0.4" />
        ))}
      </svg>
    </div>
  );
}
