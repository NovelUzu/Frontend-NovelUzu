// Funciones utilitarias para manejo de localStorage y eventos de auth

// Claves para localStorage
export const STORAGE_KEYS = {
  USER: "noveluzu_user",
  TOKEN: "noveluzu_token",
} as const

// Funciones para localStorage
export const storage = {
  // Guardar usuario
  setUser: (user: any) => {
    if (typeof window !== 'undefined') {
      localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(user))
    }
  },

  // Obtener usuario
  getUser: () => {
    if (typeof window !== 'undefined') {
      const storedUser = localStorage.getItem(STORAGE_KEYS.USER)
      if (storedUser) {
        try {
          return JSON.parse(storedUser)
        } catch (error) {
          console.error("Error al parsear usuario almacenado:", error)
          localStorage.removeItem(STORAGE_KEYS.USER)
        }
      }
    }
    return null
  },

  // Guardar token
  setToken: (token: string) => {
    if (typeof window !== 'undefined') {
      localStorage.setItem(STORAGE_KEYS.TOKEN, token)
    }
  },

  // Obtener token
  getToken: () => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem(STORAGE_KEYS.TOKEN)
    }
    return null
  },

  // Limpiar datos de auth
  clear: () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem(STORAGE_KEYS.USER)
      localStorage.removeItem(STORAGE_KEYS.TOKEN)
    }
  },
}

// Funciones para eventos personalizados
export const authEvents = {
  // Disparar evento de cambio de autenticación
  dispatch: (type: string, data?: any) => {
    if (typeof window !== 'undefined') {
      const event = new CustomEvent("auth-change", {
        detail: { type, ...data },
      })
      window.dispatchEvent(event)
    }
  },

  // Escuchar eventos de autenticación
  listen: (callback: (event: CustomEvent) => void) => {
    if (typeof window !== 'undefined') {
      window.addEventListener("auth-change" as any, callback)
      return () => window.removeEventListener("auth-change" as any, callback)
    }
    return () => {}
  },

  // Escuchar cambios en localStorage
  listenStorage: (callback: (event: StorageEvent) => void) => {
    if (typeof window !== 'undefined') {
      window.addEventListener("storage", callback)
      return () => window.removeEventListener("storage", callback)
    }
    return () => {}
  },
}