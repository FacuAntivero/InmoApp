const express = require("express");
const bcrypt = require("bcrypt");
const knex = require("knex")(require("../../knexfile").development);
const { signToken } = require("../utils/jwt");

const router = express.Router();

// Registro
router.post("/register", async (req, res) => {
  const { nombre, email, password } = req.body;
  const hash = await bcrypt.hash(password, 10);
  const [id] = await knex("users").insert({
    nombre,
    email,
    password_hash: hash,
  });
  res.json({ id });
});

// Login
router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const user = await knex("users").where({ email }).first();
  if (!user || !(await bcrypt.compare(password, user.password_hash)))
    return res.status(401).json({ msg: "Credenciales inválidas" });
  const token = signToken({ userId: user.id, role: user.role });
  res.json({ token });
});

module.exports = router;
