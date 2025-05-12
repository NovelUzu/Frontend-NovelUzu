import { Skeleton } from "@/components/ui/skeleton"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"

/**
 * Componente de carga para la página de novelas populares
 *
 * Muestra un esqueleto de carga mientras se obtienen los datos de las novelas populares.
 * El diseño imita la estructura de la página principal para evitar saltos de contenido.
 */
export default function Loading() {
  return (
    <div className="container px-4 py-6 md:px-6 md:py-12">
      {/* Esqueleto del encabezado */}
      <div className="mb-6 md:mb-8">
        <Skeleton className="h-4 w-32 mb-2" />
        <Skeleton className="h-8 w-64 mb-2" />
        <Skeleton className="h-4 w-full max-w-md" />
      </div>

      {/* Esqueleto de las pestañas */}
      <div className="mb-8">
        <Skeleton className="h-10 w-full mb-6" />

        {/* Esqueleto de las tarjetas principales */}
        <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6">
          {[...Array(3)].map((_, i) => (
            <Card key={i} className="overflow-hidden">
              <Skeleton className="h-[240px] w-full" />
              <CardHeader className="p-3 md:p-4">
                <Skeleton className="h-5 w-full" />
              </CardHeader>
              <CardContent className="p-3 pt-0 md:p-4 md:pt-0">
                <Skeleton className="h-4 w-full mb-2" />
                <Skeleton className="h-4 w-3/4" />
              </CardContent>
              <CardFooter className="flex items-center justify-between p-3 pt-0 md:p-4 md:pt-0">
                <Skeleton className="h-4 w-20" />
                <Skeleton className="h-8 w-16" />
              </CardFooter>
            </Card>
          ))}
        </div>

        {/* Esqueleto de las tarjetas secundarias */}
        <div className="space-y-4 md:space-y-6">
          {[...Array(3)].map((_, i) => (
            <Card key={i} className="overflow-hidden">
              <div className="flex flex-col gap-3 p-3 sm:flex-row sm:gap-4 md:p-4">
                <Skeleton className="h-28 w-20 sm:h-36 sm:w-24 md:h-40 md:w-28" />
                <div className="flex-1">
                  <Skeleton className="h-5 w-full max-w-xs mb-2" />
                  <Skeleton className="h-4 w-24 mb-2" />
                  <Skeleton className="h-4 w-full mb-2" />
                  <Skeleton className="h-4 w-full mb-2" />
                  <div className="flex justify-between mt-2">
                    <Skeleton className="h-6 w-20" />
                    <Skeleton className="h-8 w-16" />
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* Esqueleto de las estadísticas */}
      <div className="mt-8 md:mt-12">
        <Skeleton className="h-6 w-48 mb-4 md:mb-6" />
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
          {[...Array(4)].map((_, i) => (
            <Card key={i}>
              <CardHeader className="p-3 pb-1 md:p-4 md:pb-2">
                <Skeleton className="h-4 w-24" />
              </CardHeader>
              <CardContent className="p-3 md:p-4">
                <div className="flex items-center gap-3 md:gap-4">
                  <Skeleton className="h-14 w-10 md:h-16 md:w-12" />
                  <div className="flex-1">
                    <Skeleton className="h-4 w-full mb-2" />
                    <Skeleton className="h-3 w-20" />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}
