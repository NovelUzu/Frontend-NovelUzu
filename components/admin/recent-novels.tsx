"use client"

import { Badge } from "@/components/ui/badge"

export function RecentNovels() {
  // Datos de ejemplo
  const novels = [
    {
      id: 1,
      title: "El Despertar del Dragón",
      author: "Carlos Rodríguez",
      genre: "Fantasía",
      status: "published",
      cover: "/placeholder.jpg?height=60&width=40",
      published: "Hace 1 día",
      chapters: 12,
    },
    {
      id: 2,
      title: "Corazones en la Tormenta",
      author: "María López",
      genre: "Romance",
      status: "published",
      cover: "/placeholder.jpg?height=60&width=40",
      published: "Hace 3 días",
      chapters: 8,
    },
    {
      id: 3,
      title: "El Último Astronauta",
      author: "Juan Pérez",
      genre: "Ciencia Ficción",
      status: "published",
      cover: "/placeholder.jpg?height=60&width=40",
      published: "Hace 5 días",
      chapters: 15,
    },
    {
      id: 4,
      title: "Sombras del Pasado",
      author: "Ana Martínez",
      genre: "Misterio",
      status: "published",
      cover: "/placeholder.jpg?height=60&width=40",
      published: "Hace 1 semana",
      chapters: 10,
    },
    {
      id: 5,
      title: "Caminos Cruzados",
      author: "Pedro Sánchez",
      genre: "Aventura",
      status: "published",
      cover: "/placeholder.jpg?height=60&width=40",
      published: "Hace 2 semanas",
      chapters: 6,
    },
  ]

  return (
    <div className="space-y-4">
      {novels.map((novel) => (
        <div key={novel.id} className="flex items-center gap-4">
          <div className="h-12 w-8 overflow-hidden rounded-sm">
            <img src={novel.cover || "/placeholder.jpg"} alt={novel.title} className="h-full w-full object-cover" />
          </div>
          <div className="flex-1 space-y-1">
            <p className="text-sm font-medium leading-none">{novel.title}</p>
            <p className="text-xs text-muted-foreground">por {novel.author}</p>
          </div>
          <Badge variant="outline" className="ml-auto">
            {novel.genre}
          </Badge>
        </div>
      ))}
    </div>
  )
}
