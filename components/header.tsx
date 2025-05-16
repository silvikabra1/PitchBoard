"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { User, Headphones } from "lucide-react"

interface HeaderProps {
  onSelectStartup?: (startupId: string) => void
}

export function Header({ onSelectStartup }: HeaderProps) {
  const pathname = usePathname()

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-2">
          <Link href="/" className="flex items-center gap-2">
            <Headphones className="h-6 w-6" />
            <span className="text-xl font-bold">StartupSound</span>
          </Link>
        </div>
        <div className="flex items-center gap-4">
          <Link href="/profile">
            <Button variant="ghost" size="icon" className="rounded-full">
              <User className="h-5 w-5" />
              <span className="sr-only">Profile</span>
            </Button>
          </Link>
        </div>
      </div>
    </header>
  )
}
