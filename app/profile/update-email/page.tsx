"use client"

import { useEffect, useRef, useState } from "react"
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { ArrowLeft, RefreshCw, Shield } from "lucide-react"
import { useLanguage } from "@/contexts/language-context"
import { useRouter } from "next/navigation"
import { useUpdateUserMutation } from "@/services/endpoints/admin/admin"
import { toast } from "sonner"

interface EmailFormData {
  currentEmail: string
  newEmail: string
}

export default function UpdateEmailPage() {
  const { t } = useLanguage()
  const router = useRouter()

  const [defaultEmail, setDefaultEmail] = useState<string>("");
  const [userData, setUserData] = useState<any>({});
  const [showOtp, setShowOtp] = useState<boolean>(false);

  const [otp, setOtp] = useState(["", "", "", ""])
  const [resendTimer, setResendTimer] = useState(30)
  const [canResend, setCanResend] = useState(false)
  const inputRefs = useRef<(HTMLInputElement | null)[]>([])

  useEffect(() => {
    if (typeof window !== "undefined") {
      try {
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
          const parsed = JSON.parse(storedUser);
          setDefaultEmail(parsed.email || "");
          setUserData(parsed);
        }
      } catch (err) {
        console.error("Error parsing user from localStorage:", err);
      }
    }
  }, []);

  const [updateUser, { isLoading }] = useUpdateUserMutation();

  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm<EmailFormData>({
    defaultValues: {
      currentEmail: "",
      newEmail: "",
    },
  })

  const newEmailValue = watch("newEmail");

  useEffect(() => {
    if (defaultEmail) {
      reset({ currentEmail: defaultEmail, newEmail: "" });
    }
  }, [defaultEmail, reset]);

  useEffect(() => {
    if (resendTimer > 0) {
      const timer = setTimeout(() => setResendTimer(resendTimer - 1), 1000)
      return () => clearTimeout(timer)
    } else {
      setCanResend(true)
    }
  }, [resendTimer])

  const handleOtpChange = (index: number, value: string) => {
    if (value.length > 1) return

    const newOtp = [...otp]
    newOtp[index] = value
    setOtp(newOtp)

    // Auto-focus next input
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus()
    }
  }

  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus()
    }
  }


  const onSubmit = async () => {
    setShowOtp(true);
    
  };


  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault()
    if (otp.join("").length !== 4) return

    try {
      const response = await updateUser({
        ...userData,
        email: newEmailValue,
        otp : otp.join("")
      }).unwrap();

      console.log("User updated:", response);
      // localStorage.setItem(
      //   "user",
      //   JSON.stringify({ ...userData, email: data.newEmail })
      // );

      toast.success("Email updated successfully!");
    } catch (err) {
      console.error("Failed to update user:", err);
      toast.error("Something went wrong!");
    }

  }

  const handleResend = () => {
    setResendTimer(30)
    setCanResend(false)
    // Simulate resend
  }

  return (
    <div className="min-h-screen bg-background flex flex-col ">
      <Card className="w-full max-w-sm bg-card border-transparent">
        <CardHeader className="pb-4">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" onClick={() => router.back()}>
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <h1 className="text-xl font-semibold">{t("updateEmail")}</h1>
          </div>
        </CardHeader>

        <CardContent className="space-y-6">

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

            {!showOtp && <div className="flex gap-3 pt-4">
              <Button type="submit" className="flex-1 bg-orange-500 hover:bg-orange-600">
                {t("sendVerificationCode")}
              </Button>
            </div>}
          </form>
        </CardContent>
      </Card>

      {showOtp &&
        <Card className="w-full border-transparent">
          <CardHeader className="text-center space-y-4">
            <div>
              <CardTitle className="text-lg font-bold">Verify Your New Email</CardTitle>
              <CardDescription>We've sent a 4-digit code to your email</CardDescription>
            </div>
          </CardHeader>

          <CardContent className="space-y-6">
            <form onSubmit={handleVerify} className="space-y-6">
              {/* OTP Input */}
              <div className="flex justify-center gap-3">
                {otp.map((digit, index) => (
                  <Input
                    key={index}
                    ref={(el: any) => (inputRefs.current[index] = el)}
                    type="text"
                    inputMode="numeric"
                    maxLength={1}
                    value={digit}
                    onChange={(e) => handleOtpChange(index, e.target.value)}
                    onKeyDown={(e) => handleKeyDown(index, e)}
                    className="w-12 h-12 text-center text-lg font-semibold neo-inset"
                    autoFocus={index === 0}
                  />
                ))}
              </div>

              {/* Verify Button */}
              <Button type="submit" className="w-full bg-orange-500 hover:bg-orange-600 neo-button" disabled={isLoading || otp.join("").length !== 4}>
                {(isLoading) ? (
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                    Verifying...
                  </div>
                ) : (
                  <>
                    <Shield className="w-4 h-4 mr-2" />
                    Verify Code
                  </>
                )}
              </Button>
            </form>

            {/* Resend Code */}
            <div className="text-center space-y-2">
              <p className="text-sm text-muted-foreground">Didn't receive the code?</p>

              {canResend ? (
                <Button variant="ghost" onClick={handleResend} className="text-primary hover:text-primary/80">
                  <RefreshCw className="w-4 h-4 mr-2" />
                  Resend Code
                </Button>
              ) : (
                <p className="text-sm text-muted-foreground">Resend code in {resendTimer}s</p>
              )}
            </div>
            
          </CardContent>
        </Card>}
    </div>
  )
}
