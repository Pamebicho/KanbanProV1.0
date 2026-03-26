const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/db");

const Board = sequelize.define(
  "Board",
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    nombre: { type: DataTypes.STRING, allowNull: false },
    descripcion: { type: DataTypes.TEXT, allowNull: true },
  },
  { tableName: "boards", timestamps: true },
);

module.exports = Board;
