import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import {
  LOCALE_OPTIONS,
  Locale,
  UI_STRINGS,
  UiDictionary,
  translateEnum,
} from './uiStrings';

interface I18nContextValue {
  locale: Locale;
  setLocale: (next: Locale) => void;
  t: UiDictionary;
  trEnum: (value: string) => string;
}

const I18nContext = createContext<I18nContextValue | null>(null);

function getInitialLocale(): Locale {
  if (typeof window === 'undefined') return 'pt';
  try {
    const saved = window.localStorage.getItem('iags-locale');
    if (saved === 'pt' || saved === 'en' || saved === 'es') return saved;
  } catch {
    // ignore storage errors
  }
  return 'pt';
}

export const I18nProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [locale, setLocaleState] = useState<Locale>(getInitialLocale);

  const setLocale = (next: Locale) => {
    setLocaleState(next);
    try {
      window.localStorage.setItem('iags-locale', next);
    } catch {
      // ignore storage errors
    }
  };

  useEffect(() => {
    const opt = LOCALE_OPTIONS.find((o) => o.id === locale);
    if (opt) {
      document.documentElement.lang = opt.htmlLang;
    }
    document.title = UI_STRINGS[locale].appTitle;
  }, [locale]);

  const value = useMemo<I18nContextValue>(
    () => ({
      locale,
      setLocale,
      t: UI_STRINGS[locale],
      trEnum: (val: string) => translateEnum(val, locale),
    }),
    [locale]
  );

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
};

export function useI18n(): I18nContextValue {
  const ctx = useContext(I18nContext);
  if (!ctx) {
    throw new Error('useI18n must be used inside I18nProvider');
  }
  return ctx;
}
