const path = require("path");
const fs = require("fs");
const express = require("express");
const { engine } = require("express-handlebars");

const app = express();
const PORT = process.env.PORT || 3000;

// --------------------
// Middlewares
// --------------------
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

// --------------------
// Configuración Handlebars
// --------------------
app.engine("hbs", engine({ extname: ".hbs" }));
app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "views"));

// --------------------
// Data helpers
// --------------------
const dataFilePath = path.join(__dirname, "data.json");

function readData() {
  const raw = fs.readFileSync(dataFilePath, "utf8");
  return JSON.parse(raw);
}

function writeData(data) {
  fs.writeFileSync(dataFilePath, JSON.stringify(data, null, 2), "utf8");
}

function getNextPublicId(board, prefix = "DC-", startAt = 100) {
  let max = startAt - 1;

  board.lists.forEach((list) => {
    list.cards.forEach((card) => {
      if (
        typeof card.publicId === "string" &&
        card.publicId.startsWith(prefix)
      ) {
        const num = parseInt(card.publicId.slice(prefix.length), 10);
        if (!Number.isNaN(num) && num > max) max = num;
      }
    });
  });

  return `${prefix}${max + 1}`;
}

// --------------------
// Rutas (HU-01)
// --------------------
app.get("/", (req, res) => res.render("home"));
app.get("/home", (req, res) => res.render("home"));
app.get("/login", (req, res) => res.render("login", { layout: "auth" }));
app.get("/register", (req, res) => res.render("register", { layout: "auth" }));

// --------------------
// Dashboard (HU-02)
// --------------------
app.get("/dashboard", (req, res) => {
  try {
    const data = readData();
    res.render("dashboard", { layout: "dashboard", board: data.board });
  } catch (error) {
    console.error(error);
    res.status(500).send("Error leyendo data.json");
  }
});

// --------------------
// Crear tarea completa (siempre en "todo")
// --------------------
app.post("/tareas", (req, res) => {
  try {
    const { title, description, dueDate, assignee, priority } = req.body;

    if (!title || !dueDate || !assignee || !priority) {
      return res
        .status(400)
        .send(
          "Faltan datos obligatorios (title, dueDate, assignee, priority).",
        );
    }

    const data = readData();

    const todoList = data.board.lists.find((l) => l.id === "todo");
    if (!todoList) return res.status(400).send("No existe la lista 'todo'.");

    // ID público corto (secuencial, sin duplicados)
    const publicId = getNextPublicId(data.board, "DC-", 100);

    // ID interno (único para sistema / drag&drop)
    const internalId = `c${Date.now()}${Math.floor(Math.random() * 1000)}`;

    const newCard = {
      id: internalId,
      publicId,
      title: title.trim(),
      description: (description || "").trim(),
      dueDate,
      assignee: assignee.trim(),
      priority,
      createdAt: new Date().toISOString(),
    };

    todoList.cards.unshift(newCard);
    writeData(data);

    res.redirect("/dashboard");
  } catch (error) {
    console.error(error);
    res.status(500).send("Error guardando la nueva tarea completa");
  }
});

// --------------------
// Mover tarea entre listas (drag & drop)
// --------------------
app.patch("/tareas/mover", (req, res) => {
  try {
    const { cardId, toListId } = req.body;

    if (!cardId || !toListId) {
      return res
        .status(400)
        .json({ ok: false, message: "Faltan cardId o toListId" });
    }

    const data = readData();
    const lists = data.board.lists;

    let movedCard = null;

    for (const list of lists) {
      const idx = list.cards.findIndex((c) => c.id === cardId);
      if (idx !== -1) {
        movedCard = list.cards.splice(idx, 1)[0];
        break;
      }
    }

    if (!movedCard) {
      return res
        .status(404)
        .json({ ok: false, message: "Tarea no encontrada" });
    }

    const destList = lists.find((l) => l.id === toListId);
    if (!destList) {
      return res
        .status(404)
        .json({ ok: false, message: "Lista destino no existe" });
    }

    destList.cards.unshift(movedCard);
    writeData(data);

    return res.json({ ok: true });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ ok: false, message: "Error moviendo la tarea" });
  }
});

// --------------------
// Servidor
// --------------------
app.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
});
