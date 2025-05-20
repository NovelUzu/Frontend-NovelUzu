"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { BookOpen, Clock, Search, Trash2, Eye, BookMarked, Star } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { useAuth, type LibraryItem } from "@/lib/auth-context"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { toast } from "@/components/ui/use-toast"

// Datos de ejemplo para la biblioteca
const mockLibrary: LibraryItem[] = [
    {
        novelId: "1",
        title: "El Ascenso del Héroe Legendario",
        coverUrl: "/placeholder.jpg?height=240&width=180&text=Novela 1",
        addedAt: "2023-05-10T14:32:00Z",
        lastReadChapter: 5,
        progress: 25,
    },
    {
        novelId: "2",
        title: "Crónicas del Reino Olvidado",
        coverUrl: "/placeholder.jpg?height=240&width=180&text=Novela 2",
        addedAt: "2023-05-15T10:45:00Z",
        lastReadChapter: 12,
        progress: 60,
    },
    {
        novelId: "3",
        title: "El Último Hechicero",
        coverUrl: "/placeholder.jpg?height=240&width=180&text=Novela 3",
        addedAt: "2023-05-18T08:15:00Z",
    },
    {
        novelId: "4",
        title: "La Leyenda del Guerrero Místico",
        coverUrl: "/placeholder.jpg?height=240&width=180&text=Novela 4",
        addedAt: "2023-04-10T16:20:00Z",
        lastReadChapter: 3,
        progress: 15,
    },
    {
        novelId: "5",
        title: "Reinos en Guerra",
        coverUrl: "/placeholder.jpg?height=240&width=180&text=Novela 5",
        addedAt: "2023-05-17T11:30:00Z",
        lastReadChapter: 8,
        progress: 40,
    },
    {
        novelId: "6",
        title: "El Despertar de los Dragones",
        coverUrl: "/placeholder.jpg?height=240&width=180&text=Novela 6",
        addedAt: "2023-05-15T09:20:00Z",
    },
    {
        novelId: "7",
        title: "La Espada del Destino",
        coverUrl: "/placeholder.jpg?height=240&width=180&text=Novela 7",
        addedAt: "2023-04-05T14:10:00Z",
        lastReadChapter: 20,
        progress: 80,
    },
    {
        novelId: "8",
        title: "Cazadores de Sombras",
        coverUrl: "/placeholder.jpg?height=240&width=180&text=Novela 8",
        addedAt: "2023-05-16T17:45:00Z",
    },
]

