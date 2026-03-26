const { Card, List } = require("../models");

const create = async (req, res) => {
  try {
    const list = await List.findByPk(req.params.listId);
    if (!list)
      return res
        .status(404)
        .json({ ok: false, message: "Lista no encontrada" });

    const { titulo, descripcion, estado, prioridad } = req.body;
    if (!titulo)
      return res
        .status(400)
        .json({ ok: false, message: "El título es obligatorio" });

    const card = await Card.create({
      titulo,
      descripcion: descripcion || "",
      estado: estado || "pendiente",
      prioridad: prioridad || "media",
      listId: list.id,
    });
    return res.status(201).json({ ok: true, card });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ ok: false, message: "Error interno del servidor" });
  }
};

const update = async (req, res) => {
  try {
    const card = await Card.findOne({
      where: { id: req.params.id, listId: req.params.listId },
    });
    if (!card)
      return res
        .status(404)
        .json({ ok: false, message: "Tarjeta no encontrada" });

    const { titulo, descripcion, estado, prioridad } = req.body;
    await card.update({
      titulo: titulo || card.titulo,
      descripcion: descripcion ?? card.descripcion,
      estado: estado || card.estado,
      prioridad: prioridad || card.prioridad,
    });
    return res.json({ ok: true, card });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ ok: false, message: "Error interno del servidor" });
  }
};

const remove = async (req, res) => {
  try {
    const card = await Card.findOne({
      where: { id: req.params.id, listId: req.params.listId },
    });
    if (!card)
      return res
        .status(404)
        .json({ ok: false, message: "Tarjeta no encontrada" });

    await card.destroy();
    return res.json({ ok: true, message: "Tarjeta eliminada" });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ ok: false, message: "Error interno del servidor" });
  }
};

module.exports = { create, update, remove };
