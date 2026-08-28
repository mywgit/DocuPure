"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { Language, UI_TRANSLATIONS } from "@/lib/i18n";

interface LanguageContextType {
  lang: Language;
  setLang: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = useState<Language>("en");

  useEffect(() => {
    const saved = localStorage.getItem("docupure_lang") as Language;
    if (saved && ["en", "es", "pt", "de", "fr", "ja", "zh"].includes(saved)) {
      setLangState(saved);
    } else {
      const browserLang = navigator.language.slice(0, 2).toLowerCase() as Language;
      if (["es", "pt", "de", "fr", "ja", "zh"].includes(browserLang)) {
        setLangState(browserLang);
      }
    }
  }, []);

  const setLang = (newLang: Language) => {
    setLangState(newLang);
    localStorage.setItem("docupure_lang", newLang);
  };

  const t = (key: string) => {
    return UI_TRANSLATIONS[lang]?.[key] || UI_TRANSLATIONS.en[key] || key;
  };

  return (
    <LanguageContext.Provider value={{ lang, setLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}
