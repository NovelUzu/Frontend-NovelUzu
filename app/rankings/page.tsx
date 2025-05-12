import Link from "next/link"
import Image from "next/image"
import { ArrowUp, BookOpen, Crown, FlameIcon as Fire, Star, TrendingUp } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { SiteFooter } from "@/components/site-footer"
import { SiteHeader } from "@/components/site-header"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function RankingsPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main className="flex-1">
        <div className="container px-4 py-8 md:px-6 md:py-12">
          <div className="mb-8 space-y-4">
            <h1 className="text-3xl font-bold tracking-tight md:text-4xl">Rankings</h1>
            <p className="text-muted-foreground">
              Descubre las novelas más populares, mejor valoradas y con más lecturas en nuestra plataforma.
            </p>
          </div>
          <Tabs defaultValue="popular" className="mb-8">
            <TabsList>
              <TabsTrigger value="popular" className="gap-2">
                <Fire className="h-4 w-4" />
                Populares
              </TabsTrigger>
              <TabsTrigger value="rated" className="gap-2">
                <Star className="h-4 w-4" />
                Mejor Valoradas
              </TabsTrigger>
              <TabsTrigger value="trending" className="gap-2">
                <TrendingUp className="h-4 w-4" />
                Tendencia
              </TabsTrigger>
              <TabsTrigger value="completed" className="gap-2">
                <BookOpen className="h-4 w-4" />
                Completadas
              </TabsTrigger>
            </TabsList>
            <TabsContent value="popular" className="mt-6">
              <div className="space-y-6">
                {[...Array(10)].map((_, i) => (
                  <Card key={i} className="overflow-hidden">
                    <div className="flex flex-col items-center gap-4 p-4 sm:flex-row">
                      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-xl font-bold text-primary-foreground">
                        {i + 1}
                      </div>
                      <div className="relative h-32 w-24 overflow-hidden rounded-md sm:h-40 sm:w-28">
                        <Image
                          src={`/placeholder.jpeg?height=160&width=120&text=Top ${i + 1}`}
                          fill
                          alt={`Novela Top ${i + 1}`}
                          className="object-cover"
                        />
                        {i < 3 && (
                          <div className="absolute left-0 top-0 flex h-8 w-8 items-center justify-center bg-yellow-500 text-white">
                            <Crown className="h-5 w-5" />
                          </div>
                        )}
                      </div>
                      <div className="flex flex-1 flex-col text-center sm:text-left">
                        <Link href={`/novel/${i + 1}`} className="text-lg font-bold hover:underline">
                          {i === 0
                            ? "El Ascenso del Héroe Legendario"
                            : i === 1
                              ? "Crónicas del Reino Olvidado"
                              : i === 2
                                ? "El Último Hechicero"
                                : i % 3 === 0
                                  ? "La Espada del Destino"
                                  : i % 3 === 1
                                    ? "Reinos en Guerra"
                                    : "El Despertar de los Dioses"}
                        </Link>
                        <p className="text-sm text-muted-foreground">
                          Por:{" "}
                          <Link href="/author/1" className="text-primary hover:underline">
                            {i % 3 === 0 ? "Autor Famoso" : i % 3 === 1 ? "Escritora Novel" : "Pluma Maestra"}
                          </Link>
                        </p>
                        <div className="mt-2 flex flex-wrap items-center gap-4">
                          <div className="flex items-center gap-1">
                            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                            <span className="text-sm">4.{9 - (i % 3)}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Fire className="h-4 w-4 text-red-500" />
                            <span className="text-sm">{1000 - i * 50}K lecturas</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <BookOpen className="h-4 w-4 text-muted-foreground" />
                            <span className="text-sm">{120 - i * 5} capítulos</span>
                          </div>
                        </div>
                        <div className="mt-2 flex flex-wrap gap-2">
                          <span className="rounded-full bg-muted px-2 py-1 text-xs">
                            {i % 3 === 0 ? "Fantasía" : i % 3 === 1 ? "Aventura" : "Acción"}
                          </span>
                          <span className="rounded-full bg-muted px-2 py-1 text-xs">
                            {i % 3 === 0 ? "Magia" : i % 3 === 1 ? "Drama" : "Misterio"}
                          </span>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="flex items-center gap-1 text-green-500">
                          <ArrowUp className="h-4 w-4" />
                          <span className="text-sm font-medium">{i === 0 ? "Estable" : `${i * 2}%`}</span>
                        </div>
                        <Button variant="outline" size="sm" asChild>
                          <Link href={`/novel/${i + 1}`}>Ver</Link>
                        </Button>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
              <div className="mt-8 flex justify-center">
                <Button variant="outline">Ver más rankings</Button>
              </div>
            </TabsContent>
            <TabsContent value="rated" className="mt-6">
              <div className="space-y-6">
                {[...Array(5)].map((_, i) => (
                  <Card key={i} className="overflow-hidden">
                    <div className="flex flex-col items-center gap-4 p-4 sm:flex-row">
                      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-xl font-bold text-primary-foreground">
                        {i + 1}
                      </div>
                      <div className="relative h-32 w-24 overflow-hidden rounded-md sm:h-40 sm:w-28">
                        <Image
                          src={`/placeholder.jpeg?height=160&width=120&text=Top ${i + 1}`}
                          fill
                          alt={`Novela Top ${i + 1}`}
                          className="object-cover"
                        />
                        {i < 3 && (
                          <div className="absolute left-0 top-0 flex h-8 w-8 items-center justify-center bg-yellow-500 text-white">
                            <Star className="h-5 w-5 fill-white" />
                          </div>
                        )}
                      </div>
                      <div className="flex flex-1 flex-col text-center sm:text-left">
                        <Link href={`/novel/${i + 10}`} className="text-lg font-bold hover:underline">
                          {i === 0
                            ? "La Leyenda del Dragón Dorado"
                            : i === 1
                              ? "El Secreto de los Antiguos"
                              : i === 2
                                ? "Cazadores de Sombras"
                                : i === 3
                                  ? "El Último Reino"
                                  : "La Profecía Olvidada"}
                        </Link>
                        <p className="text-sm text-muted-foreground">
                          Por:{" "}
                          <Link href="/author/1" className="text-primary hover:underline">
                            {i % 2 === 0 ? "Maestro de Historias" : "Narradora Estelar"}
                          </Link>
                        </p>
                        <div className="mt-2 flex flex-wrap items-center gap-4">
                          <div className="flex items-center gap-1">
                            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                            <span className="text-sm">5.0</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Fire className="h-4 w-4 text-red-500" />
                            <span className="text-sm">{500 - i * 30}K lecturas</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <BookOpen className="h-4 w-4 text-muted-foreground" />
                            <span className="text-sm">{200 - i * 15} capítulos</span>
                          </div>
                        </div>
                        <div className="mt-2 flex flex-wrap gap-2">
                          <span className="rounded-full bg-muted px-2 py-1 text-xs">
                            {i % 2 === 0 ? "Fantasía Épica" : "Misterio"}
                          </span>
                          <span className="rounded-full bg-muted px-2 py-1 text-xs">
                            {i % 2 === 0 ? "Aventura" : "Sobrenatural"}
                          </span>
                        </div>
                      </div>
                      <div className="flex items-center">
                        <Button variant="outline" size="sm" asChild>
                          <Link href={`/novel/${i + 10}`}>Ver</Link>
                        </Button>
                      </div>
                    </div>
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
