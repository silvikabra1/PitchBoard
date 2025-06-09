"use client"

import { createContext, useContext, useState, ReactNode } from "react"

interface StartupContextType {
  selectedStartupId: string | null
  setSelectedStartupId: (id: string | null) => void
}

const StartupContext = createContext<StartupContextType | undefined>(undefined)

export function StartupProvider({ children }: { children: ReactNode }) {
  const [selectedStartupId, setSelectedStartupId] = useState<string | null>(null)

  return (
    <StartupContext.Provider value={{ selectedStartupId, setSelectedStartupId }}>
      {children}
    </StartupContext.Provider>
  )
}

export function useStartup() {
  const context = useContext(StartupContext)
  if (context === undefined) {
    throw new Error("useStartup must be used within a StartupProvider")
  }
  return context
} 