"use client"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

interface ReportsListProps {
  extended?: boolean
}

export function ReportsList({ extended = false }: ReportsListProps) {
  // Datos de ejemplo
  const reports = [
    {
      id: 1,
      type: "Contenido inapropiado",
      reporter: "Carlos Rodríguez",
      reported: "El Despertar del Dragón (Capítulo 5)",
      status: "pending",
      date: "Hace 2 horas",
      description: "El capítulo contiene lenguaje inapropiado y escenas violentas explícitas.",
    },
    {
      id: 2,
      type: "Spam",
      reporter: "María López",
      reported: "Usuario: JuanSpammer",
      status: "pending",
      date: "Hace 5 horas",
      description: "El usuario está publicando enlaces de spam en los comentarios de múltiples novelas.",
    },
    {
      id: 3,
      type: "Plagio",
      reporter: "Ana Martínez",
      reported: "Corazones en la Tormenta",
      status: "pending",
      date: "Hace 1 día",
      description: "Esta novela es una copia casi exacta de 'Amor en Tiempos de Guerra' de otro autor.",
    },
    {
      id: 4,
      type: "Acoso",
      reporter: "Pedro Sánchez",
      reported: "Usuario: ToxicReader",
      status: "pending",
      date: "Hace 2 días",
      description: "Este usuario ha estado acosando a varios autores con comentarios ofensivos.",
    },
    {
      id: 5,
      type: "Contenido inapropiado",
      reporter: "Laura Gómez",
      reported: "Sombras del Pasado (Capítulo 12)",
      status: "pending",
      date: "Hace 3 días",
      description: "El capítulo contiene descripciones gráficas inapropiadas para la clasificación de edad.",
    },
  ]

  return (
    <div className="space-y-4">
      {reports.slice(0, extended ? reports.length : 3).map((report) => (
        <div key={report.id} className="space-y-2">
          <div className="flex items-center gap-2">
            <Badge variant="destructive">{report.type}</Badge>
            <span className="text-xs text-muted-foreground">{report.date}</span>
          </div>
          <p className="text-sm font-medium">{report.reported}</p>
          {extended && <p className="text-xs text-muted-foreground">{report.description}</p>}
          {extended && (
            <div className="flex gap-2 pt-2">
              <Button size="sm" variant="outline">
                Ignorar
              </Button>
              <Button size="sm">Revisar</Button>
            </div>
          )}
        </div>
      ))}
      {!extended && reports.length > 3 && (
        <Button variant="link" className="px-0">
          Ver todos los reportes
        </Button>
      )}
    </div>
  )
}
