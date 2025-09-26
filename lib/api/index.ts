// Re-exportar todos los servicios y tipos
export * from './config'
export * from './auth'
export * from './users'
export * from './novels'
export * from './library'

// Importar todos los servicios
import { authService } from './auth'
import { userService } from './users'
import { novelService } from './novels'
import { libraryService } from './library'

// API principal que agrupa todos los servicios
export const api = {
  auth: authService,
  users: userService,
  novels: novelService,
  library: libraryService,
}

// Re-exportar servicios individuales para compatibilidad
export { authService, userService, novelService, libraryService }

export default api