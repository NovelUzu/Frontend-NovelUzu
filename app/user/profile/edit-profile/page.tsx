"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Camera, Save, X, User } from "lucide-react"
import { type UserRole, useAuth } from "@/lib/contexts/auth"
import { api } from "@/lib/api"
import { SiteHeader } from "@/components/site-header"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useToast } from "@/hooks/use-toast"


export default function EditProfilePage() {
  const router = useRouter()
  const { user, isLoading, isAuthenticated, refreshUser } = useAuth()
  const { toast } = useToast()

  const [formData, setFormData] = useState({
    name: "",
    bio: "",
    avatar: null as File | null,
    location: "",
    birthDate: "",
  })
  const [avatarPreview, setAvatarPreview] = useState<string>("")

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [activeTab, setActiveTab] = useState("personal")

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push("/login")
    }

    if (user) {
      setFormData({
        name: user.username || "",
        bio: user.bio || "",
        avatar: null, // El archivo se manejará por separado
        location: user.country || "",
        birthDate: user.birth_date || "",
      })
      // Establecer preview del avatar existente
      setAvatarPreview(user.avatar_url + "/download" || "")
    }
  }, [user, isLoading, isAuthenticated, router])

  const handleInputChange = (field: string, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleAvatarChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      // Guardar el archivo
      setFormData((prev) => ({ ...prev, avatar: file }))
      
      // Crear preview para mostrar
      const reader = new FileReader()
      reader.onload = (e) => {
        setAvatarPreview(e.target?.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      // Preparar datos para la API
      const updateData: any = {}
      
      // Solo incluir campos que han cambiado y no están vacíos
      if (formData.name && formData.name !== user?.username) {
        updateData.username = formData.name
      }
      
      if (formData.bio && formData.bio !== user?.bio) {
        updateData.bio = formData.bio
      }
      
      if (formData.location && formData.location !== user?.country) {
        updateData.country = formData.location
      }
      
      if (formData.birthDate && formData.birthDate !== user?.birth_date) {
        updateData.birth_date = formData.birthDate
      }
      
      if (formData.avatar) {
        updateData.avatar = formData.avatar
      }

      // Solo actualizar si hay cambios
      if (Object.keys(updateData).length > 0) {
        const response = await api.users.updateProfile(updateData)
        
        // Actualizar los datos en memoria (contexto de auth)
        await refreshUser()
        
        toast({
          title: "Perfil actualizado",
          description: "Tus cambios han sido guardados exitosamente.",
        })

        setTimeout(() => {
          router.push("/user/profile")
        }, 1000)
      } else {
        toast({
          title: "Sin cambios",
          description: "No hay cambios para guardar.",
        })
      }
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "No se pudo actualizar el perfil. Inténtalo de nuevo.",
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
              <TabsList className="grid w-full grid-cols-1">
                <TabsTrigger value="personal" className="flex items-center gap-2">
                  <User className="h-4 w-4" />
                  Información Personal
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
                          <AvatarImage src={avatarPreview || "/placeholder.svg"} alt="Avatar" />
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
                        <Label htmlFor="name">Nombre de usuario</Label>
                        <Input
                          id="name"
                          value={formData.name}
                          onChange={(e) => handleInputChange("name", e.target.value)}
                          placeholder="Tu nombre de usuario"
                          required
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="location">País</Label>
                        <Input
                          id="location"
                          value={formData.location}
                          onChange={(e) => handleInputChange("location", e.target.value)}
                          placeholder="Tu país"
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
