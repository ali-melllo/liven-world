"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ArrowLeft } from "lucide-react"
import { useLanguage } from "@/contexts/language-context"
import { Navigation } from "@/components/navigation"
import { useRouter } from "next/navigation"
import { useGetSessionListQuery } from "@/services/endpoints/chat/chat"
import { formatRelativeDateTime } from "@/lib/utils"

export default function ChatHistoryPage() {
  const { t } = useLanguage()
  const router = useRouter()

  const { data } = useGetSessionListQuery(
    {},
    { refetchOnMountOrArgChange: true }
  );


  return (
    <div className="min-h-screen">
      <Card className="w-full max-w-sm  border-transparent h-[600px] flex flex-col">
        <div className="flex items-center gap-4 p-4 border-b">
          <Button variant="ghost" size="icon" onClick={() => router.back()}>
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h1 className="text-xl font-semibold">{t("chatHistory")}</h1>
        </div>

        <CardContent className="flex-1 p-4 space-y-4 overflow-y-auto">
          {data?.map((chat: any) => (
            <div
              key={chat.id}
              className="flex gap-3 p-2 hover:bg-gray-50 rounded-lg cursor-pointer"
              onClick={() => router.push(`/chat/conversation?sessionId=${chat.id}`)}
            >
              <Avatar className="w-10 h-10 flex-shrink-0">
                <AvatarImage src={chat.avatar || "/placeholder.svg"} />
                <AvatarFallback>U</AvatarFallback>
              </Avatar>
              <div className="flex-1 min-w-0">
                <div className="text-sm font-medium text-gray-900 mb-1">{formatRelativeDateTime(chat.lastInteraction)}</div>
                <div className="text-sm text-gray-600 truncate">{chat.title}</div>
              </div>
            </div>
          ))}

          {(data && data.length === 0) && <p className="text-muted-foreground text-center mt-48">No Chat History Yet</p>}
        </CardContent>

        <Navigation />
      </Card>
    </div>
  )
}
