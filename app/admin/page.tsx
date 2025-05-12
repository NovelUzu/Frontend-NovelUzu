import type { Metadata } from "next"
import Link from "next/link"
import { BookOpen, Flag, MessageSquare, Users } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { AdminStats } from "@/components/admin/admin-stats"
import { PlatformActivity } from "@/components/admin/platform-activity"
import { RecentNovels } from "@/components/admin/recent-novels"
import { RecentUsers } from "@/components/admin/recent-users"
import { ReportsList } from "@/components/admin/reports-list"
import { SiteHeader } from "@/components/site-header"

export const metadata: Metadata = {
  title: "Panel de Administración | NovelUzu",
  description: "Panel de administración para gestionar la plataforma NovelUzu",
}

export default function AdminDashboard() {
  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <div className="space-y-6">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h2 className="text-2xl font-bold tracking-tight">Panel de Administración</h2>
            <p className="text-muted-foreground">Bienvenido al panel de administración de NovelUzu.</p>
          </div>
          <div className="flex items-center gap-2">
            <Button asChild variant="outline">
              <Link href="/admin/settings">Configuración</Link>
            </Button>
            <Button asChild>
              <Link href="/admin/reports">Ver Reportes</Link>
            </Button>
          </div>
        </div>

        <Tabs defaultValue="overview" className="space-y-4">
          <TabsList>
            <TabsTrigger value="overview">Resumen</TabsTrigger>
            <TabsTrigger value="analytics">Analíticas</TabsTrigger>
            <TabsTrigger value="reports">Reportes</TabsTrigger>
            <TabsTrigger value="recent">Actividad Reciente</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Usuarios</CardTitle>
                  <Users className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">12,345</div>
                  <p className="text-xs text-muted-foreground">+573 desde el mes pasado</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Novelas</CardTitle>
                  <BookOpen className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">2,834</div>
                  <p className="text-xs text-muted-foreground">+128 desde el mes pasado</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Comentarios</CardTitle>
                  <MessageSquare className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">45,672</div>
                  <p className="text-xs text-muted-foreground">+2,345 desde el mes pasado</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Reportes Activos</CardTitle>
                  <Flag className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">23</div>
                  <p className="text-xs text-muted-foreground">-5 desde la semana pasada</p>
                </CardContent>
              </Card>
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
              <Card className="col-span-4">
                <CardHeader>
                  <CardTitle>Actividad de la Plataforma</CardTitle>
                  <CardDescription>Visitas y actividad de los últimos 30 días</CardDescription>
                </CardHeader>
                <CardContent>
                  <PlatformActivity />
                </CardContent>
              </Card>
              <Card className="col-span-3">
                <CardHeader>
                  <CardTitle>Reportes Recientes</CardTitle>
                  <CardDescription>Últimos reportes de usuarios y contenido</CardDescription>
                </CardHeader>
                <CardContent>
                  <ReportsList />
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="analytics" className="space-y-4">
            <AdminStats />
          </TabsContent>

          <TabsContent value="reports" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Reportes Pendientes</CardTitle>
                <CardDescription>Reportes que requieren atención del equipo de moderación</CardDescription>
              </CardHeader>
              <CardContent>
                <ReportsList extended />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="recent" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>Usuarios Recientes</CardTitle>
                  <CardDescription>Últimos usuarios registrados en la plataforma</CardDescription>
                </CardHeader>
                <CardContent>
                  <RecentUsers />
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Novelas Recientes</CardTitle>
                  <CardDescription>Últimas novelas publicadas en la plataforma</CardDescription>
                </CardHeader>
                <CardContent>
                  <RecentNovels />
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
