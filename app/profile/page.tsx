"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Switch } from "@/components/ui/switch"
import { ArrowLeft, ChevronRight } from "lucide-react"
import { useLanguage } from "@/contexts/language-context"
import { Navigation } from "@/components/navigation"
import { ThemeToggle } from "@/components/theme-toggle"
import { useRouter } from "next/navigation"
import { languages } from "@/lib/i18n"

export default function ProfilePage() {
  const [notificationsEnabled, setNotificationsEnabled] = useState(true)
  const { t, language, setLanguage } = useLanguage()
  const router = useRouter()

  const getCurrentLanguageName = () => {
    const currentLang = languages.find((lang) => lang.code === language)
    return currentLang?.name || "English"
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <Card className="w-full max-w-sm bg-card h-[600px] flex flex-col">
        <div className="flex items-center gap-4 p-4 border-b">
          <Button variant="ghost" size="icon" onClick={() => router.back()}>
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h1 className="text-xl font-semibold">{t("profile")}</h1>
          <div className="ml-auto">
            <ThemeToggle />
          </div>
        </div>

        <CardContent className="flex-1 p-4 space-y-6 overflow-y-auto">
          <div className="text-center space-y-3">
            <Avatar className="w-20 h-20 mx-auto">
              <AvatarImage src="/placeholder.svg?height=80&width=80" />
              <AvatarFallback>S</AvatarFallback>
            </Avatar>
            <div>
              <h2 className="text-xl font-semibold">Sophia</h2>
              <p className="text-sm text-muted-foreground">{t("joined")} 2023</p>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-semibold">{t("account")}</h3>

            <div className="space-y-3">
              <div
                className="flex items-center justify-between p-3 hover:bg-muted rounded-lg cursor-pointer"
                onClick={() => router.push("/profile/language")}
              >
                <div>
                  <div className="font-medium">{t("language")}</div>
                  <div className="text-sm text-muted-foreground">{getCurrentLanguageName()}</div>
                </div>
                <ChevronRight className="h-5 w-5 text-muted-foreground" />
              </div>

              <div
                className="flex items-center justify-between p-3 hover:bg-muted rounded-lg cursor-pointer"
                onClick={() => router.push("/profile/update-email")}
              >
                <div>
                  <div className="font-medium">{t("email")}</div>
                  <div className="text-sm text-muted-foreground">sophia.miller@email.com</div>
                </div>
                <ChevronRight className="h-5 w-5 text-muted-foreground" />
              </div>

              <div
                className="flex items-center justify-between p-3 hover:bg-muted rounded-lg cursor-pointer"
                onClick={() => router.push("/profile/update-password")}
              >
                <div>
                  <div className="font-medium">Password</div>
                  <div className="text-sm text-muted-foreground">••••••••</div>
                </div>
                <ChevronRight className="h-5 w-5 text-muted-foreground" />
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-semibold">{t("settings")}</h3>

            <div className="space-y-3">
              <div className="flex items-center justify-between p-3">
                <div className="font-medium">{t("notifications")}</div>
                <Switch checked={notificationsEnabled} onCheckedChange={setNotificationsEnabled} />
              </div>

              <div className="flex items-center justify-between p-3 hover:bg-muted rounded-lg cursor-pointer">
                <div className="font-medium">{t("privacy")}</div>
                <ChevronRight className="h-5 w-5 text-muted-foreground" />
              </div>

              <div className="flex items-center justify-between p-3 hover:bg-muted rounded-lg cursor-pointer">
                <div className="font-medium">{t("help")}</div>
                <ChevronRight className="h-5 w-5 text-muted-foreground" />
              </div>

              <div className="flex items-center justify-between p-3 hover:bg-muted rounded-lg cursor-pointer">
                <div className="font-medium">{t("about")}</div>
                <ChevronRight className="h-5 w-5 text-muted-foreground" />
              </div>
            </div>
          </div>
        </CardContent>

        <Navigation />
      </Card>
    </div>
  )
}
