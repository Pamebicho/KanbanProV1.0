const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { User, Board, List } = require("../models");

const BOARD_LISTS = ["Por hacer", "En progreso", "Terminado", "Reabierto"];

const register = async (req, res) => {
  try {
    const { nombre, email, password } = req.body;

    if (!nombre || !email || !password) {
      return res.render("register", {
        layout: "auth",
        error: "Todos los campos son obligatorios",
      });
    }

    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.render("register", {
        layout: "auth",
        error: "El email ya está registrado",
      });
    }

    const passwordHash = await bcrypt.hash(password, 10);
    const newUser = await User.create({
      nombre,
      email,
      password: passwordHash,
    });

    const board = await Board.create({
      nombre: `Tablero de ${newUser.nombre}`,
      descripcion: "Mi tablero Kanban personal",
      userId: newUser.id,
    });

    for (let i = 0; i < BOARD_LISTS.length; i++) {
      await List.create({
        nombre: BOARD_LISTS[i],
        posicion: i + 1,
        boardId: board.id,
      });
    }

    return res.redirect("/login");
  } catch (error) {
    console.error("Error en register:", error);
    return res.render("register", {
      layout: "auth",
      error: "Error interno del servidor",
    });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.render("login", {
        layout: "auth",
        error: "Email y contraseña son obligatorios",
      });
    }

    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.render("login", {
        layout: "auth",
        error: "Credenciales incorrectas",
      });
    }

    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) {
      return res.render("login", {
        layout: "auth",
        error: "Credenciales incorrectas",
      });
    }

    const token = jwt.sign(
      { id: user.id, email: user.email, nombre: user.nombre },
      process.env.JWT_SECRET,
      { expiresIn: "24h" },
    );

    res.cookie("token", token, { httpOnly: true, maxAge: 24 * 60 * 60 * 1000 });
    return res.redirect("/dashboard");
  } catch (error) {
    console.error("Error en login:", error);
    return res.render("login", {
      layout: "auth",
      error: "Error interno del servidor",
    });
  }
};

const logout = (req, res) => {
  res.clearCookie("token");
  return res.redirect("/login");
};

module.exports = { register, login, logout };
