"use client"

import { useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { BookOpen, Clock, Heart, Settings, Star, PenTool, BookPlus, FileText } from "lucide-react"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { useAuth } from "@/lib/auth-context"

export default function UserProfilePage() {
  const router = useRouter()
  const { user, isAuthenticated, isLoading } = useAuth()

  // Redirigir a login si no está autenticado
  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push("/login")
    }
  }, [isLoading, isAuthenticated, router])

  // Mostrar pantalla de carga mientras se verifica la autenticación
  if (isLoading || !isAuthenticated) {
    return (
      <div className="flex min-h-screen flex-col">
        <SiteHeader />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
            <p className="mt-4 text-muted-foreground">Cargando perfil...</p>
          </div>
        </main>
        <SiteFooter />
      </div>
    )
  }

  // Verificar si el usuario es admin
  const isAdmin = user?.role === "admin"

  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main className="flex-1">
        <div className="container px-4 py-6 md:px-6 md:py-12">
          {/* Sección de perfil - Reorganizada para móvil y desktop */}
          <div className="mb-8 flex flex-col items-center gap-4 sm:flex-row sm:items-start sm:gap-8">
            {/* Avatar del usuario */}
            <Avatar className="h-20 w-20 sm:h-24 sm:w-24 border-4 border-background">
              <AvatarImage src={user?.avatar || "/placeholder.svg"} alt={user?.username} />
              <AvatarFallback>{user?.username?.charAt(0).toUpperCase() || "U"}</AvatarFallback>
            </Avatar>

            {/* Información del perfil */}
            <div className="flex flex-1 flex-col items-center gap-2 text-center sm:items-start sm:text-left">
              <div className="flex items-center gap-2">
                <h1 className="text-2xl sm:text-3xl font-bold">{user?.username}</h1>
                {isAdmin && (
                  <span className="bg-red-100 text-red-800 text-xs font-medium px-2.5 py-0.5 rounded dark:bg-red-900 dark:text-red-300">
                    Administrador
                  </span>
                )}
                {!isAdmin && (
                  <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded dark:bg-blue-900 dark:text-blue-300">
                    Usuario
                  </span>
                )}
              </div>
              <p className="text-sm text-muted-foreground">Miembro desde Mayo 2023</p>

              {/* Estadísticas del usuario - Diseño flexible */}
              <div className="flex flex-wrap items-center justify-center sm:justify-start gap-3 sm:gap-4">
                <div className="flex items-center gap-1">
                  <BookOpen className="h-4 w-4 text-muted-foreground" />
                  <span className="text-xs sm:text-sm text-muted-foreground">120 novelas leídas</span>
                </div>
                <div className="flex items-center gap-1">
                  <Star className="h-4 w-4 text-muted-foreground" />
                  <span className="text-xs sm:text-sm text-muted-foreground">45 reseñas</span>
                </div>
                <div className="flex items-center gap-1">
                  <Heart className="h-4 w-4 text-muted-foreground" />
                  <span className="text-xs sm:text-sm text-muted-foreground">78 favoritos</span>
                </div>
                {!isAdmin && (
                  <div className="flex items-center gap-1">
                    <PenTool className="h-4 w-4 text-muted-foreground" />
                    <span className="text-xs sm:text-sm text-muted-foreground">5 novelas publicadas</span>
                  </div>
                )}
              </div>
            </div>

            {/* Botones de acción */}
            <div className="flex flex-col gap-2">
              <Button variant="outline" size="sm" className="gap-2 bg-transparent" asChild>
                <Link href="/user/profile/edit-profile">
                  <Settings className="h-4 w-4" />
                  Editar Perfil
                </Link>
              </Button>

              {!isAdmin && (
                <>
                  <Button variant="default" size="sm" className="gap-2" asChild>
                    <Link href="/author/write">
                      <PenTool className="h-4 w-4" />
                      Escribir
                    </Link>
                  </Button>
                  <Button variant="outline" size="sm" className="gap-2 bg-transparent" asChild>
                    <Link href="/author/novels">
                      <BookPlus className="h-4 w-4" />
                      Mis Novelas
                    </Link>
                  </Button>
                </>
              )}

              {isAdmin && (
                <Button variant="default" size="sm" className="gap-2" asChild>
                  <Link href="/admin">
                    <Settings className="h-4 w-4" />
                    Panel Admin
                  </Link>
                </Button>
              )}
            </div>
          </div>

          {/* Panel de escritor - Visible para todos los usuarios (excepto admin) */}
          {!isAdmin && (
            <Card className="mb-8">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <PenTool className="h-5 w-5" />
                  Panel de Escritor
                </CardTitle>
                <p className="text-sm text-muted-foreground">
                  Crea y gestiona tus propias novelas. ¡Comparte tus historias con el mundo!
                </p>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Button
                    variant="outline"
                    className="h-auto py-4 flex flex-col items-center justify-center gap-2 bg-transparent"
                    asChild
                  >
                    <Link href="/author/write">
                      <FileText className="h-6 w-6" />
                      <span>Escribir Capítulo</span>
                    </Link>
                  </Button>
                  <Button
                    variant="outline"
                    className="h-auto py-4 flex flex-col items-center justify-center gap-2 bg-transparent"
                    asChild
                  >
                    <Link href="/author/novels/new">
                      <BookPlus className="h-6 w-6" />
                      <span>Crear Nueva Novela</span>
                    </Link>
                  </Button>
                  <Button
                    variant="outline"
                    className="h-auto py-4 flex flex-col items-center justify-center gap-2 bg-transparent"
                    asChild
                  >
                    <Link href="/author/dashboard">
                      <BookOpen className="h-6 w-6" />
                      <span>Dashboard de Autor</span>
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Tabs de contenido - Con scroll horizontal en móviles */}
          <Tabs defaultValue="biblioteca" className="w-full">
            <TabsList className="w-full justify-start overflow-x-auto pb-1">
              <TabsTrigger value="biblioteca">Biblioteca</TabsTrigger>
              <TabsTrigger value="historial">Historial</TabsTrigger>
              <TabsTrigger value="resenas">Reseñas</TabsTrigger>
              <TabsTrigger value="favoritos">Favoritos</TabsTrigger>
              {!isAdmin && <TabsTrigger value="misnovelas">Mis Novelas</TabsTrigger>}
            </TabsList>

            {/* Contenido de la pestaña Biblioteca */}
            <TabsContent value="biblioteca" className="mt-6">
              {/* Encabezado con opciones de filtrado */}
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 sm:gap-0 mb-6">
                <h2 className="text-xl font-semibold">Mi Biblioteca</h2>
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm">
                    Más recientes
                  </Button>
                  <Button variant="ghost" size="sm" className="hidden sm:inline-flex">
                    Título
                  </Button>
                </div>
              </div>

              {/* Grid de novelas - Adaptativo para diferentes tamaños de pantalla */}
              <div className="grid grid-cols-2 gap-4 sm:grid-cols-2 md:gap-6 lg:grid-cols-3 xl:grid-cols-4">
                {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
                  <Card key={i} className="overflow-hidden h-full flex flex-col">
                    <div className="relative">
                      <Link href={`/novel/${i}`}>
                        <div className="relative aspect-[3/4] w-full">
                          <Image
                            src={`/ceholder-svg-height-240-width-180-text-novela-.jpg?height=240&width=180&text=Novela ${i}`}
                            fill
                            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                            alt={`Novela ${i}`}
                            className="object-cover transition-all hover:scale-105"
                          />
                        </div>
                      </Link>
                      {/* Badge de valoración */}
                      <div className="absolute top-2 right-2 flex items-center gap-1 rounded-md bg-black/60 px-2 py-1 text-xs text-white">
                        <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                        <span>4.{7 + (i % 3)}</span>
                      </div>

                      {/* Barra de progreso - Solo para algunos elementos */}
                      {i % 3 === 0 && (
                        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-3">
                          <div className="flex items-center justify-between text-white">
                            <div className="text-xs">Progreso</div>
                            <div className="text-xs">75%</div>
                          </div>
                          <Progress value={75} className="h-1 w-full" />
                        </div>
                      )}
                    </div>
                    <CardHeader className="p-3 sm:p-4">
                      <CardTitle className="line-clamp-1 text-sm sm:text-base">
                        <Link href={`/novel/${i}`}>
                          {i % 2 === 0 ? "El Ascenso del Héroe Legendario" : "Crónicas del Reino Olvidado"} {i}
                        </Link>
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="flex items-center justify-between p-3 sm:p-4 pt-0 mt-auto">
                      <div className="text-xs text-muted-foreground">
                        {i % 3 === 0 ? "Leyendo" : i % 3 === 1 ? "Completado" : "Por leer"}
                      </div>
                      <div className="flex items-center gap-1 text-xs text-muted-foreground">
                        <Clock className="h-3 w-3" />
                        <span>Cap. {i * 10}</span>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* Botón para cargar más */}
              <div className="mt-8 flex justify-center">
                <Button variant="outline">Cargar más</Button>
              </div>
            </TabsContent>

            {/* Contenido de la pestaña Historial */}
            <TabsContent value="historial" className="mt-6">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 sm:gap-0 mb-6">
                <h2 className="text-xl font-semibold">Historial de Lectura</h2>
                <Button variant="outline" size="sm">
                  Limpiar historial
                </Button>
              </div>

              {/* Lista de historial - Diseño adaptativo */}
              <div className="mt-6 space-y-4">
                {[1, 2, 3, 4, 5].map((i) => (
                  <div key={i} className="flex flex-col sm:flex-row items-start gap-4 rounded-lg border p-4">
                    {/* Imagen de portada */}
                    <div className="relative w-full sm:w-auto mx-auto sm:mx-0 max-w-[120px] aspect-[3/4]">
                      <Image
                        src={`/ceholder-svg-height-120-width-90-text-novela-.jpg?height=120&width=90&text=Novela ${i}`}
                        fill
                        sizes="(max-width: 640px) 120px, 90px"
                        alt={`Novela ${i}`}
                        className="rounded object-cover"
                      />
                    </div>

                    {/* Información del libro */}
                    <div className="flex-1 space-y-2 w-full">
                      <div>
                        <Link href={`/novel/${i}`} className="text-base sm:text-lg font-medium hover:underline">
                          {i % 2 === 0 ? "El Ascenso del Héroe Legendario" : "Crónicas del Reino Olvidado"} {i}
                        </Link>
                        <p className="text-sm text-muted-foreground">
                          Último capítulo leído: Capítulo {i * 10}:{" "}
                          {i % 2 === 0 ? "El Despertar Final" : "La Prueba del Destino"}
                        </p>
                      </div>

                      {/* Información adicional y botón */}
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                        <div className="flex items-center gap-1 text-xs text-muted-foreground">
                          <Clock className="h-3 w-3" />
                          <span>Leído: {i === 1 ? "Hoy" : i === 2 ? "Ayer" : `Hace ${i} días`}</span>
                        </div>
                        <Button variant="ghost" size="sm" asChild>
                          <Link href={`/novel/${i}/chapter/${i * 10}`}>Continuar leyendo</Link>
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Botón para ver más */}
              <div className="mt-8 flex justify-center">
                <Button variant="outline">Ver más historial</Button>
              </div>
            </TabsContent>

            {/* Contenido de la pestaña Reseñas */}
            <TabsContent value="resenas" className="mt-6">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 sm:gap-0 mb-6">
                <h2 className="text-xl font-semibold">Mis Reseñas</h2>
                <Button variant="outline" size="sm">
                  Más recientes
                </Button>
              </div>

              {/* Lista de reseñas */}
              <div className="mt-6 space-y-6">
                {[1, 2, 3].map((i) => (
                  <Card key={i}>
                    <CardContent className="p-4 sm:p-6">
                      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 sm:gap-0">
                        <div className="flex items-center gap-3">
                          <div className="relative h-10 w-10 overflow-hidden rounded flex-shrink-0">
                            <Image
                              src={`/ceholder-svg-height-60-width-45-text-novela-.jpg?height=60&width=45&text=Novela ${i}`}
                              fill
                              sizes="40px"
                              alt={`Novela ${i}`}
                              className="rounded object-cover"
                            />
                          </div>
                          <div>
                            <Link href={`/novel/${i}`} className="font-medium hover:underline">
                              {i % 2 === 0 ? "El Ascenso del Héroe Legendario" : "Crónicas del Reino Olvidado"} {i}
                            </Link>
                            <div className="flex items-center gap-1">
                              {[...Array(5)].map((_, j) => (
                                <Star
                                  key={j}
                                  className={`h-4 w-4 ${j < 5 - (i % 2) ? "fill-yellow-400 text-yellow-400" : "text-muted-foreground"}`}
                                />
                              ))}
                            </div>
                          </div>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          {i === 1 ? "Hace 2 días" : i === 2 ? "Hace 1 semana" : "Hace 2 semanas"}
                        </p>
                      </div>

                      {/* Contenido de la reseña */}
                      <p className="mt-3 text-sm text-muted-foreground">
                        {i === 1
                          ? "Una de las mejores novelas que he leído últimamente. La trama es fascinante y los personajes están muy bien desarrollados. Cada capítulo te deja con ganas de más."
                          : i === 2
                            ? "El autor tiene un estilo de escritura muy fluido y envolvente. La construcción del mundo es detallada y los giros de la trama son impredecibles."
                            : "Una historia interesante pero con algunos problemas de ritmo. Los personajes secundarios necesitan más desarrollo."}
                      </p>

                      {/* Botones de acción */}
                      <div className="mt-3 flex justify-end gap-2">
                        <Button variant="ghost" size="sm">
                          Editar
                        </Button>
                        <Button variant="ghost" size="sm">
                          Eliminar
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* Botón para ver más */}
              <div className="mt-8 flex justify-center">
                <Button variant="outline">Ver más reseñas</Button>
              </div>
            </TabsContent>

            {/* Contenido de la pestaña Favoritos */}
            <TabsContent value="favoritos" className="mt-6">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 sm:gap-0 mb-6">
                <h2 className="text-xl font-semibold">Mis Favoritos</h2>
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm">
                    Más recientes
                  </Button>
                  <Button variant="ghost" size="sm" className="hidden sm:inline-flex">
                    Título
                  </Button>
                </div>
              </div>

              {/* Grid de favoritos - Adaptativo para diferentes tamaños de pantalla */}
              <div className="grid grid-cols-2 gap-4 sm:grid-cols-2 md:gap-6 lg:grid-cols-3 xl:grid-cols-4">
                {[1, 2, 3, 4, 5, 6].map((i) => (
                  <Card key={i} className="overflow-hidden h-full flex flex-col">
                    <div className="relative">
                      <Link href={`/novel/${i}`}>
                        <div className="relative aspect-[3/4] w-full">
                          <Image
                            src={`/ceholder-svg-height-240-width-180-text-favorito-.jpg?height=240&width=180&text=Favorito ${i}`}
                            fill
                            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                            alt={`Novela Favorita ${i}`}
                            className="object-cover transition-all hover:scale-105"
                          />
                        </div>
                      </Link>
                      {/* Badge de valoración */}
                      <div className="absolute top-2 right-2 flex items-center gap-1 rounded-md bg-black/60 px-2 py-1 text-xs text-white">
                        <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                        <span>4.{9 - (i % 2)}</span>
                      </div>
                      {/* Botón de favorito */}
                      <Button
                        variant="ghost"
                        size="icon"
                        className="absolute bottom-2 right-2 h-8 w-8 rounded-full bg-black/60 text-white hover:bg-black/80"
                      >
                        <Heart className="h-4 w-4 fill-red-500 text-red-500" />
                        <span className="sr-only">Quitar de favoritos</span>
                      </Button>
                    </div>
                    <CardHeader className="p-3 sm:p-4">
                      <CardTitle className="line-clamp-1 text-sm sm:text-base">
                        <Link href={`/novel/${i}`}>
                          {i % 3 === 0
                            ? "El Último Hechicero"
                            : i % 3 === 1
                              ? "La Leyenda del Guerrero Místico"
                              : "Reinos en Guerra"}{" "}
                          {i}
                        </Link>
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="p-3 sm:p-4 pt-0 flex-grow">
                      <p className="line-clamp-2 text-xs text-muted-foreground">
                        {i % 3 === 0
                          ? "La historia de un poderoso hechicero que debe enfrentarse a su destino y salvar a la humanidad."
                          : i % 3 === 1
                            ? "Un guerrero con poderes místicos emprende un viaje para vengar a su clan y restaurar el equilibrio."
                            : "En un mundo dividido por la guerra, una joven princesa debe unir a los reinos enfrentados."}
                      </p>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* Botón para cargar más */}
              <div className="mt-8 flex justify-center">
                <Button variant="outline">Cargar más</Button>
              </div>
            </TabsContent>

            {/* Contenido de la pestaña Mis Novelas - Solo para usuarios normales */}
            {!isAdmin && (
              <TabsContent value="misnovelas" className="mt-6">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 sm:gap-0 mb-6">
                  <h2 className="text-xl font-semibold">Mis Novelas Publicadas</h2>
                  <Button variant="default" size="sm" className="gap-2" asChild>
                    <Link href="/author/novels/new">
                      <BookPlus className="h-4 w-4" />
                      Nueva Novela
                    </Link>
                  </Button>
                </div>

                {/* Lista de novelas del autor */}
                <div className="space-y-4">
                  {[1, 2, 3].map((i) => (
                    <Card key={i} className="overflow-hidden">
                      <div className="flex flex-col sm:flex-row">
                        <div className="relative w-full sm:w-[150px] aspect-[3/4] sm:aspect-auto">
                          <Image
                            src={`/ceholder-svg-height-200-width-150-text-novela-.jpg?height=200&width=150&text=Novela ${i}`}
                            fill
                            sizes="(max-width: 640px) 100vw, 150px"
                            alt={`Mi Novela ${i}`}
                            className="object-cover"
                          />
                        </div>
                        <div className="flex-1 p-4">
                          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                            <h3 className="text-lg font-semibold">
                              {i === 1
                                ? "El Ascenso del Héroe Legendario"
                                : i === 2
                                  ? "Crónicas del Reino Olvidado"
                                  : "La Última Frontera"}
                            </h3>
                            <div className="flex items-center gap-1 text-sm text-muted-foreground">
                              <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                              <span>4.{7 + (i % 3)}</span>
                              <span className="mx-1">•</span>
                              <span>{i * 1250} lecturas</span>
                            </div>
                          </div>
                          <p className="mt-2 text-sm text-muted-foreground line-clamp-2">
                            {i === 1
                              ? "La historia de un joven que descubre su destino como el héroe legendario que salvará al mundo de la oscuridad."
                              : i === 2
                                ? "En un reino olvidado por el tiempo, una antigua profecía está a punto de cumplirse."
                                : "La última frontera entre dos mundos está a punto de colapsar, y solo un grupo de valientes puede evitarlo."}
                          </p>
                          <div className="mt-4 flex flex-wrap gap-2">
                            <Button variant="outline" size="sm" asChild>
                              <Link href={`/author/novels/${i}/edit`}>
                                <PenTool className="mr-2 h-4 w-4" />
                                Editar
                              </Link>
                            </Button>
                            <Button variant="outline" size="sm" asChild>
                              <Link href={`/author/novels/${i}/chapters`}>
                                <FileText className="mr-2 h-4 w-4" />
                                Capítulos ({i * 5})
                              </Link>
                            </Button>
                            <Button variant="outline" size="sm" asChild>
                              <Link href={`/author/novels/${i}/stats`}>
                                <Star className="mr-2 h-4 w-4" />
                                Estadísticas
                              </Link>
                            </Button>
                          </div>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>

                {/* Mensaje si no hay novelas */}
                {false && (
                  <div className="text-center py-12">
                    <BookOpen className="mx-auto h-12 w-12 text-muted-foreground" />
                    <h3 className="mt-4 text-lg font-medium">No has publicado ninguna novela</h3>
                    <p className="mt-2 text-sm text-muted-foreground">
                      Comienza a escribir tu primera novela y compártela con el mundo.
                    </p>
                    <Button className="mt-4" asChild>
                      <Link href="/author/novels/new">
                        <BookPlus className="mr-2 h-4 w-4" />
                        Crear mi primera novela
                      </Link>
                    </Button>
                  </div>
                )}
              </TabsContent>
            )}
          </Tabs>
        </div>
      </main>
      <SiteFooter />
    </div>
  )
}
