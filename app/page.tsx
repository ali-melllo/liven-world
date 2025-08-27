"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { useLanguage } from "@/contexts/language-context"
import { ThemeToggle } from "@/components/theme-toggle"
import { useRouter } from "next/navigation"
import {
  HomeIcon as House,
  Heart,
  Briefcase,
  Scale,
  Globe,
  DollarSign,
  MessageCircle,
  Clock,
  Shield,
  Users,
  LogOut,
  LogIn,
} from "lucide-react"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { RootState } from "@/lib/store/store"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { setUser } from "@/lib/store/slices/userSlice"
import Link from "next/link"

const features = [
  {
    icon: Clock,
    titleKey: "feature1Title" as const,
    descKey: "feature1Desc" as const,
  },
  {
    icon: Shield,
    titleKey: "feature2Title" as const,
    descKey: "feature2Desc" as const,
  },
  {
    icon: Users,
    titleKey: "feature3Title" as const,
    descKey: "feature3Desc" as const,
  },
]

const topics = [
  {
    icon: House,
    titleKey: "housing" as const,
    descKey: "housingDesc" as const,
    color: "bg-blue-100 text-blue-600 dark:bg-blue-900 dark:text-blue-300",
  },
  {
    icon: Heart,
    titleKey: "healthcare" as const,
    descKey: "healthcareDesc" as const,
    color: "bg-red-100 text-red-600 dark:bg-red-900 dark:text-red-300",
  },
  {
    icon: Briefcase,
    titleKey: "work" as const,
    descKey: "workDesc" as const,
    color: "bg-green-100 text-green-600 dark:bg-green-900 dark:text-green-300",
  },
  {
    icon: Scale,
    titleKey: "legal" as const,
    descKey: "legalDesc" as const,
    color: "bg-purple-100 text-purple-600 dark:bg-purple-900 dark:text-purple-300",
  },
  {
    icon: Globe,
    titleKey: "culture" as const,
    descKey: "cultureDesc" as const,
    color: "bg-yellow-100 text-yellow-600 dark:bg-yellow-900 dark:text-yellow-300",
  },
  {
    icon: DollarSign,
    titleKey: "finance" as const,
    descKey: "financeDesc" as const,
    color: "bg-indigo-100 text-indigo-600 dark:bg-indigo-900 dark:text-indigo-300",
  },
]

export default function LandingPage() {
  const { t } = useLanguage()
  const router = useRouter()
  const [token, setToken] = useState<string>("")
  const [fullName, setFullName] = useState("")
  const [email, setEmail] = useState("")


  const [isAuthenticated, setIsAuthenticated] = useState(false) // For demo purposes

  const user = useSelector((state: RootState) => state.user || []);
  const dispatch = useDispatch();


  useEffect(() => {
    if (user.email && user.fullName) {
      setIsAuthenticated(true);
      setEmail(user.email);
      setFullName(user.fullName);
    }
  }, [user])

  const handleLogOut = () => {
    localStorage.removeItem("user")
    dispatch(setUser({
      id: "",
      fullName: "",
      email: "",
      avatar: ""
    }));
    setIsAuthenticated(false)
    setFullName("")
    setEmail("")
    setToken("")
    router.replace("/")
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <MessageCircle className="h-6 w-6 text-orange-500" />
            <span className="text-xl font-bold">{t("appTitle")}</span>
          </div>
          <div className="flex items-center gap-2 justify-end">
            <ThemeToggle />
            <Button className="hidden" variant="outline" onClick={() => router.push("/chat")}>
              {t("logIn")}
            </Button>
            {isAuthenticated ? (
              <div className=" py-2 space-y-3">
                <Link href={"/profile"} className="flex items-center space-x-3">
                  <Avatar className="w-10 h-10">
                    <AvatarFallback className="bg-gradient-to-br from-orange-500 to-orange-600 text-white">
                      {fullName.charAt(0)}{fullName.charAt(1)}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium">{fullName}</p>
                    <p className="text-xs text-muted-foreground">{email}</p>
                  </div>
                </Link>
              </div>
            ) : (
              <div className="py-2">
                <Button
                  onClick={() => router.push("/signin")}
                  className="w-full bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700"
                >
                  <LogIn className="w-4 h-4" />
                  Sign In
                </Button>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-14 md:py-20 px-4">
        
      </section>

      {/* Features Section */}
      {/* <section className="py-20 px-4 bg-muted/50">
        <div className="container max-w-6xl mx-auto">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-3xl md:text-4xl font-bold">{t("featuresTitle")}</h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => {
              const IconComponent = feature.icon
              return (
                <Card key={index} className="text-center">
                  <CardContent className="p-8 space-y-4">
                    <div className="w-16 h-16 bg-orange-100 dark:bg-orange-900 rounded-full flex items-center justify-center mx-auto">
                      <IconComponent className="h-8 w-8 text-orange-600 dark:text-orange-300" />
                    </div>
                    <h3 className="text-xl font-semibold">{t(feature.titleKey)}</h3>
                    <p className="text-muted-foreground">{t(feature.descKey)}</p>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>
      </section>

      <section className="py-20 px-4">
        <div className="container max-w-6xl mx-auto">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-3xl md:text-4xl font-bold">{t("commonTopics")}</h2>
            <p className="text-xl text-muted-foreground">Get help with the topics that matter most to you</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {topics.map((topic, index) => {
              const IconComponent = topic.icon
              return (
                <Card key={index} className="hover:shadow-lg transition-shadow cursor-pointer">
                  <CardContent className="p-6 space-y-4">
                    <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${topic.color}`}>
                      <IconComponent className="h-6 w-6" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold mb-2">{t(topic.titleKey)}</h3>
                      <p className="text-sm text-muted-foreground">{t(topic.descKey)}</p>
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>
      </section>

      <section className="py-20 px-4 bg-orange-50 dark:bg-orange-950">
        <div className="container max-w-4xl mx-auto text-center space-y-8">
          <div className="space-y-4">
            <h2 className="text-3xl md:text-4xl font-bold">Ready to get started?</h2>
            <p className="text-xl text-muted-foreground">
              Join thousands of people who trust Liven World for guidance in the Netherlands.
            </p>
          </div>

          <Button size="lg" className="bg-orange-500 hover:bg-orange-600" onClick={() => router.push("/onboarding")}>
            {t("getStartedNow")}
          </Button>
        </div>
      </section>

      <footer className="border-t py-12 px-4">
        <div className="container max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="flex items-center gap-2">
              <MessageCircle className="h-6 w-6 text-orange-500" />
              <span className="text-xl font-bold">{t("appTitle")}</span>
            </div>
            <p className="text-sm text-muted-foreground text-center">{t("termsText")}</p>
          </div>
        </div>
      </footer> */}
    </div>
  )
}
