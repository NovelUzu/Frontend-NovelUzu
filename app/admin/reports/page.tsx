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
  Filter,
  Eye,
  ThumbsUp,
  ThumbsDown,
  AlertTriangle,
  BookOpen,
  MessageSquare,
  User,
  Calendar,
} from "lucide-react"
import { useToast } from "@/components/ui/use-toast"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"

// Datos de ejemplo
const mockReports = [
  {
    id: 1,
    type: "content",
    reason: "Contenido inapropiado",
    reporter: "Carlos Rodríguez",
    reporterEmail: "carlos@example.com",
    reportedItem: "El Despertar del Dragón (Capítulo 5)",
    reportedItemType: "chapter",
    reportedItemId: 105,
    status: "pending",
    date: "2023-05-15",
    description:
      "El capítulo contiene lenguaje inapropiado y escenas violentas explícitas que no están marcadas con advertencia.",
    priority: "high",
  },
  {
    id: 2,
    type: "user",
    reason: "Spam",
    reporter: "María López",
    reporterEmail: "maria@example.com",
    reportedItem: "Usuario: JuanSpammer",
    reportedItemType: "user",
    reportedItemId: 234,
    status: "pending",
    date: "2023-05-14",
    description: "El usuario está publicando enlaces de spam en los comentarios de múltiples novelas.",
    priority: "medium",
  },
  {
    id: 3,
    type: "content",
    reason: "Plagio",
    reporter: "Ana Martínez",
    reporterEmail: "ana@example.com",
    reportedItem: "Corazones en la Tormenta",
    reportedItemType: "novel",
    reportedItemId: 56,
    status: "pending",
    date: "2023-05-13",
    description: "Esta novela es una copia casi exacta de 'Amor en Tiempos de Guerra' de otro autor.",
    priority: "high",
  },
  {
    id: 4,
    type: "user",
    reason: "Acoso",
    reporter: "Pedro Sánchez",
    reporterEmail: "pedro@example.com",
    reportedItem: "Usuario: ToxicReader",
    reportedItemType: "user",
    reportedItemId: 345,
    status: "in_review",
    date: "2023-05-12",
    description: "Este usuario ha estado acosando a varios autores con comentarios ofensivos.",
    priority: "high",
  },
  {
    id: 5,
    type: "content",
    reason: "Contenido inapropiado",
    reporter: "Laura Gómez",
    reporterEmail: "laura@example.com",
    reportedItem: "Sombras del Pasado (Capítulo 12)",
    reportedItemType: "chapter",
    reportedItemId: 287,
    status: "in_review",
    date: "2023-05-11",
    description: "El capítulo contiene descripciones gráficas inapropiadas para la clasificación de edad.",
    priority: "medium",
  },
  {
    id: 6,
    type: "comment",
    reason: "Lenguaje ofensivo",
    reporter: "Miguel Torres",
    reporterEmail: "miguel@example.com",
    reportedItem: "Comentario en 'El Último Astronauta'",
    reportedItemType: "comment",
    reportedItemId: 1245,
    status: "resolved",
    date: "2023-05-10",
    description: "El comentario contiene insultos y lenguaje ofensivo dirigido al autor.",
    priority: "low",
    resolution: "removed",
    resolvedBy: "Admin",
    resolvedDate: "2023-05-11",
  },
  {
    id: 7,
    type: "content",
    reason: "Derechos de autor",
    reporter: "Javier Ruiz",
    reporterEmail: "javier@example.com",
    reportedItem: "Mundos Paralelos",
    reportedItemType: "novel",
    reportedItemId: 78,
    status: "resolved",
    date: "2023-05-09",
    description: "La novela utiliza imágenes con derechos de autor sin permiso.",
    priority: "medium",
    resolution: "warning",
    resolvedBy: "Admin",
    resolvedDate: "2023-05-10",
  },
  {
    id: 8,
    type: "user",
    reason: "Suplantación de identidad",
    reporter: "Elena Castro",
    reporterEmail: "elena@example.com",
    reportedItem: "Usuario: FalsoAutor",
    reportedItemType: "user",
    reportedItemId: 456,
    status: "resolved",
    date: "2023-05-08",
    description: "Este usuario está fingiendo ser un autor famoso y engañando a los lectores.",
    priority: "high",
    resolution: "banned",
    resolvedBy: "Admin",
    resolvedDate: "2023-05-09",
  },
  {
    id: 9,
    type: "comment",
    reason: "Spam",
    reporter: "Roberto Díaz",
    reporterEmail: "roberto@example.com",
    reportedItem: "Comentario en 'Caminos Cruzados'",
    reportedItemType: "comment",
    reportedItemId: 2356,
    status: "dismissed",
    date: "2023-05-07",
    description: "El comentario contiene enlaces a sitios externos sospechosos.",
    priority: "low",
    resolution: "no_action",
    resolvedBy: "Admin",
    resolvedDate: "2023-05-08",
  },
  {
    id: 10,
    type: "content",
    reason: "Contenido inapropiado",
    reporter: "Carmen Vega",
    reporterEmail: "carmen@example.com",
    reportedItem: "El Último Suspiro (Capítulo 7)",
    reportedItemType: "chapter",
    reportedItemId: 198,
    status: "dismissed",
    date: "2023-05-06",
    description: "El capítulo contiene escenas que podrían ser perturbadoras.",
    priority: "low",
    resolution: "no_action",
    resolvedBy: "Admin",
    resolvedDate: "2023-05-07",
  },
]

