const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/db");

const List = sequelize.define(
  "List",
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    nombre: { type: DataTypes.STRING, allowNull: false },
    posicion: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 0 },
  },
  { tableName: "lists", timestamps: true },
);

module.exports = List;
