"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { useSession } from "next-auth/react"
import { Role } from "@prisma/client"

export function AdminProtected({ children }: { children: React.ReactNode }) {
  const router = useRouter()
  const { data, status } = useSession()
  const isLoading = status === 'loading';
  const user = data?.user;

  useEffect(() => {
    if (!isLoading && (!user || user.role !== Role.ADMIN)) {
      router.push("/login")
    }
  }, [user, isLoading, router])

  if (isLoading) {
    return <div>Зареждане...</div>
  }

  if (!user || user.role !== Role.ADMIN) {
    return null
  }

  return <>{children}</>
}

