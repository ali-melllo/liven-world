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
import OTPVerificationPage from "./components/otp-verfication"
import { toast } from "sonner"

interface FormData {
  language: Language
  fullName: string
  nationality: string
  municipality: string
  email: string
  gender: string
  status: string
}

const steps = ["welcome", "profile", "verify"] as const
type Step = (typeof steps)[number]

export default function OnboardingPage() {
  const [currentStep, setCurrentStep] = useState<Step>("welcome")
  const [userData, setUSerData] = useState<any>(null);
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
      gender: "",
      status: "",
    },
  })

  const watchedLanguage = watch("language")

  const onSubmit = (data: FormData) => {
    setUSerData(data);
    setCurrentStep("verify");
    toast("Default code is 1111 for demo only");
    // setShowInstructions(true)
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

  return (
    <div className={`h-dvh bg-background flex ${currentStep !== "welcome" ? "" : "py-5"}  justify-center`}>
      <Card className="w-full h-full md:max-w-sm bg-card p-0 shadow-none border-transparent">
        {currentStep !== "welcome" && (
          <CardHeader className="">
            <div className="flex relative items-center gap-4">
              <Button className="absolute -left-3" variant="ghost" size="icon" onClick={prevStep}>
                <ArrowLeft className="h-5 w-5" />
              </Button>
              <h1 className="text-xl mx-auto font-semibold">
                {currentStep === "profile" && t("profileLogin")}
              </h1>
            </div>
          </CardHeader>
        )}

        <CardContent className={` h-full space-y-6 ${currentStep === "welcome" ? " text-center" : ""}`}>
          {currentStep === "welcome" && (
            <div className="h-full flex flex-col justify-between">
              <div className="space-y-4">
                <h1 className="text-2xl font-bold">{t("welcomeTitle")}</h1>
                <p className="text-muted-foreground text-sm leading-relaxed">{t("welcomeSubtitle")}</p>
              </div>


              <Button
                className="w-full bg-orange-500 hover:bg-orange-600 text-white rounded-full !py-6"
                onClick={nextStep}
              >
                {t("getStarted")}
              </Button>
            </div>
          )}

          {currentStep === "profile" && (
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 mt-5 h-5/6 relative flex flex-col">
              <h2 className="text-lg font-semibold">{t("enterEmail")}</h2>

              <div className="space-y-4">
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

              </div>

              <Button
                type="submit"
                className="w-full bg-orange-500 hover:bg-orange-600 text-white rounded-full !py-6 absolute bottom-5 "
              >
                {t("next")}
              </Button>
            </form>
          )}

          {currentStep === "verify" &&
            <OTPVerificationPage data={userData} isForLogin={true} />
          }
        </CardContent>
      </Card>
    </div>
  )
}
