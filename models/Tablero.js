const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/db");

const Tablero = sequelize.define(
  "Tablero",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    nombre: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    descripcion: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
  },
  {
    tableName: "tableros",
    timestamps: true,
  },
);

module.exports = Tablero;
