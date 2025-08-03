"use client"

import { createContext, useContext, useState, type ReactNode } from "react"
import { type Language, translations, type TranslationKey } from "@/lib/i18n"

interface LanguageContextType {
  language: Language
  setLanguage: (lang: Language) => void
  t: (key: TranslationKey) => string
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>("en")

  const t = (key: TranslationKey): string => {
    try {
      // First try to get the translation for the current language
      const currentLangTranslations = translations[language]
      if (currentLangTranslations && currentLangTranslations[key]) {
        return currentLangTranslations[key]
      }

      // Fallback to English if key doesn't exist in current language
      const englishTranslations = translations.en
      if (englishTranslations && englishTranslations[key]) {
        return englishTranslations[key]
      }

      // Final fallback: return the key itself
      return key
    } catch (error) {
      console.warn(`Translation error for key "${key}":`, error)
      return key
    }
  }

  return <LanguageContext.Provider value={{ language, setLanguage, t }}>{children}</LanguageContext.Provider>
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider")
  }
  return context
}
