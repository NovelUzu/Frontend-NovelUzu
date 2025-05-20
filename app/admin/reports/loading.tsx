import { Skeleton } from "@/components/ui/skeleton"
import { Card, CardContent, CardHeader } from "@/components/ui/card"

export default function AdminReportsLoading() {
  return (
    <div className="container mx-auto p-4 space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <Skeleton className="h-8 w-48" />
      </div>

      {/* Tarjetas de estadísticas */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {Array(4)
          .fill(0)
          .map((_, i) => (
            <Card key={i}>
              <CardHeader className="pb-2">
                <Skeleton className="h-4 w-24" />
              </CardHeader>
              <CardContent>
                <Skeleton className="h-8 w-12" />
              </CardContent>
            </Card>
          ))}
      </div>

      <div className="space-y-4">
        <Skeleton className="h-10 w-full" />

        <div className="flex flex-col md:flex-row gap-4">
          <Skeleton className="h-10 flex-1" />
          <Skeleton className="h-10 w-full md:w-[180px]" />
          <Skeleton className="h-10 w-full md:w-[180px]" />
        </div>

        <div className="rounded-md border p-4">
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              {Array(9)
                .fill(0)
                .map((_, i) => (
                  <Skeleton key={i} className="h-4 flex-1" />
                ))}
            </div>
            <div className="border-t pt-4" />
            {Array(5)
              .fill(0)
              .map((_, i) => (
                <div key={i} className="flex items-center gap-4">
                  {Array(9)
                    .fill(0)
                    .map((_, j) => (
                      <Skeleton key={j} className="h-4 flex-1" />
                    ))}
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  )
}
