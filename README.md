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