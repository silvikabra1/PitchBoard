"use client"

import { createContext, useContext, useState, useEffect, useRef, type ReactNode } from "react"
import type { StartupClip } from "@/lib/types"

interface AudioContextType {
  currentClip: StartupClip | null
  isPlaying: boolean
  currentTime: number
  duration: number
  queue: StartupClip[]
  isShuffleMode: boolean
  playClip: (clip: StartupClip) => void
  pauseClip: () => void
  resumeClip: () => void
  seekTo: (time: number) => void
  nextClip: () => void
  previousClip: () => void
  addToQueue: (clip: StartupClip) => void
  removeFromQueue: (clipId: string) => void
  toggleShuffleMode: () => void
}

const AudioContext = createContext<AudioContextType | undefined>(undefined)

export function AudioProvider({ children }: { children: ReactNode }) {
  const [audioElement, setAudioElement] = useState<HTMLAudioElement | null>(null)
  const [currentClip, setCurrentClip] = useState<StartupClip | null>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const [queue, setQueue] = useState<StartupClip[]>([])
  const [isShuffleMode, setIsShuffleMode] = useState(false)

  // Use a ref to access the current value of isShuffleMode in event listeners
  const isShuffleModeRef = useRef(isShuffleMode)

  // Update the ref when the state changes
  useEffect(() => {
    isShuffleModeRef.current = isShuffleMode
  }, [isShuffleMode])

  useEffect(() => {
    const audio = new Audio()
    setAudioElement(audio)

    const handleTimeUpdate = () => {
      setCurrentTime(audio.currentTime)
    }

    const handleDurationChange = () => {
      setDuration(audio.duration)
    }

    const handleEnded = () => {
      setIsPlaying(false)

      // If shuffle mode is enabled, play the next clip
      if (isShuffleModeRef.current) {
        // Small timeout to ensure state updates have propagated
        setTimeout(() => {
          const randomClip = getRandomClip()
          if (randomClip) {
            playClip(randomClip)
          }
        }, 100)
      }
    }

    audio.addEventListener("timeupdate", handleTimeUpdate)
    audio.addEventListener("durationchange", handleDurationChange)
    audio.addEventListener("ended", handleEnded)

    return () => {
      audio.pause()
      audio.removeEventListener("timeupdate", handleTimeUpdate)
      audio.removeEventListener("durationchange", handleDurationChange)
      audio.removeEventListener("ended", handleEnded)
    }
  }, []) // Only run once on mount

  const playClip = (clip: StartupClip) => {
    if (!audioElement) return

    // If we're already playing this clip, just resume
    if (currentClip && currentClip.id === clip.id) {
      resumeClip()
      return
    }

    // Otherwise, load and play the new clip
    setCurrentClip(clip)
    audioElement.src = clip.audioUrl
    audioElement.play().catch((error) => console.error("Error playing audio:", error))
    setIsPlaying(true)

    // Add to queue if not already in it
    if (!queue.some((qClip) => qClip.id === clip.id)) {
      setQueue((prevQueue) => [...prevQueue, clip])
    }
  }

  const pauseClip = () => {
    if (!audioElement) return
    audioElement.pause()
    setIsPlaying(false)
  }

  const resumeClip = () => {
    if (!audioElement) return

    // If the clip has ended, restart from the beginning
    if (audioElement.currentTime >= audioElement.duration - 0.5) {
      // Small threshold for rounding errors
      audioElement.currentTime = 0
    }

    audioElement.play().catch((error) => console.error("Error resuming audio:", error))
    setIsPlaying(true)
  }

  const seekTo = (time: number) => {
    if (!audioElement) return
    audioElement.currentTime = time
    setCurrentTime(time)
  }

  const getRandomClip = () => {
    if (queue.length <= 1) return null

    // Get a random clip that's not the current one
    const availableClips = queue.filter((clip) => clip.id !== currentClip?.id)
    if (availableClips.length === 0) return null

    const randomIndex = Math.floor(Math.random() * availableClips.length)
    return availableClips[randomIndex]
  }

  const nextClip = () => {
    if (!currentClip || queue.length === 0) return

    if (isShuffleMode) {
      // Play a random clip in shuffle mode
      const randomClip = getRandomClip()
      if (randomClip) {
        playClip(randomClip)
      }
      return
    }

    // Normal sequential playback
    const currentIndex = queue.findIndex((clip) => clip.id === currentClip.id)
    if (currentIndex === -1 || currentIndex === queue.length - 1) return

    playClip(queue[currentIndex + 1])
  }

  const previousClip = () => {
    if (!currentClip || queue.length === 0) return

    if (isShuffleMode) {
      // Play a random clip in shuffle mode
      const randomClip = getRandomClip()
      if (randomClip) {
        playClip(randomClip)
      }
      return
    }

    // Normal sequential playback
    const currentIndex = queue.findIndex((clip) => clip.id === currentClip.id)
    if (currentIndex <= 0) return

    playClip(queue[currentIndex - 1])
  }

  const addToQueue = (clip: StartupClip) => {
    if (!queue.some((qClip) => qClip.id === clip.id)) {
      setQueue((prevQueue) => [...prevQueue, clip])
    }
  }

  const removeFromQueue = (clipId: string) => {
    setQueue((prevQueue) => prevQueue.filter((clip) => clip.id !== clipId))
  }

  const toggleShuffleMode = () => {
    setIsShuffleMode((prev) => !prev)
  }

  return (
    <AudioContext.Provider
      value={{
        currentClip,
        isPlaying,
        currentTime,
        duration,
        queue,
        isShuffleMode,
        playClip,
        pauseClip,
        resumeClip,
        seekTo,
        nextClip,
        previousClip,
        addToQueue,
        removeFromQueue,
        toggleShuffleMode,
      }}
    >
      {children}
    </AudioContext.Provider>
  )
}

export function useAudio() {
  const context = useContext(AudioContext)
  if (context === undefined) {
    throw new Error("useAudio must be used within an AudioProvider")
  }
  return context
}
