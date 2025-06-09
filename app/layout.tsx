import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { Header } from "@/components/header"
import { AudioPlayerBarWrapper } from "@/components/audio-player-bar-wrapper"
import { AudioProvider } from "@/lib/audio-context"
import { StartupProvider } from "@/lib/startup-context"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "StartupSound",
  description: "Find your next startup role through audio",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <StartupProvider>
            <AudioProvider>
              <div className="relative min-h-screen flex flex-col">
                <Header />
                <main className="flex-1">
                  {children}
                </main>
                <AudioPlayerBarWrapper />
              </div>
            </AudioProvider>
          </StartupProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
