require("dotenv").config();
const { Sequelize } = require("sequelize");

const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialect: "postgres",
  logging: false,
});

async function conectarDB() {
  try {
    await sequelize.authenticate();
    console.log("✅ Conexión exitosa a PostgreSQL");
  } catch (error) {
    console.error("❌ Error al conectar a PostgreSQL:", error.message);
  }
}

module.exports = { sequelize, conectarDB };
