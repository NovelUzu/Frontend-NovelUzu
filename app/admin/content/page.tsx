"use client"

import { useState } from "react"
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Search,
  MoreHorizontal,
  BookPlus,
  Filter,
  Eye,
  Edit,
  Trash2,
  ThumbsUp,
  ThumbsDown,
  AlertTriangle,
  BookOpen,
  MessageSquare,
  Tag,
} from "lucide-react"
import { useToast } from "@/components/ui/use-toast"

// Datos de ejemplo
const mockNovels = [
  {
    id: 1,
    title: "El Camino del Héroe",
    author: "Ana García",
    genre: "Fantasía",
    status: "published",
    chapters: 24,
    views: 15420,
    likes: 876,
    date: "2023-03-15",
  },
  {
    id: 2,
    title: "Sombras del Pasado",
    author: "Carlos Rodríguez",
    genre: "Misterio",
    status: "published",
    chapters: 18,
    views: 8750,
    likes: 543,
    date: "2023-04-02",
  },
  {
    id: 3,
    title: "Destino Estelar",
    author: "Elena Martínez",
    genre: "Ciencia Ficción",
    status: "draft",
    chapters: 12,
    views: 0,
    likes: 0,
    date: "2023-05-10",
  },
  {
    id: 4,
    title: "Corazones Rotos",
    author: "David López",
    genre: "Romance",
    status: "published",
    chapters: 30,
    views: 22150,
    likes: 1245,
    date: "2023-02-20",
  },
  {
    id: 5,
    title: "El Último Suspiro",
    author: "Sofía Pérez",
    genre: "Terror",
    status: "flagged",
    chapters: 15,
    views: 6320,
    likes: 421,
    date: "2023-04-18",
  },
  {
    id: 6,
    title: "Mundos Paralelos",
    author: "Miguel Sánchez",
    genre: "Fantasía",
    status: "published",
    chapters: 22,
    views: 11830,
    likes: 732,
    date: "2023-03-25",
  },
]

const mockComments = [
  {
    id: 1,
    user: "Elena Martínez",
    novel: "El Camino del Héroe",
    chapter: "Capítulo 15",
    content: "Me encantó este giro en la trama, ¡no lo esperaba!",
    status: "approved",
    date: "2023-05-12",
    reports: 0,
  },
  {
    id: 2,
    user: "David López",
    novel: "Sombras del Pasado",
    chapter: "Capítulo 8",
    content: "Creo que hay un error en la cronología de eventos.",
    status: "approved",
    date: "2023-05-11",
    reports: 0,
  },
  {
    id: 3,
    user: "Sofía Pérez",
    novel: "Corazones Rotos",
    chapter: "Capítulo 22",
    content: "Este contenido es inapropiado y ofensivo.",
    status: "flagged",
    date: "2023-05-10",
    reports: 3,
  },
  {
    id: 4,
    user: "Miguel Sánchez",
    novel: "El Último Suspiro",
    chapter: "Capítulo 7",
    content: "La descripción es demasiado gráfica y violenta.",
    status: "flagged",
    date: "2023-05-09",
    reports: 5,
  },
  {
    id: 5,
    user: "Laura Gómez",
    novel: "Mundos Paralelos",
    chapter: "Capítulo 12",
    content: "Excelente desarrollo de personajes, me encanta cómo evoluciona la protagonista.",
    status: "approved",
    date: "2023-05-13",
    reports: 0,
  },
]

const mockTags = [
  { id: 1, name: "Fantasía Épica", novels: 45, status: "active" },
  { id: 2, name: "Romance Histórico", novels: 32, status: "active" },
  { id: 3, name: "Ciencia Ficción Espacial", novels: 28, status: "active" },
  { id: 4, name: "Terror Psicológico", novels: 19, status: "active" },
  { id: 5, name: "Contenido Adulto", novels: 24, status: "restricted" },
  { id: 6, name: "Violencia Explícita", novels: 15, status: "restricted" },
  { id: 7, name: "Aventura Medieval", novels: 37, status: "active" },
  { id: 8, name: "Distopía", novels: 22, status: "active" },
]

