/**
 * Página de géneros literarios
 *
 * Esta página muestra todos los géneros disponibles en la plataforma,
 * con una paleta de colores personalizada para cada género y un diseño
 * visualmente atractivo que facilita la exploración.
 */
import Link from "next/link"
import Image from "next/image"
import { ChevronRight, Search, Star } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { SiteFooter } from "@/components/site-footer"
import { SiteHeader } from "@/components/site-header"

export default function GenresPage() {
  // Lista de géneros con sus descripciones, imágenes y colores personalizados
  const genres = [
    {
      id: "fantasia",
      name: "Fantasía",
      description: "Mundos mágicos, criaturas míticas y poderes sobrenaturales.",
      count: 245,
      popular: ["El Ascenso del Héroe Legendario", "El Reino de los Dragones", "La Torre del Mago"],
      gradient: "gradient-fantasy",
      textColor: "text-white",
    },
    {
      id: "accion",
      name: "Acción",
      description: "Combates intensos, aventuras emocionantes y héroes valientes.",
      count: 189,
      popular: ["Guerrero Inmortal", "El Puño del Norte", "Cazador de Demonios"],
      gradient: "gradient-action",
      textColor: "text-white",
    },
    {
      id: "romance",
      name: "Romance",
      description: "Historias de amor, relaciones y emociones profundas.",
      count: 210,
      popular: ["Corazones Entrelazados", "El Príncipe y la Plebeya", "Amor en Tiempos de Guerra"],
      gradient: "gradient-romance",
      textColor: "text-white",
    },
    {
      id: "ciencia-ficcion",
      name: "Ciencia Ficción",
      description: "Tecnología futurista, viajes espaciales y realidades alternativas.",
      count: 156,
      popular: ["Colonias Estelares", "Inteligencia Artificial", "El Último Astronauta"],
      gradient: "gradient-scifi",
      textColor: "text-white",
    },
    {
      id: "aventura",
      name: "Aventura",
      description: "Viajes épicos, búsquedas peligrosas y descubrimientos asombrosos.",
      count: 178,
      popular: ["La Búsqueda del Tesoro Perdido", "Exploradores del Abismo", "La Isla Misteriosa"],
      gradient: "gradient-adventure",
      textColor: "text-white",
    },
    {
      id: "misterio",
      name: "Misterio",
      description: "Enigmas por resolver, crímenes ocultos y secretos oscuros.",
      count: 132,
      popular: ["El Detective Nocturno", "Secretos Familiares", "La Mansión de los Enigmas"],
      gradient: "gradient-mystery",
      textColor: "text-white",
    },
    {
      id: "drama",
      name: "Drama",
      description: "Conflictos emocionales, relaciones complejas y dilemas morales.",
      count: 145,
      popular: ["Vidas Cruzadas", "El Peso del Pasado", "Decisiones Difíciles"],
      gradient: "gradient-drama",
      textColor: "text-white",
    },
    {
      id: "horror",
      name: "Horror",
      description: "Terror psicológico, criaturas aterradoras y situaciones escalofriantes.",
      count: 98,
      popular: ["La Casa Maldita", "Susurros en la Oscuridad", "El Bosque de los Lamentos"],
      gradient: "gradient-horror",
      textColor: "text-white",
    },
    {
      id: "historico",
      name: "Histórico",
      description: "Épocas pasadas, eventos históricos y personajes de antaño.",
      count: 87,
      popular: ["El Samurái Errante", "Reinas y Espadas", "La Caída del Imperio"],
      gradient: "gradient-drama",
      textColor: "text-white",
    },
    {
      id: "comedia",
      name: "Comedia",
      description: "Situaciones divertidas, personajes ocurrentes y humor constante.",
      count: 112,
      popular: ["Desastres Cotidianos", "El Mago Torpe", "Aventuras Disparatadas"],
      gradient: "gradient-adventure",
      textColor: "text-white",
    },
    {
      id: "sobrenatural",
      name: "Sobrenatural",
      description: "Fenómenos inexplicables, poderes ocultos y seres extraordinarios.",
      count: 124,
      popular: ["Médium Reluctante", "El Chico que Veía Fantasmas", "Poderes Ocultos"],
      gradient: "gradient-mystery",
      textColor: "text-white",
    },
    {
      id: "artes-marciales",
      name: "Artes Marciales",
      description: "Técnicas de combate, cultivo de poder y torneos de habilidad.",
      count: 93,
      popular: ["El Camino del Puño", "Maestro de las Cinco Técnicas", "Ascensión del Discípulo"],
      gradient: "gradient-action",
      textColor: "text-white",
    },
  ]

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
              <span className="font-medium text-foreground">Géneros</span>
            </div>
            <h1 className="mt-4 text-3xl font-bold tracking-tight md:text-4xl">Explora por Géneros</h1>
            <p className="mt-2 text-muted-foreground">
              Descubre novelas clasificadas por géneros y encuentra tu próxima lectura favorita.
            </p>
          </div>

          <div className="mb-8 flex flex-col gap-4 sm:flex-row">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Buscar géneros..." className="pl-10" />
            </div>
            <Button variant="outline">Géneros populares</Button>
          </div>

          {/* Grid de géneros con colores personalizados */}
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {genres.map((genre) => (
              <Link key={genre.id} href={`/genre/${genre.id}`} className="group">
                <Card className="h-full overflow-hidden transition-all hover:shadow-lg hover:-translate-y-1 genre-card">
                  <div className={`${genre.gradient} p-6 ${genre.textColor}`}>
                    <h2 className="text-2xl font-bold">{genre.name}</h2>
                    <p className="mt-2 text-sm text-white/90">{genre.description}</p>
                    <div className="mt-2 text-sm font-medium">{genre.count} novelas</div>
                  </div>
                  <CardContent className="p-4 bg-card">
                    <h3 className="font-medium">Novelas populares:</h3>
                    <ul className="mt-2 space-y-1 text-sm">
                      {genre.popular.map((novel, i) => (
                        <li key={i} className="flex items-center gap-1">
                          <Star className="h-3 w-3 text-yellow-500" />
                          <span>{novel}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                  <CardFooter className="border-t p-4 bg-card">
                    <Button variant="ghost" className="w-full justify-between group-hover:text-primary" asChild>
                      <div>
                        <span>Explorar {genre.name}</span>
                        <ChevronRight className="h-4 w-4" />
                      </div>
                    </Button>
                  </CardFooter>
                </Card>
              </Link>
            ))}
          </div>

          {/* Sección de novelas destacadas por género */}
          <div className="mt-12">
            <h2 className="mb-6 text-2xl font-bold">Novelas destacadas por género</h2>
            <div className="space-y-12">
              {genres.slice(0, 3).map((genre) => (
                <div key={genre.id}>
                  <div className="mb-4 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div
                        className={`w-4 h-4 rounded-full ${genre.id === "fantasia" ? "bg-fantasy" : genre.id === "accion" ? "bg-action" : "bg-romance"}`}
                      ></div>
                      <h3 className="text-xl font-semibold">{genre.name}</h3>
                    </div>
                    <Button variant="link" asChild>
                      <Link href={`/genre/${genre.id}`}>
                        Ver todas
                        <ChevronRight className="ml-1 h-4 w-4" />
                      </Link>
                    </Button>
                  </div>
                  <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
                    {[...Array(4)].map((_, i) => (
                      <Card key={i} className="overflow-hidden novel-card">
                        <Link href={`/novel/${i + 1}`}>
                          <div className="relative">
                            <Image
                              src={`/placeholder.jpeg?height=240&width=180&text=${genre.name} ${i + 1}`}
                              width={180}
                              height={240}
                              alt={`Novela de ${genre.name} ${i + 1}`}
                              className="w-full object-cover novel-cover"
                            />
                            <div className="absolute top-2 right-2 flex items-center gap-1 rounded-md bg-black/60 px-2 py-1 text-xs text-white">
                              <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                              <span>4.{7 + (i % 3)}</span>
                            </div>
                          </div>
                        </Link>
                        <CardHeader className="p-4">
                          <CardTitle className="line-clamp-1 text-base">
                            <Link href={`/novel/${i + 1}`} className="hover:text-primary transition-colors">
                              {genre.popular[i % 3]} {i + 1}
                            </Link>
                          </CardTitle>
                        </CardHeader>
                        <CardContent className="p-4 pt-0">
                          <p className="line-clamp-2 text-xs sm:text-sm text-muted-foreground">
                            {i % 3 === 0
                              ? "Un joven ordinario descubre que tiene poderes extraordinarios y debe enfrentarse a fuerzas oscuras."
                              : i % 3 === 1
                                ? "En un mundo de magia y misterio, una joven princesa debe recuperar su trono usurpado."
                                : "La historia de un poderoso hechicero que debe enfrentarse a su destino y salvar a la humanidad."}
                          </p>
                        </CardContent>
                        <CardFooter className="flex items-center justify-between p-4 pt-0">
                          <div className="flex flex-wrap gap-1">
                            <span
                              className={`rounded-full px-2 py-1 text-xs ${genre.id === "fantasia"
                                  ? "bg-fantasy/20 text-fantasy-dark"
                                  : genre.id === "accion"
                                    ? "bg-action/20 text-action-dark"
                                    : "bg-romance/20 text-romance-dark"
                                }`}
                            >
                              {genre.name}
                            </span>
                            <span className="rounded-full bg-muted px-2 py-1 text-xs">
                              {i % 3 === 0 ? "Aventura" : i % 3 === 1 ? "Drama" : "Misterio"}
                            </span>
                          </div>
                        </CardFooter>
                      </Card>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Banner CTA con gradiente */}
          <div className="mt-12 rounded-lg border overflow-hidden">
            <div className="gradient-fantasy p-6 text-white">
              <div className="flex flex-col items-center justify-between gap-4 text-center sm:flex-row sm:text-left">
                <div>
                  <h2 className="text-xl font-bold">¿No encuentras lo que buscas?</h2>
                  <p className="text-white/90">
                    Utiliza nuestra búsqueda avanzada para encontrar novelas con criterios específicos.
                  </p>
                </div>
                <Button className="bg-white text-fantasy hover:bg-white/90">
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
