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
  COOKIE_CONSENT_ACCEPT_ALL,
  COOKIE_CONSENT_REJECT_ALL,
  type CookieConsentPreferences,
  applyCookieConsentDataset,
  readCookieConsent,
  writeCookieConsent,
} from "../lib/cookieConsentStorage";

type OptionalPreferences = Pick<CookieConsentPreferences, "performance" | "functional" | "targeting">;

type CookieConsentContextValue = {
  preferences: CookieConsentPreferences | null;
  hasResponded: boolean;
  bannerVisible: boolean;
  preferencesOpen: boolean;
  acceptAll: () => void;
  rejectNonEssential: () => void;
  openPreferences: () => void;
  closePreferences: () => void;
  savePreferences: (preferences: OptionalPreferences) => void;
};

const CookieConsentContext = createContext<CookieConsentContextValue | null>(null);

function toFullPreferences(preferences: OptionalPreferences): CookieConsentPreferences {
  return {
    necessary: true,
    ...preferences,
  };
}

export function CookieConsentProvider({ children }: PropsWithChildren) {
  const [storedRecord, setStoredRecord] = useState(() => readCookieConsent());
  const [bannerVisible, setBannerVisible] = useState(() => readCookieConsent() === null);
  const [preferencesOpen, setPreferencesOpen] = useState(false);

  useEffect(() => {
    if (storedRecord) {
      applyCookieConsentDataset(storedRecord.preferences);
    }
  }, [storedRecord]);

  const persistPreferences = useCallback((preferences: CookieConsentPreferences) => {
    const record = writeCookieConsent(preferences);
    setStoredRecord(record);
    setBannerVisible(false);
    setPreferencesOpen(false);
  }, []);

  const acceptAll = useCallback(() => {
    persistPreferences(COOKIE_CONSENT_ACCEPT_ALL);
  }, [persistPreferences]);

  const rejectNonEssential = useCallback(() => {
    persistPreferences(COOKIE_CONSENT_REJECT_ALL);
  }, [persistPreferences]);

  const openPreferences = useCallback(() => {
    setPreferencesOpen(true);
  }, []);

  const closePreferences = useCallback(() => {
    setPreferencesOpen(false);
  }, []);

  const savePreferences = useCallback(
    (preferences: OptionalPreferences) => {
      persistPreferences(toFullPreferences(preferences));
    },
    [persistPreferences],
  );

  const value = useMemo<CookieConsentContextValue>(
    () => ({
      preferences: storedRecord?.preferences ?? null,
      hasResponded: storedRecord !== null,
      bannerVisible,
      preferencesOpen,
      acceptAll,
      rejectNonEssential,
      openPreferences,
      closePreferences,
      savePreferences,
    }),
    [
      storedRecord,
      bannerVisible,
      preferencesOpen,
      acceptAll,
      rejectNonEssential,
      openPreferences,
      closePreferences,
      savePreferences,
    ],
  );

  return <CookieConsentContext.Provider value={value}>{children}</CookieConsentContext.Provider>;
}

export function useCookieConsent(): CookieConsentContextValue {
  const context = useContext(CookieConsentContext);
  if (!context) {
    throw new Error("useCookieConsent must be used within CookieConsentProvider");
  }

  return context;
}
