const { Board, List, Card } = require("../models");

const STATUS_MAP = {
  pendiente: "todo",
  "en progreso": "doing",
  terminado: "done",
  reabierto: "reopened",
};

const COLUMN_TO_STATE = {
  todo: "pendiente",
  doing: "en progreso",
  done: "terminado",
  reopened: "reabierto",
};

const LIST_TO_COLUMN = {
  "Por hacer": "todo",
  "En progreso": "doing",
  Terminado: "done",
  Reabierto: "reopened",
};

const getDashboard = async (req, res) => {
  try {
    // Tomar solo el primer board del usuario (su tablero personal)
    const userBoard = await Board.findOne({
      where: { userId: req.usuario.id },
      include: {
        model: List,
        as: "lists",
        include: { model: Card, as: "cards" },
      },
    });

    const board = {
      name: userBoard ? userBoard.nombre : "KanbanPro",
      lists: [
        { id: "todo", title: "Por hacer", cards: [] },
        { id: "doing", title: "En progreso", cards: [] },
        { id: "done", title: "Terminado", cards: [] },
        { id: "reopened", title: "Reabierto", cards: [] },
      ],
    };

    if (userBoard) {
      userBoard.lists.forEach((l) => {
        l.cards.forEach((c) => {
          const colId = STATUS_MAP[c.estado] || "todo";
          const col = board.lists.find((col) => col.id === colId);
          if (col) {
            col.cards.push({
              id: String(c.id),
              publicId: `DC-${c.id}`,
              title: c.titulo,
              description: c.descripcion || "",
              priority: c.prioridad || "media",
              assignee: c.asignado || "",
              dueDate: c.fechaLimite || "",
            });
          }
        });
      });
    }

    return res.render("dashboard", {
      layout: "dashboard",
      board,
      usuario: req.usuario.nombre,
    });
  } catch (error) {
    console.error("Error cargando dashboard:", error);
    return res.status(500).send("Error cargando el dashboard");
  }
};

const createCard = async (req, res) => {
  try {
    const { title, description, dueDate, assignee, priority } = req.body;

    if (!title || !priority) {
      return res.status(400).send("Faltan datos obligatorios.");
    }

    const board = await Board.findOne({
      where: { userId: req.usuario.id },
      include: { model: List, as: "lists" },
    });

    if (!board) return res.status(400).send("No tienes tableros creados.");

    const todoList = board.lists.find((l) => l.nombre === "Por hacer");
    if (!todoList) return res.status(400).send("No existe la lista Por hacer.");

    await Card.create({
      titulo: title.trim(),
      descripcion: (description || "").trim(),
      estado: "pendiente",
      prioridad: priority.toLowerCase(),
      asignado: (assignee || "").trim() || req.usuario.nombre,
      fechaLimite: dueDate || null,
      listId: todoList.id,
    });

    return res.redirect("/dashboard");
  } catch (error) {
    console.error("Error creando tarea:", error);
    return res.status(500).send("Error creando la tarea");
  }
};

const moveCard = async (req, res) => {
  try {
    const { cardId, toListId } = req.body;

    if (!cardId || !toListId) {
      return res
        .status(400)
        .json({ ok: false, message: "Faltan cardId o toListId" });
    }

    // Buscar la tarjeta verificando que pertenece al usuario
    const board = await Board.findOne({
      where: { userId: req.usuario.id },
      include: {
        model: List,
        as: "lists",
        include: { model: Card, as: "cards" },
      },
    });

    if (!board)
      return res
        .status(404)
        .json({ ok: false, message: "Tablero no encontrado" });

    // Verificar propiedad: la tarjeta debe ser de una lista de este board
    let card = null;
    for (const list of board.lists) {
      card = list.cards.find((c) => String(c.id) === String(cardId));
      if (card) break;
    }

    if (!card)
      return res
        .status(403)
        .json({ ok: false, message: "Tarjeta no encontrada o sin permiso" });

    const targetList = board.lists.find(
      (l) => LIST_TO_COLUMN[l.nombre] === toListId,
    );
    if (!targetList)
      return res
        .status(404)
        .json({ ok: false, message: "Lista destino no encontrada" });

    await card.update({
      listId: targetList.id,
      estado: COLUMN_TO_STATE[toListId] || "pendiente",
    });

    return res.json({ ok: true });
  } catch (error) {
    console.error("Error moviendo tarea:", error);
    return res
      .status(500)
      .json({ ok: false, message: "Error moviendo la tarea" });
  }
};

module.exports = { getDashboard, createCard, moveCard };
