"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ArrowLeft } from "lucide-react"

export default function ProfileSetupPage() {
  const [formData, setFormData] = useState({
    fullName: "",
    nationality: "",
    municipality: "",
    email: "",
    password: "",
    gender: "",
    status: "",
  })

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <Card className="w-full max-w-sm bg-white">
        <CardHeader className="pb-4">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" onClick={() => window.history.back()}>
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <h1 className="text-xl font-semibold">Profile Setup</h1>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          <h2 className="text-lg font-semibold text-gray-900">Tell us about yourself</h2>

          <div className="space-y-4">
            <Input
              placeholder="Full Name"
              className="bg-gray-100 border-0 rounded-lg py-3"
              value={formData.fullName}
              onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
            />

            <Input
              placeholder="Nationality"
              className="bg-gray-100 border-0 rounded-lg py-3"
              value={formData.nationality}
              onChange={(e) => setFormData({ ...formData, nationality: e.target.value })}
            />

            <Input
              placeholder="Municipality"
              className="bg-gray-100 border-0 rounded-lg py-3"
              value={formData.municipality}
              onChange={(e) => setFormData({ ...formData, municipality: e.target.value })}
            />

            <Input
              placeholder="Email Address"
              type="email"
              className="bg-gray-100 border-0 rounded-lg py-3"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            />

            <Input
              placeholder="Password"
              type="password"
              className="bg-gray-100 border-0 rounded-lg py-3"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            />

            <Select value={formData.gender} onValueChange={(value) => setFormData({ ...formData, gender: value })}>
              <SelectTrigger className="bg-gray-100 border-0 rounded-lg py-3">
                <SelectValue placeholder="Gender" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="male">Male</SelectItem>
                <SelectItem value="female">Female</SelectItem>
                <SelectItem value="other">Other</SelectItem>
                <SelectItem value="prefer-not-to-say">Prefer not to say</SelectItem>
              </SelectContent>
            </Select>

            <Select value={formData.status} onValueChange={(value) => setFormData({ ...formData, status: value })}>
              <SelectTrigger className="bg-gray-100 border-0 rounded-lg py-3">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="asylum-seeker">Asylum Seeker</SelectItem>
                <SelectItem value="refugee">Refugee</SelectItem>
                <SelectItem value="migrant">Migrant</SelectItem>
                <SelectItem value="student">Student</SelectItem>
                <SelectItem value="other">Other</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Button
            className="w-full bg-orange-500 hover:bg-orange-600 text-white rounded-full py-3 mt-8"
            onClick={() => (window.location.href = "/onboarding")}
          >
            Next
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
