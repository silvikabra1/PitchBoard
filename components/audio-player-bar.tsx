"use client"

import { useState } from "react"
import { useAudio } from "@/lib/audio-context"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { Play, Pause, SkipBack, SkipForward, Bookmark, Send, Shuffle } from "lucide-react"
import { VoiceRecorder } from "@/components/voice-recorder"

interface AudioPlayerBarProps {
  onSelectStartup?: (startupId: string) => void
}

export function AudioPlayerBar({ onSelectStartup }: AudioPlayerBarProps) {
  const {
    currentClip,
    isPlaying,
    currentTime,
    duration,
    playClip,
    pauseClip,
    resumeClip,
    seekTo,
    nextClip,
    previousClip,
    isShuffleMode,
    toggleShuffleMode,
  } = useAudio()
  const [isSaved, setIsSaved] = useState(false)
  const [showVoiceRecorder, setShowVoiceRecorder] = useState(false)

  if (!currentClip) return null

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60)
    const seconds = Math.floor(time % 60)
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`
  }

  const handlePlayPause = () => {
    if (isPlaying) {
      pauseClip()
    } else {
      // If the clip has ended, restart from the beginning
      if (currentTime >= duration - 0.5) {
        // Using a small threshold to account for rounding errors
        seekTo(0)
      }
      resumeClip()
    }
  }

  const handleSeek = (value: number[]) => {
    seekTo(value[0])
  }

  const handleTitleClick = () => {
    if (onSelectStartup) {
      onSelectStartup(currentClip.startup.id)
    }
  }

  const handleApplyNow = () => {
    setShowVoiceRecorder(true)
  }

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-background border-t shadow-lg z-40">
      <div className="container mx-auto px-4 py-3">
        {/* Top row: Job title and action buttons */}
        <div className="flex justify-between items-center mb-2">
          <div className="flex-1 truncate cursor-pointer" onClick={handleTitleClick}>
            <p className="font-medium truncate hover:text-primary">{currentClip.title}</p>
            <p className="text-xs text-muted-foreground truncate">{currentClip.startup.name}</p>
          </div>

          {/* Save and Apply buttons moved to top right */}
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsSaved(!isSaved)}
              className={`h-8 w-8 ${isSaved ? "text-primary" : ""}`}
              title="Save"
            >
              <Bookmark className={`h-4 w-4 ${isSaved ? "fill-current" : ""}`} />
            </Button>

            <Sheet>
              <SheetTrigger asChild>
                <Button size="sm" onClick={handleApplyNow}>
                  <Send className="mr-2 h-4 w-4" />
                  Apply
                </Button>
              </SheetTrigger>
              <SheetContent side="bottom" className="h-[400px]">
                <SheetHeader>
                  <SheetTitle>Apply to {currentClip.title}</SheetTitle>
                </SheetHeader>
                <div className="py-4">
                  <VoiceRecorder onClose={() => setShowVoiceRecorder(false)} clipId={currentClip.id} />
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>

        {/* Progress bar in the middle */}
        <div className="flex items-center gap-2 mb-3">
          <span className="text-xs w-10">{formatTime(currentTime)}</span>
          <Slider
            value={[currentTime]}
            max={duration || 100}
            step={0.1}
            onValueChange={handleSeek}
            className="flex-1"
          />
          <span className="text-xs w-10">{formatTime(duration)}</span>
        </div>

        {/* Controls underneath progress bar - centered */}
        <div className="flex justify-center items-center gap-2">
          <Button variant="ghost" size="icon" onClick={previousClip} className="h-8 w-8">
            <SkipBack className="h-4 w-4" />
          </Button>

          <Button variant="ghost" size="icon" onClick={handlePlayPause} className="h-10 w-10">
            {isPlaying ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5" />}
          </Button>

          <Button variant="ghost" size="icon" onClick={nextClip} className="h-8 w-8">
            <SkipForward className="h-4 w-4" />
          </Button>

          {/* Shuffle button moved next to forward button */}
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleShuffleMode}
            className={`h-8 w-8 ${isShuffleMode ? "text-primary" : ""}`}
            title="Shuffle mode"
          >
            <Shuffle className={`h-4 w-4 ${isShuffleMode ? "fill-current" : ""}`} />
          </Button>
        </div>
      </div>
    </div>
  )
}
