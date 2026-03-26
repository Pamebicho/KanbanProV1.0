🚀 KanbanPro
Sistema web de gestión de tareas basado en metodología Kanban, desarrollado como proyecto integrador del Bootcamp Full Stack

---

📌 Descripción
KanbanPro es una aplicación web que permite a los usuarios organizar su trabajo en un tablero visual con columnas Por hacer, En progreso, Terminado y Reabierto. Cada usuario tiene su propio tablero con autenticación segura mediante JWT y contraseñas encriptadas con bcrypt.

---

✨ Funcionalidades
Registro e inicio de sesión con autenticación JWT
Tablero Kanban personal creado automáticamente al registrarse
Creación de tareas con título, descripción, prioridad, asignado y fecha límite
Drag & drop entre columnas con persistencia en base de datos
Cierre de sesión seguro con headers anti-caché
Redirección automática si el usuario ya tiene sesión activa
API RESTful completa para gestión de tableros, listas y tarjetas
Diseño responsive para mobile, tablet y desktop

---

🛠️ Tecnologías
Capa Tecnología
Runtime Node.js 18+
Framework Express 5
Vistas Handlebars (express-handlebars)
Base de datos PostgreSQL
ORM Sequelize 6
Autenticación JWT + bcryptjs
Sesión Cookie httpOnly
Estilos CSS3 con variables, Bootstrap Icons
Frontend JS Vanilla JS (drag & drop nativo)
Dev tools Nodemon, dotenv

---

📂 Estructura del proyecto

```
kanbanpro/
│
├── app.js                        # Servidor Express, middlewares y rutas principales
├── package.json
│
├── config/
│   └── db.js                     # Conexión a PostgreSQL con Sequelize
│
├── middleware/
│   └── authMiddleware.js         # Verificación de JWT (cookie o header Authorization)
│
├── controllers/
│   ├── authController.js         # Registro, login y logout
│   ├── dashboardController.js    # Dashboard, crear y mover tarjetas
│   ├── boardController.js        # CRUD de tableros
│   ├── listController.js         # CRUD de listas
│   └── cardController.js         # CRUD de tarjetas
│
├── routes/
│   ├── auth.js                   # POST /api/auth/register, /api/auth/login
│   ├── boards.js                 # GET/POST/PUT/DELETE /api/boards
│   ├── lists.js                  # POST/PUT/DELETE /api/boards/:id/lists
│   └── cards.js                  # POST/PUT/DELETE /api/lists/:id/cards
│
├── models/
│   ├── index.js                  # Relaciones hasMany / belongsTo
│   ├── User.js                   # id, nombre, email, password
│   ├── Board.js                  # id, nombre, descripcion, userId
│   ├── List.js                   # id, nombre, posicion, boardId
│   └── Card.js                   # id, titulo, descripcion, estado, prioridad, asignado, fechaLimite, listId
│
├── database/
│   ├── sync.js                   # Crea las tablas en PostgreSQL
│   ├── seed.js                   # Pobla la BD con datos de prueba
│   ├── test-db.js                # Verifica conexión a PostgreSQL
│   └── test-crud.js              # Prueba operaciones CRUD
│
├── public/
│   ├── css/                      # variables, base, main, components, dashboard, auth, home
│   └── js/
│       ├── kanban-dnd.js         # Drag & drop con persistencia
│       └── sidebar.js            # Toggle sidebar en mobile
│
└── views/
    ├── layouts/
    │   ├── main.hbs              # Layout landing page
    │   ├── auth.hbs              # Layout login / registro
    │   └── dashboard.hbs         # Layout tablero
    ├── home.hbs
    ├── login.hbs
    ├── register.hbs
    └── dashboard.hbs
```

---

🗃️ Modelo de datos

```
User (1) ──────< (N) Board
Board (1) ──────< (N) List
List  (1) ──────< (N) Card
```

---

🚀 Instalación local
Requisitos previos
Node.js 18+
PostgreSQL 14+

1. Clonar el repositorio

```bash
git clone https://github.com/Pamebicho/KanbanProV1.0.git
cd kanbanpro
```

2. Instalar dependencias

```bash
npm install
```

3. Configurar variables de entorno
   Crear un archivo `.env` en la raíz:

```env
DATABASE_URL=postgres://usuario:contraseña@localhost:5432/kanbanpro_db
JWT_SECRET=tu_clave_secreta_aqui
PORT=3000
```

4. Preparar la base de datos

```bash
# Crear las tablas
npm run sync

# Poblar con datos de prueba
npm run seed
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

## Usuario de prueba: `pamela@email.com` / `123456`

🔐 API RESTful
Todos los endpoints de la API requieren autenticación. Incluir el token en el header:

```
Authorization: Bearer <token>
```

Autenticación
Método Ruta Descripción Auth
POST `/api/auth/register` Crear cuenta nueva No
POST `/api/auth/login` Iniciar sesión, devuelve JWT No

Tableros
Método Ruta Descripción
GET `/api/boards` Listar tableros del usuario
POST `/api/boards` Crear tablero
PUT `/api/boards/:id` Actualizar tablero
DELETE `/api/boards/:id` Eliminar tablero

Listas
Método Ruta Descripción
POST `/api/boards/:boardId/lists` Crear lista
PUT `/api/boards/:boardId/lists/:id` Actualizar lista
DELETE `/api/boards/:boardId/lists/:id` Eliminar lista

Tarjetas
Método Ruta Descripción
POST `/api/lists/:listId/cards` Crear tarjeta
PUT `/api/lists/:listId/cards/:id` Actualizar tarjeta
DELETE `/api/lists/:listId/cards/:id` Eliminar tarjeta

---

📈 Sprints del proyecto
Sprint Módulo Estado Descripción
Sprint 1 M6 ✅ Completado Prototipo con data.json, Express + Handlebars, drag & drop
Sprint 2 M7 ✅ Completado Modelos Sequelize, PostgreSQL, scripts de BD
Sprint 3 M8 ✅ Completado API RESTful, JWT, bcrypt, controllers, autenticación completa

---

👩‍💻 Autora
Pamela Gutiérrez M.
