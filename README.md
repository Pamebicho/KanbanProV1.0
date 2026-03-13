🚀 KanbanPro
Sistema web de gestión de tareas basado en metodología Kanban, desarrollado como proyecto de bootcamp con Node.js, Express y PostgreSQL.

---

📌 Descripción
KanbanPro permite organizar el trabajo en columnas visuales (Por Hacer / En Progreso / Terminado), facilitando el seguimiento del flujo de tareas de forma clara y estructurada.
Este repositorio corresponde al Sprint 2, que incorpora la capa de base de datos con Sequelize y PostgreSQL, modelos relacionales completos y una interfaz de usuario renovada con diseño profesional.

---

🛠️ Tecnologías utilizadas
Capa Tecnología
Runtime Node.js
Framework Express 5
Vistas Handlebars (express-handlebars)
Base de datos PostgreSQL
ORM Sequelize 6
Estilos CSS3 con variables personalizadas, Bootstrap Icons
Frontend JS Vanilla JS (drag & drop nativo)
Dev tools Nodemon, dotenv

---

📂 Estructura del proyecto

```
kanbanpro/
│
├── app.js                  # Servidor Express + rutas + lógica principal
├── data.json               # Datos de la interfaz
├── package.json
│
├── config/
│   └── db.js               # Configuración de conexión a PostgreSQL con Sequelize
│
├── models/
│   ├── index.js            # Importa modelos y define relaciones (hasMany / belongsTo)
│   ├── Usuario.js          # Modelo: id, nombre, email, password
│   ├── Tablero.js          # Modelo: id, nombre, descripcion, usuarioId (FK)
│   ├── Lista.js            # Modelo: id, nombre, posicion, tableroId (FK)
│   └── Tarjeta.js          # Modelo: id, titulo, descripcion, estado, prioridad, listaId (FK)
│
├── database/
│   ├── sync.js             # Crea las tablas en la BD (force: true)
│   ├── seed.js             # Pobla la BD con datos de prueba
│   ├── test-db.js          # Verifica conexión a PostgreSQL
│   └── test-crud.js        # Prueba operaciones CRUD completas
│
├── public/
│   ├── css/
│   │   ├── variables.css   # Variables CSS globales (colores, tipografía, espaciado)
│   │   ├── base.css        # Reset y estilos base
│   │   ├── main.css        # Estilos generales de la app
│   │   ├── components.css  # Componentes reutilizables
│   │   ├── home.css        # Estilos de la landing page
│   │   ├── auth.css        # Estilos de login y registro
│   │   └── dashboard.css   # Estilos del tablero Kanban
│   └── js/
│       ├── kanban-dnd.js   # Drag & drop entre columnas
│       └── sidebar.js      # Toggle del sidebar en mobile
│
└── views/
    ├── layouts/
    │   ├── main.hbs        # Layout principal (navbar + footer)
    │   ├── auth.hbs        # Layout minimalista para login/registro
    │   └── dashboard.hbs   # Layout del tablero (sidebar + topbar)
    ├── home.hbs            # Landing page
    ├── login.hbs           # Formulario de inicio de sesión
    ├── register.hbs        # Formulario de registro
    └── dashboard.hbs       # Tablero Kanban con modal de creación de tareas
```

---

🚀 Instalación y ejecución

1. Clonar el repositorio

```bash
git clone https://github.com/Pamebicho/EF-M6-ProSprin1
cd kanbanpro
```

2. Instalar dependencias

```bash
npm install
```

3. Configurar variables de entorno
   Crear un archivo `.env` en la raíz del proyecto:

```env
DATABASE_URL=postgres://usuario:contraseña@localhost:5432/kanbanpro
PORT=3000
```

4. Ejecutar scripts de base de datos

```bash
# Verificar conexión a PostgreSQL
npm run test:db

# Crear tablas en la base de datos
npm run sync

# Poblar con datos de prueba
npm run seed

# Probar operaciones CRUD completas
npm run test:crud
```

5. Iniciar el servidor

```bash
# Producción
npm start

# Desarrollo (con recarga automática)
npm run dev
```

6. Abrir en el navegador

```
http://localhost:3000
```

---

🗃️ Modelos de base de datos
El Sprint 2 implementa 4 modelos Sequelize con relaciones completas:

```
Usuario (1) ──────< (N) Tablero
Tablero (1) ──────< (N) Lista
Lista   (1) ──────< (N) Tarjeta
```

## Cada modelo incluye `timestamps: true` (campos `createdAt` y `updatedAt` automáticos).

🔐 Rutas disponibles (Sprint 2)
Método Ruta Descripción
GET `/` Landing page
GET `/login` Formulario de inicio de sesión
GET `/register` Formulario de registro
GET `/dashboard` Tablero Kanban
POST `/tareas` Crear nueva tarea
PATCH `/tareas/mover` Mover tarea entre columnas (drag & drop)

> ⚠️ En Sprint 2 la autenticación es visual (no funcional). La integración real con JWT y bcryptjs se implementa en Sprint 3.

---

✅ Funcionalidades del Sprint 2
[x] Modelos Sequelize: `Usuario`, `Tablero`, `Lista`, `Tarjeta`
[x] Relaciones `hasMany` / `belongsTo` con claves foráneas
[x] Script `sync.js` — crea tablas en PostgreSQL
[x] Script `seed.js` — pobla la BD con datos de prueba (2 usuarios, 3 tableros, 3 listas, 3 tarjetas)
[x] Script `test-db.js` — verifica conexión a la base de datos
[x] Script `test-crud.js` — prueba Create, Read, Update, Delete completo
[x] Interfaz de usuario renovada (navbar, footer, auth, dashboard)
[x] Modal de creación de tareas con formulario completo
[x] Drag & drop funcional entre columnas del tablero
[x] Diseño responsive (mobile, tablet, desktop)

---

🗺️ Roadmap
Sprint Estado Descripción
Sprint 1 ✅ Completado Prototipo con data.json, Express + Handlebars, drag & drop
Sprint 2 ✅ Completado Modelos Sequelize/PostgreSQL, mejoras de UI
Sprint 3 🔜 Pendiente API RESTful, JWT, bcryptjs, autenticación real

---

👩‍💻 Autora
Pamela Gutiérrez
