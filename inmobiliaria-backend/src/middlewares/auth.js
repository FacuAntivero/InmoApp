const { verifyToken } = require("../utils/jwt");

function authenticate(req, res, next) {
  const header = req.headers.authorization;
  if (!header) return res.status(401).json({ msg: "Sin token" });
  const token = header.split(" ")[1];
  try {
    req.user = verifyToken(token);
    next();
  } catch {
    res.status(401).json({ msg: "Token inválido" });
  }
}

function authorizeAdmin(req, res, next) {
  if (req.user.role !== "admin")
    return res.status(403).json({ msg: "Acceso denegado" });
  next();
}

module.exports = { authenticate, authorizeAdmin };
