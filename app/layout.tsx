import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { LanguageProvider } from "@/contexts/language-context"
import { ThemeProvider } from "@/components/theme-provider"
import { Toaster } from "sonner"
import AppInitializer from "./auth-provider"
import { Providers } from "./providers"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Liven World",
  description: "Your multilingual assistant for migrants and asylum seekers in the Netherlands",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
      <Providers>
          <AppInitializer>
            <Toaster />
            <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
              <LanguageProvider>
                <div className="w-full relative flex flex-col">
                  {children}
                </div>
              </LanguageProvider>
            </ThemeProvider>
          </AppInitializer>
        </Providers>
      </body>
    </html>
  )
}
