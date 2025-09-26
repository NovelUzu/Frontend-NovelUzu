"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { ChevronRight, Filter, Search, Star, X } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { SiteFooter } from "@/components/site-footer"
import { SiteHeader } from "@/components/site-header"
import { Slider } from "@/components/ui/slider"

export default function AdvancedSearchPage() {
  const [searchResults, setSearchResults] = useState<any[]>([])
  const [isSearching, setIsSearching] = useState(false)
  const [activeFilters, setActiveFilters] = useState<string[]>([])

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSearching(true)

    // Simulación de búsqueda
    setTimeout(() => {
      // Generar resultados de ejemplo
      const results = [...Array(12)].map((_, i) => ({
        id: i + 1,
        title:
          i % 3 === 0
            ? "El Ascenso del Héroe Legendario"
            : i % 3 === 1
              ? "Crónicas del Reino Olvidado"
              : "El Último Hechicero",
        subtitle: `Parte ${i + 1}`,
        rating: (4 + (i % 10) / 10).toFixed(1),
        genres: i % 3 === 0 ? ["Fantasía", "Aventura"] : i % 3 === 1 ? ["Acción", "Drama"] : ["Misterio", "Magia"],
        chapters: 50 + i * 10,
        status: i % 3 === 0 ? "En progreso" : i % 3 === 1 ? "Completada" : "En pausa",
      }))
      setSearchResults(results)
      setIsSearching(false)
    }, 1000)
  }

  const addFilter = (filter: string) => {
    if (!activeFilters.includes(filter)) {
      setActiveFilters([...activeFilters, filter])
    }
  }

  const removeFilter = (filter: string) => {
    setActiveFilters(activeFilters.filter((f) => f !== filter))
  }

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
              <span className="font-medium text-foreground">Búsqueda Avanzada</span>
            </div>
            <h1 className="mt-4 text-3xl font-bold tracking-tight md:text-4xl">Búsqueda Avanzada</h1>
            <p className="mt-2 text-muted-foreground">
              Encuentra exactamente lo que estás buscando con nuestras opciones de filtrado avanzadas.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-[300px_1fr] lg:grid-cols-[350px_1fr]">
            <div className="order-2 md:order-1">
              <form onSubmit={handleSearch} className="sticky top-24 space-y-6">
                <div className="rounded-lg border p-4">
                  <h2 className="mb-4 font-semibold">Filtros</h2>

                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="search-term">Término de búsqueda</Label>
                      <div className="relative">
                        <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                        <Input
                          id="search-term"
                          placeholder="Título, autor o palabra clave"
                          className="pl-10"
                          onChange={() => { }}
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label>Géneros</Label>
                      <div className="grid grid-cols-2 gap-2">
                        {["Fantasía", "Aventura", "Acción", "Romance", "Ciencia Ficción", "Drama"].map((genre) => (
                          <div key={genre} className="flex items-center space-x-2">
                            <Checkbox id={`genre-${genre}`} onCheckedChange={() => addFilter(genre)} />
                            <label
                              htmlFor={`genre-${genre}`}
                              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                            >
                              {genre}
                            </label>
                          </div>
                        ))}
                      </div>
                      <Button variant="link" size="sm" className="h-auto p-0 text-xs">
                        Ver más géneros
                      </Button>
                    </div>

                    <div className="space-y-2">
                      <Label>Estado</Label>
                      <RadioGroup defaultValue="all">
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="all" id="status-all" />
                          <Label htmlFor="status-all" className="text-sm">
                            Todos
                          </Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="ongoing" id="status-ongoing" />
                          <Label htmlFor="status-ongoing" className="text-sm">
                            En progreso
                          </Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="completed" id="status-completed" />
                          <Label htmlFor="status-completed" className="text-sm">
                            Completada
                          </Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="hiatus" id="status-hiatus" />
                          <Label htmlFor="status-hiatus" className="text-sm">
                            En pausa
                          </Label>
                        </div>
                      </RadioGroup>
                    </div>

                    <div className="space-y-2">
                      <Label>Valoración mínima</Label>
                      <div className="flex items-center gap-4">
                        <Slider defaultValue={[3.5]} min={0} max={5} step={0.5} className="flex-1" />
                        <span className="w-12 rounded-md border px-2 py-0.5 text-center text-sm">3.5</span>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label>Número de capítulos</Label>
                      <Select defaultValue="any">
                        <SelectTrigger>
                          <SelectValue placeholder="Seleccionar" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="any">Cualquiera</SelectItem>
                          <SelectItem value="lt-10">Menos de 10</SelectItem>
                          <SelectItem value="10-50">10-50</SelectItem>
                          <SelectItem value="50-100">50-100</SelectItem>
                          <SelectItem value="gt-100">Más de 100</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label>Ordenar por</Label>
                      <Select defaultValue="relevance">
                        <SelectTrigger>
                          <SelectValue placeholder="Seleccionar" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="relevance">Relevancia</SelectItem>
                          <SelectItem value="newest">Más recientes</SelectItem>
                          <SelectItem value="rating">Mejor valoradas</SelectItem>
                          <SelectItem value="popularity">Popularidad</SelectItem>
                          <SelectItem value="chapters">Número de capítulos</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label>Opciones adicionales</Label>
                      <div className="space-y-2">
                        <div className="flex items-center space-x-2">
                          <Checkbox id="completed-only" />
                          <label
                            htmlFor="completed-only"
                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                          >
                            Solo novelas completadas
                          </label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Checkbox id="exclude-mature" />
                          <label
                            htmlFor="exclude-mature"
                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                          >
                            Excluir contenido para adultos
                          </label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Checkbox id="premium-content" />
                          <label
                            htmlFor="premium-content"
                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                          >
                            Incluir contenido premium
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="mt-6 flex flex-col gap-2">
                    <Button type="submit" disabled={isSearching}>
                      {isSearching ? "Buscando..." : "Buscar"}
                    </Button>
                    <Button type="button" variant="outline">
                      Restablecer filtros
                    </Button>
                  </div>
                </div>
              </form>
            </div>

            <div className="order-1 md:order-2">
              {activeFilters.length > 0 && (
                <div className="mb-4 flex flex-wrap items-center gap-2 rounded-lg border p-2">
                  <span className="text-sm font-medium">Filtros activos:</span>
                  {activeFilters.map((filter) => (
                    <div key={filter} className="flex items-center gap-1 rounded-full bg-muted px-2 py-1 text-xs">
                      {filter}
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-4 w-4 rounded-full"
                        onClick={() => removeFilter(filter)}
                      >
                        <X className="h-3 w-3" />
                        <span className="sr-only">Eliminar filtro</span>
                      </Button>
                    </div>
                  ))}
                  <Button
                    variant="ghost"
                    size="sm"
                    className="ml-auto h-7 text-xs"
                    onClick={() => setActiveFilters([])}
                  >
                    Limpiar todos
                  </Button>
                </div>
              )}

              {isSearching ? (
                <div className="flex flex-col items-center justify-center rounded-lg border border-dashed p-8 text-center">
                  <Filter className="h-12 w-12 text-muted-foreground" />
                  <h3 className="mt-4 text-lg font-medium">Buscando...</h3>
                  <p className="mt-2 text-sm text-muted-foreground">Estamos filtrando las mejores novelas para ti.</p>
                </div>
              ) : searchResults.length > 0 ? (
                <>
                  <div className="mb-4 flex items-center justify-between">
                    <p className="text-sm text-muted-foreground">
                      Mostrando <span className="font-medium">{searchResults.length}</span> resultados
                    </p>
                    <div className="flex items-center gap-2">
                      <span className="text-sm">Vista:</span>
                      <Button variant="outline" size="icon" className="h-8 w-8">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="h-4 w-4"
                        >
                          <rect width="7" height="7" x="3" y="3" rx="1" />
                          <rect width="7" height="7" x="14" y="3" rx="1" />
                          <rect width="7" height="7" x="14" y="14" rx="1" />
                          <rect width="7" height="7" x="3" y="14" rx="1" />
                        </svg>
                        <span className="sr-only">Vista de cuadrícula</span>
                      </Button>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="h-4 w-4"
                        >
                          <line x1="3" x2="21" y1="6" y2="6" />
                          <line x1="3" x2="21" y1="12" y2="12" />
                          <line x1="3" x2="21" y1="18" y2="18" />
                        </svg>
                        <span className="sr-only">Vista de lista</span>
                      </Button>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {searchResults.map((result) => (
                      <Card key={result.id} className="overflow-hidden">
                        <Link href={`/novel/${result.id}`}>
                          <div className="relative">
                            <Image
                              src={`/placeholder.svg?height=240&width=180&text=Novela ${result.id}`}
                              width={180}
                              height={240}
                              alt={`${result.title} ${result.subtitle}`}
                              className="w-full object-cover transition-all hover:scale-105"
                            />
                            <div className="absolute top-2 right-2 flex items-center gap-1 rounded-md bg-black/60 px-2 py-1 text-xs text-white">
                              <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                              <span>{result.rating}</span>
                            </div>
                          </div>
                        </Link>
                        <CardHeader className="p-4">
                          <CardTitle className="line-clamp-1 text-base">
                            <Link href={`/novel/${result.id}`}>
                              {result.title} {result.subtitle}
                            </Link>
                          </CardTitle>
                        </CardHeader>
                        <CardContent className="p-4 pt-0">
                          <p className="line-clamp-2 text-xs text-muted-foreground">
                            {result.id % 3 === 0
                              ? "Un joven ordinario descubre que tiene poderes extraordinarios y debe enfrentarse a fuerzas oscuras."
                              : result.id % 3 === 1
                                ? "En un mundo de magia y misterio, una joven princesa debe recuperar su trono usurpado."
                                : "La historia de un poderoso hechicero que debe enfrentarse a su destino y salvar a la humanidad."}
                          </p>
                        </CardContent>
                        <CardFooter className="flex items-center justify-between p-4 pt-0">
                          <div className="flex flex-wrap gap-1">
                            {result.genres.map((genre: string) => (
                              <span key={genre} className="rounded-full bg-muted px-2 py-1 text-xs">
                                {genre}
                              </span>
                            ))}
                          </div>
                          <span className="text-xs text-muted-foreground">{result.chapters} capítulos</span>
                        </CardFooter>
                      </Card>
                    ))}
                  </div>

                  <div className="mt-8 flex justify-center">
                    <Button variant="outline">Cargar más resultados</Button>
                  </div>
                </>
              ) : (
                <div className="flex flex-col items-center justify-center rounded-lg border border-dashed p-8 text-center">
                  <Search className="h-12 w-12 text-muted-foreground" />
                  <h3 className="mt-4 text-lg font-medium">Busca tus novelas favoritas</h3>
                  <p className="mt-2 text-sm text-muted-foreground">
                    Utiliza los filtros para encontrar exactamente lo que estás buscando.
                  </p>
                  <Button className="mt-4" onClick={handleSearch}>
                    Buscar novelas populares
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
      <SiteFooter />
    </div>
  )
}
