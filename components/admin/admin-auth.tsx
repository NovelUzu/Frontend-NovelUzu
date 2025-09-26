"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/lib/contexts/auth"

export function AdminAuth({ children }: { children: React.ReactNode }) {
  const router = useRouter()
  const { user, isLoading } = useAuth()
  const [isAdmin, setIsAdmin] = useState<boolean | null>(null)

  useEffect(() => {
    // Verificar si el usuario es administrador
    if (!isLoading) {
      const adminCheck = user?.role === "admin" || localStorage.getItem("isAdmin") === "true"
      setIsAdmin(adminCheck)

      if (!adminCheck) {
        router.push("/login?callbackUrl=/admin")
      }
    }
  }, [isLoading, user, router])

  // Mostrar pantalla de carga mientras se verifica
  if (isLoading || isAdmin === null) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-muted-foreground">Verificando permisos...</p>
        </div>
      </div>
    )
  }

  // Si no es administrador, no mostrar nada (la redirección ya se habrá iniciado)
  if (!isAdmin) {
    return null
  }

  // Si es administrador, mostrar el contenido
  return <>{children}</>
}
