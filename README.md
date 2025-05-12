<div align="center">
  <img src="/public/logo.png" alt="NovelUzu Logo" width="200" height="auto" />
  <h1>📖 NovelUzu</h1>
  <p>Plataforma para escritores y lectores de novelas web con sistema de publicación, descubrimiento y lectura en línea.</p>
  
  <p>
    <img src="https://img.shields.io/badge/Next.js-14.2.3-black?logo=next.js" alt="Next.js" />
    <img src="https://img.shields.io/badge/React-18.2.0-blue?logo=react" alt="React" />
    <img src="https://img.shields.io/badge/TypeScript-5.0.0-blue?logo=typescript" alt="TypeScript" />
    <img src="https://img.shields.io/badge/Tailwind-3.3.0-38bdf8?logo=tailwindcss" alt="Tailwind" />
    <img src="https://img.shields.io/badge/Supabase-2.0.0-3ecf8e?logo=supabase" alt="Supabase" />
  </p>
  
  <p>
    <a href="#✨-características">Características</a> •
    <a href="#🚀-inicio-rápido">Inicio Rápido</a> •
    <a href="#🛠️-tecnologías">Tecnologías</a> •
    <a href="#📋-estructura-del-proyecto">Estructura</a> •
    <a href="#🤝-contribuir">Contribuir</a> •
    <a href="#📄-licencia">Licencia</a>
  </p>
</div>

## ✨ Características

### 👥 Para Todos los Usuarios
- **Diseño Responsive** optimizado para móviles, tablets y escritorio
- **Modo Oscuro/Claro** para una experiencia de lectura personalizada
- **Búsqueda Avanzada** con filtros por género, popularidad, estado y más
- **Notificaciones** sobre actualizaciones de novelas seguidas

### ✍️ Para Escritores
- **Editor Enriquecido** con formato, imágenes y vista previa en tiempo real
- **Sistema de Publicación** con borradores, programación y revisiones
- **Gestión de Capítulos** con organización por volúmenes/arcos
- **Estadísticas Detalladas** sobre lectores, retención y engagement
- **Monetización** a través de capítulos premium y donaciones

### 📚 Para Lectores
- **Biblioteca Personal** con seguimiento automático de progreso
- **Experiencia de Lectura Personalizable** (fuente, tamaño, espaciado, tema)
- **Sistema de Recomendaciones** basado en historial y preferencias
- **Comentarios y Reseñas** por capítulo y obra completa
- **Listas de Lectura** para organizar novelas por categorías personalizadas
- **Modo Sin Conexión** para leer capítulos descargados

### 👑 Para Administradores
- **Panel de Control** con métricas y estadísticas globales
- **Gestión de Usuarios** con roles y permisos
- **Moderación de Contenido** para reportes y contenido inapropiado
- **Herramientas de Promoción** para destacar novelas en la plataforma

## 🚀 Inicio Rápido

### Requisitos Previos
- Node.js 18+ y npm/yarn
- Cuenta en Supabase (gratuita para desarrollo)
- Variables de entorno configuradas (ver `.env.example`)

### Instalación y Desarrollo

```bash
# Clonar el repositorio
git clone  <repositorio-url>
cd noveluzu

# Instalar dependencias
npm install

# Configurar variables de entorno
cp .env.example .env.local
# Editar .env.local con tus credenciales

# Iniciar servidor de desarrollo
npm run dev