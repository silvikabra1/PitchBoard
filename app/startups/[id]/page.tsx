"use client"

import Image from "next/image"
import Link from "next/link"
import { useEffect, useState } from "react"
import { notFound } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ExternalLink, MapPin, Clock, Play, Pause } from "lucide-react"
import { mockStartups, mockStartupClips } from "@/lib/mock-data"
import { useAudio } from "@/lib/audio-context"

interface StartupPageProps {
  params: {
    id: string
  }
}

export default function StartupPage({ params }: StartupPageProps) {
  const startup = mockStartups.find((s) => s.id === params.id)
  const { playClip, currentClip, isPlaying, pauseClip } = useAudio()
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)

  useEffect(() => {
    if (currentClip) {
      setCurrentTime(0)
      setDuration(currentClip.duration || 45) // Use a default duration if not available
    }
  }, [currentClip])

  if (!startup) {
    notFound()
  }

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
    <main className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <Link href="/startups" className="text-sm text-muted-foreground hover:text-primary">
            ← Back to Startups
          </Link>
        </div>

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
                  {startup.founderClipUrl && startupClips.length > 0 && (
                    <Button variant="outline" size="sm" onClick={() => handlePlayClip(startupClips[0])}>
                      {currentClip?.id === startupClips[0].id && isPlaying ? (
                        <Pause className="mr-2 h-4 w-4" />
                      ) : (
                        <Play className="mr-2 h-4 w-4" />
                      )}
                      Hear from Founder
                    </Button>
                  )}
                </div>
              </div>
            </div>

            <Tabs defaultValue="roles">
              <TabsList>
                <TabsTrigger value="roles">Open Roles</TabsTrigger>
                <TabsTrigger value="about">About</TabsTrigger>
                <TabsTrigger value="clips">Audio Clips</TabsTrigger>
              </TabsList>
              <TabsContent value="roles" className="space-y-4">
                <h2 className="text-xl font-bold mt-4">Open Roles</h2>
                {startup.roles.map((role) => (
                  <Card key={role.id}>
                    <CardHeader>
                      <CardTitle>{role.title}</CardTitle>
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
                    <CardFooter>
                      <Button>Apply Now</Button>
                    </CardFooter>
                  </Card>
                ))}
              </TabsContent>
              <TabsContent value="about">
                <div className="prose dark:prose-invert max-w-none">
                  <h2>About {startup.name}</h2>
                  <p>
                    {startup.description} Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam euismod, nisl
                    eget aliquam ultricies, nunc nisl aliquet nunc, quis aliquam nisl nunc, quis aliquam nisl nunc quis
                    nisl. Nullam euismod, nisl eget aliquam ultricies, nunc nisl aliquet nunc, quis aliquam nisl nunc
                    quis nisl.
                  </p>
                  <h3>Our Mission</h3>
                  <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam euismod, nisl eget aliquam
                    ultricies, nunc nisl aliquet nunc, quis aliquam nisl nunc quis nisl.
                  </p>
                  <h3>Our Team</h3>
                  <p>
                    We're a team of passionate individuals dedicated to solving complex problems with innovative
                    solutions. Our diverse backgrounds and experiences help us approach challenges from multiple
                    perspectives.
                  </p>
                </div>
              </TabsContent>
              <TabsContent value="clips">
                <div className="space-y-4">
                  <h2 className="text-xl font-bold mt-4">Audio Clips</h2>
                  <p className="text-muted-foreground">Listen to clips about {startup.name} and their open roles.</p>

                  {startupClips.map((clip) => (
                    <Card key={`clip-${clip.id}`}>
                      <CardHeader>
                        <CardTitle>{clip.title}</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="bg-muted rounded-md p-4 flex items-center gap-4">
                          <Button size="icon" variant="outline" onClick={() => handlePlayClip(clip)}>
                            {currentClip?.id === clip.id && isPlaying ? <Pause /> : <Play />}
                          </Button>
                          <div className="flex-1">
                            <div className="h-2 bg-primary/20 rounded-full">
                              <div
                                className="h-full bg-primary rounded-full"
                                style={{
                                  width:
                                    currentClip?.id === clip.id
                                      ? `${currentClip ? (100 * currentTime) / duration : 0}%`
                                      : "0%",
                                }}
                              ></div>
                            </div>
                          </div>
                          <span className="text-sm">
                            {clip.duration
                              ? `${Math.floor(clip.duration / 60)}:${String(clip.duration % 60).padStart(2, "0")}`
                              : "0:45"}
                          </span>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
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
                {mockStartups
                  .filter((s) => s.id !== startup.id)
                  .slice(0, 2)
                  .map((s) => (
                    <div key={s.id} className="flex items-center gap-3">
                      <div className="relative w-10 h-10 rounded overflow-hidden bg-muted">
                        <Image src={s.logoUrl || "/placeholder.svg"} alt={s.name} fill className="object-cover" />
                      </div>
                      <div>
                        <p className="font-medium">{s.name}</p>
                        <p className="text-sm text-muted-foreground line-clamp-1">{s.description}</p>
                      </div>
                    </div>
                  ))}
              </CardContent>
              <CardFooter>
                <Button variant="link" className="w-full" asChild>
                  <Link href="/startups">View All Startups</Link>
                </Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      </div>
    </main>
  )
}
