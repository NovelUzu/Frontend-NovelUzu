"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { ArrowUp, ArrowDown, BookOpen, Crown, File as Fire, Star, TrendingUp, Loader2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { SiteFooter } from "@/components/site-footer"
import { SiteHeader } from "@/components/site-header"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

// Datos simulados para diferentes categorías
const popularNovels = [
  {
    id: 1,
    title: "El Ascenso del Héroe Legendario",
    author: "Autor Famoso",
    authorId: 1,
    rating: 4.9,
    reads: "1.2M",
    chapters: 245,
    genres: ["Fantasía", "Aventura"],
    change: "Estable",
    changeType: "stable" as const,
    status: "ongoing",
  },
  {
    id: 2,
    title: "Crónicas del Reino Olvidado",
    author: "Escritora Novel",
    authorId: 2,
    rating: 4.8,
    reads: "980K",
    chapters: 189,
    genres: ["Fantasía", "Drama"],
    change: "+5%",
    changeType: "up" as const,
    status: "ongoing",
  },
  {
    id: 3,
    title: "El Último Hechicero",
    author: "Pluma Maestra",
    authorId: 3,
    rating: 4.7,
    reads: "856K",
    chapters: 156,
    genres: ["Magia", "Misterio"],
    change: "+12%",
    changeType: "up" as const,
    status: "ongoing",
  },
  {
    id: 4,
    title: "La Espada del Destino",
    author: "Narrador Épico",
    authorId: 4,
    rating: 4.6,
    reads: "743K",
    chapters: 201,
    genres: ["Acción", "Aventura"],
    change: "-2%",
    changeType: "down" as const,
    status: "ongoing",
  },
  {
    id: 5,
    title: "Reinos en Guerra",
    author: "Cronista Real",
    authorId: 5,
    rating: 4.5,
    reads: "692K",
    chapters: 178,
    genres: ["Guerra", "Política"],
    change: "+8%",
    changeType: "up" as const,
    status: "ongoing",
  },
]

const topRatedNovels = [
  {
    id: 11,
    title: "La Leyenda del Dragón Dorado",
    author: "Maestro de Historias",
    authorId: 11,
    rating: 5.0,
    reads: "456K",
    chapters: 89,
    genres: ["Fantasía Épica", "Dragones"],
    change: "Estable",
    changeType: "stable" as const,
    status: "completed",
  },
  {
    id: 12,
    title: "El Secreto de los Antiguos",
    author: "Narradora Estelar",
    authorId: 12,
    rating: 4.98,
    reads: "378K",
    chapters: 156,
    genres: ["Misterio", "Arqueología"],
    change: "Estable",
    changeType: "stable" as const,
    status: "completed",
  },
  {
    id: 13,
    title: "Cazadores de Sombras",
    author: "Escritor Nocturno",
    authorId: 13,
    rating: 4.96,
    reads: "523K",
    chapters: 234,
    genres: ["Sobrenatural", "Acción"],
    change: "Estable",
    changeType: "stable" as const,
    status: "ongoing",
  },
  {
    id: 14,
    title: "El Último Reino",
    author: "Cronista Ancestral",
    authorId: 14,
    rating: 4.94,
    reads: "298K",
    chapters: 167,
    genres: ["Fantasía", "Reino"],
    change: "Estable",
    changeType: "stable" as const,
    status: "completed",
  },
  {
    id: 15,
    title: "La Profecía Olvidada",
    author: "Vidente Literario",
    authorId: 15,
    rating: 4.92,
    reads: "445K",
    chapters: 198,
    genres: ["Profecía", "Magia"],
    change: "Estable",
    changeType: "stable" as const,
    status: "ongoing",
  },
]

