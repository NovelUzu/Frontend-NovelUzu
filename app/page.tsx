/**
 * Página principal de NovelUzu
 *
 * Esta página muestra:
 * - Hero section con llamada a la acción
 * - Novelas destacadas organizadas por categorías
 * - Géneros populares para exploración
 */
import Link from "next/link"
import Image from "next/image"
import { ChevronRight, Clock, FlameIcon as Fire, Star } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { SiteFooter } from "@/components/site-footer"
import { SiteHeader } from "@/components/site-header"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

// Función para normalizar las URLs (eliminar tildes y caracteres especiales)
function normalizeUrl(text: string): string {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "") // Eliminar acentos
    .replace(/[^\w\s-]/g, "") // Eliminar caracteres especiales
    .replace(/\s+/g, "-") // Reemplazar espacios con guiones
    .replace(/-+/g, "-") // Eliminar guiones duplicados
}

export default function HomePage() {
  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main className="flex-1">
        {/* Hero Section con gradiente de fondo */}
        <section className="w-full py-8 md:py-16 lg:py-24 gradient-fantasy">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  {/* Tamaño de texto adaptativo para diferentes dispositivos */}
                  <h1 className="text-2xl font-bold tracking-tighter sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl/none text-white">
                    Descubre Mundos a través de Historias
                  </h1>
                  <p className="max-w-[600px] text-sm text-white/90 sm:text-base md:text-lg lg:text-xl">
                    Miles de novelas web para leer. Encuentra tu próxima aventura literaria y sumérgete en nuevos
                    universos.
                  </p>
                </div>
                {/* Botones apilados en móvil, en línea en pantallas más grandes */}
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Button
                    size="lg"
                    className="w-full min-[400px]:w-auto bg-white text-fantasy hover:bg-white/90"
                    asChild
                  >
                    <Link href="/explore">
                      Explorar Novelas
                      <ChevronRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                  <Button
                    size="lg"
                    className="w-full min-[400px]:w-auto bg-white text-fantasy hover:bg-white/90"
                    asChild
                  >
                    <Link href="/popular">
                      Novelas Populares
                      <ChevronRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </div>
              </div>
              {/* Imagen responsiva con tamaños optimizados */}
              <div className="relative aspect-video overflow-hidden rounded-xl sm:w-full lg:order-last bg-black">
                <Image
                  src="/placeholder.png?height=550&width=450"
                  width={550}
                  height={450}
                  alt="Imagen destacada de novela"
                  className="object-cover object-center w-full h-full"
                  priority
                  style={{
                    objectFit: 'cover',
                    width: '100%',
                    height: '100%'
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-r from-fantasy/30 to-transparent"></div>
              </div>
            </div>
          </div>
        </section>

        {/* Sección de Novelas Destacadas */}
        <section className="w-full py-8 md:py-16 lg:py-24">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-2xl font-bold tracking-tighter md:text-3xl lg:text-4xl/tight">
                  Novelas Destacadas
                </h2>
                <p className="max-w-[900px] text-sm text-muted-foreground sm:text-base md:text-lg">
                  Las historias más populares y mejor valoradas por nuestra comunidad.
                </p>
              </div>
            </div>
            {/* Tabs con scroll horizontal en dispositivos móviles */}
            <Tabs defaultValue="trending" className="mt-8">
              <div className="flex items-center justify-between">
                <TabsList className="overflow-x-auto pb-1 w-auto">
                  <TabsTrigger value="trending">Tendencia</TabsTrigger>
                  <TabsTrigger value="new">Nuevas</TabsTrigger>
                  <TabsTrigger value="completed">Completadas</TabsTrigger>
                </TabsList>
                <Button variant="link" size="sm" className="whitespace-nowrap text-primary" asChild>
                  <Link href="/explore">Ver todas</Link>
                </Button>
              </div>
              {/* Contenido de las pestañas - Grid adaptativo para diferentes tamaños de pantalla */}
              <TabsContent value="trending" className="mt-6">
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-6 lg:grid-cols-3 xl:grid-cols-4">
                  {[1, 2, 3, 4].map((i) => (
                    <Card key={i} className="overflow-hidden h-full flex flex-col novel-card">
                      <Link href={`/novel/${i}`} className="overflow-hidden">
                        <div className="relative aspect-[3/4] w-full">
                          <Image
                            src={`/placeholder.jpg?height=240&width=180&text=Novela ${i}`}
                            fill
                            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                            alt={`Novela ${i}`}
                            className="object-cover novel-cover"
                          />
                          <div className="absolute top-2 right-2 flex items-center gap-1 rounded-md bg-black/60 px-2 py-1 text-xs text-white">
                            <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                            <span>4.{7 + i}</span>
                          </div>
                        </div>
                      </Link>
                      <CardHeader className="p-4">
                        <CardTitle className="line-clamp-1 text-base">
                          <Link href={`/novel/${i}`} className="hover:text-primary transition-colors">
                            El Ascenso del Héroe Legendario {i}
                          </Link>
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="p-4 pt-0 flex-grow">
                        <p className="line-clamp-2 text-xs sm:text-sm text-muted-foreground">
                          Un joven ordinario descubre que tiene poderes extraordinarios y debe enfrentarse a fuerzas
                          oscuras para salvar su mundo.
                        </p>
                      </CardContent>
                      <CardFooter className="flex items-center justify-between p-4 pt-0">
                        <div className="flex items-center gap-2 text-xs text-muted-foreground">
                          <Fire className="h-3 w-3 text-action" />
                          <span>10.{2 * i}K</span>
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
              {/* Contenido similar para las otras pestañas... */}
              <TabsContent value="new" className="mt-6">
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-6 lg:grid-cols-3 xl:grid-cols-4">
                  {[5, 6, 7, 8].map((i) => (
                    <Card key={i} className="overflow-hidden h-full flex flex-col novel-card">
                      <Link href={`/novel/${i}`} className="overflow-hidden">
                        <div className="relative aspect-[3/4] w-full">
                          <Image
                            src={`/placeholder.jpg?height=240&width=180&text=Novela ${i}`}
                            fill
                            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                            alt={`Novela ${i}`}
                            className="object-cover novel-cover"
                          />
                          <div className="absolute top-2 right-2 flex items-center gap-1 rounded-md bg-black/60 px-2 py-1 text-xs text-white">
                            <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                            <span>4.{i - 2}</span>
                          </div>
                        </div>
                      </Link>
                      <CardHeader className="p-4">
                        <CardTitle className="line-clamp-1 text-base">
                          <Link href={`/novel/${i}`} className="hover:text-primary transition-colors">
                            Crónicas del Reino Olvidado {i}
                          </Link>
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="p-4 pt-0 flex-grow">
                        <p className="line-clamp-2 text-xs sm:text-sm text-muted-foreground">
                          En un mundo de magia y misterio, una joven princesa debe recuperar su trono usurpado y
                          restaurar la paz en su reino.
                        </p>
                      </CardContent>
                      <CardFooter className="flex items-center justify-between p-4 pt-0">
                        <div className="flex items-center gap-2 text-xs text-muted-foreground">
                          <Fire className="h-3 w-3 text-action" />
                          <span>5.{i}K</span>
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
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-6 lg:grid-cols-3 xl:grid-cols-4">
                  {[9, 10, 11, 12].map((i) => (
                    <Card key={i} className="overflow-hidden h-full flex flex-col novel-card">
                      <Link href={`/novel/${i}`} className="overflow-hidden">
                        <div className="relative aspect-[3/4] w-full">
                          <Image
                            src={`/placeholder.jpg?height=240&width=180&text=Novela ${i}`}
                            fill
                            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                            alt={`Novela ${i}`}
                            className="object-cover novel-cover"
                          />
                          <div className="absolute top-2 right-2 flex items-center gap-1 rounded-md bg-black/60 px-2 py-1 text-xs text-white">
                            <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                            <span>4.{9}</span>
                          </div>
                        </div>
                      </Link>
                      <CardHeader className="p-4">
                        <CardTitle className="line-clamp-1 text-base">
                          <Link href={`/novel/${i}`} className="hover:text-primary transition-colors">
                            El Último Hechicero {i}
                          </Link>
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="p-4 pt-0 flex-grow">
                        <p className="line-clamp-2 text-xs sm:text-sm text-muted-foreground">
                          La historia completa de un poderoso hechicero que debe enfrentarse a su destino y salvar a la
                          humanidad de la extinción.
                        </p>
                      </CardContent>
                      <CardFooter className="flex items-center justify-between p-4 pt-0">
                        <div className="flex items-center gap-2 text-xs text-muted-foreground">
                          <Fire className="h-3 w-3 text-action" />
                          <span>20.{i}K</span>
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

        {/* Sección de Géneros Populares con tarjetas coloridas */}
        <section className="w-full py-8 md:py-16 lg:py-24 bg-muted/40 dark:bg-muted/10">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-2xl font-bold tracking-tighter md:text-3xl lg:text-4xl/tight">Géneros Populares</h2>
                <p className="max-w-[900px] text-sm text-muted-foreground sm:text-base md:text-lg">
                  Explora novelas por categorías y encuentra tu próxima lectura favorita.
                </p>
              </div>
            </div>
            {/* Grid de géneros - Adaptativo desde 2 columnas en móvil hasta 6 en pantallas grandes */}
            <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 md:gap-4">
              {[
                { name: "Fantasía", color: "gradient-fantasy" },
                { name: "Acción", color: "gradient-action" },
                { name: "Romance", color: "gradient-romance" },
                { name: "Aventura", color: "gradient-adventure" },
                { name: "Ciencia Ficción", color: "gradient-scifi" },
                { name: "Drama", color: "gradient-drama" },
                { name: "Misterio", color: "gradient-mystery" },
                { name: "Horror", color: "gradient-horror" },
                { name: "Histórico", color: "gradient-drama" },
                { name: "Comedia", color: "gradient-adventure" },
                { name: "Sobrenatural", color: "gradient-mystery" },
                { name: "Artes Marciales", color: "gradient-action" },
              ].map((genre) => (
                <Link href={`/genre/${normalizeUrl(genre.name)}`} key={genre.name}>
                  <div
                    className={`flex h-20 sm:h-24 items-center justify-center rounded-lg ${genre.color} p-4 text-center shadow-sm transition-all hover:shadow-md hover:-translate-y-1 text-white`}
                  >
                    <span className="font-medium text-sm sm:text-base">{genre.name}</span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  )
}
