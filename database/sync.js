const { sequelize } = require("../config/db");
require("../models");

async function sincronizarBD() {
  try {
    await sequelize.sync({ force: true });
    console.log("✅ Tablas creadas correctamente");
    process.exit(0);
  } catch (error) {
    console.error("❌ Error al crear las tablas:", error.message);
    process.exit(1);
  }
}

sincronizarBD();
