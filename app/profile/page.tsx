"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Switch } from "@/components/ui/switch"
import { ArrowLeft, ChevronRight, LogOut } from "lucide-react"
import { useLanguage } from "@/contexts/language-context"
import { Navigation } from "@/components/navigation"
import { ThemeToggle } from "@/components/theme-toggle"
import { useRouter } from "next/navigation"
import { languages } from "@/lib/i18n"
import { setUser } from "@/lib/store/slices/userSlice"
import { useDispatch } from "react-redux"
import { useGetProfileQuery } from "@/services/endpoints/admin/admin"
import { format } from "date-fns"

export default function ProfilePage() {
  const [notificationsEnabled, setNotificationsEnabled] = useState(true)
  const { t, language, setLanguage } = useLanguage()
  const router = useRouter();
  const dispatch = useDispatch();

  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    const storedId = localStorage.getItem("userId");
    setUserId(storedId);
  }, []);

  const { data, refetch } = useGetProfileQuery(
    { id: userId ?? "" },
    { skip: !userId, refetchOnMountOrArgChange: true }
  );

  const getCurrentLanguageName = () => {
    const currentLang = languages.find((lang) => lang.code === language)
    return currentLang?.name || "English"
  }

  const handleLogOut = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    localStorage.removeItem("userId");

    dispatch(setUser({
      id: "",
      fullName: "",
      email: "",
      avatar: ""
    }));
    router.replace("/intro");
  }

  return (
    <div className="h-[100dvh] bg-background flex items-center justify-center">
      <Card className="w-full max-w-sm bg-card h-full pb-20 shadow-none border-transparent flex flex-col">
        <div className="flex items-center gap-4 p-4 border-b">
          <Button variant="ghost" size="icon" onClick={() => router.back()}>
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h1 className="text-xl font-semibold">{t("profile")}</h1>
          <div className="ml-auto">
            <ThemeToggle />
          </div>
        </div>

        <CardContent className="flex-1 p-4 space-y-6 overflow-y-auto">
          <div className="text-center space-y-3">
            <Avatar className="w-20 h-20 mx-auto">
              <AvatarImage src={"/" + data?.data?.user?.avatar} />
              <AvatarFallback>{data?.data?.user?.fullName.charAt[0]}</AvatarFallback>
            </Avatar>
            {data?.data &&
              <div>
                <h2 className="text-xl font-semibold">{data?.data?.user?.fullName}</h2>
                <p className="text-sm text-muted-foreground">
                  {t("joined")} {format(new Date(data?.data?.user?.createdAt), "PPP")}
                </p>
              </div>}
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-semibold">{t("account")}</h3>

            <div className="space-y-3">
              <div
                className="flex items-center justify-between p-3 hover:bg-muted rounded-lg cursor-pointer"
                onClick={() => router.push("/profile/language")}
              >
                <div>
                  <div className="font-medium">{t("language")}</div>
                  <div className="text-sm text-muted-foreground">{getCurrentLanguageName()}</div>
                </div>
                <ChevronRight className="h-5 w-5 text-muted-foreground" />
              </div>

              <div
                className="flex items-center justify-between p-3 hover:bg-muted rounded-lg cursor-pointer"
                onClick={() => router.push("/profile/update-email")}
              >
                <div>
                  <div className="font-medium">{t("email")}</div>
                  <div className="text-sm text-muted-foreground">{data?.data?.user?.email}</div>
                </div>
                <ChevronRight className="h-5 w-5 text-muted-foreground" />
              </div>

              {/* <div
                className="flex items-center justify-between p-3 hover:bg-muted rounded-lg cursor-pointer"
                onClick={() => router.push("/profile/update-password")}
              >
                <div>
                  <div className="font-medium">Password</div>
                  <div className="text-sm text-muted-foreground">••••••••</div>
                </div>
                <ChevronRight className="h-5 w-5 text-muted-foreground" />
              </div> */}
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-semibold">{t("settings")}</h3>

            <div className="space-y-3">
              <div className="flex items-center justify-between p-3">
                <div className="font-medium">{t("notifications")}</div>
                <Switch checked={notificationsEnabled} onCheckedChange={setNotificationsEnabled} />
              </div>

              <div
                onClick={() => router.push("/profile/privacy-policy")}
                className="flex items-center justify-between p-3 hover:bg-muted rounded-lg cursor-pointer">
                <div className="font-medium">{t("privacy")}</div>
                <ChevronRight className="h-5 w-5 text-muted-foreground" />
              </div>

              <div
                onClick={() => router.push("/profile/help")}

                className="flex items-center justify-between p-3 hover:bg-muted rounded-lg cursor-pointer">
                <div className="font-medium">{t("help")}</div>
                <ChevronRight className="h-5 w-5 text-muted-foreground" />
              </div>

              <div
                onClick={() => router.push("/profile/about")}

                className="flex items-center justify-between p-3 hover:bg-muted rounded-lg cursor-pointer">
                <div className="font-medium">{t("about")}</div>
                <ChevronRight className="h-5 w-5 text-muted-foreground" />
              </div>

              <div onClick={handleLogOut} className="flex items-center justify-between p-3 hover:bg-muted rounded-lg cursor-pointer">
                <button  className="font-medium">{t("logOut")}</button>
                <LogOut className="h-5 w-5 text-muted-foreground" />
              </div>
            </div>
          </div>
        </CardContent>

        <Navigation />
      </Card>
    </div>
  )
}
