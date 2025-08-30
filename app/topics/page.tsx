"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowLeft, HomeIcon as House, Heart, Briefcase, Scale, Globe, DollarSign } from "lucide-react"
import { useLanguage } from "@/contexts/language-context"
import { Navigation } from "@/components/navigation"
import { useRouter } from "next/navigation"

const topics = [
  {
    icon: House,
    titleKey: "housing" as const,
    descriptionKey: "housingDesc" as const,
  },
  {
    icon: Heart,
    titleKey: "health" as const,
    descriptionKey: "healthDesc" as const,
  },
  {
    icon: Briefcase,
    titleKey: "work" as const,
    descriptionKey: "workDesc" as const,
  },
  {
    icon: Scale,
    titleKey: "legal" as const,
    descriptionKey: "legalDesc" as const,
  },
  {
    icon: Globe,
    titleKey: "culture" as const,
    descriptionKey: "cultureDesc" as const,
  },
  {
    icon: DollarSign,
    titleKey: "finance" as const,
    descriptionKey: "financeDesc" as const,
  },
]

export default function TopicsPage() {
  const { t } = useLanguage()
  const router = useRouter()

  return (
    <div className="h-[100dvh] flex items-center justify-center">
      <Card className="w-full max-w-sm  h-full flex flex-col border-transparent shadow-none pb-20">
        <div className="flex items-center gap-4 p-4 border-b">
          <Button variant="ghost" size="icon" onClick={() => router.back()}>
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h1 className="text-xl font-semibold">{t("topics")}</h1>
        </div>

        <CardContent className="flex-1 p-0 space-y-4 overflow-y-auto">
          <h2 className="text-lg px-4 pt-4 font-semibold text-gray-900">{t("topics")}</h2>

          <div className="space-y-3">
            {topics.map((topic, index) => {
              const IconComponent = topic.icon
              return (
                <div
                  key={index}
                  className="flex items-center gap-4 p-4 hover:bg-gray-50 rounded-lg cursor-pointer"
                  onClick={() => router.push("/chat/conversation")}
                >
                  <div className="w-10 h-10 bg-muted rounded-lg flex items-center justify-center flex-shrink-0">
                    <IconComponent className="h-5 w-5" />
                  </div>
                  <div className="flex-1">
                    <div className="font-medium text-gray-900 mb-1">{t(topic.titleKey)}</div>
                    <div className="text-sm text-gray-600">{t(topic.descriptionKey)}</div>
                  </div>
                </div>
              )
            })}
          </div>
        </CardContent>

        <Navigation />
      </Card>
    </div>
  )
}
