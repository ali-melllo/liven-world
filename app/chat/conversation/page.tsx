"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ArrowLeft, Languages } from "lucide-react"
import { useLanguage } from "@/contexts/language-context"
import { Navigation } from "@/components/navigation"
import { useRouter } from "next/navigation"

const messages = [
  {
    id: 1,
    sender: "Liven",
    content: "Hello, how can I help you today?",
    timestamp: "10:30 AM",
    isBot: true,
  },
  {
    id: 2,
    sender: "Sophia",
    content: "I need help with my asylum application.",
    timestamp: "10:31 AM",
    isBot: false,
  },
  {
    id: 3,
    sender: "Liven",
    content: "I can help with that. What specific questions do you have?",
    timestamp: "10:31 AM",
    isBot: true,
  },
]

export default function ConversationPage() {
  const [newMessage, setNewMessage] = useState("")
  const { t } = useLanguage()
  const router = useRouter()

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <Card className="w-full max-w-sm bg-white h-[600px] flex flex-col">
        <div className="flex items-center gap-4 p-4 border-b">
          <Button variant="ghost" size="icon" onClick={() => router.back()}>
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h1 className="text-xl font-semibold">{t("appTitle")}</h1>
        </div>

        <CardContent className="flex-1 p-4 space-y-4 overflow-y-auto">
          {messages.map((message) => (
            <div key={message.id} className={`flex gap-3 ${!message.isBot ? "flex-row-reverse" : ""}`}>
              <Avatar className="w-8 h-8 flex-shrink-0">
                <AvatarImage
                  src={
                    message.isBot
                      ? "/placeholder.svg?height=32&width=32&query=bot avatar"
                      : "/placeholder.svg?height=32&width=32&query=user avatar"
                  }
                />
                <AvatarFallback>{message.isBot ? "L" : "S"}</AvatarFallback>
              </Avatar>
              <div className={`max-w-[70%] ${!message.isBot ? "text-right" : ""}`}>
                <div className="text-xs text-gray-500 mb-1">{message.sender}</div>
                <div
                  className={`p-3 rounded-lg text-sm ${
                    message.isBot ? "bg-gray-100 text-gray-900" : "bg-orange-500 text-white"
                  }`}
                >
                  {message.content}
                </div>
              </div>
            </div>
          ))}
        </CardContent>

        <div className="p-4 border-t space-y-4">
          <div className="flex gap-2">
            <Input
              placeholder={t("typeMessage")}
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              className="flex-1"
            />
            <Button variant="ghost" size="icon">
              <Languages className="h-5 w-5" />
            </Button>
          </div>

          <Navigation />
        </div>
      </Card>
    </div>
  )
}
