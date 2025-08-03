"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { ArrowLeft } from "lucide-react"
import { useLanguage } from "@/contexts/language-context"
import { useRouter } from "next/navigation"

interface EmailFormData {
  currentEmail: string
  newEmail: string
}

export default function UpdateEmailPage() {
  const { t } = useLanguage()
  const router = useRouter()
  const [showSuccess, setShowSuccess] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<EmailFormData>({
    defaultValues: {
      currentEmail: "sophia.miller@email.com",
      newEmail: "",
    },
  })

  const onSubmit = (data: EmailFormData) => {
    console.log("Email update:", data)
    setShowSuccess(true)
    setTimeout(() => {
      setShowSuccess(false)
      router.back()
    }, 1500)
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <Card className="w-full max-w-sm bg-card">
        <CardHeader className="pb-4">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" onClick={() => router.back()}>
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <h1 className="text-xl font-semibold">{t("updateEmail")}</h1>
          </div>
        </CardHeader>

        <CardContent className="space-y-6">
          {showSuccess && (
            <div className="bg-green-50 dark:bg-green-950 border border-green-200 dark:border-green-800 rounded-lg p-4 text-center">
              <p className="text-green-800 dark:text-green-200 font-medium">{t("profileUpdated")}</p>
            </div>
          )}

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div>
              <Input
                placeholder={t("currentEmail")}
                type="email"
                className="bg-muted border-0 rounded-lg py-3"
                {...register("currentEmail")}
                disabled
              />
            </div>

            <div>
              <Input
                placeholder={t("newEmail")}
                type="email"
                className="bg-muted border-0 rounded-lg py-3"
                {...register("newEmail", {
                  required: t("emailRequired"),
                  pattern: {
                    value: /^\S+@\S+$/i,
                    message: t("emailInvalid"),
                  },
                })}
              />
              {errors.newEmail && <p className="text-red-500 text-sm mt-1">{errors.newEmail.message}</p>}
            </div>

            <div className="flex gap-3 pt-4">
              <Button variant="outline" className="flex-1 bg-transparent" onClick={() => router.back()}>
                {t("cancel")}
              </Button>
              <Button type="submit" className="flex-1 bg-orange-500 hover:bg-orange-600">
                {t("save")}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
