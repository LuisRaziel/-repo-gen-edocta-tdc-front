# 🖼️ CPM - Aplicación Generación de Estados de Cuenta TDC

Este repositorio contiene la aplicación web desarrollada en React para la creación, validación de muestras y envió de estados de cuenta por parte de usuarios autorizados.

---

## 🛠️ Tecnologías utilizadas

- React 18 (con Vite)
- Tailwind CSS
- React Router DOM
- Arquitectura **Atomic Design**

---

## 📁 Estructura del proyecto

📦 frontend  
├── 📁 public  
├── 📁 src  
│   ├── 📁 assets  
│   ├── 📁 components  
│   │   ├── 📁 atoms         # Elementos básicos (`Button`, `Input`)  
│   │   ├── 📁 molecules     # Combinaciones simples (`InputGroup`, `StatusRow`)  
│   │   ├── 📁 organisms     # Secciones funcionales (`TablaMuestras`, `ModalValidar`)  
│   │   ├── 📁 templates     # Layouts base  
│   │   └── 📁 pages         # Pantallas: Login, Validación, Confirmación  
│   ├── 📁 services          # Consumo de API REST  
│   ├── 📁 hooks             # Custom hooks (`useAuth`, `useFetch`)  
│   ├── 📁 context           # Estado global compartido (opcional)  
│   ├── App.tsx  
│   └── main.tsx  
├── 📄 vite.config.ts  
└── 📄 package.json

---

## ✅ Funcionalidades clave

- Autenticación mediante Active Directory
- Carga de layout de CIFs (`.xlsx`)
- Visualización y validación de muestras por área
- Registro de validación (usuario, área, fecha/hora)
- Habilitación de botón de envío al completar validaciones

---

## ▶️ Ejecución local

```bash
npm install
npm run dev
```

---

## 🚀 Despliegue en IIS

### Requisitos previos
- IIS con el módulo **URL Rewrite** instalado ([Descargar aquí](https://www.iis.net/downloads/microsoft/url-rewrite))

### Pasos para desplegar

1. **Compilar el proyecto:**
   ```bash
   npm install
   npm run build
   ```

2. **Desplegar en IIS:**
   - Copia todo el contenido de la carpeta `dist/` al directorio de tu aplicación web o directorio virtual en IIS
   - Asegúrate de que la aplicación esté configurada en la ruta `/CPM.AdmonEdoCtas/`

3. **Configuración automática:**
   - El archivo `web.config` ya está incluido en el build y configura automáticamente las reglas de reescritura de URL
   - Esto soluciona el error **HTTP 404** al recargar la página (F5) en rutas como `/dashboard`, `/gdm`, etc.

### ¿Cómo funciona?

El archivo `web.config` redirige todas las peticiones que no correspondan a archivos físicos hacia `index.html`, permitiendo que React Router maneje el enrutamiento del lado del cliente. Esto es esencial para aplicaciones SPA (Single Page Application).

### Solución de problemas

- **Error 404 al recargar:** Verifica que el módulo URL Rewrite esté instalado en IIS
- **Rutas no funcionan:** Confirma que la aplicación está desplegada en el path `/CPM.AdmonEdoCtas/`
- **Assets no cargan:** Revisa que todos los archivos de la carpeta `dist/` hayan sido copiados correctamente