import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ExternalLink } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { getRoleById, getAllStartups } from "@/lib/api"

export default function StartupsPage() {
  const startups = getAllStartups()
  if (!startups) return null
  return (
    <main className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Discover Startups</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {startups.map((startup) => (
            <Card key={startup.id} className="overflow-hidden">
              <div className="relative h-48 bg-muted">
                <Image src={startup.logoUrl || "/placeholder.svg"} alt={startup.name} fill className="object-cover" />
              </div>
              <CardHeader>
                <CardTitle>{startup.name}</CardTitle>
                <CardDescription>{startup.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <h3 className="font-medium mb-2">Open Roles:</h3>
                <ul className="space-y-2">
                  {startup.roleIds.map((roleId) => {
                    const role = getRoleById(roleId)
                    if (!role) return null
                    return (
                      <li key={roleId} className="flex justify-between items-start">
                        <div>
                          <p className="font-medium">{role.title}</p>
                          <p className="text-sm text-muted-foreground">
                            {role.location} • {role.employmentType}
                          </p>
                        </div>
                        <div className="flex flex-wrap gap-1 justify-end">
                          {role.tags.slice(0, 2).map((tag) => (
                            <Badge key={tag} variant="secondary" className="text-xs">
                              {tag}
                            </Badge>
                          ))}
                        </div>
                      </li>
                    )
                  })}
                </ul>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="outline" asChild>
                  <Link href={`/startups/${startup.id}`}>View Details</Link>
                </Button>
                <Button variant="ghost" size="icon" asChild>
                  <a href={startup.website} target="_blank" rel="noopener noreferrer">
                    <ExternalLink className="h-4 w-4" />
                  </a>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </main>
  )
}
