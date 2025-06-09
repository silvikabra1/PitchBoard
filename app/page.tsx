"use client"

import { Hero } from "@/components/hero"
import { AudioPlayerBar } from "@/components/audio-player-bar"
import { RolesFeed } from "@/components/roles-feed"

export default function Home() {

  return (
    <main className="min-h-screen bg-background">
        <>
          <Hero />
          <div className="container mx-auto px-4 py-8 pb-36">
            <h2 className="text-2xl font-bold mb-6">Discover Startups</h2>
            <RolesFeed />
          </div>
        </>
      <AudioPlayerBar />
    </main>
  )
}
