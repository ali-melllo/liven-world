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
import { Skeleton } from "@/components/ui/skeleton"
import { useEffect, useState } from "react"

export default function ChatHistoryPage() {
  const [user, setUser] = useState<any>(null);

  const { t } = useLanguage()
  const router = useRouter()

  const { data } = useGetSessionListQuery(
    {},
    { refetchOnMountOrArgChange: true }
  );


  useEffect(() => {
    const user = localStorage.getItem("user");
    setUser(JSON.parse(user || ""));
  }, []);

  return (
    <div className="min-h-screen">
      <Card className="w-full max-w-sm  border-transparent h-[600px] flex flex-col">
        <div className="flex items-center gap-4 p-4 border-b">
          <Button variant="ghost" size="icon" onClick={() => router.back()}>
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h1 className="text-xl font-semibold">{t("chatHistory")}</h1>
        </div>

        {!data ?

          <CardContent className="flex-1 p-4 space-y-4 overflow-y-auto">
            {[...Array(6)].map((_, i) => (
              <div
                key={i}
                className="flex gap-3 p-2 rounded-lg"
              >
                {/* Avatar */}
                <Skeleton className="w-10 h-10 rounded-full flex-shrink-0" />

                {/* Chat Info */}
                <div className="flex-1 min-w-0 space-y-2">
                  <Skeleton className="h-4 w-32" /> {/* Last interaction date */}
                  <Skeleton className="h-4 w-48" /> {/* Chat title */}
                </div>
              </div>
            ))}
          </CardContent>
          : <CardContent className="flex-1 p-4 space-y-4 overflow-y-auto">
            {data?.map((chat: any) => (
              <div
                key={chat.id}
                className="flex gap-3 p-2 hover:bg-gray-50 rounded-lg cursor-pointer"
                onClick={() => router.push(`/chat/conversation?sessionId=${chat.id}`)}
              >
                <Avatar className="w-10 h-10 flex-shrink-0">
                  <AvatarImage src={"/" + user?.avatar} />
                  <AvatarFallback>{user?.fullName.charAt(0)}</AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-medium text-muted-foreground mb-1">{formatRelativeDateTime(chat.lastInteraction)}</div>
                  <div className="text-sm text-gray-600 truncate">{chat.title}</div>
                </div>
              </div>
            ))}

            {(data && data.length === 0) && <p className="text-muted-foreground text-center mt-48">No Chat History Yet</p>}
          </CardContent>}

        <Navigation />
      </Card>
    </div>
  )
}
