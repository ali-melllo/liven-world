"use client"

import type React from "react"
import { useState, useRef, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Shield, RefreshCw } from "lucide-react"
import { useLoginUserMutation, useSignUpUserMutation } from "@/services/endpoints/admin/admin"
import { setAuthToken } from "@/services/auth/action"
import { toast } from "sonner"
import { setUser } from "@/lib/store/slices/userSlice"
import { useDispatch } from "react-redux"
import { useLanguage } from "@/contexts/language-context"

export default function OTPVerificationPage({ data, isForLogin }: { data: any, isForLogin: boolean }) {
  const dispatch = useDispatch()
  const [otp, setOtp] = useState(["", "", "", ""])
  const [resendTimer, setResendTimer] = useState(30)
  const [canResend, setCanResend] = useState(false)
  const inputRefs = useRef<(HTMLInputElement | null)[]>([])
  const router = useRouter()
  const { t } = useLanguage()

  const [signUpUser, { isLoading }] = useSignUpUserMutation()
  const [loginUser, { isLoading: signInLoading }] = useLoginUserMutation()

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
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus()
    }
  }

  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus()
    }
  }

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault()
    if (otp.join("").length !== 4) return

    if (isForLogin) {
      const response = await loginUser({ ...data, otp: otp.join("") }).unwrap()
      await setAuthToken(response.token)
      localStorage.setItem("user", JSON.stringify(response.user))
      localStorage.setItem("token", response.token)
      localStorage.setItem("userId", response.user.id)
      dispatch(setUser(response.user))
      toast(t("loginSuccess"))
      router.replace("/")
    } else {
      const response = await signUpUser({ ...data, otp: otp.join("") }).unwrap()
      await setAuthToken(response.token)
      localStorage.setItem("user", JSON.stringify(response.user))
      localStorage.setItem("token", response.token)
      localStorage.setItem("userId", response.user.id)
      dispatch(setUser(response.user))
      toast(t("signupSuccess"))
      router.replace("/")
    }
  }

  const handleResend = () => {
    setResendTimer(30)
    setCanResend(false)
    // Simulate resend
  }

  return (
    <div className="h-dvh bg-gradient-to-br from-background via-background to-muted/20 flex items-center justify-center">
      <Card className="w-full border-transparent p-0">
        <CardHeader className="text-center space-y-4">
          <div>
            <CardTitle className="text-2xl font-bold">{t("verifyAccount")}</CardTitle>
            <CardDescription>{t("otpSentDescription")}</CardDescription>
          </div>
        </CardHeader>

        <CardContent className="space-y-6">
          <form onSubmit={handleVerify} className="space-y-6">
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

            <Button
              type="submit"
              className="w-full h-12 text-lg bg-orange-500 hover:bg-orange-600 neo-button"
              disabled={isLoading || otp.join("").length !== 4 || signInLoading}
            >
              {(isLoading || signInLoading) ? (
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                  {t("verifying")}
                </div>
              ) : (
                <>
                  <Shield className="w-4 h-4 mr-2" />
                  {t("verifyCode")}
                </>
              )}
            </Button>
          </form>

          <div className="text-center space-y-2">
            <p className="text-sm text-muted-foreground">{t("didNotReceiveCode")}</p>
            {canResend ? (
              <Button variant="ghost" onClick={handleResend} className="text-primary hover:text-primary/80">
                <RefreshCw className="w-4 h-4 mr-2" />
                {t("resendCode")}
              </Button>
            ) : (
              <p className="text-sm text-muted-foreground">{t("resendIn")} {resendTimer}</p>
            )}
          </div>

          <div className="text-center">
            <p className="text-xs text-muted-foreground">
              {t("supportText")}{" "}
              <a href="mailto:support@liven-world.app" className="text-primary hover:underline">
                support@liven-world.app
              </a>
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
