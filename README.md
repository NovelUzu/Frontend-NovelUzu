<div align="center">
  <img src="/public/placeholder.png" alt="NovelUzu Logo" width="200" height="auto" />
  <h1>📖 NovelUzu</h1>
  <p>Plataforma para escritores y lectores de novelas web con sistema de publicación, descubrimiento y lectura en línea.</p>
  
  <p>
    <img src="https://img.shields.io/badge/Next.js-15.2.4-black?logo=next.js" alt="Next.js" />
    <img src="https://img.shields.io/badge/React-18.0.0-blue?logo=react" alt="React" />
    <img src="https://img.shields.io/badge/TypeScript-5.x-blue?logo=typescript" alt="TypeScript" />
    <img src="https://img.shields.io/badge/Tailwind-3.4.17-38bdf8?logo=tailwindcss" alt="Tailwind" />
    <img src="https://img.shields.io/badge/Go-1.21+-00ADD8?logo=go" alt="Go" />
    <img src="https://img.shields.io/badge/NextCloud-0082C9?logo=nextcloud" alt="NextCloud" />
    <img src="https://img.shields.io/badge/OpenNebula-C12D87?logo=opennebula" alt="OpenNebula" />
  </p>
  
  <p>
    <a href="#caracteristicas">Características</a> •
    <a href="#inicio-rapido">Inicio Rápido</a> •
  </p>
</div>

<h2 id="caracteristicas">✨ Características</h2>

### 👥 Para Usuarios
- **Diseño Responsive** optimizado para móviles y escritorio
- **Modo Oscuro/Claro** para una experiencia de lectura personalizada
- **Búsqueda Avanzada** con filtros por género, popularidad, estado y más
- **Perfil Completo** con capacidades tanto de lectura como escritura

### 📝 Sistema de Escritura
- **Editor Enriquecido** con formato y vista previa en tiempo real
- **Sistema de Publicación** con borradores, programación y revisiones
- **Gestión de Capítulos** con organización por volúmenes/arcos
- **Almacenamiento de Imágenes** con NextCloud para portadas y contenido multimedia

### 📚 Sistema de Lectura
- **Biblioteca Personal** con seguimiento automático de progreso
- **Experiencia de Lectura Personalizable** (fuente, tamaño, espaciado, tema)
- **Sistema de Recomendaciones** basado en historial y preferencias
- **Comentarios y Reseñas** por capítulo y obra completa
- **Listas de Lectura** para organizar novelas por categorías personalizadas

### 👑 Para Administradores
- **Panel de Control** con métricas y estadísticas globales
- **Gestión de Usuarios** con roles y permisos
- **Moderación de Contenido** para reportes y contenido inapropiado

<h2 id="inicio-rapido">🚀 Inicio Rápido</h2>

### Requisitos Previos
- Node.js 18+ y npm/yarn
- Servidor NextCloud para almacenamiento de imágenes
- OpenNebula para despliegue (opcional para desarrollo local)

### Instalación y Desarrollo

```bash
# Clonar el repositorio
git clone <repositorio-url>
cd noveluzu

# Instalar dependencias
npm install

# Configurar variables de entorno
cp .env.example .env.local

# Iniciar servidor de desarrollo
npm run dev
```

### 🏗️ Arquitectura y Despliegue

La plataforma utiliza una arquitectura moderna distribuida:

#### Frontend (Next.js)
- **Framework**: Next.js 15 con React 18 y TypeScript
- **Estilos**: Tailwind CSS + componentes shadcn/ui
- **Estado**: Context API para autenticación y estado global
- **Despliegue**: Máquinas Debian en OpenNebula con PM2

#### Backend (Go)
- **Framework**: Gin para API REST
- **Base de Datos**: PostgreSQL con GORM ORM
- **Autenticación**: JWT con bcrypt para hash de contraseñas
- **Despliegue**: Máquinas Debian en OpenNebula como servicio systemd

#### Almacenamiento
- **Imágenes**: NextCloud para portadas y avatares de usuario
- **API de Archivos**: Integración directa con NextCloud WebDAV

#### Infraestructura
- **Plataforma**: OpenNebula con 2 máquinas virtuales Debian
- **Frontend**: PM2 para gestión de procesos Next.js
- **Backend**: Servicio systemd para el servidor Go
- **Load Balancer**: HAProxy para distribución de tráfico entre VMs
- **DNS/CDN**: Cloudflare para gestión de dominio y CDN global