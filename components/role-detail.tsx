"use client"

import { useRouter } from "next/navigation"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Play, Pause, Send, Headphones, MapPin, Clock } from "lucide-react"
import { useAudio } from "@/lib/audio-context"
import type { Role, Startup, StartupClip } from "@/lib/types"

interface RoleDetailProps {
  role: Role
  startup: Startup
  roleClip: StartupClip | null
}

export function RoleDetail({ role, startup, roleClip }: RoleDetailProps) {
  const router = useRouter()
  const { playClip, currentClip, isPlaying, pauseClip } = useAudio()

  const handlePlayClip = () => {
    if (roleClip) {
      if (currentClip?.id === roleClip.id && isPlaying) {
        pauseClip()
      } else {
        playClip(roleClip)
      }
    }
  }

  const isCurrentClipPlaying = currentClip?.id === roleClip?.id && isPlaying

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-3xl mx-auto space-y-6">
        {/* Role Header */}
        <div className="flex flex-col md:flex-row gap-6 items-start">
          <div className="relative w-24 h-24 rounded-lg overflow-hidden bg-muted">
            <Image src={startup.logoUrl || "/placeholder.svg"} alt={startup.name} fill className="object-cover" />
          </div>
          <div className="flex-1">
            <h1 className="text-3xl font-bold flex items-center gap-2">
              {role.title}
              {isCurrentClipPlaying && (
                <Headphones className="h-5 w-5 text-primary animate-pulse" />
              )}
            </h1>
            <div className="flex items-center gap-2 mt-2">
              <Button 
                variant="link" 
                className="p-0 h-auto font-normal text-muted-foreground"
                onClick={() => router.push(`/startups/${startup.id}`)}
              >
                {startup.name}
              </Button>
            </div>
            <div className="flex items-center gap-4 mt-4">
              {roleClip && (
                <Button onClick={handlePlayClip}>
                  {isCurrentClipPlaying ? (
                    <Pause className="mr-2 h-4 w-4" />
                  ) : (
                    <Play className="mr-2 h-4 w-4" />
                  )}
                  {isCurrentClipPlaying ? "Pause" : "Listen to Role"}
                </Button>
              )}
              <Button variant="default">
                <Send className="mr-2 h-4 w-4" />
                Apply Now
              </Button>
            </div>
          </div>
        </div>

        {/* Role Description */}
        <Card>
          <CardHeader>
            <CardTitle>About the Role</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <p className="whitespace-pre-wrap">{role.description}</p>
            
            <div className="flex flex-wrap gap-2">
              {role.tags.map((tag) => (
                <Badge key={tag} variant="secondary">
                  {tag}
                </Badge>
              ))}
            </div>

            <div className="flex flex-wrap gap-2">
              {role.location.map((location) => (
                <Badge key={location} variant="outline" className="flex items-center gap-1">
                  <MapPin className="h-3 w-3" />
                  {location}
                </Badge>
              ))}
              <Badge variant="outline" className="flex items-center gap-1">
                <Clock className="h-3 w-3" />
                {role.employmentType}
              </Badge>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
} 