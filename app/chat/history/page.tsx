"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ArrowLeft } from "lucide-react"
import { useLanguage } from "@/contexts/language-context"
import { Navigation } from "@/components/navigation"
import { useRouter } from "next/navigation"

const chatHistory = [
  {
    id: 1,
    time: "Today, 10:30 AM",
    message: "Hi there! How can I help you today?",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: 2,
    time: "Yesterday, 2:45 PM",
    message: "I'm looking for information about the asylum process.",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: 3,
    time: "2 days ago, 11:15 AM",
    message: "What are the requirements for applying for asylum?",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: 4,
    time: "3 days ago, 4:30 PM",
    message: "Can you provide me with a list of legal aid organizations?",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: 5,
    time: "4 days ago, 9:00 AM",
    message: "I need help with my application form.",
    avatar: "/placeholder.svg?height=40&width=40",
  },
]

export default function ChatHistoryPage() {
  const { t } = useLanguage()
  const router = useRouter()

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <Card className="w-full max-w-sm bg-white h-[600px] flex flex-col">
        <div className="flex items-center gap-4 p-4 border-b">
          <Button variant="ghost" size="icon" onClick={() => router.back()}>
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h1 className="text-xl font-semibold">{t("chatHistory")}</h1>
        </div>

        <CardContent className="flex-1 p-4 space-y-4 overflow-y-auto">
          {chatHistory.map((chat) => (
            <div
              key={chat.id}
              className="flex gap-3 p-2 hover:bg-gray-50 rounded-lg cursor-pointer"
              onClick={() => router.push("/chat/conversation")}
            >
              <Avatar className="w-10 h-10 flex-shrink-0">
                <AvatarImage src={chat.avatar || "/placeholder.svg"} />
                <AvatarFallback>U</AvatarFallback>
              </Avatar>
              <div className="flex-1 min-w-0">
                <div className="text-sm font-medium text-gray-900 mb-1">{chat.time}</div>
                <div className="text-sm text-gray-600 truncate">{chat.message}</div>
              </div>
            </div>
          ))}
        </CardContent>

        <Navigation />
      </Card>
    </div>
  )
}
