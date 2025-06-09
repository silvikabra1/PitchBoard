"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Badge } from "@/components/ui/badge"
import { Header } from "@/components/header"
import Image from "next/image"
import { X, Play, Send, ChevronDown } from "lucide-react"
import { useAudio } from "@/lib/audio-context"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { getClipForRole, getSavedRolesForUser, getStartupById } from "@/lib/api"

export default function ProfilePage() {
  const { playClip } = useAudio()
  const [jobTypes, setJobTypes] = useState<string[]>(["Full-time"])
  const [locations, setLocations] = useState<string[]>(["Remote", "San Francisco"])
  const [preferences, setPreferences] = useState<string[]>(["Engineering", "AI", "Frontend", "Backend"])

  // Available options
  const jobTypeOptions = ["Full-time", "Part-time", "Contract", "Internship"]
  const locationOptions = ["Remote", "San Francisco", "New York", "Boston", "Chicago", "Los Angeles"]
  const preferenceOptions = [
    "Engineering",
    "AI",
    "Frontend",
    "Backend",
    "Mobile",
    "Design",
    "Product",
    "Data Science",
    "Machine Learning",
    "DevOps",
    "Cloud",
    "Security",
  ]

  const addJobType = (type: string) => {
    if (!jobTypes.includes(type)) {
      setJobTypes([...jobTypes, type])
    }
  }

  const removeJobType = (type: string) => {
    setJobTypes(jobTypes.filter((t) => t !== type))
  }

  const addLocation = (location: string) => {
    if (!locations.includes(location)) {
      setLocations([...locations, location])
    }
  }

  const removeLocation = (location: string) => {
    setLocations(locations.filter((l) => l !== location))
  }

  const addPreference = (tag: string) => {
    if (!preferences.includes(tag)) {
      setPreferences([...preferences, tag])
    }
  }

  const removePreference = (tag: string) => {
    setPreferences(preferences.filter((t) => t !== tag))
  }

  return (
    <main className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 pb-36">
        <h1 className="text-3xl font-bold mb-6">Your Profile</h1>

        <Tabs defaultValue="preferences">
          <TabsList className="mb-6">
            <TabsTrigger value="preferences">Preferences</TabsTrigger>
            <TabsTrigger value="saved">Saved</TabsTrigger>
            <TabsTrigger value="account">Account</TabsTrigger>
          </TabsList>

          <TabsContent value="preferences">
            <div className="grid gap-6 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>Job Preferences</CardTitle>
                  <CardDescription>Customize what types of opportunities you want to hear about</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Job Type Tags */}
                  <div className="space-y-2">
                    <Label>Job Type</Label>
                    <div className="flex flex-wrap gap-2 mb-2">
                      {jobTypes.map((type) => (
                        <Badge key={type} variant="secondary" className="flex items-center gap-1">
                          {type}
                          <X className="h-3 w-3 cursor-pointer" onClick={() => removeJobType(type)} />
                        </Badge>
                      ))}
                    </div>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button variant="outline" className="w-full justify-between">
                          Add a job type
                          <ChevronDown className="h-4 w-4 opacity-50" />
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-full p-0" align="start">
                        <div className="p-2 space-y-1">
                          {jobTypeOptions
                            .filter((option) => !jobTypes.includes(option))
                            .map((option) => (
                              <div
                                key={option}
                                className="px-2 py-1.5 text-sm rounded-md hover:bg-muted cursor-pointer"
                                onClick={() => {
                                  addJobType(option)
                                }}
                              >
                                {option}
                              </div>
                            ))}
                        </div>
                      </PopoverContent>
                    </Popover>
                  </div>

                  {/* Locations Tags */}
                  <div className="space-y-2">
                    <Label>Locations</Label>
                    <div className="flex flex-wrap gap-2 mb-2">
                      {locations.map((location) => (
                        <Badge key={location} variant="secondary" className="flex items-center gap-1">
                          {location}
                          <X className="h-3 w-3 cursor-pointer" onClick={() => removeLocation(location)} />
                        </Badge>
                      ))}
                    </div>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button variant="outline" className="w-full justify-between">
                          Add a location
                          <ChevronDown className="h-4 w-4 opacity-50" />
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-full p-0" align="start">
                        <div className="p-2 space-y-1">
                          {locationOptions
                            .filter((option) => !locations.includes(option))
                            .map((option) => (
                              <div
                                key={option}
                                className="px-2 py-1.5 text-sm rounded-md hover:bg-muted cursor-pointer"
                                onClick={() => {
                                  addLocation(option)
                                }}
                              >
                                {option}
                              </div>
                            ))}
                        </div>
                      </PopoverContent>
                    </Popover>
                  </div>

                  {/* Preferences Tags */}
                  <div className="space-y-2">
                    <Label>Preferences</Label>
                    <div className="flex flex-wrap gap-2 mb-2">
                      {preferences.map((tag) => (
                        <Badge key={tag} variant="secondary" className="flex items-center gap-1">
                          {tag}
                          <X className="h-3 w-3 cursor-pointer" onClick={() => removePreference(tag)} />
                        </Badge>
                      ))}
                    </div>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button variant="outline" className="w-full justify-between">
                          Add a preference
                          <ChevronDown className="h-4 w-4 opacity-50" />
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-full p-0" align="start">
                        <div className="p-2 space-y-1">
                          {preferenceOptions
                            .filter((option) => !preferences.includes(option))
                            .map((option) => (
                              <div
                                key={option}
                                className="px-2 py-1.5 text-sm rounded-md hover:bg-muted cursor-pointer"
                                onClick={() => {
                                  addPreference(option)
                                }}
                              >
                                {option}
                              </div>
                            ))}
                        </div>
                      </PopoverContent>
                    </Popover>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button>Save Preferences</Button>
                </CardFooter>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Audio Feed Settings</CardTitle>
                  <CardDescription>Customize your listening experience</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="auto-play">Auto-play Next Job Post</Label>
                      <p className="text-sm text-muted-foreground">
                        Automatically play the next job post when one finishes
                      </p>
                    </div>
                    <Switch id="auto-play" />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="notifications">Audio Notifications</Label>
                      <p className="text-sm text-muted-foreground">
                        Get notified when new job posts matching your preferences are available
                      </p>
                    </div>
                    <Switch id="notifications" />
                  </div>
                </CardContent>
                <CardFooter>
                  <Button>Save Settings</Button>
                </CardFooter>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="saved">
            <Card>
              <CardHeader>
                <CardTitle>Saved Roles</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {getSavedRolesForUser()?.map((role) => {
                    const startup = getStartupById(role.id)
                    if (!startup) return null
                    const clip = getClipForRole(role.id)
                    return (
                      <div key={role.id} className="flex gap-4 p-4 border rounded-lg">
                        <div className="relative w-16 h-16 rounded overflow-hidden bg-muted">
                          <Image
                            src={startup.logoUrl || "/placeholder.svg"}
                            alt={startup.name}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div className="flex-1">
                          <h3 className="font-medium">{role.title}</h3>
                          <p className="text-sm text-muted-foreground">{startup.name}</p>
                          <div className="flex gap-2 mt-2">
                            <Button 
                              size="sm" 
                              onClick={() => clip && playClip(clip)}
                              disabled={!clip}
                            >
                              <Play className="mr-2 h-4 w-4" />
                              Listen
                            </Button>
                            <Button size="sm" variant="outline">
                              <Send className="mr-2 h-4 w-4" />
                              Apply
                            </Button>
                          </div>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="account">
            <Card>
              <CardHeader>
                <CardTitle>Account Settings</CardTitle>
                <CardDescription>Manage your account information</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Name</Label>
                  <input
                    id="name"
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    defaultValue="Alex Johnson"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <input
                    id="email"
                    type="email"
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    defaultValue="alex@example.com"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="bio">Bio</Label>
                  <Textarea
                    id="bio"
                    placeholder="Tell startups a bit about yourself"
                    defaultValue="Full stack developer with 5 years of experience. Passionate about startups and innovative technologies."
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="linkedin">LinkedIn Profile</Label>
                  <input
                    id="linkedin"
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    placeholder="https://linkedin.com/in/username"
                  />
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="outline">Cancel</Button>
                <Button>Save Changes</Button>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </main>
  )
}
