const bcrypt = require("bcryptjs");
const { sequelize } = require("../config/db");
const { User, Board, List, Card } = require("../models");

const LISTS = ["Por hacer", "En progreso", "Terminado", "Reabierto"];

async function seed() {
  try {
    await sequelize.sync({ force: true });
    console.log("✅ Base de datos reiniciada");

    const hash = await bcrypt.hash("123456", 10);

    const user1 = await User.create({
      nombre: "Pamela",
      email: "pamela@email.com",
      password: hash,
    });
    const user2 = await User.create({
      nombre: "Carlos",
      email: "carlos@email.com",
      password: hash,
    });
    console.log("✅ Usuarios creados");

    const board1 = await Board.create({
      nombre: "Tablero de Pamela",
      descripcion: "Mi tablero Kanban personal",
      userId: user1.id,
    });
    await Board.create({
      nombre: "Tablero de Carlos",
      descripcion: "Mi tablero Kanban personal",
      userId: user2.id,
    });
    console.log("✅ Tableros creados");

    const lists = [];
    for (let i = 0; i < LISTS.length; i++) {
      lists.push(
        await List.create({
          nombre: LISTS[i],
          posicion: i + 1,
          boardId: board1.id,
        }),
      );
    }
    console.log("✅ Listas creadas");

    await Card.create({
      titulo: "Diseñar modelo de datos",
      descripcion: "Crear modelos Sequelize",
      estado: "pendiente",
      prioridad: "alta",
      asignado: "Pamela",
      fechaLimite: "2026-04-10",
      listId: lists[0].id,
    });
    await Card.create({
      titulo: "Configurar PostgreSQL",
      descripcion: "Conectar base de datos",
      estado: "en progreso",
      prioridad: "media",
      asignado: "Pamela",
      fechaLimite: "2026-04-15",
      listId: lists[1].id,
    });
    await Card.create({
      titulo: "Probar CRUD completo",
      descripcion: "Verificar operaciones",
      estado: "terminado",
      prioridad: "baja",
      asignado: "Carlos",
      fechaLimite: "2026-04-05",
      listId: lists[2].id,
    });
    await Card.create({
      titulo: "Revisar autenticación JWT",
      descripcion: "Verificar JWT y bcrypt",
      estado: "reabierto",
      prioridad: "alta",
      asignado: "Pamela",
      fechaLimite: "2026-04-20",
      listId: lists[3].id,
    });
    console.log("✅ Tarjetas creadas");

    console.log("🌱 Seed completado — usuario: pamela@email.com / 123456");
    process.exit(0);
  } catch (error) {
    console.error("❌ Error en seed:", error);
    process.exit(1);
  }
}

seed();
