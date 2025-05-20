"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Camera, ChevronRight, Mail, Save, User } from "lucide-react"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { SiteFooter } from "@/components/site-footer"
import { SiteHeader } from "@/components/site-header"
import { Textarea } from "@/components/ui/textarea"

export default function EditProfilePage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [profileData, setProfileData] = useState({
    username: "LectorÁvido",
    displayName: "Lector Ávido",
    email: "lector@example.com",
    bio: "Amante de la fantasía y las novelas de aventuras. Siempre en busca de nuevas historias que me transporten a otros mundos.",
    location: "Madrid, España",
    website: "https://miblog.com",
    twitter: "@lectoravido",
    favoriteGenres: ["Fantasía", "Aventura", "Acción"],
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setProfileData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Simulación de guardado
    try {
      await new Promise((resolve) => setTimeout(resolve, 1500))
      alert("Perfil actualizado correctamente")
      router.push("/user/profile")
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
          <div className="mb-8">
            <div className="flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
              <Link href="/" className="hover:underline">
                Inicio
              </Link>
              <ChevronRight className="h-4 w-4" />
              <Link href="/user/profile" className="hover:underline">
                Perfil
              </Link>
              <ChevronRight className="h-4 w-4" />
              <span className="font-medium text-foreground">Editar Perfil</span>
            </div>
            <h1 className="mt-4 text-3xl font-bold tracking-tight md:text-4xl">Editar Perfil</h1>
            <p className="mt-2 text-muted-foreground">
              Actualiza tu información personal y personaliza cómo te ven otros usuarios.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-[1fr_2fr]">
            <Card>
              <CardHeader>
                <CardTitle>Imagen de Perfil</CardTitle>
                <CardDescription>Esta imagen se mostrará en tu perfil y comentarios.</CardDescription>
              </CardHeader>
              <CardContent className="flex flex-col items-center gap-4">
                <div className="relative">
                  <Avatar className="h-32 w-32">
                    <AvatarImage src="/placeholder.jpg?height=128&width=128&text=LA" alt="@lectoravido" />
                    <AvatarFallback>LA</AvatarFallback>
                  </Avatar>
                  <Button
                    variant="secondary"
                    size="icon"
                    className="absolute bottom-0 right-0 h-8 w-8 rounded-full shadow"
                  >
                    <Camera className="h-4 w-4" />
                    <span className="sr-only">Cambiar imagen</span>
                  </Button>
                </div>
                <div className="text-center">
                  <p className="text-sm font-medium">Cambiar imagen de perfil</p>
                  <p className="text-xs text-muted-foreground">JPG, PNG o GIF. Máximo 2MB.</p>
                </div>
                <Button variant="outline" size="sm" className="w-full">
                  Subir imagen
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Información Personal</CardTitle>
                <CardDescription>Actualiza tu información personal y de contacto.</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="username">Nombre de usuario</Label>
                      <div className="relative">
                        <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                        <Input
                          id="username"
                          name="username"
                          value={profileData.username}
                          onChange={handleChange}
                          className="pl-10"
                        />
                      </div>
                      <p className="text-xs text-muted-foreground">Este es tu identificador único en la plataforma.</p>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="displayName">Nombre para mostrar</Label>
                      <Input
                        id="displayName"
                        name="displayName"
                        value={profileData.displayName}
                        onChange={handleChange}
                      />
                      <p className="text-xs text-muted-foreground">Este es el nombre que verán otros usuarios.</p>
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
                        onChange={handleChange}
                        className="pl-10"
                      />
                    </div>
                    <p className="text-xs text-muted-foreground">Tu correo electrónico no se mostrará públicamente.</p>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="bio">Biografía</Label>
                    <Textarea
                      id="bio"
                      name="bio"
                      value={profileData.bio}
                      onChange={handleChange}
                      className="min-h-[120px] resize-none"
                    />
                    <p className="text-xs text-muted-foreground">Cuéntanos un poco sobre ti y tus gustos literarios.</p>
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="location">Ubicación</Label>
                      <Input
                        id="location"
                        name="location"
                        value={profileData.location}
                        onChange={handleChange}
                        placeholder="Ciudad, País"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="website">Sitio web</Label>
                      <Input
                        id="website"
                        name="website"
                        value={profileData.website}
                        onChange={handleChange}
                        placeholder="https://tusitio.com"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="twitter">Twitter/X</Label>
                    <Input
                      id="twitter"
                      name="twitter"
                      value={profileData.twitter}
                      onChange={handleChange}
                      placeholder="@usuario"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>Géneros favoritos</Label>
                    <Select defaultValue="fantasy">
                      <SelectTrigger>
                        <SelectValue placeholder="Seleccionar género" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="fantasy">Fantasía</SelectItem>
                        <SelectItem value="adventure">Aventura</SelectItem>
                        <SelectItem value="action">Acción</SelectItem>
                        <SelectItem value="romance">Romance</SelectItem>
                        <SelectItem value="scifi">Ciencia Ficción</SelectItem>
                        <SelectItem value="mystery">Misterio</SelectItem>
                      </SelectContent>
                    </Select>
                    <div className="mt-2 flex flex-wrap gap-2">
                      {profileData.favoriteGenres.map((genre) => (
                        <div
                          key={genre}
                          className="flex items-center gap-1 rounded-full bg-muted px-3 py-1 text-xs font-medium"
                        >
                          {genre}
                          <button type="button" className="ml-1 text-muted-foreground hover:text-foreground">
                            ×
                          </button>
                        </div>
                      ))}
                    </div>
                    <p className="text-xs text-muted-foreground">Selecciona hasta 5 géneros que más te gusten.</p>
                  </div>

                  <div className="flex gap-2">
                    <Button type="submit" className="gap-2" disabled={isLoading}>
                      <Save className="h-4 w-4" />
                      {isLoading ? "Guardando..." : "Guardar cambios"}
                    </Button>
                    <Button type="button" variant="outline" onClick={() => router.push("/user/profile")}>
                      Cancelar
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
      <SiteFooter />
    </div>
  )
}
