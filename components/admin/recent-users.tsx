"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"

export function RecentUsers() {
  // Datos de ejemplo
  const users = [
    {
      id: 1,
      name: "Carlos Rodríguez",
      email: "carlos@example.com",
      role: "Usuario",
      status: "active",
      avatar: "/placeholder.jpg?height=40&width=40",
      joined: "Hace 2 horas",
    },
    {
      id: 2,
      name: "María López",
      email: "maria@example.com",
      role: "Autor",
      status: "active",
      avatar: "/placeholder.jpg?height=40&width=40",
      joined: "Hace 5 horas",
    },
    {
      id: 3,
      name: "Juan Pérez",
      email: "juan@example.com",
      role: "Usuario",
      status: "active",
      avatar: "/placeholder.jpg?height=40&width=40",
      joined: "Hace 1 día",
    },
    {
      id: 4,
      name: "Ana Martínez",
      email: "ana@example.com",
      role: "Autor",
      status: "active",
      avatar: "/placeholder.jpg?height=40&width=40",
      joined: "Hace 2 días",
    },
    {
      id: 5,
      name: "Pedro Sánchez",
      email: "pedro@example.com",
      role: "Usuario",
      status: "active",
      avatar: "/placeholder.jpg?height=40&width=40",
      joined: "Hace 3 días",
    },
  ]

  return (
    <div className="space-y-4">
      {users.map((user) => (
        <div key={user.id} className="flex items-center gap-4">
          <Avatar>
            <AvatarImage src={user.avatar || "/placeholder.jpg"} alt={user.name} />
            <AvatarFallback>{user.name.substring(0, 2).toUpperCase()}</AvatarFallback>
          </Avatar>
          <div className="flex-1 space-y-1">
            <p className="text-sm font-medium leading-none">{user.name}</p>
            <p className="text-xs text-muted-foreground">{user.email}</p>
          </div>
          <Badge variant={user.role === "Autor" ? "outline" : "secondary"} className="ml-auto">
            {user.role}
          </Badge>
        </div>
      ))}
    </div>
  )
}
