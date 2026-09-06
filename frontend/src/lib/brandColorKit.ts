/** Commiters Brand Asset Kit — electric blue, cyan, gold, navy, and light surfaces. */
export const BRAND_COLOR_KIT = {
  electricBlue: "#0066ff",
  electricBlueBright: "#0088ff",
  cyan: "#00c2ff",
  cyanRgb: "0, 194, 255",
  gold: "#d4a017",
  goldBright: "#e5b82a",
  goldDeep: "#b38612",
  goldSoft: "#f4e4b5",
  navy: "#0a0e17",
  slate: "#0f172a",
  offWhite: "#f8fafc",
  lightGray: "#f1f5f9",
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
