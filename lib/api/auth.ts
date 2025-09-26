import { API_BASE_URL, handleApiResponse } from './config'

// Tipos para autenticación
export interface LoginRequest {
  email: string
  password: string
}

export interface SignUpRequest {
  username: string
  email: string
  password: string
}

export interface AuthResponse {
  message: string
  user?: {
    email: string
    username: string
    role: string
    status: string
    avatar_url?: string
    bio?: string
    birth_date?: string
    country?: string
    email_verified: boolean
    last_login?: string
    created_at: string
    updated_at: string
  }
  token?: string
}

// Servicio de autenticación
export const authService = {
  // Iniciar sesión
  async login(data: LoginRequest): Promise<AuthResponse> {
    const formData = new FormData()
    formData.append('email', data.email)
    formData.append('password', data.password)

    const response = await fetch(`${API_BASE_URL}/login`, {
      method: 'POST',
      body: formData,
    })
    
    return handleApiResponse<AuthResponse>(response)
  },

  // Registrar usuario
  async signUp(data: SignUpRequest): Promise<AuthResponse> {
    const formData = new FormData()
    formData.append('username', data.username)
    formData.append('email', data.email)
    formData.append('password', data.password)

    const response = await fetch(`${API_BASE_URL}/signup`, {
      method: 'POST',
      body: formData,
    })
    
    return handleApiResponse<AuthResponse>(response)
  },

  // Cerrar sesión
  async logout(): Promise<{ mensaje: string }> {
    const response = await fetch(`${API_BASE_URL}/auth/logout`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('noveluzu_token')}`,
      },
    })
    
    return handleApiResponse(response)
  },

  // Verificar token
  async verifyToken(): Promise<{ 
    email: string
    username: string
    role: string
    status: string
    avatar_url?: string
    bio?: string
    birth_date?: string
    country?: string
    email_verified: boolean
    last_login?: string
    created_at: string
    updated_at: string
  }> {
    const response = await fetch(`${API_BASE_URL}/auth/verify-token`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('noveluzu_token')}`,
      },
    })
    
    return handleApiResponse(response)
  },
}