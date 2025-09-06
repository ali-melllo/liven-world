"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { ArrowLeft, Loader } from "lucide-react"
import { useLanguage } from "@/contexts/language-context"
import { useRouter } from "next/navigation"
import { useCreatePostMutation } from "@/services/endpoints/my-hero/my-hero"
import { toast } from "sonner"


enum postType {
  LOOKING = "looking_for_help",
  OFFERING = "offering_help",
}

interface PostFormData {
  content: string
  type: "looking_for_help" | "offering_help"
}

export default function WritePostPage() {
  const { t } = useLanguage()
  const router = useRouter()
  const [showSuccess, setShowSuccess] = useState(false)

  const [createPost, { isLoading }] = useCreatePostMutation();

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<PostFormData>({
    defaultValues: {
      content: "",
      type: "looking_for_help",
    },
  })

  const watchedType = watch("type")

  const onSubmit = async (data: PostFormData) => {
    try {
      await createPost(data).unwrap()
      toast("Comment Added Successfully")
      router.push("/my-hero");
    } catch (err) {
      console.error("Failed to create post:", err)
    }
  }

  return (
    <div className="min-h-screen bg-background flex justify-center p-4">
      <Card className="w-full max-w-sm bg-card border-transparent">
        <CardHeader className="pb-4">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" onClick={() => router.back()}>
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <h1 className="text-xl font-semibold">{t("writePost")}</h1>
          </div>
        </CardHeader>

        <CardContent className="space-y-6 mt-10">
         
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Post Type */}
            <div>
              <Label className="text-sm font-medium mb-3 block">{t("postType")}</Label>
              <RadioGroup
                value={watchedType}
                onValueChange={(value) => setValue("type", value as "looking_for_help" | "offering_help")}
              >
                <div className="flex items-center space-x-3 p-3 border rounded-lg">
                  <RadioGroupItem value="looking_for_help" id="looking_for_help" />
                  <Label htmlFor="looking_for_help" className="flex-1">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-blue-500 rounded-full" />
                      {t("lookingForHelp")}
                    </div>
                  </Label>
                </div>
                <div className="flex items-center space-x-3 p-3 border rounded-lg">
                  <RadioGroupItem value="offering_help" id="offering_help" />
                  <Label htmlFor="offering_help" className="flex-1">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full" />
                      {t("offeringHelp")}
                    </div>
                  </Label>
                </div>
              </RadioGroup>
            </div>

            {/* Content */}
            <div>
              <Textarea
                placeholder={t("postContent")}
                className="bg-muted border border-muted-foreground rounded-lg py-3 min-h-[120px] resize-none"
                {...register("content", { required: t("contentRequired") })}
              />
              {errors.content && <p className="text-red-500 text-sm mt-1">{errors.content.message}</p>}
            </div>

            <div className="flex gap-3 pt-4">
              <Button variant="outline" className="flex-1 bg-transparent" onClick={() => router.back()}>
                {t("cancel")}
              </Button>
              <Button type="submit" className="flex-1 bg-orange-500 hover:bg-orange-600" disabled={isLoading}>
                {isLoading && <Loader className="animate-spin" />}

                {isLoading ? t("publishing") : t("publish")}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
