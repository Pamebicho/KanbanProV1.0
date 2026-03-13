const { sequelize } = require("../config/db");
const { Usuario, Tablero, Lista, Tarjeta } = require("../models");

async function testCRUD() {
  try {
    console.log("===== PRUEBA CRUD =====");

    // CREATE
    console.log("\nCreando nueva tarjeta...");

    const lista = await Lista.findOne();

    const nuevaTarjeta = await Tarjeta.create({
      titulo: "Nueva tarea CRUD",
      descripcion: "Prueba de creación",
      listaId: lista.id,
    });

    console.log("Tarjeta creada:", nuevaTarjeta.titulo);

    // READ
    console.log("\nLeyendo tablero con listas y tarjetas...");

    const tablero = await Tablero.findOne({
      include: {
        model: Lista,
        as: "listas",
        include: {
          model: Tarjeta,
          as: "tarjetas",
        },
      },
    });

    console.log("Tablero encontrado:", tablero.nombre);

    // UPDATE
    console.log("\nActualizando tarjeta...");

    nuevaTarjeta.titulo = "Tarjeta actualizada";
    await nuevaTarjeta.save();

    console.log("Tarjeta actualizada:", nuevaTarjeta.titulo);

    // DELETE
    console.log("\nEliminando tarjeta...");

    await nuevaTarjeta.destroy();

    console.log("Tarjeta eliminada correctamente");

    console.log("\nCRUD completado correctamente");

    process.exit();
  } catch (error) {
    console.error("Error en CRUD:", error);
  }
}

testCRUD();
