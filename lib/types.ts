export interface Startup {
  id: string
  name: string
  description: string
  logoUrl: string
  founderClipUrl?: string
  website: string
  roleIds: string[]
}

export interface Role {
  id: string
  title: string
  description: string
  active: boolean
  saved: boolean
  location: string[]
  employmentType: string // Full-time, Part-time, Contract, etc.
  tags: string[]
}

export interface StartupClip {
  id: string
  startupId: string
  roleId: string
  audioUrl: string
  duration: number // in seconds
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
  savedStartupIds: string[]
  savedRoleIds: string[] // revisit this
  applicationIds: string[]
}

export interface Application {
  id: string
  startupId: string
  roleId: string
  voiceNoteUrl?: string
  status: "pending" | "viewed" | "contacted" | "rejected"
  createdAt: Date
}
