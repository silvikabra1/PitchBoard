export interface Startup {
  id: string
  name: string
  description: string
  logoUrl: string
  website: string
  founderClipUrl?: string
  roles: Role[]
}

export interface Role {
  id: string
  title: string
  description: string
  location: string
  type: string // Full-time, Part-time, Contract, etc.
  tags: string[]
}

export interface StartupClip {
  id: string
  startup: Startup
  title: string
  description: string
  audioUrl: string
  duration: number // in seconds
  tags: string[]
  locations: string[] // Separate array for locations
}

export interface User {
  id: string
  name: string
  email: string
  preferences: {
    roles: string[]
    locations: string[]
    tags: string[]
  }
  likedStartups: string[]
  savedClips: string[]
  applications: Application[]
}

export interface Application {
  id: string
  clipId: string
  startupId: string
  roleId: string
  voiceNoteUrl?: string
  status: "pending" | "viewed" | "contacted" | "rejected"
  createdAt: Date
}
