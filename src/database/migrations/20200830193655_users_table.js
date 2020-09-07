/* eslint-disable func-names */
exports.up = function (knex) {
  return knex.schema.createTable('users', (table) => {
    table.string('id').primary();
    table.string('name', 45).notNullable();
    table.string('email', 45).notNullable();
    table.string('password', 255).notNullable();
    table.boolean('is_confirmed').defaultTo(0);
    table.boolean('is_super').defaultTo(0);
    table.timestamp('created_at').defaultTo(knex.fn.now());
  });
};

exports.down = function (knex) {
  return knex.schema.droptable('users');
};
