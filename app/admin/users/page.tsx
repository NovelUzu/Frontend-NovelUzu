"use client"

import { useState, useEffect } from "react"
import {
  Search,
  UserPlus,
  Download,
  Mail,
  MoreHorizontal,
  Edit,
  Trash2,
  Shield,
  UserCheck,
  Ban,
  Eye,
  RefreshCw,
} from "lucide-react"
import { useRouter } from "next/navigation"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Label } from "@/components/ui/label"
import { toast } from "@/components/ui/use-toast"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { SiteHeader } from "@/components/site-header"

// Datos de ejemplo
const mockUsers = [
  {
    id: "1",
    name: "Ana García",
    email: "ana@example.com",
    role: "lector",
    status: "active",
    lastLogin: "2023-05-18T14:32:00Z",
    registeredAt: "2023-01-10T09:15:00Z",
    avatar: "/placeholder.jpg?height=40&width=40&text=AG",
    novels: 0,
    comments: 12,
  },
  {
    id: "2",
    name: "Carlos Rodríguez",
    email: "carlos@example.com",
    role: "escritor",
    status: "active",
    lastLogin: "2023-05-19T10:45:00Z",
    registeredAt: "2023-02-05T11:20:00Z",
    avatar: "/placeholder.jpg?height=40&width=40&text=CR",
    novels: 5,
    comments: 8,
  },
  {
    id: "3",
    name: "Elena Martínez",
    email: "elena@example.com",
    role: "admin",
    status: "active",
    lastLogin: "2023-05-20T08:15:00Z",
    registeredAt: "2022-11-15T14:30:00Z",
    avatar: "/placeholder.jpg?height=40&width=40&text=EM",
    novels: 0,
    comments: 3,
  },
  {
    id: "4",
    name: "David López",
    email: "david@example.com",
    role: "lector",
    status: "inactive",
    lastLogin: "2023-04-10T16:20:00Z",
    registeredAt: "2023-03-22T09:45:00Z",
    avatar: "/placeholder.jpg?height=40&width=40&text=DL",
    novels: 0,
    comments: 0,
  },
  {
    id: "5",
    name: "Sofía Pérez",
    email: "sofia@example.com",
    role: "escritor",
    status: "active",
    lastLogin: "2023-05-17T11:30:00Z",
    registeredAt: "2023-01-28T13:10:00Z",
    avatar: "/placeholder.jpg?height=40&width=40&text=SP",
    novels: 3,
    comments: 15,
  },
  {
    id: "6",
    name: "Miguel Sánchez",
    email: "miguel@example.com",
    role: "lector",
    status: "active",
    lastLogin: "2023-05-15T09:20:00Z",
    registeredAt: "2023-02-14T10:25:00Z",
    avatar: "/placeholder.jpg?height=40&width=40&text=MS",
    novels: 0,
    comments: 7,
  },
  {
    id: "7",
    name: "Laura Gómez",
    email: "laura@example.com",
    role: "escritor",
    status: "suspended",
    lastLogin: "2023-04-05T14:10:00Z",
    registeredAt: "2022-12-08T15:40:00Z",
    avatar: "/placeholder.jpg?height=40&width=40&text=LG",
    novels: 2,
    comments: 4,
  },
  {
    id: "8",
    name: "Javier Fernández",
    email: "javier@example.com",
    role: "lector",
    status: "active",
    lastLogin: "2023-05-16T17:45:00Z",
    registeredAt: "2023-03-01T08:30:00Z",
    avatar: "/placeholder.jpg?height=40&width=40&text=JF",
    novels: 0,
    comments: 9,
  },
  {
    id: "9",
    name: "Carmen Díaz",
    email: "carmen@example.com",
    role: "lector",
    status: "active",
    lastLogin: "2023-05-18T13:15:00Z",
    registeredAt: "2023-01-15T11:50:00Z",
    avatar: "/placeholder.jpg?height=40&width=40&text=CD",
    novels: 0,
    comments: 5,
  },
  {
    id: "10",
    name: "Pablo Ruiz",
    email: "pablo@example.com",
    role: "escritor",
    status: "active",
    lastLogin: "2023-05-19T15:30:00Z",
    registeredAt: "2023-02-20T09:15:00Z",
    avatar: "/placeholder.jpg?height=40&width=40&text=PR",
    novels: 4,
    comments: 11,
  },
]

