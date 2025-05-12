"use client"

import { useState } from "react"
import Link from "next/link"
import { ArrowLeft, ArrowRight, BookOpen, ChevronLeft, ChevronRight, List, Moon, Settings, Sun } from "lucide-react"

import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { Slider } from "@/components/ui/slider"

import { use } from 'react'
export default function ChapterPage({ params }: { params: Promise<{ id: string; chapterId: string }> }) {
    const { id: novelId, chapterId } = use(params)
    const [fontSize, setFontSize] = useState(16)
    const [theme, setTheme] = useState<"light" | "dark" | "sepia">("light")

  return (
    <div
      className={`min-h-screen ${theme === "dark" ? "bg-gray-900 text-gray-100" : theme === "sepia" ? "bg-[#f8f1e3] text-gray-800" : "bg-white text-gray-800"}`}
    >
      <header
        className={`sticky top-0 z-50 w-full border-b ${theme === "dark" ? "bg-gray-900/95 border-gray-800" : theme === "sepia" ? "bg-[#f8f1e3]/95 border-amber-200" : "bg-white/95 border-gray-200"} backdrop-blur supports-[backdrop-filter]:bg-background/60`}
      >
        <div className="container flex h-14 items-center">
          <Link href={`/novel/${novelId}`} className="flex items-center gap-2">
            <ChevronLeft className="h-5 w-5" />
            <span className="text-sm font-medium">Volver a la novela</span>
          </Link>
          <div className="ml-auto flex items-center gap-2">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="h-9 w-9">
                  <List className="h-5 w-5" />
                  <span className="sr-only">Capítulos</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right">
                <SheetHeader>
                  <SheetTitle>Capítulos</SheetTitle>
                </SheetHeader>
                <div className="mt-6 space-y-1">
                  {[...Array(10)].map((_, i) => (
                    <Button
                      key={i}
                      variant="ghost"
                      className={`w-full justify-start ${Number(chapterId) === 120 - i ? "bg-muted font-medium" : ""}`}
                      asChild
                    >
                      <Link href={`/novel/${novelId}/chapter/${120 - i}`}>
                        Capítulo {120 - i}:{" "}
                        {i === 0
                          ? "El Despertar Final"
                          : `La Prueba del ${i === 1 ? "Valor" : i === 2 ? "Coraje" : i === 3 ? "Espíritu" : "Destino"} (${i + 1})`}
                      </Link>
                    </Button>
                  ))}
                  <div className="pt-4">
                    <Button variant="outline" className="w-full">
                      Cargar más capítulos
                    </Button>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="h-9 w-9">
                  <Settings className="h-5 w-5" />
                  <span className="sr-only">Configuración</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <div className="p-2">
                  <div className="space-y-1 pb-2">
                    <h4 className="text-sm font-medium">Tema</h4>
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        className={`flex-1 ${theme === "light" ? "border-primary" : ""}`}
                        onClick={() => setTheme("light")}
                      >
                        <Sun className="mr-1 h-4 w-4" />
                        Claro
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        className={`flex-1 ${theme === "dark" ? "border-primary" : ""}`}
                        onClick={() => setTheme("dark")}
                      >
                        <Moon className="mr-1 h-4 w-4" />
                        Oscuro
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        className={`flex-1 ${theme === "sepia" ? "border-primary" : ""}`}
                        onClick={() => setTheme("sepia")}
                      >
                        <BookOpen className="mr-1 h-4 w-4" />
                        Sepia
                      </Button>
                    </div>
                  </div>
                  <Separator className="my-2" />
                  <div className="space-y-1 pb-2">
                    <div className="flex items-center justify-between">
                      <h4 className="text-sm font-medium">Tamaño de texto</h4>
                      <span className="text-xs text-muted-foreground">{fontSize}px</span>
                    </div>
                    <Slider
                      defaultValue={[fontSize]}
                      min={12}
                      max={24}
                      step={1}
                      onValueChange={(value) => setFontSize(value[0])}
                      className="py-2"
                    />
                  </div>
                  <Separator className="my-2" />
                  <div className="space-y-1">
                    <h4 className="text-sm font-medium">Fuente</h4>
                    <Select defaultValue="default">
                      <SelectTrigger>
                        <SelectValue placeholder="Seleccionar fuente" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="default">Por defecto</SelectItem>
                        <SelectItem value="serif">Serif</SelectItem>
                        <SelectItem value="mono">Monoespaciada</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </header>
      <main
        className={`container mx-auto px-4 py-8 md:px-6 md:py-12 ${theme === "dark" ? "text-gray-100" : theme === "sepia" ? "text-gray-800" : "text-gray-800"}`}
      >
        <div className="mx-auto max-w-2xl">
          <div className="mb-8 space-y-2 text-center">
            <h1 className="text-2xl font-bold">Capítulo {chapterId}: El Despertar del Héroe</h1>
            <p className="text-sm text-muted-foreground">Publicado: 10 de mayo, 2023</p>
          </div>
          <div
            className={`prose max-w-none ${theme === "dark" ? "prose-invert" : ""}`}
            style={{ fontSize: `${fontSize}px` }}
          >
            <p>
              La luz del amanecer se filtraba por las rendijas de la ventana, iluminando tenuemente la pequeña
              habitación donde Aron dormía. Los rayos dorados bailaban sobre su rostro, como si intentaran despertarlo
              con suavidad antes de la tormenta que estaba por venir.
            </p>
            <p>
              Aron se despertó sobresaltado, con el corazón latiendo furiosamente contra su pecho. El sueño había sido
              tan vívido, tan real, que por un momento no supo distinguir si seguía dormido o ya estaba despierto. En su
              mente aún resonaban las palabras del anciano de túnica blanca: "El tiempo ha llegado, joven héroe. El
              destino del mundo descansa sobre tus hombros".
            </p>
            <p>
              —Solo fue un sueño —murmuró para sí mismo, pasándose una mano por el cabello húmedo de sudor—. Solo un
              sueño más.
            </p>
            <p>
              Pero en el fondo de su corazón, sabía que no era cierto. Estos sueños habían comenzado hace exactamente un
              mes, cada vez más intensos, cada vez más detallados. Y siempre con el mismo mensaje: algo estaba por
              suceder, algo que cambiaría su vida para siempre.
            </p>
            <p>
              Se levantó de la cama y se acercó a la ventana. El pueblo de Aldermist comenzaba a despertar. Los
              comerciantes abrían sus tiendas, los niños corrían hacia la escuela, y los granjeros ya estaban en los
              campos. Una mañana normal en un pueblo normal. ¿Cómo podía ser él, un simple aprendiz de herrero, el héroe
              de una profecía ancestral?
            </p>
            <p>—¡Aron! ¡El desayuno está listo! —la voz de su madre lo sacó de sus pensamientos.</p>
            <p>—¡Ya voy! —respondió, apartándose de la ventana.</p>
            <p>
              Se vistió rápidamente con su ropa de trabajo: una camisa de lino gastada, pantalones de cuero resistente y
              botas reforzadas. Hoy tenía mucho trabajo en la herrería de su maestro, el viejo Gorn. No había tiempo
              para pensar en sueños y profecías.
            </p>
            <p>
              Bajó las escaleras y encontró a su madre sirviendo un cuenco de avena caliente con miel. A sus cuarenta y
              cinco años, Elara seguía siendo una mujer hermosa, aunque las arrugas alrededor de sus ojos y las canas
              prematuras en su cabello castaño hablaban de una vida de trabajo duro y preocupaciones.
            </p>
            <p>—Buenos días, hijo —sonrió ella, colocando el cuenco sobre la mesa de madera—. ¿Dormiste bien?</p>
            <p>
              Aron dudó un momento. Nunca le había contado a su madre sobre los sueños. No quería preocuparla más de lo
              necesario.
            </p>
            <p>—Sí, bastante bien —mintió, sentándose a la mesa—. ¿Y tú?</p>
            <p>
              —Como siempre —respondió ella, sentándose frente a él con su propio cuenco—. Aunque anoche hubo mucho
              movimiento en la posada. Parece que han llegado viajeros de la capital.
            </p>
            <p>Aron levantó la mirada, súbitamente interesado.</p>
            <p>—¿Viajeros? ¿Qué tipo de viajeros?</p>
            <p>—No lo sé con certeza. Pero uno de ellos llevaba la insignia real. Quizás sean mensajeros del rey.</p>
            <p>
              Un escalofrío recorrió la espalda de Aron. En sus sueños, siempre aparecía un mensajero real que traía
              noticias que cambiarían el curso de la historia.
            </p>
            <p>—¿Y sabes qué buscan en Aldermist? —preguntó, intentando que su voz sonara casual.</p>
            <p>Elara negó con la cabeza.</p>
            <p>
              —Nadie lo sabe. Llegaron tarde en la noche y se encerraron en sus habitaciones. Pero el posadero dice que
              preguntaron por el herrero.
            </p>
            <p>El corazón de Aron dio un vuelco. ¿Preguntaron por el herrero? ¿Por Gorn? ¿O quizás... por él?</p>
            <p>
              —Será mejor que me dé prisa entonces —dijo, terminando rápidamente su desayuno—. Si vienen a la herrería,
              no quiero hacer esperar a los mensajeros del rey.
            </p>
            <p>Elara lo miró con una mezcla de orgullo y preocupación.</p>
            <p>—Ten cuidado, Aron. Los asuntos de la realeza rara vez traen buenas noticias a gente como nosotros.</p>
            <p>
              Aron asintió, comprendiendo perfectamente lo que su madre quería decir. En los dieciocho años de su vida,
              había aprendido que los poderosos solo se acordaban de los humildes cuando necesitaban algo de ellos.
            </p>
            <p>
              Se despidió con un beso en la mejilla de su madre y salió de la pequeña casa de piedra. El aire fresco de
              la mañana le golpeó el rostro, despejando los últimos vestigios de sueño. Respiró profundamente, llenando
              sus pulmones del aroma a pan recién horneado que provenía de la panadería cercana.
            </p>
            <p>
              Mientras caminaba por las calles empedradas de Aldermist, no podía dejar de pensar en los viajeros de la
              capital. ¿Qué querrían del herrero? ¿Y por qué ahora, justo cuando sus sueños se habían vuelto más
              intensos que nunca?
            </p>
            <p>
              La herrería de Gorn se encontraba en el extremo oeste del pueblo, cerca del río. El sonido del martillo
              golpeando el yunque ya se escuchaba desde lejos, indicando que su maestro había comenzado la jornada
              temprano.
            </p>
            <p>
              —¡Llegas tarde, muchacho! —gruñó Gorn cuando Aron entró al taller. A sus sesenta años, el viejo herrero
              seguía siendo un hombre fornido, con brazos musculosos y manos callosas por décadas de trabajo con el
              metal. Su barba gris estaba chamuscada en algunas partes, y su delantal de cuero mostraba las marcas de
              incontables chispas.
            </p>
            <p>
              —Lo siento, maestro —se disculpó Aron, colgando su capa en un gancho y poniéndose su propio delantal—. Me
              entretuve desayunando.
            </p>
            <p>Gorn resopló, pero no había verdadero enojo en su mirada.</p>
            <p>
              —Tenemos mucho trabajo hoy. El granjero Tomas necesita su arado reparado antes del mediodía, y el capitán
              de la guardia encargó seis espadas nuevas para sus hombres.
            </p>
            <p>Aron asintió, dirigiéndose al fuelle para avivar el fuego de la forja.</p>
            <p>—Maestro, ¿ha oído sobre los viajeros que llegaron anoche a la posada?</p>
            <p>Gorn dejó de martillar y miró a su aprendiz con una expresión indescifrable.</p>
            <p>—Sí, he oído —respondió secamente—. Y también he oído que preguntan por el herrero.</p>
            <p>—¿Sabe qué quieren?</p>
            <p>El viejo herrero reanudó su trabajo, golpeando con fuerza una pieza de metal al rojo vivo.</p>
            <p>—No, pero lo averiguaremos pronto. Dijeron que vendrían esta mañana.</p>
            <p>
              Como si sus palabras hubieran sido una invocación, la puerta de la herrería se abrió, y tres figuras
              entraron en el taller. Dos de ellos eran claramente guardias reales, con sus brillantes armaduras y capas
              púrpuras. Pero fue el tercero quien captó la atención de Aron.
            </p>
            <p>
              Era un hombre alto y delgado, de unos cincuenta años, con una larga túnica blanca que llegaba hasta el
              suelo. Su cabello y barba eran completamente blancos, y sus ojos, de un azul tan claro que parecían casi
              transparentes, brillaban con una sabiduría antigua. En su pecho, una insignia de plata con la forma de un
              dragón alado destellaba bajo la luz del fuego.
            </p>
            <p>Aron sintió que el aire abandonaba sus pulmones. Era él. El anciano de sus sueños.</p>
            <p>—Buenos días —saludó el hombre con una voz suave pero autoritaria—. Busco al herrero de Aldermist.</p>
            <p>Gorn se adelantó, limpiándose las manos en el delantal.</p>
            <p>—Soy yo, Gorn, el herrero. ¿En qué puedo servirle, señor...?</p>
            <p>
              —Magister Aldric, consejero real y archimago de la Orden del Dragón Blanco —se presentó el anciano,
              inclinando levemente la cabeza—. Y no es a ti a quien busco, buen herrero, sino a tu aprendiz.
            </p>
            <p>
              Todas las miradas se dirigieron hacia Aron, que permanecía inmóvil junto al fuelle, con el corazón
              latiendo tan fuerte que temía que todos pudieran oírlo.
            </p>
            <p>—¿A mí? —logró articular finalmente.</p>
            <p>El archimago sonrió, una sonrisa que no llegó a sus ojos.</p>
            <p>
              —Sí, Aron, hijo de Elara. A ti. El tiempo ha llegado, joven héroe. El destino del mundo descansa sobre tus
              hombros.
            </p>
            <p>Las mismas palabras de su sueño. Exactamente las mismas.</p>
            <p>Y en ese momento, Aron supo que su vida normal en Aldermist había terminado para siempre.</p>
            <p>
              <em>Continuará en el próximo capítulo...</em>
            </p>
          </div>
          <div className="mt-12 flex items-center justify-between">
            <Button variant="outline" className="gap-2" disabled>
              <ArrowLeft className="h-4 w-4" />
              Anterior
            </Button>
            <div className="text-sm">Capítulo {chapterId} de 120</div>
            <Button className="gap-2">
              Siguiente
              <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </main>
      <footer
        className={`w-full border-t py-6 ${theme === "dark" ? "bg-gray-900 border-gray-800" : theme === "sepia" ? "bg-[#f8f1e3] border-amber-200" : "bg-white border-gray-200"}`}
      >
        <div className="container flex flex-col items-center justify-between gap-4 px-4 md:flex-row md:px-6">
          <div className="flex items-center gap-2">
            <BookOpen className="h-5 w-5" />
            <span className="text-lg font-bold">WebNovelApp</span>
          </div>
          <div className="flex items-center gap-4">
            <Button variant="outline" size="sm" className="gap-2" asChild>
              <Link href={`/novel/${novelId}`}>
                <ChevronLeft className="h-4 w-4" />
                Volver a la novela
              </Link>
            </Button>
            <div className="flex items-center gap-1">
              <Button variant="ghost" size="icon" className="h-8 w-8" disabled>
                <ChevronLeft className="h-4 w-4" />
                <span className="sr-only">Capítulo anterior</span>
              </Button>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <ChevronRight className="h-4 w-4" />
                <span className="sr-only">Capítulo siguiente</span>
              </Button>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