export default function AdminReportsPage() {
  const [activeTab, setActiveTab] = useState("all")
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedReport, setSelectedReport] = useState<any>(null)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const { toast } = useToast()

  // Filtrar reportes según la pestaña activa
  const filteredReports = mockReports
    .filter((report) => {
      if (activeTab === "all") return true
      if (activeTab === "pending") return report.status === "pending"
      if (activeTab === "in_review") return report.status === "in_review"
      if (activeTab === "resolved") return report.status === "resolved" || report.status === "dismissed"
      return true
    })
    .filter((report) => {
      // Filtrar por término de búsqueda
      if (!searchTerm) return true
      return (
        report.reportedItem.toLowerCase().includes(searchTerm.toLowerCase()) ||
        report.reporter.toLowerCase().includes(searchTerm.toLowerCase()) ||
        report.reason.toLowerCase().includes(searchTerm.toLowerCase())
      )
    })

  // Función para manejar reportes
  const handleReport = (reportId: number, action: string) => {
    toast({
      title: `Reporte ${action === "approve" ? "aprobado" : action === "reject" ? "rechazado" : "marcado en revisión"}`,
      description: `El reporte #${reportId} ha sido ${
        action === "approve" ? "aprobado y resuelto" : action === "reject" ? "rechazado" : "marcado para revisión"
      }.`,
    })
  }

  // Función para ver detalles del reporte
  const viewReportDetails = (report: any) => {
    setSelectedReport(report)
    setIsDialogOpen(true)
  }

  // Estadísticas de reportes
  const reportStats = {
    total: mockReports.length,
    pending: mockReports.filter((r) => r.status === "pending").length,
    inReview: mockReports.filter((r) => r.status === "in_review").length,
    resolved: mockReports.filter((r) => r.status === "resolved").length,
    dismissed: mockReports.filter((r) => r.status === "dismissed").length,
    highPriority: mockReports.filter((r) => r.priority === "high").length,
  }

  return (
    <div className="container mx-auto p-4 space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h1 className="text-2xl font-bold">Gestión de Reportes</h1>
      </div>

      {/* Tarjetas de estadísticas */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Reportes</CardTitle>
            <AlertTriangle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{reportStats.total}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pendientes</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{reportStats.pending}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">En Revisión</CardTitle>
            <Eye className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{reportStats.inReview}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Alta Prioridad</CardTitle>
            <AlertTriangle className="h-4 w-4 text-red-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{reportStats.highPriority}</div>
          </CardContent>
        </Card>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="all">Todos</TabsTrigger>
          <TabsTrigger value="pending">Pendientes</TabsTrigger>
          <TabsTrigger value="in_review">En Revisión</TabsTrigger>
          <TabsTrigger value="resolved">Resueltos</TabsTrigger>
        </TabsList>

        <TabsContent value={activeTab} className="space-y-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="md:flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={18} />
              <Input
                placeholder="Buscar reportes..."
                className="pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            <Select defaultValue="all">
              <SelectTrigger className="w-full md:w-[180px]">
                <div className="flex items-center gap-2">
                  <Filter size={16} />
                  <SelectValue placeholder="Tipo" />
                </div>
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos</SelectItem>
                <SelectItem value="content">Contenido</SelectItem>
                <SelectItem value="user">Usuario</SelectItem>
                <SelectItem value="comment">Comentario</SelectItem>
              </SelectContent>
            </Select>

            <Select defaultValue="all">
              <SelectTrigger className="w-full md:w-[180px]">
                <div className="flex items-center gap-2">
                  <Filter size={16} />
                  <SelectValue placeholder="Prioridad" />
                </div>
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todas</SelectItem>
                <SelectItem value="high">Alta</SelectItem>
                <SelectItem value="medium">Media</SelectItem>
                <SelectItem value="low">Baja</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>ID</TableHead>
                  <TableHead>Tipo</TableHead>
                  <TableHead>Motivo</TableHead>
                  <TableHead>Elemento Reportado</TableHead>
                  <TableHead>Reportado por</TableHead>
                  <TableHead>Estado</TableHead>
                  <TableHead>Prioridad</TableHead>
                  <TableHead>Fecha</TableHead>
                  <TableHead className="text-right">Acciones</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredReports.map((report) => (
                  <TableRow key={report.id}>
                    <TableCell>{report.id}</TableCell>
                    <TableCell>
                      {report.type === "content" ? (
                        <div className="flex items-center gap-1">
                          <BookOpen className="h-4 w-4" />
                          <span>Contenido</span>
                        </div>
                      ) : report.type === "user" ? (
                        <div className="flex items-center gap-1">
                          <User className="h-4 w-4" />
                          <span>Usuario</span>
                        </div>
                      ) : (
                        <div className="flex items-center gap-1">
                          <MessageSquare className="h-4 w-4" />
                          <span>Comentario</span>
                        </div>
                      )}
                    </TableCell>
                    <TableCell>{report.reason}</TableCell>
                    <TableCell className="max-w-[200px] truncate">{report.reportedItem}</TableCell>
                    <TableCell>{report.reporter}</TableCell>
                    <TableCell>
                      <Badge
                        variant={
                          report.status === "pending"
                            ? "outline"
                            : report.status === "in_review"
                              ? "secondary"
                              : report.status === "resolved"
                                ? "default"
                                : "destructive"
                        }
                      >
                        {report.status === "pending"
                          ? "Pendiente"
                          : report.status === "in_review"
                            ? "En Revisión"
                            : report.status === "resolved"
                              ? "Resuelto"
                              : "Rechazado"}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant={
                          report.priority === "high"
                            ? "destructive"
                            : report.priority === "medium"
                              ? "outline"
                              : "secondary"
                        }
                      >
                        {report.priority === "high" ? "Alta" : report.priority === "medium" ? "Media" : "Baja"}
                      </Badge>
                    </TableCell>
                    <TableCell>{report.date}</TableCell>
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
                          <DropdownMenuItem onClick={() => viewReportDetails(report)}>
                            <Eye className="mr-2 h-4 w-4" />
                            <span>Ver detalles</span>
                          </DropdownMenuItem>
                          {(report.status === "pending" || report.status === "in_review") && (
                            <>
                              <DropdownMenuItem onClick={() => handleReport(report.id, "review")}>
                                <Eye className="mr-2 h-4 w-4" />
                                <span>Marcar en revisión</span>
                              </DropdownMenuItem>
                              <DropdownMenuItem onClick={() => handleReport(report.id, "approve")}>
                                <ThumbsUp className="mr-2 h-4 w-4" />
                                <span>Aprobar y resolver</span>
                              </DropdownMenuItem>
                              <DropdownMenuItem onClick={() => handleReport(report.id, "reject")}>
                                <ThumbsDown className="mr-2 h-4 w-4" />
                                <span>Rechazar</span>
                              </DropdownMenuItem>
                            </>
                          )}
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

      {/* Diálogo de detalles del reporte */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>Detalles del Reporte #{selectedReport?.id}</DialogTitle>
            <DialogDescription>Información completa sobre el reporte seleccionado</DialogDescription>
          </DialogHeader>

          {selectedReport && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <h3 className="font-medium">Información del Reporte</h3>
                  <div className="grid grid-cols-2 gap-2">
                    <div className="text-sm font-medium">ID:</div>
                    <div className="text-sm">{selectedReport.id}</div>
                    <div className="text-sm font-medium">Tipo:</div>
                    <div className="text-sm capitalize">{selectedReport.type}</div>
                    <div className="text-sm font-medium">Motivo:</div>
                    <div className="text-sm">{selectedReport.reason}</div>
                    <div className="text-sm font-medium">Estado:</div>
                    <div className="text-sm">
                      <Badge
                        variant={
                          selectedReport.status === "pending"
                            ? "outline"
                            : selectedReport.status === "in_review"
                              ? "secondary"
                              : selectedReport.status === "resolved"
                                ? "default"
                                : "destructive"
                        }
                      >
                        {selectedReport.status === "pending"
                          ? "Pendiente"
                          : selectedReport.status === "in_review"
                            ? "En Revisión"
                            : selectedReport.status === "resolved"
                              ? "Resuelto"
                              : "Rechazado"}
                      </Badge>
                    </div>
                    <div className="text-sm font-medium">Prioridad:</div>
                    <div className="text-sm">
                      <Badge
                        variant={
                          selectedReport.priority === "high"
                            ? "destructive"
                            : selectedReport.priority === "medium"
                              ? "outline"
                              : "secondary"
                        }
                      >
                        {selectedReport.priority === "high"
                          ? "Alta"
                          : selectedReport.priority === "medium"
                            ? "Media"
                            : "Baja"}
                      </Badge>
                    </div>
                    <div className="text-sm font-medium">Fecha:</div>
                    <div className="text-sm">{selectedReport.date}</div>
                  </div>
                </div>

                <div className="space-y-2">
                  <h3 className="font-medium">Información del Reportador</h3>
                  <div className="grid grid-cols-2 gap-2">
                    <div className="text-sm font-medium">Nombre:</div>
                    <div className="text-sm">{selectedReport.reporter}</div>
                    <div className="text-sm font-medium">Email:</div>
                    <div className="text-sm">{selectedReport.reporterEmail}</div>
                  </div>

                  <h3 className="font-medium mt-4">Elemento Reportado</h3>
                  <div className="grid grid-cols-2 gap-2">
                    <div className="text-sm font-medium">Nombre:</div>
                    <div className="text-sm">{selectedReport.reportedItem}</div>
                    <div className="text-sm font-medium">Tipo:</div>
                    <div className="text-sm capitalize">{selectedReport.reportedItemType}</div>
                    <div className="text-sm font-medium">ID:</div>
                    <div className="text-sm">{selectedReport.reportedItemId}</div>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <h3 className="font-medium">Descripción del Reporte</h3>
                <p className="text-sm border p-3 rounded-md bg-muted/30">{selectedReport.description}</p>
              </div>

              {(selectedReport.status === "resolved" || selectedReport.status === "dismissed") && (
                <div className="space-y-2">
                  <h3 className="font-medium">Resolución</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    <div className="text-sm font-medium">Acción tomada:</div>
                    <div className="text-sm capitalize">
                      {selectedReport.resolution === "removed"
                        ? "Contenido eliminado"
                        : selectedReport.resolution === "warning"
                          ? "Advertencia emitida"
                          : selectedReport.resolution === "banned"
                            ? "Usuario suspendido"
                            : "Sin acción"}
                    </div>
                    <div className="text-sm font-medium">Resuelto por:</div>
                    <div className="text-sm">{selectedReport.resolvedBy}</div>
                    <div className="text-sm font-medium">Fecha de resolución:</div>
                    <div className="text-sm">{selectedReport.resolvedDate}</div>
                  </div>
                </div>
              )}

              <div className="flex justify-end gap-2 pt-4">
                <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                  Cerrar
                </Button>
                {(selectedReport.status === "pending" || selectedReport.status === "in_review") && (
                  <>
                    <Button variant="outline" onClick={() => handleReport(selectedReport.id, "review")}>
                      Marcar en revisión
                    </Button>
                    <Button variant="default" onClick={() => handleReport(selectedReport.id, "approve")}>
                      Aprobar y resolver
                    </Button>
                    <Button variant="destructive" onClick={() => handleReport(selectedReport.id, "reject")}>
                      Rechazar
                    </Button>
                  </>
                )}
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
