"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

export default function WelcomePage() {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <Card className="w-full max-w-sm bg-white">
        <CardContent className="p-8 text-center space-y-8">
          <div className="space-y-4">
            <h1 className="text-2xl font-bold text-gray-900">Welcome to Liven Chat</h1>
            <p className="text-gray-600 text-sm leading-relaxed">
              Your multilingual assistant for migrants and asylum seekers in the Netherlands.
            </p>
          </div>

          <div className="flex-1 min-h-[400px]" />

          <Button
            className="w-full bg-orange-500 hover:bg-orange-600 text-white rounded-full !py-6"
            onClick={() => (window.location.href = "/language")}
          >
            Get Started
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
