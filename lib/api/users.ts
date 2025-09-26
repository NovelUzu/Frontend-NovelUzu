import { API_BASE_URL, createAuthHeaders, handleApiResponse } from './config'

// Tipos para usuario basados en el backend Go
export interface User {
  email: string
  username: string
  role: 'usuario' | 'admin'
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

export interface UpdateUserRequest {
  username?: string
  bio?: string
  birth_date?: string
  country?: string
  avatar?: File
}

export interface ChangePasswordRequest {
  current_password: string
  new_password: string
}

export interface DeleteAccountRequest {
  password: string
}

export interface UserListResponse {
  users: User[]
  total: number
  page: number
  limit: number
}

// Servicio de usuarios
export const userService = {
  // Obtener perfil del usuario actual
  async getCurrentUser(): Promise<User> {
    const response = await fetch(`${API_BASE_URL}/auth/verify-token`, {
      method: 'GET',
      headers: createAuthHeaders(),
    })
    
    return handleApiResponse<User>(response)
  },

  // Obtener todos los usuarios (para admin)
  async getAllUsers(): Promise<User[]> {
    const response = await fetch(`${API_BASE_URL}/user/allusers`, {
      method: 'GET',
      headers: createAuthHeaders(),
    })
    
    return handleApiResponse<User[]>(response)
  },

  // Actualizar perfil del usuario (maneja datos y avatar)
  async updateProfile(data: UpdateUserRequest): Promise<{ message: string; user: User }> {
    const formData = new FormData()
    
    if (data.username) formData.append('username', data.username)
    if (data.bio) formData.append('bio', data.bio)
    if (data.birth_date) formData.append('birth_date', data.birth_date)
    if (data.country) formData.append('country', data.country)
    if (data.avatar) formData.append('avatar', data.avatar)

    const response = await fetch(`${API_BASE_URL}/user/update`, {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('noveluzu_token')}`,
      },
      body: formData,
    })
    
    return handleApiResponse(response)
  },

  // Cambiar contraseña del usuario
  async changePassword(data: ChangePasswordRequest): Promise<{ message: string }> {
    const formData = new FormData()
    formData.append('current_password', data.current_password)
    formData.append('new_password', data.new_password)

    const response = await fetch(`${API_BASE_URL}/user/change-password`, {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('noveluzu_token')}`,
      },
      body: formData,
    })
    
    return handleApiResponse<{ message: string }>(response)
  },

  // Eliminar cuenta del usuario
  async deleteAccount(data: DeleteAccountRequest): Promise<{ message: string }> {
    const formData = new FormData()
    formData.append('password', data.password)

    const response = await fetch(`${API_BASE_URL}/user/delete-account`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('noveluzu_token')}`,
      },
      body: formData,
    })
    
    return handleApiResponse<{ message: string }>(response)
  },
}