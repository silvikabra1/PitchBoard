import { notFound } from "next/navigation"
import { getRoleById, getStartupForRole, getClipForRole } from "@/lib/api"
import { RoleDetail } from "@/components/role-detail"
import { use } from "react"

interface RolePageProps {
  params: Promise<{ id: string }>
}

export default function RolePage({ params }: RolePageProps) {
  const { id } = use(params)
  const role = getRoleById(id)
  if (!role) {
    notFound()
  }

  const startup = getStartupForRole(role.id)
  if (!startup) {
    notFound()
  }

  const roleClip = getClipForRole(id)

  return <RoleDetail role={role} startup={startup} roleClip={roleClip} />
} 