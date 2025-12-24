"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { LANGUAGE_OPTIONS, type Language } from "./dictionary";

type LanguageContextValue = {
  language: Language;
  isHydrated: boolean;
  setLanguage: (language: Language) => void;
  options: typeof LANGUAGE_OPTIONS;
};

const LanguageContext = createContext<LanguageContextValue | undefined>(
  undefined
);

/**
 * Hook that provides hydration-safe language management with two-phase initialization:
 * 1. Server/Initial Render: Always use default language ("es")
 * 2. Post-Hydration: Check localStorage and update if different from default
 */
function useHydratedLanguage(): {
  language: Language;
  isHydrated: boolean;
  setLanguage: (language: Language) => void;
} {
  // Always start with default language to ensure server/client consistency
  const [language, setLanguageState] = useState<Language>("es");
  const [isHydrated, setIsHydrated] = useState(false);

  // Detect hydration completion
  useEffect(() => {
    setIsHydrated(true);

    // After hydration, check localStorage and restore preference if different
    try {
      const stored = window.localStorage.getItem("sb-language");
      if (
        stored &&
        ["en", "es", "fr"].includes(stored) &&
        stored !== language
      ) {
        setLanguageState(stored as Language);
      }
    } catch (error) {
      // Gracefully handle localStorage unavailability
      console.warn("localStorage unavailable, using default language");
    }
  }, [language]);

  const setLanguage = (newLanguage: Language) => {
    setLanguageState(newLanguage);

    // Persist to localStorage if available
    if (isHydrated) {
      try {
        window.localStorage.setItem("sb-language", newLanguage);
        document.documentElement.lang = newLanguage;
      } catch (error) {
        console.warn("Failed to persist language preference:", error);
      }
    }
  };

  return {
    language,
    isHydrated,
    setLanguage,
  };
}

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const { language, isHydrated, setLanguage } = useHydratedLanguage();

  const value = useMemo(
    () => ({
      language,
      isHydrated,
      setLanguage,
      options: LANGUAGE_OPTIONS,
    }),
    [language, isHydrated]
  );

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return ctx;
}
