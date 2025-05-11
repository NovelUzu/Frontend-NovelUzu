import Link from "next/link"
import Image from "next/image"
import { BookOpen, Calendar, ChevronRight, Mail, MessageSquare, Star, Users } from 'lucide-react'

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function AuthorPage({ params }: { params: { id: string } }) {
  const authorId = params.id

  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center">
          <Link href="/" className="flex items-center gap-2 font-bold text-xl">
            <BookOpen className="h-6 w-6" />
            <span>NovelUzu</span>
          </Link>
          <nav className="ml-auto flex gap-4 sm:gap-6">
            <Link href="/explore" className="text-sm font-medium">
              Explorar
            </Link>
            <Link href="/rankings" className="text-sm font-medium">
              Rankings
            </Link>
            <Link href="/genres" className="text-sm font-medium">
              Géneros
            </Link>
            <Link href="/latest" className="text-sm font-medium">
              Novedades
            </Link>
          </nav>
          <div className="ml-4 flex items-center gap-2">
            <Button asChild>
              <Link href="/author/write">Escribir</Link>
            </Button>
            <Button variant="outline" size="sm" asChild>
              <Link href="/login">Iniciar Sesión</Link>
            </Button>
            <Button size="sm" asChild>
              <Link href="/register">Registrarse</Link>
            </Button>
          </div>
        </div>
      </header>
      <main className="flex-1">
        <div className="container px-4 py-8 md:px-6 md:py-12">
          <div className="flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
            <Link href="/" className="hover:underline">
              Inicio
            </Link>
            <ChevronRight className="h-4 w-4" />
            <Link href="/authors" className="hover:underline">
              Autores
            </Link>
            <ChevronRight className="h-4 w-4" />
            <span className="font-medium text-foreground">Autor Famoso</span>
          </div>
          <div className="mt-8 flex flex-col gap-8 md:flex-row">
            <div className="md:w-1/3 lg:w-1/4">
              <div className="flex flex-col items-center text-center">
                <Avatar className="h-32 w-32 md:h-40 md:w-40">
                  <AvatarImage src={`/placeholder.svg?height=160&width=160&text=A${authorId}`} alt="Autor Famoso" />
                  <AvatarFallback>AF</AvatarFallback>
                </Avatar>
                <h1 className="mt-4 text-2xl font-bold">Autor Famoso</h1>
                <p className="text-muted-foreground">Escritor de Fantasía y Aventura</p>
                <div className="mt-4 flex items-center justify-center gap-4">
                  <div className="flex flex-col items-center">
                    <span className="text-lg font-bold">15</span>
                    <span className="text-xs text-muted-foreground">Novelas</span>
                  </div>
                  <Separator orientation="vertical" className="h-8" />
                  <div className="flex flex-col items-center">
                    <span className="text-lg font-bold">1.2M</span>
                    <span className="text-xs text-muted-foreground">Lectores</span>
                  </div>
                  <Separator orientation="vertical" className="h-8" />
                  <div className="flex flex-col items-center">
                    <span className="text-lg font-bold">4.8</span>
                    <span className="text-xs text-muted-foreground">Valoración</span>
                  </div>
                </div>
                <div className="mt-6 flex w-full flex-col gap-2">
                  <Button className="w-full">Seguir</Button>
                  <Button variant="outline" className="w-full gap-2">
                    <MessageSquare className="h-4 w-4" />
                    Mensaje
                  </Button>
                </div>
                <div className="mt-6 w-full rounded-lg border p-4 text-left">
                  <h3 className="font-medium">Información</h3>
                  <div className="mt-2 space-y-2 text-sm">
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      <span>Miembro desde: Enero 2020</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Users className="h-4 w-4 text-muted-foreground" />
                      <span>45.6K seguidores</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Mail className="h-4 w-4 text-muted-foreground" />
                      <a href="mailto:autor@example.com" className="text-primary hover:underline">
                        autor@example.com
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="md:w-2/3 lg:w-3/4">
              <Tabs defaultValue="novelas" className="w-full">
                <TabsList className="w-full justify-start">
                  <TabsTrigger value="novelas">Novelas</TabsTrigger>
                  <TabsTrigger value="biografia">Biografía</TabsTrigger>
                  <TabsTrigger value="resenas">Reseñas</TabsTrigger>
                </TabsList>
                <TabsContent value="novelas" className="mt-6">
                  <div className="mb-4 flex items-center justify-between">
                    <h2 className="text-xl font-semibold">Novelas publicadas</h2>
                    <Select defaultValue="popular">
                      <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Ordenar por" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="popular">Popularidad</SelectItem>
                        <SelectItem value="newest">Más recientes</SelectItem>
                        <SelectItem value="rating">Mejor valoradas</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {[...Array(6)].map((_, i) => (
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
                              <span>4.{9 - (i % 3)}</span>
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
                    <Button variant="outline">Ver más novelas</Button>
                  </div>
                </TabsContent>
                <TabsContent value="biografia" className="mt-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Sobre el autor</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <p>
                        Autor Famoso comenzó su carrera literaria en 2010, cuando publicó su primera novela web "El
                        Despertar del Héroe" en un pequeño foro de internet. Desde entonces, ha cautivado a millones de
                        lectores con sus historias de fantasía y aventura.
                      </p>
                      <p>
                        Nacido en una pequeña ciudad, siempre fue un ávido lector y soñador. Su pasión por la escritura
                        comenzó a temprana edad, cuando escribía historias cortas para sus amigos y familiares. Estudió
                        Literatura en la universidad, donde perfeccionó su estilo narrativo y aprendió las técnicas que
                        hoy definen su obra.
                      </p>
                      <p>
                        Sus novelas se caracterizan por mundos detalladamente construidos, personajes complejos y tramas
                        que mantienen a los lectores al borde de sus asientos. Ha ganado numerosos premios literarios,
                        incluyendo el prestigioso "Premio a la Mejor Novela Web" en 2018 y 2021.
                      </p>
                      <p>
                        Cuando no está escribiendo, disfruta de largas caminatas por la naturaleza, jugar videojuegos de
                        rol y pasar tiempo con su familia. Considera que estas actividades le ayudan a encontrar
                        inspiración para sus historias.
                      </p>
                      <p>
                        Actualmente está trabajando en varias series nuevas, y promete que sus lectores pueden esperar
                        muchas más aventuras emocionantes en los próximos años.
                      </p>
                    </CardContent>
                  </Card>
                </TabsContent>
                <TabsContent value="resenas" className="mt-6">
                  <div className="space-y-6">
                    {[...Array(3)].map((_, i) => (
                      <Card key={i}>
                        <CardContent className="p-6">
                          <div className="flex items-start justify-between">
                            <div className="flex items-center gap-3">
                              <Avatar>
                                <AvatarImage
                                  src={`/placeholder.svg?height=40&width=40&text=U${i + 1}`}
                                  alt="Usuario"
                                />
                                <AvatarFallback>U{i + 1}</AvatarFallback>
                              </Avatar>
                              <div>
                                <p className="font-medium">
                                  {i === 0 ? "LectorÁvido" : i === 1 ? "FantasíaFan" : "AmanteDeHistorias"}
                                </p>
                                <div className="flex items-center gap-1">
                                  {[...Array(5)].map((_, j) => (
                                    <Star
                                      key={j}
                                      className={`h-4 w-4 ${j < 5 - i ? "fill-yellow-400 text-yellow-400" : "text-muted-foreground"}`}
                                    />
                                  ))}
                                </div>
                              </div>
                            </div>
                            <p className="text-sm text-muted-foreground">
                              {i === 0 ? "Hace 2 días" : i === 1 ? "Hace 1 semana" : "Hace 2 semanas"}
                            </p>
                          </div>
                          <div className="mt-4">
                            <p className="text-sm text-muted-foreground">
                              {i === 0
                                ? "Uno de mis autores favoritos. Sus historias siempre me mantienen enganchado desde la primera página hasta la última. Su forma de desarrollar los personajes es excepcional, y los mundos que crea son tan vívidos que parece que estás allí."
                                : i === 1
                                  ? "Me encanta cómo este autor mezcla elementos de fantasía con temas profundos y reflexivos. Sus novelas no son solo entretenimiento, sino que también te hacen pensar. Siempre espero con ansias sus nuevas publicaciones."
                                  : "Un narrador excepcional. La forma en que construye sus tramas, con giros inesperados y revelaciones sorprendentes, demuestra su maestría en el arte de contar historias. Definitivamente recomiendo todas sus obras."}
                            </p>
                          </div>
                          <div className="mt-4 text-sm">
                            <span className="font-medium">Novela reseñada: </span>
                            <Link href={`/novel/${i + 1}`} className="text-primary hover:underline">
                              {i === 0
                                ? "El Ascenso del Héroe Legendario"
                                : i === 1
                                  ? "Crónicas del Reino Olvidado"
                                  : "El Último Hechicero"}
                            </Link>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                    <div className="flex justify-center">
                      <Button variant="outline">Ver más reseñas</Button>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </div>
      </main>
      <footer className="w-full border-t bg-background py-6">
        <div className="container flex flex-col items-center justify-between gap-4 px-4 md:flex-row md:px-6">
          <div className="flex items-center gap-2">
            <BookOpen className="h-5 w-5" />
            <span className="text-lg font-bold">NovelUzu</span>
          </div>
          <p className="text-center text-sm text-muted-foreground md:text-left">
            &copy; {new Date().getFullYear()} NovelUzu. Todos los derechos reservados.
          </p>
          <div className="flex gap-4">
            <Link href="/terms" className="text-sm text-muted-foreground hover:underline">
              Términos
            </Link>
            <Link href="/privacy" className="text-sm text-muted-foreground hover:underline">
              Privacidad
            </Link>
            <Link href="/contact" className="text-sm text-muted-foreground hover:underline">
              Contacto
            </Link>
          </div>
        </div>
      </footer>
    </div>
  )
}
