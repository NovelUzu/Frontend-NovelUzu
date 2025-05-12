/**
 * Página de detalle de novela
 *
 * Esta página muestra:
 * - Información detallada de una novela específica
 * - Imagen de portada y metadatos
 * - Sinopsis y detalles adicionales
 * - Lista de capítulos
 * - Reseñas de usuarios
 * - Novelas similares recomendadas
 *
 * Se adapta a diferentes tamaños de pantalla reorganizando el contenido
 */
import Link from "next/link"
import Image from "next/image"
import { BookOpen, ChevronRight, Clock, Heart, Share2, Star, Users } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

import { use } from 'react'

export default function NovelDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id: novelId } = use(params)

  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center">
          {/* Logo y nombre del sitio - Versión compacta en móvil */}
          <Link href="/" className="flex items-center gap-2 font-bold text-xl">
            <BookOpen className="h-6 w-6" />
            <span className="hidden sm:inline">WebNovelApp</span>
          </Link>

          {/* Navegación principal - Se oculta en pantallas muy pequeñas */}
          <nav className="ml-auto hidden sm:flex gap-4 sm:gap-6">
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

          {/* Botones de inicio de sesión/registro - Adaptados para móvil */}
          <div className="ml-auto sm:ml-4 flex items-center gap-2">
            <Button variant="outline" size="sm" className="text-xs sm:text-sm px-2 sm:px-3" asChild>
              <Link href="/login">
                <span className="hidden sm:inline">Iniciar </span>Sesión
              </Link>
            </Button>
            <Button size="sm" className="text-xs sm:text-sm px-2 sm:px-3" asChild>
              <Link href="/register">
                <span className="hidden sm:inline">Registrarse</span>
                <span className="sm:hidden">Registro</span>
              </Link>
            </Button>
          </div>
        </div>
      </header>

      <main className="flex-1">
        <div className="container px-4 py-6 md:px-6 md:py-12">
          {/* Contenido principal - Cambia de una columna en móvil a dos columnas en desktop */}
          <div className="flex flex-col gap-6 lg:flex-row lg:gap-12">
            {/* Columna izquierda (portada y botones) - Centrada en móvil, alineada a la izquierda en desktop */}
            <div className="flex flex-col items-center lg:items-start lg:w-1/4">
              {/* Portada de la novela con tamaño adaptativo */}
              <div className="relative mb-4 w-full max-w-[240px]">
                <Image
                  src={`/placeholder.jpeg?height=320&width=240&text=Novela ${novelId}`}
                  width={240}
                  height={320}
                  alt={`El Ascenso del Héroe Legendario ${novelId}`}
                  className="w-full rounded-lg object-cover shadow-md"
                  priority // Carga prioritaria para LCP
                />
                {/* Badge de valoración */}
                <div className="absolute top-2 right-2 flex items-center gap-1 rounded-md bg-black/60 px-2 py-1 text-xs text-white">
                  <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                  <span>4.8</span>
                </div>
              </div>

              {/* Botones de acción - Ancho completo en móvil, adaptado en desktop */}
              <div className="flex w-full max-w-[240px] flex-col gap-3">
                <Button className="w-full">Comenzar a Leer</Button>
                <Button variant="outline" className="w-full gap-2">
                  <Heart className="h-4 w-4" />
                  Añadir a Biblioteca
                </Button>
                <div className="mt-2 flex justify-between">
                  <Button variant="ghost" size="icon" className="h-9 w-9">
                    <Share2 className="h-4 w-4" />
                    <span className="sr-only">Compartir</span>
                  </Button>
                  <div className="flex items-center gap-1 text-sm">
                    <Users className="h-4 w-4 text-muted-foreground" />
                    <span className="text-muted-foreground">10.2K lectores</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Columna derecha (información detallada) */}
            <div className="lg:w-3/4">
              {/* Migas de pan - Ocultas en pantallas muy pequeñas */}
              <div className="mb-6 space-y-2">
                <div className="hidden sm:flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
                  <Link href="/" className="hover:underline">
                    Inicio
                  </Link>
                  <ChevronRight className="h-4 w-4" />
                  <Link href="/explore" className="hover:underline">
                    Explorar
                  </Link>
                  <ChevronRight className="h-4 w-4" />
                  <Link href="/genre/fantasia" className="hover:underline">
                    Fantasía
                  </Link>
                </div>

                {/* Título de la novela - Tamaño adaptativo */}
                <h1 className="text-2xl font-bold tracking-tight md:text-3xl lg:text-4xl">
                  El Ascenso del Héroe Legendario {novelId}
                </h1>

                {/* Metadatos de la novela */}
                <div className="flex flex-wrap items-center gap-3 text-sm">
                  <Link href="/author/1" className="font-medium text-primary hover:underline">
                    Por: Autor Famoso
                  </Link>
                  <div className="flex items-center gap-1">
                    <Clock className="h-4 w-4 text-muted-foreground" />
                    <span className="text-muted-foreground">Actualizado: hace 2 días</span>
                  </div>
                </div>

                {/* Etiquetas de género - Diseño flexible para diferentes tamaños */}
                <div className="flex flex-wrap gap-2">
                  {["Fantasía", "Aventura", "Acción", "Drama"].map((tag) => (
                    <Link
                      key={tag}
                      href={`/genre/${tag.toLowerCase()}`}
                      className="rounded-full bg-muted px-3 py-1 text-xs hover:bg-muted/80"
                    >
                      {tag}
                    </Link>
                  ))}
                </div>
              </div>

              {/* Tabs de contenido - Con scroll horizontal en móvil */}
              <Tabs defaultValue="sinopsis" className="w-full">
                <TabsList className="w-full justify-start overflow-x-auto">
                  <TabsTrigger value="sinopsis">Sinopsis</TabsTrigger>
                  <TabsTrigger value="capitulos">Capítulos</TabsTrigger>
                  <TabsTrigger value="resenas">Reseñas</TabsTrigger>
                </TabsList>

                {/* Contenido de la pestaña Sinopsis */}
                <TabsContent value="sinopsis" className="mt-6 space-y-6">
                  {/* Sinopsis de la novela */}
                  <div className="space-y-4">
                    <h2 className="text-xl font-semibold">Sinopsis</h2>
                    <p className="text-sm md:text-base text-muted-foreground">
                      En un mundo donde la magia y la tecnología coexisten, un joven llamado Aron descubre que es el
                      descendiente de una antigua línea de héroes legendarios. Tras la repentina invasión de criaturas
                      oscuras a su pacífico pueblo, Aron se ve obligado a emprender un viaje para despertar sus poderes
                      dormidos y enfrentarse a las fuerzas que amenazan con sumir el mundo en la oscuridad.
                    </p>
                    <p className="text-sm md:text-base text-muted-foreground">
                      Acompañado por un grupo diverso de aliados, cada uno con sus propias habilidades y secretos, Aron
                      deberá aprender a dominar sus nuevos poderes mientras navega por las complejas políticas de los
                      reinos y descubre una conspiración que se ha estado gestando durante siglos.
                    </p>
                    <p className="text-sm md:text-base text-muted-foreground">
                      ¿Podrá Aron convertirse en el héroe que el mundo necesita? ¿O sucumbirá ante el peso de su destino
                      y las tentaciones del poder oscuro que acecha en las sombras?
                    </p>
                  </div>

                  {/* Información adicional - Grid adaptativo */}
                  <div className="space-y-4">
                    <h2 className="text-xl font-semibold">Información Adicional</h2>
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
                      <div className="space-y-1">
                        <p className="text-sm font-medium">Estado</p>
                        <p className="text-sm text-muted-foreground">En progreso</p>
                      </div>
                      <div className="space-y-1">
                        <p className="text-sm font-medium">Capítulos</p>
                        <p className="text-sm text-muted-foreground">120 (2 por semana)</p>
                      </div>
                      <div className="space-y-1">
                        <p className="text-sm font-medium">Idioma Original</p>
                        <p className="text-sm text-muted-foreground">Español</p>
                      </div>
                      <div className="space-y-1">
                        <p className="text-sm font-medium">Año de Inicio</p>
                        <p className="text-sm text-muted-foreground">2023</p>
                      </div>
                      <div className="space-y-1">
                        <p className="text-sm font-medium">Lecturas</p>
                        <p className="text-sm text-muted-foreground">1.2M</p>
                      </div>
                      <div className="space-y-1">
                        <p className="text-sm font-medium">Favoritos</p>
                        <p className="text-sm text-muted-foreground">45.6K</p>
                      </div>
                    </div>
                  </div>
                </TabsContent>

                {/* Contenido de la pestaña Capítulos */}
                <TabsContent value="capitulos" className="mt-6">
                  {/* Encabezado con opciones de filtrado */}
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 sm:gap-0">
                    <h2 className="text-xl font-semibold">Capítulos</h2>
                    <div className="flex items-center gap-2">
                      <Button variant="outline" size="sm">
                        Más recientes
                      </Button>
                      <Button variant="ghost" size="sm" className="hidden sm:inline-flex">
                        Más antiguos
                      </Button>
                    </div>
                  </div>

                  {/* Lista de capítulos */}
                  <div className="mt-4 space-y-4">
                    {[...Array(10)].map((_, i) => (
                      <div key={i} className="group rounded-lg border p-4 transition-colors hover:bg-muted/50">
                        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 sm:gap-0">
                          <div className="space-y-1">
                            <Link
                              href={`/novel/${novelId}/chapter/${120 - i}`}
                              className="font-medium group-hover:text-primary group-hover:underline"
                            >
                              Capítulo {120 - i}:{" "}
                              {i === 0
                                ? "El Despertar Final"
                                : `La Prueba del ${i === 1 ? "Valor" : i === 2 ? "Coraje" : i === 3 ? "Espíritu" : "Destino"} (${i + 1})`}
                            </Link>
                            <p className="text-sm text-muted-foreground">
                              Publicado:{" "}
                              {i === 0
                                ? "Hoy"
                                : i === 1
                                  ? "Hace 3 días"
                                  : i === 2
                                    ? "Hace 1 semana"
                                    : `Hace ${i + 1} semanas`}
                            </p>
                          </div>
                          <Button variant="ghost" size="sm" asChild>
                            <Link href={`/novel/${novelId}/chapter/${120 - i}`}>Leer</Link>
                          </Button>
                        </div>
                        {/* Barra de progreso - Solo para el primer capítulo */}
                        {i === 0 && (
                          <div className="mt-2">
                            <div className="flex items-center gap-2 text-xs">
                              <span className="text-muted-foreground">Progreso de lectura:</span>
                              <Progress value={0} className="h-2 w-24" />
                              <span className="text-muted-foreground">0%</span>
                            </div>
                          </div>
                        )}
                      </div>
                    ))}
                    <div className="flex justify-center pt-4">
                      <Button variant="outline">Cargar más capítulos</Button>
                    </div>
                  </div>
                </TabsContent>

                {/* Contenido de la pestaña Reseñas */}
                <TabsContent value="resenas" className="mt-6">
                  {/* Encabezado con botón de escribir reseña */}
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 sm:gap-0 mb-6">
                    <h2 className="text-xl font-semibold">Reseñas</h2>
                    <Button>Escribir Reseña</Button>
                  </div>

                  {/* Lista de reseñas */}
                  <div className="grid gap-6">
                    {/* Reseña individual */}
                    <div className="rounded-lg border p-4">
                      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 sm:gap-0">
                        <div className="flex items-center gap-3">
                          <div className="relative h-10 w-10 overflow-hidden rounded-full flex-shrink-0">
                            <Image
                              src="/placeholder.jpeg?height=40&width=40&text=U"
                              fill
                              alt="Avatar de usuario"
                              className="object-cover"
                            />
                          </div>
                          <div>
                            <p className="font-medium">LectorÁvido</p>
                            <div className="flex items-center gap-1">
                              {[...Array(5)].map((_, i) => (
                                <Star
                                  key={i}
                                  className={`h-4 w-4 ${i < 5 ? "fill-yellow-400 text-yellow-400" : "text-muted-foreground"}`}
                                />
                              ))}
                            </div>
                          </div>
                        </div>
                        <p className="text-sm text-muted-foreground">Hace 2 días</p>
                      </div>
                      <p className="mt-3 text-sm md:text-base text-muted-foreground">
                        Una de las mejores novelas que he leído últimamente. La trama es fascinante y los personajes
                        están muy bien desarrollados. Cada capítulo te deja con ganas de más. Altamente recomendada para
                        los amantes de la fantasía.
                      </p>
                    </div>

                    {/* Segunda reseña */}
                    <div className="rounded-lg border p-4">
                      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 sm:gap-0">
                        <div className="flex items-center gap-3">
                          <div className="relative h-10 w-10 overflow-hidden rounded-full flex-shrink-0">
                            <Image
                              src="/placeholder.jpeg?height=40&width=40&text=F"
                              fill
                              alt="Avatar de usuario"
                              className="object-cover"
                            />
                          </div>
                          <div>
                            <p className="font-medium">FantasíaFan</p>
                            <div className="flex items-center gap-1">
                              {[...Array(5)].map((_, i) => (
                                <Star
                                  key={i}
                                  className={`h-4 w-4 ${i < 4 ? "fill-yellow-400 text-yellow-400" : "text-muted-foreground"}`}
                                />
                              ))}
                            </div>
                          </div>
                        </div>
                        <p className="text-sm text-muted-foreground">Hace 1 semana</p>
                      </div>
                      <p className="mt-3 text-sm md:text-base text-muted-foreground">
                        El autor tiene un estilo de escritura muy fluido y envolvente. La construcción del mundo es
                        detallada y los giros de la trama son impredecibles. Mi único problema es que a veces los
                        capítulos son demasiado cortos. Aun así, es una lectura obligada.
                      </p>
                    </div>

                    {/* Botón para ver más reseñas */}
                    <div className="flex justify-center pt-4">
                      <Button variant="outline">Ver más reseñas</Button>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          </div>

          {/* Separador */}
          <Separator className="my-8 md:my-12" />

          {/* Sección de novelas similares */}
          <section>
            <h2 className="mb-6 text-xl md:text-2xl font-bold">Novelas Similares</h2>
            {/* Grid adaptativo para diferentes tamaños de pantalla */}
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
              {[1, 2, 3, 4, 5].map((i) => (
                <Card key={i} className="overflow-hidden h-full">
                  <Link href={`/novel/${i + 20}`}>
                    <div className="relative aspect-[3/4] w-full">
                      <Image
                        src={`/placeholder.jpeg?height=240&width=180&text=Similar ${i}`}
                        fill
                        sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
                        alt={`Novela Similar ${i}`}
                        className="object-cover transition-all hover:scale-105"
                      />
                      <div className="absolute top-2 right-2 flex items-center gap-1 rounded-md bg-black/60 px-2 py-1 text-xs text-white">
                        <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                        <span>4.{6 + (i % 3)}</span>
                      </div>
                    </div>
                  </Link>
                  <CardHeader className="p-3">
                    <CardTitle className="line-clamp-1 text-sm">
                      <Link href={`/novel/${i + 20}`}>La Leyenda del Guerrero Místico {i}</Link>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-3 pt-0">
                    <p className="line-clamp-1 text-xs text-muted-foreground">Fantasía, Aventura</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>
        </div>
      </main>

      {/* Pie de página */}
      <footer className="w-full border-t bg-background py-6">
        <div className="container flex flex-col items-center justify-between gap-4 px-4 md:flex-row md:px-6">
          <div className="flex items-center gap-2">
            <BookOpen className="h-5 w-5" />
            <span className="text-lg font-bold">WebNovelApp</span>
          </div>
          <p className="text-center text-xs sm:text-sm text-muted-foreground md:text-left">
            &copy; {new Date().getFullYear()} WebNovelApp. Todos los derechos reservados.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/terms" className="text-xs sm:text-sm text-muted-foreground hover:underline">
              Términos
            </Link>
            <Link href="/privacy" className="text-xs sm:text-sm text-muted-foreground hover:underline">
              Privacidad
            </Link>
            <Link href="/contact" className="text-xs sm:text-sm text-muted-foreground hover:underline">
              Contacto
            </Link>
          </div>
        </div>
      </footer>
    </div>
  )
}
