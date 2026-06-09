# Sistema de Laboratorio Universitario 🔬

Aplicación web moderna y segura para la gestión de accesos a un laboratorio universitario. Este proyecto incluye un sistema de autenticación completo, diseño responsivo y protección de rutas.

## 🚀 Tecnologías Utilizadas

- **Framework:** Next.js 15 (App Router)
- **Lenguaje:** TypeScript
- **Estilos:** Tailwind CSS v4 (con paleta de colores personalizada)
- **Autenticación:** NextAuth.js v4
- **Seguridad:** `bcryptjs` para encriptado de contraseñas locales
- **Iconos:** `react-icons`

## 🎨 Paleta de Colores

El diseño utiliza un sistema de diseño estricto basado en las siguientes variables CSS de Tailwind:
- `bg-brand-1` (#31365d): Textos oscuros / Fondos principales
- `bg-brand-2` (#5e477f): Subtítulos / Bordes
- `bg-brand-3` (#a064ad): Botones primarios / Acentos
- `bg-brand-4` (#f98ae1): Botones secundarios / Hover / Gradientes
- `bg-brand-5` (#ffc4f4): Fondos claros / Inputs / Cards

## 🔑 Funcionalidades de Autenticación

El sistema soporta tres métodos de acceso:
1. **Google OAuth:** Inicio de sesión rápido con cuentas de Google.
2. **GitHub OAuth:** Inicio de sesión para desarrolladores/investigadores usando GitHub.
3. **Credenciales Locales:** 
   - Registro con nombre, correo electrónico y contraseña.
   - Contraseñas encriptadas.
   - **Sistema Antibruteforce:** Bloqueo de cuenta temporal (5 minutos) tras 5 intentos fallidos de inicio de sesión.

## ⚙️ Configuración y Uso Local

### 1. Variables de Entorno
Crea un archivo `.env.local` en la raíz del proyecto y añade las siguientes variables:

```env
# Claves de OAuth (Reemplaza con las tuyas)
GOOGLE_CLIENT_ID="tu-client-id"
GOOGLE_CLIENT_SECRET="tu-client-secret"
GITHUB_CLIENT_ID="tu-client-id"
GITHUB_CLIENT_SECRET="tu-client-secret"

# Configuración de NextAuth
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="cualquier-texto-seguro-generado-al-azar"
```

### 2. Instalación
Abre tu terminal en la raíz del proyecto e instala las dependencias:
```bash
npm install
```

### 3. Ejecutar el servidor de desarrollo
Inicia el entorno local:
```bash
npm run dev
```
Abre [http://localhost:3000](http://localhost:3000) en tu navegador para ver la aplicación.

## 🌐 Despliegue en Vercel

1. Sube este repositorio a tu cuenta de GitHub.
2. Importa el repositorio en [Vercel](https://vercel.com/).
3. Configura las **Environment Variables** en Vercel copiando los valores de tu `.env.local`.
   - *Nota:* Asegúrate de cambiar `NEXTAUTH_URL` a tu nueva URL de Vercel (ej. `https://mi-app.vercel.app`).
4. Haz clic en **Deploy**.
5. **Importante:** Actualiza los "Redirect URIs" en Google Cloud y GitHub Developer Settings con tu nueva URL de Vercel (añadiendo `/api/auth/callback/google` y `/api/auth/callback/github` al final de tu dominio).
