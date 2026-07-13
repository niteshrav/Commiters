import React, {
  PropsWithChildren,
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import {
  DEFAULT_ACCESSIBILITY_SETTINGS,
  type AccessibilitySettings,
  type AccessibilityTextSize,
  applyAccessibilitySettings,
  readAccessibilitySettings,
  writeAccessibilitySettings,
} from "../lib/accessibilityStorage";

type AccessibilityContextValue = {
  settings: AccessibilitySettings;
  panelOpen: boolean;
  openPanel: () => void;
  closePanel: () => void;
  togglePanel: () => void;
  setTextSize: (textSize: AccessibilityTextSize) => void;
  setHighContrast: (enabled: boolean) => void;
  setUnderlineLinks: (enabled: boolean) => void;
  setReduceMotion: (enabled: boolean) => void;
  resetSettings: () => void;
};

const AccessibilityContext = createContext<AccessibilityContextValue | null>(null);

export function AccessibilityProvider({ children }: PropsWithChildren) {
  const [storedRecord, setStoredRecord] = useState(() => readAccessibilitySettings());
  const [settings, setSettings] = useState<AccessibilitySettings>(
    () => storedRecord?.settings ?? DEFAULT_ACCESSIBILITY_SETTINGS,
  );
  const [panelOpen, setPanelOpen] = useState(false);

  useEffect(() => {
    applyAccessibilitySettings(settings);
  }, [settings]);

  const persistSettings = useCallback((nextSettings: AccessibilitySettings) => {
    setSettings(nextSettings);
    setStoredRecord(writeAccessibilitySettings(nextSettings));
  }, []);

  const updateSettings = useCallback(
    (updater: (current: AccessibilitySettings) => AccessibilitySettings) => {
      setSettings((current) => {
        const nextSettings = updater(current);
        setStoredRecord(writeAccessibilitySettings(nextSettings));
        return nextSettings;
      });
    },
    [],
  );

  const setTextSize = useCallback(
    (textSize: AccessibilityTextSize) => {
      updateSettings((current) => ({ ...current, textSize }));
    },
    [updateSettings],
  );

  const setHighContrast = useCallback(
    (enabled: boolean) => {
      updateSettings((current) => ({ ...current, highContrast: enabled }));
    },
    [updateSettings],
  );

  const setUnderlineLinks = useCallback(
    (enabled: boolean) => {
      updateSettings((current) => ({ ...current, underlineLinks: enabled }));
    },
    [updateSettings],
  );

  const setReduceMotion = useCallback(
    (enabled: boolean) => {
      updateSettings((current) => ({ ...current, reduceMotion: enabled }));
    },
    [updateSettings],
  );

  const resetSettings = useCallback(() => {
    persistSettings(DEFAULT_ACCESSIBILITY_SETTINGS);
  }, [persistSettings]);

  const openPanel = useCallback(() => setPanelOpen(true), []);
  const closePanel = useCallback(() => setPanelOpen(false), []);
  const togglePanel = useCallback(() => setPanelOpen((open) => !open), []);

  const value = useMemo<AccessibilityContextValue>(
    () => ({
      settings,
      panelOpen,
      openPanel,
      closePanel,
      togglePanel,
      setTextSize,
      setHighContrast,
      setUnderlineLinks,
      setReduceMotion,
      resetSettings,
    }),
    [
      settings,
      panelOpen,
      openPanel,
      closePanel,
      togglePanel,
      setTextSize,
      setHighContrast,
      setUnderlineLinks,
      setReduceMotion,
      resetSettings,
    ],
  );

  return <AccessibilityContext.Provider value={value}>{children}</AccessibilityContext.Provider>;
}

export function useAccessibility(): AccessibilityContextValue {
  const context = useContext(AccessibilityContext);
  if (!context) {
    throw new Error("useAccessibility must be used within AccessibilityProvider");
  }

  return context;
}
