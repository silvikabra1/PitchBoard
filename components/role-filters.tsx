"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { MapPin, Clock, Tag } from "lucide-react"
import type { Role } from "@/lib/types"

interface RoleFiltersProps {
  roles: Role[]
  onFilterChange: (filters: FilterState) => void
}

interface FilterState {
  search: string
  locations: string[]
  types: string[]
  tags: string[]
}

export function RoleFilters({ roles, onFilterChange }: RoleFiltersProps) {
  // Get unique values for filters
  const allLocations = Array.from(new Set(roles.flatMap(role => role.location)))
  const allTypes = Array.from(new Set(roles.map(role => role.employmentType)))
  const allTags = Array.from(new Set(roles.flatMap(role => role.tags)))

  // Filter state
  const [filters, setFilters] = useState<FilterState>({
    search: "",
    locations: [],
    types: [],
    tags: []
  })

  const handleSearchChange = (value: string) => {
    const newFilters = { ...filters, search: value }
    setFilters(newFilters)
    onFilterChange(newFilters)
  }

  const handleLocationToggle = (location: string) => {
    const newLocations = filters.locations.includes(location)
      ? filters.locations.filter(l => l !== location)
      : [...filters.locations, location]
    const newFilters = { ...filters, locations: newLocations }
    setFilters(newFilters)
    onFilterChange(newFilters)
  }

  const handleTypeToggle = (type: string) => {
    const newTypes = filters.types.includes(type)
      ? filters.types.filter(t => t !== type)
      : [...filters.types, type]
    const newFilters = { ...filters, types: newTypes }
    setFilters(newFilters)
    onFilterChange(newFilters)
  }

  const handleTagToggle = (tag: string) => {
    const newTags = filters.tags.includes(tag)
      ? filters.tags.filter(t => t !== tag)
      : [...filters.tags, tag]
    const newFilters = { ...filters, tags: newTags }
    setFilters(newFilters)
    onFilterChange(newFilters)
  }

  return (
    <div className="space-y-6 p-4 bg-muted/30 rounded-lg">
      {/* Search */}
      <div className="space-y-2">
        <Label htmlFor="search">Search</Label>
        <Input
          id="search"
          placeholder="Search roles..."
          value={filters.search}
          onChange={(e) => handleSearchChange(e.target.value)}
        />
      </div>

      {/* Locations */}
      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <MapPin className="h-4 w-4" />
          <Label>Locations</Label>
        </div>
        <div className="flex flex-wrap gap-2">
          {allLocations.map((location) => (
            <Badge
              key={location}
              variant={filters.locations.includes(location) ? "default" : "outline"}
              className="cursor-pointer"
              onClick={() => handleLocationToggle(location)}
            >
              {location}
            </Badge>
          ))}
        </div>
      </div>

      {/* Job Types */}
      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <Clock className="h-4 w-4" />
          <Label>Job Types</Label>
        </div>
        <div className="flex flex-wrap gap-2">
          {allTypes.map((type) => (
            <Badge
              key={type}
              variant={filters.types.includes(type) ? "default" : "outline"}
              className="cursor-pointer"
              onClick={() => handleTypeToggle(type)}
            >
              {type}
            </Badge>
          ))}
        </div>
      </div>

      {/* Tags */}
      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <Tag className="h-4 w-4" />
          <Label>Skills</Label>
        </div>
        <div className="flex flex-wrap gap-2">
          {allTags.map((tag) => (
            <Badge
              key={tag}
              variant={filters.tags.includes(tag) ? "default" : "outline"}
              className="cursor-pointer"
              onClick={() => handleTagToggle(tag)}
            >
              {tag}
            </Badge>
          ))}
        </div>
      </div>

      {/* Clear Filters */}
      {(filters.search || filters.locations.length > 0 || filters.types.length > 0 || filters.tags.length > 0) && (
        <Button
          variant="ghost"
          onClick={() => {
            const newFilters = {
              search: "",
              locations: [],
              types: [],
              tags: []
            }
            setFilters(newFilters)
            onFilterChange(newFilters)
          }}
        >
          Clear Filters
        </Button>
      )}
    </div>
  )
} 