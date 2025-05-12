"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export function AdminStats() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      <Card>
        <CardHeader>
          <CardTitle>Usuarios Activos</CardTitle>
          <CardDescription>Usuarios activos por día en el último mes</CardDescription>
        </CardHeader>
        <CardContent className="h-80">
          <div className="h-full w-full rounded-md bg-muted/30 flex items-center justify-center">
            <p className="text-muted-foreground">Gráfico de usuarios activos</p>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Nuevas Novelas</CardTitle>
          <CardDescription>Nuevas novelas publicadas por semana</CardDescription>
        </CardHeader>
        <CardContent className="h-80">
          <div className="h-full w-full rounded-md bg-muted/30 flex items-center justify-center">
            <p className="text-muted-foreground">Gráfico de nuevas novelas</p>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Engagement</CardTitle>
          <CardDescription>Comentarios y valoraciones por día</CardDescription>
        </CardHeader>
        <CardContent className="h-80">
          <div className="h-full w-full rounded-md bg-muted/30 flex items-center justify-center">
            <p className="text-muted-foreground">Gráfico de engagement</p>
          </div>
        </CardContent>
      </Card>

      <Card className="md:col-span-2">
        <CardHeader>
          <CardTitle>Distribución de Géneros</CardTitle>
          <CardDescription>Popularidad de géneros por número de novelas y lecturas</CardDescription>
        </CardHeader>
        <CardContent className="h-80">
          <div className="h-full w-full rounded-md bg-muted/30 flex items-center justify-center">
            <p className="text-muted-foreground">Gráfico de distribución de géneros</p>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Retención de Usuarios</CardTitle>
          <CardDescription>Tasa de retención de usuarios por cohorte</CardDescription>
        </CardHeader>
        <CardContent className="h-80">
          <div className="h-full w-full rounded-md bg-muted/30 flex items-center justify-center">
            <p className="text-muted-foreground">Gráfico de retención</p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
