// Tipos base para autenticación
export type UserRole = "usuario" | "admin"

// Tipos para autenticación
export interface LoginCredentials {
  email: string
  password: string
}

export interface RegisterData {
  username: string
  email: string
  password: string
  role?: UserRole
}

export interface AuthState {
  isAuthenticated: boolean
  isLoading: boolean
  error?: string
}

// Eventos de autenticación
export type AuthEventType = "login" | "logout" | "update" | "error"

export interface AuthEvent {
  type: AuthEventType
  user?: any
  error?: string
}