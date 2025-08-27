"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { useLanguage } from "@/contexts/language-context"

interface Guide {
  title: string
  description: string
  icon: string
}

interface GuideSliderProps {
  onComplete: () => void
}

export function GuideSlider({ onComplete }: GuideSliderProps) {
  const { t } = useLanguage()
  const [currentSlide, setCurrentSlide] = useState(0)

  // Get guides from translations
  const guides = (t("guides") as unknown as Guide[]) || []

  const nextSlide = () => {
    if (currentSlide < guides.length - 1) {
      setCurrentSlide(currentSlide + 1)
    } else {
      onComplete()
    }
  }

  const prevSlide = () => {
    if (currentSlide > 0) {
      setCurrentSlide(currentSlide - 1)
    }
  }

  const goToSlide = (index: number) => {
    setCurrentSlide(index)
  }

  if (!guides.length) {
    return (
      <div className="text-center space-y-6">
        <h1 className="text-xl font-bold">{t("howToUseTitle")}</h1>
        <div className="space-y-4 text-left text-sm text-muted-foreground leading-relaxed">
          <p>{t("onboardingText1")}</p>
          <p>{t("onboardingText2")}</p>
          <p>{t("onboardingText3")}</p>
        </div>
        <Button className="w-full bg-orange-500 hover:bg-orange-600 text-white rounded-full py-3" onClick={onComplete}>
          {t("startChatting")}
        </Button>
      </div>
    )
  }

  const currentGuide = guides[currentSlide]

  return (
    <div className="text-center space-y-6">
      {/* Progress indicators */}
      <div className="flex justify-center space-x-2 mb-8">
        {guides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-2 h-2 rounded-full transition-colors ${
              index === currentSlide ? "bg-orange-500" : "bg-muted"
            }`}
          />
        ))}
      </div>

      {/* Guide content */}
      <div className="space-y-6 min-h-[300px] flex flex-col justify-center">
        {/* <div className="text-4xl mb-4">{currentGuide.icon}</div> */}
        <h1 className="text-xl font-bold">{currentGuide.title}</h1>
        <p className="text-sm text-muted-foreground leading-relaxed px-4">{currentGuide.description}</p>
      </div>

      {/* Navigation */}
      <div className="flex items-center justify-between">
        <Button
          variant="ghost"
          size="sm"
          onClick={prevSlide}
          disabled={currentSlide === 0}
          className="flex items-center gap-2"
        >
          <ChevronLeft className="h-4 w-4" />
          {t("back")}
        </Button>

        <span className="text-sm text-muted-foreground">
          {currentSlide + 1} / {guides.length}
        </span>

        <Button size="sm" onClick={nextSlide} className="flex items-center gap-2 bg-orange-500 hover:bg-orange-600">
          {currentSlide === guides.length - 1 ? t("startChatting") : t("next")}
          {currentSlide < guides.length - 1 && <ChevronRight className="h-4 w-4" />}
        </Button>
      </div>
    </div>
  )
}
