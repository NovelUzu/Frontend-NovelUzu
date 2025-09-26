import { API_BASE_URL, createAuthHeaders, handleApiResponse } from './config'
import type { Novel } from './novels'

// Tipos para biblioteca
export interface LibraryItem {
  id: string
  novelId: string
  novel: {
    id: string
    title: string
    coverUrl?: string
    author: {
      id: string
      username: string
    }
    status: string
    totalChapters: number
  }
  addedAt: string
  lastReadChapter?: number
  lastReadAt?: string
  progress: number
  status: 'leyendo' | 'completada' | 'en_pausa' | 'abandonada' | 'por_leer'
  rating?: number
  notes?: string
}

export interface AddToLibraryRequest {
  novelId: string
  status?: LibraryItem['status']
}

export interface UpdateLibraryRequest {
  status?: LibraryItem['status']
  progress?: number
  rating?: number
  notes?: string
}

export interface LibraryResponse {
  items: LibraryItem[]
  total: number
}

// Servicio de biblioteca
export const libraryService = {
  // Obtener biblioteca del usuario
  async getLibrary(): Promise<LibraryResponse> {
    const response = await fetch(`${API_BASE_URL}/library`, {
      method: 'GET',
      headers: createAuthHeaders(),
    })
    
    return handleApiResponse<LibraryResponse>(response)
  },

  // Añadir novela a la biblioteca
  async addToLibrary(data: AddToLibraryRequest): Promise<LibraryItem> {
    const response = await fetch(`${API_BASE_URL}/library`, {
      method: 'POST',
      headers: createAuthHeaders(),
      body: JSON.stringify(data),
    })
    
    return handleApiResponse<LibraryItem>(response)
  },

  // Eliminar novela de la biblioteca
  async removeFromLibrary(novelId: string): Promise<{ message: string }> {
    const response = await fetch(`${API_BASE_URL}/library/${novelId}`, {
      method: 'DELETE',
      headers: createAuthHeaders(),
    })
    
    return handleApiResponse(response)
  },

  // Actualizar elemento de la biblioteca
  async updateLibraryItem(novelId: string, data: UpdateLibraryRequest): Promise<LibraryItem> {
    const response = await fetch(`${API_BASE_URL}/library/${novelId}`, {
      method: 'PUT',
      headers: createAuthHeaders(),
      body: JSON.stringify(data),
    })
    
    return handleApiResponse<LibraryItem>(response)
  },

  // Actualizar progreso de lectura
  async updateReadingProgress(novelId: string, chapterId: string, progress: number): Promise<LibraryItem> {
    const response = await fetch(`${API_BASE_URL}/library/${novelId}/progress`, {
      method: 'PUT',
      headers: createAuthHeaders(),
      body: JSON.stringify({
        chapterId,
        progress,
      }),
    })
    
    return handleApiResponse<LibraryItem>(response)
  },
}