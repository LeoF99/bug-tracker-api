/* eslint-disable func-names */
exports.up = function (knex) {
  return knex.schema.createTable('bugs', (table) => {
    table.string('id').primary();
    table.string('name', 45).notNullable();
    table.string('description', 255);
    table.uuid('user_creator').references('id').inTable('users').notNull();
    table.uuid('user_assigned').references('id').inTable('users').notNull();
    table.string('status', 45).notNullable();
    table.dateTime('deadline').nullable();
    table.timestamp('created_at').defaultTo(knex.fn.now());
  });
};

exports.down = function (knex) {
  return knex.schema.droptable('bugs');
};
