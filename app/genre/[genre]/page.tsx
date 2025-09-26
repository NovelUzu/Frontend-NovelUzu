import Link from "next/link"
import Image from "next/image"
import { ChevronRight, Star } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"

import { use } from 'react'

// Función para desnormalizar las URLs (convertir a nombre legible)
function denormalizeGenre(genre: string): string {
  // Mapeo de URLs normalizadas a nombres legibles
  const genreMap: Record<string, string> = {
    fantasia: "Fantasía",
    accion: "Acción",
    "ciencia-ficcion": "Ciencia Ficción",
    romance: "Romance",
    aventura: "Aventura",
    misterio: "Misterio",
    drama: "Drama",
    horror: "Horror",
    historico: "Histórico",
    comedia: "Comedia",
    sobrenatural: "Sobrenatural",
    "artes-marciales": "Artes Marciales",
  }

  return genreMap[genre] || genre.charAt(0).toUpperCase() + genre.slice(1).replace(/-/g, " ")
}

export default function GenrePage({ params }: { params: Promise<{ genre: string }> }) {
  // Obtener el nombre legible del género
  var { genre: genreName } = use(params)
  genreName = denormalizeGenre(genreName)

  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main className="flex-1">
        <div className="container px-4 py-8 md:px-6 md:py-12">
          <div className="mb-8">
            <div className="flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
              <Link href="/" className="hover:underline">
                Inicio
              </Link>
              <ChevronRight className="h-4 w-4" />
              <Link href="/genres" className="hover:underline">
                Géneros
              </Link>
              <ChevronRight className="h-4 w-4" />
              <span className="font-medium text-foreground">{genreName}</span>
            </div>
            <h1 className="mt-4 text-3xl font-bold tracking-tight md:text-4xl">Novelas de {genreName}</h1>
            <p className="mt-2 text-muted-foreground">
              Explora las mejores novelas de {genreName.toLowerCase()} en nuestra plataforma
            </p>
          </div>
          <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium">Ordenar por:</span>
              <Select defaultValue="popular">
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Ordenar por" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="popular">Popularidad</SelectItem>
                  <SelectItem value="rating">Valoración</SelectItem>
                  <SelectItem value="newest">Más recientes</SelectItem>
                  <SelectItem value="chapters">Más capítulos</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium">Estado:</span>
              <Select defaultValue="all">
                <SelectTrigger className="w-[150px]">
                  <SelectValue placeholder="Estado" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todos</SelectItem>
                  <SelectItem value="ongoing">En progreso</SelectItem>
                  <SelectItem value="completed">Completada</SelectItem>
                  <SelectItem value="hiatus">En pausa</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {[...Array(12)].map(async (_, i) => (
              <Card key={i} className="overflow-hidden">
                <Link href={`/novel/${i + 1}`}>
                  <div className="relative">
                    <Image
                      src={`/placeholder.svg?height=240&width=180&text=${genreName} ${i + 1}`}
                      width={180}
                      height={240}
                      alt={`Novela de ${genreName} ${i + 1}`}
                      className="w-full object-cover transition-all hover:scale-105"
                    />
                    <div className="absolute top-2 right-2 flex items-center gap-1 rounded-md bg-black/60 px-2 py-1 text-xs text-white">
                      <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                      <span>4.{7 - (i % 3)}</span>
                    </div>
                  </div>
                </Link>
                <CardHeader className="p-4">
                  <CardTitle className="line-clamp-1 text-base">
                    <Link href={`/novel/${i + 1}`}>
                      {(await params).genre === "fantasia" || (await params).genre === "fantasy"
                        ? i % 3 === 0
                          ? "El Reino de los Dragones"
                          : i % 3 === 1
                            ? "La Torre del Mago"
                            : "El Último Hechicero"
                        : (await params).genre === "accion" || (await params).genre === "action"
                          ? i % 3 === 0
                            ? "Guerrero Inmortal"
                            : i % 3 === 1
                              ? "El Puño del Norte"
                              : "Cazador de Demonios"
                          : i % 3 === 0
                            ? "Crónicas Místicas"
                            : i % 3 === 1
                              ? "Leyendas del Abismo"
                              : "El Despertar"}{" "}
                      {i + 1}
                    </Link>
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-4 pt-0">
                  <p className="line-clamp-2 text-xs text-muted-foreground">
                    {i % 3 === 0
                      ? `Una emocionante historia de ${genreName.toLowerCase()} que te mantendrá al borde de tu asiento.`
                      : i % 3 === 1
                        ? `Sumérgete en un mundo de ${genreName.toLowerCase()} donde nada es lo que parece.`
                        : `Una novela de ${genreName.toLowerCase()} aclamada por los lectores por su trama única.`}
                  </p>
                </CardContent>
                <CardFooter className="flex items-center justify-between p-4 pt-0">
                  <div className="flex flex-wrap gap-1">
                    <span className="rounded-full bg-muted px-2 py-1 text-xs">{genreName}</span>
                    <span className="rounded-full bg-muted px-2 py-1 text-xs">
                      {i % 3 === 0 ? "Aventura" : i % 3 === 1 ? "Drama" : "Misterio"}
                    </span>
                  </div>
                </CardFooter>
              </Card>
            ))}
          </div>
          <div className="mt-8 flex justify-center">
            <Button variant="outline">Cargar más</Button>
          </div>
        </div>
      </main>
      <SiteFooter />
    </div>
  )
}
