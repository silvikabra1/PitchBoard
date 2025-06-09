"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Play, Bookmark, Send, MapPin, Headphones } from "lucide-react"
import type { Role } from "@/lib/types"
import { useAudio } from "@/lib/audio-context"
import { getStartupById, getRoleById, getClipForRole, getStartupForRole, setSavedRole } from "@/lib/api"
import { useRouter } from "next/navigation"

interface RoleCardProps {
  role: Role
}

export function RoleCard({ role }: RoleCardProps) {
  const router = useRouter()
  const { playClip, currentClip, isPlaying, pauseClip } = useAudio()
  const [isSaved, setIsSaved] = useState(false)

  const startup = getStartupForRole(role.id)
  const clip = getClipForRole(role.id)

  if (!startup) return null

  const isCurrentlyPlaying = clip && currentClip?.id === clip.id && isPlaying

  const handleDoubleClick = () => {
    if (clip) {
      if (!isCurrentlyPlaying) {
        playClip(clip)
      }
    }
  }

  const handleSave = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    alert("Save clicked") // This will show a browser alert to confirm the click
    const newSavedState = !isSaved
    setSavedRole(role.id, newSavedState)
    setIsSaved(newSavedState)
  }

  // Initialize saved state from role
  useEffect(() => {
    setIsSaved(role.saved || false)
  }, [role.id])

  const handleCompanyClick = (e: React.MouseEvent) => {
    e.stopPropagation()
    router.push(`/startups/${startup.id}`)
  }

  const handleRoleClick = (e: React.MouseEvent) => {
    e.stopPropagation()
    router.push(`/roles/${role.id}`)
  }

  return (
    <Card 
      className={`overflow-hidden cursor-pointer transition-colors duration-200 ${
        isCurrentlyPlaying ? "border-2 border-primary" : ""
      }`} 
      onDoubleClick={handleDoubleClick}
    >
      <CardContent className="p-0">
        <div className="flex flex-col md:flex-row">
          <div className="relative w-full md:w-48 h-48 bg-muted">
            <Image
              src={startup.logoUrl || "/placeholder.svg"}
              alt={startup.name}
              fill
              className="object-cover"
            />
          </div>
          <div className="flex-1 p-6">
            <div className="flex justify-between items-start mb-2">
              <div className="flex flex-col gap-1">
                <div className="flex items-center gap-2">
                  <h3 
                    className="text-xl font-bold hover:text-primary cursor-pointer" 
                    onClick={handleRoleClick}
                  >
                    {role.title}
                  </h3>
                  {isCurrentlyPlaying && (
                    <Headphones className="h-5 w-5 text-primary animate-pulse" />
                  )}
                </div>
                <div 
                  className="text-muted-foreground hover:text-primary cursor-pointer" 
                  onClick={handleCompanyClick}
                >
                  {startup.name}
                </div>
              </div>
              <div className="flex gap-2">
                {role.tags.map((tag: string) => (
                  <Badge key={tag} variant="secondary">
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>

            {/* Location tags displayed separately above description */}
            {role.location.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-2">
                {role.location.map((location: string) => (
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

            <p className="mb-4 line-clamp-2">{role.description}</p>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between p-4 bg-muted/30">
        <div className="flex gap-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={handleSave}
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
              if (clip) {
                playClip(clip)
              }
            }}
            disabled={!clip}
          >
            <Play className="mr-2 h-4 w-4" />
            Listen
          </Button>
          <Button
            size="sm"
            variant="outline"
            onClick={(e) => {
              e.stopPropagation()
              router.push(`/roles/${role.id}`)
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
