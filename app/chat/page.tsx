"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { List, Settings } from "lucide-react"
import { useLanguage } from "@/contexts/language-context"
import { Navigation } from "@/components/navigation"
import { ThemeToggle } from "@/components/theme-toggle"
import { useRouter } from "next/navigation"

const commonTopics = [
  {
    titleKey: "housing" as const,
    descriptionKey: "housingDesc" as const,
    image: "/placeholder.svg?height=80&width=80",
  },
  {
    titleKey: "healthcare" as const,
    descriptionKey: "healthcareDesc" as const,
    image: "/placeholder.svg?height=80&width=80",
  },
  {
    titleKey: "education" as const,
    descriptionKey: "educationDesc" as const,
    image: "/placeholder.svg?height=80&width=80",
  },
]

export default function ChatPage() {
  const { t } = useLanguage()
  const router = useRouter()

  return (
    <div className="h-[100dvh] bg-background flex items-center justify-center ">
      <Card className="w-full max-w-sm bg-card h-full flex flex-col shadow-none border-transparent pb-20">
        <div className="flex items-center justify-between p-4 border-b">
          <h1 className="text-xl font-semibold">{t("appTitle")}</h1>
          <div className="flex items-center gap-2">
            <ThemeToggle />
            <Button variant="ghost" size="icon" onClick={() => router.push("/profile")}>
              <Settings className="h-5 w-5" />
            </Button>
          </div>
        </div>

        <CardContent className="flex-1 p-6 space-y-6 overflow-y-auto">
          <div>

            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold mb-2">{t("startNewChat")}</h2>
              <h2
                onClick={() => router.push("/chat/history")}
                className="border flex items-center gap-2 text-sm border-muted shadow px-4 py-1 rounded-xl font-medium mb-2">{t("chatHistory")} <List size={15}/> </h2>
            </div>

            <div
              className="bg-orange-50 mt-2 dark:bg-orange-950 rounded-lg p-4 flex items-center gap-3 mb-6 cursor-pointer hover:bg-orange-100 dark:hover:bg-orange-900"
              onClick={() => router.push("/chat/conversation")}
            >
              <div className="text-sm">
                <div className="font-medium mb-1">{t("askQuestion")}</div>
                <div className="text-muted-foreground text-xs">{t("askQuestionDesc")}</div>
              </div>
              <div className="w-16 h-16 bg-orange-200 dark:bg-orange-800 rounded-lg flex-shrink-0 flex items-center justify-center">
                <img src="/placeholder.svg?height=40&width=40" alt="Ask question" className="w-10 h-10 rounded" />
              </div>
            </div>
          </div>

          <div className="mt-2">
            <h3 className="text-lg font-semibold mb-4">{t("commonTopics")}</h3>

            <div className="space-y-4">
              {commonTopics.map((topic, index) => (
                <div
                  key={index}
                  className="flex items-center gap-3 p-3 hover:bg-muted rounded-lg cursor-pointer"
                  onClick={() => router.push("/chat/conversation")}
                >
                  <div className="flex-1">
                    <div className="font-medium mb-1">{t(topic.titleKey)}</div>
                    <div className="text-muted-foreground text-sm">{t(topic.descriptionKey)}</div>
                  </div>
                  <div className="w-12 h-12 bg-muted rounded-lg flex-shrink-0 flex items-center justify-center">
                    <img src={topic.image || "/placeholder.svg"} alt={t(topic.titleKey)} className="w-8 h-8 rounded" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </CardContent>

        <Navigation />
      </Card>
    </div>
  )
}
