import Link from "next/link"
import Image from "next/image"
import { BookOpen, ChevronRight, Crown, FlameIcon as Fire, Star, TrendingUp, Users } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { SiteFooter } from "@/components/site-footer"
import { SiteHeader } from "@/components/site-header"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

/**
 * Página de Novelas Populares
 *
 * Esta página muestra las novelas más populares de la plataforma organizadas en diferentes
 * categorías: tendencias, más leídas, mejor valoradas y en ascenso.
 *
 * La página es completamente responsive y se adapta a diferentes tamaños de pantalla.
 */
export default function PopularPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main className="flex-1">
        <div className="container px-4 py-6 md:px-6 md:py-12">
          {/* Encabezado y migas de pan */}
          <div className="mb-6 md:mb-8">
            <div className="flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
              <Link href="/" className="hover:underline">
                Inicio
              </Link>
              <ChevronRight className="h-4 w-4" />
              <span className="font-medium text-foreground">Novelas Populares</span>
            </div>
            <h1 className="mt-3 text-2xl font-bold tracking-tight md:mt-4 md:text-4xl">Novelas Populares</h1>
            <p className="mt-2 text-sm text-muted-foreground md:text-base">
              Descubre las novelas más leídas, mejor valoradas y las tendencias del momento.
            </p>
          </div>

          {/* Pestañas de categorías */}
          <Tabs defaultValue="trending" className="mb-8">
            {/* Navegación de pestañas - Adaptada para móvil con scroll horizontal */}
            <div className="overflow-x-auto pb-2">
              <TabsList className="w-full justify-start md:justify-center">
                <TabsTrigger value="trending" className="gap-2">
                  <Fire className="h-4 w-4" />
                  <span className="whitespace-nowrap">Tendencia</span>
                </TabsTrigger>
                <TabsTrigger value="most-read" className="gap-2">
                  <BookOpen className="h-4 w-4" />
                  <span className="whitespace-nowrap">Más Leídas</span>
                </TabsTrigger>
                <TabsTrigger value="top-rated" className="gap-2">
                  <Star className="h-4 w-4" />
                  <span className="whitespace-nowrap">Mejor Valoradas</span>
                </TabsTrigger>
                <TabsTrigger value="rising" className="gap-2">
                  <TrendingUp className="h-4 w-4" />
                  <span className="whitespace-nowrap">En Ascenso</span>
                </TabsTrigger>
              </TabsList>
            </div>

            {/* Contenido de la pestaña: TENDENCIA */}
            <TabsContent value="trending" className="mt-4 md:mt-6">
              {/* Top 3 novelas en tendencia - Diseño destacado */}
              <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6">
                {[...Array(3)].map((_, i) => (
                  <Card key={i} className="overflow-hidden">
                    <div className="relative">
                      <Link href={`/novel/${i + 1}`}>
                        <Image
                          src={`/placeholder.jpeg?height=240&width=180&text=Top ${i + 1}`}
                          width={180}
                          height={240}
                          alt={`Novela Top ${i + 1}`}
                          className="h-[240px] w-full object-cover transition-all hover:scale-105"
                        />
                      </Link>
                      {/* Indicador de posición */}
                      <div className="absolute top-0 left-0 flex h-10 w-10 items-center justify-center bg-primary text-lg font-bold text-primary-foreground">
                        #{i + 1}
                      </div>
                      {/* Valoración */}
                      <div className="absolute top-2 right-2 flex items-center gap-1 rounded-md bg-black/60 px-2 py-1 text-xs text-white">
                        <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                        <span>4.{9 - i}</span>
                      </div>
                      {/* Badge especial para la novela #1 */}
                      {i === 0 && (
                        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-3">
                          <div className="flex items-center gap-1 text-xs text-white">
                            <Crown className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                            <span>Novela #1 por 3 semanas consecutivas</span>
                          </div>
                        </div>
                      )}
                    </div>
                    <CardHeader className="p-3 md:p-4">
                      <CardTitle className="line-clamp-1 text-sm md:text-base">
                        <Link href={`/novel/${i + 1}`}>
                          {i === 0
                            ? "El Ascenso del Héroe Legendario"
                            : i === 1
                              ? "Crónicas del Reino Olvidado"
                              : "El Último Hechicero"}
                        </Link>
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="p-3 pt-0 md:p-4 md:pt-0">
                      <p className="line-clamp-2 text-xs text-muted-foreground">
                        {i === 0
                          ? "Un joven ordinario descubre que tiene poderes extraordinarios y debe enfrentarse a fuerzas oscuras para salvar su mundo."
                          : i === 1
                            ? "En un mundo de magia y misterio, una joven princesa debe recuperar su trono usurpado y restaurar la paz en su reino."
                            : "La historia de un poderoso hechicero que debe enfrentarse a su destino y salvar a la humanidad de la extinción."}
                      </p>
                    </CardContent>
                    <CardFooter className="flex items-center justify-between p-3 pt-0 md:p-4 md:pt-0">
                      {/* Estadísticas de la novela */}
                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <Users className="h-3 w-3" />
                          <span>{1000 - i * 100}K</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <BookOpen className="h-3 w-3" />
                          <span>{120 - i * 10}</span>
                        </div>
                      </div>
                      <Button size="sm" asChild className="h-8 px-2 text-xs">
                        <Link href={`/novel/${i + 1}`}>Ver</Link>
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>

              {/* Lista de novelas en tendencia (posiciones 4-10) */}
              <div className="space-y-4 md:space-y-6">
                {[...Array(7)].map((_, i) => (
                  <Card key={i + 3} className="overflow-hidden">
                    <div className="flex flex-col gap-3 p-3 sm:flex-row sm:gap-4 md:p-4">
                      {/* Imagen de portada con posición */}
                      <div className="relative h-28 w-20 flex-shrink-0 overflow-hidden rounded-md sm:h-36 sm:w-24 md:h-40 md:w-28">
                        <Image
                          src={`/placeholder.jpeg?height=160&width=120&text=Top ${i + 4}`}
                          fill
                          alt={`Novela Top ${i + 4}`}
                          className="object-cover"
                        />
                        <div className="absolute top-0 left-0 flex h-6 w-6 items-center justify-center bg-primary text-xs font-bold text-primary-foreground sm:h-8 sm:w-8 sm:text-sm">
                          #{i + 4}
                        </div>
                      </div>
                      {/* Información de la novela */}
                      <div className="flex flex-1 flex-col">
                        <CardHeader className="p-0">
                          <CardTitle className="text-sm sm:text-base">
                            <Link href={`/novel/${i + 4}`} className="hover:underline">
                              {i % 3 === 0
                                ? "La Espada del Destino"
                                : i % 3 === 1
                                  ? "Reinos en Guerra"
                                  : "El Despertar de los Dioses"}{" "}
                              {i + 1}
                            </Link>
                          </CardTitle>
                          <div className="mt-1 flex flex-wrap items-center gap-2">
                            {/* Valoración */}
                            <div className="flex items-center gap-1">
                              <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                              <span className="text-sm">4.{8 - (i % 3)}</span>
                            </div>
                            {/* Autor */}
                            <span className="text-xs text-muted-foreground">
                              por{" "}
                              <Link href="/author/1" className="text-primary hover:underline">
                                {i % 3 === 0 ? "Autor Famoso" : i % 3 === 1 ? "Escritora Novel" : "Pluma Maestra"}
                              </Link>
                            </span>
                          </div>
                        </CardHeader>
                        {/* Descripción - oculta en móviles muy pequeños */}
                        <CardContent className="hidden p-0 pt-2 xs:block">
                          <p className="line-clamp-2 text-xs text-muted-foreground sm:text-sm">
                            {i % 3 === 0
                              ? "Un guerrero con una espada legendaria debe enfrentarse a un antiguo mal que amenaza con destruir el mundo."
                              : i % 3 === 1
                                ? "Cinco reinos al borde de la guerra. Una profecía olvidada. Un héroe inesperado."
                                : "Los antiguos dioses han despertado y ahora los mortales deben lidiar con su regreso."}
                          </p>
                        </CardContent>
                        <CardFooter className="flex items-center justify-between p-0 pt-2 sm:pt-4">
                          {/* Etiquetas de género */}
                          <div className="flex flex-wrap gap-1">
                            <span className="rounded-full bg-muted px-2 py-1 text-xs">
                              {i % 3 === 0 ? "Fantasía" : i % 3 === 1 ? "Aventura" : "Mitología"}
                            </span>
                            <span className="hidden rounded-full bg-muted px-2 py-1 text-xs sm:inline-block">
                              {i % 3 === 0 ? "Acción" : i % 3 === 1 ? "Guerra" : "Magia"}
                            </span>
                          </div>
                          {/* Botón de acción */}
                          <Button size="sm" asChild className="h-8 px-2 text-xs">
                            <Link href={`/novel/${i + 4}`}>Ver</Link>
                          </Button>
                        </CardFooter>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>

              {/* Botón para cargar más */}
              <div className="mt-6 flex justify-center md:mt-8">
                <Button variant="outline">Cargar más novelas</Button>
              </div>
            </TabsContent>

            {/* Contenido de la pestaña: MÁS LEÍDAS */}
            <TabsContent value="most-read" className="mt-4 md:mt-6">
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6">
                {[...Array(9)].map((_, i) => (
                  <Card key={i} className="overflow-hidden">
                    <div className="flex flex-col sm:flex-row">
                      {/* Imagen de portada con posición */}
                      <div className="relative h-36 w-full sm:h-auto sm:w-1/3">
                        <Image
                          src={`/placeholder.jpeg?height=160&width=120&text=Leída ${i + 1}`}
                          fill
                          alt={`Novela Más Leída ${i + 1}`}
                          className="object-cover"
                        />
                        <div className="absolute top-0 left-0 flex h-6 w-6 items-center justify-center bg-blue-600 text-xs font-bold text-white sm:h-8 sm:w-8 sm:text-sm">
                          #{i + 1}
                        </div>
                      </div>
                      {/* Información de la novela */}
                      <div className="flex flex-1 flex-col p-3 sm:p-4">
                        <h3 className="text-sm font-medium sm:text-base">
                          <Link href={`/novel/${i + 10}`} className="hover:underline">
                            {i % 3 === 0
                              ? "La Leyenda del Dragón Dorado"
                              : i % 3 === 1
                                ? "El Secreto de los Antiguos"
                                : "Cazadores de Sombras"}{" "}
                            {i + 1}
                          </Link>
                        </h3>
                        {/* Valoración */}
                        <div className="mt-1 flex items-center gap-1">
                          <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                          <span className="text-xs">4.{7 + (i % 3)}</span>
                        </div>
                        {/* Estadísticas */}
                        <div className="mt-2 flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
                          <div className="flex items-center gap-1">
                            <Users className="h-3 w-3" />
                            <span>{2500 - i * 200}K</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <BookOpen className="h-3 w-3" />
                            <span>{150 - i * 5}</span>
                          </div>
                        </div>
                        {/* Botón de acción */}
                        <div className="mt-auto pt-2">
                          <Button size="sm" variant="ghost" className="h-8 px-2 text-xs" asChild>
                            <Link href={`/novel/${i + 10}`}>
                              Ver detalles
                              <ChevronRight className="ml-1 h-3 w-3" />
                            </Link>
                          </Button>
                        </div>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
              {/* Botón para cargar más */}
              <div className="mt-6 flex justify-center md:mt-8">
                <Button variant="outline">Ver más novelas leídas</Button>
              </div>
            </TabsContent>

            {/* Contenido de la pestaña: MEJOR VALORADAS */}
            <TabsContent value="top-rated" className="mt-4 md:mt-6">
              <div className="space-y-4 md:space-y-6">
                {[...Array(10)].map((_, i) => (
                  <Card key={i} className="overflow-hidden">
                    <div className="flex flex-col gap-3 p-3 sm:flex-row sm:gap-4 md:p-4">
                      {/* Imagen de portada con posición */}
                      <div className="relative h-28 w-20 flex-shrink-0 overflow-hidden rounded-md sm:h-36 sm:w-24 md:h-40 md:w-28">
                        <Image
                          src={`/placeholder.jpeg?height=160&width=120&text=Rating ${i + 1}`}
                          fill
                          alt={`Novela Mejor Valorada ${i + 1}`}
                          className="object-cover"
                        />
                        <div className="absolute top-0 left-0 flex h-6 w-6 items-center justify-center bg-yellow-500 text-xs font-bold text-white sm:h-8 sm:w-8 sm:text-sm">
                          #{i + 1}
                        </div>
                      </div>
                      {/* Información de la novela */}
                      <div className="flex flex-1 flex-col">
                        <div className="flex flex-col items-start justify-between gap-2 sm:flex-row sm:items-center">
                          <h3 className="text-sm font-medium sm:text-base">
                            <Link href={`/novel/${i + 20}`} className="hover:underline">
                              {i % 4 === 0
                                ? "El Jardín de las Mariposas"
                                : i % 4 === 1
                                  ? "La Sombra del Emperador"
                                  : i % 4 === 2
                                    ? "Memorias de un Inmortal"
                                    : "El Último Reino"}{" "}
                              {i + 1}
                            </Link>
                          </h3>
                          {/* Badge de valoración */}
                          <div className="flex items-center gap-1 rounded-md bg-yellow-100 px-2 py-1 text-xs font-medium text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300">
                            <Star className="h-3 w-3 fill-yellow-500 sm:h-4 sm:w-4" />
                            <span>5.0</span>
                          </div>
                        </div>
                        {/* Autor */}
                        <p className="mt-1 text-xs text-muted-foreground sm:mt-2 sm:text-sm">
                          por{" "}
                          <Link href="/author/1" className="text-primary hover:underline">
                            {i % 3 === 0 ? "Maestro de Historias" : i % 3 === 1 ? "Narradora Estelar" : "Pluma Dorada"}
                          </Link>
                        </p>
                        {/* Descripción - oculta en móviles muy pequeños */}
                        <p className="mt-1 hidden line-clamp-2 text-xs text-muted-foreground xs:block sm:mt-2 sm:text-sm">
                          {i % 4 === 0
                            ? "Una historia conmovedora sobre la vida, el amor y la superación personal que ha cautivado a millones de lectores."
                            : i % 4 === 1
                              ? "Una épica de fantasía política con intrigas palaciegas y batallas por el poder en un imperio decadente."
                              : i % 4 === 2
                                ? "Las memorias de un ser que ha vivido mil años y ha sido testigo de la historia de la humanidad."
                                : "En un mundo dividido por la guerra, una joven debe unir a los reinos enfrentados para enfrentar una amenaza mayor."}
                        </p>
                        {/* Estadísticas */}
                        <div className="mt-1 flex items-center gap-2 text-xs text-muted-foreground sm:mt-2">
                          <div className="flex items-center gap-1">
                            <Users className="h-3 w-3" />
                            <span>{500 - i * 30}K</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Star className="h-3 w-3" />
                            <span>{45 - i * 2}K</span>
                          </div>
                        </div>
                        {/* Etiquetas de género */}
                        <div className="mt-1 flex flex-wrap gap-1 sm:mt-2">
                          <span className="rounded-full bg-muted px-2 py-1 text-xs">
                            {i % 4 === 0 ? "Drama" : i % 4 === 1 ? "Fantasía" : i % 4 === 2 ? "Histórico" : "Épica"}
                          </span>
                          <span className="rounded-full bg-muted px-2 py-1 text-xs">
                            {i % 4 === 0 ? "Romance" : i % 4 === 1 ? "Intriga" : i % 4 === 2 ? "Aventura" : "Guerra"}
                          </span>
                        </div>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
              {/* Botón para cargar más */}
              <div className="mt-6 flex justify-center md:mt-8">
                <Button variant="outline">Ver más novelas valoradas</Button>
              </div>
            </TabsContent>

            {/* Contenido de la pestaña: EN ASCENSO */}
            <TabsContent value="rising" className="mt-4 md:mt-6">
              <div className="grid grid-cols-1 gap-4 xs:grid-cols-2 lg:grid-cols-3 lg:gap-6">
                {[...Array(9)].map((_, i) => (
                  <Card key={i} className="overflow-hidden">
                    {/* Imagen de portada con badge de crecimiento */}
                    <div className="relative">
                      <Link href={`/novel/${i + 30}`}>
                        <Image
                          src={`/placeholder.jpeg?height=240&width=180&text=Rising ${i + 1}`}
                          width={180}
                          height={240}
                          alt={`Novela en Ascenso ${i + 1}`}
                          className="h-[200px] w-full object-cover transition-all hover:scale-105 sm:h-[240px]"
                        />
                      </Link>
                      {/* Badge de porcentaje de crecimiento */}
                      <div className="absolute top-2 right-2 flex items-center gap-1 rounded-md bg-green-600 px-2 py-1 text-xs text-white">
                        <TrendingUp className="h-3 w-3" />
                        <span>+{200 - i * 20}%</span>
                      </div>
                    </div>
                    {/* Información de la novela */}
                    <CardHeader className="p-3 md:p-4">
                      <CardTitle className="line-clamp-1 text-sm md:text-base">
                        <Link href={`/novel/${i + 30}`}>
                          {i % 3 === 0
                            ? "Guardianes del Abismo"
                            : i % 3 === 1
                              ? "La Senda del Inmortal"
                              : "Reinos en Guerra"}{" "}
                          {i + 1}
                        </Link>
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="p-3 pt-0 md:p-4 md:pt-0">
                      {/* Descripción */}
                      <p className="line-clamp-2 text-xs text-muted-foreground">
                        {i % 3 === 0
                          ? "Un grupo de aventureros descubre una antigua entrada a un mundo subterráneo lleno de peligros y tesoros."
                          : i % 3 === 1
                            ? "Un joven monje encuentra un manuscrito prohibido que revela el secreto de la inmortalidad."
                            : "Cinco reinos al borde de la guerra. Una profecía olvidada. Un héroe inesperado."}
                      </p>
                      {/* Valoración y etiqueta de tendencia */}
                      <div className="mt-2 flex items-center justify-between">
                        <div className="flex items-center gap-1">
                          <Star className="h-3 w-3 fill-yellow-400 text-yellow-400 sm:h-4 sm:w-4" />
                          <span className="text-xs sm:text-sm">4.{6 + (i % 4)}</span>
                        </div>
                        <span className="text-xs text-muted-foreground">Nueva tendencia</span>
                      </div>
                    </CardContent>
                    {/* Etiquetas de género */}
                    <CardFooter className="flex items-center justify-between p-3 pt-0 md:p-4 md:pt-0">
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
              {/* Botón para cargar más */}
              <div className="mt-6 flex justify-center md:mt-8">
                <Button variant="outline">Ver más novelas en ascenso</Button>
              </div>
            </TabsContent>
          </Tabs>

          {/* Sección de estadísticas de popularidad */}
          <div className="mt-8 md:mt-12">
            <h2 className="mb-4 text-xl font-bold md:mb-6 md:text-2xl">Estadísticas de Popularidad</h2>
            {/* Cards de estadísticas - Responsive grid */}
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
              {/* Card: Novela más leída */}
              <Card>
                <CardHeader className="p-3 pb-1 md:p-4 md:pb-2">
                  <CardTitle className="text-xs font-medium md:text-sm">Novela Más Leída</CardTitle>
                </CardHeader>
                <CardContent className="p-3 md:p-4">
                  <div className="flex items-center gap-3 md:gap-4">
                    <div className="relative h-14 w-10 flex-shrink-0 overflow-hidden rounded-md md:h-16 md:w-12">
                      <Image
                        src="/placeholder.jpeg?height=64&width=48&text=Top"
                        fill
                        alt="Novela más leída"
                        className="object-cover"
                      />
                    </div>
                    <div>
                      <div className="text-sm font-medium md:text-base">El Ascenso del Héroe Legendario</div>
                      <div className="text-xs text-muted-foreground">2.5M lecturas totales</div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Card: Mejor valorada */}
              <Card>
                <CardHeader className="p-3 pb-1 md:p-4 md:pb-2">
                  <CardTitle className="text-xs font-medium md:text-sm">Mejor Valorada</CardTitle>
                </CardHeader>
                <CardContent className="p-3 md:p-4">
                  <div className="flex items-center gap-3 md:gap-4">
                    <div className="relative h-14 w-10 flex-shrink-0 overflow-hidden rounded-md md:h-16 md:w-12">
                      <Image
                        src="/placeholder.jpeg?height=64&width=48&text=5★"
                        fill
                        alt="Novela mejor valorada"
                        className="object-cover"
                      />
                    </div>
                    <div>
                      <div className="text-sm font-medium md:text-base">El Jardín de las Mariposas</div>
                      <div className="flex items-center gap-1 text-xs">
                        <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                        <span>5.0 (45K valoraciones)</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Card: Mayor crecimiento */}
              <Card>
                <CardHeader className="p-3 pb-1 md:p-4 md:pb-2">
                  <CardTitle className="text-xs font-medium md:text-sm">Mayor Crecimiento</CardTitle>
                </CardHeader>
                <CardContent className="p-3 md:p-4">
                  <div className="flex items-center gap-3 md:gap-4">
                    <div className="relative h-14 w-10 flex-shrink-0 overflow-hidden rounded-md md:h-16 md:w-12">
                      <Image
                        src="/placeholder.jpeg?height=64&width=48&text=↑"
                        fill
                        alt="Novela con mayor crecimiento"
                        className="object-cover"
                      />
                    </div>
                    <div>
                      <div className="text-sm font-medium md:text-base">Guardianes del Abismo</div>
                      <div className="flex items-center gap-1 text-xs text-green-600">
                        <TrendingUp className="h-3 w-3" />
                        <span>+215% esta semana</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Card: Autor más popular */}
              <Card>
                <CardHeader className="p-3 pb-1 md:p-4 md:pb-2">
                  <CardTitle className="text-xs font-medium md:text-sm">Autor Más Popular</CardTitle>
                </CardHeader>
                <CardContent className="p-3 md:p-4">
                  <div className="flex items-center gap-3 md:gap-4">
                    <div className="relative h-10 w-10 flex-shrink-0 overflow-hidden rounded-full md:h-12 md:w-12">
                      <Image
                        src="/placeholder.jpeg?height=48&width=48&text=AF"
                        fill
                        alt="Autor más popular"
                        className="object-cover"
                      />
                    </div>
                    <div>
                      <div className="text-sm font-medium md:text-base">Autor Famoso</div>
                      <div className="text-xs text-muted-foreground">15 novelas, 3.8M lectores</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Banner CTA */}
          <div className="mt-8 rounded-lg border bg-muted/40 p-4 dark:bg-muted/10 md:mt-12 md:p-6">
            <div className="flex flex-col items-center justify-between gap-4 text-center sm:flex-row sm:text-left">
              <div>
                <h2 className="text-lg font-bold md:text-xl">¿Quieres descubrir más novelas?</h2>
                <p className="text-xs text-muted-foreground md:text-sm">
                  Explora nuestra colección completa o utiliza la búsqueda avanzada para encontrar tu próxima lectura.
                </p>
              </div>
              {/* Botones de acción */}
              <div className="flex flex-col gap-2 sm:flex-row">
                <Button asChild className="w-full sm:w-auto">
                  <Link href="/explore">Explorar todas</Link>
                </Button>
                <Button variant="outline" asChild className="w-full sm:w-auto">
                  <Link href="/search/advanced">Búsqueda avanzada</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </main>
      <SiteFooter />
    </div>
  )
}
