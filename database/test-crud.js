const { sequelize } = require("../config/db");
const { Board, List, Card } = require("../models");

async function testCRUD() {
  try {
    console.log("===== PRUEBA CRUD =====");

    const board = await Board.findOne({
      include: {
        model: List,
        as: "lists",
        include: { model: Card, as: "cards" },
      },
    });
    console.log(
      "✅ READ   — Tablero:",
      board.nombre,
      "| Listas:",
      board.lists.length,
    );

    const list = await List.findOne();
    const newCard = await Card.create({
      titulo: "Tarjeta de prueba CRUD",
      descripcion: "Creada por test-crud.js",
      estado: "pendiente",
      prioridad: "media",
      listId: list.id,
    });
    console.log("✅ CREATE — Tarjeta creada:", newCard.titulo);

    await newCard.update({ titulo: "Tarjeta actualizada" });
    console.log("✅ UPDATE — Título actualizado:", newCard.titulo);

    await newCard.destroy();
    console.log("✅ DELETE — Tarjeta eliminada");

    console.log("\n🎉 CRUD completado correctamente");
    process.exit(0);
  } catch (error) {
    console.error("❌ Error en CRUD:", error.message);
    process.exit(1);
  }
}

testCRUD();
