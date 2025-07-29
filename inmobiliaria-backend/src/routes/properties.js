const express = require("express");
const knex = require("knex")(require("../../knexfile").development);
const { authenticate, authorizeAdmin } = require("../middlewares/auth");

const router = express.Router();

// Listado público
router.get("/", async (_, res) => {
  const list = await knex("properties");
  res.json(list);
});

// Detalle
router.get("/:id", async (req, res) => {
  const prop = await knex("properties").where({ id: req.params.id }).first();
  if (!prop) return res.status(404).json({ msg: "No existe" });
  res.json(prop);
});

// CRUD admin
router.use(authenticate, authorizeAdmin);

router.post("/", async (req, res) => {
  const [id] = await knex("properties").insert(req.body);
  res.status(201).json({ id });
});
router.put("/:id", async (req, res) => {
  await knex("properties").where({ id: req.params.id }).update(req.body);
  res.json({ updated: true });
});
router.delete("/:id", async (req, res) => {
  await knex("properties").where({ id: req.params.id }).delete();
  res.json({ deleted: true });
});

module.exports = router;
