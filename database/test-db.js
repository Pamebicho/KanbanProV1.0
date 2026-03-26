const { sequelize } = require("../config/db");

async function testConnection() {
  try {
    await sequelize.authenticate();
    console.log("✅ Conexión exitosa a PostgreSQL");
    process.exit(0);
  } catch (error) {
    console.error("❌ Error al conectar:", error.message);
    process.exit(1);
  }
}

testConnection();