const trendingNovels = [
  {
    id: 21,
    title: "El Despertar del Nuevo Mundo",
    author: "Visionario Moderno",
    authorId: 21,
    rating: 4.7,
    reads: "234K",
    chapters: 45,
    genres: ["Ciencia Ficción", "Aventura"],
    change: "+156%",
    changeType: "up" as const,
    status: "ongoing",
  },
  {
    id: 22,
    title: "Academia de Magos Rebeldes",
    author: "Joven Prodigio",
    authorId: 22,
    rating: 4.6,
    reads: "189K",
    chapters: 67,
    genres: ["Academia", "Magia"],
    change: "+89%",
    changeType: "up" as const,
    status: "ongoing",
  },
  {
    id: 23,
    title: "El Juego de los Inmortales",
    author: "Estratega Divino",
    authorId: 23,
    rating: 4.8,
    reads: "167K",
    chapters: 34,
    genres: ["Juegos", "Inmortalidad"],
    change: "+134%",
    changeType: "up" as const,
    status: "ongoing",
  },
  {
    id: 24,
    title: "Cazador de Demonios Urbano",
    author: "Guerrero Urbano",
    authorId: 24,
    rating: 4.5,
    reads: "145K",
    chapters: 56,
    genres: ["Urbano", "Demonios"],
    change: "+78%",
    changeType: "up" as const,
    status: "ongoing",
  },
  {
    id: 25,
    title: "La Revolución de los Elementos",
    author: "Maestro Elemental",
    authorId: 25,
    rating: 4.4,
    reads: "123K",
    chapters: 29,
    genres: ["Elementos", "Revolución"],
    change: "+67%",
    changeType: "up" as const,
    status: "ongoing",
  },
]

const completedNovels = [
  {
    id: 31,
    title: "La Saga del Emperador Eterno",
    author: "Historiador Imperial",
    authorId: 31,
    rating: 4.9,
    reads: "2.1M",
    chapters: 1247,
    genres: ["Épica", "Imperio"],
    change: "Completa",
    changeType: "stable" as const,
    status: "completed",
  },
  {
    id: 32,
    title: "El Ciclo de las Cinco Torres",
    author: "Arquitecto de Mundos",
    authorId: 32,
    rating: 4.8,
    reads: "1.8M",
    chapters: 892,
    genres: ["Torres", "Magia"],
    change: "Completa",
    changeType: "stable" as const,
    status: "completed",
  },
  {
    id: 33,
    title: "Crónicas del Tiempo Perdido",
    author: "Viajero Temporal",
    authorId: 33,
    rating: 4.7,
    reads: "1.5M",
    chapters: 678,
    genres: ["Tiempo", "Aventura"],
    change: "Completa",
    changeType: "stable" as const,
    status: "completed",
  },
  {
    id: 34,
    title: "La Leyenda de los Siete Reinos",
    author: "Rey Narrador",
    authorId: 34,
    rating: 4.6,
    reads: "1.3M",
    chapters: 567,
    genres: ["Reinos", "Guerra"],
    change: "Completa",
    changeType: "stable" as const,
    status: "completed",
  },
  {
    id: 35,
    title: "El Destino de los Elegidos",
    author: "Oráculo Literario",
    authorId: 35,
    rating: 4.5,
    reads: "1.1M",
    chapters: 445,
    genres: ["Destino", "Elegidos"],
    change: "Completa",
    changeType: "stable" as const,
    status: "completed",
  },
]

type Novel = {
  id: number
  title: string
  author: string
  authorId: number
  rating: number
  reads: string
  chapters: number
  genres: string[]
  change: string
  changeType: "up" | "down" | "stable"
  status: string
}

