"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ArrowLeft, X } from "lucide-react"
import { useLanguage } from "@/contexts/language-context"
import { languages, type Language } from "@/lib/i18n"
import { useRouter } from "next/navigation"
import { GuideSlider } from "@/components/guide-slider"

interface FormData {
  language: Language
  fullName: string
  nationality: string
  municipality: string
  email: string
  password: string
  gender: string
  status: string
}

const steps = ["welcome", "language", "profile", "instructions"] as const
type Step = (typeof steps)[number]

export default function OnboardingPage() {
  const [currentStep, setCurrentStep] = useState<Step>("welcome")
  const [showInstructions, setShowInstructions] = useState(false)
  const { language, setLanguage, t } = useLanguage()
  const router = useRouter()

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: {
      language: "en",
      fullName: "",
      nationality: "",
      municipality: "",
      email: "",
      password: "",
      gender: "",
      status: "",
    },
  })

  const watchedLanguage = watch("language")

  const onSubmit = (data: FormData) => {
    console.log("Form submitted:", data)
    setShowInstructions(true)
  }

  const nextStep = () => {
    const currentIndex = steps.indexOf(currentStep)
    if (currentIndex < steps.length - 1) {
      setCurrentStep(steps[currentIndex + 1])
    }
  }

  const prevStep = () => {
    const currentIndex = steps.indexOf(currentStep)
    if (currentIndex > 0) {
      setCurrentStep(steps[currentIndex - 1])
    }
  }

  const handleLanguageChange = (lang: Language) => {
    setValue("language", lang)
    setLanguage(lang)
  }

  if (showInstructions) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <Card className="w-full max-w-sm bg-card relative">
          <Button variant="ghost" size="icon" className="absolute top-4 right-4" onClick={() => router.push("/chat")}>
            <X className="h-5 w-5" />
          </Button>

          <CardContent className="p-8">
            <GuideSlider onComplete={() => router.push("/chat")} />
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <Card className="w-full max-w-sm bg-card">
        {currentStep !== "welcome" && (
          <CardHeader className="pb-4">
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="icon" onClick={prevStep}>
                <ArrowLeft className="h-5 w-5" />
              </Button>
              <h1 className="text-xl font-semibold">
                {currentStep === "language" && t("language")}
                {currentStep === "profile" && t("profileSetup")}
              </h1>
            </div>
          </CardHeader>
        )}

        <CardContent className={`space-y-6 ${currentStep === "welcome" ? "p-8 text-center" : ""}`}>
          {currentStep === "welcome" && (
            <>
              <div className="space-y-4">
                <h1 className="text-2xl font-bold">{t("welcomeTitle")}</h1>
                <p className="text-muted-foreground text-sm leading-relaxed">{t("welcomeSubtitle")}</p>
              </div>

              <div className="flex-1 min-h-[400px]" />

              <Button
                className="w-full bg-orange-500 hover:bg-orange-600 text-white rounded-full py-3"
                onClick={nextStep}
              >
                {t("getStarted")}
              </Button>
            </>
          )}

          {currentStep === "language" && (
            <>
              <h2 className="text-lg font-semibold">{t("selectLanguage")}</h2>

              <RadioGroup value={watchedLanguage} onValueChange={(value) => handleLanguageChange(value as Language)}>
                {languages.map((lang) => (
                  <div key={lang.code} className="flex items-center space-x-3 p-4 border rounded-lg">
                    <RadioGroupItem value={lang.code} id={lang.code} />
                    <Label htmlFor={lang.code} className="flex-1 text-base">
                      {lang.name}
                    </Label>
                  </div>
                ))}
              </RadioGroup>

              <Button
                className="w-full bg-orange-500 hover:bg-orange-600 text-white rounded-full py-3 mt-8"
                onClick={nextStep}
              >
                {t("continue")}
              </Button>
            </>
          )}

          {currentStep === "profile" && (
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <h2 className="text-lg font-semibold">{t("tellUsAbout")}</h2>

              <div className="space-y-4">
                <div>
                  <Input
                    placeholder={t("fullName")}
                    className="bg-muted border-0 rounded-lg py-3"
                    {...register("fullName", { required: t("fullNameRequired") })}
                  />
                  {errors.fullName && <p className="text-red-500 text-sm mt-1">{errors.fullName.message}</p>}
                </div>

                <div>
                  <Input
                    placeholder={t("nationality")}
                    className="bg-muted border-0 rounded-lg py-3"
                    {...register("nationality", { required: t("nationalityRequired") })}
                  />
                  {errors.nationality && <p className="text-red-500 text-sm mt-1">{errors.nationality.message}</p>}
                </div>

                <div>
                  <Input
                    placeholder={t("municipality")}
                    className="bg-muted border-0 rounded-lg py-3"
                    {...register("municipality", { required: t("municipalityRequired") })}
                  />
                  {errors.municipality && <p className="text-red-500 text-sm mt-1">{errors.municipality.message}</p>}
                </div>

                <div>
                  <Input
                    placeholder={t("emailAddress")}
                    type="email"
                    className="bg-muted border-0 rounded-lg py-3"
                    {...register("email", {
                      required: t("emailRequired"),
                      pattern: {
                        value: /^\S+@\S+$/i,
                        message: t("emailInvalid"),
                      },
                    })}
                  />
                  {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
                </div>

                <div>
                  <Input
                    placeholder={t("password")}
                    type="password"
                    className="bg-muted border-0 rounded-lg py-3"
                    {...register("password", {
                      required: t("passwordRequired"),
                      minLength: {
                        value: 6,
                        message: t("passwordMinLength"),
                      },
                    })}
                  />
                  {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>}
                </div>

                <div>
                  <Select onValueChange={(value) => setValue("gender", value)}>
                    <SelectTrigger className="bg-muted border-0 rounded-lg py-3">
                      <SelectValue placeholder={t("gender")} />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="male">{t("male")}</SelectItem>
                      <SelectItem value="female">{t("female")}</SelectItem>
                      <SelectItem value="other">{t("other")}</SelectItem>
                      <SelectItem value="prefer-not-to-say">{t("preferNotToSay")}</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Select onValueChange={(value) => setValue("status", value)}>
                    <SelectTrigger className="bg-muted border-0 rounded-lg py-3">
                      <SelectValue placeholder={t("status")} />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="asylum-seeker">{t("asylumSeeker")}</SelectItem>
                      <SelectItem value="refugee">{t("refugee")}</SelectItem>
                      <SelectItem value="migrant">{t("migrant")}</SelectItem>
                      <SelectItem value="student">{t("student")}</SelectItem>
                      <SelectItem value="other">{t("other")}</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <Button
                type="submit"
                className="w-full bg-orange-500 hover:bg-orange-600 text-white rounded-full py-3 mt-8"
              >
                {t("next")}
              </Button>
            </form>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
