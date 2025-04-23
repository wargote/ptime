
# 🕒 PTime – Personal Time Manager

**PTime** es una aplicación integral de gestión personal que permite a los usuarios organizar sus finanzas, metas, progreso personal y actividades cotidianas de forma visual, práctica y conectada con herramientas modernas como Google Calendar y WhatsApp.

---

## 🚀 Stack Tecnológico

- **Backend**: .NET 8 (Web API)
- **Frontend**: Angular 17
- **Base de Datos**: SQL Server
- **Autenticación**: JWT + Identity
- **Despliegue**: Azure / AWS / Render

### 🔌 Servicios de Integración

- WhatsApp: Twilio API o Meta API
- Google Calendar API
- Exportación a Excel: EPPlus o ClosedXML (.NET)

---

## 🧩 Módulos Funcionales

### 💰 Finanzas

- Registro de ingresos y gastos
- Historial mensual y resumen
- Exportación a Excel
- Dashboard con gráficas
- Registro y estado de préstamos y deudas
- Metas de ahorro y progreso
- Alertas de pagos

### 🛒 Compras

- Listas por categorías (hogar, tecnología, alimentos, etc.)
- Estados: pendiente, comprado, cancelado

### 📈 Progreso Personal

- Seguimiento de peso
- Libros leídos
- Calendario de gym
- Dashboard de progreso

### ✅ Actividades y Metas

- To-do list
- Alertas y fechas clave
- Integración con Google Calendar

### 🌍 Lugares por Visitar

- Ciudades, restaurantes, hoteles
- Estado: por visitar, visitado, favorito
- Notas, fotos y ubicación

---

## 🧠 Funcionalidades Transversales

- Dashboard principal con widgets personalizables
- Notificaciones por WhatsApp
- Perfil de usuario
- Exportación global a Excel
- Tema claro/oscuro
- Modo offline (futuro)

---

## 🗂️ Estructura del Proyecto

### Backend (.NET)

```
/PTime
├── PTime.API               --> Proyecto principal (Web API)
│   ├── Controllers
│   ├── Middlewares
│   ├── Config              --> Configuración de servicios y settings
│   └── Program.cs
│
├── PTime.Application       --> Lógica de negocio (casos de uso, interfaces, DTOs)
│   ├── Interfaces
│   ├── DTOs
│   └── Services
│
├── PTime.Domain            --> Entidades y lógica de dominio
│   ├── Entities
│   ├── ValueObjects
│   └── Enums
│
├── PTime.Infrastructure    --> Implementación de persistencia, servicios externos
│   ├── Data (DbContext, Migrations)
│   ├── Repositories
│   ├── Services (Excel, WhatsApp, Calendar)
│   └── Identity (para JWT + Identity)
│
└── PTime.Tests             --> Pruebas unitarias y de integración
```

### Frontend (Angular)

```
/PTime-frontend
├── src/
│   ├── app/
│   │   ├── modules/
│   │   │   ├── finances/
│   │   │   ├── shopping-list/
│   │   │   ├── progress-tracker/
│   │   │   ├── goals/
│   │   │   ├── travel-places/
│   │   │   ├── dashboard/
│   │   ├── shared/
│   │   ├── core/
│   ├── assets/
│   ├── environments/
```

---

## 📆 Fases de Desarrollo

### Fase 1 – MVP

- Login / Registro
- Dashboard
- Finanzas básicas
- Exportación a Excel
- To-do list simple
- Integración con Google Calendar

### Fase 2

- Módulo de compras
- Progreso personal
- Lugares por visitar
- Alertas por WhatsApp

### Fase 3

- Dashboard con widgets configurables
- Personalización total (temas, ajustes)
- Modo offline
- Backup y sincronización

---

## ✅ Recomendaciones Técnicas

- Utilizar **Clean Architecture** en el backend
- Emplear **NgRx** si hay flujos complejos en Angular
- Dashboards con **Chart.js** o **ApexCharts**
- Pruebas unitarias desde el inicio: `xUnit`, `Jasmine`
- Documentar API con **Swagger**

---
