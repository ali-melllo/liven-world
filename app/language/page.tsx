"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { ArrowLeft } from "lucide-react"

const languages = ["English", "Dutch", "Arabic", "Spanish", "French", "Turkish", "Ukrainian", "Russian"]

export default function LanguagePage() {
  const [selectedLanguage, setSelectedLanguage] = useState("English")

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <Card className="w-full max-w-sm bg-white">
        <CardHeader className="pb-4">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" onClick={() => window.history.back()}>
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <h1 className="text-xl font-semibold">Language</h1>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          <h2 className="text-lg font-semibold text-gray-900">Select your language</h2>

          <RadioGroup value={selectedLanguage} onValueChange={setSelectedLanguage}>
            {languages.map((language) => (
              <div key={language} className="flex items-center space-x-3 p-4 border rounded-lg">
                <RadioGroupItem value={language} id={language} />
                <Label htmlFor={language} className="flex-1 text-base">
                  {language}
                </Label>
              </div>
            ))}
          </RadioGroup>

          <Button
            className="w-full bg-orange-500 hover:bg-orange-600 text-white rounded-full py-3 mt-8"
            onClick={() => (window.location.href = "/profile-setup")}
          >
            Continue
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
