"use client"

import { useState } from "react"
import { RoleCard } from "@/components/role-card"
import { RoleFilters } from "@/components/role-filters"
import { getAllRoles } from "@/lib/api"
import type { Role } from "@/lib/types"

interface FilterState {
  search: string
  locations: string[]
  types: string[]
  tags: string[]
}

export function RolesFeed() {
  const roles = getAllRoles() || []
  const [filters, setFilters] = useState<FilterState>({
    search: "",
    locations: [],
    types: [],
    tags: []
  })

  const filteredRoles = roles.filter(role => {
    // Search filter
    if (filters.search && !role.title.toLowerCase().includes(filters.search.toLowerCase())) {
      return false
    }

    // Location filter
    if (filters.locations.length > 0 && !role.location.some(loc => filters.locations.includes(loc))) {
      return false
    }

    // Type filter
    if (filters.types.length > 0 && !filters.types.includes(role.employmentType)) {
      return false
    }

    // Tags filter
    if (filters.tags.length > 0 && !role.tags.some(tag => filters.tags.includes(tag))) {
      return false
    }

    return true
  })

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
        {/* Filters sidebar */}
        <div className="lg:col-span-1">
          <div className="sticky top-24">
            <RoleFilters roles={roles} onFilterChange={setFilters} />
          </div>
        </div>

        {/* Roles grid */}
        <div className="lg:col-span-4 space-y-6">
          {filteredRoles.length === 0 ? (
            <div className="text-center py-16 text-muted-foreground">
              No roles match your filters
            </div>
          ) : (
            filteredRoles.map((role) => (
              <RoleCard key={role.id} role={role} />
            ))
          )}
        </div>
      </div>
    </div>
  )
}
