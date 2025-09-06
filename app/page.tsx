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
  Settings,
} from "lucide-react"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { RootState } from "@/lib/store/store"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { setUser } from "@/lib/store/slices/userSlice"
import Link from "next/link"
import Image from "next/image"
import { Navigation } from "@/components/navigation"

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
        <div className="pl-5 relative flex h-16 items-center justify-between">
          <div className="flex mx-auto items-center gap-2">
            <span className="text-lg font-bold">{t("appTitle")}</span>
          </div>
          <div className="absolute right-0 flex items-center justify-end">
            <ThemeToggle />
            <div className="py-2">
              <Button
                onClick={() => router.push("/profile")}
                className="w-full hover:bg-transparent bg-transparent"
              >
                <Settings className="w-4 h-4 stroke-foreground" />
              </Button>
            </div>

          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-3 flex flex-col gap-5 md:py-20 px-4">
        <Link href={"/chat"} className="w-full flex flex-col">
          <div className="w-full h-48 flex">
            <Image
              src={'/hero-one.png'}
              alt={"chat"}
              className="rounded-lg object-cover"
              width={1000}
              height={500}
            />
          </div>
          <p className="font-semibold mt-2">{t("startNewChat")}</p>
          <p className="text-gray-500 text-sm">{t("agentConnect")}</p>
        </Link>

        <Link href={"/topics"} className="w-full flex flex-col">
          <div className="w-full h-48 flex">
            <Image
              src={'/hero-two.png'}
              alt={"chat"}
              className="rounded-lg object-cover"
              width={1000}
              height={500}
            />
          </div>
          <p className="font-semibold mt-2">{t("commonTopics")}</p>
          <p className="text-gray-500 text-sm">{t("findAnswers")}</p>
        </Link>

      </section>

      <Navigation />

    </div>
  )
}
