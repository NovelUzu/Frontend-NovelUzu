"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { Bell, BookOpen, Key, Lock, Mail, Save, User } from "lucide-react"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { SiteFooter } from "@/components/site-footer"
import { SiteHeader } from "@/components/site-header"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function UserSettingsPage() {
  const [isLoading, setIsLoading] = useState(false)
  const [profileData, setProfileData] = useState({
    username: "LectorÁvido",
    email: "lector@example.com",
    bio: "Amante de la fantasía y las novelas de aventuras. Siempre en busca de nuevas historias que me transporten a otros mundos.",
  })

  const handleProfileChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setProfileData((prev) => ({ ...prev, [name]: value }))
  }

  const handleProfileSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Simulación de guardado
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000))
      alert("Perfil actualizado correctamente")
    } catch (error) {
      console.error("Error al actualizar el perfil:", error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main className="flex-1">
        <div className="container px-4 py-8 md:px-6 md:py-12">
          <div className="mb-8 flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold tracking-tight md:text-4xl">Configuración</h1>
              <p className="text-muted-foreground">Administra tu cuenta y preferencias</p>
            </div>
            <Avatar className="h-12 w-12">
              <AvatarImage src="/placeholder.svg?height=48&width=48&text=U" alt="@usuario" />
              <AvatarFallback>U</AvatarFallback>
            </Avatar>
          </div>
          <Tabs defaultValue="profile" className="mb-8">
            <TabsList className="w-full justify-start">
              <TabsTrigger value="profile" className="gap-2">
                <User className="h-4 w-4" />
                Perfil
              </TabsTrigger>
              <TabsTrigger value="account" className="gap-2">
                <Key className="h-4 w-4" />
                Cuenta
              </TabsTrigger>
              <TabsTrigger value="notifications" className="gap-2">
                <Bell className="h-4 w-4" />
                Notificaciones
              </TabsTrigger>
            </TabsList>
            <TabsContent value="profile" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Información del Perfil</CardTitle>
                  <CardDescription>Actualiza tu información personal y cómo te ven otros usuarios</CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleProfileSubmit} className="space-y-6">
                    <div className="space-y-4">
                      <div className="flex flex-col items-center gap-4 sm:flex-row">
                        <Avatar className="h-24 w-24">
                          <AvatarImage src="/placeholder.svg?height=96&width=96&text=U" alt="@usuario" />
                          <AvatarFallback>U</AvatarFallback>
                        </Avatar>
                        <div className="flex flex-col gap-2">
                          <Button variant="outline" size="sm">
                            Cambiar imagen
                          </Button>
                          <p className="text-xs text-muted-foreground">JPG, PNG o GIF. Tamaño máximo de 2MB.</p>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="username">Nombre de usuario</Label>
                        <div className="relative">
                          <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                          <Input
                            id="username"
                            name="username"
                            value={profileData.username}
                            onChange={handleProfileChange}
                            className="pl-10"
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email">Correo electrónico</Label>
                        <div className="relative">
                          <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                          <Input
                            id="email"
                            name="email"
                            type="email"
                            value={profileData.email}
                            onChange={handleProfileChange}
                            className="pl-10"
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="bio">Biografía</Label>
                        <textarea
                          id="bio"
                          name="bio"
                          value={profileData.bio}
                          onChange={handleProfileChange}
                          className="h-24 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                        />
                      </div>
                    </div>
                    <Button type="submit" className="gap-2" disabled={isLoading}>
                      <Save className="h-4 w-4" />
                      {isLoading ? "Guardando..." : "Guardar cambios"}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="account" className="mt-6">
              <Card className="mb-6">
                <CardHeader>
                  <CardTitle>Cambiar contraseña</CardTitle>
                  <CardDescription>Actualiza tu contraseña para mantener tu cuenta segura</CardDescription>
                </CardHeader>
                <CardContent>
                  <form className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="current-password">Contraseña actual</Label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                        <Input id="current-password" type="password" className="pl-10" />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="new-password">Nueva contraseña</Label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                        <Input id="new-password" type="password" className="pl-10" />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="confirm-password">Confirmar nueva contraseña</Label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                        <Input id="confirm-password" type="password" className="pl-10" />
                      </div>
                    </div>
                    <Button>Cambiar contraseña</Button>
                  </form>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Eliminar cuenta</CardTitle>
                  <CardDescription>Eliminar tu cuenta es una acción permanente y no se puede deshacer</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="mb-4 text-muted-foreground">
                    Al eliminar tu cuenta, perderás acceso a todos tus datos, incluyendo tu biblioteca, historial de
                    lectura y reseñas.
                  </p>
                  <Button variant="destructive">Eliminar cuenta</Button>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="notifications" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Preferencias de notificaciones</CardTitle>
                  <CardDescription>Configura cómo y cuándo quieres recibir notificaciones</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>Actualizaciones de novelas</Label>
                        <p className="text-sm text-muted-foreground">
                          Recibe notificaciones cuando se publiquen nuevos capítulos de novelas que sigues
                        </p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>Comentarios en reseñas</Label>
                        <p className="text-sm text-muted-foreground">
                          Recibe notificaciones cuando alguien comente en tus reseñas
                        </p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>Novedades y promociones</Label>
                        <p className="text-sm text-muted-foreground">
                          Recibe información sobre nuevas funciones y promociones especiales
                        </p>
                      </div>
                      <Switch />
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>Correos electrónicos</Label>
                        <p className="text-sm text-muted-foreground">
                          Recibe notificaciones por correo electrónico además de en la plataforma
                        </p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
          <div className="flex justify-end">
            <Button variant="outline" asChild>
              <Link href="/user/profile">
                <BookOpen className="mr-2 h-4 w-4" />
                Volver al perfil
              </Link>
            </Button>
          </div>
        </div>
      </main>
      <SiteFooter />
    </div>
  )
}
