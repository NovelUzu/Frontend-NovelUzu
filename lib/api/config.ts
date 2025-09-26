// Configuración base para las APIs
export const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api'

// Configuración por defecto para fetch
export const defaultFetchConfig: RequestInit = {
  headers: {
    'Content-Type': 'application/json',
  },
}

// Función para obtener el token de autenticación
export const getAuthToken = (): string | null => {
  if (typeof window !== 'undefined') {
    return localStorage.getItem('noveluzu_token')
  }
  return null
}

// Función para crear headers con autenticación
export const createAuthHeaders = (): HeadersInit => {
  const token = getAuthToken()
  return {
    'Content-Type': 'application/json',
    ...(token && { Authorization: `Bearer ${token}` }),
  }
}

// Clase para manejar errores de API
export class ApiError extends Error {
  public status: number
  public code?: string
  
  constructor(message: string, status: number, code?: string) {
    super(message)
    this.name = 'ApiError'
    this.status = status
    this.code = code
  }
}

// Función helper para manejar respuestas de la API
export const handleApiResponse = async <T>(response: Response): Promise<T> => {
  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}))
    // Lanzar solo el mensaje de error sin ApiError
    const errorMessage = errorData.error || errorData.message || `Error ${response.status}: ${response.statusText}`
    throw new Error(errorMessage)
  }
  
  return response.json()
}