import { API_BASE_URL, createAuthHeaders, handleApiResponse } from './config'

// Tipos para novelas
export interface Novel {
  id: string
  title: string
  description: string
  author: {
    id: string
    username: string
    avatar?: string
  }
  coverUrl?: string
  status: 'en_progreso' | 'completada' | 'pausada' | 'abandonada'
  genres: string[]
  tags: string[]
  rating: number
  totalRatings: number
  totalViews: number
  totalChapters: number
  language: string
  mature: boolean
  createdAt: string
  updatedAt: string
  lastChapterAt?: string
}

export interface Chapter {
  id: string
  novelId: string
  title: string
  content: string
  chapterNumber: number
  publishedAt: string
  createdAt: string
  updatedAt: string
}

export interface NovelFilters {
  genre?: string
  status?: Novel['status']
  search?: string
  sortBy?: 'newest' | 'oldest' | 'rating' | 'views' | 'updated'
  page?: number
  limit?: number
}

export interface NovelListResponse {
  novels: Novel[]
  total: number
  page: number
  limit: number
}

// Servicio de novelas
export const novelService = {
  // Obtener novelas con filtros
  async getNovels(filters?: NovelFilters): Promise<NovelListResponse> {
    const params = new URLSearchParams()
    if (filters?.genre) params.append('genre', filters.genre)
    if (filters?.status) params.append('status', filters.status)
    if (filters?.search) params.append('search', filters.search)
    if (filters?.sortBy) params.append('sortBy', filters.sortBy)
    if (filters?.page) params.append('page', filters.page.toString())
    if (filters?.limit) params.append('limit', filters.limit.toString())

    const response = await fetch(`${API_BASE_URL}/novels?${params}`, {
      method: 'GET',
      headers: createAuthHeaders(),
    })
    
    return handleApiResponse<NovelListResponse>(response)
  },

  // Obtener novela por ID
  async getNovelById(id: string): Promise<Novel> {
    const response = await fetch(`${API_BASE_URL}/novels/${id}`, {
      method: 'GET',
      headers: createAuthHeaders(),
    })
    
    return handleApiResponse<Novel>(response)
  },

  // Crear nueva novela
  async createNovel(data: Partial<Novel>): Promise<Novel> {
    const response = await fetch(`${API_BASE_URL}/novels`, {
      method: 'POST',
      headers: createAuthHeaders(),
      body: JSON.stringify(data),
    })
    
    return handleApiResponse<Novel>(response)
  },

  // Obtener capítulos de una novela
  async getChapters(novelId: string): Promise<Chapter[]> {
    const response = await fetch(`${API_BASE_URL}/novels/${novelId}/chapters`, {
      method: 'GET',
      headers: createAuthHeaders(),
    })
    
    return handleApiResponse<Chapter[]>(response)
  },
}