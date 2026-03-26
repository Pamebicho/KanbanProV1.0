const { Board, List, Card } = require("../models");

const getAll = async (req, res) => {
  try {
    const boards = await Board.findAll({
      where: { userId: req.usuario.id },
      include: {
        model: List,
        as: "lists",
        include: { model: Card, as: "cards" },
      },
    });
    return res.json({ ok: true, boards });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ ok: false, message: "Error interno del servidor" });
  }
};

const create = async (req, res) => {
  try {
    const { nombre, descripcion } = req.body;
    if (!nombre)
      return res
        .status(400)
        .json({ ok: false, message: "El nombre es obligatorio" });

    const board = await Board.create({
      nombre,
      descripcion: descripcion || "",
      userId: req.usuario.id,
    });
    return res.status(201).json({ ok: true, board });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ ok: false, message: "Error interno del servidor" });
  }
};

const update = async (req, res) => {
  try {
    const board = await Board.findOne({
      where: { id: req.params.id, userId: req.usuario.id },
    });
    if (!board)
      return res
        .status(404)
        .json({ ok: false, message: "Tablero no encontrado" });

    const { nombre, descripcion } = req.body;
    await board.update({
      nombre: nombre || board.nombre,
      descripcion: descripcion ?? board.descripcion,
    });
    return res.json({ ok: true, board });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ ok: false, message: "Error interno del servidor" });
  }
};

const remove = async (req, res) => {
  try {
    const board = await Board.findOne({
      where: { id: req.params.id, userId: req.usuario.id },
    });
    if (!board)
      return res
        .status(404)
        .json({ ok: false, message: "Tablero no encontrado" });

    await board.destroy();
    return res.json({ ok: true, message: "Tablero eliminado" });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ ok: false, message: "Error interno del servidor" });
  }
};

module.exports = { getAll, create, update, remove };
