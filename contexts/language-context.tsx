"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import { type Language, translations, type TranslationKey } from "@/lib/i18n"

interface LanguageContextType {
  language: Language
  setLanguage: (lang: Language) => void
  t: (key: TranslationKey) => string
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>("en")

  useEffect(() => {
    try {
      const storedUser = localStorage.getItem("user")
      if (storedUser) {
        const parsed = JSON.parse(storedUser)
        if (parsed?.language) {
          setLanguage(parsed.language as Language)
        }
      }
    } catch (err) {
      console.warn("Failed to load user language from localStorage:", err)
    }
  }, [])

  const updateLanguage = (lang: Language) => {
    setLanguage(lang)
    try {
      const storedUser = localStorage.getItem("user")
      const parsed = storedUser ? JSON.parse(storedUser) : {}
      parsed.language = lang
      localStorage.setItem("user", JSON.stringify(parsed))
    } catch (err) {
      console.warn("Failed to save language to localStorage:", err)
    }
  }

  const t = (key: TranslationKey): string => {
    try {
      const currentLangTranslations = translations[language]
      if (currentLangTranslations && currentLangTranslations[key]) {
        return currentLangTranslations[key]
      }

      // fallback to English
      const englishTranslations = translations.en
      if (englishTranslations && englishTranslations[key]) {
        return englishTranslations[key]
      }

      return key
    } catch (error) {
      console.warn(`Translation error for key "${key}":`, error)
      return key
    }
  }

  return (
    <LanguageContext.Provider value={{ language, setLanguage: updateLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider")
  }
  return context
}
