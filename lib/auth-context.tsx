"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import { apiService, type User as ApiUser } from "./api"

// Definimos los tipos de roles disponibles (simplificado)
export type UserRole = "usuario" | "admin"

// Interfaz para el elemento de biblioteca
export interface LibraryItem {
  novelId: string
  title: string
  coverUrl: string
  addedAt: string
  lastReadChapter?: number
  progress?: number
}

// Interfaz para el usuario (extendida de la API)
export interface User extends ApiUser {
  id: string
  role: UserRole
  avatar?: string
  library: LibraryItem[]
}

// Interfaz para el contexto de autenticación
interface AuthContextType {
  user: User | null
  isLoading: boolean
  login: (email: string, password: string) => Promise<void>
  register: (name: string, email: string, password: string, role: UserRole) => Promise<void>
  logout: () => void
  updateUser: (userData: Partial<User>) => void
  isAuthenticated: boolean
  addToLibrary: (novel: LibraryItem) => void
  removeFromLibrary: (novelId: string) => void
  isInLibrary: (novelId: string) => boolean
  updateReadingProgress: (novelId: string, chapterId: number, progress: number) => void
}

// Creamos el contexto
const AuthContext = createContext<AuthContextType | undefined>(undefined)

// Hook personalizado para usar el contexto
export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth debe ser usado dentro de un AuthProvider")
  }
  return context
}