export default function AdminContentPage() {
  const [activeTab, setActiveTab] = useState("novels")
  const [searchTerm, setSearchTerm] = useState("")
  const { toast } = useToast()

  // Función para aprobar/rechazar contenido
  const moderateContent = (type: string, id: number, action: string) => {
    toast({
      title: `Contenido ${action === "approve" ? "aprobado" : "rechazado"}`,
      description: `El ${type} ha sido ${action === "approve" ? "aprobado" : "rechazado"} correctamente.`,
    })
  }

  // Función para cambiar el estado de una etiqueta
  const changeTagStatus = (id: number, newStatus: string) => {
    toast({
      title: "Estado de etiqueta actualizado",
      description: `La etiqueta ha sido ${newStatus === "active" ? "activada" : "restringida"}.`,
    })
  }

  return (
    <div className="container mx-auto p-4 space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h1 className="text-2xl font-bold">Gestión de Contenido</h1>
        <Button className="flex items-center gap-2">
          <BookPlus size={16} />
          <span>Añadir Contenido</span>
        </Button>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="novels" className="flex items-center gap-2">
            <BookOpen size={16} />
            <span>Novelas</span>
          </TabsTrigger>
          <TabsTrigger value="comments" className="flex items-center gap-2">
            <MessageSquare size={16} />
            <span>Comentarios</span>
          </TabsTrigger>
          <TabsTrigger value="tags" className="flex items-center gap-2">
            <Tag size={16} />
            <span>Etiquetas</span>
          </TabsTrigger>
        </TabsList>

        {/* Pestaña de Novelas */}
        <TabsContent value="novels" className="space-y-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="md:flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={18} />
              <Input
                placeholder="Buscar novelas..."
                className="pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            <Select defaultValue="all">
              <SelectTrigger className="w-full md:w-[180px]">
                <div className="flex items-center gap-2">
                  <Filter size={16} />
                  <SelectValue placeholder="Estado" />
                </div>
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos</SelectItem>
                <SelectItem value="published">Publicados</SelectItem>
                <SelectItem value="draft">Borradores</SelectItem>
                <SelectItem value="flagged">Reportados</SelectItem>
              </SelectContent>
            </Select>

            <Select defaultValue="all">
              <SelectTrigger className="w-full md:w-[180px]">
                <div className="flex items-center gap-2">
                  <Filter size={16} />
                  <SelectValue placeholder="Género" />
                </div>
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos</SelectItem>
                <SelectItem value="fantasy">Fantasía</SelectItem>
                <SelectItem value="mystery">Misterio</SelectItem>
                <SelectItem value="scifi">Ciencia Ficción</SelectItem>
                <SelectItem value="romance">Romance</SelectItem>
                <SelectItem value="horror">Terror</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="rounded-md border">
            <Table>
              <TableCaption>Lista de novelas en la plataforma</TableCaption>
              <TableHeader>
                <TableRow>
                  <TableHead>Título</TableHead>
                  <TableHead>Autor</TableHead>
                  <TableHead>Género</TableHead>
                  <TableHead>Estado</TableHead>
                  <TableHead>Capítulos</TableHead>
                  <TableHead>Vistas</TableHead>
                  <TableHead>Fecha</TableHead>
                  <TableHead className="text-right">Acciones</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {mockNovels.map((novel) => (
                  <TableRow key={novel.id}>
                    <TableCell className="font-medium">{novel.title}</TableCell>
                    <TableCell>{novel.author}</TableCell>
                    <TableCell>{novel.genre}</TableCell>
                    <TableCell>
                      <Badge
                        variant={
                          novel.status === "published"
                            ? "outline"
                            : novel.status === "draft"
                              ? "secondary"
                              : "destructive"
                        }
                      >
                        {novel.status === "published"
                          ? "Publicado"
                          : novel.status === "draft"
                            ? "Borrador"
                            : "Reportado"}
                      </Badge>
                    </TableCell>
                    <TableCell>{novel.chapters}</TableCell>
                    <TableCell>{novel.views.toLocaleString()}</TableCell>
                    <TableCell>{novel.date}</TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" className="h-8 w-8 p-0">
                            <span className="sr-only">Abrir menú</span>
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuLabel>Acciones</DropdownMenuLabel>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem onClick={() => (window.location.href = `/novel/${novel.id}`)}>
                            <Eye className="mr-2 h-4 w-4" />
                            <span>Ver novela</span>
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Edit className="mr-2 h-4 w-4" />
                            <span>Editar</span>
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Trash2 className="mr-2 h-4 w-4" />
                            <span>Eliminar</span>
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem onClick={() => moderateContent("novela", novel.id, "approve")}>
                            <ThumbsUp className="mr-2 h-4 w-4" />
                            <span>Aprobar</span>
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => moderateContent("novela", novel.id, "reject")}>
                            <ThumbsDown className="mr-2 h-4 w-4" />
                            <span>Rechazar</span>
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <AlertTriangle className="mr-2 h-4 w-4" />
                            <span>Marcar como inapropiado</span>
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </TabsContent>

        {/* Pestaña de Comentarios */}
        <TabsContent value="comments" className="space-y-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="md:flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={18} />
              <Input
                placeholder="Buscar comentarios..."
                className="pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            <Select defaultValue="all">
              <SelectTrigger className="w-full md:w-[180px]">
                <div className="flex items-center gap-2">
                  <Filter size={16} />
                  <SelectValue placeholder="Estado" />
                </div>
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos</SelectItem>
                <SelectItem value="approved">Aprobados</SelectItem>
                <SelectItem value="flagged">Reportados</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="rounded-md border">
            <Table>
              <TableCaption>Lista de comentarios en la plataforma</TableCaption>
              <TableHeader>
                <TableRow>
                  <TableHead>Usuario</TableHead>
                  <TableHead>Novela</TableHead>
                  <TableHead>Capítulo</TableHead>
                  <TableHead>Comentario</TableHead>
                  <TableHead>Estado</TableHead>
                  <TableHead>Reportes</TableHead>
                  <TableHead>Fecha</TableHead>
                  <TableHead className="text-right">Acciones</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {mockComments.map((comment) => (
                  <TableRow key={comment.id}>
                    <TableCell className="font-medium">{comment.user}</TableCell>
                    <TableCell>{comment.novel}</TableCell>
                    <TableCell>{comment.chapter}</TableCell>
                    <TableCell className="max-w-[200px] truncate">{comment.content}</TableCell>
                    <TableCell>
                      <Badge variant={comment.status === "approved" ? "outline" : "destructive"}>
                        {comment.status === "approved" ? "Aprobado" : "Reportado"}
                      </Badge>
                    </TableCell>
                    <TableCell>{comment.reports}</TableCell>
                    <TableCell>{comment.date}</TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" className="h-8 w-8 p-0">
                            <span className="sr-only">Abrir menú</span>
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuLabel>Acciones</DropdownMenuLabel>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem onClick={() => moderateContent("comentario", comment.id, "approve")}>
                            <ThumbsUp className="mr-2 h-4 w-4" />
                            <span>Aprobar</span>
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => moderateContent("comentario", comment.id, "reject")}>
                            <ThumbsDown className="mr-2 h-4 w-4" />
                            <span>Rechazar</span>
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Trash2 className="mr-2 h-4 w-4" />
                            <span>Eliminar</span>
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </TabsContent>

        {/* Pestaña de Etiquetas */}
        <TabsContent value="tags" className="space-y-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="md:flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={18} />
              <Input
                placeholder="Buscar etiquetas..."
                className="pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            <Select defaultValue="all">
              <SelectTrigger className="w-full md:w-[180px]">
                <div className="flex items-center gap-2">
                  <Filter size={16} />
                  <SelectValue placeholder="Estado" />
                </div>
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos</SelectItem>
                <SelectItem value="active">Activos</SelectItem>
                <SelectItem value="restricted">Restringidos</SelectItem>
              </SelectContent>
            </Select>

            <Button className="flex items-center gap-2">
              <Tag size={16} />
              <span>Nueva Etiqueta</span>
            </Button>
          </div>

          <div className="rounded-md border">
            <Table>
              <TableCaption>Lista de etiquetas en la plataforma</TableCaption>
              <TableHeader>
                <TableRow>
                  <TableHead>Nombre</TableHead>
                  <TableHead>Novelas</TableHead>
                  <TableHead>Estado</TableHead>
                  <TableHead className="text-right">Acciones</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {mockTags.map((tag) => (
                  <TableRow key={tag.id}>
                    <TableCell className="font-medium">{tag.name}</TableCell>
                    <TableCell>{tag.novels}</TableCell>
                    <TableCell>
                      <Badge variant={tag.status === "active" ? "outline" : "destructive"}>
                        {tag.status === "active" ? "Activo" : "Restringido"}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" className="h-8 w-8 p-0">
                            <span className="sr-only">Abrir menú</span>
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuLabel>Acciones</DropdownMenuLabel>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem>
                            <Edit className="mr-2 h-4 w-4" />
                            <span>Editar</span>
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Trash2 className="mr-2 h-4 w-4" />
                            <span>Eliminar</span>
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem onClick={() => changeTagStatus(tag.id, "active")}>
                            <ThumbsUp className="mr-2 h-4 w-4" />
                            <span>Activar</span>
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => changeTagStatus(tag.id, "restricted")}>
                            <AlertTriangle className="mr-2 h-4 w-4" />
                            <span>Restringir</span>
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
