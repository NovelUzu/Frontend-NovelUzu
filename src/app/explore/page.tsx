import Link from "next/link"
import Image from "next/image"
import { Filter, Search, Star } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { SiteFooter } from "@/components/site-footer"
import { SiteHeader } from "@/components/site-header"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function ExplorePage() {
  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main className="flex-1">
        <div className="container px-4 py-8 md:px-6 md:py-12">
          <div className="mb-8 space-y-4">
            <h1 className="text-3xl font-bold tracking-tight md:text-4xl">Explorar Novelas</h1>
            <p className="text-muted-foreground">
              Descubre nuevas historias, filtra por géneros y encuentra tu próxima lectura favorita.
            </p>
          </div>
          <div className="mb-8 flex flex-col gap-4 md:flex-row">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Buscar novelas..." className="pl-10" />
            </div>
            <div className="flex gap-2">
              <Select defaultValue="all">
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Estado" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todos</SelectItem>
                  <SelectItem value="ongoing">En progreso</SelectItem>
                  <SelectItem value="completed">Completada</SelectItem>
                  <SelectItem value="hiatus">En pausa</SelectItem>
                </SelectContent>
              </Select>
              <Button variant="outline" className="gap-2">
                <Filter className="h-4 w-4" />
                Filtros
              </Button>
            </div>
          </div>
          <Tabs defaultValue="all" className="mb-8">
            <TabsList>
              <TabsTrigger value="all">Todos</TabsTrigger>
              <TabsTrigger value="fantasy">Fantasía</TabsTrigger>
              <TabsTrigger value="action">Acción</TabsTrigger>
              <TabsTrigger value="romance">Romance</TabsTrigger>
              <TabsTrigger value="scifi">Ciencia Ficción</TabsTrigger>
              <TabsTrigger value="drama">Drama</TabsTrigger>
            </TabsList>
            <TabsContent value="all" className="mt-6">
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {[...Array(16)].map((_, i) => (
                  <Card key={i} className="overflow-hidden">
                    <Link href={`/novel/${i + 1}`}>
                      <div className="relative">
                        <Image
                          src={`/placeholder.svg?height=240&width=180&text=Novela ${i + 1}`}
                          width={180}
                          height={240}
                          alt={`Novela ${i + 1}`}
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
                          {i % 3 === 0
                            ? "El Ascenso del Héroe Legendario"
                            : i % 3 === 1
                              ? "Crónicas del Reino Olvidado"
                              : "El Último Hechicero"}{" "}
                          {i + 1}
                        </Link>
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="p-4 pt-0">
                      <p className="line-clamp-2 text-xs text-muted-foreground">
                        {i % 3 === 0
                          ? "Un joven ordinario descubre que tiene poderes extraordinarios y debe enfrentarse a fuerzas oscuras."
                          : i % 3 === 1
                            ? "En un mundo de magia y misterio, una joven princesa debe recuperar su trono usurpado."
                            : "La historia de un poderoso hechicero que debe enfrentarse a su destino y salvar a la humanidad."}
                      </p>
                    </CardContent>
                    <CardFooter className="flex items-center justify-between p-4 pt-0">
                      <div className="flex flex-wrap gap-1">
                        <span className="rounded-full bg-muted px-2 py-1 text-xs">
                          {i % 3 === 0 ? "Fantasía" : i % 3 === 1 ? "Aventura" : "Magia"}
                        </span>
                        <span className="rounded-full bg-muted px-2 py-1 text-xs">
                          {i % 3 === 0 ? "Acción" : i % 3 === 1 ? "Drama" : "Misterio"}
                        </span>
                      </div>
                    </CardFooter>
                  </Card>
                ))}
              </div>
              <div className="mt-8 flex justify-center">
                <Button variant="outline">Cargar más</Button>
              </div>
            </TabsContent>
            <TabsContent value="fantasy" className="mt-6">
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {[...Array(8)].map((_, i) => (
                  <Card key={i} className="overflow-hidden">
                    <Link href={`/novel/${i + 20}`}>
                      <div className="relative">
                        <Image
                          src={`/placeholder.svg?height=240&width=180&text=Fantasía ${i + 1}`}
                          width={180}
                          height={240}
                          alt={`Novela de Fantasía ${i + 1}`}
                          className="w-full object-cover transition-all hover:scale-105"
                        />
                        <div className="absolute top-2 right-2 flex items-center gap-1 rounded-md bg-black/60 px-2 py-1 text-xs text-white">
                          <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                          <span>4.{8 - (i % 2)}</span>
                        </div>
                      </div>
                    </Link>
                    <CardHeader className="p-4">
                      <CardTitle className="line-clamp-1 text-base">
                        <Link href={`/novel/${i + 20}`}>
                          {i % 2 === 0 ? "El Reino de los Dragones" : "La Torre del Mago"} {i + 1}
                        </Link>
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="p-4 pt-0">
                      <p className="line-clamp-2 text-xs text-muted-foreground">
                        {i % 2 === 0
                          ? "En un mundo donde los dragones gobiernan los cielos, un joven descubre que puede comunicarse con ellos."
                          : "Un aprendiz de mago debe ascender por los niveles de una misteriosa torre para convertirse en un verdadero hechicero."}
                      </p>
                    </CardContent>
                    <CardFooter className="flex items-center justify-between p-4 pt-0">
                      <div className="flex flex-wrap gap-1">
                        <span className="rounded-full bg-muted px-2 py-1 text-xs">Fantasía</span>
                        <span className="rounded-full bg-muted px-2 py-1 text-xs">
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
      </main>
      <SiteFooter />
    </div>
  )
}
