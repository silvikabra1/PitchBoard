"use client"

import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ExternalLink, MapPin, Clock, Play, Send, Headphones } from "lucide-react"
import { useAudio } from "@/lib/audio-context"
import type { Startup, StartupClip } from "@/lib/types"
import { getClipForRole, getClipsForStartup, getRoleById, getSimilarStartupsToStartup } from "@/lib/api"
import { useRouter } from "next/navigation"
import { useStartup } from "@/lib/startup-context"

interface StartupDetailProps {
  startup: Startup
}

export function StartupDetail({ startup }: StartupDetailProps) {
  const router = useRouter()
  const { playClip, currentClip, isPlaying, pauseClip } = useAudio()
  const { setSelectedStartupId } = useStartup()

  // Find all clips for this startup
  const startupClips = getClipsForStartup(startup.id)

  const handlePlayClip = (clip: StartupClip) => {
    if (currentClip?.id === clip.id && isPlaying) {
      pauseClip()
    } else {
      playClip(clip)
    }
  }

  const handleRoleClick = (roleId: string) => {
    router.push(`/roles/${roleId}`)
  }

  const handleStartupClick = (startupId: string) => {
    setSelectedStartupId(startupId)
    router.push(`/startups/${startupId}`)
  }

  return (
    <div className="grid gap-8 md:grid-cols-3">
      <div className="md:col-span-2 space-y-6">
        <div className="flex flex-col md:flex-row gap-6 items-start">
          <div className="relative w-24 h-24 rounded-lg overflow-hidden bg-muted">
            <Image src={startup.logoUrl || "/placeholder.svg"} alt={startup.name} fill className="object-cover" />
          </div>
          <div>
            <h1 className="text-3xl font-bold">{startup.name}</h1>
            <p className="text-muted-foreground">{startup.description}</p>
            <div className="flex gap-2 mt-2">
              <Button variant="outline" size="sm" asChild>
                <a href={startup.website} target="_blank" rel="noopener noreferrer">
                  <ExternalLink className="mr-2 h-4 w-4" />
                  Website
                </a>
              </Button>
            </div>
          </div>
        </div>

        <Tabs defaultValue="about">
          <TabsList>
            <TabsTrigger value="about">About</TabsTrigger>
            <TabsTrigger value="roles">Open Roles</TabsTrigger>
          </TabsList>
          <TabsContent value="about">
            <div className="prose dark:prose-invert max-w-none">
              <h2>About {startup.name}</h2>
              <p>
                {startup.description} Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam euismod, nisl eget
                aliquam ultricies, nunc nisl aliquet nunc, quis aliquam nisl nunc, quis aliquam nisl nunc quis nisl.
                Nullam euismod, nisl eget aliquam ultricies, nunc nisl aliquet nunc, quis aliquam nisl nunc quis nisl.
              </p>
              <h3>Our Mission</h3>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam euismod, nisl eget aliquam ultricies,
                nunc nisl aliquet nunc, quis aliquam nisl nunc quis nisl.
              </p>
              <h3>Our Team</h3>
              <p>
                We're a team of passionate individuals dedicated to solving complex problems with innovative solutions.
                Our diverse backgrounds and experiences help us approach challenges from multiple perspectives.
              </p>
            </div>
          </TabsContent>
          <TabsContent value="roles" className="space-y-4">
            {startup.roleIds.map((roleId) => {
              const role = getRoleById(roleId)
              if (!role) return null
              // Find the audio clip for this role if it exists
              const roleClip = getClipForRole(roleId)

              return (
                <Card 
                  key={role.id} 
                  className="cursor-pointer hover:border-primary/50 transition-colors"
                  onClick={() => handleRoleClick(role.id)}
                >
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      {role.title}
                      {roleClip && currentClip?.id === roleClip.id && isPlaying && (
                        <Headphones className="h-4 w-4 text-primary animate-pulse" />
                      )}
                    </CardTitle>
                    <CardDescription>
                      <div className="flex items-center gap-2">
                        <MapPin className="h-4 w-4" />
                        <span>{role.location}</span>
                        <Clock className="h-4 w-4 ml-2" />
                        <span>{role.employmentType}</span>
                      </div>
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p>{role.description}</p>
                    <div className="flex flex-wrap gap-2 mt-4">
                      {role.tags.map((tag) => (
                        <Badge key={tag} variant="secondary">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-between p-4 bg-muted/30">
                    <div></div> {/* Empty div for spacing */}
                    <div className="flex gap-2">
                      {roleClip && (
                        <Button 
                          size="sm" 
                          onClick={(e) => {
                            e.stopPropagation()
                            handlePlayClip(roleClip)
                          }} 
                          disabled={!roleClip}
                        >
                          <Play className="mr-2 h-4 w-4" />
                          Listen
                        </Button>
                      )}
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={(e) => {
                          e.stopPropagation()
                          handleRoleClick(role.id)
                        }}
                      >
                        <Send className="mr-2 h-4 w-4" />
                        Apply
                      </Button>
                    </div>
                  </CardFooter>
                </Card>
              )
            })}
          </TabsContent>
        </Tabs>
      </div>

      <div>
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button className="w-full">Follow {startup.name}</Button>
            <Button variant="outline" className="w-full">
              Share Profile
            </Button>
          </CardContent>
        </Card>

        <Card className="mt-6">
          <CardHeader>
            <CardTitle>Similar Startups</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {getSimilarStartupsToStartup(startup.id).map((similarStartup) => (
              <div 
                key={similarStartup.id} 
                className="flex items-center gap-3 cursor-pointer hover:bg-muted/50 p-2 rounded-lg transition-colors"
                onClick={() => handleStartupClick(similarStartup.id)}
              >
                <div className="relative w-10 h-10 rounded overflow-hidden bg-muted">
                  <Image
                    src={similarStartup.logoUrl || "/placeholder.svg"}
                    alt={similarStartup.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <p className="font-medium">{similarStartup.name}</p>
                  <p className="text-sm text-muted-foreground line-clamp-1">{similarStartup.description}</p>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
