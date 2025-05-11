import Link from "next/link"
import Image from "next/image"
import { BookOpen, Clock, Heart, Settings, Star } from "lucide-react"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function UserProfilePage() {
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
                        <Avatar>
                            <AvatarImage src="/placeholder.svg?height=32&width=32&text=U" alt="@usuario" />
                            <AvatarFallback>U</AvatarFallback>
                        </Avatar>
                    </div>
                </div>
            </header>
            <main className="flex-1">
                <div className="container px-4 py-8 md:px-6 md:py-12">
                    <div className="mb-8 flex flex-col items-center gap-4 sm:flex-row sm:items-start sm:gap-8">
                        <Avatar className="h-24 w-24 border-4 border-background">
                            <AvatarImage src="/placeholder.svg?height=96&width=96&text=U" alt="@usuario" />
                            <AvatarFallback>U</AvatarFallback>
                        </Avatar>
                        <div className="flex flex-1 flex-col items-center gap-2 text-center sm:items-start sm:text-left">
                            <h1 className="text-3xl font-bold">LectorÁvido</h1>
                            <p className="text-muted-foreground">Miembro desde Mayo 2023</p>
                            <div className="flex flex-wrap items-center gap-4">
                                <div className="flex items-center gap-1">
                                    <BookOpen className="h-4 w-4 text-muted-foreground" />
                                    <span className="text-sm text-muted-foreground">120 novelas leídas</span>
                                </div>
                                <div className="flex items-center gap-1">
                                    <Star className="h-4 w-4 text-muted-foreground" />
                                    <span className="text-sm text-muted-foreground">45 reseñas</span>
                                </div>
                                <div className="flex items-center gap-1">
                                    <Heart className="h-4 w-4 text-muted-foreground" />
                                    <span className="text-sm text-muted-foreground">78 favoritos</span>
                                </div>
                            </div>
                        </div>
                        <Button variant="outline" size="sm" className="gap-2">
                            <Settings className="h-4 w-4" />
                            Editar Perfil
                        </Button>
                    </div>
                    <Tabs defaultValue="biblioteca" className="w-full">
                        <TabsList className="w-full justify-start">
                            <TabsTrigger value="biblioteca">Biblioteca</TabsTrigger>
                            <TabsTrigger value="historial">Historial</TabsTrigger>
                            <TabsTrigger value="resenas">Reseñas</TabsTrigger>
                            <TabsTrigger value="favoritos">Favoritos</TabsTrigger>
                        </TabsList>
                        <TabsContent value="biblioteca" className="mt-6">
                            <div className="flex items-center justify-between">
                                <h2 className="text-xl font-semibold">Mi Biblioteca</h2>
                                <div className="flex items-center gap-2">
                                    <Button variant="outline" size="sm">
                                        Más recientes
                                    </Button>
                                    <Button variant="ghost" size="sm">
                                        Título
                                    </Button>
                                </div>
                            </div>
                            <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                                {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
                                    <Card key={i} className="overflow-hidden">
                                        <div className="relative">
                                            <Link href={`/novel/${i}`}>
                                                <Image
                                                    src={`/placeholder.svg?height=240&width=180&text=Novela ${i}`}
                                                    width={180}
                                                    height={240}
                                                    alt={`Novela ${i}`}
                                                    className="w-full object-cover transition-all hover:scale-105"
                                                />
                                            </Link>
                                            <div className="absolute top-2 right-2 flex items-center gap-1 rounded-md bg-black/60 px-2 py-1 text-xs text-white">
                                                <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                                                <span>4.{7 + (i % 3)}</span>
                                            </div>
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
                                        <CardHeader className="p-4">
                                            <CardTitle className="line-clamp-1 text-base">
                                                <Link href={`/novel/${i}`}>
                                                    {i % 2 === 0 ? "El Ascenso del Héroe Legendario" : "Crónicas del Reino Olvidado"} {i}
                                                </Link>
                                            </CardTitle>
                                        </CardHeader>
                                        <CardContent className="flex items-center justify-between p-4 pt-0">
                                            <div className="text-xs text-muted-foreground">
                                                {i % 3 === 0 ? "Leyendo" : i % 3 === 1 ? "Completado" : "Por leer"}
                                            </div>
                                            <div className="flex items-center gap-1 text-xs text-muted-foreground">
                                                <Clock className="h-3 w-3" />
                                                <span>Último: Cap. {i * 10}</span>
                                            </div>
                                        </CardContent>
                                    </Card>
                                ))}
                            </div>
                            <div className="mt-8 flex justify-center">
                                <Button variant="outline">Cargar más</Button>
                            </div>
                        </TabsContent>
                        <TabsContent value="historial" className="mt-6">
                            <div className="flex items-center justify-between">
                                <h2 className="text-xl font-semibold">Historial de Lectura</h2>
                                <Button variant="outline" size="sm">
                                    Limpiar historial
                                </Button>
                            </div>
                            <div className="mt-6 space-y-4">
                                {[1, 2, 3, 4, 5].map((i) => (
                                    <div key={i} className="flex items-start gap-4 rounded-lg border p-4">
                                        <Image
                                            src={`/placeholder.svg?height=120&width=90&text=Novela ${i}`}
                                            width={90}
                                            height={120}
                                            alt={`Novela ${i}`}
                                            className="rounded object-cover"
                                        />
                                        <div className="flex-1 space-y-2">
                                            <div>
                                                <Link href={`/novel/${i}`} className="text-lg font-medium hover:underline">
                                                    {i % 2 === 0 ? "El Ascenso del Héroe Legendario" : "Crónicas del Reino Olvidado"} {i}
                                                </Link>
                                                <p className="text-sm text-muted-foreground">
                                                    Último capítulo leído: Capítulo {i * 10}:{" "}
                                                    {i % 2 === 0 ? "El Despertar Final" : "La Prueba del Destino"}
                                                </p>
                                            </div>
                                            <div className="flex items-center justify-between">
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
                            <div className="mt-8 flex justify-center">
                                <Button variant="outline">Ver más historial</Button>
                            </div>
                        </TabsContent>
                        <TabsContent value="resenas" className="mt-6">
                            <div className="flex items-center justify-between">
                                <h2 className="text-xl font-semibold">Mis Reseñas</h2>
                                <Button variant="outline" size="sm">
                                    Más recientes
                                </Button>
                            </div>
                            <div className="mt-6 space-y-6">
                                {[1, 2, 3].map((i) => (
                                    <div key={i} className="rounded-lg border p-4">
                                        <div className="flex items-start justify-between">
                                            <div className="flex items-center gap-3">
                                                <Image
                                                    src={`/placeholder.svg?height=60&width=45&text=Novela ${i}`}
                                                    width={45}
                                                    height={60}
                                                    alt={`Novela ${i}`}
                                                    className="rounded object-cover"
                                                />
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
                                        <p className="mt-3 text-muted-foreground">
                                            {i === 1
                                                ? "Una de las mejores novelas que he leído últimamente. La trama es fascinante y los personajes están muy bien desarrollados. Cada capítulo te deja con ganas de más."
                                                : i === 2
                                                    ? "El autor tiene un estilo de escritura muy fluido y envolvente. La construcción del mundo es detallada y los giros de la trama son impredecibles."
                                                    : "Una historia interesante pero con algunos problemas de ritmo. Los personajes secundarios necesitan más desarrollo."}
                                        </p>
                                        <div className="mt-3 flex justify-end gap-2">
                                            <Button variant="ghost" size="sm">
                                                Editar
                                            </Button>
                                            <Button variant="ghost" size="sm">
                                                Eliminar
                                            </Button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <div className="mt-8 flex justify-center">
                                <Button variant="outline">Ver más reseñas</Button>
                            </div>
                        </TabsContent>
                        <TabsContent value="favoritos" className="mt-6">
                            <div className="flex items-center justify-between">
                                <h2 className="text-xl font-semibold">Mis Favoritos</h2>
                                <div className="flex items-center gap-2">
                                    <Button variant="outline" size="sm">
                                        Más recientes
                                    </Button>
                                    <Button variant="ghost" size="sm">
                                        Título
                                    </Button>
                                </div>
                            </div>
                            <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                                {[1, 2, 3, 4, 5, 6].map((i) => (
                                    <Card key={i} className="overflow-hidden">
                                        <div className="relative">
                                            <Link href={`/novel/${i}`}>
                                                <Image
                                                    src={`/placeholder.svg?height=240&width=180&text=Favorito ${i}`}
                                                    width={180}
                                                    height={240}
                                                    alt={`Novela Favorita ${i}`}
                                                    className="w-full object-cover transition-all hover:scale-105"
                                                />
                                            </Link>
                                            <div className="absolute top-2 right-2 flex items-center gap-1 rounded-md bg-black/60 px-2 py-1 text-xs text-white">
                                                <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                                                <span>4.{9 - (i % 2)}</span>
                                            </div>
                                            <Button
                                                variant="ghost"
                                                size="icon"
                                                className="absolute bottom-2 right-2 h-8 w-8 rounded-full bg-black/60 text-white hover:bg-black/80"
                                            >
                                                <Heart className="h-4 w-4 fill-red-500 text-red-500" />
                                                <span className="sr-only">Quitar de favoritos</span>
                                            </Button>
                                        </div>
                                        <CardHeader className="p-4">
                                            <CardTitle className="line-clamp-1 text-base">
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
                                        <CardContent className="p-4 pt-0">
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
                            <div className="mt-8 flex justify-center">
                                <Button variant="outline">Cargar más</Button>
                            </div>
                        </TabsContent>
                    </Tabs>
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
