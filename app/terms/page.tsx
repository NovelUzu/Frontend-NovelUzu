/**
 * Página de Términos y Condiciones de NovelUzu
 *
 * Esta página muestra:
 * - Términos legales organizados por secciones
 * - Navegación por anclas para facilitar la lectura
 * - Diseño coherente con la interfaz principal
 */
import Link from "next/link"
import { BookOpen, Scale, Shield, Users, FileText, AlertTriangle, ChevronRight } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"

export default function TermsPage() {
  const lastUpdated = "26 de Junio, 2025"

  const sections = [
    {
      id: "acceptance",
      title: "1. Aceptación de los Términos",
      icon: <Scale className="h-5 w-5" />,
      content: [
        "Al acceder y utilizar NovelUzu, usted acepta estar sujeto a estos Términos y Condiciones de Uso.",
        "Si no está de acuerdo con alguna parte de estos términos, no debe utilizar nuestro servicio.",
        "Nos reservamos el derecho de actualizar estos términos en cualquier momento sin previo aviso.",
        "El uso continuado del servicio después de cualquier cambio constituye su aceptación de los nuevos términos.",
      ],
    },
    {
      id: "service",
      title: "2. Descripción del Servicio",
      icon: <BookOpen className="h-5 w-5" />,
      content: [
        "NovelUzu es una plataforma digital que permite a los usuarios leer, descubrir y compartir novelas web.",
        "Ofrecemos acceso a una biblioteca de contenido creado por autores independientes y editores asociados.",
        "El servicio incluye funciones de lectura, comentarios, calificaciones y recomendaciones personalizadas.",
        "Nos reservamos el derecho de modificar, suspender o discontinuar cualquier aspecto del servicio en cualquier momento.",
      ],
    },
    {
      id: "accounts",
      title: "3. Cuentas de Usuario",
      icon: <Users className="h-5 w-5" />,
      content: [
        "Para acceder a ciertas funciones, debe crear una cuenta proporcionando información precisa y completa.",
        "Es responsable de mantener la confidencialidad de su cuenta y contraseña.",
        "Debe notificarnos inmediatamente sobre cualquier uso no autorizado de su cuenta.",
        "No puede transferir su cuenta a otra persona sin nuestro consentimiento previo por escrito.",
        "Nos reservamos el derecho de suspender o terminar cuentas que violen estos términos.",
      ],
    },
    {
      id: "content",
      title: "4. Contenido y Propiedad Intelectual",
      icon: <FileText className="h-5 w-5" />,
      content: [
        "Todo el contenido disponible en NovelUzu está protegido por derechos de autor y otras leyes de propiedad intelectual.",
        "Los autores retienen los derechos de sus obras originales publicadas en la plataforma.",
        "Al subir contenido, otorga a NovelUzu una licencia no exclusiva para mostrar, distribuir y promocionar su trabajo.",
        "No puede copiar, distribuir, modificar o crear obras derivadas del contenido sin autorización expresa.",
        "Respetamos los derechos de propiedad intelectual y responderemos a notificaciones válidas de infracción.",
      ],
    },
    {
      id: "conduct",
      title: "5. Conducta del Usuario",
      icon: <Shield className="h-5 w-5" />,
      content: [
        "Se compromete a utilizar el servicio de manera legal y respetuosa.",
        "No puede publicar contenido que sea ofensivo, difamatorio, obsceno o que viole los derechos de terceros.",
        "Está prohibido el acoso, la intimidación o cualquier forma de comportamiento abusivo hacia otros usuarios.",
        "No puede utilizar el servicio para actividades comerciales no autorizadas o spam.",
        "Cualquier intento de hackear, interferir o dañar el servicio resultará en la terminación inmediata de su cuenta.",
      ],
    },
    {
      id: "privacy",
      title: "6. Privacidad y Datos",
      icon: <Shield className="h-5 w-5" />,
      content: [
        "Su privacidad es importante para nosotros. Consulte nuestra Política de Privacidad para obtener detalles completos.",
        "Recopilamos información necesaria para proporcionar y mejorar nuestros servicios.",
        "No vendemos ni compartimos su información personal con terceros sin su consentimiento.",
        "Utilizamos medidas de seguridad estándar de la industria para proteger sus datos.",
        "Tiene derecho a acceder, corregir o eliminar su información personal según las leyes aplicables.",
      ],
    },
    {
      id: "liability",
      title: "7. Limitación de Responsabilidad",
      icon: <AlertTriangle className="h-5 w-5" />,
      content: [
        "El servicio se proporciona 'tal como está' sin garantías de ningún tipo.",
        "No garantizamos que el servicio esté libre de errores o interrupciones.",
        "No somos responsables de daños indirectos, incidentales o consecuentes.",
      ],
    },
    {
      id: "termination",
      title: "8. Terminación",
      icon: <AlertTriangle className="h-5 w-5" />,
      content: [
        "Puede terminar su cuenta en cualquier momento eliminando su perfil en la configuración.",
        "Podemos suspender o terminar su acceso por violación de estos términos.",
        "La terminación no afecta los derechos y obligaciones que hayan surgido antes de la terminación.",
        "Tras la terminación, su derecho a utilizar el servicio cesa inmediatamente.",
        "Podemos retener cierta información según lo requiera la ley o para fines comerciales legítimos.",
      ],
    },
    {
      id: "governing",
      title: "9. Ley Aplicable y Jurisdicción",
      icon: <Scale className="h-5 w-5" />,
      content: [
        "Estos términos se rigen por las leyes del país donde opera NovelUzu.",
        "Cualquier disputa se resolverá en los tribunales competentes de nuestra jurisdicción.",
        "Si alguna disposición de estos términos es inválida, las disposiciones restantes permanecen en vigor.",
        "Estos términos constituyen el acuerdo completo entre usted y NovelUzu.",
        "Cualquier renuncia a estos términos debe ser por escrito y firmada por ambas partes.",
      ],
    },
  ]

  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main className="flex-1">
        {/* Hero Section con gradiente de fondo */}
        <section className="w-full py-8 md:py-12 gradient-fantasy">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col justify-center space-y-4">
              <div className="space-y-2">
                <h1 className="text-2xl font-bold tracking-tighter sm:text-3xl md:text-4xl lg:text-5xl text-white">
                  Términos y Condiciones
                </h1>
                <p className="max-w-[600px] text-sm text-white/90 sm:text-base md:text-lg">
                  Por favor, lea cuidadosamente estos términos antes de utilizar nuestros servicios
                </p>
              </div>
              <div className="flex items-center">
                <Badge variant="secondary" className="text-sm bg-white/20 text-white hover:bg-white/30">
                  Última actualización: {lastUpdated}
                </Badge>
              </div>
            </div>
          </div>
        </section>

        {/* Contenido Principal */}
        <section className="w-full py-8 md:py-16">
          <div className="container px-4 md:px-6">
            {/* Aviso Importante */}
            <Card className="mb-8 border-l-4 border-l-action">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2 text-action">
                  <AlertTriangle className="h-5 w-5" />
                  <span>Aviso Importante</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Al utilizar NovelUzu, usted acepta automáticamente estos términos y condiciones. Si no está de acuerdo
                  con alguna parte de estos términos, debe dejar de usar inmediatamente nuestros servicios.
                </p>
              </CardContent>
            </Card>

            {/* Navegación rápida */}
            <div className="mb-8">
              <h2 className="text-lg font-semibold mb-4">Navegación rápida</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-2">
                {sections.map((section) => (
                  <a
                    key={section.id}
                    href={`#${section.id}`}
                    className="text-sm px-3 py-2 rounded-md bg-muted hover:bg-muted/80 transition-colors"
                  >
                    {section.title}
                  </a>
                ))}
              </div>
            </div>

            {/* Secciones de Términos */}
            <div className="space-y-8">
              {sections.map((section, index) => (
                <Card key={section.id} id={section.id} className="scroll-mt-20 hover:shadow-md transition-shadow">
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-3">
                      <div className="p-2 bg-primary/10 rounded-lg text-primary">{section.icon}</div>
                      <span>{section.title}</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {section.content.map((paragraph, pIndex) => (
                        <p key={pIndex} className="text-muted-foreground leading-relaxed">
                          {paragraph}
                        </p>
                      ))}
                    </div>
                  </CardContent>
                  {index < sections.length - 1 && <Separator className="mt-6" />}
                </Card>
              ))}
            </div>

            {/* Contacto */}
            <Card className="mt-12 gradient-fantasy text-white">
              <CardHeader>
                <CardTitle className="text-xl md:text-2xl">¿Preguntas sobre estos términos?</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-semibold mb-2">Correo Electrónico</h4>
                    <p className="text-white/90">legal@noveluzu.com</p>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">Dirección</h4>
                    <p className="text-white/90">
                      123 Calle Principal
                      <br />
                      Ciudad, País 12345
                    </p>
                  </div>
                </div>
                <div className="mt-6">
                  <Button className="bg-white text-fantasy hover:bg-white/90" asChild>
                    <Link href="/contact">
                      Contactar Soporte Legal
                      <ChevronRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Nota al pie */}
            <div className="mt-8 text-center text-sm text-muted-foreground">
              <p>
                Estos términos están disponibles en múltiples idiomas. En caso de conflicto, la versión en español
                prevalecerá.
              </p>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  )
}
