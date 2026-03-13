const Usuario = require("./Usuario");
const Tablero = require("./Tablero");
const Lista = require("./Lista");
const Tarjeta = require("./Tarjeta");

// Relaciones Usuario -> Tablero
Usuario.hasMany(Tablero, {
  foreignKey: "usuarioId",
  as: "tableros",
});

Tablero.belongsTo(Usuario, {
  foreignKey: "usuarioId",
  as: "usuario",
});

// Relaciones Tablero -> Lista
Tablero.hasMany(Lista, {
  foreignKey: "tableroId",
  as: "listas",
});

Lista.belongsTo(Tablero, {
  foreignKey: "tableroId",
  as: "tablero",
});

// Relaciones Lista -> Tarjeta
Lista.hasMany(Tarjeta, {
  foreignKey: "listaId",
  as: "tarjetas",
});

Tarjeta.belongsTo(Lista, {
  foreignKey: "listaId",
  as: "lista",
});

module.exports = {
  Usuario,
  Tablero,
  Lista,
  Tarjeta,
};
