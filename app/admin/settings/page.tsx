"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Settings, Shield, Mail, Bell, Upload, RefreshCw, Trash2, Database, Palette } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"

export default function AdminSettingsPage() {
  const [activeTab, setActiveTab] = useState("general")
  const { toast } = useToast()

  // Función para guardar configuración
  const saveSettings = () => {
    toast({
      title: "Configuración guardada",
      description: "Los cambios han sido guardados correctamente.",
    })
  }

  return (
    <div className="container mx-auto p-4 space-y-6">
      <div className="flex items-center gap-2">
        <Settings className="h-6 w-6" />
        <h1 className="text-2xl font-bold">Configuración del Sistema</h1>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6">
          <TabsTrigger value="general" className="flex items-center gap-2">
            <Settings size={16} />
            <span>General</span>
          </TabsTrigger>
          <TabsTrigger value="security" className="flex items-center gap-2">
            <Shield size={16} />
            <span>Seguridad</span>
          </TabsTrigger>
          <TabsTrigger value="email" className="flex items-center gap-2">
            <Mail size={16} />
            <span>Email</span>
          </TabsTrigger>
          <TabsTrigger value="notifications" className="flex items-center gap-2">
            <Bell size={16} />
            <span>Notificaciones</span>
          </TabsTrigger>
          <TabsTrigger value="storage" className="flex items-center gap-2">
            <Upload size={16} />
            <span>Almacenamiento</span>
          </TabsTrigger>
          <TabsTrigger value="appearance" className="flex items-center gap-2">
            <Palette size={16} />
            <span>Apariencia</span>
          </TabsTrigger>
        </TabsList>

        {/* Pestaña General */}
        <TabsContent value="general">
          <Card>
            <CardHeader>
              <CardTitle>Configuración General</CardTitle>
              <CardDescription>Configura los ajustes básicos de la plataforma.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="site-name">Nombre del Sitio</Label>
                <Input id="site-name" defaultValue="NovelUzu" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="site-description">Descripción del Sitio</Label>
                <Textarea
                  id="site-description"
                  defaultValue="Plataforma moderna para escritores y lectores de novelas web"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="site-language">Idioma Predeterminado</Label>
                <Select defaultValue="es">
                  <SelectTrigger id="site-language">
                    <SelectValue placeholder="Seleccionar idioma" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="es">Español</SelectItem>
                    <SelectItem value="en">English</SelectItem>
                    <SelectItem value="fr">Français</SelectItem>
                    <SelectItem value="de">Deutsch</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="items-per-page">Elementos por Página</Label>
                <Select defaultValue="12">
                  <SelectTrigger id="items-per-page">
                    <SelectValue placeholder="Seleccionar cantidad" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="6">6</SelectItem>
                    <SelectItem value="12">12</SelectItem>
                    <SelectItem value="24">24</SelectItem>
                    <SelectItem value="48">48</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex items-center space-x-2">
                <Switch id="maintenance-mode" />
                <Label htmlFor="maintenance-mode">Modo Mantenimiento</Label>
              </div>
            </CardContent>
            <CardFooter className="flex justify-end gap-2">
              <Button variant="outline">Cancelar</Button>
              <Button onClick={saveSettings}>Guardar Cambios</Button>
            </CardFooter>
          </Card>
        </TabsContent>

        {/* Pestaña Seguridad */}
        <TabsContent value="security">
          <Card>
            <CardHeader>
              <CardTitle>Configuración de Seguridad</CardTitle>
              <CardDescription>Gestiona la seguridad y privacidad de la plataforma.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="password-policy">Política de Contraseñas</Label>
                <Select defaultValue="strong">
                  <SelectTrigger id="password-policy">
                    <SelectValue placeholder="Seleccionar política" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="basic">Básica (mínimo 6 caracteres)</SelectItem>
                    <SelectItem value="medium">Media (mínimo 8 caracteres, 1 número)</SelectItem>
                    <SelectItem value="strong">
                      Fuerte (mínimo 10 caracteres, mayúsculas, números y símbolos)
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="session-timeout">Tiempo de Sesión (minutos)</Label>
                <Input id="session-timeout" type="number" defaultValue="60" />
              </div>
              <div className="flex items-center space-x-2">
                <Switch id="two-factor" />
                <Label htmlFor="two-factor">Habilitar Autenticación de Dos Factores</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Switch id="captcha" defaultChecked />
                <Label htmlFor="captcha">Habilitar CAPTCHA en Formularios</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Switch id="content-filter" defaultChecked />
                <Label htmlFor="content-filter">Filtro Automático de Contenido Inapropiado</Label>
              </div>
            </CardContent>
            <CardFooter className="flex justify-end gap-2">
              <Button variant="outline">Cancelar</Button>
              <Button onClick={saveSettings}>Guardar Cambios</Button>
            </CardFooter>
          </Card>
        </TabsContent>

        {/* Pestaña Email */}
        <TabsContent value="email">
          <Card>
            <CardHeader>
              <CardTitle>Configuración de Email</CardTitle>
              <CardDescription>Configura el sistema de correo electrónico.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="smtp-host">Servidor SMTP</Label>
                <Input id="smtp-host" defaultValue="smtp.example.com" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="smtp-port">Puerto SMTP</Label>
                <Input id="smtp-port" defaultValue="587" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="smtp-user">Usuario SMTP</Label>
                <Input id="smtp-user" defaultValue="noreply@noveluzu.com" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="smtp-password">Contraseña SMTP</Label>
                <Input id="smtp-password" type="password" defaultValue="********" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="from-email">Email Remitente</Label>
                <Input id="from-email" defaultValue="noreply@noveluzu.com" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="from-name">Nombre Remitente</Label>
                <Input id="from-name" defaultValue="NovelUzu" />
              </div>
              <div className="flex items-center space-x-2">
                <Switch id="email-verification" defaultChecked />
                <Label htmlFor="email-verification">Requerir Verificación de Email</Label>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline" className="flex items-center gap-2">
                <RefreshCw size={16} />
                <span>Probar Conexión</span>
              </Button>
              <Button onClick={saveSettings}>Guardar Cambios</Button>
            </CardFooter>
          </Card>
        </TabsContent>

        {/* Pestaña Notificaciones */}
        <TabsContent value="notifications">
          <Card>
            <CardHeader>
              <CardTitle>Configuración de Notificaciones</CardTitle>
              <CardDescription>Gestiona las notificaciones del sistema.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Notificaciones por Email</h3>
                <div className="flex items-center justify-between">
                  <Label htmlFor="email-new-user">Nuevo Usuario Registrado</Label>
                  <Switch id="email-new-user" defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="email-new-novel">Nueva Novela Publicada</Label>
                  <Switch id="email-new-novel" defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="email-new-chapter">Nuevo Capítulo Publicado</Label>
                  <Switch id="email-new-chapter" defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="email-report">Contenido Reportado</Label>
                  <Switch id="email-report" defaultChecked />
                </div>
              </div>

              <div className="space-y-4 pt-4 border-t">
                <h3 className="text-lg font-medium">Notificaciones en Plataforma</h3>
                <div className="flex items-center justify-between">
                  <Label htmlFor="notify-new-follower">Nuevo Seguidor</Label>
                  <Switch id="notify-new-follower" defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="notify-new-comment">Nuevo Comentario</Label>
                  <Switch id="notify-new-comment" defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="notify-new-rating">Nueva Valoración</Label>
                  <Switch id="notify-new-rating" defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="notify-achievement">Logro Desbloqueado</Label>
                  <Switch id="notify-achievement" defaultChecked />
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-end gap-2">
              <Button variant="outline">Cancelar</Button>
              <Button onClick={saveSettings}>Guardar Cambios</Button>
            </CardFooter>
          </Card>
        </TabsContent>

        {/* Pestaña Almacenamiento */}
        <TabsContent value="storage">
          <Card>
            <CardHeader>
              <CardTitle>Configuración de Almacenamiento</CardTitle>
              <CardDescription>Gestiona el almacenamiento de archivos y datos.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="storage-provider">Proveedor de Almacenamiento</Label>
                <Select defaultValue="local">
                  <SelectTrigger id="storage-provider">
                    <SelectValue placeholder="Seleccionar proveedor" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="local">Almacenamiento Local</SelectItem>
                    <SelectItem value="s3">Amazon S3</SelectItem>
                    <SelectItem value="cloudinary">Cloudinary</SelectItem>
                    <SelectItem value="firebase">Firebase Storage</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="max-file-size">Tamaño Máximo de Archivo (MB)</Label>
                <Input id="max-file-size" type="number" defaultValue="5" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="allowed-file-types">Tipos de Archivo Permitidos</Label>
                <Input id="allowed-file-types" defaultValue="jpg,jpeg,png,gif,webp" />
              </div>

              <div className="space-y-4 pt-4 border-t">
                <h3 className="text-lg font-medium">Optimización de Imágenes</h3>
                <div className="flex items-center justify-between">
                  <Label htmlFor="image-compression">Compresión de Imágenes</Label>
                  <Switch id="image-compression" defaultChecked />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="image-quality">Calidad de Imagen (%)</Label>
                  <Input id="image-quality" type="number" defaultValue="85" />
                </div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="image-resize">Redimensionar Imágenes Grandes</Label>
                  <Switch id="image-resize" defaultChecked />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="max-image-width">Ancho Máximo de Imagen (px)</Label>
                  <Input id="max-image-width" type="number" defaultValue="1920" />
                </div>
              </div>

              <div className="space-y-4 pt-4 border-t">
                <h3 className="text-lg font-medium">Mantenimiento</h3>
                <div className="flex justify-between gap-4">
                  <Button variant="outline" className="flex-1 flex items-center justify-center gap-2">
                    <Database size={16} />
                    <span>Limpiar Caché</span>
                  </Button>
                  <Button variant="outline" className="flex-1 flex items-center justify-center gap-2">
                    <Trash2 size={16} />
                    <span>Eliminar Archivos Temporales</span>
                  </Button>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-end gap-2">
              <Button variant="outline">Cancelar</Button>
              <Button onClick={saveSettings}>Guardar Cambios</Button>
            </CardFooter>
          </Card>
        </TabsContent>

        {/* Pestaña Apariencia */}
        <TabsContent value="appearance">
          <Card>
            <CardHeader>
              <CardTitle>Configuración de Apariencia</CardTitle>
              <CardDescription>Personaliza la apariencia de la plataforma.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="primary-color">Color Primario</Label>
                <div className="flex gap-2">
                  <Input id="primary-color" type="color" defaultValue="#3b82f6" className="w-16 h-10" />
                  <Input defaultValue="#3b82f6" className="flex-1" />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="secondary-color">Color Secundario</Label>
                <div className="flex gap-2">
                  <Input id="secondary-color" type="color" defaultValue="#10b981" className="w-16 h-10" />
                  <Input defaultValue="#10b981" className="flex-1" />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="accent-color">Color de Acento</Label>
                <div className="flex gap-2">
                  <Input id="accent-color" type="color" defaultValue="#f59e0b" className="w-16 h-10" />
                  <Input defaultValue="#f59e0b" className="flex-1" />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="font-family">Fuente Principal</Label>
                <Select defaultValue="inter">
                  <SelectTrigger id="font-family">
                    <SelectValue placeholder="Seleccionar fuente" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="inter">Inter</SelectItem>
                    <SelectItem value="roboto">Roboto</SelectItem>
                    <SelectItem value="opensans">Open Sans</SelectItem>
                    <SelectItem value="montserrat">Montserrat</SelectItem>
                    <SelectItem value="lato">Lato</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="border-radius">Radio de Bordes (px)</Label>
                <Input id="border-radius" type="number" defaultValue="8" />
              </div>

              <div className="flex items-center space-x-2">
                <Switch id="dark-mode-default" />
                <Label htmlFor="dark-mode-default">Modo Oscuro por Defecto</Label>
              </div>

              <div className="flex items-center space-x-2">
                <Switch id="custom-scrollbar" defaultChecked />
                <Label htmlFor="custom-scrollbar">Barra de Desplazamiento Personalizada</Label>
              </div>

              <div className="space-y-4 pt-4 border-t">
                <h3 className="text-lg font-medium">Personalización de Página de Inicio</h3>
                <div className="space-y-2">
                  <Label htmlFor="hero-layout">Diseño de Hero</Label>
                  <Select defaultValue="centered">
                    <SelectTrigger id="hero-layout">
                      <SelectValue placeholder="Seleccionar diseño" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="centered">Centrado</SelectItem>
                      <SelectItem value="split">Dividido</SelectItem>
                      <SelectItem value="fullwidth">Ancho Completo</SelectItem>
                      <SelectItem value="minimal">Minimalista</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="featured-novels">Novelas Destacadas</Label>
                  <Input id="featured-novels" type="number" defaultValue="6" />
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline" className="flex items-center gap-2">
                <RefreshCw size={16} />
                <span>Restaurar Valores Predeterminados</span>
              </Button>
              <Button onClick={saveSettings}>Guardar Cambios</Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
