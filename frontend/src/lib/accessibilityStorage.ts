export const ACCESSIBILITY_STORAGE_KEY = "commiters-accessibility-settings" as const;
export const ACCESSIBILITY_SETTINGS_VERSION = 1 as const;

export type AccessibilityTextSize = "default" | "large" | "xlarge";

export type AccessibilitySettings = {
  textSize: AccessibilityTextSize;
  highContrast: boolean;
  underlineLinks: boolean;
  reduceMotion: boolean;
};

export type AccessibilitySettingsRecord = {
  version: typeof ACCESSIBILITY_SETTINGS_VERSION;
  updatedAt: string;
  settings: AccessibilitySettings;
};

export const DEFAULT_ACCESSIBILITY_SETTINGS: AccessibilitySettings = {
  textSize: "default",
  highContrast: false,
  underlineLinks: false,
  reduceMotion: false,
};

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}

export function isAccessibilityTextSize(value: unknown): value is AccessibilityTextSize {
  return value === "default" || value === "large" || value === "xlarge";
}

export function isAccessibilitySettings(value: unknown): value is AccessibilitySettings {
  if (!isRecord(value)) return false;

  return (
    isAccessibilityTextSize(value.textSize) &&
    typeof value.highContrast === "boolean" &&
    typeof value.underlineLinks === "boolean" &&
    typeof value.reduceMotion === "boolean"
  );
}

export function isAccessibilitySettingsRecord(value: unknown): value is AccessibilitySettingsRecord {
  if (!isRecord(value)) return false;

  return (
    value.version === ACCESSIBILITY_SETTINGS_VERSION &&
    typeof value.updatedAt === "string" &&
    isAccessibilitySettings(value.settings)
  );
}

export function createAccessibilitySettingsRecord(settings: AccessibilitySettings): AccessibilitySettingsRecord {
  return {
    version: ACCESSIBILITY_SETTINGS_VERSION,
    updatedAt: new Date().toISOString(),
    settings,
  };
}

export function readAccessibilitySettings(storage: Storage | null = getBrowserStorage()): AccessibilitySettingsRecord | null {
  if (!storage) return null;

  try {
    const raw = storage.getItem(ACCESSIBILITY_STORAGE_KEY);
    if (!raw) return null;

    const parsed: unknown = JSON.parse(raw);
    return isAccessibilitySettingsRecord(parsed) ? parsed : null;
  } catch {
    return null;
  }
}

export function writeAccessibilitySettings(
  settings: AccessibilitySettings,
  storage: Storage | null = getBrowserStorage(),
): AccessibilitySettingsRecord | null {
  if (!storage) return null;

  const record = createAccessibilitySettingsRecord(settings);
  storage.setItem(ACCESSIBILITY_STORAGE_KEY, JSON.stringify(record));
  applyAccessibilitySettings(settings);
  return record;
}

export function clearAccessibilitySettings(storage: Storage | null = getBrowserStorage()): void {
  storage?.removeItem(ACCESSIBILITY_STORAGE_KEY);
  applyAccessibilitySettings(DEFAULT_ACCESSIBILITY_SETTINGS);
}

export function applyAccessibilitySettings(
  settings: AccessibilitySettings,
  root: HTMLElement = document.documentElement,
): void {
  root.dataset.a11yTextSize = settings.textSize;
  root.dataset.a11yHighContrast = settings.highContrast ? "true" : "false";
  root.dataset.a11yUnderlineLinks = settings.underlineLinks ? "true" : "false";
  root.dataset.a11yReduceMotion = settings.reduceMotion ? "true" : "false";
}

function getBrowserStorage(): Storage | null {
  if (typeof window === "undefined") return null;

  try {
    return window.localStorage;
  } catch {
    return null;
  }
}
