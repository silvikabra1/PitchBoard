"use client"

import { useState } from "react"
import Image from "next/image"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Play, Bookmark, Send, MapPin } from "lucide-react"
import type { StartupClip } from "@/lib/types"
import { useAudio } from "@/lib/audio-context"

interface AudioClipProps {
  clip: StartupClip
  onSelectStartup: (startupId: string) => void
}

export function AudioClip({ clip, onSelectStartup }: AudioClipProps) {
  const { playClip, currentClip, isPlaying, pauseClip } = useAudio()
  const [isSaved, setIsSaved] = useState(false)

  const isCurrentlyPlaying = currentClip?.id === clip.id && isPlaying

  const handleDoubleClick = () => {
    if (isCurrentlyPlaying) {
      pauseClip()
    } else {
      playClip(clip)
    }
  }

  const handleCompanyClick = () => {
    onSelectStartup(clip.startup.id)
  }

  return (
    <Card className="overflow-hidden cursor-pointer" onDoubleClick={handleDoubleClick}>
      <CardContent className="p-0">
        <div className="flex flex-col md:flex-row">
          <div className="relative w-full md:w-48 h-48 bg-muted">
            <Image
              src={clip.startup.logoUrl || "/placeholder.svg"}
              alt={clip.startup.name}
              fill
              className="object-cover"
            />
            {isCurrentlyPlaying && <div className="absolute bottom-0 left-0 right-0 h-1 bg-primary"></div>}
          </div>
          <div className="flex-1 p-6">
            <div className="flex justify-between items-start mb-2">
              <div>
                <h3 className="text-xl font-bold hover:text-primary cursor-pointer" onClick={handleCompanyClick}>
                  {clip.startup.name}
                </h3>
                <p className="text-muted-foreground">{clip.title}</p>
              </div>
              <div className="flex gap-2">
                {clip.tags.map((tag) => (
                  <Badge key={tag} variant="secondary">
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>

            {/* Location tags displayed separately above description */}
            {clip.locations.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-2">
                {clip.locations.map((location) => (
                  <Badge
                    key={location}
                    variant="outline"
                    className="inline-flex items-center gap-1 text-muted-foreground"
                  >
                    <MapPin className="h-3 w-3" />
                    {location}
                  </Badge>
                ))}
              </div>
            )}

            <p className="mb-4 line-clamp-2">{clip.description}</p>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between p-4 bg-muted/30">
        <div className="flex gap-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={(e) => {
              e.stopPropagation()
              setIsSaved(!isSaved)
            }}
            className={isSaved ? "text-primary" : ""}
          >
            <Bookmark className={isSaved ? "fill-current" : ""} />
          </Button>
        </div>
        <div className="flex gap-2">
          <Button
            size="sm"
            onClick={(e) => {
              e.stopPropagation()
              playClip(clip)
            }}
          >
            <Play className="mr-2 h-4 w-4" />
            Listen
          </Button>
          <Button
            size="sm"
            variant="outline"
            onClick={(e) => {
              e.stopPropagation()
              onSelectStartup(clip.startup.id)
            }}
          >
            <Send className="mr-2 h-4 w-4" />
            Apply
          </Button>
        </div>
      </CardFooter>
    </Card>
  )
}