export default function RankingsPage() {
  const [loadingStates, setLoadingStates] = useState({
    popular: false,
    rated: false,
    trending: false,
    completed: false,
  })

  const [displayCounts, setDisplayCounts] = useState({
    popular: 5,
    rated: 5,
    trending: 5,
    completed: 5,
  })

  const [allData] = useState({
    popular: [...popularNovels, ...generateMoreNovels(popularNovels, 20)],
    rated: [...topRatedNovels, ...generateMoreNovels(topRatedNovels, 15)],
    trending: [...trendingNovels, ...generateMoreNovels(trendingNovels, 25)],
    completed: [...completedNovels, ...generateMoreNovels(completedNovels, 18)],
  })

  function generateMoreNovels(baseNovels: Novel[], count: number): Novel[] {
    const moreNovels: Novel[] = []
    const titles = [
      "El Guardián de las Estrellas",
      "Secretos del Abismo",
      "La Torre Infinita",
      "Cazador de Almas",
      "El Reino de Cristal",
      "La Espada Maldita",
      "Dragones del Norte",
      "El Último Samurai",
      "La Profecía Dorada",
      "Guerreros de la Luz",
      "El Bosque Encantado",
      "La Ciudad Perdida",
      "El Poder Ancestral",
      "La Llave del Tiempo",
      "El Despertar Oscuro",
    ]
    const authors = [
      "Escritor Misterioso",
      "Pluma Dorada",
      "Narrador Épico",
      "Maestro de Cuentos",
      "Cronista Sabio",
      "Visionario",
      "Poeta Guerrero",
      "Escriba Real",
    ]
    const genresList = [
      ["Fantasía", "Aventura"],
      ["Misterio", "Suspense"],
      ["Acción", "Drama"],
      ["Romance", "Fantasía"],
      ["Ciencia Ficción", "Futuro"],
      ["Horror", "Sobrenatural"],
    ]

    for (let i = 0; i < count; i++) {
      const baseNovel = baseNovels[i % baseNovels.length]
      moreNovels.push({
        id: baseNovel.id + 100 + i,
        title: titles[i % titles.length],
        author: authors[i % authors.length],
        authorId: baseNovel.authorId + 100 + i,
        rating: Math.round((Math.random() * 1.5 + 3.5) * 10) / 10,
        reads: `${Math.floor(Math.random() * 500 + 50)}K`,
        chapters: Math.floor(Math.random() * 200 + 50),
        genres: genresList[i % genresList.length],
        change:
          baseNovel.changeType === "up"
            ? `+${Math.floor(Math.random() * 20 + 1)}%`
            : baseNovel.changeType === "down"
              ? `-${Math.floor(Math.random() * 10 + 1)}%`
              : "Estable",
        changeType: baseNovel.changeType,
        status: Math.random() > 0.7 ? "completed" : "ongoing",
      })
    }
    return moreNovels
  }

  const handleLoadMore = async (category: keyof typeof loadingStates) => {
    setLoadingStates((prev) => ({ ...prev, [category]: true }))

    // Simular carga de datos
    await new Promise((resolve) => setTimeout(resolve, 1000))

    setDisplayCounts((prev) => ({
      ...prev,
      [category]: prev[category] + 10,
    }))

    setLoadingStates((prev) => ({ ...prev, [category]: false }))
  }

  const renderNovelCard = (novel: Novel, index: number) => (
    <Card key={novel.id} className="overflow-hidden">
      <div className="flex flex-col items-center gap-4 p-4 sm:flex-row">
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-xl font-bold text-primary-foreground">
          {index + 1}
        </div>
        <div className="relative h-32 w-24 overflow-hidden rounded-md sm:h-40 sm:w-28">
          <Image
            src={`/placeholder.jpg?height=160&width=120&text=${novel.title.slice(0, 10)}`}
            fill
            alt={novel.title}
            className="object-cover"
          />
          {index < 3 && (
            <div className="absolute left-0 top-0 flex h-8 w-8 items-center justify-center bg-yellow-500 text-white">
              <Crown className="h-5 w-5" />
            </div>
          )}
          {novel.status === "completed" && (
            <div className="absolute right-0 top-0 flex h-6 w-6 items-center justify-center bg-green-500 text-white rounded-bl-md">
              <BookOpen className="h-3 w-3" />
            </div>
          )}
        </div>
        <div className="flex flex-1 flex-col text-center sm:text-left">
          <Link href={`/novel/${novel.id}`} className="text-lg font-bold hover:underline">
            {novel.title}
          </Link>
          <p className="text-sm text-muted-foreground">
            Por:{" "}
            <Link href={`/author/${novel.authorId}`} className="text-primary hover:underline">
              {novel.author}
            </Link>
          </p>
          <div className="mt-2 flex flex-wrap items-center gap-4">
            <div className="flex items-center gap-1">
              <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
              <span className="text-sm">{novel.rating}</span>
            </div>
            <div className="flex items-center gap-1">
              <Fire className="h-4 w-4 text-red-500" />
              <span className="text-sm">{novel.reads} lecturas</span>
            </div>
            <div className="flex items-center gap-1">
              <BookOpen className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm">{novel.chapters} capítulos</span>
            </div>
          </div>
          <div className="mt-2 flex flex-wrap gap-2">
            {novel.genres.map((genre) => (
              <span key={genre} className="rounded-full bg-muted px-2 py-1 text-xs">
                {genre}
              </span>
            ))}
            {novel.status === "completed" && (
              <span className="rounded-full bg-green-100 text-green-800 px-2 py-1 text-xs">Completada</span>
            )}
          </div>
        </div>
        <div className="flex items-center gap-2">
          <div
            className={`flex items-center gap-1 ${
              novel.changeType === "up"
                ? "text-green-500"
                : novel.changeType === "down"
                  ? "text-red-500"
                  : "text-muted-foreground"
            }`}
          >
            {novel.changeType === "up" && <ArrowUp className="h-4 w-4" />}
            {novel.changeType === "down" && <ArrowDown className="h-4 w-4" />}
            <span className="text-sm font-medium">{novel.change}</span>
          </div>
          <Button variant="outline" size="sm" asChild>
            <Link href={`/novel/${novel.id}`}>Ver</Link>
          </Button>
        </div>
      </div>
    </Card>
  )

  const renderTabContent = (category: keyof typeof allData, icon: React.ReactNode, title: string) => {
    const novels = allData[category].slice(0, displayCounts[category])
    const hasMore = displayCounts[category] < allData[category].length
    const isLoading = loadingStates[category]

    return (
      <TabsContent value={category} className="mt-6">
        <div className="mb-4 flex items-center gap-2">
          {icon}
          <h2 className="text-xl font-semibold">{title}</h2>
          <span className="text-sm text-muted-foreground">({allData[category].length} novelas)</span>
        </div>
        <div className="space-y-6">{novels.map((novel, index) => renderNovelCard(novel, index))}</div>
        {hasMore && (
          <div className="mt-8 flex justify-center">
            <Button
              variant="outline"
              onClick={() => handleLoadMore(category)}
              disabled={isLoading}
              className="min-w-[120px]"
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Cargando...
                </>
              ) : (
                "Cargar más"
              )}
            </Button>
          </div>
        )}
        {!hasMore && novels.length > 10 && (
          <div className="mt-8 flex justify-center">
            <p className="text-sm text-muted-foreground">Has visto todas las novelas en esta categoría</p>
          </div>
        )}
      </TabsContent>
    )
  }

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
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="popular" className="gap-2">
                <Fire className="h-4 w-4" />
                <span className="hidden sm:inline">Populares</span>
              </TabsTrigger>
              <TabsTrigger value="rated" className="gap-2">
                <Star className="h-4 w-4" />
                <span className="hidden sm:inline">Mejor Valoradas</span>
              </TabsTrigger>
              <TabsTrigger value="trending" className="gap-2">
                <TrendingUp className="h-4 w-4" />
                <span className="hidden sm:inline">Tendencia</span>
              </TabsTrigger>
              <TabsTrigger value="completed" className="gap-2">
                <BookOpen className="h-4 w-4" />
                <span className="hidden sm:inline">Completadas</span>
              </TabsTrigger>
            </TabsList>

            {renderTabContent("popular", <Fire className="h-5 w-5 text-red-500" />, "Novelas Más Populares")}
            {renderTabContent("rated", <Star className="h-5 w-5 text-yellow-500" />, "Mejor Valoradas")}
            {renderTabContent("trending", <TrendingUp className="h-5 w-5 text-green-500" />, "En Tendencia")}
            {renderTabContent("completed", <BookOpen className="h-5 w-5 text-blue-500" />, "Novelas Completadas")}
          </Tabs>
        </div>
      </main>
      <SiteFooter />
    </div>
  )
}
