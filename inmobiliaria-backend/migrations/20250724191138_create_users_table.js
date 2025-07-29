exports.up = function (knex) {
  return knex.schema.createTable("users", (table) => {
    table.increments("id").primary();
    table.string("nombre").notNullable();
    table.string("email").notNullable().unique();
    table.string("password_hash").notNullable();
    table.enu("role", ["user", "admin"]).defaultTo("user");
    table.timestamp("created_at").defaultTo(knex.fn.now());
  });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists("users");
};
