import { Role, Startup, StartupClip } from "./types"
import { mockRoles, mockStartups, mockStartupClips } from "./mock-data"
import { createClient } from '@/utils/supabase/client'
import { cookies } from 'next/headers'

// Startups

export function getStartupById(id: string): Startup | undefined {
  return mockStartups.find(startup => startup.id === id)
} 

export function getStartupForRole(roleId: string): Startup | undefined {
  return mockStartups.find((startup) => startup.roleIds.includes(roleId))
}

export function getAllStartups(): Startup[] | undefined {
  return mockStartups
}

export function getSimilarStartupsToStartup(startupId: string): Startup[] {
  // Get all other startups // revisit this
  return mockStartups.filter((startup) => startup.id !== startupId)
}

// Roles

export function getRoleById(id: string): Role | undefined {
  return mockRoles.find(role => role.id === id)
}

export function getAllRoles(): Role[] | undefined {
  return mockRoles
}

export function setSavedRole(id: string, saveState: boolean) {
  alert(`Setting role ${id} to ${saveState}`) // This will show a browser alert
  // find index of mocked role
  const roleIndex = mockRoles.findIndex((role: Role) => role.id === id)
  if (roleIndex !== -1) {
    mockRoles[roleIndex].saved = saveState
    alert(`Updated role at index ${roleIndex}`) // This will show a browser alert
  } else {
    alert(`Role ${id} not found`) // This will show a browser alert
  }
}

export function getSavedRolesForUser(): Role[] | undefined {
  // Assume single user right now // revisit this
  return mockRoles.filter((role) => role.saved == true )
}

// Clips

export function getClipsForStartup(startupId: string): StartupClip[] | undefined {
  return mockStartupClips.filter(clip => clip.startupId === startupId)
}

export function getClipForRole(roleId: string): StartupClip | undefined {
  return mockStartupClips.find(clip => clip.roleId === roleId)
}

export function getAllStartupClips(): StartupClip[] | undefined {
  return mockStartupClips
}

export async function getTodos() {
  const supabase = await createClient();
  const { data: instruments } = await supabase.from("instruments").select();
}





