/**
 * Página de Política de Privacidad de NovelUzu
 *
 * Esta página muestra:
 * - Política de privacidad detallada
 * - Información sobre recopilación y uso de datos
 * - Derechos del usuario
 */
import Link from "next/link"
import { Shield, Eye, Database, Lock, UserCheck, Globe, Mail, Phone } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"

export default function PrivacyPage() {
  const lastUpdated = "15 de Enero, 2024"

  const sections = [
    {
      id: "information-collection",
      title: "1. Información que Recopilamos",
      icon: <Database className="h-5 w-5" />,
      content: [
        "Recopilamos información personal que usted nos proporciona directamente, como nombre, dirección de correo electrónico y preferencias de lectura.",
        "Información de uso automática: páginas visitadas, tiempo de lectura, dispositivo utilizado y dirección IP.",
        "Cookies y tecnologías similares para mejorar su experiencia y personalizar el contenido.",
        "Información de terceros cuando se registra usando servicios como Google o Facebook.",
      ],
    },
    {
      id: "information-use",
      title: "2. Cómo Utilizamos su Información",
      icon: <Eye className="h-5 w-5" />,
      content: [
        "Proporcionar y mantener nuestros servicios de lectura de novelas web.",
        "Personalizar su experiencia con recomendaciones basadas en sus preferencias.",
        "Comunicarnos con usted sobre actualizaciones, nuevas funciones y contenido.",
        "Mejorar nuestros servicios mediante análisis de uso y retroalimentación.",
        "Cumplir con obligaciones legales y proteger nuestros derechos.",
      ],
    },
    {
      id: "information-sharing",
      title: "3. Compartir Información",
      icon: <Globe className="h-5 w-5" />,
      content: [
        "No vendemos, alquilamos ni compartimos su información personal con terceros para fines comerciales.",
        "Podemos compartir información con proveedores de servicios que nos ayudan a operar la plataforma.",
        "Divulgación requerida por ley o para proteger nuestros derechos y los de nuestros usuarios.",
        "Información agregada y anonimizada puede ser compartida para fines estadísticos.",
      ],
    },
    {
      id: "data-security",
      title: "4. Seguridad de Datos",
      icon: <Lock className="h-5 w-5" />,
      content: [
        "Implementamos medidas de seguridad técnicas y organizativas para proteger su información.",
        "Utilizamos encriptación SSL/TLS para todas las transmisiones de datos sensibles.",
        "Acceso restringido a información personal solo para empleados autorizados.",
        "Monitoreo continuo de nuestros sistemas para detectar y prevenir brechas de seguridad.",
        "Aunque tomamos precauciones, ningún sistema es 100% seguro y no podemos garantizar seguridad absoluta.",
      ],
    },
    {
      id: "user-rights",
      title: "5. Sus Derechos",
      icon: <UserCheck className="h-5 w-5" />,
      content: [
        "Derecho de acceso: puede solicitar una copia de la información personal que tenemos sobre usted.",
        "Derecho de rectificación: puede corregir información inexacta o incompleta.",
        "Derecho de eliminación: puede solicitar que eliminemos su información personal.",
        "Derecho de portabilidad: puede solicitar sus datos en un formato estructurado y legible.",
        "Derecho de oposición: puede oponerse al procesamiento de sus datos para ciertos fines.",
      ],
    },
    {
      id: "cookies",
      title: "6. Cookies y Tecnologías de Seguimiento",
      icon: <Database className="h-5 w-5" />,
      content: [
        "Utilizamos cookies esenciales para el funcionamiento básico del sitio web.",
        "Cookies de rendimiento para analizar cómo los usuarios interactúan con nuestro sitio.",
        "Cookies de funcionalidad para recordar sus preferencias y configuraciones.",
        "Puede controlar las cookies a través de la configuración de su navegador.",
        "Algunas funciones pueden no estar disponibles si deshabilita las cookies.",
      ],
    },
    {
      id: "data-retention",
      title: "7. Retención de Datos",
      icon: <Database className="h-5 w-5" />,
      content: [
        "Conservamos su información personal solo durante el tiempo necesario para los fines descritos.",
        "Datos de cuenta activa se conservan mientras mantenga su cuenta abierta.",
        "Información de uso se conserva por un período de 2 años para análisis y mejoras.",
        "Algunos datos pueden conservarse por períodos más largos según requisitos legales.",
        "Puede solicitar la eliminación de sus datos en cualquier momento.",
      ],
    },
    {
      id: "international-transfers",
      title: "8. Transferencias Internacionales",
      icon: <Globe className="h-5 w-5" />,
      content: [
        "Sus datos pueden ser transferidos y procesados en países fuera de su residencia.",
        "Implementamos salvaguardas apropiadas para proteger sus datos durante transferencias.",
        "Cumplimos con regulaciones internacionales de protección de datos aplicables.",
        "Puede contactarnos para obtener más información sobre las salvaguardas implementadas.",
      ],
    },
    {
      id: "children-privacy",
      title: "9. Privacidad de Menores",
      icon: <Shield className="h-5 w-5" />,
      content: [
        "Nuestros servicios no están dirigidos a menores de 13 años.",
        "No recopilamos conscientemente información personal de menores de 13 años.",
        "Si descubrimos que hemos recopilado información de un menor, la eliminaremos inmediatamente.",
        "Los padres pueden contactarnos si creen que su hijo ha proporcionado información personal.",
      ],
    },
    {
      id: "policy-changes",
      title: "10. Cambios a esta Política",
      icon: <Eye className="h-5 w-5" />,
      content: [
        "Podemos actualizar esta política de privacidad ocasionalmente para reflejar cambios en nuestras prácticas.",
        "Le notificaremos sobre cambios significativos por correo electrónico o mediante aviso en nuestro sitio.",
        "Su uso continuado de nuestros servicios después de los cambios constituye aceptación de la nueva política.",
        "Recomendamos revisar esta política periódicamente para mantenerse informado.",
      ],
    },
  ]

  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="w-full py-8 md:py-12 gradient-fantasy">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col justify-center space-y-4">
              <div className="space-y-2">
                <h1 className="text-2xl font-bold tracking-tighter sm:text-3xl md:text-4xl lg:text-5xl text-white">
                  Política de Privacidad
                </h1>
                <p className="max-w-[600px] text-sm text-white/90 sm:text-base md:text-lg">
                  Cómo recopilamos, utilizamos y protegemos su información personal
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
            {/* Resumen Ejecutivo */}
            <Card className="mb-8 border-l-4 border-l-primary">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Shield className="h-5 w-5 text-primary" />
                  <span>Resumen de Privacidad</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  En NovelUzu, respetamos su privacidad y nos comprometemos a proteger su información personal. Esta
                  política explica cómo recopilamos, utilizamos y protegemos sus datos.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="text-center p-4 bg-muted/50 rounded-lg">
                    <Lock className="h-8 w-8 mx-auto mb-2 text-primary" />
                    <h4 className="font-semibold">Datos Seguros</h4>
                    <p className="text-sm text-muted-foreground">Encriptación y protección avanzada</p>
                  </div>
                  <div className="text-center p-4 bg-muted/50 rounded-lg">
                    <UserCheck className="h-8 w-8 mx-auto mb-2 text-primary" />
                    <h4 className="font-semibold">Sus Derechos</h4>
                    <p className="text-sm text-muted-foreground">Control total sobre sus datos</p>
                  </div>
                  <div className="text-center p-4 bg-muted/50 rounded-lg">
                    <Eye className="h-8 w-8 mx-auto mb-2 text-primary" />
                    <h4 className="font-semibold">Transparencia</h4>
                    <p className="text-sm text-muted-foreground">Información clara y accesible</p>
                  </div>
                </div>
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

            {/* Secciones de Política */}
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

            {/* Contacto para Privacidad */}
            <Card className="mt-12 gradient-fantasy text-white">
              <CardHeader>
                <CardTitle className="text-xl md:text-2xl">¿Preguntas sobre Privacidad?</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-semibold mb-2 flex items-center">
                      <Mail className="h-4 w-4 mr-2" />
                      Oficial de Privacidad
                    </h4>
                    <p className="text-white/90">privacy@noveluzu.com</p>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2 flex items-center">
                      <Phone className="h-4 w-4 mr-2" />
                      Línea de Privacidad
                    </h4>
                    <p className="text-white/90">+1 (555) 123-PRIVACY</p>
                  </div>
                </div>
                <div className="mt-6">
                  <Button className="bg-white text-fantasy hover:bg-white/90" asChild>
                    <Link href="/contact">Contactar sobre Privacidad</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  )
}
