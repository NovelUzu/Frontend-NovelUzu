"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Camera, Save, X, User, Shield, Eye, EyeOff, Trash2 } from "lucide-react"
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
import { SiteFooter } from "@/components/site-footer"
import { storage } from "@/lib/contexts/auth/utils"

export default function EditProfilePage() {
  const router = useRouter()
  const { user, isLoading, isAuthenticated, refreshUser, logoutLocal } = useAuth()
  const { toast } = useToast()

  const [formData, setFormData] = useState({
    name: "",
    bio: "",
    avatar: null as File | null,
    location: "",
    birthDate: "",
  })
  const [avatarPreview, setAvatarPreview] = useState<string>("")

  // Estados para cambio de contraseña
  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  })
  const [showPasswords, setShowPasswords] = useState({
    current: false,
    new: false,
    confirm: false,
  })
  const [isChangingPassword, setIsChangingPassword] = useState(false)

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [activeTab, setActiveTab] = useState("personal")
  const [isDeletingAccount, setIsDeletingAccount] = useState(false)
  const [deletePassword, setDeletePassword] = useState("")
  const [showDeletePassword, setShowDeletePassword] = useState(false)

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

  const handlePasswordChange = (field: string, value: string) => {
    setPasswordData((prev) => ({ ...prev, [field]: value }))
  }

  const togglePasswordVisibility = (field: 'current' | 'new' | 'confirm') => {
    setShowPasswords((prev) => ({ ...prev, [field]: !prev[field] }))
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

  const handlePasswordSubmit = async () => {
    setIsChangingPassword(true)

    try {
      // Validaciones frontend
      if (!passwordData.currentPassword || !passwordData.newPassword || !passwordData.confirmPassword) {
        throw new Error("Todos los campos son requeridos")
      }

      if (passwordData.newPassword.length < 6) {
        throw new Error("La nueva contraseña debe tener al menos 6 caracteres")
      }

      if (passwordData.newPassword !== passwordData.confirmPassword) {
        throw new Error("Las contraseñas no coinciden")
      }

      if (passwordData.currentPassword === passwordData.newPassword) {
        throw new Error("La nueva contraseña debe ser diferente a la actual")
      }

      // Llamada al backend para cambiar contraseña
      await api.users.changePassword({
        current_password: passwordData.currentPassword,
        new_password: passwordData.newPassword,
      })

      toast({
        title: "Contraseña actualizada",
        description: "Tu contraseña ha sido cambiada exitosamente.",
      })

      // Limpiar formulario
      setPasswordData({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      })

      // Redireccionar al perfil después de 1 segundo
      setTimeout(() => {
        router.push("/user/profile")
      }, 1000)

    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "No se pudo cambiar la contraseña.",
        variant: "destructive",
      })
    } finally {
      setIsChangingPassword(false)
    }
  }

  const handleDeleteAccount = async () => {
    setIsDeletingAccount(true)

    try {
      // Validar que se ingresó la contraseña
      if (!deletePassword) {
        throw new Error("Debes ingresar tu contraseña para confirmar la eliminación")
      }

      // Llamada al backend para eliminar cuenta
      await api.users.deleteAccount({
        password: deletePassword,
      })

      // Limpiar localStorage y sessionStorage y contexto de auth
      logoutLocal()

      toast({
        title: "Cuenta eliminada",
        description: "Tu cuenta ha sido eliminada exitosamente.",
      })

      // Limpiar contraseña
      setDeletePassword("")

      // Redireccionar después de eliminar
      setTimeout(() => {
        router.push("/")
      }, 1000)

    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "No se pudo eliminar la cuenta.",
        variant: "destructive",
      })
    } finally {
      setIsDeletingAccount(false)
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
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="personal" className="flex items-center gap-2">
                  <User className="h-4 w-4" />
                  Información Personal
                </TabsTrigger>
                <TabsTrigger value="security" className="flex items-center gap-2">
                  <Shield className="h-4 w-4" />
                  Seguridad
                </TabsTrigger>
                <TabsTrigger value="danger" className="flex items-center gap-2 text-red-600">
                  <Trash2 className="h-4 w-4" />
                  Zona Peligrosa
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

                {/* Botones de acción - Para la pestaña personal */}
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
              </TabsContent>

              {/* Seguridad - Cambio de contraseña */}
              <TabsContent value="security" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Cambiar Contraseña</CardTitle>
                    <CardDescription>Actualiza tu contraseña para mantener tu cuenta segura</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {/* Contraseña actual */}
                      <div className="space-y-2">
                        <Label htmlFor="currentPassword">Contraseña actual</Label>
                        <div className="relative">
                          <Input
                            id="currentPassword"
                            type={showPasswords.current ? "text" : "password"}
                            value={passwordData.currentPassword}
                            onChange={(e) => handlePasswordChange("currentPassword", e.target.value)}
                            placeholder="Ingresa tu contraseña actual"
                          />
                          <button
                            type="button"
                            className="absolute inset-y-0 right-0 pr-3 flex items-center"
                            onClick={() => togglePasswordVisibility('current')}
                          >
                            {showPasswords.current ? (
                              <EyeOff className="h-4 w-4 text-gray-400" />
                            ) : (
                              <Eye className="h-4 w-4 text-gray-400" />
                            )}
                          </button>
                        </div>
                      </div>

                      {/* Nueva contraseña */}
                      <div className="space-y-2">
                        <Label htmlFor="newPassword">Nueva contraseña</Label>
                        <div className="relative">
                          <Input
                            id="newPassword"
                            type={showPasswords.new ? "text" : "password"}
                            value={passwordData.newPassword}
                            onChange={(e) => handlePasswordChange("newPassword", e.target.value)}
                            placeholder="Ingresa tu nueva contraseña"
                            minLength={6}
                          />
                          <button
                            type="button"
                            className="absolute inset-y-0 right-0 pr-3 flex items-center"
                            onClick={() => togglePasswordVisibility('new')}
                          >
                            {showPasswords.new ? (
                              <EyeOff className="h-4 w-4 text-gray-400" />
                            ) : (
                              <Eye className="h-4 w-4 text-gray-400" />
                            )}
                          </button>
                        </div>
                        <p className="text-sm text-gray-500">Mínimo 6 caracteres</p>
                      </div>

                      {/* Confirmar contraseña */}
                      <div className="space-y-2">
                        <Label htmlFor="confirmPassword">Confirmar nueva contraseña</Label>
                        <div className="relative">
                          <Input
                            id="confirmPassword"
                            type={showPasswords.confirm ? "text" : "password"}
                            value={passwordData.confirmPassword}
                            onChange={(e) => handlePasswordChange("confirmPassword", e.target.value)}
                            placeholder="Confirma tu nueva contraseña"
                          />
                          <button
                            type="button"
                            className="absolute inset-y-0 right-0 pr-3 flex items-center"
                            onClick={() => togglePasswordVisibility('confirm')}
                          >
                            {showPasswords.confirm ? (
                              <EyeOff className="h-4 w-4 text-gray-400" />
                            ) : (
                              <Eye className="h-4 w-4 text-gray-400" />
                            )}
                          </button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Botones de acción - Para la pestaña seguridad */}
                <div className="flex justify-end space-x-4 pt-6 border-t">
                  <Button type="button" variant="outline" onClick={() => router.back()} disabled={isChangingPassword}>
                    <X className="h-4 w-4 mr-2" />
                    Cancelar
                  </Button>
                  <Button 
                    type="button"
                    onClick={handlePasswordSubmit}
                    disabled={isChangingPassword}
                    className="min-w-[120px]"
                  >
                    {isChangingPassword ? (
                      <div className="flex items-center">
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                        Cambiando...
                      </div>
                    ) : (
                      <>
                        <Shield className="h-4 w-4 mr-2" />
                        Cambiar contraseña
                      </>
                    )}
                  </Button>
                </div>
              </TabsContent>

              {/* Zona Peligrosa - Eliminar cuenta */}
              <TabsContent value="danger" className="space-y-6">
                <Card className="border-red-200 bg-red-50 dark:border-red-800 dark:bg-red-950">
                  <CardHeader>
                    <CardTitle className="text-red-900 dark:text-red-100">Zona Peligrosa</CardTitle>
                    <CardDescription className="text-red-700 dark:text-red-300">
                      Las acciones en esta sección no se pueden deshacer. Procede con precaución.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      <div className="p-4 border border-red-300 rounded-lg bg-white dark:bg-red-900 dark:border-red-700">
                        <h3 className="font-medium text-red-900 dark:text-red-100 mb-2">Eliminar cuenta</h3>
                        <p className="text-sm text-red-700 dark:text-red-300 mb-4">
                          Una vez que elimines tu cuenta, no hay vuelta atrás. Por favor, asegúrate de que realmente quieres hacer esto.
                        </p>
                        
                        {/* Campo de contraseña para confirmar eliminación */}
                        <div className="space-y-4">
                          <div className="space-y-2">
                            <Label htmlFor="deletePassword" className="text-red-900 dark:text-red-100">
                              Confirma tu contraseña para eliminar la cuenta
                            </Label>
                            <div className="relative">
                              <Input
                                id="deletePassword"
                                type={showDeletePassword ? "text" : "password"}
                                value={deletePassword}
                                onChange={(e) => setDeletePassword(e.target.value)}
                                placeholder="Ingresa tu contraseña actual"
                                className="border-red-300 focus:border-red-500"
                                disabled={isDeletingAccount}
                              />
                              <button
                                type="button"
                                className="absolute inset-y-0 right-0 pr-3 flex items-center"
                                onClick={() => setShowDeletePassword(!showDeletePassword)}
                                disabled={isDeletingAccount}
                              >
                                {showDeletePassword ? (
                                  <EyeOff className="h-4 w-4 text-gray-400" />
                                ) : (
                                  <Eye className="h-4 w-4 text-gray-400" />
                                )}
                              </button>
                            </div>
                          </div>

                          <Button
                            type="button"
                            variant="destructive"
                            onClick={handleDeleteAccount}
                            disabled={isDeletingAccount || !deletePassword}
                            className="min-w-[140px]"
                          >
                            {isDeletingAccount ? (
                              <div className="flex items-center">
                                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                                Eliminando...
                              </div>
                            ) : (
                              <>
                                <Trash2 className="h-4 w-4 mr-2" />
                                Eliminar cuenta
                              </>
                            )}
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </form>
        </div>
      </main>
      <SiteFooter />
    </div>
  )
}
