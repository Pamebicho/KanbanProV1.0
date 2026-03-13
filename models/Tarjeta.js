const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/db");

const Tarjeta = sequelize.define(
  "Tarjeta",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    titulo: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    descripcion: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    estado: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "pendiente",
    },
    prioridad: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "media",
    },
  },
  {
    tableName: "tarjetas",
    timestamps: true,
  },
);

module.exports = Tarjeta;
