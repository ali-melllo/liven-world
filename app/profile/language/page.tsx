"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { ArrowLeft } from "lucide-react"
import { useLanguage } from "@/contexts/language-context"
import { languages, type Language } from "@/lib/i18n"
import { useRouter } from "next/navigation"

export default function LanguageSettingsPage() {
  const { t, language, setLanguage } = useLanguage()
  const router = useRouter()
  const [selectedLanguage, setSelectedLanguage] = useState<Language>(language)
  const [showSuccess, setShowSuccess] = useState(false)

  const handleSave = () => {
    setLanguage(selectedLanguage)
    setShowSuccess(true)
    setTimeout(() => {
      setShowSuccess(false)
      router.back()
    }, 1500)
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <Card className="w-full max-w-sm bg-card">
        <CardHeader className="pb-4">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" onClick={() => router.back()}>
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <h1 className="text-xl font-semibold">{t("changeLanguage")}</h1>
          </div>
        </CardHeader>

        <CardContent className="space-y-6">
          {showSuccess && (
            <div className="bg-green-50 dark:bg-green-950 border border-green-200 dark:border-green-800 rounded-lg p-4 text-center">
              <p className="text-green-800 dark:text-green-200 font-medium">{t("languageUpdated")}</p>
            </div>
          )}

          <div>
            <h2 className="text-lg font-semibold mb-2">{t("currentLanguage")}</h2>
            <p className="text-muted-foreground text-sm mb-4">
              {languages.find((lang) => lang.code === language)?.name}
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">{t("selectNewLanguage")}</h3>

            <RadioGroup value={selectedLanguage} onValueChange={(value) => setSelectedLanguage(value as Language)}>
              {languages.map((lang) => (
                <div key={lang.code} className="flex items-center space-x-3 p-4 border rounded-lg">
                  <RadioGroupItem value={lang.code} id={lang.code} />
                  <Label htmlFor={lang.code} className="flex-1 text-base">
                    {lang.name}
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </div>

          <div className="flex gap-3 pt-4">
            <Button variant="outline" className="flex-1 bg-transparent" onClick={() => router.back()}>
              {t("cancel")}
            </Button>
            <Button
              className="flex-1 bg-orange-500 hover:bg-orange-600"
              onClick={handleSave}
              disabled={selectedLanguage === language}
            >
              {t("save")}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
