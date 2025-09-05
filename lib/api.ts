const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080"

export interface LoginRequest {
  email: string
  password: string
}

export interface SignUpRequest {
  username: string
  email: string
  password: string
}

export interface ApiResponse<T = any> {
  message?: string
  error?: string
  token?: string
  user?: T
}

export interface User {
  username: string
  email: string
}

class ApiService {
  private baseUrl: string

  constructor() {
    this.baseUrl = API_BASE_URL
  }

  private async makeRequest<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
    const url = `${this.baseUrl}${endpoint}`

    const config: RequestInit = {
      headers: {
        "Content-Type": "application/json",
        ...options.headers,
      },
      ...options,
    }

    // Añadir token de autorización si existe
    const token = localStorage.getItem("noveluzu_token")
    if (token) {
      config.headers = {
        ...config.headers,
        Authorization: `Bearer ${token}`,
      }
    }

    try {
      const response = await fetch(url, config)

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}))
        throw new Error(errorData.error || `HTTP error! status: ${response.status}`)
      }

      return await response.json()
    } catch (error) {
      console.error("API request failed:", error)
      throw error
    }
  }

  // Método para login
  async login(credentials: LoginRequest): Promise<ApiResponse<User>> {
    const formData = new FormData()
    formData.append("email", credentials.email)
    formData.append("password", credentials.password)

    const response = await fetch(`${this.baseUrl}/login`, {
      method: "POST",
      body: formData,
    })

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}))
      throw new Error(errorData.error || "Error en el login")
    }

    return await response.json()
  }

  // Método para registro
  async signUp(userData: SignUpRequest): Promise<ApiResponse<User>> {
    const formData = new FormData()
    formData.append("username", userData.username)
    formData.append("email", userData.email)
    formData.append("password", userData.password)

    const response = await fetch(`${this.baseUrl}/signup`, {
      method: "POST",
      body: formData,
    })

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}))
      throw new Error(errorData.error || "Error en el registro")
    }

    return await response.json()
  }

  // Método para logout
  async logout(): Promise<void> {
    await this.makeRequest("/auth/logout", {
      method: "DELETE",
    })
  }

  // Método para obtener todos los usuarios
  async getAllUsers(): Promise<User[]> {
    return await this.makeRequest("/allusers")
  }

  // Método para verificar el estado del servidor
  async ping(): Promise<{ message: string }> {
    return await this.makeRequest("/ping")
  }

  // Método para verificar si el token es válido
  isTokenValid(): boolean {
    const token = localStorage.getItem("noveluzu_token")
    if (!token) {
      return false
    }

    try {
      // Decodificar el JWT para verificar si ha expirado
      const payload = JSON.parse(atob(token.split(".")[1]))
      const currentTime = Date.now() / 1000

      // Verificar si el token ha expirado
      if (payload.exp && payload.exp < currentTime) {
        localStorage.removeItem("noveluzu_token")
        localStorage.removeItem("noveluzu_user")
        return false
      }

      return true
    } catch (error) {
      console.error("Error al verificar token:", error)
      localStorage.removeItem("noveluzu_token")
      localStorage.removeItem("noveluzu_user")
      return false
    }
  }

  // Método para obtener información del token
  getTokenInfo(): { email?: string; exp?: number } | null {
    const token = localStorage.getItem("noveluzu_token")
    if (!token) {
      return null
    }

    try {
      const payload = JSON.parse(atob(token.split(".")[1]))
      return {
        email: payload.email,
        exp: payload.exp,
      }
    } catch (error) {
      console.error("Error al decodificar token:", error)
      return null
    }
  }
}

export const apiService = new ApiService()