export default function UserLibraryPage() {
    const router = useRouter()
    const { user, isAuthenticated, isLoading, removeFromLibrary } = useAuth()
    const [library, setLibrary] = useState<LibraryItem[]>([])
    const [searchTerm, setSearchTerm] = useState("")
    const [statusFilter, setStatusFilter] = useState("all")
    const [sortBy, setSortBy] = useState("recent")

    // Cargar biblioteca
    useEffect(() => {
        if (!isLoading) {
            if (!isAuthenticated) {
                router.push("/login?callbackUrl=/user/library")
                return
            }

            // En una implementación real, obtendríamos la biblioteca del usuario
            // Por ahora, usamos datos de ejemplo
            setLibrary(mockLibrary)
        }
    }, [isLoading, isAuthenticated, router])

    // Filtrar y ordenar la biblioteca
    const filteredLibrary = library
        .filter((item) => {
            const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase())
            const matchesStatus =
                statusFilter === "all" ||
                (statusFilter === "reading" && item.progress && item.progress > 0 && item.progress < 100) ||
                (statusFilter === "completed" && item.progress === 100) ||
                (statusFilter === "plan_to_read" && (!item.progress || item.progress === 0))

            return matchesSearch && matchesStatus
        })
        .sort((a, b) => {
            if (sortBy === "recent") {
                return new Date(b.addedAt).getTime() - new Date(a.addedAt).getTime()
            } else if (sortBy === "title") {
                return a.title.localeCompare(b.title)
            } else if (sortBy === "progress") {
                const progressA = a.progress || 0
                const progressB = b.progress || 0
                return progressB - progressA
            }
            return 0
        })

    // Eliminar de la biblioteca
    const handleRemoveFromLibrary = (novelId: string, title: string) => {
        removeFromLibrary(novelId)
        setLibrary(library.filter((item) => item.novelId !== novelId))
        toast({
            title: "Eliminado de la biblioteca",
            description: `"${title}" ha sido eliminado de tu biblioteca.`,
            duration: 3000,
        })
    }

    // Formatear fecha
    const formatDate = (dateString: string) => {
        const date = new Date(dateString)
        return new Intl.DateTimeFormat("es-ES", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
        }).format(date)
    }

    // Obtener estado de lectura
    const getReadingStatus = (item: LibraryItem) => {
        if (!item.progress || item.progress === 0) {
            return "Por leer"
        } else if (item.progress === 100) {
            return "Completado"
        } else {
            return "Leyendo"
        }
    }

    // Obtener clase de estado
    const getStatusClass = (item: LibraryItem) => {
        if (!item.progress || item.progress === 0) {
            return "bg-gray-100 text-gray-800"
        } else if (item.progress === 100) {
            return "bg-green-100 text-green-800"
        } else {
            return "bg-blue-100 text-blue-800"
        }
    }

    if (isLoading) {
        return (
            <div className="flex min-h-screen flex-col">
                <SiteHeader />
                <main className="flex-1 flex items-center justify-center">
                    <div className="text-center">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
                        <p className="mt-4 text-muted-foreground">Cargando biblioteca...</p>
                    </div>
                </main>
                <SiteFooter />
            </div>
        )
    }

    return (
        <div className="flex min-h-screen flex-col">
            <SiteHeader />
            <main className="flex-1">
                <div className="container px-4 py-6 md:px-6 md:py-12">
                    <div className="mb-8">
                        <h1 className="text-3xl font-bold mb-2">Mi Biblioteca</h1>
                        <p className="text-muted-foreground">
                            Gestiona tus novelas guardadas, organiza tu colección y lleva un seguimiento de tu progreso de lectura.
                        </p>
                    </div>

                    {/* Filtros y búsqueda */}
                    <div className="mb-8 grid gap-4 md:grid-cols-4">
                        <div className="md:col-span-2">
                            <div className="relative">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                                <Input
                                    placeholder="Buscar en tu biblioteca..."
                                    className="pl-10"
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                />
                            </div>
                        </div>
                        <div>
                            <Select value={statusFilter} onValueChange={setStatusFilter}>
                                <SelectTrigger>
                                    <SelectValue placeholder="Estado de lectura" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="all">Todos los estados</SelectItem>
                                    <SelectItem value="reading">Leyendo</SelectItem>
                                    <SelectItem value="completed">Completados</SelectItem>
                                    <SelectItem value="plan_to_read">Por leer</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <div>
                            <Select value={sortBy} onValueChange={setSortBy}>
                                <SelectTrigger>
                                    <SelectValue placeholder="Ordenar por" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="recent">Más recientes</SelectItem>
                                    <SelectItem value="title">Título</SelectItem>
                                    <SelectItem value="progress">Progreso</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>

                    {/* Vista de biblioteca */}
                    <Tabs defaultValue="grid" className="w-full">
                        <div className="flex justify-between items-center mb-6">
                            <TabsList>
                                <TabsTrigger value="grid" className="flex items-center gap-2">
                                    <BookMarked className="h-4 w-4" />
                                    <span>Cuadrícula</span>
                                </TabsTrigger>
                                <TabsTrigger value="list" className="flex items-center gap-2">
                                    <BookOpen className="h-4 w-4" />
                                    <span>Lista</span>
                                </TabsTrigger>
                            </TabsList>
                            <p className="text-sm text-muted-foreground">
                                {filteredLibrary.length} {filteredLibrary.length === 1 ? "novela" : "novelas"}
                            </p>
                        </div>

                        {/* Vista de cuadrícula */}
                        <TabsContent value="grid">
                            {filteredLibrary.length === 0 ? (
                                <div className="text-center py-12">
                                    <BookOpen className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                                    <h3 className="text-lg font-medium mb-2">Tu biblioteca está vacía</h3>
                                    <p className="text-muted-foreground mb-6">
                                        No has añadido ninguna novela a tu biblioteca o no hay coincidencias con tu búsqueda.
                                    </p>
                                    <Button asChild>
                                        <Link href="/explore">Explorar novelas</Link>
                                    </Button>
                                </div>
                            ) : (
                                <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:gap-6 lg:grid-cols-4 xl:grid-cols-5">
                                    {filteredLibrary.map((item) => (
                                        <Card key={item.novelId} className="overflow-hidden h-full flex flex-col">
                                            <div className="relative">
                                                <Link href={`/novel/${item.novelId}`}>
                                                    <div className="relative aspect-[3/4] w-full">
                                                        <Image
                                                            src={item.coverUrl || "/placeholder.jpg"}
                                                            fill
                                                            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                                                            alt={item.title}
                                                            className="object-cover transition-all hover:scale-105"
                                                        />
                                                    </div>
                                                </Link>
                                                {/* Badge de estado */}
                                                <Badge className={`absolute top-2 left-2 ${getStatusClass(item)}`}>
                                                    {getReadingStatus(item)}
                                                </Badge>

                                                {/* Menú de acciones */}
                                                <DropdownMenu>
                                                    <DropdownMenuTrigger asChild>
                                                        <Button
                                                            variant="ghost"
                                                            size="icon"
                                                            className="absolute top-2 right-2 h-8 w-8 rounded-full bg-black/60 text-white hover:bg-black/80"
                                                        >
                                                            <svg
                                                                xmlns="http://www.w3.org/2000/svg"
                                                                width="24"
                                                                height="24"
                                                                viewBox="0 0 24 24"
                                                                fill="none"
                                                                stroke="currentColor"
                                                                strokeWidth="2"
                                                                strokeLinecap="round"
                                                                strokeLinejoin="round"
                                                                className="h-4 w-4"
                                                            >
                                                                <circle cx="12" cy="12" r="1" />
                                                                <circle cx="19" cy="12" r="1" />
                                                                <circle cx="5" cy="12" r="1" />
                                                            </svg>
                                                            <span className="sr-only">Opciones</span>
                                                        </Button>
                                                    </DropdownMenuTrigger>
                                                    <DropdownMenuContent align="end">
                                                        <DropdownMenuItem asChild>
                                                            <Link href={`/novel/${item.novelId}`} className="flex items-center">
                                                                <Eye className="mr-2 h-4 w-4" />
                                                                <span>Ver detalles</span>
                                                            </Link>
                                                        </DropdownMenuItem>
                                                        <DropdownMenuItem asChild>
                                                            <Link
                                                                href={`/novel/${item.novelId}/chapter/${item.lastReadChapter || 1}`}
                                                                className="flex items-center"
                                                            >
                                                                <BookOpen className="mr-2 h-4 w-4" />
                                                                <span>{item.lastReadChapter ? "Continuar leyendo" : "Comenzar a leer"}</span>
                                                            </Link>
                                                        </DropdownMenuItem>
                                                        <DropdownMenuItem
                                                            onClick={() => handleRemoveFromLibrary(item.novelId, item.title)}
                                                            className="text-red-600 focus:text-red-600"
                                                        >
                                                            <Trash2 className="mr-2 h-4 w-4" />
                                                            <span>Eliminar</span>
                                                        </DropdownMenuItem>
                                                    </DropdownMenuContent>
                                                </DropdownMenu>

                                                {/* Barra de progreso */}
                                                {item.progress !== undefined && (
                                                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-3">
                                                        <div className="flex items-center justify-between text-white">
                                                            <div className="text-xs">Progreso</div>
                                                            <div className="text-xs">{item.progress}%</div>
                                                        </div>
                                                        <Progress value={item.progress} className="h-1 w-full" />
                                                    </div>
                                                )}
                                            </div>
                                            <CardHeader className="p-3 sm:p-4">
                                                <CardTitle className="line-clamp-1 text-sm sm:text-base">
                                                    <Link href={`/novel/${item.novelId}`}>{item.title}</Link>
                                                </CardTitle>
                                            </CardHeader>
                                            <CardContent className="flex items-center justify-between p-3 sm:p-4 pt-0 mt-auto">
                                                <div className="text-xs text-muted-foreground">Añadido: {formatDate(item.addedAt)}</div>
                                                {item.lastReadChapter && (
                                                    <div className="flex items-center gap-1 text-xs text-muted-foreground">
                                                        <Clock className="h-3 w-3" />
                                                        <span>Cap. {item.lastReadChapter}</span>
                                                    </div>
                                                )}
                                            </CardContent>
                                        </Card>
                                    ))}
                                </div>
                            )}
                        </TabsContent>

                        {/* Vista de lista */}
                        <TabsContent value="list">
                            {filteredLibrary.length === 0 ? (
                                <div className="text-center py-12">
                                    <BookOpen className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                                    <h3 className="text-lg font-medium mb-2">Tu biblioteca está vacía</h3>
                                    <p className="text-muted-foreground mb-6">
                                        No has añadido ninguna novela a tu biblioteca o no hay coincidencias con tu búsqueda.
                                    </p>
                                    <Button asChild>
                                        <Link href="/explore">Explorar novelas</Link>
                                    </Button>
                                </div>
                            ) : (
                                <div className="space-y-4">
                                    {filteredLibrary.map((item) => (
                                        <div
                                            key={item.novelId}
                                            className="flex flex-col sm:flex-row items-start gap-4 rounded-lg border p-4"
                                        >
                                            {/* Imagen de portada */}
                                            <div className="relative w-full sm:w-auto mx-auto sm:mx-0 max-w-[120px] aspect-[3/4]">
                                                <Image
                                                    src={item.coverUrl || "/placeholder.jpg"}
                                                    fill
                                                    sizes="(max-width: 640px) 120px, 90px"
                                                    alt={item.title}
                                                    className="rounded object-cover"
                                                />
                                                <Badge className={`absolute top-2 left-2 ${getStatusClass(item)}`}>
                                                    {getReadingStatus(item)}
                                                </Badge>
                                            </div>

                                            {/* Información del libro */}
                                            <div className="flex-1 space-y-2 w-full">
                                                <div>
                                                    <Link
                                                        href={`/novel/${item.novelId}`}
                                                        className="text-base sm:text-lg font-medium hover:underline"
                                                    >
                                                        {item.title}
                                                    </Link>
                                                    <div className="flex items-center gap-2 mt-1">
                                                        <div className="flex items-center gap-1">
                                                            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                                                            <span className="text-sm">4.7</span>
                                                        </div>
                                                        <span className="text-xs text-muted-foreground">Añadido: {formatDate(item.addedAt)}</span>
                                                    </div>
                                                    {item.lastReadChapter && (
                                                        <p className="text-sm text-muted-foreground mt-1">
                                                            Último capítulo leído: Capítulo {item.lastReadChapter}
                                                        </p>
                                                    )}
                                                </div>

                                                {/* Barra de progreso */}
                                                {item.progress !== undefined && (
                                                    <div className="w-full">
                                                        <div className="flex items-center justify-between">
                                                            <div className="text-xs text-muted-foreground">Progreso</div>
                                                            <div className="text-xs text-muted-foreground">{item.progress}%</div>
                                                        </div>
                                                        <Progress value={item.progress} className="h-1 w-full" />
                                                    </div>
                                                )}

                                                {/* Botones de acción */}
                                                <div className="flex flex-wrap gap-2 mt-2">
                                                    <Button size="sm" asChild>
                                                        <Link href={`/novel/${item.novelId}/chapter/${item.lastReadChapter || 1}`}>
                                                            {item.lastReadChapter ? "Continuar leyendo" : "Comenzar a leer"}
                                                        </Link>
                                                    </Button>
                                                    <Button size="sm" variant="outline" asChild>
                                                        <Link href={`/novel/${item.novelId}`}>Ver detalles</Link>
                                                    </Button>
                                                    <Button
                                                        size="sm"
                                                        variant="outline"
                                                        className="text-red-600 border-red-200 hover:bg-red-50 hover:text-red-700"
                                                        onClick={() => handleRemoveFromLibrary(item.novelId, item.title)}
                                                    >
                                                        <Trash2 className="h-4 w-4 mr-2" />
                                                        Eliminar
                                                    </Button>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </TabsContent>
                    </Tabs>
                </div>
            </main>
            <SiteFooter />
        </div>
    )
}
