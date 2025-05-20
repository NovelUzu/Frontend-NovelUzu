"use client"

// Inspired by react-hot-toast library
import * as React from "react"

import type {
  ToastActionElement,
  ToastProps,
} from "@/components/ui/toast"

// Configuración límite de toasts visibles simultáneamente
const TOAST_LIMIT = 1

// Tiempo en ms antes de eliminar automáticamente un toast (1000 segundos)
const TOAST_REMOVE_DELAY = 1000000

// Tipo extendido para los toasts que incluye propiedades adicionales
type ToasterToast = ToastProps & {
  id: string
  title?: React.ReactNode
  description?: React.ReactNode
  action?: ToastActionElement
}

// Definición de tipos de acciones disponibles para el reducer
const actionTypes = {
  ADD_TOAST: "ADD_TOAST",       // Añadir nuevo toast
  UPDATE_TOAST: "UPDATE_TOAST",  // Actualizar toast existente
  DISMISS_TOAST: "DISMISS_TOAST",// Ocultar toast (animación de salida)
  REMOVE_TOAST: "REMOVE_TOAST",  // Eliminar completamente del estado
} as const

// Contador para generar IDs únicos
let count = 0

// Generador de IDs único para cada toast
function genId() {
  count = (count + 1) % Number.MAX_SAFE_INTEGER
  return count.toString()
}

// Tipos para las acciones del reducer
type ActionType = typeof actionTypes

type Action =
  | {
      type: ActionType["ADD_TOAST"]
      toast: ToasterToast
    }
  | {
      type: ActionType["UPDATE_TOAST"]
      toast: Partial<ToasterToast>
    }
  | {
      type: ActionType["DISMISS_TOAST"]
      toastId?: ToasterToast["id"]
    }
  | {
      type: ActionType["REMOVE_TOAST"]
      toastId?: ToasterToast["id"]
    }

// Interfaz para el estado global de los toasts
interface State {
  toasts: ToasterToast[]
}

// Mapa para guardar los timeouts de eliminación automática
const toastTimeouts = new Map<string, ReturnType<typeof setTimeout>>()

// Añade un toast a la cola de eliminación después del delay
const addToRemoveQueue = (toastId: string) => {
  // Si ya está programado, no hacer nada
  if (toastTimeouts.has(toastId)) {
    return
  }

  // Programar eliminación después del delay
  const timeout = setTimeout(() => {
    toastTimeouts.delete(toastId)
    dispatch({
      type: "REMOVE_TOAST",
      toastId: toastId,
    })
  }, TOAST_REMOVE_DELAY)

  // Guardar referencia al timeout
  toastTimeouts.set(toastId, timeout)
}

// Reducer principal que maneja las acciones de los toasts
export const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "ADD_TOAST":
      // Añade nuevo toast y aplica el límite
      return {
        ...state,
        toasts: [action.toast, ...state.toasts].slice(0, TOAST_LIMIT),
      }

    case "UPDATE_TOAST":
      // Actualiza un toast existente por ID
      return {
        ...state,
        toasts: state.toasts.map((t) =>
          t.id === action.toast.id ? { ...t, ...action.toast } : t
        ),
      }

    case "DISMISS_TOAST": {
      const { toastId } = action

       // Efecto secundario: programar eliminación
      if (toastId) {
        // Dismiss específico
        addToRemoveQueue(toastId)
      } else {
        // Dismiss todos
        state.toasts.forEach((toast) => {
          addToRemoveQueue(toast.id)
        })
      }

      // Marcar como cerrado (open: false)
      return {
        ...state,
        toasts: state.toasts.map((t) =>
          t.id === toastId || toastId === undefined
            ? {
                ...t,
                open: false,
              }
            : t
        ),
      }
    }
    case "REMOVE_TOAST":
      // Eliminar completamente del estado
      if (action.toastId === undefined) {
        // Eliminar todos
        return {
          ...state,
          toasts: [],
        }
      }
      // Eliminar específico
      return {
        ...state,
        toasts: state.toasts.filter((t) => t.id !== action.toastId),
      }
  }
}

// Array de listeners para notificar cambios de estado
const listeners: Array<(state: State) => void> = []

// Estado en memoria (patrón de store global)
let memoryState: State = { toasts: [] }

// Función dispatch que actualiza el estado y notifica a los listeners
function dispatch(action: Action) {
  memoryState = reducer(memoryState, action)
  listeners.forEach((listener) => {
    listener(memoryState)
  })
}

// Tipo para el toast sin el ID (para la API pública)
type Toast = Omit<ToasterToast, "id">

// Función principal para mostrar toasts
function toast({ ...props }: Toast) {
  const id = genId() // Generar ID único

  // Función para actualizar este toast específico
  const update = (props: ToasterToast) =>
    dispatch({
      type: "UPDATE_TOAST",
      toast: { ...props, id },
    })
  
  // Función para descartar este toast
  const dismiss = () => dispatch({ type: "DISMISS_TOAST", toastId: id })

  // Dispatch para añadir el nuevo toast
  dispatch({
    type: "ADD_TOAST",
    toast: {
      ...props,
      id,
      open: true,
      onOpenChange: (open) => {
        if (!open) dismiss() // Si se cierra, disparar dismiss
      },
    },
  })

  // Devolver API para controlar este toast
  return {
    id: id,
    dismiss,
    update,
  }
}

// Hook para usar toasts en componentes
function useToast() {
  // Estado local sincronizado con el global
  const [state, setState] = React.useState<State>(memoryState)

  // Efecto para suscribirse/desuscribirse de las actualizaciones
  React.useEffect(() => {
    listeners.push(setState) // Suscribirse
    return () => {
      // Limpieza: desuscribirse
      const index = listeners.indexOf(setState)
      if (index > -1) {
        listeners.splice(index, 1)
      }
    }
  }, [state])

  // Devolver estado y métodos públicos
  return {
    ...state,
    toast, // Función para mostrar toasts
    dismiss: (toastId?: string) => dispatch({ type: "DISMISS_TOAST", toastId }),
  }
}

export { useToast, toast }
