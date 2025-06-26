/**
 * Página de Contacto de NovelUzu
 *
 * Esta página muestra:
 * - Métodos de comunicación
 * - Horarios de atención
 */
import { Mail, Phone, Clock } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"

export default function ContactPage() {
  const contactMethods = [
    {
      icon: <Mail className="h-8 w-8" />,
      title: "Correo Electrónico",
      description: "Respuesta en 24 horas",
      contact: "franxxboxsenki@gmail.com",
      action: "mailto:franxxboxsenki@gmail.com",
      color: "gradient-action",
    },
    {
      icon: <Phone className="h-8 w-8" />,
      title: "Teléfono",
      description: "Lun-Vie 9:00-18:00",
      contact: "+34 662 315 875",
      action: "tel:+3466231587",
      color: "gradient-fantasy",
    },
  ]

  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="w-full py-8 md:py-12 gradient-fantasy">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h1 className="text-2xl font-bold tracking-tighter sm:text-3xl md:text-4xl lg:text-5xl text-white">
                  Contáctanos
                </h1>
                <p className="max-w-[600px] mx-auto text-sm text-white/90 sm:text-base md:text-lg">
                  Estamos aquí para ayudarte. Encuentra la mejor forma de comunicarte con nosotros.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Métodos de Contacto Principales */}
        <section className="w-full py-8 md:py-16">
          <div className="container px-4 md:px-6">
            <div className="text-center mb-12">
              <h2 className="text-2xl font-bold tracking-tighter md:text-3xl lg:text-4xl/tight mb-4">
                Formas de Contacto
              </h2>
              <p className="max-w-[600px] mx-auto text-muted-foreground">
                Elige el método que más te convenga para comunicarte con nuestro equipo
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {contactMethods.map((method, index) => (
                <Card
                  key={index}
                  className="text-center hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
                >
                  <CardContent className="p-6">
                    <div className={`inline-flex p-4 rounded-full ${method.color} text-white mb-4`}>{method.icon}</div>
                    <h3 className="font-semibold text-lg mb-2">{method.title}</h3>
                    <p className="text-sm text-muted-foreground mb-3">{method.description}</p>
                    <Button variant="outline" size="sm" asChild className="w-full">
                      <a href={method.action}>{method.contact}</a>
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Información Detallada */}
        <section className="w-full py-8 md:py-16 bg-muted/40 dark:bg-muted/10">
          <div className="container px-4 md:px-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

              {/* Información Adicional */}
              <div className="space-y-6">
                {/* Horarios */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <Clock className="h-5 w-5" />
                      <span>Horarios de Atención</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3 text-sm">
                      <div className="flex justify-between items-center">
                        <span className="font-medium">Lunes - Viernes:</span>
                        <span>9:00 - 18:00</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="font-medium">Sábados:</span>
                        <span>Cerrado</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="font-medium">Domingos:</span>
                        <span className="text-muted-foreground">Cerrado</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Tiempo de Respuesta */}
                <Card>
                  <CardHeader>
                    <CardTitle>Tiempo de Respuesta</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3 text-sm">
                      <div className="flex justify-between">
                        <span>Correo electrónico:</span>
                        <span className="text-blue-600 font-medium">24 horas</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Teléfono:</span>
                        <span className="text-purple-600 font-medium">Inmediato</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  )
}
