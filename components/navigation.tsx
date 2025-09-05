"use client"

import { Button } from "@/components/ui/button"
import { Home, MessageCircle, Hash, User, Users } from "lucide-react"
import { useLanguage } from "@/contexts/language-context"
import { useRouter, usePathname } from "next/navigation"

export function Navigation() {
  const { t } = useLanguage()
  const router = useRouter()
  const pathname = usePathname()

  const getActiveTab = () => {
    if (pathname === "/chat" || pathname.startsWith("/chat/")) return "chat"
    if (pathname === "/topics") return "topics"
    if (pathname === "/profile" || pathname.startsWith("/profile")) return "profile"
    if (pathname === "/my-hero" || pathname.startsWith("/my-hero")) return "my-hero"
    return "home"
  }

  const activeTab = getActiveTab()

  return (
    <div className="border-t bg-background p-4 fixed bottom-0 w-full">
      <div className="flex justify-around">
        <Button
          variant="ghost"
          className={`flex flex-col items-center gap-1 ${activeTab === "home" ? "text-orange-500" : "text-muted-foreground"}`}
          onClick={() => router.push("/")}
        >
          <Home className="h-5 w-5" />
          <span className="text-xs">{t("home")}</span>
        </Button>
        <Button
          variant="ghost"
          className={`flex flex-col items-center gap-1 ${activeTab === "chat" ? "text-orange-500" : "text-muted-foreground"}`}
          onClick={() => router.push("/chat")}
        >
          <MessageCircle className="h-5 w-5" />
          <span className="text-xs">{t("chat")}</span>
        </Button>
        <Button
          variant="ghost"
          className={`flex flex-col items-center gap-1 ${activeTab === "topics" ? "text-orange-500" : "text-muted-foreground"}`}
          onClick={() => router.push("/topics")}
        >
          <Hash className="h-5 w-5" />
          <span className="text-xs">{t("topics")}</span>
        </Button>
        <Button
          variant="ghost"
          className={`flex flex-col items-center gap-1 ${activeTab === "profile" ? "text-orange-500" : "text-muted-foreground"}`}
          onClick={() => router.push("/profile")}
        >
          <User className="h-5 w-5" />
          <span className="text-xs">{t("profile")}</span>
        </Button>
        <Button
          variant="ghost"
          className={`flex flex-col items-center gap-1 ${activeTab === "my-hero" ? "text-orange-500" : "text-muted-foreground"}`}
          onClick={() => router.push("/my-hero")}
        >
          <Users className="h-5 w-5" />
          <span className="text-xs">{t("myHero")}</span>
        </Button>
      </div>
    </div>
  )
}
