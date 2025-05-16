import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { AudioProvider } from "@/lib/audio-context"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "StartupSound - Discover Startups Through Audio",
  description: "Voice-first platform for discovering startups and job opportunities through audio clips",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AudioProvider>{children}</AudioProvider>
      </body>
    </html>
  )
}
