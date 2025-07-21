# 🖼️ CPM - Pantalla de muestreo (REQ-16537)

Este repositorio contiene la aplicación web desarrollada en React para la validación de muestras de estados de cuenta TDC. Forma parte del requerimiento REQ‑16537.

---

## 🛠️ Tecnologías

- React 18 (con Vite)
- Tailwind CSS
- React Router DOM
- **Atomic Design** como arquitectura de componentes

---

## 📁 Estructura del proyecto

📦 frontend
├── 📁 public
├── 📁 src
│   ├── 📁 assets
│   ├── 📁 components
│   │   ├── 📁 atoms         # Elementos básicos: Button, Input
│   │   ├── 📁 molecules     # Combinaciones simples: InputGroup, StatusRow
│   │   ├── 📁 organisms     # Secciones funcionales: TablaMuestras, ModalValidar
│   │   ├── 📁 templates     # Layout base de pantalla
│   │   └── 📁 pages         # Pantallas principales: Login, Validación, Resultado
│   ├── 📁 services          # Conexiones con API REST
│   ├── 📁 hooks             # Custom hooks (ej. useAuth, useFetch)
│   ├── 📁 context           # Estado global compartido (opcional)
│   ├── App.tsx
│   └── main.tsx
├── 📄 vite.config.ts
└── 📄 package.json

---

## ✅ Funcionalidades clave

- Login por Active Directory
- Carga de layout de CIFs (`.xlsx`)
- Visualización de tabla de validaciones por área
- Captura de validación por usuario (nombre, área, fecha/hora)
- Habilitación automática de botón de envío

---

## ▶️ Ejecución local

```bash
npm install
npm run dev