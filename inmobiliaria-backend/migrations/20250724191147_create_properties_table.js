/**
 * Crea la tabla 'properties'
 */
exports.up = function (knex) {
  return knex.schema.createTable("properties", (table) => {
    table.increments("id").primary();
    table.string("title").notNullable();
    table.text("description");
    table.decimal("price", 12, 2).notNullable();
    table.string("address");
    table.string("image_url");
    table.integer("user_id").unsigned().references("id").inTable("users");
    table.timestamp("created_at").defaultTo(knex.fn.now());
  });
};

/**
 * Revierte la migración: elimina la tabla 'properties'
 */
exports.down = function (knex) {
  return knex.schema.dropTableIfExists("properties");
};
