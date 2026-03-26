const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
  const token =
    req.cookies?.token || req.headers["authorization"]?.split(" ")[1];

  if (!token) {
    return req.originalUrl.startsWith("/api")
      ? res.status(401).json({ ok: false, message: "Token no proporcionado" })
      : res.redirect("/login");
  }

  try {
    req.usuario = jwt.verify(token, process.env.JWT_SECRET);
    next();
  } catch {
    if (req.originalUrl.startsWith("/api")) {
      return res
        .status(403)
        .json({ ok: false, message: "Token inválido o expirado" });
    }
    res.clearCookie("token");
    return res.redirect("/login");
  }
};

module.exports = authMiddleware;
