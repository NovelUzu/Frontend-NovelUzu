"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import {
  Bold,
  BookOpen,
  ChevronDown,
  Heading1,
  Heading2,
  ImageIcon,
  Italic,
  List,
  ListOrdered,
  Save,
  Settings,
  Undo,
} from "lucide-react"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"

export default function AuthorWritePage() {
  const router = useRouter()
  const [isPublishing, setIsPublishing] = useState(false)
  const [chapterTitle, setChapterTitle] = useState("El Despertar del Héroe")
  const [chapterContent, setChapterContent] = useState(
    'La luz del amanecer se filtraba por las rendijas de la ventana, iluminando tenuemente la pequeña habitación donde Aron dormía. Los rayos dorados bailaban sobre su rostro, como si intentaran despertarlo con suavidad antes de la tormenta que estaba por venir.\n\nAron se despertó sobresaltado, con el corazón latiendo furiosamente contra su pecho. El sueño había sido tan vívido, tan real, que por un momento no supo distinguir si seguía dormido o ya estaba despierto. En su mente aún resonaban las palabras del anciano de túnica blanca: "El tiempo ha llegado, joven héroe. El destino del mundo descansa sobre tus hombros".\n\n—Solo fue un sueño —murmuró para sí mismo, pasándose una mano por el cabello húmedo de sudor—. Solo un sueño más.',
  )

  const handlePublish = async () => {
    setIsPublishing(true)
    // Simulación de publicación
    await new Promise((resolve) => setTimeout(resolve, 1500))
    setIsPublishing(false)
    router.push("/author/1")
  }

  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center">
          <Link href="/" className="flex items-center gap-2 font-bold text-xl">
            <BookOpen className="h-6 w-6" />
            <span>NovelUzu</span>
          </Link>
          <div className="ml-4 flex items-center gap-2">
            <Select defaultValue="el-ascenso-del-heroe">
              <SelectTrigger className="w-[200px]">
                <SelectValue placeholder="Seleccionar novela" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="el-ascenso-del-heroe">El Ascenso del Héroe Legendario</SelectItem>
                <SelectItem value="cronicas-del-reino">Crónicas del Reino Olvidado</SelectItem>
                <SelectItem value="nueva-novela">+ Nueva novela</SelectItem>
              </SelectContent>
            </Select>
            <Select defaultValue="capitulo-1">
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Seleccionar capítulo" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="capitulo-1">Capítulo 1</SelectItem>
                <SelectItem value="capitulo-2">Capítulo 2</SelectItem>
                <SelectItem value="capitulo-3">Capítulo 3</SelectItem>
                <SelectItem value="nuevo-capitulo">+ Nuevo capítulo</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="ml-auto flex items-center gap-2">
            <Button variant="outline" size="sm" className="gap-2">
              <Settings className="h-4 w-4" />
              Configuración
            </Button>
            <Avatar>
              <AvatarImage src="/placeholder.svg?height=32&width=32&text=A" alt="@autor" />
              <AvatarFallback>A</AvatarFallback>
            </Avatar>
          </div>
        </div>
      </header>
      <main className="flex-1">
        <div className="container grid grid-cols-1 gap-6 px-4 py-6 md:grid-cols-[300px_1fr] md:px-6 md:py-8 lg:grid-cols-[350px_1fr]">
          <div className="order-2 md:order-1">
            <div className="sticky top-24 space-y-6">
              <div className="rounded-lg border p-4">
                <h2 className="mb-4 font-semibold">Información del Capítulo</h2>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="chapter-number">Número de Capítulo</Label>
                    <Input id="chapter-number" type="number" defaultValue="1" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="chapter-title">Título del Capítulo</Label>
                    <Input
                      id="chapter-title"
                      value={chapterTitle}
                      onChange={(e) => setChapterTitle(e.target.value)}
                      placeholder="Ingresa un título para el capítulo"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="chapter-summary">Resumen (opcional)</Label>
                    <Textarea
                      id="chapter-summary"
                      placeholder="Breve resumen del capítulo"
                      className="h-20 resize-none"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Estado</Label>
                    <Select defaultValue="draft">
                      <SelectTrigger>
                        <SelectValue placeholder="Seleccionar estado" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="draft">Borrador</SelectItem>
                        <SelectItem value="published">Publicado</SelectItem>
                        <SelectItem value="scheduled">Programado</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>Visibilidad</Label>
                    <Select defaultValue="public">
                      <SelectTrigger>
                        <SelectValue placeholder="Seleccionar visibilidad" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="public">Público</SelectItem>
                        <SelectItem value="subscribers">Solo suscriptores</SelectItem>
                        <SelectItem value="private">Privado</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <Button onClick={handlePublish} disabled={isPublishing} className="gap-2">
                  <Save className="h-4 w-4" />
                  {isPublishing ? "Publicando..." : "Publicar Capítulo"}
                </Button>
                <Button variant="outline">Vista Previa</Button>
                <Button variant="ghost">Guardar como Borrador</Button>
              </div>
            </div>
          </div>
          <div className="order-1 md:order-2">
            <Tabs defaultValue="write" className="w-full">
              <div className="flex items-center justify-between">
                <TabsList>
                  <TabsTrigger value="write">Escribir</TabsTrigger>
                  <TabsTrigger value="preview">Vista Previa</TabsTrigger>
                </TabsList>
                <div className="flex items-center gap-1">
                  <Button variant="ghost" size="icon">
                    <Undo className="h-4 w-4" />
                  </Button>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="sm" className="gap-1">
                        Opciones
                        <ChevronDown className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuLabel>Opciones de Edición</DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem>Importar desde archivo</DropdownMenuItem>
                      <DropdownMenuItem>Exportar a PDF</DropdownMenuItem>
                      <DropdownMenuItem>Verificar ortografía</DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem>Estadísticas del capítulo</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
              <TabsContent value="write" className="mt-6">
                <div className="mb-4 flex flex-wrap gap-1 rounded-lg border bg-muted/40 p-1">
                  <Button variant="ghost" size="sm">
                    <Bold className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="sm">
                    <Italic className="h-4 w-4" />
                  </Button>
                  <Separator orientation="vertical" className="mx-1 h-8" />
                  <Button variant="ghost" size="sm">
                    <Heading1 className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="sm">
                    <Heading2 className="h-4 w-4" />
                  </Button>
                  <Separator orientation="vertical" className="mx-1 h-8" />
                  <Button variant="ghost" size="sm">
                    <List className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="sm">
                    <ListOrdered className="h-4 w-4" />
                  </Button>
                  <Separator orientation="vertical" className="mx-1 h-8" />
                  <Button variant="ghost" size="sm">
                    <ImageIcon className="h-4 w-4" />
                  </Button>
                </div>
                <div className="rounded-lg border">
                  <Textarea
                    value={chapterContent}
                    onChange={(e) => setChapterContent(e.target.value)}
                    placeholder="Comienza a escribir tu capítulo aquí..."
                    className="min-h-[500px] resize-none border-0 p-4 focus-visible:ring-0 focus-visible:ring-offset-0"
                  />
                </div>
                <div className="mt-2 flex justify-between text-xs text-muted-foreground">
                  <span>Palabras: {chapterContent.split(/\s+/).filter(Boolean).length}</span>
                  <span>Última actualización: Hace 5 minutos</span>
                </div>
              </TabsContent>
              <TabsContent value="preview" className="mt-6">
                <div className="rounded-lg border p-6">
                  <h1 className="mb-6 text-2xl font-bold">{chapterTitle}</h1>
                  <div className="prose max-w-none dark:prose-invert">
                    {chapterContent.split("\n\n").map((paragraph, i) => (
                      <p key={i}>{paragraph}</p>
                    ))}
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </div>
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
