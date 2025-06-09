"use client"

import { Button } from "@/components/ui/button"
import { useAudio } from "@/lib/audio-context"
import { getAllStartupClips } from "@/lib/api"

export function Hero() {
  const startupClips = getAllStartupClips()

  const { playClip } = useAudio()

  const handleStartListening = () => {
    // Play the first clip when the button is clicked
    if (startupClips && startupClips.length > 0) {
      playClip(startupClips[0])
    }
  }

  return (
    <div className="relative bg-gradient-to-b from-background to-muted">
      <div className="container mx-auto px-4 py-16 md:py-24 lg:py-32">
        <div className="grid gap-6 md:grid-cols-2 md:gap-10">
          <div className="flex flex-col justify-center space-y-4">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl">
                Discover Startups Through Audio
              </h1>
              <p className="max-w-[600px] text-muted-foreground md:text-xl">
                Listen to startup pitches and job opportunities while you multitask. Apply with your voice and show your
                genuine interest.
              </p>
            </div>
            <div>
              <Button size="lg" onClick={handleStartListening}>
                Start Listening
              </Button>
            </div>
          </div>
          <div className="flex items-center justify-center">
            <div className="relative h-[300px] w-[300px] md:h-[400px] md:w-[400px] rounded-full bg-muted-foreground/10 flex items-center justify-center">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="h-[200px] w-[200px] md:h-[300px] md:w-[300px] rounded-full bg-muted-foreground/20 animate-pulse"></div>
              </div>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="h-[100px] w-[100px] md:h-[200px] md:w-[200px] rounded-full bg-muted-foreground/30 animate-pulse"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