// Proveedor del contexto
export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  // Función para sincronizar el estado del usuario
  const syncUserState = (userData: User | null) => {
    setUser(userData)
    if (userData) {
      localStorage.setItem("noveluzu_user", JSON.stringify(userData))
    } else {
      localStorage.removeItem("noveluzu_user")
      localStorage.removeItem("noveluzu_token")
    }
  }

  // Cargar usuario desde localStorage al iniciar
  useEffect(() => {
    const initializeAuth = async () => {
      const storedUser = localStorage.getItem("noveluzu_user")
      const storedToken = localStorage.getItem("noveluzu_token")

      if (storedUser && storedToken) {
        try {
          const parsedUser = JSON.parse(storedUser)
          setUser(parsedUser)
        } catch (error) {
          console.error("Error al parsear usuario almacenado:", error)
          localStorage.removeItem("noveluzu_user")
          localStorage.removeItem("noveluzu_token")
        }
      }
      setIsLoading(false)
    }

    initializeAuth()
  }, [])

  // Escuchar cambios en localStorage para sincronizar entre pestañas
  useEffect(() => {
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === "noveluzu_user") {
        if (e.newValue) {
          try {
            const newUser = JSON.parse(e.newValue)
            setUser(newUser)
          } catch (error) {
            console.error("Error al parsear usuario desde storage event:", error)
          }
        } else {
          // Si se eliminó el usuario, cerrar sesión en todas las pestañas
          setUser(null)
        }
      }

      if (e.key === "noveluzu_token" && !e.newValue) {
        // Si se eliminó el token, cerrar sesión en todas las pestañas
        setUser(null)
      }
    }

    // Agregar listener para cambios en localStorage
    window.addEventListener("storage", handleStorageChange)

    return () => {
      window.removeEventListener("storage", handleStorageChange)
    }
  }, [])

  // Escuchar eventos personalizados para sincronización inmediata en la misma pestaña
  useEffect(() => {
    const handleAuthChange = (e: CustomEvent) => {
      const { type, user: userData } = e.detail

      if (type === "login") {
        setUser(userData)
      } else if (type === "logout") {
        setUser(null)
      } else if (type === "update") {
        setUser(userData)
      }
    }

    window.addEventListener("auth-change" as any, handleAuthChange)

    return () => {
      window.removeEventListener("auth-change" as any, handleAuthChange)
    }
  }, [])

  // Función para disparar eventos de cambio de autenticación
  const dispatchAuthChange = (type: "login" | "logout" | "update", userData?: User | null) => {
    const event = new CustomEvent("auth-change", {
      detail: { type, user: userData },
    })
    window.dispatchEvent(event)
  }

  // Función para iniciar sesión
  const login = async (email: string, password: string) => {
    setIsLoading(true)
    try {
      const response = await apiService.login({ email, password })

      if (response.token) {
        // Guardar token
        localStorage.setItem("noveluzu_token", response.token)

        // Determinar rol basado en email para compatibilidad con admin
        const isAdmin = email === "admin@noveluzu.com" || email === "admin"

        // Crear objeto de usuario completo
        const fullUser: User = {
          id: response.user?.email || email,
          username: response.user?.username || email.split("@")[0],
          email: response.user?.email || email,
          role: isAdmin ? "admin" : "usuario",
          avatar: `/placeholder.svg?height=40&width=40`,
          library: [],
        }

        // Sincronizar estado y notificar a otras pestañas
        syncUserState(fullUser)
        dispatchAuthChange("login", fullUser)
      } else {
        throw new Error("No se recibió token de autenticación")
      }
    } catch (error) {
      console.error("Error al iniciar sesión:", error)
      throw error
    } finally {
      setIsLoading(false)
    }
  }

  // Función para registrar un nuevo usuario
  const register = async (name: string, email: string, password: string, role: UserRole) => {
    setIsLoading(true)
    try {
      const response = await apiService.signUp({
        username: name,
        email,
        password,
      })

      // No hacer login automático después del registro
      // Solo mostrar mensaje de éxito y redirigir a login
    } catch (error) {
      console.error("Error al registrar usuario:", error)
      throw error
    } finally {
      setIsLoading(false)
    }
  }

  // Función para cerrar sesión
  const logout = async () => {
    try {
      await apiService.logout()
    } catch (error) {
      console.error("Error al cerrar sesión:", error)
    } finally {
      // Sincronizar estado y notificar a otras pestañas
      syncUserState(null)
      dispatchAuthChange("logout")
    }
  }

  // Función para actualizar datos del usuario
  const updateUser = (userData: Partial<User>) => {
    if (user) {
      const updatedUser = { ...user, ...userData }
      // Sincronizar estado y notificar a otras pestañas
      syncUserState(updatedUser)
      dispatchAuthChange("update", updatedUser)
    }
  }

  // Función para añadir una novela a la biblioteca
  const addToLibrary = (novel: LibraryItem) => {
    if (user) {
      // Verificar si la novela ya está en la biblioteca
      if (!user.library.some((item) => item.novelId === novel.novelId)) {
        const updatedLibrary = [...user.library, novel]
        const updatedUser = { ...user, library: updatedLibrary }
        // Sincronizar estado y notificar a otras pestañas
        syncUserState(updatedUser)
        dispatchAuthChange("update", updatedUser)
      }
    }
  }

  // Función para eliminar una novela de la biblioteca
  const removeFromLibrary = (novelId: string) => {
    if (user) {
      const updatedLibrary = user.library.filter((item) => item.novelId !== novelId)
      const updatedUser = { ...user, library: updatedLibrary }
      // Sincronizar estado y notificar a otras pestañas
      syncUserState(updatedUser)
      dispatchAuthChange("update", updatedUser)
    }
  }

  // Función para verificar si una novela está en la biblioteca
  const isInLibrary = (novelId: string): boolean => {
    return user ? user.library.some((item) => item.novelId === novelId) : false
  }

  // Función para actualizar el progreso de lectura
  const updateReadingProgress = (novelId: string, chapterId: number, progress: number) => {
    if (user) {
      const updatedLibrary = user.library.map((item) => {
        if (item.novelId === novelId) {
          return {
            ...item,
            lastReadChapter: chapterId,
            progress: progress,
          }
        }
        return item
      })
      const updatedUser = { ...user, library: updatedLibrary }
      // Sincronizar estado y notificar a otras pestañas
      syncUserState(updatedUser)
      dispatchAuthChange("update", updatedUser)
    }
  }

  // Valor del contexto
  const value = {
    user,
    isLoading,
    login,
    register,
    logout,
    updateUser,
    isAuthenticated: !!user,
    addToLibrary,
    removeFromLibrary,
    isInLibrary,
    updateReadingProgress,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
