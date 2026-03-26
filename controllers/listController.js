const { List, Board } = require("../models");

const create = async (req, res) => {
  try {
    const board = await Board.findOne({
      where: { id: req.params.boardId, userId: req.usuario.id },
    });
    if (!board)
      return res
        .status(404)
        .json({ ok: false, message: "Tablero no encontrado" });

    const { nombre, posicion } = req.body;
    if (!nombre)
      return res
        .status(400)
        .json({ ok: false, message: "El nombre es obligatorio" });

    const list = await List.create({
      nombre,
      posicion: posicion || 0,
      boardId: board.id,
    });
    return res.status(201).json({ ok: true, list });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ ok: false, message: "Error interno del servidor" });
  }
};

const update = async (req, res) => {
  try {
    const list = await List.findOne({
      where: { id: req.params.id, boardId: req.params.boardId },
    });
    if (!list)
      return res
        .status(404)
        .json({ ok: false, message: "Lista no encontrada" });

    const { nombre, posicion } = req.body;
    await list.update({
      nombre: nombre || list.nombre,
      posicion: posicion ?? list.posicion,
    });
    return res.json({ ok: true, list });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ ok: false, message: "Error interno del servidor" });
  }
};

const remove = async (req, res) => {
  try {
    const list = await List.findOne({
      where: { id: req.params.id, boardId: req.params.boardId },
    });
    if (!list)
      return res
        .status(404)
        .json({ ok: false, message: "Lista no encontrada" });

    await list.destroy();
    return res.json({ ok: true, message: "Lista eliminada" });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ ok: false, message: "Error interno del servidor" });
  }
};

module.exports = { create, update, remove };
