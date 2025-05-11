import Link from "next/link"
import Image from "next/image"
import { BookOpen, Calendar, ChevronRight, Star } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { SiteFooter } from "@/components/site-footer"
import { SiteHeader } from "@/components/site-header"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function LatestPage() {
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
              <span className="font-medium text-foreground">Novedades</span>
            </div>
            <h1 className="mt-4 text-3xl font-bold tracking-tight md:text-4xl">Novedades</h1>
            <p className="mt-2 text-muted-foreground">
              Descubre las últimas actualizaciones y nuevas novelas en nuestra plataforma.
            </p>
          </div>

          <Tabs defaultValue="recent-chapters" className="mb-8">
            <TabsList>
              <TabsTrigger value="recent-chapters">Capítulos Recientes</TabsTrigger>
              <TabsTrigger value="new-novels">Nuevas Novelas</TabsTrigger>
              <TabsTrigger value="updates">Actualizaciones</TabsTrigger>
            </TabsList>

            <TabsContent value="recent-chapters" className="mt-6">
              <div className="space-y-6">
                {[...Array(10)].map((_, i) => (
                  <Card key={i} className="overflow-hidden">
                    <div className="flex flex-col gap-4 p-4 sm:flex-row">
                      <div className="relative h-32 w-24 flex-shrink-0 overflow-hidden rounded-md sm:h-40 sm:w-28">
                        <Image
                          src={`/placeholder.svg?height=160&width=120&text=Novela ${i + 1}`}
                          fill
                          alt={`Novela ${i + 1}`}
                          className="object-cover"
                        />
                      </div>
                      <div className="flex flex-1 flex-col">
                        <CardHeader className="p-0">
                          <div className="flex items-center gap-2">
                            <span className="rounded-full bg-primary/10 px-2 py-1 text-xs font-medium text-primary">
                              {i % 3 === 0 ? "Nuevo" : i % 3 === 1 ? "Actualizado" : "Popular"}
                            </span>
                            <span className="text-xs text-muted-foreground">
                              {i === 0
                                ? "Hace 30 minutos"
                                : i === 1
                                  ? "Hace 2 horas"
                                  : i === 2
                                    ? "Hace 5 horas"
                                    : `Hace ${i} horas`}
                            </span>
                          </div>
                          <CardTitle className="mt-2 text-base">
                            <Link href={`/novel/${i + 1}`} className="hover:underline">
                              {i % 3 === 0
                                ? "El Ascenso del Héroe Legendario"
                                : i % 3 === 1
                                  ? "Crónicas del Reino Olvidado"
                                  : "El Último Hechicero"}{" "}
                              {i + 1}
                            </Link>
                          </CardTitle>
                        </CardHeader>
                        <CardContent className="p-0 pt-2">
                          <p className="text-sm text-muted-foreground">
                            <Link href={`/novel/${i + 1}/chapter/${120 - i}`} className="font-medium hover:underline">
                              Capítulo {120 - i}:{" "}
                              {i === 0
                                ? "El Despertar Final"
                                : `La Prueba del ${i === 1 ? "Valor" : i === 2 ? "Coraje" : i === 3 ? "Espíritu" : "Destino"} (${i + 1})`}
                            </Link>
                          </p>
                          <p className="mt-2 line-clamp-2 text-sm text-muted-foreground">
                            {i % 3 === 0
                              ? "Aron se enfrentó finalmente al Rey Demonio, pero lo que descubrió cambiaría el destino del reino para siempre..."
                              : i % 3 === 1
                                ? "La princesa Elara encontró el artefacto perdido, pero su poder resultó ser más peligroso de lo que imaginaba..."
                                : "El hechicero completó el ritual ancestral, abriendo un portal entre dimensiones que nadie podría cerrar..."}
                          </p>
                        </CardContent>
                        <CardFooter className="flex items-center justify-between p-0 pt-4">
                          <div className="flex items-center gap-2">
                            <div className="flex items-center gap-1">
                              <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                              <span className="text-sm">{4.5 + (i % 5) / 10}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <BookOpen className="h-4 w-4 text-muted-foreground" />
                              <span className="text-sm text-muted-foreground">{120 - i} capítulos</span>
                            </div>
                          </div>
                          <Button size="sm" asChild>
                            <Link href={`/novel/${i + 1}/chapter/${120 - i}`}>Leer</Link>
                          </Button>
                        </CardFooter>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
              <div className="mt-8 flex justify-center">
                <Button variant="outline">Cargar más capítulos</Button>
              </div>
            </TabsContent>

            <TabsContent value="new-novels" className="mt-6">
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {[...Array(8)].map((_, i) => (
                  <Card key={i} className="overflow-hidden">
                    <Link href={`/novel/${i + 20}`}>
                      <div className="relative">
                        <Image
                          src={`/placeholder.svg?height=240&width=180&text=Nueva ${i + 1}`}
                          width={180}
                          height={240}
                          alt={`Nueva Novela ${i + 1}`}
                          className="w-full object-cover transition-all hover:scale-105"
                        />
                        <div className="absolute top-2 right-2 flex items-center gap-1 rounded-md bg-black/60 px-2 py-1 text-xs text-white">
                          <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                          <span>Nuevo</span>
                        </div>
                        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-3">
                          <div className="flex items-center gap-1 text-xs text-white">
                            <Calendar className="h-3 w-3" />
                            <span>Publicado: {i === 0 ? "Hoy" : i === 1 ? "Ayer" : `Hace ${i} días`}</span>
                          </div>
                        </div>
                      </div>
                    </Link>
                    <CardHeader className="p-4">
                      <CardTitle className="line-clamp-1 text-base">
                        <Link href={`/novel/${i + 20}`}>
                          {i % 3 === 0
                            ? "Guardianes del Abismo"
                            : i % 3 === 1
                              ? "La Senda del Inmortal"
                              : "Reinos en Guerra"}{" "}
                          {i + 1}
                        </Link>
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="p-4 pt-0">
                      <p className="line-clamp-2 text-xs text-muted-foreground">
                        {i % 3 === 0
                          ? "Un grupo de aventureros descubre una antigua entrada a un mundo subterráneo lleno de peligros y tesoros."
                          : i % 3 === 1
                            ? "Un joven monje encuentra un manuscrito prohibido que revela el secreto de la inmortalidad."
                            : "Cinco reinos al borde de la guerra. Una profecía olvidada. Un héroe inesperado."}
                      </p>
                    </CardContent>
                    <CardFooter className="flex items-center justify-between p-4 pt-0">
                      <div className="flex flex-wrap gap-1">
                        <span className="rounded-full bg-muted px-2 py-1 text-xs">
                          {i % 3 === 0 ? "Fantasía" : i % 3 === 1 ? "Cultivo" : "Épica"}
                        </span>
                        <span className="rounded-full bg-muted px-2 py-1 text-xs">
                          {i % 3 === 0 ? "Aventura" : i % 3 === 1 ? "Artes Marciales" : "Guerra"}
                        </span>
                      </div>
                    </CardFooter>
                  </Card>
                ))}
              </div>
              <div className="mt-8 flex justify-center">
                <Button variant="outline">Ver más novelas</Button>
              </div>
            </TabsContent>

            <TabsContent value="updates" className="mt-6">
              <div className="space-y-4">
                {[...Array(5)].map((_, i) => (
                  <Card key={i} className="p-4">
                    <div className="flex items-start gap-4">
                      <div
                        className={`flex h-10 w-10 items-center justify-center rounded-full ${i % 3 === 0 ? "bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400" : i % 3 === 1 ? "bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400" : "bg-purple-100 text-purple-600 dark:bg-purple-900/30 dark:text-purple-400"}`}
                      >
                        {i % 3 === 0 ? (
                          <BookOpen className="h-5 w-5" />
                        ) : i % 3 === 1 ? (
                          <Star className="h-5 w-5" />
                        ) : (
                          <Calendar className="h-5 w-5" />
                        )}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-start justify-between">
                          <div>
                            <h3 className="font-medium">
                              {i % 3 === 0
                                ? "Nueva temporada disponible"
                                : i % 3 === 1
                                  ? "Novela destacada de la semana"
                                  : "Evento especial anunciado"}
                            </h3>
                            <p className="text-sm text-muted-foreground">
                              {i % 3 === 0
                                ? `La segunda temporada de "${i === 0 ? "El Ascenso del Héroe Legendario" : "Crónicas del Reino Olvidado"}" ya está disponible con 10 nuevos capítulos.`
                                : i % 3 === 1
                                  ? `"${i === 1 ? "La Senda del Inmortal" : "Guardianes del Abismo"}" ha sido seleccionada como la novela destacada de esta semana.`
                                  : `No te pierdas nuestro evento especial con el autor de "${i === 2 ? "Reinos en Guerra" : "El Último Hechicero"}" este fin de semana.`}
                            </p>
                          </div>
                          <p className="text-xs text-muted-foreground">
                            {i === 0
                              ? "Hace 3 horas"
                              : i === 1
                                ? "Hace 1 día"
                                : i === 2
                                  ? "Hace 2 días"
                                  : i === 3
                                    ? "Hace 4 días"
                                    : "Hace 1 semana"}
                          </p>
                        </div>
                        <div className="mt-2">
                          <Button variant="link" size="sm" className="h-auto p-0" asChild>
                            <Link href={i % 3 === 0 ? `/novel/${i + 1}` : i % 3 === 1 ? `/explore` : `/events`}>
                              {i % 3 === 0
                                ? "Ver novela"
                                : i % 3 === 1
                                  ? "Explorar novelas destacadas"
                                  : "Ver detalles del evento"}
                              <ChevronRight className="ml-1 h-3 w-3" />
                            </Link>
                          </Button>
                        </div>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
              <div className="mt-8 flex justify-center">
                <Button variant="outline">Ver más actualizaciones</Button>
              </div>
            </TabsContent>
          </Tabs>

          <div className="mt-12 rounded-lg border bg-muted/40 p-6 dark:bg-muted/10">
            <div className="flex flex-col items-center justify-between gap-4 text-center sm:flex-row sm:text-left">
              <div>
                <h2 className="text-xl font-bold">¿Quieres recibir notificaciones de nuevos capítulos?</h2>
                <p className="text-muted-foreground">
                  Suscríbete para recibir alertas cuando se publiquen nuevos capítulos de tus novelas favoritas.
                </p>
              </div>
              <Button className="whitespace-nowrap">Activar notificaciones</Button>
            </div>
          </div>

          <div className="mt-12">
            <h2 className="mb-6 text-2xl font-bold">Calendario de publicaciones</h2>
            <div className="overflow-x-auto">
              <div className="min-w-[800px]">
                <div className="grid grid-cols-7 gap-4">
                  {["Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado", "Domingo"].map((day) => (
                    <div key={day} className="text-center font-medium">
                      {day}
                    </div>
                  ))}
                  {[...Array(7)].map((_, i) => (
                    <Card key={i} className="p-4">
                      <div className="text-right text-sm text-muted-foreground">{i + 1}</div>
                      <div className="mt-2 space-y-2">
                        {i % 7 === 0 || i % 7 === 3 ? (
                          <>
                            <div className="rounded bg-blue-100 p-2 text-xs dark:bg-blue-900/30">
                              <p className="font-medium">El Ascenso del Héroe Legendario</p>
                              <p className="text-muted-foreground">Cap. {121 + i}</p>
                            </div>
                            <div className="rounded bg-green-100 p-2 text-xs dark:bg-green-900/30">
                              <p className="font-medium">Crónicas del Reino Olvidado</p>
                              <p className="text-muted-foreground">Cap. {85 + i}</p>
                            </div>
                          </>
                        ) : i % 7 === 1 || i % 7 === 4 ? (
                          <div className="rounded bg-purple-100 p-2 text-xs dark:bg-purple-900/30">
                            <p className="font-medium">El Último Hechicero</p>
                            <p className="text-muted-foreground">Cap. {95 + i}</p>
                          </div>
                        ) : i % 7 === 2 ? (
                          <div className="rounded bg-amber-100 p-2 text-xs dark:bg-amber-900/30">
                            <p className="font-medium">Reinos en Guerra</p>
                            <p className="text-muted-foreground">Cap. {65 + i}</p>
                          </div>
                        ) : i % 7 === 5 || i % 7 === 6 ? (
                          <div className="rounded bg-red-100 p-2 text-xs dark:bg-red-900/30">
                            <p className="font-medium">La Senda del Inmortal</p>
                            <p className="text-muted-foreground">Cap. {45 + i}</p>
                          </div>
                        ) : null}
                      </div>
                    </Card>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <SiteFooter />
    </div>
  )
}
