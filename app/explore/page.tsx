"use client"

import Link from "next/link"
import Image from "next/image"
import { BookOpen, ChevronRight, Filter, Moon, Search, Star, Sun } from "lucide-react"
import { useState } from "react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"

export default function ExplorePage() {
  const [visibleItems, setVisibleItems] = useState(16)
  const [isLoading, setIsLoading] = useState(false)

  const handleLoadMore = async () => {
    setIsLoading(true)
    // Simulate loading delay
    await new Promise((resolve) => setTimeout(resolve, 1000))
    setVisibleItems((prev) => prev + 16)
    setIsLoading(false)
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
              <span className="font-medium text-foreground">Explorar</span>
            </div>
            <h1 className="mt-4 text-3xl font-bold tracking-tight md:text-4xl">Explorar Novelas</h1>
            <p className="mt-2 text-muted-foreground">
              Descubre nuevas historias, filtra por géneros y encuentra tu próxima lectura favorita.
            </p>
          </div>

          {/* Barra de búsqueda y filtros responsivos */}
          <div className="mb-4 sm:mb-6 md:mb-8 flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Buscar novelas..." className="pl-10" />
            </div>
            <div className="flex gap-2">
              <Select defaultValue="all">
                <SelectTrigger className="w-full sm:w-[180px]">
                  <SelectValue placeholder="Estado" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todos</SelectItem>
                  <SelectItem value="ongoing">En progreso</SelectItem>
                  <SelectItem value="completed">Completada</SelectItem>
                  <SelectItem value="hiatus">En pausa</SelectItem>
                </SelectContent>
              </Select>
              <Button variant="outline" className="gap-1 sm:gap-2 px-2 sm:px-3">
                <Filter className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                <span className="text-xs sm:text-sm">Filtros</span>
              </Button>
            </div>
          </div>

          {/* Tabs responsivos con scroll horizontal en móvil */}
          <div className="mb-4 sm:mb-6 md:mb-8">
            <Tabs defaultValue="all" className="w-full">
              <ScrollArea className="w-full whitespace-nowrap">
                <TabsList className="inline-flex w-max min-w-full h-auto p-1 bg-muted rounded-lg">
                  <TabsTrigger value="all" className="text-xs sm:text-sm whitespace-nowrap px-3 py-2">
                    Todos
                  </TabsTrigger>
                  <TabsTrigger value="fantasy" className="text-xs sm:text-sm whitespace-nowrap px-3 py-2">
                    Fantasía
                  </TabsTrigger>
                  <TabsTrigger value="action" className="text-xs sm:text-sm whitespace-nowrap px-3 py-2">
                    Acción
                  </TabsTrigger>
                  <TabsTrigger value="romance" className="text-xs sm:text-sm whitespace-nowrap px-3 py-2">
                    Romance
                  </TabsTrigger>
                  <TabsTrigger value="adventure" className="text-xs sm:text-sm whitespace-nowrap px-3 py-2">
                    Aventura
                  </TabsTrigger>
                  <TabsTrigger value="scifi" className="text-xs sm:text-sm whitespace-nowrap px-3 py-2">
                    Ciencia Ficción
                  </TabsTrigger>
                  <TabsTrigger value="drama" className="text-xs sm:text-sm whitespace-nowrap px-3 py-2">
                    Drama
                  </TabsTrigger>
                  <TabsTrigger value="mystery" className="text-xs sm:text-sm whitespace-nowrap px-3 py-2">
                    Misterio
                  </TabsTrigger>
                  <TabsTrigger value="horror" className="text-xs sm:text-sm whitespace-nowrap px-3 py-2">
                    Terror
                  </TabsTrigger>
                  <TabsTrigger value="historical" className="text-xs sm:text-sm whitespace-nowrap px-3 py-2">
                    Histórico
                  </TabsTrigger>
                  <TabsTrigger value="comedy" className="text-xs sm:text-sm whitespace-nowrap px-3 py-2">
                    Comedia
                  </TabsTrigger>
                  <TabsTrigger value="supernatural" className="text-xs sm:text-sm whitespace-nowrap px-3 py-2">
                    Sobrenatural
                  </TabsTrigger>
                  <TabsTrigger value="martialarts" className="text-xs sm:text-sm whitespace-nowrap px-3 py-2">
                    Artes Marciales
                  </TabsTrigger>
                </TabsList>
                <ScrollBar orientation="horizontal" className="bg-white dark:bg-[#18181b]" />
              </ScrollArea>

              <TabsContent value="all" className="mt-4 sm:mt-6">
                <div className="grid grid-cols-2 gap-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
                  {[...Array(visibleItems)].map((_, i) => (
                    <Card key={i} className="overflow-hidden border">
                      <Link href={`/novel/${i + 1}`}>
                        <div className="relative">
                          <Image
                            src={`/placeholder.jpg?height=240&width=180&text=Novela ${i + 1}`}
                            width={180}
                            height={240}
                            alt={`Novela ${i + 1}`}
                            className="w-full object-cover transition-all hover:scale-105"
                          />
                          <div className="absolute top-1 right-1 sm:top-2 sm:right-2 flex items-center gap-0.5 sm:gap-1 rounded-md bg-black/60 px-1.5 py-0.5 sm:px-2 sm:py-1 text-[10px] sm:text-xs text-white">
                            <Star className="h-2.5 w-2.5 sm:h-3 sm:w-3 fill-yellow-400 text-yellow-400" />
                            <span>4.{7 - (i % 3)}</span>
                          </div>
                        </div>
                      </Link>
                      <CardHeader className="p-2 sm:p-3 md:p-4">
                        <CardTitle className="line-clamp-1 text-xs sm:text-sm md:text-base">
                          <Link href={`/novel/${i + 1}`}>
                            {i % 3 === 0
                              ? "El Ascenso del Héroe Legendario"
                              : i % 3 === 1
                                ? "Crónicas del Reino Olvidado"
                                : "El Último Hechicero"}{" "}
                            {i + 1}
                          </Link>
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="hidden sm:block p-3 pt-0 md:p-4 md:pt-0">
                        <p className="line-clamp-2 text-xs text-muted-foreground">
                          {i % 3 === 0
                            ? "Un joven ordinario descubre que tiene poderes extraordinarios y debe enfrentarse a fuerzas oscuras."
                            : i % 3 === 1
                              ? "En un mundo de magia y misterio, una joven princesa debe recuperar su trono usurpado."
                              : "La historia de un poderoso hechicero que debe enfrentarse a su destino y salvar a la humanidad."}
                        </p>
                      </CardContent>
                      <CardFooter className="flex items-center justify-between p-2 pt-0 sm:p-3 sm:pt-0 md:p-4 md:pt-0">
                        <div className="flex flex-wrap gap-1">
                          <span className="rounded-full bg-muted px-1.5 py-0.5 text-[10px] sm:px-2 sm:py-1 sm:text-xs">
                            {i % 3 === 0 ? "Fantasía" : i % 3 === 1 ? "Aventura" : "Magia"}
                          </span>
                          <span className="rounded-full bg-muted px-1.5 py-0.5 text-[10px] sm:px-2 sm:py-1 sm:text-xs">
                            {i % 3 === 0 ? "Acción" : i % 3 === 1 ? "Drama" : "Misterio"}
                          </span>
                        </div>
                      </CardFooter>
                    </Card>
                  ))}
                </div>
                <div className="mt-6 sm:mt-8 flex justify-center">
                  <Button
                    variant="outline"
                    onClick={handleLoadMore}
                    disabled={isLoading}
                    className="min-w-[120px] bg-transparent"
                  >
                    {isLoading ? "Cargando..." : "Cargar más"}
                  </Button>
                </div>
              </TabsContent>

              <TabsContent value="fantasy" className="mt-4 sm:mt-6">
                <div className="grid grid-cols-2 gap-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
                  {[...Array(8)].map((_, i) => (
                    <Card key={i} className="overflow-hidden border">
                      <Link href={`/novel/${i + 20}`}>
                        <div className="relative">
                          <Image
                            src={`/placeholder.jpg?height=240&width=180&text=Fantasía ${i + 1}`}
                            width={180}
                            height={240}
                            alt={`Novela de Fantasía ${i + 1}`}
                            className="w-full object-cover transition-all hover:scale-105"
                          />
                          <div className="absolute top-1 right-1 sm:top-2 sm:right-2 flex items-center gap-0.5 sm:gap-1 rounded-md bg-black/60 px-1.5 py-0.5 sm:px-2 sm:py-1 text-[10px] sm:text-xs text-white">
                            <Star className="h-2.5 w-2.5 sm:h-3 sm:w-3 fill-yellow-400 text-yellow-400" />
                            <span>4.{8 - (i % 2)}</span>
                          </div>
                        </div>
                      </Link>
                      <CardHeader className="p-2 sm:p-3 md:p-4">
                        <CardTitle className="line-clamp-1 text-xs sm:text-sm md:text-base">
                          <Link href={`/novel/${i + 20}`}>
                            {i % 2 === 0 ? "El Reino de los Dragones" : "La Torre del Mago"} {i + 1}
                          </Link>
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="hidden sm:block p-3 pt-0 md:p-4 md:pt-0">
                        <p className="line-clamp-2 text-xs text-muted-foreground">
                          {i % 2 === 0
                            ? "En un mundo donde los dragones gobiernan los cielos, un joven descubre que puede comunicarse con ellos."
                            : "Un aprendiz de mago debe ascender por los niveles de una misteriosa torre para convertirse en un verdadero hechicero."}
                        </p>
                      </CardContent>
                      <CardFooter className="flex items-center justify-between p-2 pt-0 sm:p-3 sm:pt-0 md:p-4 md:pt-0">
                        <div className="flex flex-wrap gap-1">
                          <span className="rounded-full bg-muted px-1.5 py-0.5 text-[10px] sm:px-2 sm:py-1 sm:text-xs">
                            Fantasía
                          </span>
                          <span className="rounded-full bg-muted px-1.5 py-0.5 text-[10px] sm:px-2 sm:py-1 sm:text-xs">
                            {i % 2 === 0 ? "Dragones" : "Magia"}
                          </span>
                        </div>
                      </CardFooter>
                    </Card>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </main>

      <SiteFooter />
    </div>
  )
}
