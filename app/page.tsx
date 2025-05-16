"use client"

import { useState } from "react"
import { AudioFeed } from "@/components/audio-feed"
import { Header } from "@/components/header"
import { Hero } from "@/components/hero"
import { StartupDetail } from "@/components/startup-detail"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import { mockStartups } from "@/lib/mock-data"
import { AudioPlayerBar } from "@/components/audio-player-bar"
import type { Startup } from "@/lib/types"

export default function Home() {
  const [selectedStartup, setSelectedStartup] = useState<Startup | null>(null)

  const handleSelectStartup = (startupId: string) => {
    const startup = mockStartups.find((s) => s.id === startupId)
    if (startup) {
      setSelectedStartup(startup)
      // Scroll to top when changing view
      window.scrollTo(0, 0)
    }
  }

  const handleBack = () => {
    setSelectedStartup(null)
  }

  return (
    <main className="min-h-screen bg-background">
      <Header onSelectStartup={handleSelectStartup} />

      {selectedStartup ? (
        <div className="container mx-auto px-4 py-8 pb-36">
          <div className="mb-6">
            <Button
              variant="ghost"
              size="sm"
              onClick={handleBack}
              className="flex items-center gap-1 text-muted-foreground hover:text-foreground"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Discover
            </Button>
          </div>
          <StartupDetail startup={selectedStartup} />
        </div>
      ) : (
        <>
          <Hero />
          <div className="container mx-auto px-4 py-8 pb-36">
            <h2 className="text-2xl font-bold mb-6">Discover Startups</h2>
            <AudioFeed onSelectStartup={handleSelectStartup} />
          </div>
        </>
      )}

      <AudioPlayerBar onSelectStartup={handleSelectStartup} />
    </main>
  )
}
