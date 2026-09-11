import { COMMITERS_BRANDBOOK } from "./commitersBrandbook";

/** Commiters Brand Asset Kit — Pomelli Azure / Prussian / Chalk surfaces. */
export const BRAND_COLOR_KIT = {
  electricBlue: COMMITERS_BRANDBOOK.azureBlue,
  electricBlueBright: "#42A5F5",
  cyan: COMMITERS_BRANDBOOK.caribbeanGreen,
  cyanRgb: "0, 230, 118",
  gold: "#d4a017",
  goldBright: "#e5b82a",
  goldDeep: "#b38612",
  goldSoft: "#f4e4b5",
  navy: COMMITERS_BRANDBOOK.prussianBlue,
  slate: COMMITERS_BRANDBOOK.prussianBlue,
  offWhite: COMMITERS_BRANDBOOK.chalkWhite,
  lightGray: "#e8eef3",
} as const;

export const BRAND_COLOR_KIT_CSS_VARIABLES = {
  "--brand-cyan": BRAND_COLOR_KIT.cyan,
  "--brand-cyan-rgb": BRAND_COLOR_KIT.cyanRgb,
  "--electric-blue-bright": BRAND_COLOR_KIT.electricBlueBright,
  "--brand-gold-bright": BRAND_COLOR_KIT.goldBright,
  "--navy-950": BRAND_COLOR_KIT.navy,
  "--surface-navy": BRAND_COLOR_KIT.slate,
  "--surface-mist": BRAND_COLOR_KIT.offWhite,
  "--surface-slate": BRAND_COLOR_KIT.lightGray,
} as const;

export const BRAND_TECH_BADGE_CLASSES = "bg-cyan/10 text-cyan-400 border border-cyan/30" as const;
export const BRAND_CARD_HOVER_CLASSES = "hover:border-cyan/50 transition-all duration-300" as const;
