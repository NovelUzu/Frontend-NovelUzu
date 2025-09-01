"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Camera, Save, X, User, Globe, Twitter, Instagram, BookOpen, Award, Settings } from "lucide-react"
import { type UserRole, useAuth } from "@/lib/auth-context"
import { SiteHeader } from "@/components/site-header"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { Separator } from "@/components/ui/separator"
import { useToast } from "@/hooks/use-toast"

export default function EditProfilePage() {
  const router = useRouter()
  const { user, updateUser, isLoading, isAuthenticated } = useAuth()
  const { toast } = useToast()

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    role: "lector" as UserRole,
    bio: "",
    website: "",
    twitter: "",
    instagram: "",
    avatar: "",
    location: "",
    birthDate: "",
    favoriteGenres: [] as string[],
    readingGoal: 0,
    publicProfile: true,
    emailNotifications: true,
    pushNotifications: false,
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [activeTab, setActiveTab] = useState("personal")

  const genres = [
    "Romance",
    "Fantasía",
    "Ciencia Ficción",
    "Misterio",
    "Terror",
    "Aventura",
    "Drama",
    "Comedia",
    "Histórica",
    "Contemporánea",
  ]

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push("/login")
    }

    if (user) {
      setFormData({
        name: user.name || "",
        email: user.email || "",
        role: user.role || "lector",
        bio: "",
        website: "",
        twitter: "",
        instagram: "",
        avatar: user.avatar || "",
        location: "",
        birthDate: "",
        favoriteGenres: [],
        readingGoal: 12,
        publicProfile: true,
        emailNotifications: true,
        pushNotifications: false,
      })
    }
  }, [user, isLoading, isAuthenticated, router])

  const handleInputChange = (field: string, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleGenreToggle = (genre: string) => {
    setFormData((prev) => ({
      ...prev,
      favoriteGenres: prev.favoriteGenres.includes(genre)
        ? prev.favoriteGenres.filter((g) => g !== genre)
        : [...prev.favoriteGenres, genre],
    }))
  }

  const handleAvatarChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        setFormData((prev) => ({ ...prev, avatar: e.target?.result as string }))
      }
      reader.readAsDataURL(file)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      await new Promise((resolve) => setTimeout(resolve, 1500))

      updateUser({
        name: formData.name,
        email: formData.email,
        role: formData.role,
        avatar: formData.avatar,
      })

      toast({
        title: "Perfil actualizado",
        description: "Tus cambios han sido guardados exitosamente.",
      })

      setTimeout(() => {
        router.push("/user/profile")
      }, 1000)
    } catch (error) {
      toast({
        title: "Error",
        description: "No se pudo actualizar el perfil. Inténtalo de nuevo.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col">
        <SiteHeader />
        <main className="flex-1 flex items-center justify-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        </main>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900">
      <SiteHeader />

      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Editar perfil</h1>
            <p className="text-gray-600 dark:text-gray-400">Personaliza tu perfil y configura tus preferencias</p>
          </div>

          <form onSubmit={handleSubmit}>
            <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="personal" className="flex items-center gap-2">
                  <User className="h-4 w-4" />
                  Personal
                </TabsTrigger>
                <TabsTrigger value="social" className="flex items-center gap-2">
                  <Globe className="h-4 w-4" />
                  Social
                </TabsTrigger>
                <TabsTrigger value="preferences" className="flex items-center gap-2">
                  <BookOpen className="h-4 w-4" />
                  Preferencias
                </TabsTrigger>
                <TabsTrigger value="privacy" className="flex items-center gap-2">
                  <Settings className="h-4 w-4" />
                  Privacidad
                </TabsTrigger>
              </TabsList>

              {/* Información Personal */}
              <TabsContent value="personal" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Información Personal</CardTitle>
                    <CardDescription>Actualiza tu información básica y foto de perfil</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {/* Avatar */}
                    <div className="flex items-center space-x-6">
                      <div className="relative">
                        <Avatar className="h-24 w-24">
                          <AvatarImage src={formData.avatar || "/placeholder.svg"} alt="Avatar" />
                          <AvatarFallback className="text-lg">{formData.name.charAt(0).toUpperCase()}</AvatarFallback>
                        </Avatar>
                        <label
                          htmlFor="avatar-upload"
                          className="absolute -bottom-2 -right-2 bg-blue-600 hover:bg-blue-700 text-white rounded-full p-2 cursor-pointer transition-colors"
                        >
                          <Camera className="h-4 w-4" />
                        </label>
                        <input
                          id="avatar-upload"
                          type="file"
                          accept="image/*"
                          onChange={handleAvatarChange}
                          className="hidden"
                        />
                      </div>
                      <div>
                        <h3 className="font-medium">Foto de perfil</h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          Haz clic en el ícono de cámara para cambiar tu foto
                        </p>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="name">Nombre completo</Label>
                        <Input
                          id="name"
                          value={formData.name}
                          onChange={(e) => handleInputChange("name", e.target.value)}
                          placeholder="Tu nombre completo"
                          required
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="email">Correo electrónico</Label>
                        <Input
                          id="email"
                          type="email"
                          value={formData.email}
                          onChange={(e) => handleInputChange("email", e.target.value)}
                          placeholder="tu@email.com"
                          required
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="role">Tipo de cuenta</Label>
                        <Select
                          value={formData.role}
                          onValueChange={(value) => handleInputChange("role", value as UserRole)}
                        >
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="lector">
                              <div className="flex items-center gap-2">
                                <BookOpen className="h-4 w-4" />
                                Lector
                              </div>
                            </SelectItem>
                            <SelectItem value="escritor">
                              <div className="flex items-center gap-2">
                                <Award className="h-4 w-4" />
                                Escritor
                              </div>
                            </SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="location">Ubicación</Label>
                        <Input
                          id="location"
                          value={formData.location}
                          onChange={(e) => handleInputChange("location", e.target.value)}
                          placeholder="Ciudad, País"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="birthDate">Fecha de nacimiento</Label>
                        <Input
                          id="birthDate"
                          type="date"
                          value={formData.birthDate}
                          onChange={(e) => handleInputChange("birthDate", e.target.value)}
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="bio">Biografía</Label>
                      <Textarea
                        id="bio"
                        value={formData.bio}
                        onChange={(e) => handleInputChange("bio", e.target.value)}
                        placeholder="Cuéntanos sobre ti..."
                        rows={4}
                        maxLength={500}
                      />
                      <p className="text-sm text-gray-500">{formData.bio.length}/500 caracteres</p>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Redes Sociales */}
              <TabsContent value="social" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Redes Sociales</CardTitle>
                    <CardDescription>Conecta tus redes sociales para que otros puedan encontrarte</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="website">Sitio web</Label>
                        <div className="relative">
                          <Globe className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                          <Input
                            id="website"
                            type="url"
                            value={formData.website}
                            onChange={(e) => handleInputChange("website", e.target.value)}
                            placeholder="https://tu-sitio.com"
                            className="pl-10"
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="twitter">Twitter</Label>
                        <div className="relative">
                          <Twitter className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                          <Input
                            id="twitter"
                            value={formData.twitter}
                            onChange={(e) => handleInputChange("twitter", e.target.value)}
                            placeholder="@tu_usuario"
                            className="pl-10"
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="instagram">Instagram</Label>
                        <div className="relative">
                          <Instagram className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                          <Input
                            id="instagram"
                            value={formData.instagram}
                            onChange={(e) => handleInputChange("instagram", e.target.value)}
                            placeholder="@tu_usuario"
                            className="pl-10"
                          />
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Preferencias de Lectura */}
              <TabsContent value="preferences" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Preferencias de Lectura</CardTitle>
                    <CardDescription>Personaliza tu experiencia de lectura</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-4">
                      <Label>Géneros favoritos</Label>
                      <div className="flex flex-wrap gap-2">
                        {genres.map((genre) => (
                          <Badge
                            key={genre}
                            variant={formData.favoriteGenres.includes(genre) ? "default" : "outline"}
                            className="cursor-pointer hover:bg-blue-100 dark:hover:bg-blue-900"
                            onClick={() => handleGenreToggle(genre)}
                          >
                            {genre}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="readingGoal">Meta de lectura anual</Label>
                      <div className="flex items-center space-x-4">
                        <Input
                          id="readingGoal"
                          type="number"
                          min="0"
                          max="365"
                          value={formData.readingGoal}
                          onChange={(e) => handleInputChange("readingGoal", Number.parseInt(e.target.value) || 0)}
                          className="w-24"
                        />
                        <span className="text-sm text-gray-600 dark:text-gray-400">novelas por año</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Configuración de Privacidad */}
              <TabsContent value="privacy" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Configuración de Privacidad</CardTitle>
                    <CardDescription>
                      Controla quién puede ver tu información y cómo recibes notificaciones
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-6">
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label>Perfil público</Label>
                          <p className="text-sm text-gray-600 dark:text-gray-400">
                            Permite que otros usuarios vean tu perfil
                          </p>
                        </div>
                        <Switch
                          checked={formData.publicProfile}
                          onCheckedChange={(checked) => handleInputChange("publicProfile", checked)}
                        />
                      </div>

                      <Separator />

                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label>Notificaciones por email</Label>
                          <p className="text-sm text-gray-600 dark:text-gray-400">
                            Recibe actualizaciones por correo electrónico
                          </p>
                        </div>
                        <Switch
                          checked={formData.emailNotifications}
                          onCheckedChange={(checked) => handleInputChange("emailNotifications", checked)}
                        />
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label>Notificaciones push</Label>
                          <p className="text-sm text-gray-600 dark:text-gray-400">
                            Recibe notificaciones en tiempo real
                          </p>
                        </div>
                        <Switch
                          checked={formData.pushNotifications}
                          onCheckedChange={(checked) => handleInputChange("pushNotifications", checked)}
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>

            {/* Botones de acción */}
            <div className="flex justify-end space-x-4 pt-6 border-t">
              <Button type="button" variant="outline" onClick={() => router.back()} disabled={isSubmitting}>
                <X className="h-4 w-4 mr-2" />
                Cancelar
              </Button>
              <Button type="submit" disabled={isSubmitting} className="min-w-[120px]">
                {isSubmitting ? (
                  <div className="flex items-center">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Guardando...
                  </div>
                ) : (
                  <>
                    <Save className="h-4 w-4 mr-2" />
                    Guardar cambios
                  </>
                )}
              </Button>
            </div>
          </form>
        </div>
      </main>
    </div>
  )
}
