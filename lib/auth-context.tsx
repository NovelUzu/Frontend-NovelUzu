"use client"

import { createContext, useContext, useEffect, useState, type ReactNode } from "react"

type User = {
  id: string
  username: string
  email: string
  role: "user" | "admin" | "author"
  avatar?: string
}

type AuthContextType = {
  user: User | null
  isLoading: boolean
  login: (email: string, password: string) => Promise<boolean>
  logout: () => void
  isAuthenticated: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  // Cargar usuario desde localStorage al iniciar
  useEffect(() => {
    const storedUser = localStorage.getItem("user")
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser))
      } catch (error) {
        console.error("Error parsing stored user:", error)
        localStorage.removeItem("user")
      }
    }
    setIsLoading(false)
  }, [])

  const login = async (email: string, password: string): Promise<boolean> => {
    setIsLoading(true)
    try {
      // Verificar credenciales de administrador
      if (email === "admin" && password === "admin") {
        const adminUser: User = {
          id: "admin-1",
          username: "Administrador",
          email: "admin@noveluzu.com",
          role: "admin",
          avatar: "/placeholder.jpeg?height=40&width=40&text=A",
        }
        setUser(adminUser)
        localStorage.setItem("user", JSON.stringify(adminUser))
        localStorage.setItem("isAdmin", "true")
        return true
      }

      // Simulación de login para usuarios normales
      // En una implementación real, esto sería una llamada a la API
      await new Promise((resolve) => setTimeout(resolve, 800))

      // Crear usuario de prueba
      const mockUser: User = {
        id: "user-1",
        username: email.includes("@") ? email.split("@")[0] : email,
        email: email.includes("@") ? email : `${email}@example.com`,
        role: "user",
        avatar: "/placeholder.jpeg?height=40&width=40&text=U",
      }

      setUser(mockUser)
      localStorage.setItem("user", JSON.stringify(mockUser))
      return true
    } catch (error) {
      console.error("Login error:", error)
      return false
    } finally {
      setIsLoading(false)
    }
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem("user")
    localStorage.removeItem("isAdmin")
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        login,
        logout,
        isAuthenticated: !!user,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
