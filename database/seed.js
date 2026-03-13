const { sequelize } = require("../config/db");
const { Usuario, Tablero, Lista, Tarjeta } = require("../models");

async function seed() {
  try {
    // Reinicia las tablas
    await sequelize.sync({ force: true });

    console.log("Base de datos reiniciada");

    // Crear usuarios
    const usuario1 = await Usuario.create({
      nombre: "Pamela",
      email: "pamela@email.com",
      password: "123456",
    });

    const usuario2 = await Usuario.create({
      nombre: "Carlos",
      email: "carlos@email.com",
      password: "123456",
    });

    console.log("Usuarios creados");

    // Crear tableros
    const tablero1 = await Tablero.create({
      nombre: "Proyecto KanbanPro",
      descripcion: "Desarrollo del sistema Kanban",
      usuarioId: usuario1.id,
    });

    const tablero2 = await Tablero.create({
      nombre: "Bootcamp Node",
      descripcion: "Tareas del bootcamp",
      usuarioId: usuario1.id,
    });

    const tablero3 = await Tablero.create({
      nombre: "Trabajo Personal",
      descripcion: "Gestión personal",
      usuarioId: usuario2.id,
    });

    console.log("Tableros creados");

    // Crear listas
    const lista1 = await Lista.create({
      nombre: "Por hacer",
      posicion: 1,
      tableroId: tablero1.id,
    });

    const lista2 = await Lista.create({
      nombre: "En progreso",
      posicion: 2,
      tableroId: tablero1.id,
    });

    const lista3 = await Lista.create({
      nombre: "Terminado",
      posicion: 3,
      tableroId: tablero1.id,
    });

    console.log("Listas creadas");

    // Crear tarjetas
    await Tarjeta.create({
      titulo: "Diseñar modelo de datos",
      descripcion: "Crear modelos Sequelize",
      listaId: lista1.id,
    });

    await Tarjeta.create({
      titulo: "Configurar PostgreSQL",
      descripcion: "Conectar base de datos",
      listaId: lista2.id,
    });

    await Tarjeta.create({
      titulo: "Probar CRUD",
      descripcion: "Verificar operaciones",
      listaId: lista3.id,
    });

    console.log("Tarjetas creadas");

    console.log("Seed completado correctamente");

    process.exit();
  } catch (error) {
    console.error("Error en seed:", error);
  }
}

seed();
