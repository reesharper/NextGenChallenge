
exports.up = function(knex) {
  return knex.schema
  .createTable("permission", tbl => {
    tbl.increments();
    tbl.string("role_name", 128).notNullable().unique();
  })
  .createTable("users", tbl => {
    tbl.increments();
    tbl.string("name", 128).notNullable().unique().index();
    tbl.string("email", 256).notNullable();
    tbl.string("password", 256).notNullable();
    tbl
      .integer("permission_id")
      .unsigned()
      .references("permission.id")
      .onDelete("RESTRICT")
      .onUpdate("CASCADE")
      .defaultTo(4);
  })
};

exports.down = function(knex) {
  return knex.schema
  .dropTableIfExists("permission")
  .dropTableIfExists("category")
};
