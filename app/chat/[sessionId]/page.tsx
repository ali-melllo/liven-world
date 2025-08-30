"use client"

import type React from "react"
import { useState, useRef, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  Send,
  Mic,
  Smile,
  Paperclip,
  Home,
  Building2,
  Briefcase,
  Users,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { cn } from "@/lib/utils"
import { TypingAnimation } from "@/components/magicui/text-animation"
import { AnimatedShinyText } from "@/components/magicui/animated-shiny-text"
import { useSendMessageMutation } from "@/services/endpoints/chat/chat"

type Message = {
  role: "assistant" | "user";
  content: string;
};

export default function ChatPage() {
  const [messages, setMessages] = useState<Message[]>([])

  const [inputValue, setInputValue] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const scrollAreaRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  const [sendMessage] = useSendMessageMutation();

  const sampleQuestions = [
    "How do I apply for housing benefit?",
    "Where can I find a job in the Netherlands?",
    "What documents do I need for BSN registration?",
    "How do I open a Dutch bank account?",
  ]

  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight
    }
  }, [messages])

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

    const newMessage = { role: "user" as const, content: inputValue };
    setMessages((prev) => [...prev, newMessage]);
    setInputValue("");
    setIsTyping(true);

    try {
      const data = await sendMessage({
        question: inputValue,
        topic: "work",
      }).unwrap();

      const formattedBotResponse = {
        role: "assistant" as const,
        content: data.answer,
      };

      setMessages((prev) => [...prev, formattedBotResponse]);
    } catch (err) {
      console.error("Failed to send message:", err);
    } finally {
      setIsTyping(false);
    }
  };
console.log(messages)
  return (
    <div className="min-h-screen  flex flex-col">

      {/* Chat Area */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <ScrollArea className="flex-1 px-4" ref={scrollAreaRef}>
          <div className="md:max-w-4xl mx-auto pt-5 pb-48 py-6 space-y-6">
            {/* Welcome Message */}
            {messages.length === 0 &&
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-8 "
              >
                
                <h2 className="text-xl md:text-2xl font-extrabold mb-2">Welcome to Liven Chat</h2>
                <p className="text-muted-foreground mb-6 max-w-md mx-auto">
                  I'm here to help you navigate life in the Netherlands. Ask me anything about housing, jobs, government
                  services, or integration.
                </p>

                {/* Sample Questions */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-w-2xl  mx-auto">
                  {sampleQuestions.map((question, index) => (
                    <motion.button
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      onClick={() => setInputValue(question)}
                      className="p-3 text-left font-bold bg-muted/50 hover:bg-muted/80 rounded-lg border border-border/50 hover:border-border transition-all duration-200 text-sm"
                    >
                      {question}
                    </motion.button>
                  ))}
                </div>
              </motion.div>}

            {/* Messages */}

            <div className="space-y-4 pb-32 ">
              {messages.map((message, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className={cn("flex", message.role === "user" ? "justify-end" : "justify-start")}
                >
                  <Card
                    className={cn(
                      "max-w-[80%] px-3 py-2 shadow-md rounded-[35px] font-bold",
                      message.role === "user"
                        ? "bg-gradient-to-r from-yellow-500 to-orange-600 hover:from-yellow-600 hover:to-orange-700 rounded-tr-none text-white border-0"
                        : "bg-background rounded-tl-none [box-shadow:0_0_0_1px_rgba(0,0,0,.03),0_2px_4px_rgba(0,0,0,.05),0_12px_24px_rgba(0,0,0,.05)] transform-gpu dark:[border:1px_solid_rgba(255,255,255,.1)] dark:[box-shadow:0_-20px_80px_-20px_#ffffff1f_inset]",
                    )}
                  >
                    {(index === messages.length - 1 && message.role === "assistant") ?
                      <TypingAnimation duration={20} className="text-sm leading-relaxed">
                              {message.content}
                     </TypingAnimation>
                    :
                      <p className="text-sm leading-relaxed">{message.content}</p>
                    }
                  </Card>
                </motion.div>
              ))}

              {/* Enhanced Typing Indicator */}
              <AnimatePresence>
                {isTyping && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="flex justify-start items-center w-full "
                  >
                    <div><AnimatedShinyText className="font-semibold">Thinking ...</AnimatedShinyText></div> 
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </ScrollArea>

        {/* Input Area */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="fixed inset-x-2 md:inset-x-1/4 bottom-2 md:bottom-4 backdrop-blur-md rounded-3xl pl-0 md:pl-4 bg-background [box-shadow:0_0_0_1px_rgba(0,0,0,.03),0_2px_4px_rgba(0,0,0,.05),0_12px_24px_rgba(0,0,0,.05)] transform-gpu dark:[border:1px_solid_rgba(255,255,255,.1)] dark:[box-shadow:0_-20px_80px_-20px_#ffffff1f_inset] flex p-4"
        >
          <div className=" mx-auto w-full">
            <div className="flex items-start space-x-3">
              {/* Quick Actions */}
              <div className="hidden md:flex flex-col space-y-2">
                <Button variant="ghost" size="sm" className="w-10 h-10 p-0">
                  <Paperclip className="w-4 h-4" />
                </Button>
              </div>

              {/* Input Field */}
              <div className="flex-1 relative">
                <div className="relative">
                  <Input
                    ref={inputRef}
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    placeholder="Ask me anything about life in the Netherlands..."
                    className="pr-20 w-full py-6 text-base rounded-2xl border-border/50 bg-background backdrop-blur-sm !outline-none focus:bg-background transition-all duration-200"
                  />

                  {/* Input Actions */}
                  <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center space-x-1">
                    <Button variant="ghost" size="sm" className="w-8 h-8 p-0">
                      <Smile className="w-4 h-4" />
                    </Button>
                    <Button variant="ghost" size="sm" className="w-8 h-8 p-0">
                      <Mic className="w-4 h-4" />
                    </Button>
                  </div>
                </div>

                {/* Quick Service Buttons */}
                <div className="md:flex hidden flex-wrap gap-2 mt-3">
                  {[
                    { icon: Home, label: "Housing", color: "from-teal-500 to-teal-600" },
                    { icon: Building2, label: "Government", color: "from-blue-500 to-blue-600" },
                    { icon: Briefcase, label: "Jobs", color: "from-purple-500 to-purple-600" },
                    { icon: Users, label: "Social", color: "from-indigo-500 to-indigo-600" },
                  ].map((service, index) => (
                    <Badge
                      key={index}
                      variant="secondary"
                      className="cursor-pointer hover:scale-105 transition-transform duration-200 bg-muted/50 hover:bg-muted/80"
                      onClick={() => setInputValue(`Tell me about ${service.label.toLowerCase()} services`)}
                    >
                      <service.icon className="w-3 h-3 mr-1" />
                      {service.label}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Send Button */}
              <Button
                onClick={handleSendMessage}
                disabled={!inputValue.trim()}
                className="w-12 h-12 rounded-xl bg-orange-500 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Send className="size-6 stroke-white" />
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
