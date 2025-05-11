import Link from "next/link"
import Image from "next/image"
import { BookOpen, ChevronRight, Clock, FlameIcon as Fire, Star } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function HomePage() {
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
        <section className="w-full py-12 md:py-24 lg:py-32 bg-muted/40">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                    Descubre Mundos a través de Historias
                  </h1>
                  <p className="max-w-[600px] text-muted-foreground md:text-xl">
                    Miles de novelas web para leer. Encuentra tu próxima aventura literaria y sumérgete en nuevos
                    universos.
                  </p>
                </div>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Button size="lg" asChild>
                    <Link href="/explore">
                      Explorar Novelas
                      <ChevronRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                  <Button size="lg" variant="outline" asChild>
                    <Link href="/popular">Novelas Populares</Link>
                  </Button>
                </div>
              </div>
              <Image
                src="/placeholder.svg?height=550&width=450"
                width={550}
                height={450}
                alt="Imagen destacada de novela"
                className="mx-auto aspect-video overflow-hidden rounded-xl object-cover object-center sm:w-full lg:order-last"
              />
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">Novelas Destacadas</h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl">
                  Las historias más populares y mejor valoradas por nuestra comunidad.
                </p>
              </div>
            </div>
            <Tabs defaultValue="trending" className="mt-8">
              <div className="flex items-center justify-between">
                <TabsList>
                  <TabsTrigger value="trending">Tendencia</TabsTrigger>
                  <TabsTrigger value="new">Nuevas</TabsTrigger>
                  <TabsTrigger value="completed">Completadas</TabsTrigger>
                </TabsList>
                <Button variant="link" size="sm" asChild>
                  <Link href="/explore">Ver todas</Link>
                </Button>
              </div>
              <TabsContent value="trending" className="mt-6">
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                  {[1, 2, 3, 4].map((i) => (
                    <Card key={i} className="overflow-hidden">
                      <Link href={`/novel/${i}`}>
                        <div className="relative">
                          <Image
                            src={`/placeholder.svg?height=240&width=180&text=Novela ${i}`}
                            width={180}
                            height={240}
                            alt={`Novela ${i}`}
                            className="w-full object-cover transition-all hover:scale-105"
                          />
                          <div className="absolute top-2 right-2 flex items-center gap-1 rounded-md bg-black/60 px-2 py-1 text-xs text-white">
                            <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                            <span>4.{7 + i}</span>
                          </div>
                        </div>
                      </Link>
                      <CardHeader className="p-4">
                        <CardTitle className="line-clamp-1 text-base">
                          <Link href={`/novel/${i}`}>El Ascenso del Héroe Legendario {i}</Link>
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="p-4 pt-0">
                        <p className="line-clamp-2 text-xs text-muted-foreground">
                          Un joven ordinario descubre que tiene poderes extraordinarios y debe enfrentarse a fuerzas
                          oscuras para salvar su mundo.
                        </p>
                      </CardContent>
                      <CardFooter className="flex items-center justify-between p-4 pt-0">
                        <div className="flex items-center gap-2 text-xs text-muted-foreground">
                          <Fire className="h-3 w-3 text-red-500" />
                          <span>10.{2 * i}K lectores</span>
                        </div>
                        <div className="flex items-center gap-2 text-xs text-muted-foreground">
                          <Clock className="h-3 w-3" />
                          <span>Cap. {50 + i * 10}</span>
                        </div>
                      </CardFooter>
                    </Card>
                  ))}
                </div>
              </TabsContent>
              <TabsContent value="new" className="mt-6">
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                  {[5, 6, 7, 8].map((i) => (
                    <Card key={i} className="overflow-hidden">
                      <Link href={`/novel/${i}`}>
                        <div className="relative">
                          <Image
                            src={`/placeholder.svg?height=240&width=180&text=Novela ${i}`}
                            width={180}
                            height={240}
                            alt={`Novela ${i}`}
                            className="w-full object-cover transition-all hover:scale-105"
                          />
                          <div className="absolute top-2 right-2 flex items-center gap-1 rounded-md bg-black/60 px-2 py-1 text-xs text-white">
                            <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                            <span>4.{i - 2}</span>
                          </div>
                        </div>
                      </Link>
                      <CardHeader className="p-4">
                        <CardTitle className="line-clamp-1 text-base">
                          <Link href={`/novel/${i}`}>Crónicas del Reino Olvidado {i}</Link>
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="p-4 pt-0">
                        <p className="line-clamp-2 text-xs text-muted-foreground">
                          En un mundo de magia y misterio, una joven princesa debe recuperar su trono usurpado y
                          restaurar la paz en su reino.
                        </p>
                      </CardContent>
                      <CardFooter className="flex items-center justify-between p-4 pt-0">
                        <div className="flex items-center gap-2 text-xs text-muted-foreground">
                          <Fire className="h-3 w-3 text-red-500" />
                          <span>5.{i}K lectores</span>
                        </div>
                        <div className="flex items-center gap-2 text-xs text-muted-foreground">
                          <Clock className="h-3 w-3" />
                          <span>Cap. {i * 5}</span>
                        </div>
                      </CardFooter>
                    </Card>
                  ))}
                </div>
              </TabsContent>
              <TabsContent value="completed" className="mt-6">
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                  {[9, 10, 11, 12].map((i) => (
                    <Card key={i} className="overflow-hidden">
                      <Link href={`/novel/${i}`}>
                        <div className="relative">
                          <Image
                            src={`/placeholder.svg?height=240&width=180&text=Novela ${i}`}
                            width={180}
                            height={240}
                            alt={`Novela ${i}`}
                            className="w-full object-cover transition-all hover:scale-105"
                          />
                          <div className="absolute top-2 right-2 flex items-center gap-1 rounded-md bg-black/60 px-2 py-1 text-xs text-white">
                            <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                            <span>4.{9}</span>
                          </div>
                        </div>
                      </Link>
                      <CardHeader className="p-4">
                        <CardTitle className="line-clamp-1 text-base">
                          <Link href={`/novel/${i}`}>El Último Hechicero {i}</Link>
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="p-4 pt-0">
                        <p className="line-clamp-2 text-xs text-muted-foreground">
                          La historia completa de un poderoso hechicero que debe enfrentarse a su destino y salvar a la
                          humanidad de la extinción.
                        </p>
                      </CardContent>
                      <CardFooter className="flex items-center justify-between p-4 pt-0">
                        <div className="flex items-center gap-2 text-xs text-muted-foreground">
                          <Fire className="h-3 w-3 text-red-500" />
                          <span>20.{i}K lectores</span>
                        </div>
                        <div className="flex items-center gap-2 text-xs text-muted-foreground">
                          <Clock className="h-3 w-3" />
                          <span>Completa</span>
                        </div>
                      </CardFooter>
                    </Card>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32 bg-muted/40">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">Géneros Populares</h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl">
                  Explora novelas por categorías y encuentra tu próxima lectura favorita.
                </p>
              </div>
            </div>
            <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
              {[
                "Fantasía",
                "Acción",
                "Romance",
                "Aventura",
                "Ciencia Ficción",
                "Drama",
                "Misterio",
                "Horror",
                "Histórico",
                "Comedia",
                "Sobrenatural",
                "Artes Marciales",
              ].map((genre) => (
                <Link href={`/genre/${genre.toLowerCase()}`} key={genre}>
                  <div className="flex h-24 items-center justify-center rounded-lg bg-card p-4 text-center shadow-sm transition-all hover:bg-primary hover:text-primary-foreground">
                    <span className="font-medium">{genre}</span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
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
