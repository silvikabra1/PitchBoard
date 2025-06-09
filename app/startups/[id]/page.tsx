"use client"

import { notFound } from "next/navigation"
import { getStartupById } from "@/lib/api"
import { StartupDetail } from "@/components/startup-detail"
import { use } from "react"

interface StartupPageProps {
  params: Promise<{ id: string }>
}

export default function StartupPage({ params }: StartupPageProps) {
  const { id } = use(params)
  const startup = getStartupById(id)
  if (!startup) {
    notFound()
  }

  return (
    <div className="container mx-auto px-4 py-8 pb-48">
      <StartupDetail startup={startup} />
    </div>
  )
}
