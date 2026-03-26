const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/db");

const Card = sequelize.define(
  "Card",
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    titulo: { type: DataTypes.STRING, allowNull: false },
    descripcion: { type: DataTypes.TEXT, allowNull: true },
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
    asignado: { type: DataTypes.STRING, allowNull: true },
    fechaLimite: { type: DataTypes.DATEONLY, allowNull: true },
  },
  { tableName: "cards", timestamps: true },
);

module.exports = Card;
