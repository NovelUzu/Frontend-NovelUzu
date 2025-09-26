// Re-exportar todo desde auth
export * from "./types"
export * from "./utils" 
export * from "./auth-context"

// Exportaciones explícitas para claridad
export { AuthProvider, useAuth } from "./auth-context"