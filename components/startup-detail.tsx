"use client"

import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ExternalLink, MapPin, Clock, Play, Send } from "lucide-react"
import { mockStartupClips } from "@/lib/mock-data"
import { useAudio } from "@/lib/audio-context"
import type { Startup } from "@/lib/types"

interface StartupDetailProps {
  startup: Startup
}

export function StartupDetail({ startup }: StartupDetailProps) {
  const { playClip, currentClip, isPlaying, pauseClip } = useAudio()

  // Find all clips for this startup
  const startupClips = mockStartupClips.filter((clip) => clip.startup.id === startup.id)

  const handlePlayClip = (clip: (typeof mockStartupClips)[0]) => {
    if (currentClip?.id === clip.id && isPlaying) {
      pauseClip()
    } else {
      playClip(clip)
    }
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
            <h2 className="text-xl font-bold mt-4">Open Roles</h2>
            {startup.roles.map((role) => {
              // Find the audio clip for this role if it exists
              const roleClip = startupClips.find((clip) => clip.title.toLowerCase().includes(role.title.toLowerCase()))

              // Format the role title to use @ instead of at
              const formattedTitle = `${role.title} @ ${startup.name}`

              return (
                <Card key={role.id}>
                  <CardHeader>
                    <CardTitle>{formattedTitle}</CardTitle>
                    <CardDescription>
                      <div className="flex items-center gap-2">
                        <MapPin className="h-4 w-4" />
                        <span>{role.location}</span>
                        <Clock className="h-4 w-4 ml-2" />
                        <span>{role.type}</span>
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
                        <Button size="sm" onClick={() => handlePlayClip(roleClip)}>
                          <Play className="mr-2 h-4 w-4" />
                          Listen
                        </Button>
                      )}
                      <Button size="sm" variant="outline">
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
            {mockStartupClips
              .filter((clip) => clip.startup.id !== startup.id)
              .slice(0, 2)
              .map((clip) => (
                <div key={clip.id} className="flex items-center gap-3">
                  <div className="relative w-10 h-10 rounded overflow-hidden bg-muted">
                    <Image
                      src={clip.startup.logoUrl || "/placeholder.svg"}
                      alt={clip.startup.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <p className="font-medium">{clip.startup.name}</p>
                    <p className="text-sm text-muted-foreground line-clamp-1">{clip.startup.description}</p>
                  </div>
                </div>
              ))}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
