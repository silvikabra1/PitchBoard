"use client"

import { createContext, useContext, useState, useEffect, useRef, type ReactNode } from "react"
import type { StartupClip } from "@/lib/types"
import { getAllStartupClips } from "./api"

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
  const startupClips = getAllStartupClips()

  const [audioElement, setAudioElement] = useState<HTMLAudioElement | null>(null)
  const [currentClip, setCurrentClip] = useState<StartupClip | null>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const [queue, setQueue] = useState<StartupClip[]>(startupClips ? startupClips : [])
  const [isShuffleMode, setIsShuffleMode] = useState(false)
  const [playedClips, setPlayedClips] = useState<Set<string>>(new Set())

  // Use a ref to access the current value of isShuffleMode in event listeners
  const isShuffleModeRef = useRef(isShuffleMode)
  const currentClipRef = useRef(currentClip)

  // Update the refs when the states change
  useEffect(() => {
    isShuffleModeRef.current = isShuffleMode
    currentClipRef.current = currentClip
  }, [isShuffleMode, currentClip])

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
      // If shuffle mode is enabled, play the next clip immediately
      if (isShuffleModeRef.current) {
        const randomClip = getRandomClip()
        if (randomClip) {
          // Don't set isPlaying to false since we're immediately playing the next clip
          setCurrentClip(randomClip)
          audio.src = randomClip.audioUrl
          audio.play().catch((error) => console.error("Error playing next clip:", error))
          setPlayedClips(prev => new Set([...prev, randomClip.id]))
          return
        }
      }
      
      // If we get here, either shuffle mode is off or there's no next clip
      setIsPlaying(false)
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

    // Add to played clips
    setPlayedClips(prev => new Set([...prev, clip.id]))

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
    // If queue is empty, use all available clips
    const availableClips = queue.length > 0 ? queue : (startupClips ? startupClips : [])
    
    // First try to find clips that haven't been played yet
    const unplayedClips = availableClips.filter(clip => !playedClips.has(clip.id))
    
    // If we have unplayed clips, use those
    if (unplayedClips.length > 0) {
      const randomIndex = Math.floor(Math.random() * unplayedClips.length)
      return unplayedClips[randomIndex]
    }
    
    // If all clips have been played, reset the played clips and try again
    setPlayedClips(new Set())
    const randomIndex = Math.floor(Math.random() * availableClips.length)
    return availableClips[randomIndex]
  }

  const nextClip = () => {
    if (!currentClip) return

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
    if (!currentClip) return

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
