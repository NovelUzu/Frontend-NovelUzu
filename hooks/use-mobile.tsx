import * as React from "react"

// Define una constante que indica el ancho máximo (en píxeles) considerado como vista móvil
const MOBILE_BREAKPOINT = 768

// Hook personalizado que detecta si la ventana del navegador está en modo móvil
export function useIsMobile() {
  // Estado que almacena si el dispositivo es móvil o no
  // Inicialmente es undefined para evitar errores en el renderizado del lado del servidor
  const [isMobile, setIsMobile] = React.useState<boolean | undefined>(undefined)

  // useEffect se ejecuta una vez después del primer renderizado (comportamiento de "componentDidMount")
  React.useEffect(() => {
    // Crea una media query que se activa cuando el ancho de la ventana es menor a MOBILE_BREAKPOINT
    const mql = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`)

    // Función que actualiza el estado `isMobile` según el ancho actual de la ventana
    const onChange = () => {
      setIsMobile(window.innerWidth < MOBILE_BREAKPOINT)
    }

    // Escucha los cambios en la media query (por ejemplo, al redimensionar la ventana)
    mql.addEventListener("change", onChange)

    // Establece el valor inicial al montar el componente
    setIsMobile(window.innerWidth < MOBILE_BREAKPOINT)

    // Limpia el listener cuando el componente se desmonta
    return () => mql.removeEventListener("change", onChange)
  }, []) // El array vacío asegura que el efecto solo se ejecute una vez

  // Devuelve true si `isMobile` es true, o false en cualquier otro caso (incluido undefined)
  return !!isMobile
}
