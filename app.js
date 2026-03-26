require("dotenv").config();
const path = require("path");
const express = require("express");
const cookieParser = require("cookie-parser");
const { engine } = require("express-handlebars");
const { sequelize } = require("./config/db");
const authMiddleware = require("./middleware/authMiddleware");
const {
  getDashboard,
  createCard,
  moveCard,
} = require("./controllers/dashboardController");
const { logout } = require("./controllers/authController");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.engine("hbs", engine({ extname: ".hbs" }));
app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "views"));

// Middleware que redirige al dashboard si el usuario ya tiene sesión activa
const redirectIfLoggedIn = (req, res, next) => {
  const token = req.cookies?.token;
  if (token) return res.redirect("/dashboard");
  next();
};

// Middleware anti-caché para rutas protegidas
const noCache = (req, res, next) => {
  res.setHeader(
    "Cache-Control",
    "no-store, no-cache, must-revalidate, private",
  );
  res.setHeader("Pragma", "no-cache");
  res.setHeader("Expires", "0");
  next();
};

app.use("/api/auth", require("./routes/auth"));
app.use("/api/boards", require("./routes/boards"));
app.use("/api/boards", require("./routes/lists"));
app.use("/api/lists", require("./routes/cards"));

app.get("/", redirectIfLoggedIn, (req, res) => res.render("home"));
app.get("/home", redirectIfLoggedIn, (req, res) => res.render("home"));
app.get("/login", redirectIfLoggedIn, (req, res) =>
  res.render("login", { layout: "auth" }),
);
app.get("/register", redirectIfLoggedIn, (req, res) =>
  res.render("register", { layout: "auth" }),
);
app.get("/logout", noCache, logout);

app.get("/dashboard", noCache, authMiddleware, getDashboard);
app.post("/tareas", authMiddleware, createCard);
app.patch("/tareas/mover", authMiddleware, moveCard);

sequelize
  .sync({ alter: true })
  .then(() => {
    console.log("✅ Conexión a PostgreSQL exitosa");
    console.log("✅ Tablas sincronizadas");
    app.listen(PORT, () =>
      console.log(`🚀 Servidor corriendo en puerto ${PORT}`),
    );
  })
  .catch((err) => {
    console.error("❌ Error PostgreSQL:", err.message);
    process.exit(1);
  });
