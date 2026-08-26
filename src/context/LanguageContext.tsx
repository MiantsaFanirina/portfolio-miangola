/* eslint-disable react-refresh/only-export-components */
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from 'react';
import { en, type UI } from '../locales/en';
import { fr } from '../locales/fr';

export type Lang = 'en' | 'fr';

interface LanguageValue {
  lang: Lang;
  setLang: (l: Lang) => void;
  toggle: () => void;
  t: UI;
  tx: (b: { en: string; fr: string }) => string;
}

const LanguageContext = createContext<LanguageValue | null>(null);

const dictionaries: Record<Lang, UI> = { en, fr };

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>(() => {
    if (typeof window === 'undefined') return 'fr';
    const stored = window.localStorage.getItem('mm-lang');
    return stored === 'en' || stored === 'fr' ? stored : 'fr';
  });

  const setLang = useCallback((l: Lang) => {
    setLangState(l);
    window.localStorage.setItem('mm-lang', l);
    document.documentElement.lang = l;
  }, []);

  const toggle = useCallback(() => {
    setLangState((prev) => {
      const next = prev === 'fr' ? 'en' : 'fr';
      window.localStorage.setItem('mm-lang', next);
      document.documentElement.lang = next;
      return next;
    });
  }, []);

  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  const tx = useCallback(
    (b: { en: string; fr: string }) => b[lang],
    [lang],
  );

  return (
    <LanguageContext.Provider value={{ lang, setLang, toggle, t: dictionaries[lang], tx }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage(): LanguageValue {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error('useLanguage must be used within LanguageProvider');
  return ctx;
}
