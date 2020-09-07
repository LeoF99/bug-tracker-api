/* eslint-disable func-names */
exports.up = function (knex) {
  return knex.schema.createTable('projects', (table) => {
    table.string('id').primary();
    table.string('name', 45).notNullable();
    table.string('description', 255);
    table.boolean('is_active').defaultTo(1);
    table.uuid('user_creator').references('id').inTable('users').notNull();
    table.timestamp('created_at').defaultTo(knex.fn.now());
  });
};

exports.down = function (knex) {
  return knex.schema.droptable('projects');
};
