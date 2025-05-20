"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"

// Definimos los tipos de roles disponibles
export type UserRole = "lector" | "escritor" | "admin"

// Interfaz para el elemento de biblioteca
export interface LibraryItem {
  novelId: string
  title: string
  coverUrl: string
  addedAt: string
  lastReadChapter?: number
  progress?: number
}

// Interfaz para el usuario
export interface User {
  id: string
  name: string
  email: string
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

  // Cargar usuario desde localStorage al iniciar
  useEffect(() => {
    const storedUser = localStorage.getItem("noveluzu_user")
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser))
      } catch (error) {
        console.error("Error al parsear usuario almacenado:", error)
        localStorage.removeItem("noveluzu_user")
      }
    }
    setIsLoading(false)
  }, [])

  // Guardar usuario en localStorage cuando cambie
  useEffect(() => {
    if (user) {
      localStorage.setItem("noveluzu_user", JSON.stringify(user))
    } else {
      localStorage.removeItem("noveluzu_user")
    }
  }, [user])

  // Función para iniciar sesión
  const login = async (email: string, password: string) => {
    setIsLoading(true)
    try {
      // Simulación de autenticación
      // En una implementación real, esto sería una llamada a una API
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Datos de usuario de ejemplo
      // En una implementación real, estos datos vendrían de la respuesta de la API
      const mockUser: User = {
        id: "1",
        name: email.split("@")[0],
        email,
        role: email.includes("admin") ? "admin" : email.includes("escritor") ? "escritor" : "lector",
        avatar: `/placeholder.jpg?height=40&width=40`,
        library: [],
      }

      setUser(mockUser)
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
      // Simulación de registro
      // En una implementación real, esto sería una llamada a una API
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Datos de usuario de ejemplo
      // En una implementación real, estos datos vendrían de la respuesta de la API
      const mockUser: User = {
        id: Math.random().toString(36).substring(2, 9),
        name,
        email,
        role,
        avatar: `/placeholder.jpg?height=40&width=40`,
        library: [],
      }

      setUser(mockUser)
    } catch (error) {
      console.error("Error al registrar usuario:", error)
      throw error
    } finally {
      setIsLoading(false)
    }
  }

  // Función para cerrar sesión
  const logout = () => {
    setUser(null)
  }

  // Función para actualizar datos del usuario
  const updateUser = (userData: Partial<User>) => {
    if (user) {
      setUser({ ...user, ...userData })
    }
  }

  // Función para añadir una novela a la biblioteca
  const addToLibrary = (novel: LibraryItem) => {
    if (user) {
      // Verificar si la novela ya está en la biblioteca
      if (!user.library.some((item) => item.novelId === novel.novelId)) {
        const updatedLibrary = [...user.library, novel]
        setUser({ ...user, library: updatedLibrary })
      }
    }
  }

  // Función para eliminar una novela de la biblioteca
  const removeFromLibrary = (novelId: string) => {
    if (user) {
      const updatedLibrary = user.library.filter((item) => item.novelId !== novelId)
      setUser({ ...user, library: updatedLibrary })
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
      setUser({ ...user, library: updatedLibrary })
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