export default function AdminUsersPage() {
  const router = useRouter()
  const [users, setUsers] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedRole, setSelectedRole] = useState<string>("all")
  const [selectedStatus, setSelectedStatus] = useState<string>("all")
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage] = useState(8)

  // Estados para diálogos
  const [isAddUserOpen, setIsAddUserOpen] = useState(false)
  const [isEditUserOpen, setIsEditUserOpen] = useState(false)
  const [isDeleteUserOpen, setIsDeleteUserOpen] = useState(false)
  const [currentUser, setCurrentUser] = useState<any>(null)
  const [newUser, setNewUser] = useState({
    name: "",
    email: "",
    role: "lector",
    password: "",
  })

  // Estadísticas
  const [stats, setStats] = useState({
    total: 0,
    active: 0,
    inactive: 0,
    suspended: 0,
    readers: 0,
    writers: 0,
    admins: 0,
  })

  useEffect(() => {
    // Simulación de carga de datos
    const loadData = async () => {
      await new Promise((resolve) => setTimeout(resolve, 1000))
      setUsers(mockUsers)

      // Calcular estadísticas
      const total = mockUsers.length
      const active = mockUsers.filter((user) => user.status === "active").length
      const inactive = mockUsers.filter((user) => user.status === "inactive").length
      const suspended = mockUsers.filter((user) => user.status === "suspended").length
      const readers = mockUsers.filter((user) => user.role === "lector").length
      const writers = mockUsers.filter((user) => user.role === "escritor").length
      const admins = mockUsers.filter((user) => user.role === "admin").length

      setStats({
        total,
        active,
        inactive,
        suspended,
        readers,
        writers,
        admins,
      })

      setIsLoading(false)
    }

    loadData()
  }, [])

  // Filtrar usuarios
  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesRole = selectedRole === "all" || user.role === selectedRole
    const matchesStatus = selectedStatus === "all" || user.status === selectedStatus

    return matchesSearch && matchesRole && matchesStatus
  })

  // Paginación
  const indexOfLastItem = currentPage * itemsPerPage
  const indexOfFirstItem = indexOfLastItem - itemsPerPage
  const currentUsers = filteredUsers.slice(indexOfFirstItem, indexOfLastItem)
  const totalPages = Math.ceil(filteredUsers.length / itemsPerPage)

  // Formatear fecha
  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return new Intl.DateTimeFormat("es-ES", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    }).format(date)
  }

  // Formatear fecha con hora
  const formatDateTime = (dateString: string) => {
    const date = new Date(dateString)
    return new Intl.DateTimeFormat("es-ES", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }).format(date)
  }

  // Obtener clase de estado
  const getStatusClass = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800"
      case "inactive":
        return "bg-gray-100 text-gray-800"
      case "suspended":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  // Obtener texto de estado
  const getStatusText = (status: string) => {
    switch (status) {
      case "active":
        return "Activo"
      case "inactive":
        return "Inactivo"
      case "suspended":
        return "Suspendido"
      default:
        return status
    }
  }

  // Obtener clase de rol
  const getRoleClass = (role: string) => {
    switch (role) {
      case "admin":
        return "bg-purple-100 text-purple-800"
      case "escritor":
        return "bg-blue-100 text-blue-800"
      case "lector":
        return "bg-yellow-100 text-yellow-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  // Obtener texto de rol
  const getRoleText = (role: string) => {
    switch (role) {
      case "admin":
        return "Administrador"
      case "escritor":
        return "Escritor"
      case "lector":
        return "Lector"
      default:
        return role
    }
  }

  // Manejar añadir usuario
  const handleAddUser = () => {
    // Validar campos
    if (!newUser.name || !newUser.email || !newUser.password) {
      toast({
        title: "Error",
        description: "Por favor, completa todos los campos obligatorios.",
        variant: "destructive",
      })
      return
    }

    // Crear nuevo usuario
    const id = (users.length + 1).toString()
    const now = new Date().toISOString()
    const newUserData = {
      id,
      name: newUser.name,
      email: newUser.email,
      role: newUser.role,
      status: "active",
      lastLogin: now,
      registeredAt: now,
      avatar: `/placeholder.jpg?height=40&width=40&text=${newUser.name.charAt(0)}${newUser.name.split(" ")[1]?.charAt(0) || ""}`,
      novels: 0,
      comments: 0,
    }

    setUsers([...users, newUserData])

    // Actualizar estadísticas
    setStats({
      ...stats,
      total: stats.total + 1,
      active: stats.active + 1,
      readers: newUser.role === "lector" ? stats.readers + 1 : stats.readers,
      writers: newUser.role === "escritor" ? stats.writers + 1 : stats.writers,
      admins: newUser.role === "admin" ? stats.admins + 1 : stats.admins,
    })

    // Limpiar formulario y cerrar diálogo
    setNewUser({
      name: "",
      email: "",
      role: "lector",
      password: "",
    })
    setIsAddUserOpen(false)

    toast({
      title: "Usuario creado",
      description: `El usuario ${newUser.name} ha sido creado correctamente.`,
    })
  }

  // Manejar editar usuario
  const handleEditUser = () => {
    if (!currentUser) return

    // Actualizar usuario
    const updatedUsers = users.map((user) => {
      if (user.id === currentUser.id) {
        return {
          ...user,
          name: currentUser.name,
          email: currentUser.email,
          role: currentUser.role,
          status: currentUser.status,
        }
      }
      return user
    })

    setUsers(updatedUsers)
    setIsEditUserOpen(false)

    toast({
      title: "Usuario actualizado",
      description: `El usuario ${currentUser.name} ha sido actualizado correctamente.`,
    })
  }

  // Manejar eliminar usuario
  const handleDeleteUser = () => {
    if (!currentUser) return

    // Eliminar usuario
    const updatedUsers = users.filter((user) => user.id !== currentUser.id)
    setUsers(updatedUsers)

    // Actualizar estadísticas
    setStats({
      ...stats,
      total: stats.total - 1,
      active: currentUser.status === "active" ? stats.active - 1 : stats.active,
      inactive: currentUser.status === "inactive" ? stats.inactive - 1 : stats.inactive,
      suspended: currentUser.status === "suspended" ? stats.suspended - 1 : stats.suspended,
      readers: currentUser.role === "lector" ? stats.readers - 1 : stats.readers,
      writers: currentUser.role === "escritor" ? stats.writers - 1 : stats.writers,
      admins: currentUser.role === "admin" ? stats.admins - 1 : stats.admins,
    })

    setIsDeleteUserOpen(false)

    toast({
      title: "Usuario eliminado",
      description: `El usuario ${currentUser.name} ha sido eliminado correctamente.`,
    })
  }

  // Manejar cambio de estado
  const handleStatusChange = (userId: string, newStatus: string) => {
    const user = users.find((u) => u.id === userId)
    if (!user) return

    // Actualizar estadísticas
    const statsUpdate = { ...stats }
    if (user.status === "active") statsUpdate.active -= 1
    if (user.status === "inactive") statsUpdate.inactive -= 1
    if (user.status === "suspended") statsUpdate.suspended -= 1

    if (newStatus === "active") statsUpdate.active += 1
    if (newStatus === "inactive") statsUpdate.inactive += 1
    if (newStatus === "suspended") statsUpdate.suspended += 1

    setStats(statsUpdate)

    // Actualizar usuario
    const updatedUsers = users.map((u) => {
      if (u.id === userId) {
        return { ...u, status: newStatus }
      }
      return u
    })

    setUsers(updatedUsers)

    toast({
      title: "Estado actualizado",
      description: `El usuario ahora está ${getStatusText(newStatus).toLowerCase()}.`,
    })
  }

  // Manejar cambio de rol
  const handleRoleChange = (userId: string, newRole: string) => {
    const user = users.find((u) => u.id === userId)
    if (!user) return

    // Actualizar estadísticas
    const statsUpdate = { ...stats }
    if (user.role === "lector") statsUpdate.readers -= 1
    if (user.role === "escritor") statsUpdate.writers -= 1
    if (user.role === "admin") statsUpdate.admins -= 1

    if (newRole === "lector") statsUpdate.readers += 1
    if (newRole === "escritor") statsUpdate.writers += 1
    if (newRole === "admin") statsUpdate.admins += 1

    setStats(statsUpdate)

    // Actualizar usuario
    const updatedUsers = users.map((u) => {
      if (u.id === userId) {
        return { ...u, role: newRole }
      }
      return u
    })

    setUsers(updatedUsers)

    toast({
      title: "Rol actualizado",
      description: `El usuario ahora es ${getRoleText(newRole).toLowerCase()}.`,
    })
  }

  // Manejar envío de correo
  const handleSendEmail = (userId: string) => {
    const user = users.find((u) => u.id === userId)
    if (!user) return

    toast({
      title: "Correo enviado",
      description: `Se ha enviado un correo a ${user.email}.`,
    })
  }

  // Manejar reseteo de contraseña
  const handleResetPassword = (userId: string) => {
    const user = users.find((u) => u.id === userId)
    if (!user) return

    toast({
      title: "Contraseña restablecida",
      description: `Se ha enviado un enlace de restablecimiento a ${user.email}.`,
    })
  }

  // Manejar ver perfil
  const handleViewProfile = (userId: string) => {
    router.push(`/admin/users/${userId}`)
  }

  if (isLoading) {
    return (
      <div className="flex min-h-screen flex-col">
        <SiteHeader />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
            <p className="mt-4 text-muted-foreground">Cargando usuarios...</p>
          </div>
        </main>
      </div>
    )
  }

  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main className="flex-1 container py-6 md:py-12">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold">Gestión de Usuarios</h1>
            <p className="text-muted-foreground mt-1">
              Administra los usuarios de la plataforma, sus roles y permisos.
            </p>
          </div>

          <div className="mt-4 md:mt-0 flex flex-wrap gap-2">
            <Button className="inline-flex items-center gap-2" onClick={() => setIsAddUserOpen(true)}>
              <UserPlus className="h-5 w-5" />
              <span>Añadir usuario</span>
            </Button>
            <Button
              variant="outline"
              className="inline-flex items-center gap-2"
              onClick={() => {
                toast({
                  title: "Correo masivo enviado",
                  description: "Se ha enviado un correo a todos los usuarios seleccionados.",
                })
              }}
            >
              <Mail className="h-5 w-5" />
              <span>Enviar correo</span>
            </Button>
            <Button
              variant="outline"
              className="inline-flex items-center gap-2"
              onClick={() => {
                toast({
                  title: "Exportación iniciada",
                  description:
                    "Los datos de usuarios se están exportando. Recibirás una notificación cuando esté listo.",
                })
              }}
            >
              <Download className="h-5 w-5" />
              <span>Exportar</span>
            </Button>
          </div>
        </div>

        {/* Tarjetas de estadísticas */}
        <div className="grid gap-4 md:grid-cols-4 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total de Usuarios</CardTitle>
              <UserCheck className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.total}</div>
              <p className="text-xs text-muted-foreground">
                {stats.active} activos, {stats.inactive} inactivos, {stats.suspended} suspendidos
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Lectores</CardTitle>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-4 w-4 text-muted-foreground"
              >
                <path d="M2 12h5"></path>
                <path d="M9 12h5"></path>
                <path d="M16 12h6"></path>
                <path d="M3 7h7"></path>
                <path d="M12 7h4"></path>
                <path d="M18 7h2"></path>
                <path d="M5 17h2"></path>
                <path d="M9 17h7"></path>
                <path d="M18 17h1"></path>
              </svg>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.readers}</div>
              <p className="text-xs text-muted-foreground">
                {Math.round((stats.readers / stats.total) * 100)}% del total
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Escritores</CardTitle>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-4 w-4 text-muted-foreground"
              >
                <path d="M17.5 4.5l-8 8"></path>
                <path d="m3 11 8 8"></path>
                <path d="m14 6 7 7"></path>
              </svg>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.writers}</div>
              <p className="text-xs text-muted-foreground">
                {Math.round((stats.writers / stats.total) * 100)}% del total
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Administradores</CardTitle>
              <Shield className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.admins}</div>
              <p className="text-xs text-muted-foreground">
                {Math.round((stats.admins / stats.total) * 100)}% del total
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Filtros y búsqueda */}
        <div className="mb-6 grid gap-4 md:grid-cols-4">
          <div className="md:col-span-2">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Buscar por nombre o email..."
                className="pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
          <div>
            <Select value={selectedRole} onValueChange={setSelectedRole}>
              <SelectTrigger>
                <SelectValue placeholder="Filtrar por rol" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos los roles</SelectItem>
                <SelectItem value="admin">Administrador</SelectItem>
                <SelectItem value="escritor">Escritor</SelectItem>
                <SelectItem value="lector">Lector</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Select value={selectedStatus} onValueChange={setSelectedStatus}>
              <SelectTrigger>
                <SelectValue placeholder="Filtrar por estado" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos los estados</SelectItem>
                <SelectItem value="active">Activo</SelectItem>
                <SelectItem value="inactive">Inactivo</SelectItem>
                <SelectItem value="suspended">Suspendido</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Tabla de usuarios */}
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Usuario</TableHead>
                <TableHead>Rol</TableHead>
                <TableHead>Estado</TableHead>
                <TableHead>Último acceso</TableHead>
                <TableHead>Registro</TableHead>
                <TableHead className="text-right">Acciones</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {currentUsers.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} className="h-24 text-center">
                    No se encontraron usuarios que coincidan con los filtros.
                  </TableCell>
                </TableRow>
              ) : (
                currentUsers.map((user) => (
                  <TableRow key={user.id}>
                    <TableCell className="font-medium">
                      <div className="flex items-center gap-3">
                        <Avatar className="h-8 w-8">
                          <AvatarImage src={user.avatar || "/placeholder.jpg"} alt={user.name} />
                          <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="font-medium">{user.name}</div>
                          <div className="text-sm text-muted-foreground">{user.email}</div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge className={getRoleClass(user.role)}>{getRoleText(user.role)}</Badge>
                    </TableCell>
                    <TableCell>
                      <Badge className={getStatusClass(user.status)}>{getStatusText(user.status)}</Badge>
                    </TableCell>
                    <TableCell>
                      <div className="text-sm">{formatDateTime(user.lastLogin)}</div>
                    </TableCell>
                    <TableCell>
                      <div className="text-sm">{formatDate(user.registeredAt)}</div>
                    </TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" className="h-8 w-8 p-0">
                            <span className="sr-only">Abrir menú</span>
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem onClick={() => handleViewProfile(user.id)}>
                            <Eye className="mr-2 h-4 w-4" />
                            <span>Ver perfil</span>
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() => {
                              setCurrentUser(user)
                              setIsEditUserOpen(true)
                            }}
                          >
                            <Edit className="mr-2 h-4 w-4" />
                            <span>Editar</span>
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleSendEmail(user.id)}>
                            <Mail className="mr-2 h-4 w-4" />
                            <span>Enviar correo</span>
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleResetPassword(user.id)}>
                            <RefreshCw className="mr-2 h-4 w-4" />
                            <span>Restablecer contraseña</span>
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />

                          {/* Cambiar rol */}
                          <DropdownMenuItem
                            onClick={() => handleRoleChange(user.id, "lector")}
                            disabled={user.role === "lector"}
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="24"
                              height="24"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              className="mr-2 h-4 w-4"
                            >
                              <path d="M2 12h5"></path>
                              <path d="M9 12h5"></path>
                              <path d="M16 12h6"></path>
                              <path d="M3 7h7"></path>
                              <path d="M12 7h4"></path>
                              <path d="M18 7h2"></path>
                              <path d="M5 17h2"></path>
                              <path d="M9 17h7"></path>
                              <path d="M18 17h1"></path>
                            </svg>
                            <span>Cambiar a Lector</span>
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() => handleRoleChange(user.id, "escritor")}
                            disabled={user.role === "escritor"}
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="24"
                              height="24"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              className="mr-2 h-4 w-4"
                            >
                              <path d="M17.5 4.5l-8 8"></path>
                              <path d="m3 11 8 8"></path>
                              <path d="m14 6 7 7"></path>
                            </svg>
                            <span>Cambiar a Escritor</span>
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() => handleRoleChange(user.id, "admin")}
                            disabled={user.role === "admin"}
                          >
                            <Shield className="mr-2 h-4 w-4" />
                            <span>Cambiar a Admin</span>
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />

                          {/* Cambiar estado */}
                          <DropdownMenuItem
                            onClick={() => handleStatusChange(user.id, "active")}
                            disabled={user.status === "active"}
                          >
                            <UserCheck className="mr-2 h-4 w-4" />
                            <span>Activar</span>
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() => handleStatusChange(user.id, "inactive")}
                            disabled={user.status === "inactive"}
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="24"
                              height="24"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              className="mr-2 h-4 w-4"
                            >
                              <path d="M18.364 5.636a9 9 0 0 1 .203 12.728"></path>
                              <path d="M21 3 3 21"></path>
                              <path d="M12 12a9 9 0 0 0 9 9"></path>
                              <path d="M3 3a9 9 0 0 1 9 9"></path>
                            </svg>
                            <span>Desactivar</span>
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() => handleStatusChange(user.id, "suspended")}
                            disabled={user.status === "suspended"}
                            className="text-red-600 focus:text-red-600"
                          >
                            <Ban className="mr-2 h-4 w-4" />
                            <span>Suspender</span>
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />

                          {/* Eliminar */}
                          <DropdownMenuItem
                            onClick={() => {
                              setCurrentUser(user)
                              setIsDeleteUserOpen(true)
                            }}
                            className="text-red-600 focus:text-red-600"
                          >
                            <Trash2 className="mr-2 h-4 w-4" />
                            <span>Eliminar</span>
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>

        {/* Paginación */}
        {totalPages > 1 && (
          <div className="flex items-center justify-center space-x-2 py-4">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
            >
              Anterior
            </Button>
            <div className="text-sm text-muted-foreground">
              Página {currentPage} de {totalPages}
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
            >
              Siguiente
            </Button>
          </div>
        )}

        {/* Diálogo para añadir usuario */}
        <Dialog open={isAddUserOpen} onOpenChange={setIsAddUserOpen}>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Añadir nuevo usuario</DialogTitle>
              <DialogDescription>Completa los campos para crear un nuevo usuario en la plataforma.</DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="name">Nombre completo</Label>
                <Input
                  id="name"
                  value={newUser.name}
                  onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
                  placeholder="Nombre y apellidos"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="email">Correo electrónico</Label>
                <Input
                  id="email"
                  type="email"
                  value={newUser.email}
                  onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
                  placeholder="correo@ejemplo.com"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="role">Rol</Label>
                <Select value={newUser.role} onValueChange={(value) => setNewUser({ ...newUser, role: value })}>
                  <SelectTrigger id="role">
                    <SelectValue placeholder="Seleccionar rol" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="lector">Lector</SelectItem>
                    <SelectItem value="escritor">Escritor</SelectItem>
                    <SelectItem value="admin">Administrador</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="password">Contraseña</Label>
                <Input
                  id="password"
                  type="password"
                  value={newUser.password}
                  onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
                  placeholder="Contraseña segura"
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsAddUserOpen(false)}>
                Cancelar
              </Button>
              <Button onClick={handleAddUser}>Crear usuario</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Diálogo para editar usuario */}
        <Dialog open={isEditUserOpen} onOpenChange={setIsEditUserOpen}>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Editar usuario</DialogTitle>
              <DialogDescription>Modifica los datos del usuario seleccionado.</DialogDescription>
            </DialogHeader>
            {currentUser && (
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <Label htmlFor="edit-name">Nombre completo</Label>
                  <Input
                    id="edit-name"
                    value={currentUser.name}
                    onChange={(e) => setCurrentUser({ ...currentUser, name: e.target.value })}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="edit-email">Correo electrónico</Label>
                  <Input
                    id="edit-email"
                    type="email"
                    value={currentUser.email}
                    onChange={(e) => setCurrentUser({ ...currentUser, email: e.target.value })}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="edit-role">Rol</Label>
                  <Select
                    value={currentUser.role}
                    onValueChange={(value) => setCurrentUser({ ...currentUser, role: value })}
                  >
                    <SelectTrigger id="edit-role">
                      <SelectValue placeholder="Seleccionar rol" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="lector">Lector</SelectItem>
                      <SelectItem value="escritor">Escritor</SelectItem>
                      <SelectItem value="admin">Administrador</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="edit-status">Estado</Label>
                  <Select
                    value={currentUser.status}
                    onValueChange={(value) => setCurrentUser({ ...currentUser, status: value })}
                  >
                    <SelectTrigger id="edit-status">
                      <SelectValue placeholder="Seleccionar estado" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="active">Activo</SelectItem>
                      <SelectItem value="inactive">Inactivo</SelectItem>
                      <SelectItem value="suspended">Suspendido</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            )}
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsEditUserOpen(false)}>
                Cancelar
              </Button>
              <Button onClick={handleEditUser}>Guardar cambios</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Diálogo para eliminar usuario */}
        <Dialog open={isDeleteUserOpen} onOpenChange={setIsDeleteUserOpen}>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Eliminar usuario</DialogTitle>
              <DialogDescription>
                ¿Estás seguro de que deseas eliminar este usuario? Esta acción no se puede deshacer.
              </DialogDescription>
            </DialogHeader>
            {currentUser && (
              <div className="py-4">
                <div className="flex items-center gap-3 mb-4">
                  <Avatar className="h-10 w-10">
                    <AvatarImage src={currentUser.avatar || "/placeholder.jpg"} alt={currentUser.name} />
                    <AvatarFallback>{currentUser.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="font-medium">{currentUser.name}</div>
                    <div className="text-sm text-muted-foreground">{currentUser.email}</div>
                  </div>
                </div>
                <div className="text-sm text-muted-foreground">
                  Al eliminar este usuario, se eliminarán todos sus datos asociados, incluyendo comentarios, reseñas y
                  preferencias.
                </div>
              </div>
            )}
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsDeleteUserOpen(false)}>
                Cancelar
              </Button>
              <Button variant="destructive" onClick={handleDeleteUser}>
                Eliminar usuario
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </main>
    </div>
  )
}
