"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import { api } from "../../api"
import { type UserRole, type LoginCredentials, type RegisterData } from "./types"
import { storage, authEvents } from "./utils"

// Interfaz para el usuario de autenticación
export interface AuthUser {
  email: string
  username: string
  role: UserRole
  status: 'activo' | 'inactivo' | 'baneado'
  avatar_url?: string
  bio?: string
  birth_date?: string
  country?: string
  email_verified: boolean
  last_login?: string
  created_at: string
  updated_at: string
}

// Interfaz para el contexto de autenticación
interface AuthContextType {
  user: AuthUser | null
  isLoading: boolean
  isAuthenticated: boolean
  login: (credentials: LoginCredentials) => Promise<void>
  register: (data: RegisterData) => Promise<void>
  logout: () => Promise<void>
  updateUser: (userData: Partial<AuthUser>) => void
  refreshUser: () => Promise<void>
}

// Crear contexto
const AuthContext = createContext<AuthContextType | undefined>(undefined)

// Hook personalizado
export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth debe ser usado dentro de un AuthProvider")
  }
  return context
}

// Proveedor del contexto
export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  // Sincronizar estado del usuario
  const syncUserState = (userData: AuthUser | null) => {
    setUser(userData)
    if (userData) {
      storage.setUser(userData)
    } else {
      storage.clear()
    }
  }

  // Inicializar autenticación
  useEffect(() => {
    const initializeAuth = async () => {
      const storedUser = storage.getUser()
      const storedToken = storage.getToken()

      if (storedUser && storedToken) {
        try {
          // Verificar si el token sigue siendo válido
          const response = await api.auth.verifyToken()
          const authUser: AuthUser = {
            email: response.email,
            username: response.username,
            role: response.role as UserRole,
            status: response.status as AuthUser['status'],
            avatar_url: response.avatar_url,
            bio: response.bio,
            birth_date: response.birth_date,
            country: response.country,
            email_verified: response.email_verified,
            last_login: response.last_login,
            created_at: response.created_at,
            updated_at: response.updated_at,
          }
          setUser(authUser)
        } catch (error) {
          console.error("Error al verificar token:", error)
          storage.clear()
        }
      }
      setIsLoading(false)
    }

    initializeAuth()
  }, [])

  // Función de login
  const login = async (credentials: LoginCredentials) => {
    setIsLoading(true)
    try {
      const response = await api.auth.login(credentials)

      if (response.token && response.user) {
        storage.setToken(response.token)
        
        const authUser: AuthUser = {
          email: response.user.email,
          username: response.user.username,
          role: response.user.role as UserRole,
          status: response.user.status as AuthUser['status'],
          avatar_url: response.user.avatar_url,
          bio: response.user.bio,
          birth_date: response.user.birth_date,
          country: response.user.country,
          email_verified: response.user.email_verified,
          last_login: response.user.last_login,
          created_at: response.user.created_at,
          updated_at: response.user.updated_at,
        }

        syncUserState(authUser)
        authEvents.dispatch("login", { user: authUser })
      } else {
        throw new Error("Respuesta de login inválida")
      }
    } catch (error) {
      authEvents.dispatch("error", { error })
      throw error
    } finally {
      setIsLoading(false)
    }
  }

  // Función de registro
  const register = async (data: RegisterData) => {
    setIsLoading(true)
    try {
      await api.auth.signUp(data)
      // No auto-login después del registro
    } catch (error) {
      authEvents.dispatch("error", { error })
      throw error
    } finally {
      setIsLoading(false)
    }
  }

  // Función de logout
  const logout = async () => {
    try {
      await api.auth.logout()
    } catch (error) {
      console.error("Error al cerrar sesión:", error)
    } finally {
      syncUserState(null)
      authEvents.dispatch("logout")
    }
  }

  // Actualizar usuario
  const updateUser = (userData: Partial<AuthUser>) => {
    if (user) {
      const updatedUser = { ...user, ...userData }
      syncUserState(updatedUser)
      authEvents.dispatch("update", { user: updatedUser })
    }
  }

  // Refrescar datos del usuario
  const refreshUser = async () => {
    if (!user) return
    
    try {
      const updatedUser = await api.users.getCurrentUser()
      const authUser: AuthUser = {
        email: updatedUser.email,
        username: updatedUser.username,
        role: updatedUser.role as UserRole,
        status: updatedUser.status,
        avatar_url: updatedUser.avatar_url,
        bio: updatedUser.bio,
        birth_date: updatedUser.birth_date,
        country: updatedUser.country,
        email_verified: updatedUser.email_verified,
        last_login: updatedUser.last_login,
        created_at: updatedUser.created_at,
        updated_at: updatedUser.updated_at,
      }
      syncUserState(authUser)
    } catch (error) {
      console.error("Error al refrescar usuario:", error)
    }
  }

  const value = {
    user,
    isLoading,
    isAuthenticated: !!user,
    login,
    register,
    logout,
    updateUser,
    refreshUser,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}