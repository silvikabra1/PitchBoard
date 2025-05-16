"use client"

import { useState } from "react"
import { AudioClip } from "@/components/audio-clip"
import { mockStartupClips } from "@/lib/mock-data"

interface AudioFeedProps {
  onSelectStartup: (startupId: string) => void
}

export function AudioFeed({ onSelectStartup }: AudioFeedProps) {
  const [clips] = useState(mockStartupClips)

  return (
    <div className="space-y-6">
      {clips.map((clip) => (
        <AudioClip key={clip.id} clip={clip} onSelectStartup={onSelectStartup} />
      ))}
    </div>
  )
}
